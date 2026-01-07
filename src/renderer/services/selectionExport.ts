import { usePaletteStore } from '@/state/paletteStore';
import { hexToRgb } from '@/core/colorUtils';
import { CollectedSelection, collectSelectionPixels } from './selectionData';

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
