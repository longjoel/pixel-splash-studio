import { create } from 'zustand';
import { CanvasStore, BLOCK_SIZE } from '@/core/canvasStore';

export type PixelLayer = {
  id: string;
  name: string;
  visible: boolean;
  store: CanvasStore;
};

export type PixelLayerPayload = {
  id: string;
  name: string;
  visible: boolean;
  blocks: Array<{ row: number; col: number; data: Uint8Array }>;
};

type DirtyBlock = { layerId: string; row: number; col: number };

type PixelState = {
  layers: PixelLayer[];
  activeLayerId: string;
  version: number;
  dirtyBlocks: Set<string>;
  dirtyAll: boolean;
  createLayer: (name?: string) => string;
  deleteLayer: (id: string) => void;
  renameLayer: (id: string, name: string) => void;
  setLayerVisible: (id: string, visible: boolean) => void;
  toggleLayerVisible: (id: string) => void;
  moveLayer: (id: string, direction: 'up' | 'down') => void;
  setActiveLayer: (id: string) => void;
  getPixel: (x: number, y: number) => number;
  getPixelInLayer: (layerId: string, x: number, y: number) => number;
  getPixelComposite: (x: number, y: number) => number;
  setPixel: (x: number, y: number, paletteIndex: number) => void;
  setPixelInLayer: (layerId: string, x: number, y: number, paletteIndex: number) => void;
  setPixels: (pixels: Array<{ x: number; y: number; paletteIndex: number }>) => void;
  setPixelsInLayer: (
    layerId: string,
    pixels: Array<{ x: number; y: number; paletteIndex: number }>
  ) => void;
  exportLayerPayloads: () => PixelLayerPayload[];
  loadLayerPayloads: (layers: PixelLayerPayload[], activeLayerId?: string) => void;
  loadBlocks: (blocks: Array<{ row: number; col: number; data: Uint8Array }>) => void;
  clear: () => void;
  consumeDirtyBlocks: () => { dirtyAll: boolean; blocks: DirtyBlock[] };
};

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const initialLayerId = createId();

