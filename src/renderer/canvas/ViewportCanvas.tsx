import React, { useEffect, useRef } from 'react';
import { useViewportStore } from '@/state/viewportStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { usePreviewStore } from '@/state/previewStore';
import { CursorState, ToolController } from '@/core/tools';
import { PenTool } from '@/tools/penTool';
import { BLOCK_SIZE } from '@/core/canvasStore';
import { PIXEL_SIZE, TILE_SIZE } from '@/core/grid';
import { LineTool } from '@/tools/lineTool';
import { RectangleTool } from '@/tools/rectangleTool';
import { OvalTool } from '@/tools/ovalTool';
import { SelectionRectangleTool } from '@/tools/selectionRectangleTool';
import { useToolStore } from '@/state/toolStore';
import { useSelectionStore } from '@/state/selectionStore';

const GRID_COLOR = 'rgba(255, 255, 255, 0.08)';
const TILE_GRID_COLOR = 'rgba(255, 255, 255, 0.18)';
const AXIS_COLOR = 'rgba(245, 197, 66, 0.5)';
const MIN_TOOL_ZOOM = 0.6;


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

const drawAxes = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number
) => {
  context.strokeStyle = AXIS_COLOR;
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

const drawPixelLayer = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number,
  palette: string[],
  blockCache: Map<string, BlockCacheEntry>
) => {
  const pixelStore = usePixelStore.getState();
  const blocks = pixelStore.store.getBlocks();
  let blocksDrawn = 0;
  let pixelsDrawn = 0;
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
    const key = `${row}:${col}`;
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

const ViewportCanvas = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const controllerRef = useRef<ToolController | null>(null);
  const blockCacheRef = useRef<Map<string, BlockCacheEntry>>(new Map());
  const selectionCacheRef = useRef<Map<string, SelectionCacheEntry>>(new Map());
  const lastPerfLogRef = useRef(0);
  const setSize = useViewportStore((state) => state.setSize);
  const zoom = useViewportStore((state) => state.camera.zoom);

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
      line: new LineTool(),
      rectangle: new RectangleTool(),
      oval: new OvalTool(),
      'selection-rect': new SelectionRectangleTool(),
    };
    const initialTool = tools[useToolStore.getState().activeTool] ?? tools.pen;
    controllerRef.current.setTool(initialTool);

    const unsubscribeTool = useToolStore.subscribe((state) => {
      controllerRef.current?.setTool(tools[state.activeTool] ?? tools.pen);
    });
    const unsubscribePalette = usePaletteStore.subscribe(() => {
      blockCacheRef.current.clear();
    });
    const unsubscribeSelection = useSelectionStore.subscribe(() => {
      selectionCacheRef.current.clear();
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

      context.clearRect(0, 0, state.width, state.height);
      context.fillStyle = '#141824';
      context.fillRect(0, 0, state.width, state.height);

      context.save();
      context.setTransform(
        state.camera.zoom,
        0,
        0,
        state.camera.zoom,
        -state.camera.x * state.camera.zoom,
        -state.camera.y * state.camera.zoom
      );

      const viewWidth = state.width / state.camera.zoom;
      const viewHeight = state.height / state.camera.zoom;

      const palette = usePaletteStore.getState().colors;
      const { dirtyAll, blocks: dirtyBlocks } = usePixelStore.getState().consumeDirtyBlocks();
      if (dirtyAll) {
        blockCacheRef.current.clear();
      }
      for (const dirty of dirtyBlocks) {
        const key = `${dirty.row}:${dirty.col}`;
        const block = usePixelStore.getState().store.getBlock(dirty.row, dirty.col);
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

      const { blocksDrawn, pixelsDrawn } = drawPixelLayer(
        context,
        state.camera.x,
        state.camera.y,
        viewWidth,
        viewHeight,
        palette,
        blockCacheRef.current
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
      drawGrid(
        context,
        state.camera.x,
        state.camera.y,
        viewWidth,
        viewHeight,
        PIXEL_SIZE,
        GRID_COLOR
      );
      drawGrid(
        context,
        state.camera.x,
        state.camera.y,
        viewWidth,
        viewHeight,
        PIXEL_SIZE * TILE_SIZE,
        TILE_GRID_COLOR
      );

      drawAxes(context, state.camera.x, state.camera.y, viewWidth, viewHeight);
      const activeTool = useToolStore.getState().activeTool;
      const previewColor =
        activeTool === 'selection-rect' ? 'rgba(245, 197, 66, 0.35)' : undefined;
      drawPreviewLayer(context, palette, previewColor);
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
      resizeObserver.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
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

  const handlePointerDown = (event: React.PointerEvent) => {
    const state = useViewportStore.getState();
    if (state.camera.zoom < MIN_TOOL_ZOOM) {
      usePreviewStore.getState().clear();
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    const cursor = toCursorState(event);
    controllerRef.current?.handleEvent('begin', cursor);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    const state = useViewportStore.getState();
    if (state.camera.zoom < MIN_TOOL_ZOOM) {
      usePreviewStore.getState().clear();
      return;
    }
    const cursor = toCursorState(event);
    const isDrawing = (event.buttons & 1) === 1 || (event.buttons & 2) === 2;
    controllerRef.current?.handleEvent(isDrawing ? 'move' : 'hover', cursor);
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    const state = useViewportStore.getState();
    if (state.camera.zoom < MIN_TOOL_ZOOM) {
      usePreviewStore.getState().clear();
      event.currentTarget.releasePointerCapture(event.pointerId);
      return;
    }
    const cursor = toCursorState(event);
    controllerRef.current?.handleEvent('end', cursor);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerLeave = (event: React.PointerEvent) => {
    const state = useViewportStore.getState();
    if (state.camera.zoom < MIN_TOOL_ZOOM) {
      usePreviewStore.getState().clear();
      return;
    }
    const cursor = toCursorState(event);
    controllerRef.current?.handleEvent('cancel', cursor);
  };

  return (
    <div className="viewport" ref={wrapperRef}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        style={{ cursor: zoom < MIN_TOOL_ZOOM ? 'not-allowed' : 'crosshair' }}
      />
    </div>
  );
};

export default ViewportCanvas;
