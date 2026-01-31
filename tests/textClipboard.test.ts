import { describe, expect, it } from 'vitest';
import { quantizeFontSize } from '@/services/textClipboard';

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

