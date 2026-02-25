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

type NineSlice = {
  tileSetId: string;
  tiles: number[];
};

type ActiveTileContext = {
  tileSetId: string;
  tileWidth: number;
  tileHeight: number;
  placementMode: TilePlacementMode;
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
  return {
    tileSetId: tileSet.id,
    tileWidth: tileSet.tileWidth,
    tileHeight: tileSet.tileHeight,
    placementMode: tileStore.tilePlacementMode,
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

export class TileNineSliceTool implements Tool {
  id = 'tile-9slice';
  private drawing = false;
  private sampling = false;
  private changes = new Map<number, number>();
  private startWorldPoint: TilePoint | null = null;
  private lastWorldPoint: TilePoint | null = null;
  private activeMap: ActiveMapContext | null = null;
  private activeTile: ActiveTileContext | null = null;
  private placementResolver: TilePlacementResolver | null = null;
  private historyBefore: TileHistorySnapshot | null = null;

  private resetPlacementResolver() {
    if (!this.activeTile) {
      this.placementResolver = null;
      return;
    }
    this.placementResolver = new TilePlacementResolver(this.activeTile.tileSetTiles);
  }

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

  private ensureMapBounds(worldStart: TilePoint, worldEnd: TilePoint) {
    if (!this.activeTile || !this.activeMap) {
      return null;
    }
    const minX = Math.min(worldStart.x, worldEnd.x);
    const minY = Math.min(worldStart.y, worldEnd.y);
    const maxX = Math.max(worldStart.x, worldEnd.x);
    const maxY = Math.max(worldStart.y, worldEnd.y);
    const mapPoint = this.toMapPoint({ x: minX, y: minY });
    if (!mapPoint) {
      return null;
    }
    const tileStore = useTileMapStore.getState();
    const expanded = tileStore.expandTileMapToInclude(
      this.activeMap.tileMapId,
      mapPoint.x,
      mapPoint.x + (maxX - minX),
      mapPoint.y,
      mapPoint.y + (maxY - minY),
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
    }
    return this.toMapPoint({ x: minX, y: minY });
  }

  private readNineSlice(worldPoint: TilePoint): NineSlice | null {
    if (!this.activeTile || !this.activeMap) {
      return null;
    }
    const mapPoint = this.toMapPoint(worldPoint);
    if (!mapPoint) {
      return null;
    }
    const tileStore = useTileMapStore.getState();
    const tileMap = tileStore.tileMaps.find(
      (map) => map.id === this.activeMap?.tileMapId
    );
    if (!tileMap) {
      return null;
    }
    const { columns, rows, tiles } = tileMap;
    const tilesOut: number[] = [];
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        const mapX = mapPoint.x + col;
        const mapY = mapPoint.y + row;
        if (mapX < 0 || mapY < 0 || mapX >= columns || mapY >= rows) {
          tilesOut.push(-1);
          continue;
        }
        const index = mapY * columns + mapX;
        const tileIndex = tiles[index] ?? -1;
        tilesOut.push(tileIndex);
      }
    }
    return { tileSetId: this.activeTile.tileSetId, tiles: tilesOut };
  }

  private readNineSliceFromSelection(): NineSlice | null {
    const tileStore = useTileMapStore.getState();
    const { selectedTileCols, selectedTileRows, selectedTileIndices } = tileStore;
    if (selectedTileCols !== 3 || selectedTileRows !== 3) {
      return null;
    }
    if (selectedTileIndices.length < 9) {
      return null;
    }
    const tiles = selectedTileIndices.slice(0, 9);
    if (tiles.some((index) => index < 0)) {
      return null;
    }
    if (!this.activeTile) {
      return null;
    }
    return { tileSetId: this.activeTile.tileSetId, tiles };
  }

  private drawSamplePreview(worldPoint: TilePoint) {
    if (!this.activeTile || !this.activeMap) {
      return;
    }
    const mapPoint = this.toMapPoint(worldPoint);
    if (!mapPoint) {
      return;
    }
    const tileStore = useTileMapStore.getState();
    const tileMap = tileStore.tileMaps.find(
      (map) => map.id === this.activeMap?.tileMapId
    );
    if (!tileMap) {
      return;
    }
    const { columns, rows, tiles } = tileMap;
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        const mapX = mapPoint.x + col;
        const mapY = mapPoint.y + row;
        if (mapX < 0 || mapY < 0 || mapX >= columns || mapY >= rows) {
          continue;
        }
        const index = mapY * columns + mapX;
        const tileIndex = tiles[index] ?? -1;
        if (tileIndex < 0 || tileIndex >= this.activeTile.tileSetTiles.length) {
          continue;
        }
        const tile = this.activeTile.tileSetTiles[tileIndex];
        const worldX = worldPoint.x + col;
        const worldY = worldPoint.y + row;
        drawTilePreview(
          worldX * this.activeTile.tileWidth,
          worldY * this.activeTile.tileHeight,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          tile.pixels
        );
      }
    }
  }

  private applyNineSlice(worldStart: TilePoint, worldEnd: TilePoint) {
    if (!this.activeTile || !this.activeMap) {
      return;
    }
    const tileStore = useTileMapStore.getState();
    const nineSlice = tileStore.nineSlice;
    if (!nineSlice || nineSlice.tileSetId !== this.activeTile.tileSetId) {
      return;
    }
    const minX = Math.min(worldStart.x, worldEnd.x);
    const maxX = Math.max(worldStart.x, worldEnd.x);
    const minY = Math.min(worldStart.y, worldEnd.y);
    const maxY = Math.max(worldStart.y, worldEnd.y);

    const adjustedPoint = this.ensureMapBounds({ x: minX, y: minY }, { x: maxX, y: maxY });
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
        const isTop = worldY === minY;
        const isBottom = worldY === maxY;
        const isLeft = worldX === minX;
        const isRight = worldX === maxX;
        let sliceIndex = 4;
        if (isTop && isLeft) {
          sliceIndex = 0;
        } else if (isTop && isRight) {
          sliceIndex = 2;
        } else if (isBottom && isLeft) {
          sliceIndex = 6;
        } else if (isBottom && isRight) {
          sliceIndex = 8;
        } else if (isTop) {
          sliceIndex = 1;
        } else if (isBottom) {
          sliceIndex = 7;
        } else if (isLeft) {
          sliceIndex = 3;
        } else if (isRight) {
          sliceIndex = 5;
        }
        const tileIndex = nineSlice.tiles[sliceIndex] ?? -1;
        if (tileIndex < 0 || tileIndex >= this.activeTile.tileSetTiles.length) {
          continue;
        }
        const mapIndex = mapY * columns + mapX;
        const placedTileIndex = this.resolvePlacedTileIndex(tileIndex, mapIndex);
        if (this.drawing) {
          this.changes.set(mapIndex, placedTileIndex);
        }
        const tilePixels = this.getTilePixels(placedTileIndex);
        if (!tilePixels) {
          continue;
        }
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
    this.resetPlacementResolver();
    this.activeMap = ensureActiveMap(this.activeTile.tileSetId, true);
    if (!this.activeMap) {
      return;
    }
    const tileStore = useTileMapStore.getState();
    if (!tileStore.nineSlice) {
      const fallback = this.readNineSliceFromSelection();
      if (fallback) {
        tileStore.setNineSlice(fallback);
      } else {
        return;
      }
    }
    const pixelPoint = toPixelPoint(cursor);
    const worldPoint = this.toWorldTilePoint(pixelPoint);
    if (!worldPoint) {
      return;
    }
    this.applyNineSlice(worldPoint, worldPoint);
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
    this.historyBefore = captureTileHistorySnapshot();
    this.resetPlacementResolver();
    this.activeMap = ensureActiveMap(this.activeTile.tileSetId, true);
    if (!this.activeMap) {
      this.drawing = false;
      this.historyBefore = null;
      return;
    }

    const tileStore = useTileMapStore.getState();
    const needsSample = !tileStore.nineSlice || cursor.ctrl;
    this.sampling = needsSample;

    const pixelPoint = toPixelPoint(cursor);
    const worldPoint = this.toWorldTilePoint(pixelPoint);
    if (!worldPoint) {
      return;
    }
    this.startWorldPoint = worldPoint;
    this.lastWorldPoint = worldPoint;

    if (!this.sampling) {
      if (!tileStore.nineSlice) {
        const fallback = this.readNineSliceFromSelection();
        if (fallback) {
          tileStore.setNineSlice(fallback);
        }
      }
      this.applyNineSlice(worldPoint, worldPoint);
    }
  };

  onMove = (cursor: CursorState) => {
    if (!this.drawing) {
      this.onHover(cursor);
      return;
    }
    if (!this.activeTile || !this.activeMap || !this.startWorldPoint) {
      return;
    }
    const nextPixelPoint = toPixelPoint(cursor);
    const nextWorldPoint = this.toWorldTilePoint(nextPixelPoint);
    if (!nextWorldPoint) {
      return;
    }

    this.lastWorldPoint = nextWorldPoint;
    const preview = usePreviewStore.getState();
    preview.clear();

    if (!this.sampling) {
      this.changes.clear();
      this.resetPlacementResolver();
      this.applyNineSlice(this.startWorldPoint, nextWorldPoint);
      return;
    }

    const minX = Math.min(this.startWorldPoint.x, nextWorldPoint.x);
    const minY = Math.min(this.startWorldPoint.y, nextWorldPoint.y);
    this.drawSamplePreview({ x: minX, y: minY });
  };

  onEnd = () => {
    if (!this.drawing || !this.activeMap || !this.activeTile) {
      return;
    }
    const tileStore = useTileMapStore.getState();
    if (this.sampling && this.startWorldPoint && this.lastWorldPoint) {
      const minX = Math.min(this.startWorldPoint.x, this.lastWorldPoint.x);
      const minY = Math.min(this.startWorldPoint.y, this.lastWorldPoint.y);
      const nineSlice = this.readNineSlice({ x: minX, y: minY });
      if (nineSlice) {
        tileStore.setNineSlice(nineSlice);
      }
    } else if (this.changes.size > 0) {
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
    }
    if (this.historyBefore) {
      const after = captureTileHistorySnapshot();
      pushTileHistoryBatchIfChanged(this.historyBefore, after);
    }
    const preview = usePreviewStore.getState();
    preview.clear();
    this.drawing = false;
    this.sampling = false;
    this.changes.clear();
    this.startWorldPoint = null;
    this.lastWorldPoint = null;
    this.placementResolver = null;
    this.historyBefore = null;
  };

  onCancel = () => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.drawing = false;
    this.sampling = false;
    this.changes.clear();
    this.startWorldPoint = null;
    this.lastWorldPoint = null;
    this.placementResolver = null;
    this.historyBefore = null;
  };
}
