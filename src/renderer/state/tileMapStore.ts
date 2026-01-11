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
  tilePage: number;
  setTileSets: (tileSets: TileSetPayload[]) => void;
  setTileMaps: (tileMaps: TileMapPayload[]) => void;
  setAll: (tileSets: TileSetPayload[], tileMaps: TileMapPayload[]) => void;
  setActiveTileSet: (id: string | null) => void;
  setActiveTileMap: (id: string | null) => void;
  setSelectedTileIndex: (index: number) => void;
  setTilePage: (page: number) => void;
  addTileSet: (payload: Omit<TileSetPayload, 'id'> & { id?: string }) => string;
  appendTilesToSet: (tileSetId: string, tiles: Array<Omit<TilePayload, 'id'>>) => void;
  addTileMap: (payload: Omit<TileMapPayload, 'id'> & { id?: string }) => string;
  setTileMapTiles: (tileMapId: string, updates: Array<{ index: number; tile: number }>) => void;
  clear: () => void;
};

const createId = (prefix: string) =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const useTileMapStore = create<TileMapState>((set, get) => ({
  tileSets: [],
  tileMaps: [],
  activeTileSetId: null,
  activeTileMapId: null,
  selectedTileIndex: 0,
  tilePage: 0,
  setTileSets: (tileSets) => set({ tileSets }),
  setTileMaps: (tileMaps) => set({ tileMaps }),
  setAll: (tileSets, tileMaps) =>
    set({
      tileSets,
      tileMaps,
      activeTileSetId: tileSets[0]?.id ?? null,
      activeTileMapId: tileMaps[0]?.id ?? null,
      selectedTileIndex: 0,
      tilePage: 0,
    }),
  setActiveTileSet: (id) => set({ activeTileSetId: id, selectedTileIndex: 0, tilePage: 0 }),
  setActiveTileMap: (id) => set({ activeTileMapId: id }),
  setSelectedTileIndex: (index) => set({ selectedTileIndex: Math.max(0, index) }),
  setTilePage: (page) => set({ tilePage: Math.max(0, page) }),
  addTileSet: (payload) => {
    const { id: providedId, ...rest } = payload;
    const id = providedId ?? createId('tileset');
    const tileSet: TileSetPayload = { id, ...rest };
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      tileSets: [...state.tileSets, tileSet],
      activeTileSetId: id,
      selectedTileIndex: 0,
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
  clear: () =>
    set({
      tileSets: [],
      tileMaps: [],
      activeTileSetId: null,
      activeTileMapId: null,
      selectedTileIndex: 0,
      tilePage: 0,
    }),
}));
