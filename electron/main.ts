import { app, BrowserWindow, Menu, dialog, ipcMain, shell } from 'electron';
import type { OpenDialogOptions } from 'electron';
import { join } from 'path';
import { access, appendFile, mkdir, readFile, writeFile } from 'fs/promises';
import { spawn } from 'child_process';
import https from 'https';
import { tmpdir } from 'os';
import JSZip from 'jszip';
import { Worker } from 'worker_threads';
import { EXTENSION_MIME_MAP } from '../src/constants';
import { decodeImageFile, encodeImageBuffer, type ExportImagePayload } from './imageCodecs';

// Mesa's RADV Vulkan driver often prints warnings even when Electron doesn't need Vulkan.
// Disable Vulkan by default on Linux to reduce noisy startup logs.
if (process.platform === 'linux' && process.env.PIXEL_SPLASH_ENABLE_VULKAN !== '1') {
  const key = 'disable-features';
  const existing = app.commandLine.getSwitchValue(key);
  if (!existing) {
    app.commandLine.appendSwitch(key, 'Vulkan');
  } else if (!existing.split(',').includes('Vulkan')) {
    app.commandLine.appendSwitch(key, `${existing},Vulkan`);
  }
}

const pathExists = async (path: string) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const perfLoggingEnabled = { value: false };
const memoryUsageEnabled = { value: false };
const viewMenuState = {
  showReferenceLayer: true,
  showPixelLayer: true,
  showTileLayer: true,
  showPixelGrid: true,
  showTileGrid: true,
  showAxes: true,
  toolbarCollapsed: false,
  minimapCollapsed: false,
};

type LospecImportedPalette = { name: string; author?: string; colors: string[] };
let mainWindow: BrowserWindow | null = null;
let pendingLospecPalette: LospecImportedPalette | null = null;

const getMainWindow = () =>
  mainWindow ?? (BrowserWindow.getAllWindows()[0] ?? null);

const applyLospecPalette = (payload: LospecImportedPalette) => {
  pendingLospecPalette = payload;
  const window = getMainWindow();
  if (!window || window.isDestroyed()) {
    return;
  }
  if (!window.webContents.isLoading()) {
    window.webContents.send('palette:apply', payload);
    pendingLospecPalette = null;
  }
};

const escapeDesktopArg = (value: string) => `"${value.replace(/"/g, '\\"')}"`;

const runCommand = (command: string, args: string[]) =>
  new Promise<{ code: number; stdout: string; stderr: string }>((resolve) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout?.setEncoding('utf8');
    child.stderr?.setEncoding('utf8');
    child.stdout?.on('data', (chunk) => {
      stdout += String(chunk);
    });
    child.stderr?.on('data', (chunk) => {
      stderr += String(chunk);
    });
    child.on('close', (code) => resolve({ code: code ?? 0, stdout, stderr }));
    child.on('error', (error) =>
      resolve({ code: 127, stdout, stderr: error instanceof Error ? error.message : String(error) })
    );
  });

const registerLospecUrlHandlerLinux = async () => {
  if (process.platform !== 'linux') {
    throw new Error('URL handler registration is only supported on Linux.');
  }
  if (!app.isPackaged) {
    throw new Error('URL handler registration only works in packaged builds (zip/AppImage/etc).');
  }

  const appName = app.getName() || 'Pixel Splash Studio';
  const desktopId = `${appName.toLowerCase().replace(/\s+/g, '-')}.desktop`;
  const execPath = app.getPath('exe');
  const applicationsDir = join(app.getPath('home'), '.local', 'share', 'applications');
  const desktopPath = join(applicationsDir, desktopId);

  const desktopEntry = [
    '[Desktop Entry]',
    'Type=Application',
    `Name=${appName}`,
    `Exec=${escapeDesktopArg(execPath)} %u`,
    'Terminal=false',
    'Categories=Graphics;',
    'MimeType=x-scheme-handler/lospec-palette;',
    '',
  ].join('\n');

  await mkdir(applicationsDir, { recursive: true });
  await writeFile(desktopPath, desktopEntry, 'utf8');

  const xdgMime = await runCommand('xdg-mime', ['default', desktopId, 'x-scheme-handler/lospec-palette']);
  const updateDb = await runCommand('update-desktop-database', [applicationsDir]);

  return {
    desktopPath,
    desktopId,
    execPath,
    xdgMime,
    updateDb,
  };
};

