import { contextBridge, ipcRenderer, webFrame } from 'electron';

contextBridge.exposeInMainWorld('appInfo', {
  name: 'Pixel Splash Studio',
});

contextBridge.exposeInMainWorld('projectApi', {
  save: (payload: unknown, existingPath?: string) =>
    ipcRenderer.invoke('project:save', payload, existingPath),
  load: (existingPath?: string) =>
    ipcRenderer.invoke('project:load', existingPath),
  exportPng: (data: Uint8Array, suggestedName?: string) =>
    ipcRenderer.invoke('export:png', data, suggestedName),
  exportGbr: (data: Uint8Array, suggestedName?: string) =>
    ipcRenderer.invoke('export:gbr', data, suggestedName),
  exportChr: (data: Uint8Array, suggestedName?: string) =>
    ipcRenderer.invoke('export:chr', data, suggestedName),
  exportBsave: (data: Uint8Array, suggestedName?: string) =>
    ipcRenderer.invoke('export:bsave', data, suggestedName),
  exportTileMap: (payload: { png: Uint8Array; tmx: string }) =>
    ipcRenderer.invoke('export:tilemap', payload),
  importImage: () => ipcRenderer.invoke('import:image'),
  exportImage: (format: string, payload: unknown, suggestedName?: string) =>
    ipcRenderer.invoke('export:image', format, payload, suggestedName),
});

contextBridge.exposeInMainWorld('menuApi', {
  onAction: (handler: (action: string) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, action: string) => {
      handler(action);
    };
    ipcRenderer.on('menu:action', listener);
    return () => ipcRenderer.removeListener('menu:action', listener);
  },
});

contextBridge.exposeInMainWorld('appApi', {
  setTitle: (title: string) => ipcRenderer.send('app:set-title', title),
});

contextBridge.exposeInMainWorld('debugApi', {
  logPerf: (message: string) => ipcRenderer.invoke('debug:perf-log', message),
});

const zoomListeners = new Set<(scale: number) => void>();
let suppressZoom = false;
let uiScale = 1;
const UI_SCALE_MIN = 0.5;
const UI_SCALE_MAX = 3;

const notifyZoom = (scale: number) => {
  zoomListeners.forEach((listener) => listener(scale));
};

const clampScale = (value: number) =>
  Math.min(UI_SCALE_MAX, Math.max(UI_SCALE_MIN, value));

const setUiScale = (value: number) => {
  const nextScale = clampScale(value);
  if (nextScale === uiScale) {
    return;
  }
  uiScale = nextScale;
  notifyZoom(uiScale);
};

const handleZoomChange = (
  _event: Electron.IpcRendererEvent,
  zoomDirection: string,
  zoomFactor?: number
) => {
  if (suppressZoom) {
    return;
  }
  if (zoomDirection === 'reset') {
    setUiScale(1);
    return;
  }
  const scale = typeof zoomFactor === 'number' ? zoomFactor : webFrame.getZoomFactor();
  if (scale === 1) {
    setUiScale(1);
    return;
  }
  setUiScale(uiScale * scale);
  if (scale !== 1) {
    suppressZoom = true;
    webFrame.setZoomFactor(1);
    window.setTimeout(() => {
      suppressZoom = false;
    }, 0);
  }
};

ipcRenderer.on('app:zoom-changed', handleZoomChange);

contextBridge.exposeInMainWorld('uiScaleApi', {
  getScale: () => uiScale,
  resetScale: () => {
    setUiScale(1);
    suppressZoom = true;
    webFrame.setZoomFactor(1);
    window.setTimeout(() => {
      suppressZoom = false;
    }, 0);
  },
  setScale: (scale: number) => {
    setUiScale(scale);
  },
  stepScale: (factor: number) => {
    if (!Number.isFinite(factor) || factor === 0) {
      return;
    }
    setUiScale(uiScale * factor);
  },
  onScaleChange: (handler: (scale: number) => void) => {
    zoomListeners.add(handler);
    handler(uiScale);
    return () => zoomListeners.delete(handler);
  },
});
