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
  layerId?: string;
  changes: PixelChange[];
};

type HistoryState = {
  locked: boolean;
  undoStack: HistoryBatch[];
  redoStack: HistoryBatch[];
  pushBatch: (batch: HistoryBatch) => void;
  undo: () => void;
  redo: () => void;
  setLocked: (locked: boolean) => void;
  setStacks: (undoStack: HistoryBatch[], redoStack: HistoryBatch[]) => void;
  clear: () => void;
};

export const useHistoryStore = create<HistoryState>((set, get) => ({
  locked: false,
  undoStack: [],
  redoStack: [],
  pushBatch: (batch) => {
    if (batch.changes.length === 0) {
      return;
    }
    useProjectStore.getState().setDirty(true);
    const resolvedBatch = {
      layerId: batch.layerId ?? usePixelStore.getState().activeLayerId,
      changes: batch.changes,
    } satisfies HistoryBatch;
    set((state) => ({
      undoStack: [...state.undoStack, resolvedBatch].slice(-8),
      redoStack: [],
    }));
  },
  undo: () => {
    const state = get();
    if (state.locked) {
      return;
    }
    const batch = state.undoStack[state.undoStack.length - 1];
    if (!batch) {
      return;
    }
    useProjectStore.getState().setDirty(true);
    const pixelStore = usePixelStore.getState();
    const layerId = batch.layerId ?? pixelStore.activeLayerId;
    for (const change of batch.changes) {
      pixelStore.setPixelInLayer(layerId, change.x, change.y, change.prev);
    }
    set((storeState) => ({
      undoStack: storeState.undoStack.slice(0, -1),
      redoStack: [...storeState.redoStack, batch],
    }));
  },
  redo: () => {
    const state = get();
    if (state.locked) {
      return;
    }
    const batch = state.redoStack[state.redoStack.length - 1];
    if (!batch) {
      return;
    }
    useProjectStore.getState().setDirty(true);
    const pixelStore = usePixelStore.getState();
    const layerId = batch.layerId ?? pixelStore.activeLayerId;
    for (const change of batch.changes) {
      pixelStore.setPixelInLayer(layerId, change.x, change.y, change.next);
    }
    set((storeState) => ({
      undoStack: [...storeState.undoStack, batch].slice(-8),
      redoStack: storeState.redoStack.slice(0, -1),
    }));
  },
  setLocked: (locked) => set({ locked }),
  setStacks: (undoStack, redoStack) =>
    set({
      undoStack: undoStack.slice(-8),
      redoStack: redoStack.slice(-8),
    }),
  clear: () => set({ undoStack: [], redoStack: [] }),
}));

export type { HistoryBatch, PixelChange };
