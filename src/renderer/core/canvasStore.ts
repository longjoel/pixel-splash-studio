import { BLOCK_SIZE } from '../../constants';

export { BLOCK_SIZE };

export type BlockAddress = {
  row: number;
  col: number;
  localX: number;
  localY: number;
};

const floorDiv = (value: number, size: number) => Math.floor(value / size);

const mod = (value: number, size: number) => {
  const remainder = value % size;
  return remainder < 0 ? remainder + size : remainder;
};

export const getBlockAddress = (x: number, y: number): BlockAddress => {
  const row = floorDiv(y, BLOCK_SIZE);
  const col = floorDiv(x, BLOCK_SIZE);

  return {
    row,
    col,
    localX: mod(x, BLOCK_SIZE),
    localY: mod(y, BLOCK_SIZE),
  };
};

const blockKey = (row: number, col: number) => `${row}:${col}`;

export class CanvasStore {
  private blocks = new Map<string, Uint8Array>();

  getPixel(x: number, y: number): number {
    const { row, col, localX, localY } = getBlockAddress(x, y);
    const block = this.blocks.get(blockKey(row, col));
    if (!block) {
      return 0;
    }

    return block[localY * BLOCK_SIZE + localX];
  }

  setPixel(x: number, y: number, paletteIndex: number) {
    const { row, col, localX, localY } = getBlockAddress(x, y);
    const key = blockKey(row, col);
    let block = this.blocks.get(key);
    if (!block) {
      block = new Uint8Array(BLOCK_SIZE * BLOCK_SIZE);
      this.blocks.set(key, block);
    }

    block[localY * BLOCK_SIZE + localX] = paletteIndex;
  }

  setBlock(row: number, col: number, data: Uint8Array) {
    if (data.length !== BLOCK_SIZE * BLOCK_SIZE) {
      throw new Error('Invalid block size');
    }
    this.blocks.set(blockKey(row, col), data);
  }

  getBlock(row: number, col: number) {
    return this.blocks.get(blockKey(row, col));
  }

  clear() {
    this.blocks.clear();
  }

  getBlocks() {
    const entries: Array<{ row: number; col: number; block: Uint8Array }> = [];
    for (const [key, block] of this.blocks.entries()) {
      const [rowText, colText] = key.split(':');
      const row = Number(rowText);
      const col = Number(colText);
      entries.push({ row, col, block });
    }
    return entries;
  }
}
