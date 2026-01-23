import React, { useEffect, useRef, useState } from 'react';
import { useViewportStore } from '@/state/viewportStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { usePreviewStore } from '@/state/previewStore';
import { CursorState, ToolController } from '@/core/tools';
import { PenTool } from '@/tools/penTool';
import { SprayTool } from '@/tools/sprayTool';
import { BLOCK_SIZE } from '@/core/canvasStore';
import { PIXEL_SIZE, TILE_SIZE } from '@/core/grid';
import { ensureContrast, getComplement, hexToRgb, toRgba } from '@/core/colorUtils';
import { LineTool } from '@/tools/lineTool';
import { RectangleTool } from '@/tools/rectangleTool';
import { OvalTool } from '@/tools/ovalTool';
import { SelectionRectangleTool } from '@/tools/selectionRectangleTool';
import { SelectionOvalTool } from '@/tools/selectionOvalTool';
import { FillBucketTool } from '@/tools/fillBucketTool';
import { StampTool } from '@/tools/stampTool';
import { EyeDropperTool } from '@/tools/eyeDropperTool';
import { ReferenceHandleTool } from '@/tools/referenceHandleTool';
import { TileSamplerTool } from '@/tools/tileSamplerTool';
import { TilePenTool } from '@/tools/tilePenTool';
import { TileRandomTool } from '@/tools/tileRandomTool';
import { TileExportTool } from '@/tools/tileExportTool';
import { TileNineSliceTool } from '@/tools/tileNineSliceTool';
import { useToolStore } from '@/state/toolStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useReferenceStore } from '@/state/referenceStore';
import { useTileMapStore } from '@/state/tileMapStore';
import { useLayerVisibilityStore } from '@/state/layerVisibilityStore';
import { getBlocksUnderConstruction } from '@/services/largeOperationQueue';
import { addReferencesFromFiles } from '@/services/references';
import {
  getReferenceBounds,
  getReferenceTransform,
  getReferenceWorldCorners,
} from '@/core/referenceTransforms';
import { MIN_TOOL_ZOOM, WHEEL_ZOOM_MAX_STEP, WHEEL_ZOOM_SCALE } from '../../constants';

const drawGrid = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number,
  size: number,
  color: string
) => {
  context.strokeStyle = color;
  context.lineWidth = 1;

  const startX = Math.floor(viewX / size) * size;
  const endX = viewX + viewWidth;
  for (let x = startX; x <= endX; x += size) {
    context.beginPath();
    context.moveTo(x + 0.5, viewY);
    context.lineTo(x + 0.5, viewY + viewHeight);
    context.stroke();
  }

  const startY = Math.floor(viewY / size) * size;
  const endY = viewY + viewHeight;
  for (let y = startY; y <= endY; y += size) {
    context.beginPath();
    context.moveTo(viewX, y + 0.5);
    context.lineTo(viewX + viewWidth, y + 0.5);
    context.stroke();
  }
};

const drawConstructionOverlay = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number,
  fillColor: string,
  strokeColor: string
) => {
  const blocks = getBlocksUnderConstruction();
  if (blocks.length === 0) {
    return;
  }
  context.save();
  context.fillStyle = fillColor;
  context.strokeStyle = strokeColor;
  context.lineWidth = Math.max(1, PIXEL_SIZE * 0.08);

  for (const block of blocks) {
    const left = block.col * BLOCK_SIZE * PIXEL_SIZE;
    const top = block.row * BLOCK_SIZE * PIXEL_SIZE;
    const right = left + BLOCK_SIZE * PIXEL_SIZE;
    const bottom = top + BLOCK_SIZE * PIXEL_SIZE;
    if (
      right < viewX ||
      bottom < viewY ||
      left > viewX + viewWidth ||
      top > viewY + viewHeight
    ) {
      continue;
    }
    context.fillRect(left, top, BLOCK_SIZE * PIXEL_SIZE, BLOCK_SIZE * PIXEL_SIZE);
    context.strokeRect(
      left + 0.5,
      top + 0.5,
      BLOCK_SIZE * PIXEL_SIZE - 1,
      BLOCK_SIZE * PIXEL_SIZE - 1
    );
  }
  context.restore();
};

