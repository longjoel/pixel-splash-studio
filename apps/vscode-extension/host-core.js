const JSZip = require('jszip');

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const PLATFORM_CAPABILITY_KEYS = [
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

const DEFAULT_VSCODE_CAPABILITIES = Object.freeze({
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
});

const bytesToBase64 = (bytes) => Buffer.from(bytes).toString('base64');
const base64ToBytes = (value) => new Uint8Array(Buffer.from(value, 'base64'));

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

const normalizePlatformCapabilities = (value) => {
  const out = { ...DEFAULT_VSCODE_CAPABILITIES };
  if (!value || typeof value !== 'object') {
    return out;
  }
  for (const key of PLATFORM_CAPABILITY_KEYS) {
    if (key in value) {
      out[key] = Boolean(value[key]);
    }
  }
  return out;
};

const stripControlChars = (value) =>
  Array.from(value)
    .filter((char) => char.charCodeAt(0) >= 32)
    .join('');

const sanitizeBaseName = (value, fallback) => {
  const base = stripControlChars((value || '').trim().replace(/\.[^.]+$/, ''));
  const safe = base
    .replace(/[<>:"/\\|?*]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return safe || fallback;
};

const writeProjectZip = async (payload) => {
  const zip = new JSZip();
  const data = { ...(payload?.data ?? {}) };

  if (!data.pixelLayers && Array.isArray(payload?.layers) && payload.layers.length > 0) {
    const fallbackActiveLayerId =
      typeof payload?.data?.pixelLayers?.activeLayerId === 'string'
        ? payload.data.pixelLayers.activeLayerId
        : payload.layers[0]?.id;
    data.pixelLayers = {
      layers: payload.layers.map((layer) => ({
        id: layer.id,
        name: layer.name,
        visible: layer.visible,
      })),
      activeLayerId: fallbackActiveLayerId,
    };
  }

  zip.file('data.json', JSON.stringify(data, null, 2));

  if (Array.isArray(payload?.layers) && payload.layers.length > 0) {
    for (const layer of payload.layers) {
      for (const block of layer.blocks ?? []) {
        zip.file(`pixels/${layer.id}/${block.row}-${block.col}.bin`, block.data);
      }
    }
  } else if (Array.isArray(payload?.blocks)) {
    for (const block of payload.blocks) {
      zip.file(`pixels/${block.row}-${block.col}.bin`, block.data);
    }
  }

  for (const reference of payload?.referenceFiles ?? []) {
    zip.file(`references/${reference.filename}`, reference.data);
  }

  return zip.generateAsync({ type: 'uint8array' });
};

const readProjectZip = async (bytes) => {
  const zip = await JSZip.loadAsync(bytes);
  const dataEntry = zip.file('data.json');
  if (!dataEntry) {
    throw new Error('Missing data.json in project');
  }

  const data = JSON.parse(await dataEntry.async('string'));
  const layers = [];
  const blocks = [];
  const layerEntries = data?.pixelLayers?.layers;

  if (Array.isArray(layerEntries) && layerEntries.length > 0) {
    for (const layer of layerEntries) {
      const layerId = layer?.id;
      if (typeof layerId !== 'string' || !layerId) {
        continue;
      }
      const layerFolder = zip.folder(`pixels/${layerId}`);
      const layerBlocks = [];
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
    const pixelFolder = zip.folder('pixels');
    if (pixelFolder) {
      for (const filename of Object.keys(pixelFolder.files)) {
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

  const referenceFiles = [];
  const referencesFolder = zip.folder('references');
  if (referencesFolder) {
    for (const filename of Object.keys(referencesFolder.files)) {
      if (!filename.startsWith('references/')) {
        continue;
      }
      if (filename.endsWith('/')) {
        continue;
      }
      const basename = filename.split('/').pop();
      if (!basename) {
        continue;
      }
      const entry = zip.file(filename);
      if (!entry) {
        continue;
      }
      const fileBytes = await entry.async('uint8array');
      const referenceMeta = (data?.references ?? []).find((ref) => ref.filename === basename);
      referenceFiles.push({
        filename: basename,
        data: fileBytes,
        type: referenceMeta?.type ?? '',
      });
    }
  }

  return {
    data,
    layers: layers.length > 0 ? layers : undefined,
    blocks: blocks.length > 0 ? blocks : undefined,
    referenceFiles: referenceFiles.length > 0 ? referenceFiles : undefined,
  };
};

const ensureHandler = (operations, name) => {
  const handler = operations?.[name];
  if (typeof handler !== 'function') {
    throw new Error(`Missing host operation: ${name}`);
  }
  return handler;
};

const createHostRequestHandler = (operations) => {
  const getUiScale = () => {
    if (typeof operations?.getUiScale !== 'function') {
      return 1;
    }
    const value = operations.getUiScale();
    return Number.isFinite(value) && value > 0 ? value : 1;
  };

  return async (method, payload = {}) => {
    switch (method) {
      case 'project.save':
        return ensureHandler(operations, 'saveProjectPayload')(payload.payload, payload.existingPath);
      case 'project.load':
        return ensureHandler(operations, 'readProjectPayload')(payload.existingPath);
      case 'project.read':
        return ensureHandler(operations, 'readProjectPayload')(payload.existingPath);
      case 'export.png':
        return ensureHandler(operations, 'writeBinaryFile')(
          payload.data,
          payload.suggestedName || 'pixel-splash.png',
          ['png']
        );
      case 'export.gbr':
        return ensureHandler(operations, 'writeBinaryFile')(
          payload.data,
          payload.suggestedName || 'pixel-splash.gbr',
          ['gbr']
        );
      case 'export.chr':
        return ensureHandler(operations, 'writeBinaryFile')(
          payload.data,
          payload.suggestedName || 'pixel-splash.chr',
          ['chr']
        );
      case 'export.bsave':
        return ensureHandler(operations, 'writeBinaryFile')(
          payload.data,
          payload.suggestedName || 'pixel-splash.bsave',
          ['bsave', 'bsv']
        );
      case 'export.tilemap':
        return ensureHandler(operations, 'writeTileMap')(payload);
      case 'app.setTitle':
        if (typeof operations?.setPanelTitle === 'function') {
          operations.setPanelTitle(payload.title);
        }
        return null;
      case 'debug.logPerf':
        if (typeof operations?.logPerf === 'function') {
          operations.logPerf(payload.message);
        }
        return null;
      case 'platform.capabilities': {
        if (typeof operations?.getCapabilities === 'function') {
          const value = await operations.getCapabilities();
          return normalizePlatformCapabilities(value);
        }
        return normalizePlatformCapabilities(DEFAULT_VSCODE_CAPABILITIES);
      }
      case 'uiScale.get':
        return getUiScale();
      case 'uiScale.set':
        if (
          Number.isFinite(payload.value) &&
          payload.value > 0 &&
          typeof operations?.setUiScale === 'function'
        ) {
          operations.setUiScale(payload.value);
          if (typeof operations.emitUiScale === 'function') {
            operations.emitUiScale();
          }
        }
        return getUiScale();
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  };
};

module.exports = {
  DEFAULT_VSCODE_CAPABILITIES,
  createHostRequestHandler,
  normalizePlatformCapabilities,
  packBinary,
  readProjectZip,
  sanitizeBaseName,
  textDecoder,
  textEncoder,
  unpackBinary,
  writeProjectZip,
};
