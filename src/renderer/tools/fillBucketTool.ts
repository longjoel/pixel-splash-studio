import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { BLOCK_SIZE } from '@/core/canvasStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useViewportStore } from '@/state/viewportStore';
import {
  useFillBucketStore,
  type FillBucketGradientDirection,
  type FillBucketGradientDither,
} from '@/state/fillBucketStore';
import { usePreviewStore } from '@/state/previewStore';
import { collectSelectionPixels } from '@/services/selectionData';
import { enqueuePixelChanges } from '@/services/largeOperationQueue';

type Bounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

type FilledPixel = { x: number; y: number; prev: number };

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const hashToUnit = (x: number, y: number) => {
  let h = (x | 0) * 0x8da6b343 ^ (y | 0) * 0xd8163841;
  h ^= h >>> 16;
  h = Math.imul(h, 0x7feb352d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x846ca68b);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};

const interleavedNoise = (x: number, y: number) => {
  const t = x * 0.06711056 + y * 0.00583715;
  const fract = t - Math.floor(t);
  const v = 52.9829189 * fract;
  return v - Math.floor(v);
};

const BAYER_2 = [
  [0, 2],
  [3, 1],
];

const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const BAYER_8 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];

const thresholdFor = (dither: FillBucketGradientDither, x: number, y: number) => {
  if (dither === 'bayer2') {
    return (BAYER_2[y & 1][x & 1] + 0.5) / 4;
  }
  if (dither === 'bayer4') {
    return (BAYER_4[y & 3][x & 3] + 0.5) / 16;
  }
  if (dither === 'bayer8') {
    return (BAYER_8[y & 7][x & 7] + 0.5) / 64;
  }
  if (dither === 'random') {
    return hashToUnit(x, y);
  }
  if (dither === 'blue-noise') {
    return interleavedNoise(x, y);
  }
  return 0.5;
};

const desiredRampPosition = (
  x: number,
  y: number,
  bounds: Bounds,
  direction: FillBucketGradientDirection,
  rampLength: number
) => {
  if (rampLength <= 1) {
    return 0;
  }
  const dx = bounds.maxX - bounds.minX;
  const dy = bounds.maxY - bounds.minY;
  const denomX = dx === 0 ? 1 : dx;
  const denomY = dy === 0 ? 1 : dy;
  const ux = x - bounds.minX;
  const uy = y - bounds.minY;
  let t = 0;
  if (direction === 'top-bottom') {
    t = uy / denomY;
  } else if (direction === 'bottom-top') {
    t = 1 - uy / denomY;
  } else if (direction === 'left-right') {
    t = ux / denomX;
  } else if (direction === 'right-left') {
    t = 1 - ux / denomX;
  }
  t = clamp(t, 0, 1);
  return t * (rampLength - 1);
};

const isErrorDiffusion = (dither: FillBucketGradientDither) =>
  dither === 'floyd-steinberg' ||
  dither === 'atkinson' ||
  dither === 'jarvis-judice-ninke' ||
  dither === 'stucki';

const getViewportBounds = (): Bounds | null => {
  const viewport = useViewportStore.getState();
  if (viewport.width === 0 || viewport.height === 0) {
    return null;
  }
  const viewWidth = viewport.width / viewport.camera.zoom;
  const viewHeight = viewport.height / viewport.camera.zoom;
  return {
    minX: Math.floor(viewport.camera.x / PIXEL_SIZE),
    minY: Math.floor(viewport.camera.y / PIXEL_SIZE),
    maxX: Math.floor((viewport.camera.x + viewWidth) / PIXEL_SIZE),
    maxY: Math.floor((viewport.camera.y + viewHeight) / PIXEL_SIZE),
  };
};

const fillSelection = (paletteIndex: number) => {
  const selection = useSelectionStore.getState();
  if (selection.selectedCount === 0) {
    return;
  }
  const pixelStore = usePixelStore.getState();
  const changes: Array<{ x: number; y: number; prev: number; next: number }> = [];
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
        const prev = pixelStore.getPixel(worldX, worldY);
        if (prev === paletteIndex) {
          continue;
        }
        changes.push({ x: worldX, y: worldY, prev, next: paletteIndex });
      }
    }
  }
  if (changes.length === 0) {
    return;
  }
  enqueuePixelChanges(changes, { label: 'Fill Selection' });
};