const drawAxes = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number,
  color: string
) => {
  context.strokeStyle = color;
  context.lineWidth = 2;

  context.beginPath();
  context.moveTo(viewX, 0.5);
  context.lineTo(viewX + viewWidth, 0.5);
  context.stroke();

  context.beginPath();
  context.moveTo(0.5, viewY);
  context.lineTo(0.5, viewY + viewHeight);
  context.stroke();
};

const setupCanvas = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }

  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.imageSmoothingEnabled = false;

  return context;
};

type BlockCacheEntry = {
  canvas: HTMLCanvasElement;
  pixels: number;
};

type SelectionCacheEntry = {
  canvas: HTMLCanvasElement;
};

type TileCacheEntry = {
  canvas: HTMLCanvasElement;
};

const buildBlockCanvas = (block: Uint8Array, palette: string[]) => {
  const canvas = document.createElement('canvas');
  canvas.width = BLOCK_SIZE * PIXEL_SIZE;
  canvas.height = BLOCK_SIZE * PIXEL_SIZE;
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }
  context.imageSmoothingEnabled = false;

  let pixels = 0;
  for (let y = 0; y < BLOCK_SIZE; y += 1) {
    for (let x = 0; x < BLOCK_SIZE; x += 1) {
      const paletteIndex = block[y * BLOCK_SIZE + x];
      if (paletteIndex === 0) {
        continue;
      }
      pixels += 1;
      context.fillStyle = palette[paletteIndex] ?? palette[0];
      context.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }
  }

  return { canvas, pixels };
};

const buildTileCanvas = (
  pixels: number[],
  palette: string[],
  tileWidth: number,
  tileHeight: number
) => {
  const canvas = document.createElement('canvas');
  canvas.width = tileWidth * PIXEL_SIZE;
  canvas.height = tileHeight * PIXEL_SIZE;
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }
  context.imageSmoothingEnabled = false;

  for (let y = 0; y < tileHeight; y += 1) {
    for (let x = 0; x < tileWidth; x += 1) {
      const paletteIndex = pixels[y * tileWidth + x] ?? 0;
      if (paletteIndex === 0) {
        continue;
      }
      context.fillStyle = palette[paletteIndex] ?? palette[0];
      context.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }
  }

  return { canvas };
};

const drawPixelLayers = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number,
  palette: string[],
  blockCache: Map<string, BlockCacheEntry>
) => {
  const pixelStore = usePixelStore.getState();
  let blocksDrawn = 0;
  let pixelsDrawn = 0;
  for (const layer of pixelStore.layers) {
    if (!layer.visible) {
      continue;
    }
    const blocks = layer.store.getBlocks();
    for (const { row, col, block } of blocks) {
      const blockX = col * BLOCK_SIZE;
      const blockY = row * BLOCK_SIZE;
      const blockLeft = blockX * PIXEL_SIZE;
      const blockTop = blockY * PIXEL_SIZE;
      const blockRight = blockLeft + BLOCK_SIZE * PIXEL_SIZE;
      const blockBottom = blockTop + BLOCK_SIZE * PIXEL_SIZE;
      if (
        blockRight < viewX ||
        blockBottom < viewY ||
        blockLeft > viewX + viewWidth ||
        blockTop > viewY + viewHeight
      ) {
        continue;
      }

      blocksDrawn += 1;
      const key = `${layer.id}:${row}:${col}`;
      let cached = blockCache.get(key);
      if (!cached) {
        const rebuilt = buildBlockCanvas(block, palette);
        if (rebuilt) {
          cached = rebuilt;
          blockCache.set(key, rebuilt);
        }
      }

      if (cached) {
        pixelsDrawn += cached.pixels;
        context.drawImage(cached.canvas, blockLeft, blockTop);
      }
    }
  }
  return { blocksDrawn, pixelsDrawn };
};

const buildSelectionCanvas = (block: Uint8Array) => {
  const canvas = document.createElement('canvas');
  canvas.width = BLOCK_SIZE * PIXEL_SIZE;
  canvas.height = BLOCK_SIZE * PIXEL_SIZE;
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }
  context.imageSmoothingEnabled = false;
  context.fillStyle = '#ffffff';

  let hasSelection = false;
  for (let y = 0; y < BLOCK_SIZE; y += 1) {
    for (let x = 0; x < BLOCK_SIZE; x += 1) {
      if (block[y * BLOCK_SIZE + x] === 1) {
        context.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        hasSelection = true;
      }
    }
  }

  if (!hasSelection) {
    return null;
  }

  return { canvas };
};

