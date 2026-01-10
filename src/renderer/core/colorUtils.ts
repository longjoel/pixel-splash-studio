export type Rgb = { r: number; g: number; b: number };

const clampByte = (value: number) => Math.min(255, Math.max(0, Math.round(value)));

export const hexToRgb = (hex: string): Rgb | null => {
  const normalized = hex.trim();
  if (!normalized.startsWith('#')) {
    return null;
  }
  const value = normalized.slice(1);
  if (value.length === 3) {
    const r = Number.parseInt(value[0] + value[0], 16);
    const g = Number.parseInt(value[1] + value[1], 16);
    const b = Number.parseInt(value[2] + value[2], 16);
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
      return null;
    }
    return { r, g, b };
  }
  if (value.length === 6) {
    const r = Number.parseInt(value.slice(0, 2), 16);
    const g = Number.parseInt(value.slice(2, 4), 16);
    const b = Number.parseInt(value.slice(4, 6), 16);
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
      return null;
    }
    return { r, g, b };
  }
  return null;
};

export const toRgb = (rgb: Rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

export const toRgba = (rgb: Rgb, alpha: number) =>
  `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

export const mix = (from: Rgb, to: Rgb, amount: number): Rgb => ({
  r: clampByte(from.r + (to.r - from.r) * amount),
  g: clampByte(from.g + (to.g - from.g) * amount),
  b: clampByte(from.b + (to.b - from.b) * amount),
});

const toHexByte = (value: number) => clampByte(value).toString(16).padStart(2, '0');

export const rgbToHex = (rgb: Rgb) =>
  `#${toHexByte(rgb.r)}${toHexByte(rgb.g)}${toHexByte(rgb.b)}`;

export const getComplement = (rgb: Rgb): Rgb => ({
  r: 255 - rgb.r,
  g: 255 - rgb.g,
  b: 255 - rgb.b,
});

const luminance = (rgb: Rgb) =>
  (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;

const getContrastColor = (rgb: Rgb): Rgb =>
  luminance(rgb) > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };

const colorDistance = (a: Rgb, b: Rgb) =>
  Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b);

export const ensureContrast = (base: Rgb, candidate: Rgb, minDistance = 60) =>
  colorDistance(base, candidate) < minDistance ? getContrastColor(base) : candidate;
