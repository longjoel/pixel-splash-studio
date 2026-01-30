import { hexToRgb, rgbToHex } from '@/core/colorUtils';

export type Rect = { x: number; y: number; width: number; height: number };

const clampInt = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Math.trunc(value)));

export const clampRect = (rect: Rect, imageWidth: number, imageHeight: number): Rect => {
  const x = clampInt(rect.x, 0, Math.max(0, imageWidth - 1));
  const y = clampInt(rect.y, 0, Math.max(0, imageHeight - 1));
  const width = clampInt(rect.width, 1, Math.max(1, imageWidth - x));
  const height = clampInt(rect.height, 1, Math.max(1, imageHeight - y));
  return { x, y, width, height };
};

export const extractIndexedRegion = (
  pixels: Uint8Array,
  imageWidth: number,
  imageHeight: number,
  rect: Rect
) => {
  const clamped = clampRect(rect, imageWidth, imageHeight);
  const out = new Uint8Array(clamped.width * clamped.height);
  for (let row = 0; row < clamped.height; row += 1) {
    const srcY = clamped.y + row;
    const srcOffset = srcY * imageWidth + clamped.x;
    const dstOffset = row * clamped.width;
    out.set(pixels.subarray(srcOffset, srcOffset + clamped.width), dstOffset);
  }
  return { pixels: out, width: clamped.width, height: clamped.height };
};

export const scaleIndexedNearest = (
  pixels: Uint8Array,
  width: number,
  height: number,
  scale: number
) => {
  const factor = clampInt(scale, 1, 8);
  if (factor === 1) {
    return { pixels, width, height };
  }
  const outW = width * factor;
  const outH = height * factor;
  const out = new Uint8Array(outW * outH);
  for (let y = 0; y < outH; y += 1) {
    const srcY = Math.floor(y / factor);
    for (let x = 0; x < outW; x += 1) {
      const srcX = Math.floor(x / factor);
      out[y * outW + x] = pixels[srcY * width + srcX] ?? 0;
    }
  }
  return { pixels: out, width: outW, height: outH };
};

const colorDistanceSq = (a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }) => {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return dr * dr + dg * dg + db * db;
};

export const buildNearestPaletteMap = (
  sourcePalette: Array<[number, number, number]>,
  targetPaletteHex: string[]
) => {
  const targetRgb = targetPaletteHex.map((hex) => hexToRgb(hex) ?? { r: 0, g: 0, b: 0 });
  const map = new Map<number, number>();
  map.set(0, 0);

  const targetIndices =
    targetRgb.length > 1 ? Array.from({ length: targetRgb.length - 1 }, (_v, i) => i + 1) : [0];

  for (let i = 1; i < sourcePalette.length; i += 1) {
    const rgb = sourcePalette[i];
    if (!rgb) {
      continue;
    }
    const source = { r: rgb[0], g: rgb[1], b: rgb[2] };
    let best = targetIndices[0] ?? 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (const idx of targetIndices) {
      const dist = colorDistanceSq(source, targetRgb[idx] ?? targetRgb[0]!);
      if (dist < bestDist) {
        bestDist = dist;
        best = idx;
      }
    }
    map.set(i, best);
  }
  return map;
};

export const buildUnusedPaletteMap = (
  sourcePaletteHex: string[],
  targetPaletteHex: string[],
  usedIndices: Set<number>
) => {
  const nextPalette = targetPaletteHex.slice();
  const map = new Map<number, number>();
  map.set(0, 0);

  const reserved = new Set<number>([0]);
  const assignIndex = (sourceIndex: number, colorHex: string) => {
    for (let idx = 1; idx < nextPalette.length; idx += 1) {
      if (usedIndices.has(idx) || reserved.has(idx)) {
        continue;
      }
      reserved.add(idx);
      nextPalette[idx] = colorHex;
      map.set(sourceIndex, idx);
      return;
    }
    const idx = nextPalette.length;
    nextPalette.push(colorHex);
    reserved.add(idx);
    map.set(sourceIndex, idx);
  };

  for (let i = 1; i < sourcePaletteHex.length; i += 1) {
    assignIndex(i, sourcePaletteHex[i] ?? '#000000');
  }

  return { map, palette: nextPalette };
};

export const applyPaletteMap = (pixels: Uint8Array, map: Map<number, number>) => {
  const out = new Uint8Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 1) {
    const src = pixels[i] ?? 0;
    out[i] = map.get(src) ?? 0;
  }
  return out;
};

export const paletteToHex = (palette?: Array<[number, number, number]>, maxIndexFromPixels?: Uint8Array) => {
  if (palette && palette.length > 0) {
    return palette.map((rgb) => rgbToHex({ r: rgb[0], g: rgb[1], b: rgb[2] }));
  }
  if (!maxIndexFromPixels) {
    return ['#000000'];
  }
  let maxIndex = 0;
  for (let i = 0; i < maxIndexFromPixels.length; i += 1) {
    const v = maxIndexFromPixels[i] ?? 0;
    if (v > maxIndex) {
      maxIndex = v;
    }
  }
  return Array.from({ length: maxIndex + 1 }, (_v, idx) => rgbToHex({ r: idx, g: idx, b: idx }));
};

export const indexedToRgba = (pixels: Uint8Array, width: number, height: number, paletteHex: string[]) => {
  const rgba = new Uint8ClampedArray(width * height * 4);
  const paletteRgb = paletteHex.map((hex) => hexToRgb(hex) ?? { r: 0, g: 0, b: 0 });
  for (let i = 0; i < pixels.length; i += 1) {
    const idx = pixels[i] ?? 0;
    const rgb = paletteRgb[idx] ?? paletteRgb[0]!;
    const dest = i * 4;
    rgba[dest] = rgb.r;
    rgba[dest + 1] = rgb.g;
    rgba[dest + 2] = rgb.b;
    rgba[dest + 3] = idx === 0 ? 0 : 255;
  }
  return rgba;
};
