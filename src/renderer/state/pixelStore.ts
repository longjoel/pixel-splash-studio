import { create } from 'zustand';
import { CanvasStore } from '@/core/canvasStore';

type PixelState = {
  store: CanvasStore;
  version: number;
  setPixel: (x: number, y: number, paletteIndex: number) => void;
  getPixel: (x: number, y: number) => number;
  loadBlocks: (blocks: Array<{ row: number; col: number; data: Uint8Array }>) => void;
  clear: () => void;
};

const store = new CanvasStore();

export const usePixelStore = create<PixelState>((set) => ({
  store,
  version: 0,
  setPixel: (x, y, paletteIndex) => {
    store.setPixel(x, y, paletteIndex);
    set((state) => ({ version: state.version + 1 }));
  },
  getPixel: (x, y) => store.getPixel(x, y),
  loadBlocks: (blocks) => {
    store.clear();
    for (const block of blocks) {
      store.setBlock(block.row, block.col, block.data);
    }
    set((state) => ({ version: state.version + 1 }));
  },
  clear: () => {
    store.clear();
    set((state) => ({ version: state.version + 1 }));
  },
}));