const fillByColor = (
  startX: number,
  startY: number,
  sourceIndex: number,
  paletteIndex: number
) => {
  if (sourceIndex === paletteIndex) {
    return;
  }
  const selection = useSelectionStore.getState();
  const pixelStore = usePixelStore.getState();
  const restrictToSelection = selection.selectedCount > 0;
  const bounds = restrictToSelection ? null : getViewportBounds();
  if (!restrictToSelection && !bounds) {
    return;
  }
  if (restrictToSelection && !selection.isSelected(startX, startY)) {
    return;
  }

  const visited = new Set<string>();
  const queueX: number[] = [startX];
  const queueY: number[] = [startY];
  const changes: Array<{ x: number; y: number; prev: number; next: number }> = [];

  for (let i = 0; i < queueX.length; i += 1) {
    const x = queueX[i];
    const y = queueY[i];
    if (
      bounds &&
      (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY)
    ) {
      continue;
    }
    const key = `${x}:${y}`;
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    if (restrictToSelection && !selection.isSelected(x, y)) {
      continue;
    }
    if (pixelStore.getPixel(x, y) !== sourceIndex) {
      continue;
    }
    if (
      bounds &&
      (x === bounds.minX ||
        x === bounds.maxX ||
        y === bounds.minY ||
        y === bounds.maxY)
    ) {
      return;
    }

    changes.push({ x, y, prev: sourceIndex, next: paletteIndex });
    queueX.push(x + 1, x - 1, x, x);
    queueY.push(y, y, y + 1, y - 1);
  }

  if (changes.length === 0) {
    return;
  }
  enqueuePixelChanges(changes, { label: 'Fill Region' });
};

const buildGradientRamp = (startIndex: number, endIndex: number) => {
  const ramp: number[] = [];
  const step = startIndex <= endIndex ? 1 : -1;
  for (let i = startIndex; step > 0 ? i <= endIndex : i >= endIndex; i += step) {
    ramp.push(i);
  }
  return ramp.length > 0 ? ramp : [startIndex];
};

const buildGradientRampFromPalette = () => {
  const palette = usePaletteStore.getState();
  const selection = palette.selectedIndices.filter(
    (idx, pos, arr) => arr.indexOf(idx) === pos && idx >= 0 && idx < palette.colors.length
  );
  if (selection.length > 1) {
    return [...selection].sort((a, b) => a - b);
  }
  return buildGradientRamp(palette.primaryIndex, palette.secondaryIndex);
};

const collectFloodRegion = (
  startX: number,
  startY: number,
  sourceIndex: number
): { pixels: FilledPixel[]; bounds: Bounds } | null => {
  const selection = useSelectionStore.getState();
  const pixelStore = usePixelStore.getState();
  const restrictToSelection = selection.selectedCount > 0;
  const bounds = restrictToSelection ? null : getViewportBounds();
  if (!restrictToSelection && !bounds) {
    return null;
  }
  if (restrictToSelection && !selection.isSelected(startX, startY)) {
    return null;
  }

  const visited = new Set<string>();
  const queueX: number[] = [startX];
  const queueY: number[] = [startY];
  const pixels: FilledPixel[] = [];
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < queueX.length; i += 1) {
    const x = queueX[i];
    const y = queueY[i];
    if (
      bounds &&
      (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY)
    ) {
      continue;
    }
    const key = `${x}:${y}`;
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    if (restrictToSelection && !selection.isSelected(x, y)) {
      continue;
    }
    const prev = pixelStore.getPixel(x, y);
    if (prev !== sourceIndex) {
      continue;
    }
    if (
      bounds &&
      (x === bounds.minX ||
        x === bounds.maxX ||
        y === bounds.minY ||
        y === bounds.maxY)
    ) {
      return null;
    }

    pixels.push({ x, y, prev });
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);

    queueX.push(x + 1, x - 1, x, x);
    queueY.push(y, y, y + 1, y - 1);
  }

  if (pixels.length === 0) {
    return null;
  }

  return { pixels, bounds: { minX, maxX, minY, maxY } };
};

