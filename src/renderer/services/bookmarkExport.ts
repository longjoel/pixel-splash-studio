import { hexToRgb } from '@/core/colorUtils';
import type { Bookmark } from '@/state/bookmarkStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { exportTileMapPixelRegion } from '@/services/tileMapExport';

const ensurePngFileName = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }
  return trimmed.toLowerCase().endsWith('.png') ? trimmed : `${trimmed}.png`;
};

const buildRegionRgba = (bookmark: Bookmark) => {
  const palette = usePaletteStore.getState().colors;
  const pixels = usePixelStore.getState();
  const width = Math.max(1, bookmark.width);
  const height = Math.max(1, bookmark.height);
  const data = new Uint8ClampedArray(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const paletteIndex = pixels.getPixelComposite(bookmark.x + x, bookmark.y + y);
      if (paletteIndex === 0) {
        continue;
      }
      const color = palette[paletteIndex];
      if (!color) {
        continue;
      }
      const rgb = hexToRgb(color);
      if (!rgb) {
        continue;
      }
      const index = (y * width + x) * 4;
      data[index] = rgb.r;
      data[index + 1] = rgb.g;
      data[index + 2] = rgb.b;
      data[index + 3] = 255;
    }
  }

  return { data, width, height };
};

export const exportBookmarkRegionAsPng = async (bookmark: Bookmark) => {
  const suggestedName = ensurePngFileName(bookmark.fileName ?? '');
  if (!suggestedName) {
    window.alert('Set a file name before exporting this bookmark.');
    return null;
  }

  const { data, width, height } = buildRegionRgba(bookmark);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) {
    window.alert('Unable to export bookmark.');
    return null;
  }
  context.putImageData(new ImageData(data, width, height), 0, 0);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((result) => resolve(result), 'image/png')
  );
  if (!blob) {
    window.alert('Unable to export bookmark.');
    return null;
  }

  const buffer = new Uint8Array(await blob.arrayBuffer());
  return window.projectApi.exportPng(buffer, suggestedName);
};

export const exportBookmarkRegionAsTileMap = async (bookmark: Bookmark) => {
  const baseName = ensurePngFileName(bookmark.fileName ?? '').replace(/\.png$/i, '');
  if (!baseName) {
    window.alert('Set a file name before exporting this bookmark.');
    return null;
  }
  return exportTileMapPixelRegion(
    {
      x: bookmark.x,
      y: bookmark.y,
      width: bookmark.width,
      height: bookmark.height,
    },
    { baseName }
  );
};
