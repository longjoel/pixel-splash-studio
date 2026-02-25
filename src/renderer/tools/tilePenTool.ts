import type { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePreviewStore } from '@/state/previewStore';
import { useTileMapStore, type TilePlacementMode } from '@/state/tileMapStore';
import {
  captureTileHistorySnapshot,
  pushTileHistoryBatchIfChanged,
  type TileHistorySnapshot,
} from '@/state/historyStore';
import { TilePlacementResolver } from '@/tools/tilePlacementResolver';

const DEFAULT_TILE_MAP_SIZE = 32;

type TilePoint = { x: number; y: number };

type ActiveTileContext = {
  tileSetId: string;
  tileWidth: number;
  tileHeight: number;
  tilePixels: number[];
  tileIndex: number;
  placementMode: TilePlacementMode;
  snapToCluster: boolean;
  selectionIndices: number[];
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
  tiles: number[];
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
    placementMode: tileStore.tilePlacementMode,
    snapToCluster: tileStore.tilePenSnapToCluster,
    selectionIndices: tileStore.selectedTileIndices,
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
      tiles: existing.tiles,
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
      tiles: fallback.tiles,
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
  return { tileMapId, originX, originY, columns: size, rows: size, tiles };
};

export class TilePenTool implements Tool {
  id = 'tile-pen';
  private drawing = false;
  private changes = new Map<number, number>();
  private lastWorldPoint: TilePoint | null = null;
  private activeMap: ActiveMapContext | null = null;
  private activeTile: ActiveTileContext | null = null;
  private placementResolver: TilePlacementResolver | null = null;
  private erasing = false;
  private historyBefore: TileHistorySnapshot | null = null;

  private getCurrentTileIndex(mapIndex: number): number {
    const changed = this.changes.get(mapIndex);
    if (typeof changed === 'number') {
      return changed;
    }
    return this.activeMap?.tiles[mapIndex] ?? -1;
  }

  private resolvePlacedTileIndex(sourceTileIndex: number, mapIndex: number): number {
    if (!this.activeTile || !this.placementResolver || sourceTileIndex < 0) {
      return sourceTileIndex;
    }
    return this.placementResolver.resolve(
      this.activeTile.placementMode,
      sourceTileIndex,
      this.getCurrentTileIndex(mapIndex)
    );
  }

  private getTilePixels(tileIndex: number): number[] | null {
    if (tileIndex < 0) {
      return null;
    }
    return this.placementResolver?.getTilePixels(tileIndex) ?? null;
  }

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

  private snapWorldPointToCluster(worldPoint: TilePoint): TilePoint {
    if (!this.activeTile || !this.activeTile.snapToCluster) {
      return worldPoint;
    }
    const stepX = Math.max(1, this.activeTile.selectionCols);
    const stepY = Math.max(1, this.activeTile.selectionRows);
    return {
      x: Math.floor(worldPoint.x / stepX) * stepX,
      y: Math.floor(worldPoint.y / stepY) * stepY,
    };
  }

