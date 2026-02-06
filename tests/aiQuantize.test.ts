import { describe, expect, it } from 'vitest';
import { quantizeImageToPalette } from '@/services/aiQuantize';

describe('quantizeImageToPalette', () => {
  it('maps pixels to nearest non-zero palette index', () => {
    const palette = ['#000000', '#ff0000', '#00ff00', '#0000ff'];
    const width = 2;
    const height = 2;
    const data = new Uint8ClampedArray([
      254, 10, 10, 255, 10, 254, 10, 255, 0, 0, 253, 255, 0, 0, 0, 0,
    ]);
    const imageData = { data, width, height } as unknown as ImageData;
    const result = quantizeImageToPalette(imageData, palette, { alphaThreshold: 1 });
    expect(result.pixels).toEqual([
      { x: 0, y: 0, paletteIndex: 1 },
      { x: 1, y: 0, paletteIndex: 2 },
      { x: 0, y: 1, paletteIndex: 3 },
    ]);
  });

  it('skips pixels below alpha threshold', () => {
    const palette = ['#000000', '#ffffff'];
    const width = 1;
    const height = 2;
    const data = new Uint8ClampedArray([255, 255, 255, 0, 255, 255, 255, 2]);
    const imageData = { data, width, height } as unknown as ImageData;
    const result = quantizeImageToPalette(imageData, palette, { alphaThreshold: 2 });
    expect(result.pixels).toEqual([{ x: 0, y: 1, paletteIndex: 1 }]);
  });
});
