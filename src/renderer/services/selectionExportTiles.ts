import { hexToRgb } from '@/core/colorUtils';
import type { CollectedSelection } from './selectionData';

type Rgb = { r: number; g: number; b: number };

export const TILE_SIZE = 8;

const colorDistance = (a: Rgb, b: Rgb) => {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return dr * dr + dg * dg + db * db;
};

const colorToRgb = (color: string): Rgb | null => hexToRgb(color);

const getPaletteRgb = (colors: string[]) =>
  colors.map((color) => colorToRgb(color) ?? { r: 0, g: 0, b: 0 });

const pickExtraColors = (palette: Rgb[], exclude: Set<number>, targetCount: number) => {
  if (targetCount <= 0) {
    return [];
  }
  const used = Array.from(exclude);
  const avg = used.length
    ? used.reduce(
        (acc, idx) => {
          const color = palette[idx];
          acc.r += color.r;
          acc.g += color.g;
          acc.b += color.b;
          return acc;
        },
        { r: 0, g: 0, b: 0 }
      )
    : { r: 127, g: 127, b: 127 };

  if (used.length) {
    avg.r /= used.length;
    avg.g /= used.length;
    avg.b /= used.length;
  }

  const candidates: Array<{ idx: number; distance: number }> = [];
  for (let i = 0; i < palette.length; i += 1) {
    if (exclude.has(i)) {
      continue;
    }
    candidates.push({ idx: i, distance: colorDistance(palette[i], avg) });
  }
  candidates.sort((a, b) => a.distance - b.distance);
  return candidates.slice(0, targetCount).map((entry) => entry.idx);
};

export const pickFourColorPalette = (
  selection: CollectedSelection,
  paletteColors: string[]
) => {
  const paletteRgb = getPaletteRgb(paletteColors);
  const counts = new Map<number, number>();
  for (const pixel of selection.pixels) {
    counts.set(pixel.paletteIndex, (counts.get(pixel.paletteIndex) ?? 0) + 1);
  }

  const usedIndices = Array.from(counts.keys()).filter((idx) => idx !== 0);
  if (usedIndices.length === 0) {
    return {
      paletteIndices: [0, 1, 2, 3].filter((idx) => idx < paletteColors.length),
      paletteRgb,
    };
  }

  let chosen = usedIndices;
  if (usedIndices.length > 3) {
    const candidates = usedIndices.map((idx) => ({
      idx,
      weight: counts.get(idx) ?? 1,
      color: paletteRgb[idx],
    }));

    const centers: number[] = [];
    const pickWeighted = () => {
      let max = -1;
      let selected = candidates[0].idx;
      for (const entry of candidates) {
        const weight = entry.weight;
        if (weight > max) {
          max = weight;
          selected = entry.idx;
        }
      }
      return selected;
    };
    centers.push(pickWeighted());

    while (centers.length < 3) {
      let bestIdx = candidates[0].idx;
      let bestScore = -1;
      for (const entry of candidates) {
        if (centers.includes(entry.idx)) {
          continue;
        }
        let minDist = Infinity;
        for (const center of centers) {
          minDist = Math.min(
            minDist,
            colorDistance(entry.color, paletteRgb[center])
          );
        }
        const score = minDist * entry.weight;
        if (score > bestScore) {
          bestScore = score;
          bestIdx = entry.idx;
        }
      }
      centers.push(bestIdx);
    }

    let currentCenters = centers;
    for (let iteration = 0; iteration < 6; iteration += 1) {
      const clusters = new Map<number, number[]>();
      for (const center of currentCenters) {
        clusters.set(center, []);
      }
      for (const entry of candidates) {
        let bestCenter = currentCenters[0];
        let bestDist = Infinity;
        for (const center of currentCenters) {
          const dist = colorDistance(entry.color, paletteRgb[center]);
          if (dist < bestDist) {
            bestDist = dist;
            bestCenter = center;
          }
        }
        clusters.get(bestCenter)?.push(entry.idx);
      }

      const nextCenters: number[] = [];
      for (const [center, cluster] of clusters.entries()) {
        if (cluster.length === 0) {
          nextCenters.push(center);
          continue;
        }
        let bestMedoid = center;
        let bestCost = Infinity;
        for (const candidate of cluster) {
          let cost = 0;
          for (const other of cluster) {
            const weight = counts.get(other) ?? 1;
            cost += colorDistance(paletteRgb[candidate], paletteRgb[other]) * weight;
          }
          if (cost < bestCost) {
            bestCost = cost;
            bestMedoid = candidate;
          }
        }
        nextCenters.push(bestMedoid);
      }
      currentCenters = Array.from(new Set(nextCenters));
      while (currentCenters.length < 3) {
        const fallback = pickExtraColors(
          paletteRgb,
          new Set([0, ...currentCenters]),
          1
        );
        if (fallback.length === 0) {
          break;
        }
        currentCenters.push(fallback[0]);
      }
    }
    chosen = currentCenters;
  }

  const unique = new Set<number>([0, ...chosen]);
  const extras = pickExtraColors(paletteRgb, unique, 4 - unique.size);
  for (const extra of extras) {
    unique.add(extra);
  }

  const ordered = Array.from(unique);
  const withZero = ordered.filter((idx) => idx === 0);
  const withoutZero = ordered
    .filter((idx) => idx !== 0)
    .sort((a, b) => {
      const luminance = (color: Rgb) =>
        0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
      return luminance(paletteRgb[a]) - luminance(paletteRgb[b]);
    });

  return {
    paletteIndices: [...withZero, ...withoutZero].slice(0, 4),
    paletteRgb,
  };
};