const drawSelectionLayer = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number,
  cache: Map<string, SelectionCacheEntry>,
  hasSelection: boolean
) => {
  if (!hasSelection) {
    return;
  }

  context.save();
  context.fillStyle = 'rgba(0, 0, 0, 0.25)';
  context.fillRect(viewX, viewY, viewWidth, viewHeight);
  context.globalCompositeOperation = 'destination-out';

  for (const [key, entry] of cache.entries()) {
    const [rowText, colText] = key.split(':');
    const row = Number(rowText);
    const col = Number(colText);
    const blockLeft = col * BLOCK_SIZE * PIXEL_SIZE;
    const blockTop = row * BLOCK_SIZE * PIXEL_SIZE;
    const blockRight = blockLeft + BLOCK_SIZE * PIXEL_SIZE;
    const blockBottom = blockTop + BLOCK_SIZE * PIXEL_SIZE;
    if (
      blockRight < viewX ||
      blockBottom < viewY ||
      blockLeft > viewX + viewWidth ||
      blockTop > viewY + viewHeight
    ) {
      continue;
    }
    context.drawImage(entry.canvas, blockLeft, blockTop);
  }

  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = 0.18;
  context.fillStyle = '#ffffff';
  for (const [key, entry] of cache.entries()) {
    const [rowText, colText] = key.split(':');
    const row = Number(rowText);
    const col = Number(colText);
    const blockLeft = col * BLOCK_SIZE * PIXEL_SIZE;
    const blockTop = row * BLOCK_SIZE * PIXEL_SIZE;
    const blockRight = blockLeft + BLOCK_SIZE * PIXEL_SIZE;
    const blockBottom = blockTop + BLOCK_SIZE * PIXEL_SIZE;
    if (
      blockRight < viewX ||
      blockBottom < viewY ||
      blockLeft > viewX + viewWidth ||
      blockTop > viewY + viewHeight
    ) {
      continue;
    }
    context.drawImage(entry.canvas, blockLeft, blockTop);
  }
  context.restore();
};

