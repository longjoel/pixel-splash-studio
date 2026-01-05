import { app, BrowserWindow, Menu, dialog, ipcMain, OpenDialogOptions } from 'electron';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import JSZip from 'jszip';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#111111',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  const devServerUrl = process.env.VITE_DEV_SERVER_URL;
  if (devServerUrl) {
    win.loadURL(devServerUrl);
  } else {
    win.loadFile(join(__dirname, '../dist/index.html'));
  }
};

app.whenReady().then(() => {
  createWindow();

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'new');
          },
        },
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'open');
          },
        },
        { type: 'separator' as const },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'save');
          },
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'saveAs');
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'undo');
          },
        },
        {
          label: 'Redo',
          accelerator: 'CmdOrCtrl+Shift+Z',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'redo');
          },
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Shortcut Map',
          accelerator: 'CmdOrCtrl+/',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'shortcuts');
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

export type ProjectPayload = {
  data: {
    palette: {
      colors: string[];
      primaryIndex: number;
      secondaryIndex: number;
    };
    camera: {
      x: number;
      y: number;
      zoom: number;
    };
    history?: {
      undoStack: Array<{ changes: Array<{ x: number; y: number; prev: number; next: number }> }>;
      redoStack: Array<{ changes: Array<{ x: number; y: number; prev: number; next: number }> }>;
    };
  };
  blocks: Array<{ row: number; col: number; data: Uint8Array }>;
};

const writeProjectZip = async (payload: ProjectPayload) => {
  const zip = new JSZip();
  zip.file('data.json', JSON.stringify(payload.data, null, 2));
  for (const block of payload.blocks) {
    zip.file(`pixels/${block.row}-${block.col}.bin`, block.data);
  }
  return zip.generateAsync({ type: 'nodebuffer' });
};

const readProjectZip = async (buffer: Buffer) => {
  const zip = await JSZip.loadAsync(buffer);
  const dataEntry = zip.file('data.json');
  if (!dataEntry) {
    throw new Error('Missing data.json in project');
  }
  const data = JSON.parse(await dataEntry.async('string'));
  const blocks: Array<{ row: number; col: number; data: Uint8Array }> = [];
  const pixelEntries = zip.folder('pixels');
  if (pixelEntries) {
    for (const filename of Object.keys(pixelEntries.files)) {
      if (!filename.endsWith('.bin')) {
        continue;
      }
      const basename = filename.split('/').pop();
      if (!basename) {
        continue;
      }
      const [rowText, colTextWithExt] = basename.split('-');
      const colText = colTextWithExt?.replace('.bin', '');
      if (!rowText || !colText) {
        continue;
      }
      const row = Number(rowText);
      const col = Number(colText);
      const dataBuffer = await zip.file(filename)?.async('uint8array');
      if (!dataBuffer) {
        continue;
      }
      blocks.push({ row, col, data: dataBuffer });
    }
  }
  return { data, blocks };
};

ipcMain.handle('project:save', async (_event, payload: ProjectPayload, existingPath?: string) => {
  if (existingPath) {
    const buffer = await writeProjectZip(payload);
    await writeFile(existingPath, buffer);
    return existingPath;
  }

  const window = BrowserWindow.getFocusedWindow();
  const dialogOptions = {
    filters: [{ name: 'Pixel Splash Project', extensions: ['splash'] }],
    defaultPath: existingPath ?? undefined,
  };
  const { filePath, canceled } = window
    ? await dialog.showSaveDialog(window, dialogOptions)
    : await dialog.showSaveDialog(dialogOptions);

  if (canceled || !filePath) {
    return null;
  }

  const buffer = await writeProjectZip(payload);
  await writeFile(filePath, buffer);
  return filePath;
});

ipcMain.handle('project:load', async (_event, existingPath?: string) => {
  if (existingPath) {
    const buffer = await readFile(existingPath);
    const payload = await readProjectZip(buffer);
    return { path: existingPath, ...payload };
  }

  const window = BrowserWindow.getFocusedWindow();
  const dialogOptions: OpenDialogOptions = {
    filters: [{ name: 'Pixel Splash Project', extensions: ['splash'] }],
    properties: ['openFile'],
    defaultPath: existingPath ?? undefined,
  };
  const { canceled, filePaths } = window
    ? await dialog.showOpenDialog(window, dialogOptions)
    : await dialog.showOpenDialog(dialogOptions);

  if (canceled || filePaths.length === 0) {
    return null;
  }

  const buffer = await readFile(filePaths[0]);
  const payload = await readProjectZip(buffer);
  return { path: filePaths[0], ...payload };
});

ipcMain.on('app:set-title', (event, title: string) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (window) {
    window.setTitle(title);
  }
});
