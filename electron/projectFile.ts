import JSZip from 'jszip';
import { EXTENSION_MIME_MAP } from '../src/constants';

export type ProjectBlock = { row: number; col: number; data: Uint8Array };

export type ProjectLayer = {
  id: string;
  name: string;
  visible: boolean;
  blocks: ProjectBlock[];
};

export type ProjectPayload = {
  data: {
    palette: {
      colors: string[];
      selectedIndices?: number[];
      primaryIndex?: number;
      secondaryIndex?: number;
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
      columns?: number;
      rows?: number;
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
  layers?: ProjectLayer[];
  blocks?: ProjectBlock[];
  referenceFiles?: Array<{ filename: string; data: Uint8Array; type: string }>;
};

const getMimeTypeFromFilename = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return EXTENSION_MIME_MAP[ext] ?? '';
};

const getLayerEntries = (payload: ProjectPayload): ProjectLayer[] =>
  payload.layers && payload.layers.length > 0
    ? payload.layers
    : payload.blocks
      ? [{ id: 'legacy', name: 'Layer 1', visible: true, blocks: payload.blocks }]
      : [];

export const collectProjectTransferList = (payload: ProjectPayload) => {
  const transferList: ArrayBuffer[] = [];
  const seenBuffers = new Set<ArrayBuffer>();
  const layers = getLayerEntries(payload);

  for (const layer of layers) {
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

  return transferList;
};

export const writeProjectZip = async (payload: ProjectPayload) => {
  const zip = new JSZip();
  const data = { ...payload.data };

  if (!data.pixelLayers && payload.layers && payload.layers.length > 0) {
    const fallbackActiveLayerId =
      (typeof payload.data?.pixelLayers?.activeLayerId === 'string'
        ? payload.data.pixelLayers.activeLayerId
        : undefined) ?? payload.layers[0]?.id;
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

  if (payload.layers && payload.layers.length > 0) {
    for (const layer of payload.layers) {
      for (const block of layer.blocks) {
        zip.file(`pixels/${layer.id}/${block.row}-${block.col}.bin`, block.data);
      }
    }
  } else if (payload.blocks) {
    for (const block of payload.blocks) {
      zip.file(`pixels/${block.row}-${block.col}.bin`, block.data);
    }
  }

  for (const reference of payload.referenceFiles ?? []) {
    zip.file(`references/${reference.filename}`, reference.data);
  }

  return zip.generateAsync({ type: 'nodebuffer' });
};

export const readProjectZip = async (buffer: Buffer | Uint8Array | ArrayBuffer) => {
  const zip = await JSZip.loadAsync(buffer);
  const dataEntry = zip.file('data.json');
  if (!dataEntry) {
    throw new Error('Missing data.json in project');
  }

  const data = JSON.parse(await dataEntry.async('string'));
  const layers: ProjectLayer[] = [];
  const blocks: ProjectBlock[] = [];
  const layerEntries = data?.pixelLayers?.layers;

  if (Array.isArray(layerEntries) && layerEntries.length > 0) {
    for (const layer of layerEntries) {
      const layerId = layer?.id;
      if (typeof layerId !== 'string' || !layerId) {
        continue;
      }
      const layerFolder = zip.folder(`pixels/${layerId}`);
      const layerBlocks: ProjectBlock[] = [];
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
    const type = referenceTypes.get(basename) || getMimeTypeFromFilename(basename) || 'image/png';
    referenceFiles.push({ filename: basename, data: dataBuffer, type });
  }

  return {
    data,
    layers: layers.length > 0 ? layers : undefined,
    blocks: blocks.length > 0 ? blocks : undefined,
    referenceFiles,
  } satisfies ProjectPayload;
};