const drawSelectionOutline = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number
) => {
  const selection = useSelectionStore.getState();
  if (selection.selectedCount === 0) {
    return;
  }
  context.save();
  context.fillStyle = 'rgba(245, 197, 66, 0.85)';

  const blocks = selection.store.getBlocks();
  for (const { row, col, block } of blocks) {
    const blockX = col * BLOCK_SIZE;
    const blockY = row * BLOCK_SIZE;
    const blockLeft = blockX * PIXEL_SIZE;
    const blockTop = blockY * PIXEL_SIZE;
    const blockRight = blockLeft + BLOCK_SIZE * PIXEL_SIZE;
    const blockBottom = blockTop + BLOCK_SIZE * PIXEL_SIZE;
    if (
      blockRight < viewX ||
      blockBottom < viewY ||
      blockLeft > viewX + viewWidth ||
      blockTop > viewY + viewHeight
    ) {
      continue;
    }

    for (let y = 0; y < BLOCK_SIZE; y += 1) {
      for (let x = 0; x < BLOCK_SIZE; x += 1) {
        if (block[y * BLOCK_SIZE + x] !== 1) {
          continue;
        }
        const worldX = blockX + x;
        const worldY = blockY + y;
        const hasNeighbor =
          selection.isSelected(worldX - 1, worldY) &&
          selection.isSelected(worldX + 1, worldY) &&
          selection.isSelected(worldX, worldY - 1) &&
          selection.isSelected(worldX, worldY + 1);
        if (hasNeighbor) {
          continue;
        }
        if ((worldX + worldY) % 2 !== 0) {
          continue;
        }
        context.fillRect(
          worldX * PIXEL_SIZE,
          worldY * PIXEL_SIZE,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }
    }
  }
  context.restore();
};

const drawTileMapLayer = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number,
  palette: string[],
  cache: Map<string, TileCacheEntry>
) => {
  const { tileSets, tileMaps } = useTileMapStore.getState();
  if (tileSets.length === 0 || tileMaps.length === 0) {
    return;
  }

  const viewLeft = viewX / PIXEL_SIZE;
  const viewTop = viewY / PIXEL_SIZE;
  const viewRight = viewLeft + viewWidth / PIXEL_SIZE;
  const viewBottom = viewTop + viewHeight / PIXEL_SIZE;

  const tileSetMap = new Map(tileSets.map((tileSet) => [tileSet.id, tileSet]));
  for (const tileMap of tileMaps) {
    const tileSet = tileSetMap.get(tileMap.tileSetId);
    if (!tileSet) {
      continue;
    }

    const tileWidth = tileSet.tileWidth;
    const tileHeight = tileSet.tileHeight;
    if (tileWidth <= 0 || tileHeight <= 0) {
      continue;
    }

    const mapWidth = tileMap.columns * tileWidth;
    const mapHeight = tileMap.rows * tileHeight;
    const mapLeft = tileMap.originX;
    const mapTop = tileMap.originY;
    const mapRight = mapLeft + mapWidth;
    const mapBottom = mapTop + mapHeight;

    if (
      mapRight < viewLeft ||
      mapBottom < viewTop ||
      mapLeft > viewRight ||
      mapTop > viewBottom
    ) {
      continue;
    }

    const startCol = Math.max(0, Math.floor((viewLeft - mapLeft) / tileWidth));
    const endCol = Math.min(
      tileMap.columns - 1,
      Math.ceil((viewRight - mapLeft) / tileWidth) - 1
    );
    const startRow = Math.max(0, Math.floor((viewTop - mapTop) / tileHeight));
    const endRow = Math.min(
      tileMap.rows - 1,
      Math.ceil((viewBottom - mapTop) / tileHeight) - 1
    );

    if (endCol < startCol || endRow < startRow) {
      continue;
    }

    for (let row = startRow; row <= endRow; row += 1) {
      for (let col = startCol; col <= endCol; col += 1) {
        const index = row * tileMap.columns + col;
        const tileIndex = tileMap.tiles[index] ?? -1;
        if (tileIndex < 0) {
          continue;
        }
        const tile = tileSet.tiles[tileIndex];
        if (!tile) {
          continue;
        }

        const cacheKey = `${tileSet.id}:${tileIndex}`;
        let cached = cache.get(cacheKey);
        if (!cached) {
          const rebuilt = buildTileCanvas(
            tile.pixels,
            palette,
            tileWidth,
            tileHeight
          );
          if (rebuilt) {
            cached = rebuilt;
            cache.set(cacheKey, rebuilt);
          }
        }

        if (!cached) {
          continue;
        }

        context.drawImage(
          cached.canvas,
          (mapLeft + col * tileWidth) * PIXEL_SIZE,
          (mapTop + row * tileHeight) * PIXEL_SIZE
        );
      }
    }
  }
};

const drawPreviewLayer = (
  context: CanvasRenderingContext2D,
  palette: string[],
  previewColor?: string
) => {
  const preview = usePreviewStore.getState();
  for (const pixel of preview.entries()) {
    context.fillStyle = previewColor ?? palette[pixel.paletteIndex] ?? palette[0];
    context.fillRect(
      pixel.x * PIXEL_SIZE,
      pixel.y * PIXEL_SIZE,
      PIXEL_SIZE,
      PIXEL_SIZE
    );
  }
};

const drawReferenceLayer = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number
) => {
  const references = useReferenceStore.getState().items;
  if (references.length === 0) {
    return;
  }
  for (const reference of references) {
    const bounds = getReferenceBounds(reference);
    if (
      bounds.maxX < viewX ||
      bounds.maxY < viewY ||
      bounds.minX > viewX + viewWidth ||
      bounds.minY > viewY + viewHeight
    ) {
      continue;
    }
    const transform = getReferenceTransform(reference);
    context.save();
    context.globalAlpha = reference.opacity;
    context.translate(transform.centerX, transform.centerY);
    context.rotate(transform.rotationRad);
    context.scale(transform.scale * transform.flipX, transform.scale * transform.flipY);
    context.drawImage(
      reference.image,
      -transform.baseWidth / 2,
      -transform.baseHeight / 2,
      transform.baseWidth,
      transform.baseHeight
    );
    context.restore();
  }
};

