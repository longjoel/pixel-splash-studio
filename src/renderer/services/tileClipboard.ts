import { useClipboardStore } from '@/state/clipboardStore';
import { BLOCK_SIZE } from '@/core/canvasStore';
import { PIXEL_SIZE } from '@/core/grid';
import {
  captureTileHistorySnapshot,
  pushTileHistoryBatchIfChanged,
} from '@/state/historyStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useTileMapStore, type TileMapPayload, type TileSetPayload } from '@/state/tileMapStore';
import { useViewportStore } from '@/state/viewportStore';
import { useToolStore } from '@/state/toolStore';

type TileCellBounds = {
  minCol: number;
  minRow: number;
  maxCol: number;
  maxRow: number;
};

type SelectedMapTiles = {
  map: TileMapPayload;
  tiles: number[];
  cols: number;
  rows: number;
  bounds: TileCellBounds;
};

const getActiveTileSet = (): TileSetPayload | null => {
  const tileStore = useTileMapStore.getState();
  return tileStore.tileSets.find((set) => set.id === tileStore.activeTileSetId) ?? null;
};

const getActiveTileMapForSet = (tileSetId: string): TileMapPayload | null => {
  const tileStore = useTileMapStore.getState();
  const active = tileStore.tileMaps.find(
    (map) => map.id === tileStore.activeTileMapId && map.tileSetId === tileSetId
  );
  if (active) {
    return active;
  }
  return tileStore.tileMaps.find((map) => map.tileSetId === tileSetId) ?? null;
};

const collectSelectedMapTiles = (tileSet: TileSetPayload): SelectedMapTiles | null => {
  const map = getActiveTileMapForSet(tileSet.id);
  if (!map) {
    return null;
  }
  const selection = useSelectionStore.getState();
  if (selection.selectedCount <= 0) {
    return null;
  }

  const selectedCells = new Set<string>();
  let minCol = Number.POSITIVE_INFINITY;
  let minRow = Number.POSITIVE_INFINITY;
  let maxCol = Number.NEGATIVE_INFINITY;
  let maxRow = Number.NEGATIVE_INFINITY;

  const blocks = selection.store.getBlocks();
  for (const { row, col, block } of blocks) {
    const baseX = col * BLOCK_SIZE;
    const baseY = row * BLOCK_SIZE;
    for (let y = 0; y < BLOCK_SIZE; y += 1) {
      for (let x = 0; x < BLOCK_SIZE; x += 1) {
        if (block[y * BLOCK_SIZE + x] !== 1) {
          continue;
        }
        const worldX = baseX + x;
        const worldY = baseY + y;
        const mapCol = Math.floor((worldX - map.originX) / tileSet.tileWidth);
        const mapRow = Math.floor((worldY - map.originY) / tileSet.tileHeight);
        if (mapCol < 0 || mapRow < 0 || mapCol >= map.columns || mapRow >= map.rows) {
          continue;
        }
        const key = `${mapCol}:${mapRow}`;
        if (selectedCells.has(key)) {
          continue;
        }
        selectedCells.add(key);
        minCol = Math.min(minCol, mapCol);
        minRow = Math.min(minRow, mapRow);
        maxCol = Math.max(maxCol, mapCol);
        maxRow = Math.max(maxRow, mapRow);
      }
    }
  }

  if (selectedCells.size === 0) {
    return null;
  }

  const cols = maxCol - minCol + 1;
  const rows = maxRow - minRow + 1;
  const tiles = new Array(cols * rows).fill(-1);
  for (const key of selectedCells) {
    const [colText, rowText] = key.split(':');
    const col = Number(colText);
    const row = Number(rowText);
    const offset = (row - minRow) * cols + (col - minCol);
    tiles[offset] = map.tiles[row * map.columns + col] ?? -1;
  }

  return {
    map,
    tiles,
    cols,
    rows,
    bounds: { minCol, minRow, maxCol, maxRow },
  };
};

const copyPaletteTiles = (tileSet: TileSetPayload): boolean => {
  const tileStore = useTileMapStore.getState();
  const cols = Math.max(1, tileStore.selectedTileCols);
  const rows = Math.max(1, tileStore.selectedTileRows);
  const size = cols * rows;
  const grid = new Array(size).fill(-1);
  for (let index = 0; index < size; index += 1) {
    grid[index] = tileStore.selectedTileIndices[index] ?? -1;
  }
  if (!grid.some((value) => value >= 0)) {
    return false;
  }
  useClipboardStore.getState().setTileBuffer({
    tileSetId: tileSet.id,
    tiles: grid,
    cols,
    rows,
    source: 'palette',
  });
  useSelectionStore.getState().clear();
  useToolStore.getState().setActiveTool('tile-stamp');
  return true;
};

export const copyTilesToClipboard = (): boolean => {
  const tileSet = getActiveTileSet();
  if (!tileSet) {
    return false;
  }

  const mapSelection = collectSelectedMapTiles(tileSet);
  if (mapSelection) {
    useClipboardStore.getState().setTileBuffer({
      tileSetId: tileSet.id,
      tiles: mapSelection.tiles,
      cols: mapSelection.cols,
      rows: mapSelection.rows,
      source: 'map',
    });
    useSelectionStore.getState().clear();
    useToolStore.getState().setActiveTool('tile-stamp');
    return true;
  }

  return copyPaletteTiles(tileSet);
};

