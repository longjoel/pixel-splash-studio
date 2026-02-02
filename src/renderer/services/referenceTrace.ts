import { hexToRgb, type Rgb } from '@/core/colorUtils';
import { getReferenceBounds, getReferenceTransform } from '@/core/referenceTransforms';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import type { ReferenceImage } from '@/state/referenceStore';
import { enqueuePixelChanges } from '@/services/largeOperationQueue';
import {
  PIXEL_SIZE,
  TRACE_ALPHA_THRESHOLD,
  TRACE_COLOR_BUCKET_STEP,
  TRACE_CANVAS_MAX_DIMENSION,
  TRACE_CANVAS_MAX_PIXELS,
  TRACE_CANVAS_OVERRIDE_STORAGE_KEY,
  TRACE_MAX_COLORS_MAX,
  TRACE_MAX_COLORS_MIN,
} from '../../constants';

type TraceCanvas = {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  data: Uint8ClampedArray;
};

type PaletteEntry = {
  paletteIndex: number;
  rgb: Rgb;
};

const toHex = (value: number) => value.toString(16).padStart(2, '0');

const rgbToHex = (rgb: Rgb) => `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;

const colorDistance = (a: Rgb, b: Rgb) => {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return dr * dr + dg * dg + db * db;
};

const allowOversizedTraceCanvas = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    return window.localStorage?.getItem(TRACE_CANVAS_OVERRIDE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const buildTraceCanvas = (reference: ReferenceImage): TraceCanvas | null => {
  const bounds = getReferenceBounds(reference);
  const minGridX = Math.floor(bounds.minX / PIXEL_SIZE);
  const minGridY = Math.floor(bounds.minY / PIXEL_SIZE);
  const maxGridX = Math.ceil(bounds.maxX / PIXEL_SIZE);
  const maxGridY = Math.ceil(bounds.maxY / PIXEL_SIZE);
  const width = Math.max(0, maxGridX - minGridX);
  const height = Math.max(0, maxGridY - minGridY);
  if (width === 0 || height === 0) {
    return null;
  }
  const pixelCount = width * height;
  const exceedsLimits =
    width > TRACE_CANVAS_MAX_DIMENSION ||
    height > TRACE_CANVAS_MAX_DIMENSION ||
    pixelCount > TRACE_CANVAS_MAX_PIXELS;
  if (exceedsLimits && !allowOversizedTraceCanvas()) {
    const warning =
      `Reference trace is too large (${width}x${height}, ${pixelCount.toLocaleString()} px). ` +
      `Reduce the reference scale or set localStorage["${TRACE_CANVAS_OVERRIDE_STORAGE_KEY}"]="true" to override.`;
    if (typeof window !== 'undefined') {
      window.alert(warning);
    }
    console.warn('[referenceTrace] Trace canvas exceeds limits.', {
      width,
      height,
      pixelCount,
      maxDimension: TRACE_CANVAS_MAX_DIMENSION,
      maxPixels: TRACE_CANVAS_MAX_PIXELS,
    });
    return null;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return null;
  }
  context.imageSmoothingEnabled = false;

  const transform = getReferenceTransform(reference);
  const centerX = transform.centerX / PIXEL_SIZE;
  const centerY = transform.centerY / PIXEL_SIZE;
  const baseWidth = transform.baseWidth / PIXEL_SIZE;
  const baseHeight = transform.baseHeight / PIXEL_SIZE;

  context.save();
  context.translate(centerX - minGridX, centerY - minGridY);
  context.rotate(transform.rotationRad);
  context.scale(transform.scale * transform.flipX, transform.scale * transform.flipY);
  context.drawImage(
    reference.image,
    -baseWidth / 2,
    -baseHeight / 2,
    baseWidth,
    baseHeight
  );
  context.restore();

  const imageData = context.getImageData(0, 0, width, height);
  return {
    width,
    height,
    offsetX: minGridX,
    offsetY: minGridY,
    data: imageData.data,
  };
};

const buildPaletteEntriesFromRange = (
  colors: string[],
  minIndex: number,
  maxIndex: number
) => {
  const entries: PaletteEntry[] = [];
  for (let index = minIndex; index <= maxIndex; index += 1) {
    const color = colors[index];
    if (!color) {
      continue;
    }
    const rgb = hexToRgb(color);
    if (!rgb) {
      continue;
    }
    entries.push({ paletteIndex: index, rgb });
  }
  return entries;
};

const buildQuantizedPalette = (
  data: Uint8ClampedArray,
  maxColors: number
) => {
  const counts = new Map<string, { rgb: Rgb; count: number }>();
  const step = Math.max(1, TRACE_COLOR_BUCKET_STEP);
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < TRACE_ALPHA_THRESHOLD) {
      continue;
    }
    const r = Math.min(255, Math.round(data[i] / step) * step);
    const g = Math.min(255, Math.round(data[i + 1] / step) * step);
    const b = Math.min(255, Math.round(data[i + 2] / step) * step);
    const key = `${r},${g},${b}`;
    const existing = counts.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(key, { rgb: { r, g, b }, count: 1 });
    }
  }

  const sorted = Array.from(counts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, maxColors);
  return sorted.map((entry) => entry.rgb);
};

const ensurePaletteEntries = (colors: Rgb[]) => {
  const paletteStore = usePaletteStore.getState();
  const paletteColors = paletteStore.colors;
  const colorIndexMap = new Map<string, number>();
  paletteColors.forEach((color, index) => {
    colorIndexMap.set(color.toLowerCase(), index);
  });

  const newColors: string[] = [];
  const entries: PaletteEntry[] = [];

  for (const rgb of colors) {
    const hex = rgbToHex(rgb);
    const key = hex.toLowerCase();
    let paletteIndex = colorIndexMap.get(key);
    if (paletteIndex === undefined) {
      paletteIndex = paletteColors.length + newColors.length;
      newColors.push(hex);
      colorIndexMap.set(key, paletteIndex);
    }
    entries.push({ paletteIndex, rgb });
  }

  if (newColors.length > 0) {
    paletteStore.setPalette([...paletteColors, ...newColors]);
  }

  return entries;
};

const applyTraceCanvas = (traceCanvas: TraceCanvas, paletteEntries: PaletteEntry[]) => {
  if (paletteEntries.length === 0) {
    return;
  }
  const pixelStore = usePixelStore.getState();
  const changes: Array<{ x: number; y: number; prev: number; next: number }> = [];
  const paletteCache = new Map<string, number>();

  for (let y = 0; y < traceCanvas.height; y += 1) {
    for (let x = 0; x < traceCanvas.width; x += 1) {
      const offset = (y * traceCanvas.width + x) * 4;
      const alpha = traceCanvas.data[offset + 3];
      if (alpha < TRACE_ALPHA_THRESHOLD) {
        continue;
      }
      const r = traceCanvas.data[offset];
      const g = traceCanvas.data[offset + 1];
      const b = traceCanvas.data[offset + 2];
      const key = `${r},${g},${b}`;
      let paletteIndex = paletteCache.get(key);
      if (paletteIndex === undefined) {
        const rgb = { r, g, b };
        let nearest = paletteEntries[0];
        let minDistance = colorDistance(rgb, nearest.rgb);
        for (let i = 1; i < paletteEntries.length; i += 1) {
          const entry = paletteEntries[i];
          const distance = colorDistance(rgb, entry.rgb);
          if (distance < minDistance) {
            minDistance = distance;
            nearest = entry;
          }
        }
        paletteIndex = nearest.paletteIndex;
        paletteCache.set(key, paletteIndex);
      }
      const worldX = traceCanvas.offsetX + x;
      const worldY = traceCanvas.offsetY + y;
      const prev = pixelStore.getPixel(worldX, worldY);
      if (prev === paletteIndex) {
        continue;
      }
      changes.push({ x: worldX, y: worldY, prev, next: paletteIndex });
    }
  }

  if (changes.length === 0) {
    return;
  }
  enqueuePixelChanges(changes, { label: 'Reference Trace' });
};

export const traceReferenceWithPaletteRange = (
  reference: ReferenceImage,
  minIndex: number,
  maxIndex: number
) => {
  const paletteColors = usePaletteStore.getState().colors;
  if (paletteColors.length === 0) {
    return;
  }
  const safeMin = Math.max(0, Math.min(minIndex, paletteColors.length - 1));
  const safeMax = Math.max(0, Math.min(maxIndex, paletteColors.length - 1));
  const start = Math.min(safeMin, safeMax);
  const end = Math.max(safeMin, safeMax);
  const paletteEntries = buildPaletteEntriesFromRange(paletteColors, start, end);
  if (paletteEntries.length === 0) {
    return;
  }
  const traceCanvas = buildTraceCanvas(reference);
  if (!traceCanvas) {
    return;
  }
  applyTraceCanvas(traceCanvas, paletteEntries);
};

export const traceReferenceWithMaxColors = (
  reference: ReferenceImage,
  maxColors: number
) => {
  const traceCanvas = buildTraceCanvas(reference);
  if (!traceCanvas) {
    return;
  }
  const clampedMax = Math.max(
    TRACE_MAX_COLORS_MIN,
    Math.min(maxColors, TRACE_MAX_COLORS_MAX)
  );
  const palette = buildQuantizedPalette(traceCanvas.data, clampedMax);
  if (palette.length === 0) {
    return;
  }
  const paletteEntries = ensurePaletteEntries(palette);
  applyTraceCanvas(traceCanvas, paletteEntries);
};
