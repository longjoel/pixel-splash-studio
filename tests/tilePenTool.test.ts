import { describe, it, expect, beforeEach } from 'vitest';
import { TilePenTool } from '@/tools/tilePenTool';
import { usePreviewStore } from '@/state/previewStore';
import { useTileMapStore } from '@/state/tileMapStore';

const makeCursor = (secondary: boolean) => ({
  screenX: 0,
  screenY: 0,
  canvasX: 0,
  canvasY: 0,
  primary: !secondary,
  secondary,
  alt: false,
  ctrl: false,
  shift: false,
});

describe('TilePenTool', () => {
  beforeEach(() => {
    usePreviewStore.getState().clear();
    useTileMapStore.getState().clear();
  });

  it('erases tiles with secondary button', () => {
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
});

