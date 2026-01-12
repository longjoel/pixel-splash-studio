import { create } from 'zustand';
import { useProjectStore } from '@/state/projectStore';

export type TilePayload = {
  id: string;
  name?: string;
  pixels: number[];
};

export type TileSetPayload = {
  id: string;
  name: string;
  tileWidth: number;
  tileHeight: number;
  tiles: TilePayload[];
};

export type TileMapPayload = {
  id: string;
  name: string;
  tileSetId: string;
  originX: number;
  originY: number;
  columns: number;
  rows: number;
  tiles: number[];
};

type TileMapState = {
  tileSets: TileSetPayload[];
  tileMaps: TileMapPayload[];
  activeTileSetId: string | null;
  activeTileMapId: string | null;
  selectedTileIndex: number;
  selectedTileIndices: number[];
  selectedTileCols: number;
  selectedTileRows: number;
  tilePage: number;
  tilePaletteColumns: number;
  tilePaletteOffset: number;
  tilePaletteRowsMin: number;
  tileDebugOverlay: boolean;
  nineSlice: { tileSetId: string; tiles: number[] } | null;
  setTileSets: (tileSets: TileSetPayload[]) => void;
  setTileMaps: (tileMaps: TileMapPayload[]) => void;
  setAll: (tileSets: TileSetPayload[], tileMaps: TileMapPayload[]) => void;
  setActiveTileSet: (id: string | null) => void;
  setActiveTileMap: (id: string | null) => void;
  setSelectedTileIndex: (index: number) => void;
  setTileSelection: (
    indices: number[],
    cols: number,
    rows: number,
    anchorIndex: number
  ) => void;
  setTilePage: (page: number) => void;
  setTilePaletteColumns: (columns: number) => void;
  setTilePaletteOffset: (offset: number) => void;
  setTilePaletteRowsMin: (rows: number) => void;
  setTileDebugOverlay: (enabled: boolean) => void;
  setNineSlice: (value: { tileSetId: string; tiles: number[] } | null) => void;
  addTileSet: (payload: Omit<TileSetPayload, 'id'> & { id?: string }) => string;
  appendTilesToSet: (tileSetId: string, tiles: Array<Omit<TilePayload, 'id'>>) => void;
  deleteTilesFromSet: (tileSetId: string, indices: number[]) => void;
  consolidateTileSet: (tileSetId: string) => void;
  addTileMap: (payload: Omit<TileMapPayload, 'id'> & { id?: string }) => string;
  setTileMapTiles: (tileMapId: string, updates: Array<{ index: number; tile: number }>) => void;
  expandTileMapToInclude: (
    tileMapId: string,
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
    tileWidth: number,
    tileHeight: number
  ) => TileMapPayload | null;
  clear: () => void;
};

const createId = (prefix: string) =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const MAX_TILE_PALETTE_COLUMNS = 64;

