import { create } from 'zustand';
import { CanvasStore, BLOCK_SIZE } from '@/core/canvasStore';

type PixelState = {
  store: CanvasStore;
  version: number;
  dirtyBlocks: Set<string>;
  dirtyAll: boolean;
  setPixel: (x: number, y: number, paletteIndex: number) => void;
  setPixels: (pixels: Array<{ x: number; y: number; paletteIndex: number }>) => void;
  getPixel: (x: number, y: number) => number;
  loadBlocks: (blocks: Array<{ row: number; col: number; data: Uint8Array }>) => void;
  clear: () => void;
  consumeDirtyBlocks: () => { dirtyAll: boolean; blocks: Array<{ row: number; col: number }> };
};

const store = new CanvasStore();

export const usePixelStore = create<PixelState>((set, get) => ({
  store,
  version: 0,
  dirtyBlocks: new Set(),
  dirtyAll: true,
  setPixel: (x, y, paletteIndex) => {
    store.setPixel(x, y, paletteIndex);
    const row = Math.floor(y / BLOCK_SIZE);
    const col = Math.floor(x / BLOCK_SIZE);
    set((state) => {
      const dirtyBlocks = new Set(state.dirtyBlocks);
      dirtyBlocks.add(`${row}:${col}`);
      return { version: state.version + 1, dirtyBlocks };
    });
  },
  setPixels: (pixels) => {
    const dirtyBlocks = new Set(get().dirtyBlocks);
    for (const pixel of pixels) {
      store.setPixel(pixel.x, pixel.y, pixel.paletteIndex);
      const row = Math.floor(pixel.y / BLOCK_SIZE);
      const col = Math.floor(pixel.x / BLOCK_SIZE);
      dirtyBlocks.add(`${row}:${col}`);
    }
    set((state) => ({ version: state.version + 1, dirtyBlocks }));
  },
  getPixel: (x, y) => store.getPixel(x, y),
  loadBlocks: (blocks) => {
    store.clear();
    for (const block of blocks) {
      store.setBlock(block.row, block.col, block.data);
    }
    set((state) => ({
      version: state.version + 1,
      dirtyBlocks: new Set(),
      dirtyAll: true,
    }));
  },
  clear: () => {
    store.clear();
    set((state) => ({
      version: state.version + 1,
      dirtyBlocks: new Set(),
      dirtyAll: true,
    }));
  },
  consumeDirtyBlocks: () => {
    const { dirtyAll, dirtyBlocks } = get();
    const blocks = Array.from(dirtyBlocks).map((key) => {
      const [rowText, colText] = key.split(':');
      return { row: Number(rowText), col: Number(colText) };
    });
    set({ dirtyAll: false, dirtyBlocks: new Set() });
    return { dirtyAll, blocks };
  },
}));
