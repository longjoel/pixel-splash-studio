import { hexToRgb, type Rgb } from '@/core/colorUtils';

type QuantizeResult = {
  pixels: Array<{ x: number; y: number; paletteIndex: number }>;
};

const colorDistanceSq = (a: Rgb, b: Rgb) => {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return dr * dr + dg * dg + db * db;
};

export const quantizeImageToPalette = (
  imageData: ImageData,
  paletteHex: string[],
  options: { alphaThreshold?: number } = {}
): QuantizeResult => {
  const alphaThreshold = options.alphaThreshold ?? 1;
  const paletteRgb = paletteHex.map((hex) => hexToRgb(hex) ?? { r: 0, g: 0, b: 0 });
  const usableIndices =
    paletteRgb.length > 1 ? Array.from({ length: paletteRgb.length - 1 }, (_v, i) => i + 1) : [0];

  const pixels: QuantizeResult['pixels'] = [];
  const { width, height, data } = imageData;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const r = data[offset] ?? 0;
      const g = data[offset + 1] ?? 0;
      const b = data[offset + 2] ?? 0;
      const a = data[offset + 3] ?? 0;
      if (a < alphaThreshold) {
        continue;
      }
      const rgb = { r, g, b };
      let bestIdx = usableIndices[0] ?? 0;
      let bestDist = Number.POSITIVE_INFINITY;
      for (const idx of usableIndices) {
        const dist = colorDistanceSq(rgb, paletteRgb[idx] ?? paletteRgb[0]!);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      }
      if (bestIdx !== 0) {
        pixels.push({ x, y, paletteIndex: bestIdx });
      }
    }
  }
  return { pixels };
};

