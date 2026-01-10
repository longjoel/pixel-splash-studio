import { usePaletteStore } from '@/state/paletteStore';
import { hexToRgb } from '@/core/colorUtils';
import { collectSelectionPixels } from './selectionData';

type Rgb = { r: number; g: number; b: number };

const TARGET_WIDTH = 320;
const TARGET_HEIGHT = 200;

const colorDistance = (a: Rgb, b: Rgb) => {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return dr * dr + dg * dg + db * db;
};

const buildPaletteRgb = (colors: string[]) =>
  colors.map((color) => hexToRgb(color) ?? { r: 0, g: 0, b: 0 });

const pickPaletteIndices = (counts: Map<number, number>, targetCount: number, maxIndex: number) => {
  const entries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const selected = entries.map(([idx]) => idx).filter((idx) => idx <= maxIndex);
  const limited = selected.slice(0, targetCount);
  if (limited.length >= targetCount) {
    return limited;
  }
  for (let i = 0; i <= maxIndex && limited.length < targetCount; i += 1) {
    if (!limited.includes(i)) {
      limited.push(i);
    }
  }
  return limited;
};

const buildTargetRgb = (
  selection: ReturnType<typeof collectSelectionPixels>,
  paletteRgb: Rgb[]
) => {
  if (!selection) {
    return null;
  }
  const data = new Float32Array(TARGET_WIDTH * TARGET_HEIGHT * 3);
  const background = paletteRgb[0] ?? { r: 0, g: 0, b: 0 };
  for (let i = 0; i < TARGET_WIDTH * TARGET_HEIGHT; i += 1) {
    const base = i * 3;
    data[base] = background.r;
    data[base + 1] = background.g;
    data[base + 2] = background.b;
  }

  for (const pixel of selection.pixels) {
    const localX = pixel.x - selection.minX;
    const localY = pixel.y - selection.minY;
    if (localX < 0 || localY < 0 || localX >= TARGET_WIDTH || localY >= TARGET_HEIGHT) {
      continue;
    }
    const color = paletteRgb[pixel.paletteIndex] ?? background;
    const idx = (localY * TARGET_WIDTH + localX) * 3;
    data[idx] = color.r;
    data[idx + 1] = color.g;
    data[idx + 2] = color.b;
  }

  return data;
};

const quantizeToPalette = (data: Float32Array, palette: Rgb[]) => {
  const output = new Uint8Array(TARGET_WIDTH * TARGET_HEIGHT);
  for (let y = 0; y < TARGET_HEIGHT; y += 1) {
    for (let x = 0; x < TARGET_WIDTH; x += 1) {
      const idx = (y * TARGET_WIDTH + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < palette.length; i += 1) {
        const dist = colorDistance({ r, g, b }, palette[i]);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      output[y * TARGET_WIDTH + x] = bestIdx;
    }
  }
  return output;
};

const buildBsaveHeader = (segment: number, offset: number, length: number) => {
  const header = new Uint8Array(7);
  header[0] = 0xfd;
  header[1] = segment & 0xff;
  header[2] = (segment >> 8) & 0xff;
  header[3] = offset & 0xff;
  header[4] = (offset >> 8) & 0xff;
  header[5] = length & 0xff;
  header[6] = (length >> 8) & 0xff;
  return header;
};

const encodeCga = (indices: Uint8Array) => {
  const rowBytes = 80;
  const output = new Uint8Array(rowBytes * TARGET_HEIGHT);
  for (let y = 0; y < TARGET_HEIGHT; y += 1) {
    const bank = (y & 1) * 0x2000;
    const row = (y >> 1) * rowBytes;
    for (let x = 0; x < TARGET_WIDTH; x += 4) {
      const base = y * TARGET_WIDTH + x;
      const p0 = indices[base] & 0x03;
      const p1 = indices[base + 1] & 0x03;
      const p2 = indices[base + 2] & 0x03;
      const p3 = indices[base + 3] & 0x03;
      const packed = (p0 << 6) | (p1 << 4) | (p2 << 2) | p3;
      const byteIndex = x >> 2;
      output[bank + row + byteIndex] = packed;
    }
  }
  return output;
};

const encodeEga = (indices: Uint8Array) => {
  const rowBytes = 40;
  const planeSize = rowBytes * TARGET_HEIGHT;
  const output = new Uint8Array(planeSize * 4);
  for (let y = 0; y < TARGET_HEIGHT; y += 1) {
    for (let x = 0; x < TARGET_WIDTH; x += 1) {
      const color = indices[y * TARGET_WIDTH + x] & 0x0f;
      const byteIndex = (y * rowBytes) + (x >> 3);
      const bit = 7 - (x & 7);
      for (let plane = 0; plane < 4; plane += 1) {
        const planeOffset = plane * planeSize;
        if (color & (1 << plane)) {
          output[planeOffset + byteIndex] |= 1 << bit;
        }
      }
    }
  }
  return output;
};

const encodeVga = (indices: Uint8Array) => indices;

const exportSelectionAsBsave = async (
  mode: 'cga' | 'ega' | 'vga',
  colorCount: number,
  segment: number,
  suggestedName: string
) => {
  if (!window.projectApi?.exportBsave) {
    window.alert('BSAVE export is unavailable. Restart the app to load the latest export support.');
    return null;
  }
  const selection = collectSelectionPixels();
  if (!selection) {
    window.alert('Select a region to export.');
    return null;
  }

  const palette = usePaletteStore.getState().colors;
  const paletteRgb = buildPaletteRgb(palette);
  const counts = new Map<number, number>();
  for (const pixel of selection.pixels) {
    counts.set(pixel.paletteIndex, (counts.get(pixel.paletteIndex) ?? 0) + 1);
  }

  const maxIndex = paletteRgb.length - 1;
  const paletteIndices =
    colorCount >= paletteRgb.length
      ? paletteRgb.map((_color, idx) => idx)
      : pickPaletteIndices(counts, colorCount, maxIndex);
  const reducedPalette = paletteIndices.map((idx) => paletteRgb[idx]);

  const data = buildTargetRgb(selection, paletteRgb);
  if (!data) {
    return null;
  }
  const indices = quantizeToPalette(data, reducedPalette);

  let packed: Uint8Array;
  if (mode === 'cga') {
    packed = encodeCga(indices);
  } else if (mode === 'ega') {
    packed = encodeEga(indices);
  } else {
    packed = encodeVga(indices);
  }

  const header = buildBsaveHeader(segment, 0x0000, packed.length);
  const output = new Uint8Array(header.length + packed.length);
  output.set(header, 0);
  output.set(packed, header.length);

  return window.projectApi.exportBsave(output, suggestedName);
};

export const exportSelectionAsBsaveCga = () =>
  exportSelectionAsBsave(
    'cga',
    4,
    0xb800,
    'pixel-splash-selection-320x200-cga.bsave'
  );

export const exportSelectionAsBsaveEga = () =>
  exportSelectionAsBsave(
    'ega',
    16,
    0xb800,
    'pixel-splash-selection-320x200-ega.bsave'
  );

export const exportSelectionAsBsaveVga = () =>
  exportSelectionAsBsave(
    'vga',
    256,
    0xa000,
    'pixel-splash-selection-320x200-vga.bsave'
  );
