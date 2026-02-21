import { create } from 'zustand';
import { useProjectStore } from '@/state/projectStore';
import { BLOCK_SIZE } from '@/core/canvasStore';
import { usePixelStore } from '@/state/pixelStore';

export type TilePayload = {
  id: string;
  name?: string;
  pixels: number[];
  source?: { kind: 'canvas'; x: number; y: number };
};

export type TileSetPayload = {
  id: string;
  name: string;
  tileWidth: number;
  tileHeight: number;
  columns: number;
  rows: number;
  tiles: TilePayload[];
};

type IncomingTileSetPayload = Omit<TileSetPayload, 'columns' | 'rows'> & {
  columns?: number;
  rows?: number;
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

export type TilePlacementMode = 'soft' | 'hard';

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
  tilePickerZoom: number;
  tilePlacementMode: TilePlacementMode;
  tilePenSnapToCluster: boolean;
  tileDebugOverlay: boolean;
  nineSlice: { tileSetId: string; tiles: number[] } | null;
  setTileSets: (tileSets: IncomingTileSetPayload[]) => void;
  setTileMaps: (tileMaps: TileMapPayload[]) => void;
  setAll: (tileSets: IncomingTileSetPayload[], tileMaps: TileMapPayload[]) => void;
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
  setTilePickerZoom: (zoom: number) => void;
  setTilePlacementMode: (mode: TilePlacementMode) => void;
  setTilePenSnapToCluster: (enabled: boolean) => void;
  setTileDebugOverlay: (enabled: boolean) => void;
  setNineSlice: (value: { tileSetId: string; tiles: number[] } | null) => void;
  setTileSetLayout: (tileSetId: string, columns: number, rows: number) => void;
  renameTileSet: (tileSetId: string, name: string) => void;
  deleteTileSet: (tileSetId: string) => void;
  duplicateTileSet: (tileSetId: string) => string | null;
  addTileSet: (
    payload: Omit<TileSetPayload, 'id' | 'columns' | 'rows'> & {
      id?: string;
      columns?: number;
      rows?: number;
    }
  ) => string;
  appendTilesToSet: (tileSetId: string, tiles: Array<Omit<TilePayload, 'id'>>) => void;
  refreshCanvasSourcedTiles: (
    dirtyAll: boolean,
    dirtyBlocks: Array<{ row: number; col: number }>
  ) => void;
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
export const TILE_PICKER_ZOOM_MIN = 2;
export const TILE_PICKER_ZOOM_MAX = 24;
export const TILE_PICKER_ZOOM_DEFAULT = 6;
const DEFAULT_TILE_LAYOUT_COLUMNS = 1;
const DEFAULT_TILE_LAYOUT_ROWS = 1;

const clampTileLayoutSize = (value: number | undefined, fallback: number) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return fallback;
  }
  return Math.min(MAX_TILE_PALETTE_COLUMNS, Math.max(1, Math.floor(value)));
};

const clampTilePickerZoom = (value: number) =>
  Math.max(TILE_PICKER_ZOOM_MIN, Math.min(TILE_PICKER_ZOOM_MAX, Math.round(value)));

const normalizeTileSet = (tileSet: IncomingTileSetPayload): TileSetPayload => ({
  ...tileSet,
  columns: clampTileLayoutSize(tileSet.columns, DEFAULT_TILE_LAYOUT_COLUMNS),
  rows: clampTileLayoutSize(tileSet.rows, DEFAULT_TILE_LAYOUT_ROWS),
});

const resolveActiveTileSetId = (
  tileSets: TileSetPayload[],
  activeTileSetId: string | null
) => {
  if (!activeTileSetId) {
    return tileSets[0]?.id ?? null;
  }
  return tileSets.some((tileSet) => tileSet.id === activeTileSetId)
    ? activeTileSetId
    : tileSets[0]?.id ?? null;
};

