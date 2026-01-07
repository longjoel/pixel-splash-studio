import { useSelectionStore } from '@/state/selectionStore';
import { usePixelStore } from '@/state/pixelStore';
import { BLOCK_SIZE } from '@/core/canvasStore';

export type CollectedSelection = {
  pixels: Array<{ x: number; y: number; paletteIndex: number }>;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export const collectSelectionPixels = (): CollectedSelection | null => {
  const selection = useSelectionStore.getState();
  if (selection.selectedCount === 0) {
    return null;
  }
  const pixelStore = usePixelStore.getState();
  const pixels: Array<{ x: number; y: number; paletteIndex: number }> = [];
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  const blocks = selection.store.getBlocks();
  for (const { row, col, block } of blocks) {
    const baseX = col * BLOCK_SIZE;
    const baseY = row * BLOCK_SIZE;
    for (let y = 0; y < BLOCK_SIZE; y += 1) {
      for (let x = 0; x < BLOCK_SIZE; x += 1) {
        if (block[y * BLOCK_SIZE + x] !== 1) {
          continue;
        }
        const worldX = baseX + x;
        const worldY = baseY + y;
        const paletteIndex = pixelStore.getPixel(worldX, worldY);
        pixels.push({ x: worldX, y: worldY, paletteIndex });
        minX = Math.min(minX, worldX);
        maxX = Math.max(maxX, worldX);
        minY = Math.min(minY, worldY);
        maxY = Math.max(maxY, worldY);
      }
    }
  }

  if (pixels.length === 0) {
    return null;
  }

  return { pixels, minX, maxX, minY, maxY };
};
