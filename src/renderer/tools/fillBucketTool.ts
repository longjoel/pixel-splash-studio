import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { BLOCK_SIZE } from '@/core/canvasStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useHistoryStore } from '@/state/historyStore';
import { useViewportStore } from '@/state/viewportStore';
import { useFillBucketStore } from '@/state/fillBucketStore';
import { usePreviewStore } from '@/state/previewStore';

type Bounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

const getViewportBounds = (): Bounds | null => {
  const viewport = useViewportStore.getState();
  if (viewport.width === 0 || viewport.height === 0) {
    return null;
  }
  const viewWidth = viewport.width / viewport.camera.zoom;
  const viewHeight = viewport.height / viewport.camera.zoom;
  return {
    minX: Math.floor(viewport.camera.x / PIXEL_SIZE),
    minY: Math.floor(viewport.camera.y / PIXEL_SIZE),
    maxX: Math.floor((viewport.camera.x + viewWidth) / PIXEL_SIZE),
    maxY: Math.floor((viewport.camera.y + viewHeight) / PIXEL_SIZE),
  };
};

const fillSelection = (paletteIndex: number) => {
  const selection = useSelectionStore.getState();
  if (selection.selectedCount === 0) {
    return;
  }
  const pixelStore = usePixelStore.getState();
  const changes: Array<{ x: number; y: number; prev: number; next: number }> = [];
  const pixelsToCommit: Array<{ x: number; y: number; paletteIndex: number }> = [];
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
        const prev = pixelStore.getPixel(worldX, worldY);
        if (prev === paletteIndex) {
          continue;
        }
        changes.push({ x: worldX, y: worldY, prev, next: paletteIndex });
        pixelsToCommit.push({ x: worldX, y: worldY, paletteIndex });
      }
    }
  }
  if (pixelsToCommit.length === 0) {
    return;
  }
  pixelStore.setPixels(pixelsToCommit);
  useHistoryStore.getState().pushBatch({ changes });
};

const fillByColor = (
  startX: number,
  startY: number,
  sourceIndex: number,
  paletteIndex: number
) => {
  if (sourceIndex === paletteIndex) {
    return;
  }
  const selection = useSelectionStore.getState();
  const pixelStore = usePixelStore.getState();
  const restrictToSelection = selection.selectedCount > 0;
  const bounds = restrictToSelection ? null : getViewportBounds();
  if (!restrictToSelection && !bounds) {
    return;
  }
  if (restrictToSelection && !selection.isSelected(startX, startY)) {
    return;
  }

  const visited = new Set<string>();
  const queueX: number[] = [startX];
  const queueY: number[] = [startY];
  const changes: Array<{ x: number; y: number; prev: number; next: number }> = [];
  const pixelsToCommit: Array<{ x: number; y: number; paletteIndex: number }> = [];

  for (let i = 0; i < queueX.length; i += 1) {
    const x = queueX[i];
    const y = queueY[i];
    if (
      bounds &&
      (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY)
    ) {
      continue;
    }
    const key = `${x}:${y}`;
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    if (restrictToSelection && !selection.isSelected(x, y)) {
      continue;
    }
    if (pixelStore.getPixel(x, y) !== sourceIndex) {
      continue;
    }
    if (
      bounds &&
      (x === bounds.minX ||
        x === bounds.maxX ||
        y === bounds.minY ||
        y === bounds.maxY)
    ) {
      return;
    }

    changes.push({ x, y, prev: sourceIndex, next: paletteIndex });
    pixelsToCommit.push({ x, y, paletteIndex });
    queueX.push(x + 1, x - 1, x, x);
    queueY.push(y, y, y + 1, y - 1);
  }

  if (pixelsToCommit.length === 0) {
    return;
  }
  pixelStore.setPixels(pixelsToCommit);
  useHistoryStore.getState().pushBatch({ changes });
};

export class FillBucketTool implements Tool {
  id = 'fill-bucket';

  onBegin = (cursor: CursorState) => {
    usePreviewStore.getState().clear();
    const palette = usePaletteStore.getState();
    const paletteIndex = palette.primaryIndex;
    const mode = useFillBucketStore.getState().mode;
    const startX = Math.floor(cursor.canvasX / PIXEL_SIZE);
    const startY = Math.floor(cursor.canvasY / PIXEL_SIZE);

    if (mode === 'selection') {
      fillSelection(paletteIndex);
      return;
    }

    const sourceIndex = usePixelStore.getState().getPixel(startX, startY);
    fillByColor(startX, startY, sourceIndex, paletteIndex);
  };
}