const setMenuItemChecked = (id: string, checked: boolean) => {
  const menu = Menu.getApplicationMenu();
  const item = menu?.getMenuItemById(id);
  if (item && item.checked !== checked) {
    item.checked = checked;
  }
};

const applyViewMenuState = (partial: Partial<typeof viewMenuState>) => {
  if (typeof partial.showReferenceLayer === 'boolean') {
    viewMenuState.showReferenceLayer = partial.showReferenceLayer;
    setMenuItemChecked('view:showReferenceLayer', partial.showReferenceLayer);
  }
  if (typeof partial.showPixelLayer === 'boolean') {
    viewMenuState.showPixelLayer = partial.showPixelLayer;
    setMenuItemChecked('view:showPixelLayer', partial.showPixelLayer);
  }
  if (typeof partial.showTileLayer === 'boolean') {
    viewMenuState.showTileLayer = partial.showTileLayer;
    setMenuItemChecked('view:showTileLayer', partial.showTileLayer);
  }
  if (typeof partial.showPixelGrid === 'boolean') {
    viewMenuState.showPixelGrid = partial.showPixelGrid;
    setMenuItemChecked('view:showPixelGrid', partial.showPixelGrid);
  }
  if (typeof partial.showTileGrid === 'boolean') {
    viewMenuState.showTileGrid = partial.showTileGrid;
    setMenuItemChecked('view:showTileGrid', partial.showTileGrid);
  }
  if (typeof partial.showAxes === 'boolean') {
    viewMenuState.showAxes = partial.showAxes;
    setMenuItemChecked('view:showAxes', partial.showAxes);
  }
  if (typeof partial.toolbarCollapsed === 'boolean') {
    viewMenuState.toolbarCollapsed = partial.toolbarCollapsed;
    setMenuItemChecked('view:toolbarExpanded', !partial.toolbarCollapsed);
  }
  if (typeof partial.minimapCollapsed === 'boolean') {
    viewMenuState.minimapCollapsed = partial.minimapCollapsed;
    setMenuItemChecked('view:minimapExpanded', !partial.minimapCollapsed);
  }
};

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

  win.webContents.on('zoom-changed', (_event, zoomDirection) => {
    win.webContents.send('app:zoom-changed', zoomDirection, win.webContents.getZoomFactor());
  });

  win.webContents.on('did-finish-load', () => {
    if (pendingLospecPalette) {
      win.webContents.send('palette:apply', pendingLospecPalette);
      pendingLospecPalette = null;
    }
  });

  mainWindow = win;
  return win;
};

const extractLospecDeepLink = (argv: string[]) => {
  for (const arg of argv) {
    if (!arg) {
      continue;
    }
    const trimmed = arg.trim();
    if (trimmed.startsWith('lospec-palette:')) {
      return trimmed;
    }
  }
  return null;
};

const handleLospecDeepLink = async (rawUrl: string) => {
  try {
    const payload = await importLospecPalette(rawUrl);
    applyLospecPalette(payload);
  } catch (error) {
    console.error('Failed to import LoSpec palette from deep link:', rawUrl, error);
  }
};

const gotSingleInstanceLock = app.requestSingleInstanceLock();
if (!gotSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', (_event, argv) => {
    const url = extractLospecDeepLink(argv);
    if (url) {
      void handleLospecDeepLink(url);
    }
    const window = getMainWindow();
    if (window && !window.isDestroyed()) {
      if (window.isMinimized()) {
        window.restore();
      }
      window.focus();
    }
  });
}

app.on('open-url', (event, url) => {
  event.preventDefault();
  if (typeof url === 'string' && url.startsWith('lospec-palette:')) {
    void handleLospecDeepLink(url);
  }
});

