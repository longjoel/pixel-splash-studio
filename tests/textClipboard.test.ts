import { describe, expect, it } from 'vitest';
import { applyGradientToRasterizedText, quantizeFontSize } from '@/services/textClipboard';

describe('quantizeFontSize', () => {
  it('clamps to 8..32 and snaps to multiples of 8', () => {
    expect(quantizeFontSize(0)).toBe(8);
    expect(quantizeFontSize(7)).toBe(8);
    expect(quantizeFontSize(8)).toBe(8);
    expect(quantizeFontSize(9)).toBe(8);
    expect(quantizeFontSize(15)).toBe(16);
    expect(quantizeFontSize(16)).toBe(16);
    expect(quantizeFontSize(23)).toBe(24);
    expect(quantizeFontSize(31)).toBe(32);
    expect(quantizeFontSize(32)).toBe(32);
    expect(quantizeFontSize(100)).toBe(32);
  });
});

describe('applyGradientToRasterizedText', () => {
  it('maps pixels across bounds using the selected ramp', () => {
    const rasterized = {
      width: 3,
      height: 1,
      pixels: [
        { x: 0, y: 0, paletteIndex: 0 },
        { x: 1, y: 0, paletteIndex: 0 },
        { x: 2, y: 0, paletteIndex: 0 },
      ],
    };

    const ramp = [10, 11, 12];
    const out = applyGradientToRasterizedText(rasterized, ramp, 'left-right', 'none');
    expect(out.pixels.map((pixel) => pixel.paletteIndex)).toEqual([10, 11, 12]);
  });
});
