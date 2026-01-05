import { create } from 'zustand';
import { usePixelStore } from '@/state/pixelStore';
import { useProjectStore } from '@/state/projectStore';

type PixelChange = {
  x: number;
  y: number;
  prev: number;
  next: number;
};

type HistoryBatch = {
  changes: PixelChange[];
};

type HistoryState = {
  undoStack: HistoryBatch[];
  redoStack: HistoryBatch[];
  pushBatch: (batch: HistoryBatch) => void;
  undo: () => void;
  redo: () => void;
  setStacks: (undoStack: HistoryBatch[], redoStack: HistoryBatch[]) => void;
  clear: () => void;
};

export const useHistoryStore = create<HistoryState>((set, get) => ({
  undoStack: [],
  redoStack: [],
  pushBatch: (batch) => {
    if (batch.changes.length === 0) {
      return;
    }
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      undoStack: [...state.undoStack, batch].slice(-8),
      redoStack: [],
    }));
  },
  undo: () => {
    const state = get();
    const batch = state.undoStack[state.undoStack.length - 1];
    if (!batch) {
      return;
    }
    useProjectStore.getState().setDirty(true);
    const pixelStore = usePixelStore.getState();
    for (const change of batch.changes) {
      pixelStore.setPixel(change.x, change.y, change.prev);
    }
    set((storeState) => ({
      undoStack: storeState.undoStack.slice(0, -1),
      redoStack: [...storeState.redoStack, batch],
    }));
  },
  redo: () => {
    const state = get();
    const batch = state.redoStack[state.redoStack.length - 1];
    if (!batch) {
      return;
    }
    useProjectStore.getState().setDirty(true);
    const pixelStore = usePixelStore.getState();
    for (const change of batch.changes) {
      pixelStore.setPixel(change.x, change.y, change.next);
    }
    set((storeState) => ({
      undoStack: [...storeState.undoStack, batch],
      redoStack: storeState.redoStack.slice(0, -1),
    }));
  },
  setStacks: (undoStack, redoStack) =>
    set({
      undoStack: undoStack.slice(-8),
      redoStack: redoStack.slice(-8),
    }),
  clear: () => set({ undoStack: [], redoStack: [] }),
}));

export type { HistoryBatch, PixelChange };