export const useTileMapStore = create<TileMapState>((set, get) => ({
  tileSets: [],
  tileMaps: [],
  activeTileSetId: null,
  activeTileMapId: null,
  selectedTileIndex: 0,
  selectedTileIndices: [0],
  selectedTileCols: 1,
  selectedTileRows: 1,
  tilePage: 0,
  tilePaletteColumns: 8,
  tilePaletteOffset: 0,
  tilePaletteRowsMin: 3,
  tileDebugOverlay: false,
  nineSlice: null,
  setTileSets: (tileSets) => set({ tileSets }),
  setTileMaps: (tileMaps) => set({ tileMaps }),
  setAll: (tileSets, tileMaps) =>
    set({
      tileSets,
      tileMaps,
      activeTileSetId: tileSets[0]?.id ?? null,
      activeTileMapId: tileMaps[0]?.id ?? null,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePaletteOffset: 0,
      tilePaletteRowsMin: 3,
      tileDebugOverlay: false,
      nineSlice: null,
    }),
  setActiveTileSet: (id) =>
    set({
      activeTileSetId: id,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePaletteOffset: 0,
      tilePaletteRowsMin: 3,
      tileDebugOverlay: false,
      nineSlice: null,
    }),
  setActiveTileMap: (id) => set({ activeTileMapId: id }),
  setSelectedTileIndex: (index) =>
    set({
      selectedTileIndex: Math.max(0, index),
      selectedTileIndices: [Math.max(0, index)],
      selectedTileCols: 1,
      selectedTileRows: 1,
    }),
  setTileSelection: (indices, cols, rows, anchorIndex) =>
    set({
      selectedTileIndex: Math.max(0, anchorIndex),
      selectedTileIndices: indices,
      selectedTileCols: Math.max(1, cols),
      selectedTileRows: Math.max(1, rows),
    }),
  setTilePage: (page) => set({ tilePage: Math.max(0, page) }),
  setTilePaletteColumns: (columns) =>
    set((state) => ({
      tilePaletteColumns: Math.min(MAX_TILE_PALETTE_COLUMNS, Math.max(1, columns)),
      selectedTileIndices: [state.selectedTileIndex],
      selectedTileCols: 1,
      selectedTileRows: 1,
    })),
  setTilePaletteOffset: (offset) =>
    set((state) => ({
      tilePaletteOffset: Math.max(0, Math.floor(offset)),
      selectedTileIndices: [state.selectedTileIndex],
      selectedTileCols: 1,
      selectedTileRows: 1,
    })),
  setTilePaletteRowsMin: (rows) =>
    set((state) => ({
      tilePaletteRowsMin: Math.max(1, Math.floor(rows)),
      selectedTileIndices: [state.selectedTileIndex],
      selectedTileCols: 1,
      selectedTileRows: 1,
    })),
  setTileDebugOverlay: (enabled) => set({ tileDebugOverlay: enabled }),
  setNineSlice: (value) => set({ nineSlice: value }),
  addTileSet: (payload) => {
    const { id: providedId, ...rest } = payload;
    const id = providedId ?? createId('tileset');
    const tileSet: TileSetPayload = { id, ...rest };
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      tileSets: [...state.tileSets, tileSet],
      activeTileSetId: id,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
    }));
    return id;
  },
  appendTilesToSet: (tileSetId, tiles) => {
    if (tiles.length === 0) {
      return;
    }
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      tileSets: state.tileSets.map((tileSet) => {
        if (tileSet.id !== tileSetId) {
          return tileSet;
        }
        const nextTiles = tiles.map((tile) => ({
          id: createId('tile'),
          ...tile,
        }));
        return { ...tileSet, tiles: [...tileSet.tiles, ...nextTiles] };
      }),
    }));
  },
  deleteTilesFromSet: (tileSetId, indices) => {
    if (indices.length === 0) {
      return;
    }
    const deleteSet = new Set(indices);
    useProjectStore.getState().setDirty(true);
    set((state) => {
      const tileSet = state.tileSets.find((set) => set.id === tileSetId);
      if (!tileSet) {
        return state;
      }
      const indexMap = new Map<number, number>();
      const nextTiles: TilePayload[] = [];
      let nextIndex = 0;
      tileSet.tiles.forEach((tile, index) => {
        if (deleteSet.has(index)) {
          indexMap.set(index, -1);
          return;
        }
        indexMap.set(index, nextIndex);
        nextTiles.push(tile);
        nextIndex += 1;
      });

      const remapIndices = (values: number[]) =>
        values.map((value) => (value >= 0 ? indexMap.get(value) ?? -1 : -1));
      const remappedSelection = remapIndices(state.selectedTileIndices).filter(
        (value) => value >= 0
      );
      const fallbackIndex = nextTiles.length > 0 ? 0 : 0;
      const nextSelected =
        remappedSelection.length > 0 ? remappedSelection : [fallbackIndex];
      const nextSelectedIndex = nextSelected[0] ?? fallbackIndex;

      return {
        tileSets: state.tileSets.map((set) =>
          set.id === tileSetId ? { ...set, tiles: nextTiles } : set
        ),
        tileMaps: state.tileMaps.map((map) => {
          if (map.tileSetId !== tileSetId) {
            return map;
          }
          const nextMapTiles = map.tiles.map((tile) => {
            if (tile < 0) {
              return -1;
            }
            return indexMap.get(tile) ?? -1;
          });
          return { ...map, tiles: nextMapTiles };
        }),
        selectedTileIndex: nextSelectedIndex,
        selectedTileIndices: [nextSelectedIndex],
        selectedTileCols: 1,
        selectedTileRows: 1,
        nineSlice:
          state.nineSlice?.tileSetId === tileSetId && state.nineSlice.tiles.length > 0
            ? {
                ...state.nineSlice,
                tiles: remapIndices(state.nineSlice.tiles),
              }
            : state.nineSlice,
      };
    });
  },
  consolidateTileSet: (tileSetId) => {
    useProjectStore.getState().setDirty(true);
    set((state) => {
      const tileSet = state.tileSets.find((set) => set.id === tileSetId);
      if (!tileSet) {
        return state;
      }
      const indexMap = new Map<number, number>();
      const seen = new Map<string, number>();
      const nextTiles: TilePayload[] = [];
      let nextIndex = 0;
      tileSet.tiles.forEach((tile, index) => {
        const key = tile.pixels.join(',');
        const existing = seen.get(key);
        if (existing !== undefined) {
          indexMap.set(index, existing);
          return;
        }
        seen.set(key, nextIndex);
        indexMap.set(index, nextIndex);
        nextTiles.push(tile);
        nextIndex += 1;
      });

      const remapIndices = (values: number[]) =>
        values.map((value) => (value >= 0 ? indexMap.get(value) ?? -1 : -1));
      const remappedSelection = remapIndices(state.selectedTileIndices).filter(
        (value) => value >= 0
      );
      const fallbackIndex = nextTiles.length > 0 ? 0 : 0;
      const nextSelected =
        remappedSelection.length > 0 ? remappedSelection : [fallbackIndex];
      const nextSelectedIndex = nextSelected[0] ?? fallbackIndex;

      return {
        tileSets: state.tileSets.map((set) =>
          set.id === tileSetId ? { ...set, tiles: nextTiles } : set
        ),
        tileMaps: state.tileMaps.map((map) => {
          if (map.tileSetId !== tileSetId) {
            return map;
          }
          const nextMapTiles = map.tiles.map((tile) => {
            if (tile < 0) {
              return -1;
            }
            return indexMap.get(tile) ?? -1;
          });
          return { ...map, tiles: nextMapTiles };
        }),
        selectedTileIndex: nextSelectedIndex,
        selectedTileIndices: [nextSelectedIndex],
        selectedTileCols: 1,
        selectedTileRows: 1,
        nineSlice:
          state.nineSlice?.tileSetId === tileSetId && state.nineSlice.tiles.length > 0
            ? {
                ...state.nineSlice,
                tiles: remapIndices(state.nineSlice.tiles),
              }
            : state.nineSlice,
      };
    });
  },
  addTileMap: (payload) => {
    const { id: providedId, ...rest } = payload;
    const id = providedId ?? createId('tilemap');
    const tileMap: TileMapPayload = { id, ...rest };
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      tileMaps: [...state.tileMaps, tileMap],
      activeTileMapId: id,
    }));
    return id;
  },
  setTileMapTiles: (tileMapId, updates) => {
    if (updates.length === 0) {
      return;
    }
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      tileMaps: state.tileMaps.map((tileMap) => {
        if (tileMap.id !== tileMapId) {
          return tileMap;
        }
        const nextTiles = tileMap.tiles.slice();
        for (const update of updates) {
          if (update.index < 0 || update.index >= nextTiles.length) {
            continue;
          }
          nextTiles[update.index] = update.tile;
        }
        return { ...tileMap, tiles: nextTiles };
      }),
    }));
  },
  expandTileMapToInclude: (
    tileMapId,
    minX,
    maxX,
    minY,
    maxY,
    tileWidth,
    tileHeight
  ) => {
    const state = get();
    const tileMap = state.tileMaps.find((map) => map.id === tileMapId);
    if (!tileMap) {
      return null;
    }
    const addLeft = Math.max(0, -minX);
    const addTop = Math.max(0, -minY);
    const addRight = Math.max(0, maxX - (tileMap.columns - 1));
    const addBottom = Math.max(0, maxY - (tileMap.rows - 1));

    if (addLeft === 0 && addTop === 0 && addRight === 0 && addBottom === 0) {
      return tileMap;
    }

    const nextColumns = tileMap.columns + addLeft + addRight;
    const nextRows = tileMap.rows + addTop + addBottom;
    const nextTiles = new Array(nextColumns * nextRows).fill(-1);

    for (let row = 0; row < tileMap.rows; row += 1) {
      for (let col = 0; col < tileMap.columns; col += 1) {
        const sourceIndex = row * tileMap.columns + col;
        const targetIndex = (row + addTop) * nextColumns + (col + addLeft);
        nextTiles[targetIndex] = tileMap.tiles[sourceIndex] ?? -1;
      }
    }

    const nextMap: TileMapPayload = {
      ...tileMap,
      originX: tileMap.originX - addLeft * tileWidth,
      originY: tileMap.originY - addTop * tileHeight,
      columns: nextColumns,
      rows: nextRows,
      tiles: nextTiles,
    };

    useProjectStore.getState().setDirty(true);
    set((prev) => ({
      tileMaps: prev.tileMaps.map((map) => (map.id === tileMapId ? nextMap : map)),
    }));
    return nextMap;
  },
  clear: () =>
    set({
      tileSets: [],
      tileMaps: [],
      activeTileSetId: null,
      activeTileMapId: null,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePaletteColumns: 8,
      tilePaletteOffset: 0,
      tilePaletteRowsMin: 3,
      tileDebugOverlay: false,
      nineSlice: null,
    }),
}));
