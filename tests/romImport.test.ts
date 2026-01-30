import { describe, expect, test } from 'vitest';
import {
  applyPaletteMap,
  buildNearestPaletteMap,
  buildUnusedPaletteMap,
  clampRect,
  extractIndexedRegion,
  scaleIndexedNearest,
} from '../src/renderer/services/romImport';

describe('romImport', () => {
  test('clampRect clamps to image bounds', () => {
    expect(clampRect({ x: -5, y: -5, width: 999, height: 999 }, 10, 8)).toEqual({
      x: 0,
      y: 0,
      width: 10,
      height: 8,
    });
    expect(clampRect({ x: 9, y: 7, width: 5, height: 5 }, 10, 8)).toEqual({
      x: 9,
      y: 7,
      width: 1,
      height: 1,
    });
  });

  test('extractIndexedRegion slices rows correctly', () => {
    const pixels = Uint8Array.from([
      0, 1, 2, 3,
      4, 5, 6, 7,
      8, 9, 10, 11,
      12, 13, 14, 15,
    ]);
    const region = extractIndexedRegion(pixels, 4, 4, { x: 1, y: 1, width: 2, height: 2 });
    expect(region.width).toBe(2);
    expect(region.height).toBe(2);
    expect(Array.from(region.pixels)).toEqual([5, 6, 9, 10]);
  });

  test('scaleIndexedNearest replicates pixels', () => {
    const pixels = Uint8Array.from([
      1, 2,
      3, 4,
    ]);
    const scaled = scaleIndexedNearest(pixels, 2, 2, 2);
    expect(scaled.width).toBe(4);
    expect(scaled.height).toBe(4);
    expect(Array.from(scaled.pixels.slice(0, 4))).toEqual([1, 1, 2, 2]);
    expect(Array.from(scaled.pixels.slice(4, 8))).toEqual([1, 1, 2, 2]);
    expect(Array.from(scaled.pixels.slice(8, 12))).toEqual([3, 3, 4, 4]);
    expect(Array.from(scaled.pixels.slice(12, 16))).toEqual([3, 3, 4, 4]);
  });

  test('buildNearestPaletteMap maps to nearest existing entry (excluding 0 when possible)', () => {
    const sourcePalette: Array<[number, number, number]> = [
      [0, 0, 0],
      [250, 0, 0],
      [0, 250, 0],
      [0, 0, 250],
    ];
    const targetPaletteHex = ['#000000', '#ff0000', '#00ff00', '#0000ff'];
    const map = buildNearestPaletteMap(sourcePalette, targetPaletteHex);
    expect(map.get(0)).toBe(0);
    expect(map.get(1)).toBe(1);
    expect(map.get(2)).toBe(2);
    expect(map.get(3)).toBe(3);
  });

  test('buildUnusedPaletteMap chooses unused slots then appends', () => {
    const sourcePaletteHex = ['#000000', '#111111', '#222222', '#333333'];
    const targetPaletteHex = ['#000000', '#aaaaaa', '#bbbbbb'];
    const used = new Set<number>([1]); // slot 2 is unused
    const { map, palette } = buildUnusedPaletteMap(sourcePaletteHex, targetPaletteHex, used);

    expect(map.get(0)).toBe(0);
    expect(map.get(1)).toBe(2); // uses existing unused slot
    expect(map.get(2)).toBe(3); // appended
    expect(map.get(3)).toBe(4); // appended
    expect(palette[2]).toBe('#111111');
    expect(palette[3]).toBe('#222222');
    expect(palette[4]).toBe('#333333');
  });

  test('applyPaletteMap remaps indices', () => {
    const map = new Map<number, number>([
      [0, 0],
      [1, 10],
      [2, 20],
    ]);
    const out = applyPaletteMap(Uint8Array.from([0, 1, 2, 2, 1]), map);
    expect(Array.from(out)).toEqual([0, 10, 20, 20, 10]);
  });
});

