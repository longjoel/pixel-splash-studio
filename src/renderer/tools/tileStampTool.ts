import type { CursorState, Tool } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { useClipboardStore } from '@/state/clipboardStore';
import { usePreviewStore } from '@/state/previewStore';
import { useTileMapStore, type TileMapPayload, type TileSetPayload } from '@/state/tileMapStore';
import {
  captureTileHistorySnapshot,
  pushTileHistoryBatchIfChanged,
  type TileHistorySnapshot,
} from '@/state/historyStore';

type TilePoint = { x: number; y: number };

type StampContext = {
  tileSet: TileSetPayload;
  tileMap: TileMapPayload;
  buffer: {
    cols: number;
    rows: number;
    tiles: number[];
  };
};

const toWorldPixelPoint = (cursor: CursorState) => ({
  x: Math.floor(cursor.canvasX / PIXEL_SIZE),
  y: Math.floor(cursor.canvasY / PIXEL_SIZE),
});

const drawTilePixels = (
  originX: number,
  originY: number,
  tileWidth: number,
  tileHeight: number,
  pixels: number[]
) => {
  const preview = usePreviewStore.getState();
  for (let y = 0; y < tileHeight; y += 1) {
    for (let x = 0; x < tileWidth; x += 1) {
      const paletteIndex = pixels[y * tileWidth + x] ?? 0;
      if (paletteIndex === 0) {
        continue;
      }
      preview.setPixel(originX + x, originY + y, paletteIndex);
    }
  }
};

export class TileStampTool implements Tool {
  id = 'tile-stamp';
  private drawing = false;
  private historyBefore: TileHistorySnapshot | null = null;
  private lastPoint: TilePoint | null = null;
  private touchedAnchors = new Set<string>();

  private getContext(): StampContext | null {
    const clipboard = useClipboardStore.getState();
    const tileBuffer = clipboard.tileBuffer;
    if (
      !tileBuffer ||
      tileBuffer.cols <= 0 ||
      tileBuffer.rows <= 0 ||
      tileBuffer.tiles.length === 0
    ) {
      return null;
    }
    const tileStore = useTileMapStore.getState();
    const tileSet = tileStore.tileSets.find((set) => set.id === tileBuffer.tileSetId);
    if (!tileSet) {
      return null;
    }
    const tileMap =
      tileStore.tileMaps.find(
        (map) => map.id === tileStore.activeTileMapId && map.tileSetId === tileSet.id
      ) ?? tileStore.tileMaps.find((map) => map.tileSetId === tileSet.id);
    if (!tileMap) {
      return null;
    }
    return {
      tileSet,
      tileMap,
      buffer: {
        cols: tileBuffer.cols,
        rows: tileBuffer.rows,
        tiles: tileBuffer.tiles,
      },
    };
  }

  private toWorldTilePoint(cursor: CursorState, tileSet: TileSetPayload): TilePoint {
    const pixelPoint = toWorldPixelPoint(cursor);
    return {
      x: Math.floor(pixelPoint.x / tileSet.tileWidth),
      y: Math.floor(pixelPoint.y / tileSet.tileHeight),
    };
  }

  private getAnchor(worldTilePoint: TilePoint, context: StampContext): TilePoint {
    return {
      x: worldTilePoint.x - Math.floor(context.buffer.cols / 2),
      y: worldTilePoint.y - Math.floor(context.buffer.rows / 2),
    };
  }

  private renderPreview(cursor: CursorState) {
    const preview = usePreviewStore.getState();
    preview.clear();
    const context = this.getContext();
    if (!context) {
      return;
    }
    const worldTilePoint = this.toWorldTilePoint(cursor, context.tileSet);
    const anchor = this.getAnchor(worldTilePoint, context);
    const originTileX = Math.round(context.tileMap.originX / context.tileSet.tileWidth);
    const originTileY = Math.round(context.tileMap.originY / context.tileSet.tileHeight);

    for (let row = 0; row < context.buffer.rows; row += 1) {
      for (let col = 0; col < context.buffer.cols; col += 1) {
        const tileIndex = context.buffer.tiles[row * context.buffer.cols + col] ?? -1;
        if (tileIndex < 0) {
          continue;
        }
        const tilePixels = context.tileSet.tiles[tileIndex]?.pixels;
        if (!tilePixels) {
          continue;
        }
        const mapCol = anchor.x + col - originTileX;
        const mapRow = anchor.y + row - originTileY;
        const worldPixelX = context.tileMap.originX + mapCol * context.tileSet.tileWidth;
        const worldPixelY = context.tileMap.originY + mapRow * context.tileSet.tileHeight;
        drawTilePixels(
          worldPixelX,
          worldPixelY,
          context.tileSet.tileWidth,
          context.tileSet.tileHeight,
          tilePixels
        );
      }
    }
  }

