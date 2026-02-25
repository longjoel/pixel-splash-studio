import { create } from 'zustand';
import { usePixelStore } from '@/state/pixelStore';
import { useProjectStore } from '@/state/projectStore';
import {
  useTileMapStore,
  type TileMapPayload,
  type TilePayload,
  type TileSetPayload,
} from '@/state/tileMapStore';

type PixelChange = {
  x: number;
  y: number;
  prev: number;
  next: number;
};

type TileHistorySnapshot = {
  tileSets: TileSetPayload[];
  tileMaps: TileMapPayload[];
  activeTileSetId: string | null;
  activeTileMapId: string | null;
  selectedTileIndex: number;
  selectedTileIndices: number[];
  selectedTileCols: number;
  selectedTileRows: number;
  tilePaletteColumns: number;
  tilePaletteOffset: number;
  tilePaletteRowsMin: number;
  nineSlice: { tileSetId: string; tiles: number[] } | null;
};

type HistoryBatch = {
  layerId?: string;
  changes: PixelChange[];
  tileBefore?: TileHistorySnapshot;
  tileAfter?: TileHistorySnapshot;
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

const cloneTilePayload = (tile: TilePayload): TilePayload => ({
  ...tile,
  pixels: tile.pixels.slice(),
  source: tile.source ? { ...tile.source } : undefined,
});

const cloneTileSetPayload = (tileSet: TileSetPayload): TileSetPayload => ({
  ...tileSet,
  tiles: tileSet.tiles.map(cloneTilePayload),
});

const cloneTileMapPayload = (tileMap: TileMapPayload): TileMapPayload => ({
  ...tileMap,
  tiles: tileMap.tiles.slice(),
});

const cloneTileHistorySnapshot = (snapshot: TileHistorySnapshot): TileHistorySnapshot => ({
  tileSets: snapshot.tileSets.map(cloneTileSetPayload),
  tileMaps: snapshot.tileMaps.map(cloneTileMapPayload),
  activeTileSetId: snapshot.activeTileSetId,
  activeTileMapId: snapshot.activeTileMapId,
  selectedTileIndex: snapshot.selectedTileIndex,
  selectedTileIndices: snapshot.selectedTileIndices.slice(),
  selectedTileCols: snapshot.selectedTileCols,
  selectedTileRows: snapshot.selectedTileRows,
  tilePaletteColumns: snapshot.tilePaletteColumns,
  tilePaletteOffset: snapshot.tilePaletteOffset,
  tilePaletteRowsMin: snapshot.tilePaletteRowsMin,
  nineSlice: snapshot.nineSlice
    ? {
        tileSetId: snapshot.nineSlice.tileSetId,
        tiles: snapshot.nineSlice.tiles.slice(),
      }
    : null,
});

export const captureTileHistorySnapshot = (): TileHistorySnapshot => {
  const tileState = useTileMapStore.getState();
  return {
    tileSets: tileState.tileSets.map(cloneTileSetPayload),
    tileMaps: tileState.tileMaps.map(cloneTileMapPayload),
    activeTileSetId: tileState.activeTileSetId,
    activeTileMapId: tileState.activeTileMapId,
    selectedTileIndex: tileState.selectedTileIndex,
    selectedTileIndices: tileState.selectedTileIndices.slice(),
    selectedTileCols: tileState.selectedTileCols,
    selectedTileRows: tileState.selectedTileRows,
    tilePaletteColumns: tileState.tilePaletteColumns,
    tilePaletteOffset: tileState.tilePaletteOffset,
    tilePaletteRowsMin: tileState.tilePaletteRowsMin,
    nineSlice: tileState.nineSlice
      ? {
          tileSetId: tileState.nineSlice.tileSetId,
          tiles: tileState.nineSlice.tiles.slice(),
        }
      : null,
  };
};

export const tileHistorySnapshotsEqual = (
  left: TileHistorySnapshot,
  right: TileHistorySnapshot
) => JSON.stringify(left) === JSON.stringify(right);

export const pushTileHistoryBatchIfChanged = (
  before: TileHistorySnapshot,
  after: TileHistorySnapshot
) => {
  if (tileHistorySnapshotsEqual(before, after)) {
    return false;
  }
  useHistoryStore.getState().pushBatch({
    changes: [],
    tileBefore: before,
    tileAfter: after,
  });
  return true;
};

const applyTileHistorySnapshot = (snapshot: TileHistorySnapshot) => {
  const cloned = cloneTileHistorySnapshot(snapshot);
  useTileMapStore.setState({
    tileSets: cloned.tileSets,
    tileMaps: cloned.tileMaps,
    activeTileSetId: cloned.activeTileSetId,
    activeTileMapId: cloned.activeTileMapId,
    selectedTileIndex: cloned.selectedTileIndex,
    selectedTileIndices: cloned.selectedTileIndices,
    selectedTileCols: cloned.selectedTileCols,
    selectedTileRows: cloned.selectedTileRows,
    tilePaletteColumns: cloned.tilePaletteColumns,
    tilePaletteOffset: cloned.tilePaletteOffset,
    tilePaletteRowsMin: cloned.tilePaletteRowsMin,
    nineSlice: cloned.nineSlice,
  });
};

export const useHistoryStore = create<HistoryState>((set, get) => ({
  locked: false,
  undoStack: [],
  redoStack: [],
  pushBatch: (batch) => {
    if (batch.changes.length === 0 && !batch.tileBefore && !batch.tileAfter) {
      return;
    }
    useProjectStore.getState().setDirty(true);
    const resolvedBatch = {
      layerId:
        batch.changes.length > 0
          ? batch.layerId ?? usePixelStore.getState().activeLayerId
          : batch.layerId,
      changes: batch.changes,
      tileBefore: batch.tileBefore ? cloneTileHistorySnapshot(batch.tileBefore) : undefined,
      tileAfter: batch.tileAfter ? cloneTileHistorySnapshot(batch.tileAfter) : undefined,
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
    if (batch.changes.length > 0) {
      const pixelStore = usePixelStore.getState();
      const layerId = batch.layerId ?? pixelStore.activeLayerId;
      for (const change of batch.changes) {
        pixelStore.setPixelInLayer(layerId, change.x, change.y, change.prev);
      }
    }
    if (batch.tileBefore) {
      applyTileHistorySnapshot(batch.tileBefore);
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
    if (batch.changes.length > 0) {
      const pixelStore = usePixelStore.getState();
      const layerId = batch.layerId ?? pixelStore.activeLayerId;
      for (const change of batch.changes) {
        pixelStore.setPixelInLayer(layerId, change.x, change.y, change.next);
      }
    }
    if (batch.tileAfter) {
      applyTileHistorySnapshot(batch.tileAfter);
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

export type { HistoryBatch, PixelChange, TileHistorySnapshot };
