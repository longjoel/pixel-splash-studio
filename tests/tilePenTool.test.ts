import { describe, it, expect, beforeEach } from 'vitest';
import { TilePenTool } from '@/tools/tilePenTool';
import { usePreviewStore } from '@/state/previewStore';
import { useTileMapStore } from '@/state/tileMapStore';
import { useHistoryStore } from '@/state/historyStore';

const makeCursor = (erasing: boolean) => ({
  screenX: 0,
  screenY: 0,
  canvasX: 0,
  canvasY: 0,
  primary: true,
  alt: erasing,
  ctrl: false,
  shift: false,
});

const makeCursorAtTile = (
  erasing: boolean,
  worldTileX: number,
  worldTileY: number,
  tileWidth: number,
  tileHeight: number
) => ({
  screenX: 0,
  screenY: 0,
  canvasX: worldTileX * tileWidth * 12,
  canvasY: worldTileY * tileHeight * 12,
  primary: true,
  alt: erasing,
  ctrl: false,
  shift: false,
});

describe('TilePenTool', () => {
  beforeEach(() => {
    usePreviewStore.getState().clear();
    useTileMapStore.getState().clear();
    useHistoryStore.getState().clear();
  });

  it('erases tiles with Alt', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Test Set',
      tileWidth: 2,
      tileHeight: 2,
      tiles: [{ pixels: [1, 1, 1, 1] }],
    });
    tileStore.setActiveTileSet(tileSetId);

    const tiles = new Array(4 * 4).fill(-1);
    tiles[0] = 0;
    const tileMapId = tileStore.addTileMap({
      name: 'Test Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 4,
      rows: 4,
      tiles,
    });
    tileStore.setActiveTileMap(tileMapId);

    const tool = new TilePenTool();
    tool.onBegin?.(makeCursor(true));
    tool.onEnd?.();

    const next = useTileMapStore.getState().tileMaps.find((map) => map.id === tileMapId);
    expect(next?.tiles[0]).toBe(-1);
  });

  it('uses soft placement to preserve underlying pixels under transparent source pixels', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Blend Set',
      tileWidth: 2,
      tileHeight: 2,
      tiles: [
        { pixels: [2, 2, 2, 2] },
        { pixels: [1, 0, 0, 1] },
      ],
    });
    tileStore.setActiveTileSet(tileSetId);
    tileStore.setTilePlacementMode('soft');
    tileStore.setSelectedTileIndex(1);

    const tileMapId = tileStore.addTileMap({
      name: 'Blend Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 1,
      rows: 1,
      tiles: [0],
    });
    tileStore.setActiveTileMap(tileMapId);

    const tool = new TilePenTool();
    tool.onBegin?.(makeCursor(false));
    tool.onEnd?.();

    const next = useTileMapStore.getState();
    const updatedMap = next.tileMaps.find((map) => map.id === tileMapId);
    const updatedSet = next.tileSets.find((set) => set.id === tileSetId);
    expect(updatedMap?.tiles[0]).toBe(2);
    expect(updatedSet?.tiles).toHaveLength(3);
    expect(updatedSet?.tiles[2]?.pixels).toEqual([1, 2, 2, 1]);
  });

  it('uses hard placement to overwrite the destination tile index', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Hard Set',
      tileWidth: 2,
      tileHeight: 2,
      tiles: [
        { pixels: [2, 2, 2, 2] },
        { pixels: [1, 0, 0, 1] },
      ],
    });
    tileStore.setActiveTileSet(tileSetId);
    tileStore.setTilePlacementMode('hard');
    tileStore.setSelectedTileIndex(1);

    const tileMapId = tileStore.addTileMap({
      name: 'Hard Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 1,
      rows: 1,
      tiles: [0],
    });
    tileStore.setActiveTileMap(tileMapId);

    const tool = new TilePenTool();
    tool.onBegin?.(makeCursor(false));
    tool.onEnd?.();

    const next = useTileMapStore.getState();
    const updatedMap = next.tileMaps.find((map) => map.id === tileMapId);
    const updatedSet = next.tileSets.find((set) => set.id === tileSetId);
    expect(updatedMap?.tiles[0]).toBe(1);
    expect(updatedSet?.tiles).toHaveLength(2);
  });

  it('snaps tile-pen placement to cluster bounds when enabled', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Snap Set',
      tileWidth: 2,
      tileHeight: 2,
      tiles: [{ pixels: [1, 1, 1, 1] }],
    });
    tileStore.setActiveTileSet(tileSetId);
    tileStore.setTileSelection([0, 0, 0, 0], 2, 2, 0);
    tileStore.setTilePenSnapToCluster(true);

    const tileMapId = tileStore.addTileMap({
      name: 'Snap Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 8,
      rows: 8,
      tiles: new Array(64).fill(-1),
    });
    tileStore.setActiveTileMap(tileMapId);

    const tool = new TilePenTool();
    tool.onBegin?.(makeCursorAtTile(false, 3, 5, 2, 2));
    tool.onEnd?.();

    const updatedMap = useTileMapStore.getState().tileMaps.find((map) => map.id === tileMapId);
    expect(updatedMap?.tiles[4 * 8 + 2]).toBe(0);
    expect(updatedMap?.tiles[4 * 8 + 3]).toBe(0);
    expect(updatedMap?.tiles[5 * 8 + 2]).toBe(0);
    expect(updatedMap?.tiles[5 * 8 + 3]).toBe(0);
    expect(updatedMap?.tiles[4 * 8 + 4]).toBe(-1);
  });

  it('places at the exact hover tile when cluster snap is disabled', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Free Set',
      tileWidth: 2,
      tileHeight: 2,
      tiles: [{ pixels: [1, 1, 1, 1] }],
    });
    tileStore.setActiveTileSet(tileSetId);
    tileStore.setTileSelection([0, 0, 0, 0], 2, 2, 0);
    tileStore.setTilePenSnapToCluster(false);

    const tileMapId = tileStore.addTileMap({
      name: 'Free Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 8,
      rows: 8,
      tiles: new Array(64).fill(-1),
    });
    tileStore.setActiveTileMap(tileMapId);

    const tool = new TilePenTool();
    tool.onBegin?.(makeCursorAtTile(false, 3, 5, 2, 2));
    tool.onEnd?.();

    const updatedMap = useTileMapStore.getState().tileMaps.find((map) => map.id === tileMapId);
    expect(updatedMap?.tiles[5 * 8 + 3]).toBe(0);
    expect(updatedMap?.tiles[5 * 8 + 4]).toBe(0);
    expect(updatedMap?.tiles[6 * 8 + 3]).toBe(0);
    expect(updatedMap?.tiles[6 * 8 + 4]).toBe(0);
    expect(updatedMap?.tiles[4 * 8 + 2]).toBe(-1);
  });

  it('records tile-map painting in undo/redo history', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'History Set',
      tileWidth: 2,
      tileHeight: 2,
      tiles: [{ pixels: [1, 1, 1, 1] }],
    });
    tileStore.setActiveTileSet(tileSetId);

    const tileMapId = tileStore.addTileMap({
      name: 'History Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 1,
      rows: 1,
      tiles: [-1],
    });
    tileStore.setActiveTileMap(tileMapId);

    const tool = new TilePenTool();
    tool.onBegin?.(makeCursor(false));
    tool.onEnd?.();

    expect(useHistoryStore.getState().undoStack).toHaveLength(1);
    let map = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);
    expect(map?.tiles[0]).toBe(0);

    useHistoryStore.getState().undo();
    map = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);
    expect(map?.tiles[0]).toBe(-1);

    useHistoryStore.getState().redo();
    map = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);
    expect(map?.tiles[0]).toBe(0);
  });

  it('records implicit tile-map creation in undo/redo history', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Auto Map Set',
      tileWidth: 2,
      tileHeight: 2,
      tiles: [{ pixels: [1, 1, 1, 1] }],
    });
    tileStore.setActiveTileSet(tileSetId);

    const tool = new TilePenTool();
    tool.onBegin?.(makeCursor(false));
    tool.onEnd?.();

    expect(useTileMapStore.getState().tileMaps.length).toBe(1);
    expect(useHistoryStore.getState().undoStack).toHaveLength(1);

    useHistoryStore.getState().undo();
    expect(useTileMapStore.getState().tileMaps.length).toBe(0);

    useHistoryStore.getState().redo();
    expect(useTileMapStore.getState().tileMaps.length).toBe(1);
  });
});