const applyGradientFill = (
  pixels: FilledPixel[],
  bounds: Bounds,
  ramp: number[],
  direction: FillBucketGradientDirection,
  dither: FillBucketGradientDither
) => {
  const changes: Array<{ x: number; y: number; prev: number; next: number }> = [];
  const rampLength = ramp.length;
  if (rampLength === 0) {
    return;
  }

  if (isErrorDiffusion(dither)) {
    const width = bounds.maxX - bounds.minX + 1;
    const height = bounds.maxY - bounds.minY + 1;
    const area = width * height;
    const useBuffers = Number.isFinite(area) && area > 0 && area <= 2_000_000;

    let mask: Uint8Array | null = null;
    let prevBuffer: Uint8Array | null = null;
    let errorBuffer: Float32Array | null = null;
    let prevMap: Map<string, number> | null = null;
    let errorMap: Map<string, number> | null = null;

    if (useBuffers) {
      mask = new Uint8Array(area);
      prevBuffer = new Uint8Array(area);
      errorBuffer = new Float32Array(area);
      for (const pixel of pixels) {
        const idx = (pixel.y - bounds.minY) * width + (pixel.x - bounds.minX);
        mask[idx] = 1;
        prevBuffer[idx] = pixel.prev;
      }
    } else {
      prevMap = new Map<string, number>();
      errorMap = new Map<string, number>();
      for (const pixel of pixels) {
        prevMap.set(`${pixel.x}:${pixel.y}`, pixel.prev);
      }
    }

    const inRegion = (x: number, y: number) => {
      if (mask) {
        const idx = (y - bounds.minY) * width + (x - bounds.minX);
        return idx >= 0 && idx < mask.length && mask[idx] === 1;
      }
      return prevMap?.has(`${x}:${y}`) ?? false;
    };

    const getPrev = (x: number, y: number) => {
      if (prevBuffer) {
        const idx = (y - bounds.minY) * width + (x - bounds.minX);
        return prevBuffer[idx] ?? 0;
      }
      return prevMap?.get(`${x}:${y}`) ?? 0;
    };

    const getError = (x: number, y: number) => {
      if (errorBuffer) {
        const idx = (y - bounds.minY) * width + (x - bounds.minX);
        return errorBuffer[idx] ?? 0;
      }
      return errorMap?.get(`${x}:${y}`) ?? 0;
    };

    const addError = (x: number, y: number, value: number) => {
      if (!inRegion(x, y)) {
        return;
      }
      if (errorBuffer) {
        const idx = (y - bounds.minY) * width + (x - bounds.minX);
        errorBuffer[idx] += value;
        return;
      }
      const key = `${x}:${y}`;
      errorMap?.set(key, (errorMap.get(key) ?? 0) + value);
    };

    const stepX =
      direction === 'right-left'
        ? -1
        : 1;
    const stepY =
      direction === 'bottom-top'
        ? -1
        : 1;

    const xStart = stepX > 0 ? bounds.minX : bounds.maxX;
    const xEnd = stepX > 0 ? bounds.maxX : bounds.minX;
    const yStart = stepY > 0 ? bounds.minY : bounds.maxY;
    const yEnd = stepY > 0 ? bounds.maxY : bounds.minY;

    type KernelEntry = { dx: number; dy: number; weight: number };

    const buildKernel = (): KernelEntry[] => {
      if (dither === 'floyd-steinberg') {
        return [
          { dx: 1, dy: 0, weight: 7 },
          { dx: -1, dy: 1, weight: 3 },
          { dx: 0, dy: 1, weight: 5 },
          { dx: 1, dy: 1, weight: 1 },
        ];
      }
      if (dither === 'atkinson') {
        return [
          { dx: 1, dy: 0, weight: 1 },
          { dx: 2, dy: 0, weight: 1 },
          { dx: -1, dy: 1, weight: 1 },
          { dx: 0, dy: 1, weight: 1 },
          { dx: 1, dy: 1, weight: 1 },
          { dx: 0, dy: 2, weight: 1 },
        ];
      }
      if (dither === 'jarvis-judice-ninke') {
        return [
          { dx: 1, dy: 0, weight: 7 },
          { dx: 2, dy: 0, weight: 5 },
          { dx: -2, dy: 1, weight: 3 },
          { dx: -1, dy: 1, weight: 5 },
          { dx: 0, dy: 1, weight: 7 },
          { dx: 1, dy: 1, weight: 5 },
          { dx: 2, dy: 1, weight: 3 },
          { dx: -2, dy: 2, weight: 1 },
          { dx: -1, dy: 2, weight: 3 },
          { dx: 0, dy: 2, weight: 5 },
          { dx: 1, dy: 2, weight: 3 },
          { dx: 2, dy: 2, weight: 1 },
        ];
      }
      return [
        { dx: 1, dy: 0, weight: 8 },
        { dx: 2, dy: 0, weight: 4 },
        { dx: -2, dy: 1, weight: 2 },
        { dx: -1, dy: 1, weight: 4 },
        { dx: 0, dy: 1, weight: 8 },
        { dx: 1, dy: 1, weight: 4 },
        { dx: 2, dy: 1, weight: 2 },
        { dx: -2, dy: 2, weight: 1 },
        { dx: -1, dy: 2, weight: 2 },
        { dx: 0, dy: 2, weight: 4 },
        { dx: 1, dy: 2, weight: 2 },
        { dx: 2, dy: 2, weight: 1 },
      ];
    };

    const kernel = buildKernel();

    for (
      let y = yStart;
      stepY > 0 ? y <= yEnd : y >= yEnd;
      y += stepY
    ) {
      for (
        let x = xStart;
        stepX > 0 ? x <= xEnd : x >= xEnd;
        x += stepX
      ) {
        if (!inRegion(x, y)) {
          continue;
        }
        const prev = getPrev(x, y);
        const base = desiredRampPosition(x, y, bounds, direction, rampLength);
        const value = base + getError(x, y);
        const quantizedIndex = clamp(Math.round(value), 0, rampLength - 1);
        const next = ramp[quantizedIndex] ?? 0;
        if (next !== prev) {
          changes.push({ x, y, prev, next });
        }
        const err = value - quantizedIndex;
        if (!Number.isFinite(err) || err === 0) {
          continue;
        }

        const recipients: Array<{ x: number; y: number; weight: number }> = [];
        let weightSum = 0;
        for (const entry of kernel) {
          const nx = x + entry.dx * stepX;
          const ny = y + entry.dy * stepY;
          if (!inRegion(nx, ny)) {
            continue;
          }
          recipients.push({ x: nx, y: ny, weight: entry.weight });
          weightSum += entry.weight;
        }
        if (weightSum <= 0) {
          continue;
        }
        for (const entry of recipients) {
          addError(entry.x, entry.y, (err * entry.weight) / weightSum);
        }
      }
    }
  } else {
    for (const pixel of pixels) {
      const position = desiredRampPosition(
        pixel.x,
        pixel.y,
        bounds,
        direction,
        rampLength
      );
      const baseIndex = Math.floor(position);
      const frac = position - baseIndex;
      const threshold = thresholdFor(dither, pixel.x, pixel.y);
      const choice = frac > threshold ? baseIndex + 1 : baseIndex;
      const rampIndex = clamp(choice, 0, rampLength - 1);
      const next = ramp[rampIndex] ?? 0;
      if (next === pixel.prev) {
        continue;
      }
      changes.push({ x: pixel.x, y: pixel.y, prev: pixel.prev, next });
    }
  }

  if (changes.length === 0) {
    return;
  }
  enqueuePixelChanges(changes, { label: 'Gradient Fill' });
};

