import React, { useEffect, useRef } from 'react';
import { useViewportStore } from '@/state/viewportStore';
import { usePixelStore } from '@/state/pixelStore';
import { usePaletteStore } from '@/state/paletteStore';
import { BLOCK_SIZE } from '@/core/canvasStore';

const MIN_WORLD_SIZE = 512;
const AXIS_COLOR = '#f5c542';

const getPixelBounds = () => {
  const pixelStore = usePixelStore.getState();
  const blocks = pixelStore.store.getBlocks();
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const { row, col, block } of blocks) {
    for (let y = 0; y < BLOCK_SIZE; y += 1) {
      for (let x = 0; x < BLOCK_SIZE; x += 1) {
        const paletteIndex = block[y * BLOCK_SIZE + x];
        if (paletteIndex === 0) {
          continue;
        }
        const worldX = col * BLOCK_SIZE + x;
        const worldY = row * BLOCK_SIZE + y;
        minX = Math.min(minX, worldX);
        minY = Math.min(minY, worldY);
        maxX = Math.max(maxX, worldX + 1);
        maxY = Math.max(maxY, worldY + 1);
      }
    }
  }

  if (!Number.isFinite(minX)) {
    return null;
  }

  return { minX, minY, maxX, maxY };
};

const getWorldBounds = () => {
  const state = useViewportStore.getState();
  const contentBounds = getPixelBounds();

  let minX = contentBounds ? contentBounds.minX : -MIN_WORLD_SIZE / 2;
  let minY = contentBounds ? contentBounds.minY : -MIN_WORLD_SIZE / 2;
  let maxX = contentBounds ? contentBounds.maxX : MIN_WORLD_SIZE / 2;
  let maxY = contentBounds ? contentBounds.maxY : MIN_WORLD_SIZE / 2;

  if (state.width > 0 && state.height > 0) {
    const viewWidth = state.width / state.camera.zoom;
    const viewHeight = state.height / state.camera.zoom;
    minX = Math.min(minX, state.camera.x);
    minY = Math.min(minY, state.camera.y);
    maxX = Math.max(maxX, state.camera.x + viewWidth);
    maxY = Math.max(maxY, state.camera.y + viewHeight);
  }

  const width = maxX - minX;
  const height = maxY - minY;

  if (width < MIN_WORLD_SIZE) {
    const pad = (MIN_WORLD_SIZE - width) / 2;
    minX -= pad;
    maxX += pad;
  }

  if (height < MIN_WORLD_SIZE) {
    const pad = (MIN_WORLD_SIZE - height) / 2;
    minY -= pad;
    maxY += pad;
  }

  return { minX, minY, maxX, maxY };
};

const getWorldTransform = (width: number, height: number) => {
  const bounds = getWorldBounds();
  const worldWidth = bounds.maxX - bounds.minX;
  const worldHeight = bounds.maxY - bounds.minY;
  const scale = Math.min(width / worldWidth, height / worldHeight);
  const offsetX = (width - worldWidth * scale) / 2 - bounds.minX * scale;
  const offsetY = (height - worldHeight * scale) / 2 - bounds.minY * scale;

  return { bounds, scale, offsetX, offsetY };
};