export const buildSelectionRgb = (
  selection: CollectedSelection,
  paletteRgb: Rgb[],
  padWidth: number,
  padHeight: number
) => {
  const width = selection.maxX - selection.minX + 1;
  const height = selection.maxY - selection.minY + 1;
  const data = new Float32Array(padWidth * padHeight * 3);

  const background = paletteRgb[0] ?? { r: 0, g: 0, b: 0 };
  for (let i = 0; i < padWidth * padHeight; i += 1) {
    const base = i * 3;
    data[base] = background.r;
    data[base + 1] = background.g;
    data[base + 2] = background.b;
  }

  for (const pixel of selection.pixels) {
    const localX = pixel.x - selection.minX;
    const localY = pixel.y - selection.minY;
    if (localX < 0 || localY < 0 || localX >= width || localY >= height) {
      continue;
    }
    const color = paletteRgb[pixel.paletteIndex] ?? background;
    const idx = (localY * padWidth + localX) * 3;
    data[idx] = color.r;
    data[idx + 1] = color.g;
    data[idx + 2] = color.b;
  }

  return { data, width, height };
};

export const ditherToPalette = (
  data: Float32Array,
  width: number,
  height: number,
  palette: Rgb[]
) => {
  const output = new Uint8Array(width * height);
  const buffer = new Float32Array(data);

  const findNearest = (r: number, g: number, b: number) => {
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i < palette.length; i += 1) {
      const dist = colorDistance({ r, g, b }, palette[i]);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }
    return bestIdx;
  };

  const pushError = (x: number, y: number, er: number, eg: number, eb: number, factor: number) => {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      return;
    }
    const idx = (y * width + x) * 3;
    buffer[idx] += er * factor;
    buffer[idx + 1] += eg * factor;
    buffer[idx + 2] += eb * factor;
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = (y * width + x) * 3;
      const r = buffer[idx];
      const g = buffer[idx + 1];
      const b = buffer[idx + 2];
      const chosen = findNearest(r, g, b);
      output[y * width + x] = chosen;
      const target = palette[chosen];
      const er = r - target.r;
      const eg = g - target.g;
      const eb = b - target.b;

      pushError(x + 1, y, er, eg, eb, 7 / 16);
      pushError(x - 1, y + 1, er, eg, eb, 3 / 16);
      pushError(x, y + 1, er, eg, eb, 5 / 16);
      pushError(x + 1, y + 1, er, eg, eb, 1 / 16);
    }
  }

  return output;
};

export const padToTiles = (value: number) => Math.ceil(value / TILE_SIZE) * TILE_SIZE;

export const buildTileBytes = (indices: Uint8Array, width: number, height: number) => {
  const tilesAcross = width / TILE_SIZE;
  const tilesDown = height / TILE_SIZE;
  const tileCount = tilesAcross * tilesDown;
  const data = new Uint8Array(tileCount * TILE_SIZE * 2);
  let offset = 0;
  for (let ty = 0; ty < tilesDown; ty += 1) {
    for (let tx = 0; tx < tilesAcross; tx += 1) {
      const baseX = tx * TILE_SIZE;
      const baseY = ty * TILE_SIZE;
      for (let y = 0; y < TILE_SIZE; y += 1) {
        let low = 0;
        let high = 0;
        for (let x = 0; x < TILE_SIZE; x += 1) {
          const srcIndex = (baseY + y) * width + (baseX + x);
          const color = indices[srcIndex] & 0x03;
          const bit = 7 - x;
          low |= (color & 0x01) << bit;
          high |= ((color >> 1) & 0x01) << bit;
        }
        data[offset] = low;
        data[offset + 1] = high;
        offset += 2;
      }
    }
  }
  return { data, tileCount };
};
