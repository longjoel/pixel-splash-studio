import { app, BrowserWindow, Menu, dialog, ipcMain, OpenDialogOptions } from 'electron';
import type { MenuItem } from 'electron';
import { join } from 'path';
import { appendFile, readFile } from 'fs/promises';
import { tmpdir } from 'os';
import JSZip from 'jszip';
import { Worker } from 'worker_threads';

const perfLoggingEnabled = { value: false };

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
      label: 'Options',
      submenu: [
        {
          label: 'Performance Logging',
          type: 'checkbox' as const,
          checked: perfLoggingEnabled.value,
          click: (menuItem: Electron.MenuItem) => {
            perfLoggingEnabled.value = menuItem.checked;
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

app.on('before-quit', () => {
  const filePath = join(tmpdir(), 'pixel-splash-perf.log');
  console.log(`Perf log: ${filePath}`);
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

const writeProjectToPath = (payload: ProjectPayload, filePath: string) =>
  new Promise<void>((resolve, reject) => {
    const transferList: ArrayBuffer[] = [];
    const seenBuffers = new Set<ArrayBuffer>();
    for (const block of payload.blocks) {
      const buffer = block.data.buffer;
      if (buffer instanceof ArrayBuffer && !seenBuffers.has(buffer)) {
        seenBuffers.add(buffer);
        transferList.push(buffer);
      }
    }

    const worker = new Worker(join(__dirname, 'projectWriter.js'), {
      workerData: { payload, filePath },
      transferList,
    });
    let settled = false;

    worker.once('message', (message) => {
      settled = true;
      if (message?.ok) {
        resolve();
      } else {
        const errorMessage = message?.error?.message ?? 'Failed to write project';
        reject(new Error(errorMessage));
      }
    });
    worker.once('error', (error) => {
      settled = true;
      reject(error);
    });
    worker.once('exit', (code) => {
      if (!settled && code !== 0) {
        reject(new Error(`Project writer exited with code ${code}`));
      }
    });
  });

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
    await writeProjectToPath(payload, existingPath);
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

  await writeProjectToPath(payload, filePath);
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

ipcMain.handle('debug:perf-log', async (_event, message: string) => {
  if (!perfLoggingEnabled.value) {
    return null;
  }
  const filePath = join(tmpdir(), 'pixel-splash-perf.log');
  const line = `[${new Date().toISOString()}] ${message}\n`;
  await appendFile(filePath, line);
  return filePath;
});

ipcMain.on('app:set-title', (event, title: string) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (window) {
    window.setTitle(title);
  }
});
