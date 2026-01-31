import { useClipboardStore } from '@/state/clipboardStore';
import { useToolStore } from '@/state/toolStore';

export type TextFontFamily = 'monospace' | 'sans-serif' | 'serif';

export const quantizeFontSize = (size: number) => {
  const min = 8;
  const max = 32;
  const clamped = Math.max(min, Math.min(max, size));
  return Math.round(clamped / 8) * 8;
};

export type RasterizedText = {
  pixels: Array<{ x: number; y: number; paletteIndex: number }>;
  width: number;
  height: number;
};

export const rasterizeText = (options: {
  text: string;
  fontFamily: TextFontFamily;
  fontSize: number;
  paletteIndex: number;
  alphaThreshold?: number;
}): RasterizedText | null => {
  const fontSize = quantizeFontSize(options.fontSize);
  const text = options.text;
  if (!text.trim()) {
    return null;
  }

  if (typeof document === 'undefined') {
    throw new Error('rasterizeText requires a DOM environment.');
  }

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }

  const lines = text.split('\n');
  context.imageSmoothingEnabled = false;
  context.textBaseline = 'top';
  context.textAlign = 'left';
  context.font = `${fontSize}px ${options.fontFamily}`;

  let maxWidth = 0;
  for (const line of lines) {
    const metrics = context.measureText(line);
    maxWidth = Math.max(maxWidth, Math.ceil(metrics.width));
  }

  const padding = 2;
  const canvasWidth = Math.max(1, maxWidth + padding * 2);
  const canvasHeight = Math.max(1, lines.length * fontSize + padding * 2);
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.imageSmoothingEnabled = false;
  context.textBaseline = 'top';
  context.textAlign = 'left';
  context.font = `${fontSize}px ${options.fontFamily}`;
  context.fillStyle = '#ffffff';

  for (let i = 0; i < lines.length; i += 1) {
    context.fillText(lines[i] ?? '', padding, padding + i * fontSize);
  }

  const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
  const data = imageData.data;
  const threshold = options.alphaThreshold ?? 128;

  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxXFound = Number.NEGATIVE_INFINITY;
  let maxYFound = Number.NEGATIVE_INFINITY;

  for (let y = 0; y < canvasHeight; y += 1) {
    for (let x = 0; x < canvasWidth; x += 1) {
      const alpha = data[(y * canvasWidth + x) * 4 + 3] ?? 0;
      if (alpha < threshold) {
        continue;
      }
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxXFound = Math.max(maxXFound, x);
      maxYFound = Math.max(maxYFound, y);
    }
  }

  if (!Number.isFinite(minX) || !Number.isFinite(minY)) {
    return null;
  }

  const width = maxXFound - minX + 1;
  const height = maxYFound - minY + 1;
  const pixels: RasterizedText['pixels'] = [];

  for (let y = minY; y <= maxYFound; y += 1) {
    for (let x = minX; x <= maxXFound; x += 1) {
      const alpha = data[(y * canvasWidth + x) * 4 + 3] ?? 0;
      if (alpha < threshold) {
        continue;
      }
      pixels.push({
        x: x - minX,
        y: y - minY,
        paletteIndex: options.paletteIndex,
      });
    }
  }

  return { pixels, width, height };
};

export const copyTextToClipboard = (options: {
  text: string;
  fontFamily: TextFontFamily;
  fontSize: number;
  paletteIndex: number;
}) => {
  const rasterized = rasterizeText(options);
  if (!rasterized) {
    return;
  }
  useClipboardStore.getState().setBuffer({
    pixels: rasterized.pixels,
    origin: { x: 0, y: 0 },
    width: rasterized.width,
    height: rasterized.height,
  });
  useToolStore.getState().setActiveTool('stamp');
};

