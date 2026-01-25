import type {
  FillBucketGradientDirection,
  FillBucketGradientDither,
} from '@/state/fillBucketStore';

export type Bounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

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

export const thresholdFor = (dither: FillBucketGradientDither, x: number, y: number) => {
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

export const desiredRampPosition = (
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

export const isErrorDiffusion = (dither: FillBucketGradientDither) =>
  dither === 'floyd-steinberg' ||
  dither === 'atkinson' ||
  dither === 'jarvis-judice-ninke' ||
  dither === 'stucki';

type KernelEntry = { dx: number; dy: number; weight: number };

const buildKernel = (dither: FillBucketGradientDither): KernelEntry[] => {
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

export const computeGradientPaletteMap = (
  points: Array<{ x: number; y: number }>,
  bounds: Bounds,
  ramp: number[],
  direction: FillBucketGradientDirection,
  dither: FillBucketGradientDither
) => {
  const rampLength = ramp.length;
  const result = new Map<string, number>();
  if (rampLength === 0 || points.length === 0) {
    return result;
  }

  if (!isErrorDiffusion(dither)) {
    for (const point of points) {
      const position = desiredRampPosition(point.x, point.y, bounds, direction, rampLength);
      const baseIndex = Math.floor(position);
      const frac = position - baseIndex;
      const threshold = thresholdFor(dither, point.x, point.y);
      const choice = frac > threshold ? baseIndex + 1 : baseIndex;
      const rampIndex = clamp(choice, 0, rampLength - 1);
      result.set(`${point.x}:${point.y}`, ramp[rampIndex] ?? 0);
    }
    return result;
  }

  const width = bounds.maxX - bounds.minX + 1;
  const height = bounds.maxY - bounds.minY + 1;
  const area = width * height;
  const useBuffers = Number.isFinite(area) && area > 0 && area <= 2_000_000;

  let mask: Uint8Array | null = null;
  let errorBuffer: Float32Array | null = null;
  let maskSet: Set<string> | null = null;
  let errorMap: Map<string, number> | null = null;

  if (useBuffers) {
    mask = new Uint8Array(area);
    errorBuffer = new Float32Array(area);
    for (const point of points) {
      const idx = (point.y - bounds.minY) * width + (point.x - bounds.minX);
      if (idx >= 0 && idx < mask.length) {
        mask[idx] = 1;
      }
    }
  } else {
    maskSet = new Set<string>();
    errorMap = new Map<string, number>();
    for (const point of points) {
      maskSet.add(`${point.x}:${point.y}`);
    }
  }

  const inRegion = (x: number, y: number) => {
    if (mask) {
      const idx = (y - bounds.minY) * width + (x - bounds.minX);
      return idx >= 0 && idx < mask.length && mask[idx] === 1;
    }
    return maskSet?.has(`${x}:${y}`) ?? false;
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

  const stepX = direction === 'right-left' ? -1 : 1;
  const stepY = direction === 'bottom-top' ? -1 : 1;

  const xStart = stepX > 0 ? bounds.minX : bounds.maxX;
  const xEnd = stepX > 0 ? bounds.maxX : bounds.minX;
  const yStart = stepY > 0 ? bounds.minY : bounds.maxY;
  const yEnd = stepY > 0 ? bounds.maxY : bounds.minY;

  const kernel = buildKernel(dither);

  for (let y = yStart; stepY > 0 ? y <= yEnd : y >= yEnd; y += stepY) {
    for (let x = xStart; stepX > 0 ? x <= xEnd : x >= xEnd; x += stepX) {
      if (!inRegion(x, y)) {
        continue;
      }
      const base = desiredRampPosition(x, y, bounds, direction, rampLength);
      const value = base + getError(x, y);
      const quantizedIndex = clamp(Math.round(value), 0, rampLength - 1);
      result.set(`${x}:${y}`, ramp[quantizedIndex] ?? 0);

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

  return result;
};