const drawMinimap = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const state = useViewportStore.getState();
  const palette = usePaletteStore.getState().colors;
  const { bounds, scale, offsetX, offsetY } = getWorldTransform(width, height);
  const worldWidth = bounds.maxX - bounds.minX;
  const worldHeight = bounds.maxY - bounds.minY;

  context.clearRect(0, 0, width, height);
  context.fillStyle = '#0e1118';
  context.fillRect(0, 0, width, height);

  context.fillStyle = '#141824';
  context.fillRect(
    offsetX + bounds.minX * scale,
    offsetY + bounds.minY * scale,
    worldWidth * scale,
    worldHeight * scale
  );

  context.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  context.strokeRect(
    offsetX + bounds.minX * scale,
    offsetY + bounds.minY * scale,
    worldWidth * scale,
    worldHeight * scale
  );

  const originX = offsetX;
  const originY = offsetY;
  context.strokeStyle = AXIS_COLOR;
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(originX + 0.5, offsetY + bounds.minY * scale);
  context.lineTo(originX + 0.5, offsetY + bounds.maxY * scale);
  context.stroke();

  context.beginPath();
  context.moveTo(offsetX + bounds.minX * scale, originY + 0.5);
  context.lineTo(offsetX + bounds.maxX * scale, originY + 0.5);
  context.stroke();

  const pixelStore = usePixelStore.getState();
  const blocks = pixelStore.store.getBlocks();
  for (const { row, col, block } of blocks) {
    for (let y = 0; y < BLOCK_SIZE; y += 1) {
      for (let x = 0; x < BLOCK_SIZE; x += 1) {
        const paletteIndex = block[y * BLOCK_SIZE + x];
        if (paletteIndex === 0) {
          continue;
        }
        const worldX = col * BLOCK_SIZE + x;
        const worldY = row * BLOCK_SIZE + y;
        context.fillStyle = palette[paletteIndex] ?? palette[0];
        const pixelSize = Math.max(1, scale * 0.9);
        context.fillRect(
          offsetX + worldX * scale,
          offsetY + worldY * scale,
          pixelSize,
          pixelSize
        );
      }
    }
  }

  if (state.width > 0 && state.height > 0) {
    const viewWidth = state.width / state.camera.zoom;
    const viewHeight = state.height / state.camera.zoom;

    const viewX = state.camera.x * scale + offsetX;
    const viewY = state.camera.y * scale + offsetY;
    const viewW = viewWidth * scale;
    const viewH = viewHeight * scale;

    context.strokeStyle = '#f5c542';
    context.lineWidth = 2;
    context.strokeRect(viewX, viewY, viewW, viewH);
  }
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

const Minimap = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const draggingRef = useRef(false);
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number | null>(null);
  const panTo = useViewportStore((state) => state.panTo);
  const zoomBy = useViewportStore((state) => state.zoomBy);
  const resetCamera = useViewportStore((state) => state.resetCamera);
  const camera = useViewportStore((state) => state.camera);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) {
      return undefined;
    }

    const render = () => {
      const context = setupCanvas(canvas, wrapper.clientWidth, wrapper.clientHeight);
      if (!context) {
        return;
      }
      drawMinimap(context, wrapper.clientWidth, wrapper.clientHeight);
    };

    render();
    const unsubscribeViewport = useViewportStore.subscribe(render);
    const unsubscribePixels = usePixelStore.subscribe(render);
    const unsubscribePalette = usePaletteStore.subscribe(render);
    const resizeObserver = new ResizeObserver(render);
    resizeObserver.observe(wrapper);

    return () => {
      unsubscribeViewport();
      unsubscribePixels();
      unsubscribePalette();
      resizeObserver.disconnect();
    };
  }, []);

  const toWorld = (event: React.PointerEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const { scale, offsetX, offsetY } = getWorldTransform(rect.width, rect.height);
    return {
      x: (x - offsetX) / scale,
      y: (y - offsetY) / scale,
    };
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    const world = toWorld(event);
    const state = useViewportStore.getState();
    const viewWidth = state.width / state.camera.zoom;
    const viewHeight = state.height / state.camera.zoom;
    targetRef.current = {
      x: world.x - viewWidth / 2,
      y: world.y - viewHeight / 2,
    };

    const step = () => {
      if (!draggingRef.current || !targetRef.current) {
        return;
      }
      const current = useViewportStore.getState().camera;
      const dx = targetRef.current.x - current.x;
      const dy = targetRef.current.y - current.y;
      const distance = Math.hypot(dx, dy);
      if (distance > 0.01) {
        const maxStep = 12;
        const stepSize = Math.min(maxStep, distance * 0.25);
        panTo(
          current.x + (dx / distance) * stepSize,
          current.y + (dy / distance) * stepSize
        );
      }
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!draggingRef.current) {
      return;
    }
    const world = toWorld(event);
    const state = useViewportStore.getState();
    const viewWidth = state.width / state.camera.zoom;
    const viewHeight = state.height / state.camera.zoom;
    targetRef.current = {
      x: world.x - viewWidth / 2,
      y: world.y - viewHeight / 2,
    };
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    draggingRef.current = false;
    targetRef.current = null;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="minimap">
      <div className="minimap__canvas" ref={wrapperRef}>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      </div>
      <div className="minimap__controls">
        <button type="button" onClick={() => zoomBy(0.2)}>+</button>
        <button type="button" onClick={() => zoomBy(-0.2)}>-</button>
        <button type="button" onClick={resetCamera}>Home</button>
      </div>
      <div className="minimap__readout">
        <span>X: {Math.round(camera.x)}</span>
        <span>Y: {Math.round(camera.y)}</span>
        <span>Zoom: {camera.zoom.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Minimap;