export class FillBucketTool implements Tool {
  id = 'fill-bucket';

  onBegin = (cursor: CursorState) => {
    usePreviewStore.getState().clear();
    const palette = usePaletteStore.getState();
    const paletteIndex = palette.primaryIndex;
    const mode = useFillBucketStore.getState().mode;
    const startX = Math.floor(cursor.canvasX / PIXEL_SIZE);
    const startY = Math.floor(cursor.canvasY / PIXEL_SIZE);

    if (mode === 'selection') {
      fillSelection(paletteIndex);
      return;
    }

    if (mode === 'gradient') {
      const ramp = buildGradientRampFromPalette();
      if (ramp.length === 0) {
        return;
      }
      const { gradientDirection, gradientDither } = useFillBucketStore.getState();
      const selection = useSelectionStore.getState();
      if (selection.selectedCount > 0) {
        const collected = collectSelectionPixels();
        if (!collected) {
          return;
        }
        const pixels = collected.pixels.map((pixel) => ({
          x: pixel.x,
          y: pixel.y,
          prev: pixel.paletteIndex,
        }));
        applyGradientFill(
          pixels,
          {
            minX: collected.minX,
            maxX: collected.maxX,
            minY: collected.minY,
            maxY: collected.maxY,
          },
          ramp,
          gradientDirection,
          gradientDither
        );
        return;
      }
      const sourceIndex = usePixelStore.getState().getPixel(startX, startY);
      const region = collectFloodRegion(startX, startY, sourceIndex);
      if (!region) {
        return;
      }
      applyGradientFill(region.pixels, region.bounds, ramp, gradientDirection, gradientDither);
      return;
    }

    const sourceIndex = usePixelStore.getState().getPixel(startX, startY);
    fillByColor(startX, startY, sourceIndex, paletteIndex);
  };
}
