import React, { useEffect, useRef } from 'react';
import { useViewportStore } from '@/state/viewportStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { usePreviewStore } from '@/state/previewStore';
import { CursorState, ToolController } from '@/core/tools';
import { PenTool } from '@/tools/penTool';
import { BLOCK_SIZE } from '@/core/canvasStore';
import { PIXEL_SIZE, TILE_SIZE } from '@/core/grid';

const GRID_COLOR = 'rgba(255, 255, 255, 0.08)';
const TILE_GRID_COLOR = 'rgba(255, 255, 255, 0.18)';
const AXIS_COLOR = 'rgba(245, 197, 66, 0.5)';


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

const drawPixelLayer = (
  context: CanvasRenderingContext2D,
  viewX: number,
  viewY: number,
  viewWidth: number,
  viewHeight: number,
  palette: string[]
) => {
  const pixelStore = usePixelStore.getState();
  const blocks = pixelStore.store.getBlocks();
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
        const paletteIndex = block[y * BLOCK_SIZE + x];
        if (paletteIndex === 0) {
          continue;
        }
        context.fillStyle = palette[paletteIndex] ?? palette[0];
        context.fillRect(
          (blockX + x) * PIXEL_SIZE,
          (blockY + y) * PIXEL_SIZE,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }
    }
  }
};

const drawPreviewLayer = (context: CanvasRenderingContext2D, palette: string[]) => {
  const preview = usePreviewStore.getState();
  for (const pixel of preview.entries()) {
    context.fillStyle = palette[pixel.paletteIndex] ?? palette[0];
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
  const setSize = useViewportStore((state) => state.setSize);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) {
      return undefined;
    }

    setSize(wrapper.clientWidth, wrapper.clientHeight);

    controllerRef.current = new ToolController();
    controllerRef.current.setTool(new PenTool());

    const render = () => {
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
      drawPixelLayer(context, state.camera.x, state.camera.y, viewWidth, viewHeight, palette);
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
      drawPreviewLayer(context, palette);
      context.restore();

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
    event.currentTarget.setPointerCapture(event.pointerId);
    const cursor = toCursorState(event);
    controllerRef.current?.handleEvent('begin', cursor);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    const cursor = toCursorState(event);
    const isDrawing = (event.buttons & 1) === 1 || (event.buttons & 2) === 2;
    controllerRef.current?.handleEvent(isDrawing ? 'move' : 'hover', cursor);
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    const cursor = toCursorState(event);
    controllerRef.current?.handleEvent('end', cursor);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerLeave = (event: React.PointerEvent) => {
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
      />
    </div>
  );
};

export default ViewportCanvas;