const drawReferenceHandles = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number
) => {
  const { items, selectedId } = useReferenceStore.getState();
  if (!selectedId) {
    return;
  }
  const reference = items.find((item) => item.id === selectedId);
  if (!reference) {
    return;
  }
  const bounds = getReferenceBounds(reference);
  if (
    bounds.maxX < viewX ||
    bounds.maxY < viewY ||
    bounds.minX > viewX + viewWidth ||
    bounds.minY > viewY + viewHeight
  ) {
    return;
  }

  const handleSize = PIXEL_SIZE * 0.6;
  const handleHalf = handleSize / 2;
  const corners = getReferenceWorldCorners(reference);
  const handles = Object.values(corners);

  context.save();
  context.strokeStyle = 'rgba(245, 197, 66, 0.85)';
  context.lineWidth = Math.max(1, PIXEL_SIZE * 0.08);
  context.beginPath();
  context.moveTo(corners.nw.x, corners.nw.y);
  context.lineTo(corners.ne.x, corners.ne.y);
  context.lineTo(corners.se.x, corners.se.y);
  context.lineTo(corners.sw.x, corners.sw.y);
  context.closePath();
  context.stroke();
  context.fillStyle = 'rgba(245, 197, 66, 0.9)';
  for (const handle of handles) {
    context.fillRect(handle.x - handleHalf, handle.y - handleHalf, handleSize, handleSize);
  }
  context.restore();
};

