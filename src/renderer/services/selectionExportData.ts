import { usePaletteStore } from '@/state/paletteStore';
import { hexToRgb } from '@/core/colorUtils';
import type { CollectedSelection } from './selectionData';

export const buildSelectionImageData = (selection: CollectedSelection) => {
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

export const buildSelectionIndexData = (selection: CollectedSelection) => {
  const width = selection.maxX - selection.minX + 1;
  const height = selection.maxY - selection.minY + 1;
  const data = new Uint8Array(width * height);

  for (const pixel of selection.pixels) {
    const localX = pixel.x - selection.minX;
    const localY = pixel.y - selection.minY;
    data[localY * width + localX] = pixel.paletteIndex;
  }

  return { data, width, height };
};
