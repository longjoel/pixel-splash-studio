import React, { useEffect, useRef } from 'react';
import { useClipboardStore } from '@/state/clipboardStore';
import { usePaletteStore } from '@/state/paletteStore';
import { ensureContrast, getComplement, hexToRgb, mix, toRgb, toRgba } from '@/core/colorUtils';

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

const renderPreview = (context: CanvasRenderingContext2D, width: number, height: number) => {
  const clipboard = useClipboardStore.getState();
  const palette = usePaletteStore.getState().colors;
  const bgHex = palette[0] ?? '#000000';
  const bgRgb = hexToRgb(bgHex) ?? { r: 0, g: 0, b: 0 };
  const accent = ensureContrast(bgRgb, getComplement(bgRgb));
  const surfaceColor = toRgb(mix(bgRgb, accent, 0.1));
  const borderColor = toRgba(accent, 0.12);

  context.clearRect(0, 0, width, height);
  context.fillStyle = bgHex;
  context.fillRect(0, 0, width, height);

  if (clipboard.pixels.length === 0 || clipboard.width === 0 || clipboard.height === 0) {
    return;
  }

  const padding = 12;
  const availableWidth = Math.max(1, width - padding * 2);
  const availableHeight = Math.max(1, height - padding * 2);
  const scale = Math.min(
    availableWidth / clipboard.width,
    availableHeight / clipboard.height
  );

  const scaledWidth = clipboard.width * scale;
  const scaledHeight = clipboard.height * scale;
  const offsetX = (width - scaledWidth) / 2;
  const offsetY = (height - scaledHeight) / 2;

  context.fillStyle = surfaceColor;
  context.fillRect(offsetX, offsetY, scaledWidth, scaledHeight);
  context.strokeStyle = borderColor;
  context.strokeRect(offsetX, offsetY, scaledWidth, scaledHeight);

  for (const pixel of clipboard.pixels) {
    const color = palette[pixel.paletteIndex] ?? palette[0];
    context.fillStyle = color;
    context.fillRect(
      offsetX + pixel.x * scale,
      offsetY + pixel.y * scale,
      scale,
      scale
    );
  }
};

const PastePreview = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const clipboard = useClipboardStore((state) => state);

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
      renderPreview(context, wrapper.clientWidth, wrapper.clientHeight);
    };

    render();
    const unsubscribeClipboard = useClipboardStore.subscribe(render);
    const unsubscribePalette = usePaletteStore.subscribe(render);
    const resizeObserver = new ResizeObserver(render);
    resizeObserver.observe(wrapper);

    return () => {
      unsubscribeClipboard();
      unsubscribePalette();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="minimap">
      <div className="minimap__canvas" ref={wrapperRef}>
        <canvas ref={canvasRef} />
      </div>
      <div className="minimap__readout">
        <span>Size: {clipboard.width}x{clipboard.height}</span>
        <span>Origin: {clipboard.origin ? `${clipboard.origin.x}, ${clipboard.origin.y}` : '--'}</span>
        <span>Pixels: {clipboard.pixels.length}</span>
      </div>
    </div>
  );
};

export default PastePreview;
