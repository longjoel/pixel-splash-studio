import { describe, it, expect } from 'vitest';
import { BLOCK_SIZE, CanvasStore, getBlockAddress } from '@/core/canvasStore';

describe('CanvasStore', () => {
  it('maps negative coordinates into the correct block and local position', () => {
    const address = getBlockAddress(-1, -1);
    expect(address.row).toBe(-1);
    expect(address.col).toBe(-1);
    expect(address.localX).toBe(BLOCK_SIZE - 1);
    expect(address.localY).toBe(BLOCK_SIZE - 1);
  });

  it('reads and writes palette indices across block boundaries', () => {
    const store = new CanvasStore();
    store.setPixel(0, 0, 7);
    store.setPixel(BLOCK_SIZE, BLOCK_SIZE, 12);

    expect(store.getPixel(0, 0)).toBe(7);
    expect(store.getPixel(BLOCK_SIZE, BLOCK_SIZE)).toBe(12);
    expect(store.getPixel(-1, -1)).toBe(0);
  });
});
