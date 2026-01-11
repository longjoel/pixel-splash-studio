import { app, BrowserWindow, Menu, dialog, ipcMain, OpenDialogOptions, shell } from 'electron';
import type { MenuItem } from 'electron';
import { join } from 'path';
import { appendFile, readFile, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import JSZip from 'jszip';
import { Worker } from 'worker_threads';
import { EXTENSION_MIME_MAP } from '../src/constants';
import { decodeImageFile, encodeImageBuffer, type ExportImagePayload } from './imageCodecs';

const perfLoggingEnabled = { value: false };
const memoryUsageEnabled = { value: false };

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
    win.loadFile(join(app.getAppPath(), 'dist', 'index.html'));
  }
  win.webContents.openDevTools({ mode: 'detach' });

  win.webContents.on('zoom-changed', (_event, zoomDirection) => {
    win.webContents.send('app:zoom-changed', zoomDirection, win.webContents.getZoomFactor());
  });

  return win;
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
        {
          label: 'Import ROMs...',
          accelerator: 'CmdOrCtrl+I',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'importImage');
          },
        },
        {
          label: 'Export Selection',
          submenu: [
            {
              label: 'PNG...',
              accelerator: 'CmdOrCtrl+Shift+E',
              click: () => {
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send('menu:action', 'exportPng');
              },
            },
            {
              label: 'BMP...',
              click: () => {
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send('menu:action', 'exportBmp');
              },
            },
            {
              label: 'GIF...',
              click: () => {
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send('menu:action', 'exportGif');
              },
            },
            {
              label: 'PCX...',
              click: () => {
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send('menu:action', 'exportPcx');
              },
            },
            {
              label: 'TGA...',
              click: () => {
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send('menu:action', 'exportTga');
              },
            },
            {
              label: 'BSAVE CGA 320x200...',
              click: () => {
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send('menu:action', 'exportBsaveCga');
              },
            },
            {
              label: 'BSAVE EGA 320x200...',
              click: () => {
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send('menu:action', 'exportBsaveEga');
              },
            },
            {
              label: 'BSAVE VGA 320x200...',
              click: () => {
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send('menu:action', 'exportBsaveVga');
              },
            },
            {
              label: 'Game Boy GBR...',
              accelerator: 'CmdOrCtrl+Shift+G',
              click: () => {
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send('menu:action', 'exportGbr');
              },
            },
            {
              label: 'NES CHR...',
              click: () => {
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send('menu:action', 'exportChr');
              },
            },
          ],
        },
        { type: 'separator' as const },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
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
          label: 'Consolidate Palette',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'palette:consolidate');
          },
        },
        { type: 'separator' as const },
        {
          label: 'Memory Usage',
          type: 'checkbox' as const,
          checked: memoryUsageEnabled.value,
          click: (menuItem: Electron.MenuItem) => {
            memoryUsageEnabled.value = menuItem.checked;
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send(
              'menu:action',
              menuItem.checked ? 'memory:on' : 'memory:off'
            );
          },
        },
        {
          label: 'Performance Logging',
          type: 'checkbox' as const,
          checked: perfLoggingEnabled.value,
          click: (menuItem: Electron.MenuItem) => {
            perfLoggingEnabled.value = menuItem.checked;
          },
        },
        { type: 'separator' as const },
        {
          label: 'Reset UI Scale',
          accelerator: 'CmdOrCtrl+0',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'uiScale:reset');
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
        { type: 'separator' as const },
        {
          label: 'LICENSE',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'license');
          },
        },
        {
          label: 'GitHub Repo',
          click: async () => {
            await shell.openExternal('https://github.com/longjoel/pixel-splash-studio');
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
    references?: Array<{
      id: string;
      filename: string;
      type: string;
      width: number;
      height: number;
      x: number;
      y: number;
      scale: number;
      rotation: number;
      flipX: boolean;
      flipY: boolean;
      opacity: number;
    }>;
    tileSets?: Array<{
      id: string;
      name: string;
      tileWidth: number;
      tileHeight: number;
      tiles: Array<{
        id: string;
        name?: string;
        pixels: number[];
      }>;
    }>;
    tileMaps?: Array<{
      id: string;
      name: string;
      tileSetId: string;
      originX: number;
      originY: number;
      columns: number;
      rows: number;
      tiles: number[];
    }>;
  };
  blocks: Array<{ row: number; col: number; data: Uint8Array }>;
  referenceFiles?: Array<{ filename: string; data: Uint8Array; type: string }>;
};