export const cutTilesToClipboard = (): boolean => {
  const tileSet = getActiveTileSet();
  if (!tileSet) {
    return false;
  }

  const mapSelection = collectSelectedMapTiles(tileSet);
  if (mapSelection) {
    useClipboardStore.getState().setTileBuffer({
      tileSetId: tileSet.id,
      tiles: mapSelection.tiles,
      cols: mapSelection.cols,
      rows: mapSelection.rows,
      source: 'map',
    });
    const updates: Array<{ index: number; tile: number }> = [];
    for (let row = mapSelection.bounds.minRow; row <= mapSelection.bounds.maxRow; row += 1) {
      for (let col = mapSelection.bounds.minCol; col <= mapSelection.bounds.maxCol; col += 1) {
        const sourceOffset =
          (row - mapSelection.bounds.minRow) * mapSelection.cols + (col - mapSelection.bounds.minCol);
        const current = mapSelection.tiles[sourceOffset] ?? -1;
        if (current === -1) {
          continue;
        }
        updates.push({ index: row * mapSelection.map.columns + col, tile: -1 });
      }
    }
    if (updates.length > 0) {
      const before = captureTileHistorySnapshot();
      useTileMapStore.getState().setTileMapTiles(mapSelection.map.id, updates);
      const after = captureTileHistorySnapshot();
      pushTileHistoryBatchIfChanged(before, after);
    }
    useSelectionStore.getState().clear();
    useToolStore.getState().setActiveTool('tile-stamp');
    return true;
  }

  const copiedPalette = copyPaletteTiles(tileSet);
  if (!copiedPalette) {
    return false;
  }

  const selected = Array.from(
    new Set(useTileMapStore.getState().selectedTileIndices.filter((index) => index >= 0))
  ).sort((a, b) => a - b);
  if (selected.length === 0) {
    return false;
  }
  const before = captureTileHistorySnapshot();
  useTileMapStore.getState().deleteTilesFromSet(tileSet.id, selected);
  const after = captureTileHistorySnapshot();
  pushTileHistoryBatchIfChanged(before, after);
  return true;
};

export const pasteTilesFromClipboard = (): boolean => {
  const clipboard = useClipboardStore.getState();
  const buffer = clipboard.tileBuffer;
  if (!buffer || buffer.cols <= 0 || buffer.rows <= 0 || buffer.tiles.length === 0) {
    return false;
  }

  const tileStore = useTileMapStore.getState();
  const tileSet = tileStore.tileSets.find((set) => set.id === buffer.tileSetId);
  if (!tileSet) {
    return false;
  }

  if (tileStore.activeTileSetId !== tileSet.id) {
    tileStore.setActiveTileSet(tileSet.id);
  }
  const activeMap = getActiveTileMapForSet(tileSet.id);
  if (!activeMap) {
    return false;
  }

  const mapSelection = collectSelectedMapTiles(tileSet);
  let targetCol = mapSelection?.bounds.minCol;
  let targetRow = mapSelection?.bounds.minRow;
  if (typeof targetCol !== 'number' || typeof targetRow !== 'number') {
    const viewport = useViewportStore.getState();
    const centerCanvasX = viewport.camera.x + viewport.width / Math.max(1, viewport.camera.zoom) / 2;
    const centerCanvasY = viewport.camera.y + viewport.height / Math.max(1, viewport.camera.zoom) / 2;
    const centerPixelX = Math.floor(centerCanvasX / PIXEL_SIZE);
    const centerPixelY = Math.floor(centerCanvasY / PIXEL_SIZE);
    targetCol = Math.floor((centerPixelX - activeMap.originX) / tileSet.tileWidth);
    targetRow = Math.floor((centerPixelY - activeMap.originY) / tileSet.tileHeight);
  }

  const targetWorldX = activeMap.originX + targetCol * tileSet.tileWidth;
  const targetWorldY = activeMap.originY + targetRow * tileSet.tileHeight;

  const before = captureTileHistorySnapshot();
  const expanded =
    tileStore.expandTileMapToInclude(
      activeMap.id,
      targetCol,
      targetCol + buffer.cols - 1,
      targetRow,
      targetRow + buffer.rows - 1,
      tileSet.tileWidth,
      tileSet.tileHeight
    ) ?? getActiveTileMapForSet(tileSet.id);
  if (!expanded) {
    return false;
  }

  const anchorCol = Math.round((targetWorldX - expanded.originX) / tileSet.tileWidth);
  const anchorRow = Math.round((targetWorldY - expanded.originY) / tileSet.tileHeight);
  const updates: Array<{ index: number; tile: number }> = [];

  for (let row = 0; row < buffer.rows; row += 1) {
    for (let col = 0; col < buffer.cols; col += 1) {
      const mapCol = anchorCol + col;
      const mapRow = anchorRow + row;
      if (mapCol < 0 || mapRow < 0 || mapCol >= expanded.columns || mapRow >= expanded.rows) {
        continue;
      }
      const tile = buffer.tiles[row * buffer.cols + col] ?? -1;
      updates.push({ index: mapRow * expanded.columns + mapCol, tile });
    }
  }

  if (updates.length === 0) {
    return false;
  }

  tileStore.setTileMapTiles(expanded.id, updates);
  const after = captureTileHistorySnapshot();
  pushTileHistoryBatchIfChanged(before, after);
  return true;
};
