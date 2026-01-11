import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePreviewStore } from '@/state/previewStore';
import { useTileMapStore } from '@/state/tileMapStore';

const DEFAULT_TILE_MAP_SIZE = 32;

type TilePoint = { x: number; y: number };

type ActiveTileContext = {
  tileSetId: string;
  tileWidth: number;
  tileHeight: number;
  tilePixels: number[];
  tileIndex: number;
};

type ActiveMapContext = {
  tileMapId: string;
  originX: number;
  originY: number;
  columns: number;
  rows: number;
};

const toPixelPoint = (cursor: CursorState) => ({
  x: Math.floor(cursor.canvasX / PIXEL_SIZE),
  y: Math.floor(cursor.canvasY / PIXEL_SIZE),
});

const drawTilePreview = (
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

const getActiveTileContext = (): ActiveTileContext | null => {
  const tileStore = useTileMapStore.getState();
  const tileSet = tileStore.tileSets.find((set) => set.id === tileStore.activeTileSetId);
  if (!tileSet) {
    return null;
  }
  const tileIndex = tileStore.selectedTileIndex;
  const tile = tileSet.tiles[tileIndex];
  if (!tile) {
    return null;
  }
  return {
    tileSetId: tileSet.id,
    tileWidth: tileSet.tileWidth,
    tileHeight: tileSet.tileHeight,
    tilePixels: tile.pixels,
    tileIndex,
  };
};

const ensureActiveMap = (
  tileSetId: string,
  createIfMissing: boolean
): ActiveMapContext | null => {
  const tileStore = useTileMapStore.getState();
  const tileSet = tileStore.tileSets.find((set) => set.id === tileSetId);
  if (!tileSet) {
    return null;
  }
  const existing = tileStore.tileMaps.find(
    (map) => map.id === tileStore.activeTileMapId && map.tileSetId === tileSetId
  );
  if (existing) {
    return {
      tileMapId: existing.id,
      originX: existing.originX,
      originY: existing.originY,
      columns: existing.columns,
      rows: existing.rows,
    };
  }

  const fallback = tileStore.tileMaps.find((map) => map.tileSetId === tileSetId);
  if (fallback) {
    tileStore.setActiveTileMap(fallback.id);
    return {
      tileMapId: fallback.id,
      originX: fallback.originX,
      originY: fallback.originY,
      columns: fallback.columns,
      rows: fallback.rows,
    };
  }

  if (!createIfMissing) {
    return null;
  }

  const size = DEFAULT_TILE_MAP_SIZE;
  const tiles = new Array(size * size).fill(-1);
  const half = Math.floor(size / 2);
  const originX = -half * tileSet.tileWidth;
  const originY = -half * tileSet.tileHeight;
  const tileMapId = tileStore.addTileMap({
    name: `Tile Map ${tileStore.tileMaps.length + 1}`,
    tileSetId,
    originX,
    originY,
    columns: size,
    rows: size,
    tiles,
  });
  return { tileMapId, originX, originY, columns: size, rows: size };
};

export class TilePenTool implements Tool {
  id = 'tile-pen';
  private drawing = false;
  private changes = new Map<number, number>();
  private lastPoint: TilePoint | null = null;
  private activeMap: ActiveMapContext | null = null;
  private activeTile: ActiveTileContext | null = null;

  private toTilePoint(pixelPoint: TilePoint): TilePoint | null {
    if (!this.activeTile || !this.activeMap) {
      return null;
    }
    const { originX, originY } = this.activeMap;
    const tileX = Math.floor((pixelPoint.x - originX) / this.activeTile.tileWidth);
    const tileY = Math.floor((pixelPoint.y - originY) / this.activeTile.tileHeight);
    return { x: tileX, y: tileY };
  }

  private applyTile(tilePoint: TilePoint) {
    if (!this.activeTile || !this.activeMap) {
      return;
    }
    const { columns, rows, originX, originY } = this.activeMap;
    if (tilePoint.x < 0 || tilePoint.y < 0 || tilePoint.x >= columns || tilePoint.y >= rows) {
      return;
    }
    const index = tilePoint.y * columns + tilePoint.x;
    if (this.drawing) {
      this.changes.set(index, this.activeTile.tileIndex);
    }
    const pixelX = originX + tilePoint.x * this.activeTile.tileWidth;
    const pixelY = originY + tilePoint.y * this.activeTile.tileHeight;
    drawTilePreview(
      pixelX,
      pixelY,
      this.activeTile.tileWidth,
      this.activeTile.tileHeight,
      this.activeTile.tilePixels
    );
  }

  onHover = (cursor: CursorState) => {
    if (this.drawing) {
      return;
    }
    const preview = usePreviewStore.getState();
    preview.clear();
    this.activeTile = getActiveTileContext();
    if (!this.activeTile) {
      return;
    }
    this.activeMap = ensureActiveMap(this.activeTile.tileSetId, false);
    if (!this.activeMap) {
      return;
    }
    const pixelPoint = toPixelPoint(cursor);
    const tilePoint = this.toTilePoint(pixelPoint);
    if (!tilePoint) {
      return;
    }
    this.applyTile(tilePoint);
  };

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.drawing = true;
    this.changes.clear();
    this.activeTile = getActiveTileContext();
    if (!this.activeTile) {
      this.drawing = false;
      return;
    }
    this.activeMap = ensureActiveMap(this.activeTile.tileSetId, true);
    if (!this.activeMap) {
      this.drawing = false;
      return;
    }
    const pixelPoint = toPixelPoint(cursor);
    const tilePoint = this.toTilePoint(pixelPoint);
    if (!tilePoint) {
      return;
    }
    this.applyTile(tilePoint);
    this.lastPoint = tilePoint;
  };

  onMove = (cursor: CursorState) => {
    if (!this.drawing) {
      this.onHover(cursor);
      return;
    }
    if (!this.activeTile || !this.activeMap) {
      return;
    }
    const nextPixelPoint = toPixelPoint(cursor);
    const nextTilePoint = this.toTilePoint(nextPixelPoint);
    if (!nextTilePoint) {
      return;
    }

    if (this.lastPoint) {
      let x = this.lastPoint.x;
      let y = this.lastPoint.y;
      const dx = Math.abs(nextTilePoint.x - this.lastPoint.x);
      const dy = Math.abs(nextTilePoint.y - this.lastPoint.y);
      const sx = this.lastPoint.x < nextTilePoint.x ? 1 : -1;
      const sy = this.lastPoint.y < nextTilePoint.y ? 1 : -1;
      let err = dx - dy;

      while (true) {
        this.applyTile({ x, y });
        if (x === nextTilePoint.x && y === nextTilePoint.y) {
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
    } else {
      this.applyTile(nextTilePoint);
    }

    this.lastPoint = nextTilePoint;
  };

  onEnd = () => {
    if (!this.drawing || !this.activeMap) {
      return;
    }
    const updates = Array.from(this.changes.entries()).map(([index, tile]) => ({
      index,
      tile,
    }));
    useTileMapStore.getState().setTileMapTiles(this.activeMap.tileMapId, updates);
    const preview = usePreviewStore.getState();
    preview.clear();
    this.drawing = false;
    this.changes.clear();
    this.lastPoint = null;
  };

  onCancel = () => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.drawing = false;
    this.changes.clear();
    this.lastPoint = null;
  };
}