const ViewportCanvas = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const controllerRef = useRef<ToolController | null>(null);
  const blockCacheRef = useRef<Map<string, BlockCacheEntry>>(new Map());
  const selectionCacheRef = useRef<Map<string, SelectionCacheEntry>>(new Map());
  const tileCacheRef = useRef<Map<string, TileCacheEntry>>(new Map());
  const lastPerfLogRef = useRef(0);
  const setSize = useViewportStore((state) => state.setSize);
  const zoom = useViewportStore((state) => state.camera.zoom);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{
    screenX: number;
    screenY: number;
    cameraX: number;
    cameraY: number;
    zoom: number;
  } | null>(null);
  const wheelZoomRef = useRef<{
    remainingDelta: number;
    anchor: { x: number; y: number } | null;
    frame: number | null;
  }>({ remainingDelta: 0, anchor: null, frame: null });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) {
      return undefined;
    }

    setSize(wrapper.clientWidth, wrapper.clientHeight);

    controllerRef.current = new ToolController();
    const tools = {
      pen: new PenTool(),
      spray: new SprayTool(),
      line: new LineTool(),
      rectangle: new RectangleTool(),
      oval: new OvalTool(),
      'fill-bucket': new FillBucketTool(),
      eyedropper: new EyeDropperTool(),
      'reference-handle': new ReferenceHandleTool(),
      stamp: new StampTool(),
      'selection-rect': new SelectionRectangleTool(),
      'selection-oval': new SelectionOvalTool(),
      'tile-sampler': new TileSamplerTool(),
      'tile-pen': new TilePenTool(),
      'tile-rectangle': new TileRandomTool(),
      'tile-9slice': new TileNineSliceTool(),
      'tile-export': new TileExportTool(),
    };
    const initialTool = tools[useToolStore.getState().activeTool] ?? tools.pen;
    controllerRef.current.setTool(initialTool);

    const unsubscribeTool = useToolStore.subscribe((state) => {
      controllerRef.current?.setTool(tools[state.activeTool] ?? tools.pen);
    });
    const unsubscribePalette = usePaletteStore.subscribe(() => {
      blockCacheRef.current.clear();
      tileCacheRef.current.clear();
    });
    const unsubscribeSelection = useSelectionStore.subscribe(() => {
      selectionCacheRef.current.clear();
    });
    const unsubscribeTileMaps = useTileMapStore.subscribe(() => {
      tileCacheRef.current.clear();
    });

    const render = () => {
      const frameStart = performance.now();
      const state = useViewportStore.getState();
      if (state.width === 0 || state.height === 0) {
        return;
      }

      const context = setupCanvas(canvas, state.width, state.height);
      if (!context) {
        return;
      }

      const ratio = window.devicePixelRatio || 1;
      context.clearRect(0, 0, state.width, state.height);
      const palette = usePaletteStore.getState().colors;
      const bgHex = palette[0] ?? '#000000';
      const bgRgb = hexToRgb(bgHex) ?? { r: 0, g: 0, b: 0 };
      const accent = ensureContrast(bgRgb, getComplement(bgRgb));
      const gridColor = toRgba(accent, 0.08);
      const tileGridColor = toRgba(accent, 0.18);
      const axisColor = toRgba(accent, 0.5);
      const constructionFill = toRgba(accent, 0.08);
      const constructionStroke = toRgba(accent, 0.35);

      context.fillStyle = bgHex;
      context.fillRect(0, 0, state.width, state.height);

      context.save();
      context.setTransform(
        state.camera.zoom * ratio,
        0,
        0,
        state.camera.zoom * ratio,
        -state.camera.x * state.camera.zoom * ratio,
        -state.camera.y * state.camera.zoom * ratio
      );

      const viewWidth = state.width / state.camera.zoom;
      const viewHeight = state.height / state.camera.zoom;

      const { dirtyAll, blocks: dirtyBlocks } = usePixelStore.getState().consumeDirtyBlocks();
      if (dirtyAll) {
        blockCacheRef.current.clear();
      }
      for (const dirty of dirtyBlocks) {
        const key = `${dirty.layerId}:${dirty.row}:${dirty.col}`;
        const layer = usePixelStore
          .getState()
          .layers.find((candidate) => candidate.id === dirty.layerId);
        const block = layer?.store.getBlock(dirty.row, dirty.col);
        if (!block) {
          blockCacheRef.current.delete(key);
          continue;
        }
        const rebuilt = buildBlockCanvas(block, palette);
        if (rebuilt) {
          blockCacheRef.current.set(key, rebuilt);
        }
      }

      const selectionState = useSelectionStore.getState();
      const selectionDirty = selectionState.consumeDirtyBlocks();
      if (selectionDirty.dirtyAll) {
        selectionCacheRef.current.clear();
      }
      for (const dirty of selectionDirty.blocks) {
        const key = `${dirty.row}:${dirty.col}`;
        const block = selectionState.store.getBlock(dirty.row, dirty.col);
        if (!block) {
          selectionCacheRef.current.delete(key);
          continue;
        }
        const rebuilt = buildSelectionCanvas(block);
        if (rebuilt) {
          selectionCacheRef.current.set(key, rebuilt);
        } else {
          selectionCacheRef.current.delete(key);
        }
      }

      const layers = useLayerVisibilityStore.getState();
      if (layers.showReferenceLayer) {
        drawReferenceLayer(context, state.camera.x, state.camera.y, viewWidth, viewHeight);
      }

      let blocksDrawn = 0;
      let pixelsDrawn = 0;
      if (layers.showPixelLayer) {
        const pixelMetrics = drawPixelLayers(
          context,
          state.camera.x,
          state.camera.y,
          viewWidth,
          viewHeight,
          palette,
          blockCacheRef.current
        );
        blocksDrawn = pixelMetrics.blocksDrawn;
        pixelsDrawn = pixelMetrics.pixelsDrawn;
      }

      if (layers.showTileLayer) {
        drawTileMapLayer(
          context,
          state.camera.x,
          state.camera.y,
          viewWidth,
          viewHeight,
          palette,
          tileCacheRef.current
        );
      }
      drawConstructionOverlay(
        context,
        state.camera.x,
        state.camera.y,
        viewWidth,
        viewHeight,
        constructionFill,
        constructionStroke
      );
      drawSelectionLayer(
        context,
        state.camera.x,
        state.camera.y,
        viewWidth,
        viewHeight,
        selectionCacheRef.current,
        selectionState.selectedCount > 0
      );
      drawSelectionOutline(
        context,
        state.camera.x,
        state.camera.y,
        viewWidth,
        viewHeight
      );
      if (layers.showTileLayer && useTileMapStore.getState().tileDebugOverlay) {
        drawTileDebugOverlay(
          context,
          state.camera.x,
          state.camera.y,
          viewWidth,
          viewHeight
        );
      }
      drawGrid(
        context,
        state.camera.x,
        state.camera.y,
        viewWidth,
        viewHeight,
        PIXEL_SIZE,
        gridColor
      );
      drawGrid(
        context,
        state.camera.x,
        state.camera.y,
        viewWidth,
        viewHeight,
        PIXEL_SIZE * TILE_SIZE,
        tileGridColor
      );

      drawAxes(context, state.camera.x, state.camera.y, viewWidth, viewHeight, axisColor);
      const activeTool = useToolStore.getState().activeTool;
      const previewColor =
        activeTool === 'selection-rect' ||
        activeTool === 'selection-oval' ||
        activeTool === 'tile-sampler'
          ? 'rgba(245, 197, 66, 0.35)'
          : undefined;
      drawPreviewLayer(context, palette, previewColor);
      if (activeTool === 'reference-handle') {
        drawReferenceHandles(
          context,
          state.camera.x,
          state.camera.y,
          viewWidth,
          viewHeight
        );
      }
      context.restore();

      const frameEnd = performance.now();
      const duration = frameEnd - frameStart;
      if (duration > 50 && frameEnd - lastPerfLogRef.current > 500) {
        lastPerfLogRef.current = frameEnd;
        window.debugApi?.logPerf(
          [
            'viewport:render',
            `ms=${duration.toFixed(2)}`,
            `zoom=${state.camera.zoom.toFixed(2)}`,
            `view=${viewWidth.toFixed(1)}x${viewHeight.toFixed(1)}`,
            `blocks=${blocksDrawn}`,
            `pixels=${pixelsDrawn}`,
          ].join(' ')
        );
      }

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize(entry.contentRect.width, entry.contentRect.height);
      }
    });

    resizeObserver.observe(wrapper);

    return () => {
      unsubscribeTool();
      unsubscribePalette();
      unsubscribeSelection();
      unsubscribeTileMaps();
      resizeObserver.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (wheelZoomRef.current.frame) {
        cancelAnimationFrame(wheelZoomRef.current.frame);
        wheelZoomRef.current.frame = null;
      }
    };
  }, []);

  const toCursorState = (event: React.PointerEvent): CursorState => {
    const rect = event.currentTarget.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    const state = useViewportStore.getState();
    return {
      screenX,
      screenY,
      canvasX: screenX / state.camera.zoom + state.camera.x,
      canvasY: screenY / state.camera.zoom + state.camera.y,
      primary: (event.buttons & 1) === 1,
      secondary: (event.buttons & 2) === 2,
      alt: event.altKey,
      ctrl: event.ctrlKey,
      shift: event.shiftKey,
    };
  };

  const startPan = (event: React.PointerEvent) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const state = useViewportStore.getState();
    panStartRef.current = {
      screenX: event.clientX,
      screenY: event.clientY,
      cameraX: state.camera.x,
      cameraY: state.camera.y,
      zoom: state.camera.zoom,
    };
    setIsPanning(true);
    usePreviewStore.getState().clear();
  };

  const updatePan = (event: React.PointerEvent) => {
    const panStart = panStartRef.current;
    if (!panStart) {
      return;
    }
    const dx = event.clientX - panStart.screenX;
    const dy = event.clientY - panStart.screenY;
    const nextX = panStart.cameraX - dx / panStart.zoom;
    const nextY = panStart.cameraY - dy / panStart.zoom;
    useViewportStore.getState().panTo(nextX, nextY);
  };

  const stopPan = (event: React.PointerEvent) => {
    panStartRef.current = null;
    setIsPanning(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    if (event.button === 1) {
      startPan(event);
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    const cursor = toCursorState(event);
    controllerRef.current?.handleEvent('begin', cursor);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (panStartRef.current) {
      updatePan(event);
      return;
    }
    const cursor = toCursorState(event);
    const isDrawing = (event.buttons & 1) === 1 || (event.buttons & 2) === 2;
    controllerRef.current?.handleEvent(isDrawing ? 'move' : 'hover', cursor);
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (panStartRef.current) {
      stopPan(event);
      return;
    }
    const cursor = toCursorState(event);
    controllerRef.current?.handleEvent('end', cursor);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerLeave = (event: React.PointerEvent) => {
    if (panStartRef.current) {
      stopPan(event);
      return;
    }
    const cursor = toCursorState(event);
    controllerRef.current?.handleEvent('cancel', cursor);
  };

  const handleDragOver = (event: React.DragEvent) => {
    if (event.dataTransfer?.types.includes('Files')) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    if (!event.dataTransfer?.files?.length) {
      return;
    }
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    const state = useViewportStore.getState();
    const worldPosition = {
      x: screenX / state.camera.zoom + state.camera.x,
      y: screenY / state.camera.zoom + state.camera.y,
    };
    void addReferencesFromFiles(Array.from(event.dataTransfer.files), worldPosition);
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY === 0) {
      return;
    }
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    const state = useViewportStore.getState();
    const anchor = {
      x: screenX / state.camera.zoom + state.camera.x,
      y: screenY / state.camera.zoom + state.camera.y,
    };
    let zoomDelta = -event.deltaY * WHEEL_ZOOM_SCALE;
    if (zoomDelta > WHEEL_ZOOM_MAX_STEP) {
      zoomDelta = WHEEL_ZOOM_MAX_STEP;
    } else if (zoomDelta < -WHEEL_ZOOM_MAX_STEP) {
      zoomDelta = -WHEEL_ZOOM_MAX_STEP;
    }

    wheelZoomRef.current.remainingDelta += zoomDelta;
    wheelZoomRef.current.anchor = anchor;
    if (wheelZoomRef.current.frame) {
      return;
    }

    const tick = () => {
      const wheelState = wheelZoomRef.current;
      const remaining = wheelState.remainingDelta;
      if (!Number.isFinite(remaining) || Math.abs(remaining) < 0.0005) {
        wheelState.remainingDelta = 0;
        wheelState.frame = null;
        return;
      }
      const eased = remaining * 0.35;
      const minStep = 0.02;
      const maxStep = Math.max(minStep, WHEEL_ZOOM_MAX_STEP * 0.25);
      const applyDelta = Math.sign(eased) * Math.min(Math.abs(eased), maxStep);
      useViewportStore.getState().zoomBy(applyDelta, wheelState.anchor ?? undefined);
      wheelState.remainingDelta -= applyDelta;
      wheelState.frame = requestAnimationFrame(tick);
    };

    wheelZoomRef.current.frame = requestAnimationFrame(tick);
  };

  return (
    <div className="viewport" ref={wrapperRef}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onWheel={handleWheel}
        style={{
          cursor: isPanning ? 'grabbing' : 'crosshair',
        }}
      />
    </div>
  );
};

const drawTileDebugOverlay = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number
) => {
  const { tileMaps } = useTileMapStore.getState();
  if (tileMaps.length === 0) {
    return;
  }
  context.save();
  context.font = `${Math.max(10, PIXEL_SIZE)}px sans-serif`;
  context.textBaseline = 'top';
  context.fillStyle = 'rgba(255, 186, 73, 0.95)';
  context.strokeStyle = 'rgba(255, 186, 73, 0.5)';
  context.lineWidth = Math.max(1, PIXEL_SIZE * 0.06);

  for (const tileMap of tileMaps) {
    const left = tileMap.originX * PIXEL_SIZE;
    const top = tileMap.originY * PIXEL_SIZE;
    const width = tileMap.columns * PIXEL_SIZE;
    const height = tileMap.rows * PIXEL_SIZE;
    const right = left + width;
    const bottom = top + height;
    if (
      right < viewX ||
      bottom < viewY ||
      left > viewX + viewWidth ||
      top > viewY + viewHeight
    ) {
      continue;
    }
    context.strokeRect(left, top, width, height);
    context.fillText(
      `map ${tileMap.id.slice(0, 6)} origin=(${tileMap.originX},${tileMap.originY}) size=${tileMap.columns}x${tileMap.rows}`,
      left + PIXEL_SIZE * 0.5,
      top + PIXEL_SIZE * 0.5
    );
  }
  context.restore();
};

export default ViewportCanvas;
