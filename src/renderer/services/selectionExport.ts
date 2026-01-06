import { useSelectionStore } from '@/state/selectionStore';
import { usePixelStore } from '@/state/pixelStore';
import { usePaletteStore } from '@/state/paletteStore';
import { hexToRgb } from '@/core/colorUtils';
import { BLOCK_SIZE } from '@/core/canvasStore';

type CollectedSelection = {
  pixels: Array<{ x: number; y: number; paletteIndex: number }>;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

const collectSelectionPixels = (): CollectedSelection | null => {
  const selection = useSelectionStore.getState();
  if (selection.selectedCount === 0) {
    return null;
  }
  const pixelStore = usePixelStore.getState();
  const pixels: Array<{ x: number; y: number; paletteIndex: number }> = [];
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

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
        const paletteIndex = pixelStore.getPixel(worldX, worldY);
        pixels.push({ x: worldX, y: worldY, paletteIndex });
        minX = Math.min(minX, worldX);
        maxX = Math.max(maxX, worldX);
        minY = Math.min(minY, worldY);
        maxY = Math.max(maxY, worldY);
      }
    }
  }

  if (pixels.length === 0) {
    return null;
  }

  return { pixels, minX, maxX, minY, maxY };
};

const buildSelectionImageData = (selection: CollectedSelection) => {
  const palette = usePaletteStore.getState().colors;
  const width = selection.maxX - selection.minX + 1;
  const height = selection.maxY - selection.minY + 1;
  const data = new Uint8ClampedArray(width * height * 4);

  for (const pixel of selection.pixels) {
    const color = palette[pixel.paletteIndex];
    if (!color) {
      continue;
    }
    const rgb = hexToRgb(color);
    if (!rgb) {
      continue;
    }
    const localX = pixel.x - selection.minX;
    const localY = pixel.y - selection.minY;
    const index = (localY * width + localX) * 4;
    data[index] = rgb.r;
    data[index + 1] = rgb.g;
    data[index + 2] = rgb.b;
    data[index + 3] = 255;
  }

  return { data, width, height };
};

export const exportSelectionAsPng = async () => {
  const selection = collectSelectionPixels();
  if (!selection) {
    window.alert('Select a region to export.');
    return null;
  }

  const { data, width, height } = buildSelectionImageData(selection);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) {
    window.alert('Unable to export selection.');
    return null;
  }
  const imageData = new ImageData(data, width, height);
  context.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((result) => resolve(result), 'image/png')
  );
  if (!blob) {
    window.alert('Unable to export selection.');
    return null;
  }

  const buffer = new Uint8Array(await blob.arrayBuffer());
  const suggestedName = `pixel-splash-selection-${width}x${height}.png`;
  return window.projectApi.exportPng(buffer, suggestedName);
};
