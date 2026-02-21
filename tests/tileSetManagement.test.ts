import { beforeEach, describe, expect, it } from 'vitest';
import { useTileMapStore } from '@/state/tileMapStore';

describe('tile set management', () => {
  beforeEach(() => {
    useTileMapStore.getState().clear();
  });

  it('renames a tile set', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Old Name',
      tileWidth: 8,
      tileHeight: 8,
      columns: 2,
      rows: 2,
      tiles: [],
    });

    tileStore.renameTileSet(tileSetId, 'New Name');

    const renamed = useTileMapStore.getState().tileSets.find((set) => set.id === tileSetId);
    expect(renamed?.name).toBe('New Name');
  });

  it('deletes a tile set and linked tile maps and updates active context', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetA = tileStore.addTileSet({
      name: 'Set A',
      tileWidth: 8,
      tileHeight: 8,
      columns: 3,
      rows: 3,
      tiles: [{ pixels: new Array(64).fill(1) }],
    });
    const tileMapA = tileStore.addTileMap({
      name: 'Map A',
      tileSetId: tileSetA,
      originX: 0,
      originY: 0,
      columns: 2,
      rows: 2,
      tiles: [0, -1, -1, -1],
    });
    const tileSetB = tileStore.addTileSet({
      name: 'Set B',
      tileWidth: 8,
      tileHeight: 8,
      columns: 2,
      rows: 1,
      tiles: [],
    });
    const tileMapB = tileStore.addTileMap({
      name: 'Map B',
      tileSetId: tileSetB,
      originX: 0,
      originY: 0,
      columns: 1,
      rows: 1,
      tiles: [-1],
    });

    tileStore.setActiveTileSet(tileSetA);
    tileStore.setActiveTileMap(tileMapA);
    tileStore.setNineSlice({ tileSetId: tileSetA, tiles: [0, 0, 0, 0, 0, 0, 0, 0, 0] });
    tileStore.deleteTileSet(tileSetA);

    const next = useTileMapStore.getState();
    expect(next.tileSets.map((set) => set.id)).toEqual([tileSetB]);
    expect(next.tileMaps.map((map) => map.id)).toEqual([tileMapB]);
    expect(next.activeTileSetId).toBe(tileSetB);
    expect(next.activeTileMapId).toBe(tileMapB);
    expect(next.tilePaletteColumns).toBe(2);
    expect(next.tilePaletteRowsMin).toBe(1);
    expect(next.nineSlice).toBeNull();
  });

  it('duplicates a tile set with copied tiles and unique naming', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Forest',
      tileWidth: 8,
      tileHeight: 8,
      columns: 3,
      rows: 2,
      tiles: [
        { pixels: new Array(64).fill(2) },
        { pixels: new Array(64).fill(3) },
      ],
    });

    const duplicatedId = tileStore.duplicateTileSet(tileSetId);
    expect(duplicatedId).toBeTruthy();

    const next = useTileMapStore.getState();
    const original = next.tileSets.find((set) => set.id === tileSetId);
    const duplicate = next.tileSets.find((set) => set.id === duplicatedId);
    expect(duplicate).toBeTruthy();
    expect(duplicate?.name).toBe('Forest Copy');
    expect(duplicate?.columns).toBe(3);
    expect(duplicate?.rows).toBe(2);
    expect(duplicate?.tiles).toHaveLength(2);
    expect(duplicate?.tiles[0]?.pixels).toEqual(original?.tiles[0]?.pixels);
    expect(duplicate?.tiles[0]?.id).not.toBe(original?.tiles[0]?.id);
    expect(next.activeTileSetId).toBe(duplicatedId);

    const duplicatedId2 = tileStore.duplicateTileSet(tileSetId);
    const duplicate2 = useTileMapStore.getState().tileSets.find((set) => set.id === duplicatedId2);
    expect(duplicate2?.name).toBe('Forest Copy 2');
  });
});
