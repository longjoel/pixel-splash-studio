import { create } from 'zustand';
import { CanvasStore, BLOCK_SIZE } from '@/core/canvasStore';

type SelectionPixel = { x: number; y: number; selected: boolean };

type SelectionState = {
  store: CanvasStore;
  version: number;
  selectedCount: number;
  dirtyBlocks: Set<string>;
  dirtyAll: boolean;
  setSelection: (x: number, y: number, selected: boolean) => void;
  setSelections: (pixels: SelectionPixel[]) => void;
  isSelected: (x: number, y: number) => boolean;
  clear: () => void;
  consumeDirtyBlocks: () => { dirtyAll: boolean; blocks: Array<{ row: number; col: number }> };
};

const store = new CanvasStore();

const blockKey = (row: number, col: number) => `${row}:${col}`;

export const useSelectionStore = create<SelectionState>((set, get) => ({
  store,
  version: 0,
  selectedCount: 0,
  dirtyBlocks: new Set(),
  dirtyAll: true,
  setSelection: (x, y, selected) => {
    const prev = store.getPixel(x, y);
    const next = selected ? 1 : 0;
    if (prev === next) {
      return;
    }
    store.setPixel(x, y, next);
    const row = Math.floor(y / BLOCK_SIZE);
    const col = Math.floor(x / BLOCK_SIZE);
    set((state) => {
      const dirtyBlocks = new Set(state.dirtyBlocks);
      dirtyBlocks.add(blockKey(row, col));
      const selectedCount = state.selectedCount + (next === 1 ? 1 : -1);
      return { version: state.version + 1, dirtyBlocks, selectedCount };
    });
  },
  setSelections: (pixels) => {
    if (pixels.length === 0) {
      return;
    }
    const dirtyBlocks = new Set(get().dirtyBlocks);
    let delta = 0;
    for (const pixel of pixels) {
      const prev = store.getPixel(pixel.x, pixel.y);
      const next = pixel.selected ? 1 : 0;
      if (prev === next) {
        continue;
      }
      store.setPixel(pixel.x, pixel.y, next);
      const row = Math.floor(pixel.y / BLOCK_SIZE);
      const col = Math.floor(pixel.x / BLOCK_SIZE);
      dirtyBlocks.add(blockKey(row, col));
      delta += next === 1 ? 1 : -1;
    }
    set((state) => ({
      version: state.version + 1,
      dirtyBlocks,
      selectedCount: Math.max(0, state.selectedCount + delta),
    }));
  },
  isSelected: (x, y) => store.getPixel(x, y) === 1,
  clear: () => {
    store.clear();
    set((state) => ({
      version: state.version + 1,
      dirtyBlocks: new Set(),
      dirtyAll: true,
      selectedCount: 0,
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
