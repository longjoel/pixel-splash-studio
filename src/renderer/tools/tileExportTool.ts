import type { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePreviewStore } from '@/state/previewStore';
import { useTileMapStore } from '@/state/tileMapStore';
import { exportTileMapRegion } from '@/services/tileMapExport';

type TilePoint = { x: number; y: number };

type TileBounds = {
  minTileX: number;
  maxTileX: number;
  minTileY: number;
  maxTileY: number;
};

const toPixelPoint = (cursor: CursorState) => ({
  x: Math.floor(cursor.canvasX / PIXEL_SIZE),
  y: Math.floor(cursor.canvasY / PIXEL_SIZE),
});

const toTilePoint = (pixelPoint: TilePoint, tileWidth: number, tileHeight: number) => ({
  x: Math.floor(pixelPoint.x / tileWidth),
  y: Math.floor(pixelPoint.y / tileHeight),
});

const toTileBounds = (start: TilePoint, end: TilePoint): TileBounds => ({
  minTileX: Math.min(start.x, end.x),
  maxTileX: Math.max(start.x, end.x),
  minTileY: Math.min(start.y, end.y),
  maxTileY: Math.max(start.y, end.y),
});

const drawTilePreview = (
  bounds: TileBounds,
  tileWidth: number,
  tileHeight: number
) => {
  const preview = usePreviewStore.getState();
  for (let ty = bounds.minTileY; ty <= bounds.maxTileY; ty += 1) {
    for (let tx = bounds.minTileX; tx <= bounds.maxTileX; tx += 1) {
      const startX = tx * tileWidth;
      const startY = ty * tileHeight;
      for (let y = 0; y < tileHeight; y += 1) {
        for (let x = 0; x < tileWidth; x += 1) {
          preview.setPixel(startX + x, startY + y, 1);
        }
      }
    }
  }
};

export class TileExportTool implements Tool {
  id = 'tile-export';
  private start: TilePoint | null = null;
  private last: TilePoint | null = null;
  private tileWidth = 0;
  private tileHeight = 0;

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    const tileSet = useTileMapStore.getState().tileSets.find(
      (set) => set.id === useTileMapStore.getState().activeTileSetId
    );
    if (!tileSet) {
      this.start = null;
      this.last = null;
      return;
    }
    this.tileWidth = tileSet.tileWidth;
    this.tileHeight = tileSet.tileHeight;
    this.start = toTilePoint(toPixelPoint(cursor), this.tileWidth, this.tileHeight);
    this.last = this.start;
  };

  onMove = (cursor: CursorState) => {
    if (!this.start || this.tileWidth === 0 || this.tileHeight === 0) {
      return;
    }
    const preview = usePreviewStore.getState();
    preview.clear();
    const end = toTilePoint(toPixelPoint(cursor), this.tileWidth, this.tileHeight);
    this.last = end;
    drawTilePreview(toTileBounds(this.start, end), this.tileWidth, this.tileHeight);
  };

  onEnd = (cursor?: CursorState) => {
    if (!this.start || this.tileWidth === 0 || this.tileHeight === 0) {
      return;
    }
    const preview = usePreviewStore.getState();
    const end = cursor
      ? toTilePoint(toPixelPoint(cursor), this.tileWidth, this.tileHeight)
      : this.last ?? this.start;
    const bounds = toTileBounds(this.start, end);
    preview.clear();
    this.start = null;
    this.last = null;
    void exportTileMapRegion(bounds);
  };

  onCancel = () => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.start = null;
    this.last = null;
  };
}