export const usePixelStore = create<PixelState>((set, get) => ({
  layers: [{ id: initialLayerId, name: 'Layer 1', visible: true, store: new CanvasStore() }],
  activeLayerId: initialLayerId,
  version: 0,
  dirtyBlocks: new Set(),
  dirtyAll: true,
  createLayer: (name) => {
    const id = createId();
    const nextName = name?.trim() ? name.trim() : `Layer ${get().layers.length + 1}`;
    set((state) => ({
      layers: [...state.layers, { id, name: nextName, visible: true, store: new CanvasStore() }],
      activeLayerId: id,
      version: state.version + 1,
      dirtyAll: true,
      dirtyBlocks: new Set(),
    }));
    return id;
  },
  deleteLayer: (id) => {
    set((state) => {
      if (state.layers.length <= 1) {
        return state;
      }
      const index = state.layers.findIndex((layer) => layer.id === id);
      if (index === -1) {
        return state;
      }
      const nextLayers = state.layers.filter((layer) => layer.id !== id);
      const nextActive =
        state.activeLayerId === id
          ? nextLayers[Math.min(index, nextLayers.length - 1)]?.id ?? nextLayers[0]!.id
          : state.activeLayerId;
      return {
        layers: nextLayers,
        activeLayerId: nextActive,
        version: state.version + 1,
        dirtyAll: true,
        dirtyBlocks: new Set(),
      };
    });
  },
  renameLayer: (id, name) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, name: name.trim() || layer.name } : layer
      ),
      version: state.version + 1,
    })),
  setLayerVisible: (id, visible) =>
    set((state) => ({
      layers: state.layers.map((layer) => (layer.id === id ? { ...layer, visible } : layer)),
      version: state.version + 1,
    })),
  toggleLayerVisible: (id) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      ),
      version: state.version + 1,
    })),
  moveLayer: (id, direction) =>
    set((state) => {
      const index = state.layers.findIndex((layer) => layer.id === id);
      if (index === -1) {
        return state;
      }
      const nextIndex = direction === 'up' ? index + 1 : index - 1;
      if (nextIndex < 0 || nextIndex >= state.layers.length) {
        return state;
      }
      const next = [...state.layers];
      const [moved] = next.splice(index, 1);
      next.splice(nextIndex, 0, moved);
      return { layers: next, version: state.version + 1 };
    }),
  setActiveLayer: (id) =>
    set((state) => {
      if (state.activeLayerId === id || !state.layers.some((layer) => layer.id === id)) {
        return state;
      }
      return { activeLayerId: id, version: state.version + 1 };
    }),
  getPixel: (x, y) => {
    const layer = get().layers.find((candidate) => candidate.id === get().activeLayerId);
    return layer ? layer.store.getPixel(x, y) : 0;
  },
  getPixelInLayer: (layerId, x, y) => {
    const layer = get().layers.find((candidate) => candidate.id === layerId);
    return layer ? layer.store.getPixel(x, y) : 0;
  },
  getPixelComposite: (x, y) => {
    const layers = get().layers;
    for (let i = layers.length - 1; i >= 0; i -= 1) {
      const layer = layers[i];
      if (!layer.visible) {
        continue;
      }
      const paletteIndex = layer.store.getPixel(x, y);
      if (paletteIndex !== 0) {
        return paletteIndex;
      }
    }
    return 0;
  },
  setPixel: (x, y, paletteIndex) => {
    get().setPixelInLayer(get().activeLayerId, x, y, paletteIndex);
  },
  setPixelInLayer: (layerId, x, y, paletteIndex) => {
    const layer = get().layers.find((candidate) => candidate.id === layerId);
    if (!layer) {
      return;
    }
    layer.store.setPixel(x, y, paletteIndex);
    const row = Math.floor(y / BLOCK_SIZE);
    const col = Math.floor(x / BLOCK_SIZE);
    set((state) => {
      const dirtyBlocks = new Set(state.dirtyBlocks);
      dirtyBlocks.add(`${layerId}:${row}:${col}`);
      return { version: state.version + 1, dirtyBlocks };
    });
  },
  setPixels: (pixels) => {
    get().setPixelsInLayer(get().activeLayerId, pixels);
  },
  setPixelsInLayer: (layerId, pixels) => {
    const layer = get().layers.find((candidate) => candidate.id === layerId);
    if (!layer) {
      return;
    }
    const dirtyBlocks = new Set(get().dirtyBlocks);
    for (const pixel of pixels) {
      layer.store.setPixel(pixel.x, pixel.y, pixel.paletteIndex);
      const row = Math.floor(pixel.y / BLOCK_SIZE);
      const col = Math.floor(pixel.x / BLOCK_SIZE);
      dirtyBlocks.add(`${layerId}:${row}:${col}`);
    }
    set((state) => ({ version: state.version + 1, dirtyBlocks }));
  },
  exportLayerPayloads: () =>
    get().layers.map((layer) => ({
      id: layer.id,
      name: layer.name,
      visible: layer.visible,
      blocks: layer.store.getBlocks().map((block) => ({
        row: block.row,
        col: block.col,
        data: block.block,
      })),
    })),
  loadLayerPayloads: (layers, activeLayerId) => {
    const nextLayers = layers.map((layer) => {
      const store = new CanvasStore();
      for (const block of layer.blocks) {
        store.setBlock(block.row, block.col, block.data);
      }
      return { id: layer.id, name: layer.name, visible: layer.visible, store };
    });
    const fallbackId =
      nextLayers.find((layer) => layer.id === activeLayerId)?.id ?? nextLayers[0]?.id ?? null;
    if (!fallbackId) {
      get().clear();
      return;
    }
    set((state) => ({
      layers: nextLayers,
      activeLayerId: fallbackId,
      version: state.version + 1,
      dirtyBlocks: new Set(),
      dirtyAll: true,
    }));
  },
  loadBlocks: (blocks) => {
    const id = createId();
    const store = new CanvasStore();
    for (const block of blocks) {
      store.setBlock(block.row, block.col, block.data);
    }
    set((state) => ({
      layers: [{ id, name: 'Layer 1', visible: true, store }],
      activeLayerId: id,
      version: state.version + 1,
      dirtyBlocks: new Set(),
      dirtyAll: true,
    }));
  },
  clear: () => {
    const id = createId();
    set((state) => ({
      layers: [{ id, name: 'Layer 1', visible: true, store: new CanvasStore() }],
      activeLayerId: id,
      version: state.version + 1,
      dirtyBlocks: new Set(),
      dirtyAll: true,
    }));
  },
  consumeDirtyBlocks: () => {
    const { dirtyAll, dirtyBlocks } = get();
    const blocks = Array.from(dirtyBlocks)
      .map((key): DirtyBlock | null => {
        const [layerId, rowText, colText] = key.split(':');
        if (!layerId) {
          return null;
        }
        return { layerId, row: Number(rowText), col: Number(colText) };
      })
      .filter((entry): entry is DirtyBlock => entry !== null);
    set({ dirtyAll: false, dirtyBlocks: new Set() });
    return { dirtyAll, blocks };
  },
}));
