import { describe, it, expect, beforeEach } from 'vitest';
import { usePixelStore } from '@/state/pixelStore';
import { useTileMapStore } from '@/state/tileMapStore';

describe('tile canvas sync', () => {
  beforeEach(() => {
    usePixelStore.getState().clear();
    useTileMapStore.getState().clear();
  });

  it('updates canvas-sourced tiles when pixels change', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Test Set',
      tileWidth: 2,
      tileHeight: 2,
      tiles: [
        {
          pixels: [0, 0, 0, 0],
          source: { kind: 'canvas', x: 0, y: 0 },
        },
      ],
    });

    usePixelStore.getState().setPixel(0, 0, 3);
    usePixelStore.getState().setPixel(1, 0, 4);
    usePixelStore.getState().setPixel(0, 1, 5);
    usePixelStore.getState().setPixel(1, 1, 6);
    const dirty = usePixelStore.getState().consumeDirtyBlocks();
    tileStore.refreshCanvasSourcedTiles(
      dirty.dirtyAll,
      dirty.blocks.map((block) => ({ row: block.row, col: block.col }))
    );

    const updatedTileSet = useTileMapStore.getState().tileSets.find((set) => set.id === tileSetId);
    expect(updatedTileSet).toBeTruthy();
    expect(updatedTileSet?.tiles[0]?.pixels).toEqual([3, 4, 5, 6]);
  });
});