const getMimeTypeFromFilename = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return EXTENSION_MIME_MAP[ext] ?? '';
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
    for (const reference of payload.referenceFiles ?? []) {
      const buffer = reference.data.buffer;
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
  const referenceFiles: Array<{ filename: string; data: Uint8Array; type: string }> = [];
  const referenceTypes = new Map<string, string>();
  for (const reference of data.references ?? []) {
    if (reference?.filename) {
      referenceTypes.set(reference.filename, reference.type);
    }
  }
  for (const filename of Object.keys(zip.files)) {
    if (!filename.startsWith('references/') || filename.endsWith('/')) {
      continue;
    }
    const basename = filename.slice('references/'.length);
    if (!basename) {
      continue;
    }
    const dataBuffer = await zip.file(filename)?.async('uint8array');
    if (!dataBuffer) {
      continue;
    }
    const type =
      referenceTypes.get(basename) || getMimeTypeFromFilename(basename) || 'image/png';
    referenceFiles.push({ filename: basename, data: dataBuffer, type });
  }
  return { data, blocks, referenceFiles };
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

ipcMain.handle('export:png', async (_event, data: Uint8Array, suggestedName?: string) => {
  const e2ePath = process.env.PIXEL_SPLASH_E2E_EXPORT_PATH;
  if (e2ePath) {
    await writeFile(e2ePath, Buffer.from(data));
    return e2ePath;
  }

  const window = BrowserWindow.getFocusedWindow();
  const dialogOptions = {
    filters: [{ name: 'PNG Image', extensions: ['png'] }],
    defaultPath: suggestedName ?? 'pixel-splash-selection.png',
  };
  const { filePath, canceled } = window
    ? await dialog.showSaveDialog(window, dialogOptions)
    : await dialog.showSaveDialog(dialogOptions);

  if (canceled || !filePath) {
    return null;
  }

  await writeFile(filePath, Buffer.from(data));
  return filePath;
});

ipcMain.handle('export:gbr', async (_event, data: Uint8Array, suggestedName?: string) => {
  const window = BrowserWindow.getFocusedWindow();
  const dialogOptions = {
    filters: [{ name: 'Game Boy Tile Set', extensions: ['gbr'] }],
    defaultPath: suggestedName ?? 'pixel-splash-selection.gbr',
  };
  const { filePath, canceled } = window
    ? await dialog.showSaveDialog(window, dialogOptions)
    : await dialog.showSaveDialog(dialogOptions);

  if (canceled || !filePath) {
    return null;
  }

  await writeFile(filePath, Buffer.from(data));
  return filePath;
});

ipcMain.handle('export:chr', async (_event, data: Uint8Array, suggestedName?: string) => {
  const window = BrowserWindow.getFocusedWindow();
  const dialogOptions = {
    filters: [{ name: 'NES CHR', extensions: ['chr'] }],
    defaultPath: suggestedName ?? 'pixel-splash-selection.chr',
  };
  const { filePath, canceled } = window
    ? await dialog.showSaveDialog(window, dialogOptions)
    : await dialog.showSaveDialog(dialogOptions);

  if (canceled || !filePath) {
    return null;
  }

  await writeFile(filePath, Buffer.from(data));
  return filePath;
});

ipcMain.handle('export:bsave', async (_event, data: Uint8Array, suggestedName?: string) => {
  const window = BrowserWindow.getFocusedWindow();
  const dialogOptions = {
    filters: [{ name: 'BSAVE', extensions: ['bsave', 'bsv'] }],
    defaultPath: suggestedName ?? 'pixel-splash-selection.bsave',
  };
  const { filePath, canceled } = window
    ? await dialog.showSaveDialog(window, dialogOptions)
    : await dialog.showSaveDialog(dialogOptions);

  if (canceled || !filePath) {
    return null;
  }

  await writeFile(filePath, Buffer.from(data));
  return filePath;
});

ipcMain.handle('import:image', async () => {
  const window = BrowserWindow.getFocusedWindow();
  const dialogOptions: OpenDialogOptions = {
    filters: [
      {
        name: 'Image/ROM Files',
        extensions: [
          'bmp',
          'gif',
          'pcx',
          'tga',
          'gbr',
          'nes',
          'chr',
          'gb',
          'gbc',
          'iff',
          'ilbm',
          'lbm',
          'bbm',
        ],
      },
    ],
    properties: ['openFile'],
  };
  const { canceled, filePaths } = window
    ? await dialog.showOpenDialog(window, dialogOptions)
    : await dialog.showOpenDialog(dialogOptions);

  if (canceled || filePaths.length === 0) {
    return null;
  }

  try {
    return await decodeImageFile(filePaths[0]);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to import file.';
    console.error('Failed to import file:', error);
    dialog.showErrorBox('Import Failed', message);
    return null;
  }
});

ipcMain.handle(
  'export:image',
  async (_event, format: string, payload: ExportImagePayload, suggestedName?: string) => {
    const buffer = await encodeImageBuffer(format, payload);
    const window = BrowserWindow.getFocusedWindow();
    const extension = format.toLowerCase();
    const dialogOptions = {
      filters: [{ name: `${extension.toUpperCase()} Image`, extensions: [extension] }],
      defaultPath: suggestedName ?? `pixel-splash-selection.${extension}`,
    };
    const { filePath, canceled } = window
      ? await dialog.showSaveDialog(window, dialogOptions)
      : await dialog.showSaveDialog(dialogOptions);

    if (canceled || !filePath) {
      return null;
    }

    await writeFile(filePath, Buffer.from(buffer));
    return filePath;
  }
);

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
