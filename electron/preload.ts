import { contextBridge, ipcRenderer } from 'electron';

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
