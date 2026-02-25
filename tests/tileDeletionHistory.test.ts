import { beforeEach, describe, expect, it } from 'vitest';
import { captureTileHistorySnapshot, useHistoryStore } from '@/state/historyStore';
import { useTileMapStore } from '@/state/tileMapStore';

const makeTile = (value: number) => ({ pixels: new Array(64).fill(value) });

describe('tile deletion collapse + history', () => {
  beforeEach(() => {
    useTileMapStore.getState().clear();
    useHistoryStore.getState().clear();
  });

  it('collapses deleted full columns like a spreadsheet and remaps tile-map indices', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Columns',
      tileWidth: 8,
      tileHeight: 8,
      columns: 4,
      rows: 2,
      tiles: Array.from({ length: 8 }, (_, index) => makeTile(index)),
    });

    const tileMapId = tileStore.addTileMap({
      name: 'Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 2,
      rows: 2,
      tiles: [1, 5, 7, -1],
    });

    tileStore.deleteTilesFromSet(tileSetId, [1, 5]);

    const next = useTileMapStore.getState();
    const set = next.tileSets.find((entry) => entry.id === tileSetId);
    const map = next.tileMaps.find((entry) => entry.id === tileMapId);

    expect(set?.columns).toBe(3);
    expect(set?.rows).toBe(2);
    expect(set?.tiles.map((tile) => tile.pixels[0])).toEqual([0, 2, 3, 4, 6, 7]);
    expect(map?.tiles).toEqual([-1, -1, 5, -1]);
  });

  it('collapses deleted full rows and updates tile-set layout rows', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Rows',
      tileWidth: 8,
      tileHeight: 8,
      columns: 3,
      rows: 3,
      tiles: Array.from({ length: 9 }, (_, index) => makeTile(index)),
    });

    tileStore.deleteTilesFromSet(tileSetId, [3, 4, 5]);

    const next = useTileMapStore.getState();
    const set = next.tileSets.find((entry) => entry.id === tileSetId);
    expect(set?.columns).toBe(3);
    expect(set?.rows).toBe(2);
    expect(set?.tiles.map((tile) => tile.pixels[0])).toEqual([0, 1, 2, 6, 7, 8]);
  });

  it('undoes and redoes tile-space deletion through history snapshots', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'History',
      tileWidth: 8,
      tileHeight: 8,
      columns: 4,
      rows: 2,
      tiles: Array.from({ length: 8 }, (_, index) => makeTile(index)),
    });

    const before = captureTileHistorySnapshot();
    tileStore.deleteTilesFromSet(tileSetId, [1, 5]);
    const after = captureTileHistorySnapshot();
    useHistoryStore.getState().pushBatch({ changes: [], tileBefore: before, tileAfter: after });

    useHistoryStore.getState().undo();
    let restored = useTileMapStore.getState().tileSets.find((entry) => entry.id === tileSetId);
    expect(restored?.columns).toBe(4);
    expect(restored?.tiles.map((tile) => tile.pixels[0])).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);

    useHistoryStore.getState().redo();
    restored = useTileMapStore.getState().tileSets.find((entry) => entry.id === tileSetId);
    expect(restored?.columns).toBe(3);
    expect(restored?.tiles.map((tile) => tile.pixels[0])).toEqual([0, 2, 3, 4, 6, 7]);
  });
});
