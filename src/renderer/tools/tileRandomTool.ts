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
  randomPool: number[];
  selectionCols: number;
  selectionRows: number;
  tileSetTiles: Array<{ pixels: number[] }>;
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
  const pool = Array.from(
    new Set(
      tileStore.selectedTileIndices.filter(
        (index) => index >= 0 && index < tileSet.tiles.length
      )
    )
  );
  return {
    tileSetId: tileSet.id,
    tileWidth: tileSet.tileWidth,
    tileHeight: tileSet.tileHeight,
    randomPool: pool,
    selectionCols: tileStore.selectedTileCols,
    selectionRows: tileStore.selectedTileRows,
    tileSetTiles: tileSet.tiles,
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

export class TileRandomTool implements Tool {
  id = 'tile-rectangle';
  private drawing = false;
  private changes = new Map<number, number>();
  private startWorldPoint: TilePoint | null = null;
  private lastWorldPoint: TilePoint | null = null;
  private seed = 0;
  private activeMap: ActiveMapContext | null = null;
  private activeTile: ActiveTileContext | null = null;

  private toWorldTilePoint(pixelPoint: TilePoint): TilePoint | null {
    if (!this.activeTile) {
      return null;
    }
    return {
      x: Math.floor(pixelPoint.x / this.activeTile.tileWidth),
      y: Math.floor(pixelPoint.y / this.activeTile.tileHeight),
    };
  }

  private toMapPoint(worldPoint: TilePoint): TilePoint | null {
    if (!this.activeTile || !this.activeMap) {
      return null;
    }
    const originTileX = Math.round(this.activeMap.originX / this.activeTile.tileWidth);
    const originTileY = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    return {
      x: worldPoint.x - originTileX,
      y: worldPoint.y - originTileY,
    };
  }

  private ensureMapBounds(worldPoint: TilePoint): TilePoint | null {
    if (!this.activeTile || !this.activeMap) {
      return null;
    }
    const selectionCols = this.activeTile.selectionCols;
    const selectionRows = this.activeTile.selectionRows;
    const mapPoint = this.toMapPoint(worldPoint);
    if (!mapPoint) {
      return null;
    }
    const minX = mapPoint.x;
    const minY = mapPoint.y;
    const maxX = mapPoint.x + selectionCols - 1;
    const maxY = mapPoint.y + selectionRows - 1;
    const tileStore = useTileMapStore.getState();
    const prevColumns = this.activeMap.columns;
    const prevOriginX = this.activeMap.originX;
    const prevOriginY = this.activeMap.originY;
    const expanded = tileStore.expandTileMapToInclude(
      this.activeMap.tileMapId,
      minX,
      maxX,
      minY,
      maxY,
      this.activeTile.tileWidth,
      this.activeTile.tileHeight
    );
    if (expanded) {
      this.activeMap = {
        tileMapId: expanded.id,
        originX: expanded.originX,
        originY: expanded.originY,
        columns: expanded.columns,
        rows: expanded.rows,
      };
      const shiftX = Math.round(
        (prevOriginX - expanded.originX) / this.activeTile.tileWidth
      );
      const shiftY = Math.round(
        (prevOriginY - expanded.originY) / this.activeTile.tileHeight
      );
      if (shiftX !== 0 || shiftY !== 0 || expanded.columns !== prevColumns) {
        const remapped = new Map<number, number>();
        for (const [index, tile] of this.changes.entries()) {
          const row = Math.floor(index / prevColumns);
          const col = index % prevColumns;
          const nextRow = row + shiftY;
          const nextCol = col + shiftX;
          if (
            nextRow < 0 ||
            nextCol < 0 ||
            nextRow >= expanded.rows ||
            nextCol >= expanded.columns
          ) {
            continue;
          }
          remapped.set(nextRow * expanded.columns + nextCol, tile);
        }
        this.changes = remapped;
      }
    }
    return this.toMapPoint(worldPoint);
  }

  private sampleTileIndex(): number | null {
    if (!this.activeTile) {
      return null;
    }
    const pool = this.activeTile.randomPool;
    if (pool.length === 0) {
      return null;
    }
    const pick = Math.floor(Math.random() * pool.length);
    return pool[pick] ?? null;
  }

  private sampleTileIndexForCell(worldX: number, worldY: number): number | null {
    if (!this.activeTile) {
      return null;
    }
    const pool = this.activeTile.randomPool;
    if (pool.length === 0) {
      return null;
    }
    const hash =
      (worldX * 73856093) ^ (worldY * 19349663) ^ (this.seed * 83492791);
    const pick = Math.abs(hash) % pool.length;
    return pool[pick] ?? null;
  }

  private applyTileArea(worldStart: TilePoint, worldEnd: TilePoint) {
    if (!this.activeTile || !this.activeMap) {
      return;
    }
    const minX = Math.min(worldStart.x, worldEnd.x);
    const maxX = Math.max(worldStart.x, worldEnd.x);
    const minY = Math.min(worldStart.y, worldEnd.y);
    const maxY = Math.max(worldStart.y, worldEnd.y);

    const adjustedPoint = this.ensureMapBounds({ x: minX, y: minY });
    if (!adjustedPoint) {
      return;
    }

    const { columns, rows } = this.activeMap;
    const originTileX = Math.round(this.activeMap.originX / this.activeTile.tileWidth);
    const originTileY = Math.round(this.activeMap.originY / this.activeTile.tileHeight);

    for (let worldY = minY; worldY <= maxY; worldY += 1) {
      for (let worldX = minX; worldX <= maxX; worldX += 1) {
        const mapX = worldX - originTileX;
        const mapY = worldY - originTileY;
        if (mapX < 0 || mapY < 0 || mapX >= columns || mapY >= rows) {
          continue;
        }
        const tileIndex = this.sampleTileIndexForCell(worldX, worldY);
        if (tileIndex === null) {
          continue;
        }
        const tile = this.activeTile.tileSetTiles[tileIndex];
        if (!tile) {
          continue;
        }
        const mapIndex = mapY * columns + mapX;
        if (this.drawing) {
          this.changes.set(mapIndex, tileIndex);
        }
        const pixelX = worldX * this.activeTile.tileWidth;
        const pixelY = worldY * this.activeTile.tileHeight;
        drawTilePreview(
          pixelX,
          pixelY,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          tile.pixels
        );
      }
    }
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
    this.activeMap = ensureActiveMap(this.activeTile.tileSetId, true);
    if (!this.activeMap) {
      return;
    }
    const pixelPoint = toPixelPoint(cursor);
    const worldPoint = this.toWorldTilePoint(pixelPoint);
    if (!worldPoint) {
      return;
    }
    this.seed = Date.now() & 0xffffffff;
    this.applyTileArea(worldPoint, worldPoint);
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
    const worldPoint = this.toWorldTilePoint(pixelPoint);
    if (!worldPoint) {
      return;
    }
    this.seed = Date.now() & 0xffffffff;
    this.startWorldPoint = worldPoint;
    this.lastWorldPoint = worldPoint;
    this.applyTileArea(worldPoint, worldPoint);
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
    const nextWorldPoint = this.toWorldTilePoint(nextPixelPoint);
    if (!nextWorldPoint) {
      return;
    }

    this.lastWorldPoint = nextWorldPoint;
    if (this.startWorldPoint) {
      const preview = usePreviewStore.getState();
      preview.clear();
      this.changes.clear();
      this.applyTileArea(this.startWorldPoint, nextWorldPoint);
    }
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
    this.lastWorldPoint = null;
    this.startWorldPoint = null;
  };

  onCancel = () => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.drawing = false;
    this.changes.clear();
    this.lastWorldPoint = null;
    this.startWorldPoint = null;
  };
}