app.whenReady().then(() => {
  createWindow();

  try {
    app.setAsDefaultProtocolClient('lospec-palette');
  } catch (error) {
    console.warn('Unable to register lospec-palette protocol client:', error);
  }

  const launchUrl = extractLospecDeepLink(process.argv);
  if (launchUrl) {
    void handleLospecDeepLink(launchUrl);
  }

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
          label: 'Merge Project...',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'mergeProject');
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
      label: 'View',
      submenu: [
        {
          id: 'view:toolbarExpanded',
          label: 'Toolbar Panel',
          type: 'checkbox' as const,
          checked: !viewMenuState.toolbarCollapsed,
          click: (menuItem: Electron.MenuItem) => {
            const next = !menuItem.checked;
            applyViewMenuState({ toolbarCollapsed: next });
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', `view:set:toolbarCollapsed:${next}`);
          },
        },
        {
          id: 'view:minimapExpanded',
          label: 'Minimap Panel',
          type: 'checkbox' as const,
          checked: !viewMenuState.minimapCollapsed,
          click: (menuItem: Electron.MenuItem) => {
            const next = !menuItem.checked;
            applyViewMenuState({ minimapCollapsed: next });
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', `view:set:minimapCollapsed:${next}`);
          },
        },
        { type: 'separator' as const },
        {
          label: 'Layers',
          submenu: [
            {
              id: 'view:showReferenceLayer',
              label: 'Reference Layer',
              type: 'checkbox' as const,
              checked: viewMenuState.showReferenceLayer,
              click: (menuItem: Electron.MenuItem) => {
                applyViewMenuState({ showReferenceLayer: menuItem.checked });
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send(
                  'menu:action',
                  `view:set:showReferenceLayer:${menuItem.checked}`
                );
              },
            },
            {
              id: 'view:showPixelLayer',
              label: 'Pixel Layer',
              type: 'checkbox' as const,
              checked: viewMenuState.showPixelLayer,
              click: (menuItem: Electron.MenuItem) => {
                applyViewMenuState({ showPixelLayer: menuItem.checked });
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send(
                  'menu:action',
                  `view:set:showPixelLayer:${menuItem.checked}`
                );
              },
            },
            {
              id: 'view:showTileLayer',
              label: 'Tile Layer',
              type: 'checkbox' as const,
              checked: viewMenuState.showTileLayer,
              click: (menuItem: Electron.MenuItem) => {
                applyViewMenuState({ showTileLayer: menuItem.checked });
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send(
                  'menu:action',
                  `view:set:showTileLayer:${menuItem.checked}`
                );
              },
            },
          ],
        },
        { type: 'separator' as const },
        {
          label: 'Overlays',
          submenu: [
            {
              id: 'view:showPixelGrid',
              label: 'Pixel Grid',
              type: 'checkbox' as const,
              checked: viewMenuState.showPixelGrid,
              click: (menuItem: Electron.MenuItem) => {
                applyViewMenuState({ showPixelGrid: menuItem.checked });
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send(
                  'menu:action',
                  `view:set:showPixelGrid:${menuItem.checked}`
                );
              },
            },
            {
              id: 'view:showTileGrid',
              label: 'Tile Grid',
              type: 'checkbox' as const,
              checked: viewMenuState.showTileGrid,
              click: (menuItem: Electron.MenuItem) => {
                applyViewMenuState({ showTileGrid: menuItem.checked });
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send(
                  'menu:action',
                  `view:set:showTileGrid:${menuItem.checked}`
                );
              },
            },
            {
              id: 'view:showAxes',
              label: 'Axes',
              type: 'checkbox' as const,
              checked: viewMenuState.showAxes,
              click: (menuItem: Electron.MenuItem) => {
                applyViewMenuState({ showAxes: menuItem.checked });
                const window = BrowserWindow.getFocusedWindow();
                window?.webContents.send(
                  'menu:action',
                  `view:set:showAxes:${menuItem.checked}`
                );
              },
            },
          ],
        },
        { type: 'separator' as const },
        {
          label: 'Select Pen Tool',
          click: () => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send('menu:action', 'view:select-tool:pen');
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
        {
          label: 'Register LoSpec URL Handler (Linux)…',
          enabled: process.platform === 'linux',
          click: async () => {
            try {
              const result = await registerLospecUrlHandlerLinux();
              await dialog.showMessageBox({
                type: 'info',
                message: 'Registered lospec-palette:// URL handler.',
                detail: `Desktop entry: ${result.desktopPath}\n\nIf links still don’t open, you may need to log out and back in.`,
                buttons: ['OK'],
              });
            } catch (error) {
              const message = error instanceof Error ? error.message : 'Unable to register URL handler.';
              await dialog.showMessageBox({
                type: 'error',
                message: 'Registration failed',
                detail: message,
                buttons: ['OK'],
              });
            }
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
        {
          label: 'Tile Debug Overlay',
          type: 'checkbox' as const,
          checked: false,
          click: (menuItem: Electron.MenuItem) => {
            const window = BrowserWindow.getFocusedWindow();
            window?.webContents.send(
              'menu:action',
              menuItem.checked ? 'tileDebug:on' : 'tileDebug:off'
            );
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
      undoStack: Array<{
        layerId?: string;
        changes: Array<{ x: number; y: number; prev: number; next: number }>;
      }>;
      redoStack: Array<{
        layerId?: string;
        changes: Array<{ x: number; y: number; prev: number; next: number }>;
      }>;
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
    pixelLayers?: {
      layers: Array<{ id: string; name: string; visible: boolean }>;
      activeLayerId?: string;
    };
  };
  layers?: Array<{
    id: string;
    name: string;
    visible: boolean;
    blocks: Array<{ row: number; col: number; data: Uint8Array }>;
  }>;
  blocks?: Array<{ row: number; col: number; data: Uint8Array }>;
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
    const layerEntries =
      payload.layers && payload.layers.length > 0
        ? payload.layers
        : payload.blocks
          ? [{ id: 'legacy', name: 'Layer 1', visible: true, blocks: payload.blocks }]
          : [];
    for (const layer of layerEntries) {
      for (const block of layer.blocks) {
        const buffer = block.data.buffer;
        if (buffer instanceof ArrayBuffer && !seenBuffers.has(buffer)) {
          seenBuffers.add(buffer);
          transferList.push(buffer);
        }
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
  const layers: Array<{
    id: string;
    name: string;
    visible: boolean;
    blocks: Array<{ row: number; col: number; data: Uint8Array }>;
  }> = [];
  const blocks: Array<{ row: number; col: number; data: Uint8Array }> = [];
  const layerEntries = data?.pixelLayers?.layers;
  if (Array.isArray(layerEntries) && layerEntries.length > 0) {
    for (const layer of layerEntries) {
      const layerId = layer?.id;
      if (typeof layerId !== 'string' || !layerId) {
        continue;
      }
      const layerFolder = zip.folder(`pixels/${layerId}`);
      const layerBlocks: Array<{ row: number; col: number; data: Uint8Array }> = [];
      if (layerFolder) {
        for (const filename of Object.keys(layerFolder.files)) {
          if (!filename.endsWith('.bin')) {
            continue;
          }
          const basename = filename.split('/').pop();
          if (!basename) {
            continue;
          }
          const match = basename.match(/(-?\d+)-(-?\d+)\.bin$/);
          if (!match) {
            continue;
          }
          const row = Number(match[1]);
          const col = Number(match[2]);
          const dataBuffer = await zip.file(filename)?.async('uint8array');
          if (!dataBuffer) {
            continue;
          }
          layerBlocks.push({ row, col, data: dataBuffer });
        }
      }
      layers.push({
        id: layerId,
        name: typeof layer?.name === 'string' ? layer.name : 'Layer',
        visible: layer?.visible !== false,
        blocks: layerBlocks,
      });
    }
  } else {
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
        const match = basename.match(/(-?\d+)-(-?\d+)\.bin$/);
        if (!match) {
          continue;
        }
        const row = Number(match[1]);
        const col = Number(match[2]);
        const dataBuffer = await zip.file(filename)?.async('uint8array');
        if (!dataBuffer) {
          continue;
        }
        blocks.push({ row, col, data: dataBuffer });
      }
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
  return {
    data,
    layers: layers.length > 0 ? layers : undefined,
    blocks: blocks.length > 0 ? blocks : undefined,
    referenceFiles,
  };
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

ipcMain.handle('project:read', async (_event, existingPath?: string) => {
  const e2ePath = process.env.PIXEL_SPLASH_E2E_PROJECT_READ_PATH;
  if (e2ePath) {
    const buffer = await readFile(e2ePath);
    const payload = await readProjectZip(buffer);
    return { path: e2ePath, ...payload };
  }

  if (existingPath) {
    const buffer = await readFile(existingPath);
    const payload = await readProjectZip(buffer);
    return { path: existingPath, ...payload };
  }

  const window = BrowserWindow.getFocusedWindow();
  const dialogOptions: OpenDialogOptions = {
    filters: [{ name: 'Pixel Splash Project', extensions: ['splash'] }],
    properties: ['openFile'],
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

ipcMain.handle(
  'export:tilemap',
  async (_event, payload: { png: Uint8Array; tmx: string }) => {
    const window = BrowserWindow.getFocusedWindow();
    const dialogOptions: OpenDialogOptions = {
      properties: ['openDirectory', 'createDirectory'],
    };
    const { canceled, filePaths } = window
      ? await dialog.showOpenDialog(window, dialogOptions)
      : await dialog.showOpenDialog(dialogOptions);

    if (canceled || filePaths.length === 0) {
      return null;
    }

    const basePath = filePaths[0];
    let outputPath = basePath;
    const pngPath = join(outputPath, 'tiles.png');
    const tmxPath = join(outputPath, 'tiles.tmx');
    if (await pathExists(pngPath) || await pathExists(tmxPath)) {
      const stamp = new Date().toISOString().replace(/[:.]/g, '-');
      outputPath = join(outputPath, `tile-export-${stamp}`);
      await mkdir(outputPath, { recursive: true });
    }

    const finalPngPath = join(outputPath, 'tiles.png');
    const finalTmxPath = join(outputPath, 'tiles.tmx');
    await writeFile(finalPngPath, Buffer.from(payload.png));
    await writeFile(finalTmxPath, payload.tmx);
    return outputPath;
  }
);

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

type LospecPalettePayload = { name?: string; author?: string; colors?: unknown };

function toLospecSlug(input: string) {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.startsWith('lospec-palette:')) {
    try {
      const url = new URL(trimmed);
      const hostname = url.hostname?.trim() ?? '';
      const pathname = url.pathname?.replace(/^\/+/, '').trim() ?? '';
      const combined = hostname || pathname;
      return combined ? combined.replace(/\.(json|hex)$/i, '') : null;
    } catch {
      const raw = trimmed.replace(/^lospec-palette:/, '').replace(/^\/+/, '');
      return raw ? raw.replace(/\.(json|hex)$/i, '') : null;
    }
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const url = new URL(trimmed);
      const match = url.pathname.match(/\/palette-list\/([^/]+)/);
      const slug = match?.[1] ?? null;
      return slug ? slug.replace(/\.(json|hex)$/i, '') : null;
    } catch {
      return null;
    }
  }
  return trimmed.replace(/\.(json|hex)$/i, '');
}

function normalizeHexColor(value: string) {
  const trimmed = value.trim();
  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
  if (!/^#[0-9a-f]{6}$/i.test(withHash)) {
    return null;
  }
  return withHash.toLowerCase();
}

async function fetchText(url: string) {
  const fetchFn = (globalThis as unknown as { fetch?: typeof fetch }).fetch;
  if (typeof fetchFn === 'function') {
    const response = await fetchFn(url, {
      headers: {
        accept: 'application/json,text/plain;q=0.9,*/*;q=0.8',
      },
    });
    if (!response.ok) {
      throw new Error(`Fetch failed (${response.status})`);
    }
    return response.text();
  }
  return new Promise<string>((resolve, reject) => {
    https
      .get(url, (res) => {
        const status = res.statusCode ?? 0;
        if (status < 200 || status >= 300) {
          reject(new Error(`Fetch failed (${status})`));
          res.resume();
          return;
        }
        res.setEncoding('utf8');
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

async function importLospecPalette(urlOrSlug: string): Promise<LospecImportedPalette> {
  const slug = toLospecSlug(urlOrSlug);
  if (!slug) {
    throw new Error('Invalid LoSpec palette URL.');
  }

  const jsonUrl = `https://lospec.com/palette-list/${encodeURIComponent(slug)}.json`;
  const hexUrl = `https://lospec.com/palette-list/${encodeURIComponent(slug)}.hex`;

  try {
    const raw = await fetchText(jsonUrl);
    const parsed = JSON.parse(raw) as LospecPalettePayload;
    const colors = Array.isArray(parsed.colors) ? parsed.colors : [];
    const normalized = colors
      .filter((entry): entry is string => typeof entry === 'string')
      .map(normalizeHexColor)
      .filter((entry): entry is string => Boolean(entry));

    if (normalized.length === 0) {
      throw new Error('LoSpec JSON had no valid colors.');
    }

    return {
      name: typeof parsed.name === 'string' ? parsed.name : slug,
      author: typeof parsed.author === 'string' ? parsed.author : undefined,
      colors: normalized,
    };
  } catch (error) {
    const raw = await fetchText(hexUrl);
    const normalized = raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('//') && !line.startsWith(';'))
      .map(normalizeHexColor)
      .filter((entry): entry is string => Boolean(entry));
    if (normalized.length === 0) {
      const message = error instanceof Error ? error.message : 'Unable to import palette.';
      throw new Error(message);
    }
    return { name: slug, colors: normalized };
  }
}

ipcMain.handle('palette:import-lospec', async (_event, urlOrSlug: string) =>
  importLospecPalette(urlOrSlug)
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

ipcMain.on('view:set-state', (_event, partial: unknown) => {
  if (!partial || typeof partial !== 'object') {
    return;
  }
  const state = partial as Partial<typeof viewMenuState>;
  applyViewMenuState(state);
});