const buildTileSetCopyName = (baseName: string, existingNames: string[]) => {
  const seen = new Set(existingNames);
  const first = `${baseName} Copy`;
  if (!seen.has(first)) {
    return first;
  }
  let number = 2;
  while (seen.has(`${baseName} Copy ${number}`)) {
    number += 1;
  }
  return `${baseName} Copy ${number}`;
};

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
  tilePickerZoom: TILE_PICKER_ZOOM_DEFAULT,
  tilePlacementMode: 'hard',
  tilePenSnapToCluster: false,
  tileDebugOverlay: false,
  nineSlice: null,
  setTileSets: (tileSets) =>
    set((state) => {
      const normalizedTileSets = tileSets.map(normalizeTileSet);
      const activeTileSetId = resolveActiveTileSetId(
        normalizedTileSets,
        state.activeTileSetId
      );
      const activeTileSet = normalizedTileSets.find((set) => set.id === activeTileSetId);
      return {
        tileSets: normalizedTileSets,
        activeTileSetId,
        tilePaletteColumns: activeTileSet?.columns ?? state.tilePaletteColumns,
        tilePaletteRowsMin: activeTileSet?.rows ?? state.tilePaletteRowsMin,
      };
    }),
  setTileMaps: (tileMaps) => set({ tileMaps }),
  setAll: (tileSets, tileMaps) =>
    set(() => {
      const normalizedTileSets = tileSets.map(normalizeTileSet);
      const activeTileSet = normalizedTileSets[0];
      return {
        tileSets: normalizedTileSets,
        tileMaps,
        activeTileSetId: activeTileSet?.id ?? null,
        activeTileMapId: tileMaps[0]?.id ?? null,
        selectedTileIndex: 0,
        selectedTileIndices: [0],
        selectedTileCols: 1,
        selectedTileRows: 1,
        tilePage: 0,
        tilePaletteColumns: activeTileSet?.columns ?? 8,
        tilePaletteOffset: 0,
        tilePaletteRowsMin: activeTileSet?.rows ?? 3,
        tileDebugOverlay: false,
        nineSlice: null,
      };
    }),
  setActiveTileSet: (id) =>
    set((state) => {
      const activeTileSet = state.tileSets.find((set) => set.id === id);
      return {
        activeTileSetId: id,
        selectedTileIndex: 0,
        selectedTileIndices: [0],
        selectedTileCols: 1,
        selectedTileRows: 1,
        tilePage: 0,
        tilePaletteColumns: activeTileSet?.columns ?? state.tilePaletteColumns,
        tilePaletteOffset: 0,
        tilePaletteRowsMin: activeTileSet?.rows ?? state.tilePaletteRowsMin,
        tileDebugOverlay: false,
        nineSlice: null,
      };
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
  setTilePickerZoom: (zoom) =>
    set({
      tilePickerZoom:
        Number.isFinite(zoom) && zoom > 0
          ? clampTilePickerZoom(zoom)
          : TILE_PICKER_ZOOM_DEFAULT,
    }),
  setTilePlacementMode: (mode) =>
    set({
      tilePlacementMode: mode === 'soft' ? 'soft' : 'hard',
    }),
  setTilePenSnapToCluster: (enabled) =>
    set({
      tilePenSnapToCluster: Boolean(enabled),
    }),
  setTileDebugOverlay: (enabled) => set({ tileDebugOverlay: enabled }),
  setNineSlice: (value) => set({ nineSlice: value }),
  setTileSetLayout: (tileSetId, columns, rows) => {
    const tileSet = get().tileSets.find((set) => set.id === tileSetId);
    if (!tileSet) {
      return;
    }
    const nextColumns = clampTileLayoutSize(columns, tileSet.columns);
    const nextRows = clampTileLayoutSize(rows, tileSet.rows);
    if (tileSet.columns === nextColumns && tileSet.rows === nextRows) {
      return;
    }
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      tileSets: state.tileSets.map((set) =>
        set.id === tileSetId ? { ...set, columns: nextColumns, rows: nextRows } : set
      ),
      tilePaletteColumns:
        state.activeTileSetId === tileSetId ? nextColumns : state.tilePaletteColumns,
      tilePaletteRowsMin:
        state.activeTileSetId === tileSetId ? nextRows : state.tilePaletteRowsMin,
    }));
  },
  renameTileSet: (tileSetId, name) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }
    const tileSet = get().tileSets.find((set) => set.id === tileSetId);
    if (!tileSet || tileSet.name === trimmed) {
      return;
    }
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      tileSets: state.tileSets.map((set) =>
        set.id === tileSetId ? { ...set, name: trimmed } : set
      ),
    }));
  },
  deleteTileSet: (tileSetId) => {
    const state = get();
    const tileSetIndex = state.tileSets.findIndex((set) => set.id === tileSetId);
    if (tileSetIndex < 0) {
      return;
    }

    const nextTileSets = state.tileSets.filter((set) => set.id !== tileSetId);
    const nextTileMaps = state.tileMaps.filter((map) => map.tileSetId !== tileSetId);
    const nextActiveTileSetId = (() => {
      if (state.activeTileSetId && state.activeTileSetId !== tileSetId) {
        return state.activeTileSetId;
      }
      const fallbackIndex = Math.min(tileSetIndex, Math.max(0, nextTileSets.length - 1));
      return nextTileSets[fallbackIndex]?.id ?? null;
    })();
    const nextActiveTileSet =
      nextTileSets.find((set) => set.id === nextActiveTileSetId) ?? nextTileSets[0];
    const nextActiveTileMapId = (() => {
      const activeMapStillExists = nextTileMaps.some((map) => map.id === state.activeTileMapId);
      if (activeMapStillExists) {
        return state.activeTileMapId;
      }
      const inActiveSet = nextTileMaps.find(
        (map) => map.tileSetId === (nextActiveTileSet?.id ?? null)
      );
      return inActiveSet?.id ?? nextTileMaps[0]?.id ?? null;
    })();

    useProjectStore.getState().setDirty(true);
    set({
      tileSets: nextTileSets,
      tileMaps: nextTileMaps,
      activeTileSetId: nextActiveTileSet?.id ?? null,
      activeTileMapId: nextActiveTileMapId,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePaletteColumns: nextActiveTileSet?.columns ?? state.tilePaletteColumns,
      tilePaletteOffset: 0,
      tilePaletteRowsMin: nextActiveTileSet?.rows ?? state.tilePaletteRowsMin,
      nineSlice:
        state.nineSlice?.tileSetId === tileSetId ? null : state.nineSlice,
    });
  },
  duplicateTileSet: (tileSetId) => {
    const state = get();
    const sourceSet = state.tileSets.find((set) => set.id === tileSetId);
    if (!sourceSet) {
      return null;
    }
    const id = createId('tileset');
    const duplicatedSet: TileSetPayload = {
      ...sourceSet,
      id,
      name: buildTileSetCopyName(
        sourceSet.name,
        state.tileSets.map((set) => set.name)
      ),
      tiles: sourceSet.tiles.map((tile) => ({
        ...tile,
        id: createId('tile'),
        pixels: tile.pixels.slice(),
      })),
    };
    useProjectStore.getState().setDirty(true);
    set((prev) => ({
      tileSets: [...prev.tileSets, duplicatedSet],
      activeTileSetId: id,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePaletteColumns: duplicatedSet.columns,
      tilePaletteRowsMin: duplicatedSet.rows,
      tilePaletteOffset: 0,
      nineSlice: null,
    }));
    return id;
  },
  addTileSet: (payload) => {
    const { id: providedId, ...rest } = payload;
    const id = providedId ?? createId('tileset');
    const tileSet = normalizeTileSet({ id, ...rest });
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      tileSets: [...state.tileSets, tileSet],
      activeTileSetId: id,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePaletteColumns: tileSet.columns,
      tilePaletteRowsMin: tileSet.rows,
      tilePaletteOffset: 0,
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
  refreshCanvasSourcedTiles: (dirtyAll, dirtyBlocks) => {
    if (!dirtyAll && dirtyBlocks.length === 0) {
      return;
    }
    const dirtySet = dirtyAll
      ? null
      : new Set(dirtyBlocks.map((block) => `${block.row}:${block.col}`));
    const pixelStore = usePixelStore.getState();

    const tileIntersectsDirty = (
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      if (!dirtySet) {
        return true;
      }
      const minX = x;
      const minY = y;
      const maxX = x + Math.max(0, width - 1);
      const maxY = y + Math.max(0, height - 1);
      const minCol = Math.floor(minX / BLOCK_SIZE);
      const maxCol = Math.floor(maxX / BLOCK_SIZE);
      const minRow = Math.floor(minY / BLOCK_SIZE);
      const maxRow = Math.floor(maxY / BLOCK_SIZE);
      for (let row = minRow; row <= maxRow; row += 1) {
        for (let col = minCol; col <= maxCol; col += 1) {
          if (dirtySet.has(`${row}:${col}`)) {
            return true;
          }
        }
      }
      return false;
    };

    set((state) => {
      let changedAny = false;
      const nextTileSets = state.tileSets.map((tileSet) => {
        const tileWidth = tileSet.tileWidth;
        const tileHeight = tileSet.tileHeight;
        let changedSet = false;
        const nextTiles = tileSet.tiles.map((tile) => {
          const source = tile.source;
          if (!source || source.kind !== 'canvas') {
            return tile;
          }
          if (
            !tileIntersectsDirty(source.x, source.y, tileWidth, tileHeight)
          ) {
            return tile;
          }
          const nextPixels: number[] = [];
          for (let y = 0; y < tileHeight; y += 1) {
            for (let x = 0; x < tileWidth; x += 1) {
              nextPixels.push(pixelStore.getPixelComposite(source.x + x, source.y + y));
            }
          }
          changedAny = true;
          changedSet = true;
          return { ...tile, pixels: nextPixels };
        });
        return changedSet ? { ...tileSet, tiles: nextTiles } : tileSet;
      });
      return changedAny ? { tileSets: nextTileSets } : state;
    });
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
      tilePickerZoom: TILE_PICKER_ZOOM_DEFAULT,
      tilePlacementMode: 'hard',
      tilePenSnapToCluster: false,
      tileDebugOverlay: false,
      nineSlice: null,
    }),
}));
