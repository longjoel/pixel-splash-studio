import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PIXEL_SIZE, TILE_SIZE } from '@/core/grid';
import { usePixelStore } from '@/state/pixelStore';
import { usePreviewStore } from '@/state/previewStore';
import { useTileMapStore } from '@/state/tileMapStore';
import { TileSamplerTool } from '@/tools/tileSamplerTool';

const makeCursor = (canvasX: number, canvasY: number) => ({
  screenX: canvasX,
  screenY: canvasY,
  canvasX,
  canvasY,
  primary: true,
  alt: false,
  ctrl: false,
  shift: false,
});

const endPointForRegion = (columns: number, rows: number) => ({
  x: columns * TILE_SIZE * PIXEL_SIZE - 1,
  y: rows * TILE_SIZE * PIXEL_SIZE - 1,
});

describe('TileSamplerTool', () => {
  beforeEach(() => {
    usePixelStore.getState().clear();
    usePreviewStore.getState().clear();
    useTileMapStore.getState().clear();
  });

  it('creates the first tile set with sampled rows and columns', () => {
    const tool = new TileSamplerTool();
    const end = endPointForRegion(2, 3);

    tool.onBegin?.(makeCursor(0, 0));
    tool.onEnd?.(makeCursor(end.x, end.y));

    const tileStore = useTileMapStore.getState();
    expect(tileStore.tileSets).toHaveLength(1);
    expect(tileStore.tileSets[0]?.columns).toBe(2);
    expect(tileStore.tileSets[0]?.rows).toBe(3);
    expect(tileStore.tileSets[0]?.tiles).toHaveLength(6);
  });

  it('sizes an empty active tile set from the first sampled region', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Empty',
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
      columns: 1,
      rows: 1,
      tiles: [],
    });

    const tool = new TileSamplerTool();
    const end = endPointForRegion(3, 2);

    tool.onBegin?.(makeCursor(0, 0));
    tool.onEnd?.(makeCursor(end.x, end.y));

    const tileSet = useTileMapStore
      .getState()
      .tileSets.find((set) => set.id === tileSetId);

    expect(tileSet).toBeTruthy();
    expect(tileSet?.columns).toBe(3);
    expect(tileSet?.rows).toBe(2);
    expect(tileSet?.tiles).toHaveLength(6);
  });

  it('keeps existing tile-set layout when sampling into a non-empty set', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Filled',
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
      columns: 3,
      rows: 3,
      tiles: [{ pixels: new Array(TILE_SIZE * TILE_SIZE).fill(0) }],
    });

    const tool = new TileSamplerTool();
    const end = endPointForRegion(3, 3);

    tool.onBegin?.(makeCursor(0, 0));
    tool.onEnd?.(makeCursor(end.x, end.y));

    const tileSet = useTileMapStore
      .getState()
      .tileSets.find((set) => set.id === tileSetId);

    expect(tileSet).toBeTruthy();
    expect(tileSet?.columns).toBe(3);
    expect(tileSet?.rows).toBe(3);
    expect(tileSet?.tiles).toHaveLength(10);
  });

  it('rejects captures that do not match an existing non-empty tile-set cluster size', () => {
    const alertSpy = vi.fn();
    const originalAlert = (globalThis as { alert?: (value?: unknown) => void }).alert;
    (globalThis as { alert?: (value?: unknown) => void }).alert = alertSpy;
    try {
      const tileStore = useTileMapStore.getState();
      const tileSetId = tileStore.addTileSet({
        name: 'Fixed Cluster',
        tileWidth: TILE_SIZE,
        tileHeight: TILE_SIZE,
        columns: 3,
        rows: 3,
        tiles: [{ pixels: new Array(TILE_SIZE * TILE_SIZE).fill(1) }],
      });

      const tool = new TileSamplerTool();
      const end = endPointForRegion(2, 2);

      tool.onBegin?.(makeCursor(0, 0));
      tool.onEnd?.(makeCursor(end.x, end.y));

      const tileSet = useTileMapStore
        .getState()
        .tileSets.find((set) => set.id === tileSetId);

      expect(tileSet).toBeTruthy();
      expect(tileSet?.tiles).toHaveLength(1);
      expect(alertSpy).toHaveBeenCalledTimes(1);
    } finally {
      (globalThis as { alert?: (value?: unknown) => void }).alert = originalAlert;
    }
  });

  it('accepts captures after manually changing a non-empty tile-set cluster size', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Adjustable Cluster',
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
      columns: 3,
      rows: 3,
      tiles: [{ pixels: new Array(TILE_SIZE * TILE_SIZE).fill(1) }],
    });

    tileStore.setTileSetLayout(tileSetId, 2, 2);

    const tool = new TileSamplerTool();
    const end = endPointForRegion(2, 2);
    tool.onBegin?.(makeCursor(0, 0));
    tool.onEnd?.(makeCursor(end.x, end.y));

    const tileSet = useTileMapStore
      .getState()
      .tileSets.find((set) => set.id === tileSetId);

    expect(tileSet).toBeTruthy();
    expect(tileSet?.columns).toBe(2);
    expect(tileSet?.rows).toBe(2);
    expect(tileSet?.tiles).toHaveLength(5);
  });
});