  private drawSnappedLine(startWorldPoint: TilePoint, endWorldPoint: TilePoint) {
    if (!this.activeTile) {
      return;
    }
    const stepX = Math.max(1, this.activeTile.selectionCols);
    const stepY = Math.max(1, this.activeTile.selectionRows);
    let x = Math.floor(startWorldPoint.x / stepX);
    let y = Math.floor(startWorldPoint.y / stepY);
    const targetX = Math.floor(endWorldPoint.x / stepX);
    const targetY = Math.floor(endWorldPoint.y / stepY);
    const dx = Math.abs(targetX - x);
    const dy = Math.abs(targetY - y);
    const sx = x < targetX ? 1 : -1;
    const sy = y < targetY ? 1 : -1;
    let err = dx - dy;

    while (true) {
      this.applyTile({ x: x * stepX, y: y * stepY });
      if (x === targetX && y === targetY) {
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
        tiles: expanded.tiles,
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

  private applyTile(worldPoint: TilePoint) {
    if (!this.activeTile || !this.activeMap) {
      return;
    }
    const adjustedPoint = this.ensureMapBounds(worldPoint);
    if (!adjustedPoint) {
      return;
    }
    const { columns, rows } = this.activeMap;
    if (
      adjustedPoint.x < 0 ||
      adjustedPoint.y < 0 ||
      adjustedPoint.x >= columns ||
      adjustedPoint.y >= rows
    ) {
      return;
    }
    const selectionCols = this.activeTile.selectionCols;
    const selectionRows = this.activeTile.selectionRows;
    const selectionIndices = this.activeTile.selectionIndices;

    for (let rowOffset = 0; rowOffset < selectionRows; rowOffset += 1) {
      for (let colOffset = 0; colOffset < selectionCols; colOffset += 1) {
        const mapX = adjustedPoint.x + colOffset;
        const mapY = adjustedPoint.y + rowOffset;
        if (mapX < 0 || mapY < 0 || mapX >= columns || mapY >= rows) {
          continue;
        }
        const mapIndex = mapY * columns + mapX;
        const selectionIndex = rowOffset * selectionCols + colOffset;
        const selectedTileIndex = selectionIndices[selectionIndex] ?? -1;
        const placedTileIndex = this.erasing
          ? -1
          : this.resolvePlacedTileIndex(selectedTileIndex, mapIndex);
        if (this.drawing) {
          this.changes.set(mapIndex, placedTileIndex);
        }
        if (this.erasing) {
          continue;
        }
        const tilePixels = this.getTilePixels(placedTileIndex);
        if (!tilePixels) {
          continue;
        }
        const worldX = worldPoint.x + colOffset;
        const worldY = worldPoint.y + rowOffset;
        const pixelX = worldX * this.activeTile.tileWidth;
        const pixelY = worldY * this.activeTile.tileHeight;
        drawTilePreview(
          pixelX,
          pixelY,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          tilePixels
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
    this.placementResolver = new TilePlacementResolver(this.activeTile.tileSetTiles);
    this.activeMap = ensureActiveMap(this.activeTile.tileSetId, true);
    if (!this.activeMap) {
      return;
    }
    const pixelPoint = toPixelPoint(cursor);
    const worldPoint = this.toWorldTilePoint(pixelPoint);
    if (!worldPoint) {
      return;
    }
    this.applyTile(this.snapWorldPointToCluster(worldPoint));
  };

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.drawing = true;
    this.changes.clear();
    this.erasing = cursor.alt;
    this.activeTile = getActiveTileContext();
    if (!this.activeTile) {
      this.drawing = false;
      return;
    }
    this.historyBefore = captureTileHistorySnapshot();
    this.placementResolver = new TilePlacementResolver(this.activeTile.tileSetTiles);
    this.activeMap = ensureActiveMap(this.activeTile.tileSetId, true);
    if (!this.activeMap) {
      this.drawing = false;
      this.historyBefore = null;
      return;
    }
    const pixelPoint = toPixelPoint(cursor);
    const worldPoint = this.toWorldTilePoint(pixelPoint);
    if (!worldPoint) {
      return;
    }
    const snappedWorldPoint = this.snapWorldPointToCluster(worldPoint);
    this.applyTile(snappedWorldPoint);
    this.lastWorldPoint = snappedWorldPoint;
  };

  onMove = (cursor: CursorState) => {
    if (!this.drawing) {
      this.onHover(cursor);
      return;
    }
    if (!this.activeTile || !this.activeMap) {
      return;
    }
    this.erasing = cursor.alt;
    const nextPixelPoint = toPixelPoint(cursor);
    const nextWorldPoint = this.toWorldTilePoint(nextPixelPoint);
    if (!nextWorldPoint) {
      return;
    }
    const snappedNextWorldPoint = this.snapWorldPointToCluster(nextWorldPoint);

    if (this.lastWorldPoint) {
      if (this.activeTile.snapToCluster) {
        this.drawSnappedLine(this.lastWorldPoint, snappedNextWorldPoint);
      } else {
        let x = this.lastWorldPoint.x;
        let y = this.lastWorldPoint.y;
        const dx = Math.abs(snappedNextWorldPoint.x - this.lastWorldPoint.x);
        const dy = Math.abs(snappedNextWorldPoint.y - this.lastWorldPoint.y);
        const sx = this.lastWorldPoint.x < snappedNextWorldPoint.x ? 1 : -1;
        const sy = this.lastWorldPoint.y < snappedNextWorldPoint.y ? 1 : -1;
        let err = dx - dy;

        while (true) {
          this.applyTile({ x, y });
          if (x === snappedNextWorldPoint.x && y === snappedNextWorldPoint.y) {
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
    } else {
      this.applyTile(snappedNextWorldPoint);
    }

    this.lastWorldPoint = snappedNextWorldPoint;
  };

  onEnd = () => {
    if (!this.drawing || !this.activeMap || !this.activeTile) {
      return;
    }
    if (this.placementResolver) {
      const pendingTiles = this.placementResolver.getPendingTiles();
      if (pendingTiles.length > 0) {
        useTileMapStore.getState().appendTilesToSet(this.activeTile.tileSetId, pendingTiles);
      }
    }
    const updates = Array.from(this.changes.entries()).map(([index, tile]) => ({
      index,
      tile,
    }));
    useTileMapStore.getState().setTileMapTiles(this.activeMap.tileMapId, updates);
    if (this.historyBefore) {
      const after = captureTileHistorySnapshot();
      pushTileHistoryBatchIfChanged(this.historyBefore, after);
    }
    const preview = usePreviewStore.getState();
    preview.clear();
    this.drawing = false;
    this.changes.clear();
    this.lastWorldPoint = null;
    this.placementResolver = null;
    this.erasing = false;
    this.historyBefore = null;
  };

  onCancel = () => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.drawing = false;
    this.changes.clear();
    this.lastWorldPoint = null;
    this.placementResolver = null;
    this.erasing = false;
    this.historyBefore = null;
  };
}
