import { rgbToHex } from '@/core/colorUtils';
import { newProject } from '@/services/project';
import { useClipboardStore } from '@/state/clipboardStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { useProjectStore } from '@/state/projectStore';
import { useSelectionStore } from '@/state/selectionStore';

const toColorKey = (r: number, g: number, b: number) => (r << 16) | (g << 8) | b;

const mapIndexedPixels = (payload: ImportedImagePayload) => {
  const paletteBytes = payload.palette;
  let paletteColors = paletteBytes
    ? paletteBytes.map((color) => rgbToHex({ r: color[0], g: color[1], b: color[2] }))
    : [];
  if (paletteColors.length === 0) {
    let maxIndex = 0;
    for (let i = 0; i < payload.pixels.length; i += 1) {
      if (payload.pixels[i] > maxIndex) {
        maxIndex = payload.pixels[i];
      }
    }
    paletteColors = Array.from({ length: maxIndex + 1 }, (_value, index) =>
      rgbToHex({ r: index, g: index, b: index })
    );
  }

  let transparentSwapIndex: number | null = null;
  if (
    typeof payload.transparentIndex === 'number' &&
    payload.transparentIndex > 0 &&
    payload.transparentIndex < paletteColors.length
  ) {
    transparentSwapIndex = payload.transparentIndex;
    const temp = paletteColors[0];
    paletteColors[0] = paletteColors[transparentSwapIndex];
    paletteColors[transparentSwapIndex] = temp;
  }

  const pixels: Array<{ x: number; y: number; paletteIndex: number }> = [];
  const width = payload.width;

  for (let i = 0; i < payload.pixels.length; i += 1) {
    const sourceIndex = payload.pixels[i];
    let paletteIndex = sourceIndex;
    if (transparentSwapIndex !== null) {
      if (sourceIndex === transparentSwapIndex) {
        paletteIndex = 0;
      } else if (sourceIndex === 0) {
        paletteIndex = transparentSwapIndex;
      }
    } else if (
      typeof payload.transparentIndex === 'number' &&
      sourceIndex === payload.transparentIndex
    ) {
      paletteIndex = 0;
    }

    if (paletteIndex === 0) {
      continue;
    }
    const x = i % width;
    const y = Math.floor(i / width);
    pixels.push({ x, y, paletteIndex });
  }

  return { paletteColors, pixels };
};

const mapRgbaPixels = (payload: ImportedImagePayload) => {
  const paletteColors: string[] = [];
  const colorIndex = new Map<number, number>();
  for (let i = 0; i < payload.pixels.length; i += 4) {
    const alpha = payload.pixels[i + 3];
    if (alpha !== 0) {
      continue;
    }
    const r = payload.pixels[i];
    const g = payload.pixels[i + 1];
    const b = payload.pixels[i + 2];
    paletteColors[0] = rgbToHex({ r, g, b });
    break;
  }

  if (!paletteColors[0]) {
    paletteColors[0] = '#000000';
  }

  const pixels: Array<{ x: number; y: number; paletteIndex: number }> = [];
  const width = payload.width;

  for (let i = 0; i < payload.pixels.length; i += 4) {
    const alpha = payload.pixels[i + 3];
    if (alpha === 0) {
      continue;
    }
    const r = payload.pixels[i];
    const g = payload.pixels[i + 1];
    const b = payload.pixels[i + 2];
    const key = toColorKey(r, g, b);
    let paletteIndex = colorIndex.get(key);
    if (paletteIndex === undefined) {
      paletteIndex = paletteColors.length;
      paletteColors.push(rgbToHex({ r, g, b }));
      colorIndex.set(key, paletteIndex);
    }
    const pixelIndex = i / 4;
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);
    pixels.push({ x, y, paletteIndex });
  }

  return { paletteColors, pixels };
};

export const importImageAsProject = async () => {
  if (!window.projectApi?.importImage) {
    window.alert('Import is unavailable. Restart the app to load the latest import support.');
    return null;
  }

  const payload = await window.projectApi.importImage();
  if (!payload) {
    return null;
  }
  if (payload.width > 512 || payload.height > 512) {
    window.alert('Large images (over 512x512) can take a while to load.');
  }

  const paletteStore = usePaletteStore.getState();
  const pixelStore = usePixelStore.getState();
  const selectionStore = useSelectionStore.getState();
  const clipboardStore = useClipboardStore.getState();

  newProject();

  if (payload.colorType === 'indexed') {
    const mapped = mapIndexedPixels(payload);
    const paletteColors =
      mapped.paletteColors.length > 0 ? mapped.paletteColors : ['#000000'];
    paletteStore.setPalette(
      paletteColors,
      0,
      Math.min(1, Math.max(0, paletteColors.length - 1))
    );
    if (mapped.pixels.length > 0) {
      pixelStore.setPixels(mapped.pixels);
    }
  } else {
    const mapped = mapRgbaPixels(payload);
    const paletteColors = mapped.paletteColors.length > 0 ? mapped.paletteColors : ['#000000'];
    paletteStore.setPalette(
      paletteColors,
      0,
      Math.min(1, Math.max(0, paletteColors.length - 1))
    );
    if (mapped.pixels.length > 0) {
      pixelStore.setPixels(mapped.pixels);
    }
  }

  selectionStore.clear();
  clipboardStore.clear();
  useProjectStore.getState().setDirty(true);
  return true;
};
