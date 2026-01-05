import { useSelectionStore } from '@/state/selectionStore';
import { usePixelStore } from '@/state/pixelStore';
import { useClipboardStore, ClipboardPixel } from '@/state/clipboardStore';
import { useHistoryStore } from '@/state/historyStore';
import { useToolStore } from '@/state/toolStore';
import { BLOCK_SIZE } from '@/core/canvasStore';

type CollectedSelection = {
  pixels: Array<{ x: number; y: number; paletteIndex: number }>;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

const collectSelectionPixels = (): CollectedSelection | null => {
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

const commitClipboard = (selection: CollectedSelection) => {
  const origin = { x: selection.minX, y: selection.minY };
  const width = selection.maxX - selection.minX + 1;
  const height = selection.maxY - selection.minY + 1;
  const normalized: ClipboardPixel[] = selection.pixels.map((pixel) => ({
    x: pixel.x - origin.x,
    y: pixel.y - origin.y,
    paletteIndex: pixel.paletteIndex,
  }));
  useClipboardStore.getState().setBuffer({
    pixels: normalized,
    origin,
    width,
    height,
  });
};

export const copySelectionToClipboard = () => {
  const selection = collectSelectionPixels();
  if (!selection) {
    return;
  }
  commitClipboard(selection);
  useSelectionStore.getState().clear();
  useToolStore.getState().setActiveTool('stamp');
};

export const cutSelectionToClipboard = () => {
  const selection = collectSelectionPixels();
  if (!selection) {
    return;
  }
  commitClipboard(selection);

  const pixelStore = usePixelStore.getState();
  const changes: Array<{ x: number; y: number; prev: number; next: number }> = [];
  const pixelsToCommit: Array<{ x: number; y: number; paletteIndex: number }> = [];
  for (const pixel of selection.pixels) {
    if (pixel.paletteIndex === 0) {
      continue;
    }
    changes.push({ x: pixel.x, y: pixel.y, prev: pixel.paletteIndex, next: 0 });
    pixelsToCommit.push({ x: pixel.x, y: pixel.y, paletteIndex: 0 });
  }

  if (pixelsToCommit.length > 0) {
    pixelStore.setPixels(pixelsToCommit);
    useHistoryStore.getState().pushBatch({ changes });
  }

  useSelectionStore.getState().clear();
  useToolStore.getState().setActiveTool('stamp');
};