  private applyStamp(anchor: TilePoint) {
    const context = this.getContext();
    if (!context) {
      return;
    }
    const key = `${anchor.x}:${anchor.y}`;
    if (this.touchedAnchors.has(key)) {
      return;
    }
    this.touchedAnchors.add(key);

    const targetWorldX = anchor.x * context.tileSet.tileWidth;
    const targetWorldY = anchor.y * context.tileSet.tileHeight;
    const tileStore = useTileMapStore.getState();
    const expanded =
      tileStore.expandTileMapToInclude(
        context.tileMap.id,
        anchor.x,
        anchor.x + context.buffer.cols - 1,
        anchor.y,
        anchor.y + context.buffer.rows - 1,
        context.tileSet.tileWidth,
        context.tileSet.tileHeight
      ) ??
      tileStore.tileMaps.find((map) => map.id === context.tileMap.id) ??
      null;
    if (!expanded) {
      return;
    }
    const anchorCol = Math.round((targetWorldX - expanded.originX) / context.tileSet.tileWidth);
    const anchorRow = Math.round((targetWorldY - expanded.originY) / context.tileSet.tileHeight);

    const updates: Array<{ index: number; tile: number }> = [];
    for (let row = 0; row < context.buffer.rows; row += 1) {
      for (let col = 0; col < context.buffer.cols; col += 1) {
        const mapCol = anchorCol + col;
        const mapRow = anchorRow + row;
        if (mapCol < 0 || mapRow < 0 || mapCol >= expanded.columns || mapRow >= expanded.rows) {
          continue;
        }
        const tile = context.buffer.tiles[row * context.buffer.cols + col] ?? -1;
        updates.push({ index: mapRow * expanded.columns + mapCol, tile });
      }
    }
    if (updates.length > 0) {
      tileStore.setTileMapTiles(expanded.id, updates);
    }
  }

  private stampLine(from: TilePoint, to: TilePoint, context: StampContext) {
    let x = from.x;
    let y = from.y;
    const dx = Math.abs(to.x - from.x);
    const dy = Math.abs(to.y - from.y);
    const sx = from.x < to.x ? 1 : -1;
    const sy = from.y < to.y ? 1 : -1;
    let err = dx - dy;
    while (true) {
      this.applyStamp(this.getAnchor({ x, y }, context));
      if (x === to.x && y === to.y) {
        break;
      }
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }
  }

  onHover = (cursor: CursorState) => {
    this.renderPreview(cursor);
  };

  onBegin = (cursor: CursorState) => {
    const context = this.getContext();
    if (!context) {
      usePreviewStore.getState().clear();
      return;
    }
    this.drawing = true;
    this.historyBefore = captureTileHistorySnapshot();
    this.touchedAnchors.clear();
    const point = this.toWorldTilePoint(cursor, context.tileSet);
    this.lastPoint = point;
    this.stampLine(point, point, context);
    this.renderPreview(cursor);
  };

  onMove = (cursor: CursorState) => {
    if (!this.drawing) {
      this.onHover(cursor);
      return;
    }
    const context = this.getContext();
    if (!context) {
      return;
    }
    const nextPoint = this.toWorldTilePoint(cursor, context.tileSet);
    this.stampLine(this.lastPoint ?? nextPoint, nextPoint, context);
    this.lastPoint = nextPoint;
    this.renderPreview(cursor);
  };

  onEnd = () => {
    if (this.historyBefore) {
      const after = captureTileHistorySnapshot();
      pushTileHistoryBatchIfChanged(this.historyBefore, after);
    }
    this.historyBefore = null;
    this.drawing = false;
    this.lastPoint = null;
    this.touchedAnchors.clear();
    usePreviewStore.getState().clear();
  };

  onCancel = () => {
    this.historyBefore = null;
    this.drawing = false;
    this.lastPoint = null;
    this.touchedAnchors.clear();
    usePreviewStore.getState().clear();
  };
}
