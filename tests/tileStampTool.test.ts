import { beforeEach, describe, expect, it } from 'vitest';
import { PIXEL_SIZE } from '@/core/grid';
import { TileStampTool } from '@/tools/tileStampTool';
import { useClipboardStore } from '@/state/clipboardStore';
import { useHistoryStore } from '@/state/historyStore';
import { useTileMapStore } from '@/state/tileMapStore';

const makeCursorAtTile = (tileX: number, tileY: number, tileWidth: number, tileHeight: number) => ({
  screenX: 0,
  screenY: 0,
  canvasX: tileX * tileWidth * PIXEL_SIZE,
  canvasY: tileY * tileHeight * PIXEL_SIZE,
  primary: true,
  alt: false,
  ctrl: false,
  shift: false,
});

const makeTile = (value: number) => ({ pixels: new Array(64).fill(value) });

describe('TileStampTool', () => {
  beforeEach(() => {
    useClipboardStore.getState().clear();
    useTileMapStore.getState().clear();
    useHistoryStore.getState().clear();
  });

  it('stamps clipboard tiles centered on cursor tile', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Stamp Set',
      tileWidth: 8,
      tileHeight: 8,
      columns: 2,
      rows: 2,
      tiles: [makeTile(1), makeTile(2), makeTile(3), makeTile(4)],
    });
    tileStore.setActiveTileSet(tileSetId);
    const tileMapId = tileStore.addTileMap({
      name: 'Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 5,
      rows: 5,
      tiles: new Array(25).fill(-1),
    });
    tileStore.setActiveTileMap(tileMapId);
    useClipboardStore.getState().setTileBuffer({
      tileSetId,
      tiles: [0, 1, 2, 3],
      cols: 2,
      rows: 2,
      source: 'palette',
    });

    const tool = new TileStampTool();
    tool.onBegin?.(makeCursorAtTile(2, 2, 8, 8));
    tool.onEnd?.();

    const map = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);
    expect(map?.tiles[1 * 5 + 1]).toBe(0);
    expect(map?.tiles[1 * 5 + 2]).toBe(1);
    expect(map?.tiles[2 * 5 + 1]).toBe(2);
    expect(map?.tiles[2 * 5 + 2]).toBe(3);
  });

  it('records one tile-history batch and supports undo', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'History Set',
      tileWidth: 8,
      tileHeight: 8,
      columns: 1,
      rows: 1,
      tiles: [makeTile(1)],
    });
    tileStore.setActiveTileSet(tileSetId);
    const tileMapId = tileStore.addTileMap({
      name: 'Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 2,
      rows: 2,
      tiles: new Array(4).fill(-1),
    });
    tileStore.setActiveTileMap(tileMapId);
    useClipboardStore.getState().setTileBuffer({
      tileSetId,
      tiles: [0],
      cols: 1,
      rows: 1,
      source: 'palette',
    });

    const tool = new TileStampTool();
    tool.onBegin?.(makeCursorAtTile(0, 0, 8, 8));
    tool.onEnd?.();

    expect(useHistoryStore.getState().undoStack).toHaveLength(1);
    let map = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);
    expect(map?.tiles[0]).toBe(0);

    useHistoryStore.getState().undo();
    map = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);
    expect(map?.tiles[0]).toBe(-1);
  });
});
