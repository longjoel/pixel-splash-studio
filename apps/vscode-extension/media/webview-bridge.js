(function () {
  if (typeof acquireVsCodeApi !== 'function') {
    return;
  }

  const vscode = acquireVsCodeApi();
  let nextRequestId = 1;
  const pending = new Map();
  let uiScale = 1;
  const uiScaleListeners = new Set();

  const CAPABILITY_KEYS = [
    'importImage',
    'exportPng',
    'exportTileMap',
    'exportImage',
    'recording',
    'ai',
    'options',
    'menuActions',
    'viewMenuState',
    'fullscreenToggle',
  ];

  const DEFAULT_CAPABILITIES = {
    importImage: false,
    exportPng: true,
    exportTileMap: true,
    exportImage: false,
    recording: false,
    ai: false,
    options: false,
    menuActions: false,
    viewMenuState: false,
    fullscreenToggle: false,
  };

  let capabilities = { ...DEFAULT_CAPABILITIES };

  const normalizeCapabilities = (value) => {
    const out = { ...DEFAULT_CAPABILITIES };
    if (!value || typeof value !== 'object') {
      return out;
    }
    CAPABILITY_KEYS.forEach((key) => {
      if (key in value) {
        out[key] = Boolean(value[key]);
      }
    });
    return out;
  };

  const emitCapabilities = () => {
    window.__PSS_PLATFORM_CAPABILITIES__ = { ...capabilities };
    window.dispatchEvent(
      new CustomEvent('pss:capabilities', {
        detail: { ...capabilities },
      })
    );
  };

  const applyCapabilities = (value) => {
    capabilities = normalizeCapabilities(value);
    emitCapabilities();
  };

  const bytesToBase64 = (bytes) => {
    let binary = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      const slice = bytes.subarray(i, i + chunk);
      binary += String.fromCharCode.apply(null, Array.from(slice));
    }
    return btoa(binary);
  };

  const base64ToBytes = (value) => {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };

  const packBinary = (value) => {
    if (value instanceof Uint8Array) {
      return { __pssU8: bytesToBase64(value) };
    }
    if (value instanceof ArrayBuffer) {
      return { __pssU8: bytesToBase64(new Uint8Array(value)) };
    }
    if (Array.isArray(value)) {
      return value.map((entry) => packBinary(entry));
    }
    if (value && typeof value === 'object') {
      const out = {};
      for (const [key, entry] of Object.entries(value)) {
        out[key] = packBinary(entry);
      }
      return out;
    }
    return value;
  };

  const unpackBinary = (value) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (typeof value.__pssU8 === 'string') {
        return base64ToBytes(value.__pssU8);
      }
      const out = {};
      for (const [key, entry] of Object.entries(value)) {
        out[key] = unpackBinary(entry);
      }
      return out;
    }
    if (Array.isArray(value)) {
      return value.map((entry) => unpackBinary(entry));
    }
    return value;
  };

  const request = (method, payload) =>
    new Promise((resolve, reject) => {
      const id = nextRequestId;
      nextRequestId += 1;
      pending.set(id, { resolve, reject });
      vscode.postMessage({
        type: 'pss:request',
        id,
        method,
        payload: packBinary(payload),
      });
    });

  window.addEventListener('message', (event) => {
    const message = event.data;
    if (!message || typeof message !== 'object') {
      return;
    }
    if (message.type === 'pss:response') {
      const callback = pending.get(message.id);
      if (!callback) {
        return;
      }
      pending.delete(message.id);
      if (message.ok) {
        callback.resolve(unpackBinary(message.result));
      } else {
        callback.reject(new Error(message.error || 'Request failed.'));
      }
      return;
    }
    if (message.type === 'pss:event' && message.event === 'uiScale') {
      const nextScale = Number(message.value);
      if (Number.isFinite(nextScale) && nextScale > 0) {
        uiScale = nextScale;
        uiScaleListeners.forEach((handler) => {
          try {
            handler(uiScale);
          } catch {
            // ignore handler errors
          }
        });
      }
      return;
    }
    if (message.type === 'pss:event' && message.event === 'capabilities') {
      applyCapabilities(message.value);
    }
  });

  window.__PSS_BROWSER_DEMO__ = false;
  applyCapabilities(DEFAULT_CAPABILITIES);

  window.projectApi = {
    save: (payload, existingPath) => request('project.save', { payload, existingPath }),
    load: (existingPath) => request('project.load', { existingPath }),
    read: (existingPath) => request('project.read', { existingPath }),
    exportPng: (data, suggestedName) => request('export.png', { data, suggestedName }),
    exportGbr: (data, suggestedName) => request('export.gbr', { data, suggestedName }),
    exportChr: (data, suggestedName) => request('export.chr', { data, suggestedName }),
    exportBsave: (data, suggestedName) => request('export.bsave', { data, suggestedName }),
    exportTileMap: (payload) => request('export.tilemap', payload),
  };

  window.appApi = {
    setTitle: (title) => {
      void request('app.setTitle', { title });
    },
  };

  window.debugApi = {
    logPerf: (message) => request('debug.logPerf', { message }),
  };

  window.uiScaleApi = {
    getScale: () => uiScale,
    resetScale: () => {
      uiScale = 1;
      uiScaleListeners.forEach((handler) => handler(uiScale));
    },
    setScale: (scale) => {
      if (!Number.isFinite(scale) || scale <= 0) {
        return;
      }
      uiScale = scale;
      uiScaleListeners.forEach((handler) => handler(uiScale));
    },
    stepScale: (factor) => {
      if (!Number.isFinite(factor) || factor === 0) {
        return;
      }
      uiScale = Math.max(0.5, Math.min(3, uiScale * factor));
      uiScaleListeners.forEach((handler) => handler(uiScale));
    },
    onScaleChange: (handler) => {
      uiScaleListeners.add(handler);
      handler(uiScale);
      return () => uiScaleListeners.delete(handler);
    },
  };

  vscode.postMessage({ type: 'pss:ready' });
  void request('platform.capabilities')
    .then((value) => {
      applyCapabilities(value);
    })
    .catch(() => {
      // Keep default bridge capabilities if host is older.
    });
})();
