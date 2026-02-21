import type { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE, TILE_SIZE } from '@/core/grid';
import { usePixelStore } from '@/state/pixelStore';
import { usePreviewStore } from '@/state/previewStore';
import { useTileMapStore } from '@/state/tileMapStore';

type TilePoint = { x: number; y: number };

type TileBounds = {
  minTileX: number;
  maxTileX: number;
  minTileY: number;
  maxTileY: number;
};

const toTilePoint = (cursor: CursorState): TilePoint => ({
  x: Math.floor(cursor.canvasX / PIXEL_SIZE / TILE_SIZE),
  y: Math.floor(cursor.canvasY / PIXEL_SIZE / TILE_SIZE),
});

const toTileBounds = (start: TilePoint, end: TilePoint): TileBounds => ({
  minTileX: Math.min(start.x, end.x),
  maxTileX: Math.max(start.x, end.x),
  minTileY: Math.min(start.y, end.y),
  maxTileY: Math.max(start.y, end.y),
});

const drawFilledRect = (bounds: TileBounds) => {
  const preview = usePreviewStore.getState();
  for (let ty = bounds.minTileY; ty <= bounds.maxTileY; ty += 1) {
    for (let tx = bounds.minTileX; tx <= bounds.maxTileX; tx += 1) {
      const startX = tx * TILE_SIZE;
      const startY = ty * TILE_SIZE;
      for (let y = 0; y < TILE_SIZE; y += 1) {
        for (let x = 0; x < TILE_SIZE; x += 1) {
          preview.setPixel(startX + x, startY + y, 1);
        }
      }
    }
  }
};

const notifyInvalidSelection = (message: string) => {
  const alertFn = (globalThis as { alert?: (value?: unknown) => void }).alert;
  if (typeof alertFn === 'function') {
    alertFn(message);
  }
};

export class TileSamplerTool implements Tool {
  id = 'tile-sampler';
  private start: TilePoint | null = null;
  private last: TilePoint | null = null;

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.start = toTilePoint(cursor);
    this.last = this.start;
  };

  onMove = (cursor: CursorState) => {
    if (!this.start) {
      return;
    }
    const preview = usePreviewStore.getState();
    preview.clear();
    const end = toTilePoint(cursor);
    this.last = end;
    drawFilledRect(toTileBounds(this.start, end));
  };

  onEnd = (cursor?: CursorState) => {
    if (!this.start) {
      return;
    }
    const preview = usePreviewStore.getState();
    const end = cursor ? toTilePoint(cursor) : this.last ?? this.start;
    const bounds = toTileBounds(this.start, end);

    const pixelStore = usePixelStore.getState();
    const tileStore = useTileMapStore.getState();
    const columns = bounds.maxTileX - bounds.minTileX + 1;
    const rows = bounds.maxTileY - bounds.minTileY + 1;

    let activeTileSetId = tileStore.activeTileSetId;
    const activeTileSet = tileStore.tileSets.find((set) => set.id === activeTileSetId);
    let startIndex = activeTileSet?.tiles.length ?? 0;
    if (
      !activeTileSet ||
      activeTileSet.tileWidth !== TILE_SIZE ||
      activeTileSet.tileHeight !== TILE_SIZE
    ) {
      activeTileSetId = tileStore.addTileSet({
        name: `Tile Set ${tileStore.tileSets.length + 1}`,
        tileWidth: TILE_SIZE,
        tileHeight: TILE_SIZE,
        columns,
        rows,
        tiles: [],
      });
      startIndex = 0;
    } else if (activeTileSet && activeTileSet.tiles.length === 0) {
      tileStore.setTileSetLayout(activeTileSet.id, columns, rows);
    } else if (
      activeTileSet &&
      activeTileSet.tiles.length > 0 &&
      (activeTileSet.columns !== columns || activeTileSet.rows !== rows)
    ) {
      notifyInvalidSelection(
        `Invalid selection: ${activeTileSet.name} expects ${activeTileSet.columns}x${activeTileSet.rows}. Capture that size or create a new tile set.`
      );
      preview.clear();
      this.start = null;
      this.last = null;
      return;
    }

    const tilesToAdd: Array<{ name?: string; pixels: number[]; source?: { kind: 'canvas'; x: number; y: number } }> = [];
    for (let ty = bounds.minTileY; ty <= bounds.maxTileY; ty += 1) {
      for (let tx = bounds.minTileX; tx <= bounds.maxTileX; tx += 1) {
        const tilePixels: number[] = [];
        const startX = tx * TILE_SIZE;
        const startY = ty * TILE_SIZE;
        for (let y = 0; y < TILE_SIZE; y += 1) {
          for (let x = 0; x < TILE_SIZE; x += 1) {
            tilePixels.push(pixelStore.getPixelComposite(startX + x, startY + y));
          }
        }
        tilesToAdd.push({ pixels: tilePixels, source: { kind: 'canvas', x: startX, y: startY } });
      }
    }

    if (activeTileSetId) {
      tileStore.appendTilesToSet(activeTileSetId, tilesToAdd);
      tileStore.setSelectedTileIndex(startIndex);
      tileStore.setTilePage(0);
      tileStore.setTilePaletteOffset(0);
    }

    preview.clear();
    this.start = null;
    this.last = null;
  };

  onCancel = () => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.start = null;
    this.last = null;
  };
}
