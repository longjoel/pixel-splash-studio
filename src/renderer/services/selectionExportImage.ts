import { usePaletteStore } from '@/state/paletteStore';
import { hexToRgb } from '@/core/colorUtils';
import { collectSelectionPixels } from './selectionData';
import { buildSelectionImageData, buildSelectionIndexData } from './selectionExportData';

type ExportFormat = 'bmp' | 'gif' | 'pcx' | 'tga';

const ensureExportAvailable = () => {
  if (!window.projectApi?.exportImage) {
    window.alert('Image export is unavailable. Restart the app to load the latest export support.');
    return false;
  }
  return true;
};

const exportSelectionAsImage = async (format: ExportFormat) => {
  const selection = collectSelectionPixels();
  if (!selection) {
    window.alert('Select a region to export.');
    return null;
  }
  if (!ensureExportAvailable()) {
    return null;
  }

  const { data, width, height } = buildSelectionImageData(selection);
  const rgba = new Uint8Array(data);
  const suggestedName = `pixel-splash-selection-${width}x${height}.${format}`;
  return window.projectApi.exportImage(format, { kind: 'rgba', width, height, data: rgba }, suggestedName);
};

export const exportSelectionAsBmp = () => exportSelectionAsImage('bmp');

export const exportSelectionAsGif = () => exportSelectionAsImage('gif');

export const exportSelectionAsTga = () => exportSelectionAsImage('tga');

export const exportSelectionAsPcx = async () => {
  const selection = collectSelectionPixels();
  if (!selection) {
    window.alert('Select a region to export.');
    return null;
  }
  if (!ensureExportAvailable()) {
    return null;
  }

  let maxPaletteIndex = 0;
  for (const pixel of selection.pixels) {
    if (pixel.paletteIndex > maxPaletteIndex) {
      maxPaletteIndex = pixel.paletteIndex;
    }
  }
  if (maxPaletteIndex > 255) {
    window.alert('PCX export supports palette indices up to 255.');
    return null;
  }

  const { data, width, height } = buildSelectionIndexData(selection);
  const palette = usePaletteStore.getState().colors;
  const paletteBytes = new Uint8Array(256 * 3);
  for (let i = 0; i < 256; i += 1) {
    const color = palette[i];
    if (!color) {
      continue;
    }
    const rgb = hexToRgb(color);
    if (!rgb) {
      continue;
    }
    const offset = i * 3;
    paletteBytes[offset] = rgb.r;
    paletteBytes[offset + 1] = rgb.g;
    paletteBytes[offset + 2] = rgb.b;
  }

  const suggestedName = `pixel-splash-selection-${width}x${height}.pcx`;
  return window.projectApi.exportImage(
    'pcx',
    { kind: 'indexed', width, height, data, palette: paletteBytes },
    suggestedName
  );
};
