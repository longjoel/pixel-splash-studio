import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePaletteStore } from '@/state/paletteStore';
import { usePreviewStore } from '@/state/previewStore';
import { usePixelStore } from '@/state/pixelStore';
import { useHistoryStore } from '@/state/historyStore';
import { useRectangleStore } from '@/state/rectangleStore';

const drawFilledRect = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  paletteIndex: number
) => {
  const preview = usePreviewStore.getState();
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      preview.setPixel(x, y, paletteIndex);
    }
  }
};

const drawOutlineRect = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  paletteIndex: number
) => {
  const preview = usePreviewStore.getState();
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  for (let x = minX; x <= maxX; x += 1) {
    preview.setPixel(x, minY, paletteIndex);
    preview.setPixel(x, maxY, paletteIndex);
  }
  for (let y = minY + 1; y <= maxY - 1; y += 1) {
    preview.setPixel(minX, y, paletteIndex);
    preview.setPixel(maxX, y, paletteIndex);
  }
};

export class RectangleTool implements Tool {
  id = 'rectangle';
  private start: { x: number; y: number } | null = null;
  private activeIndex = 0;
  private activePrimary = 0;
  private activeSecondary = 0;
  private changes = new Map<string, { x: number; y: number; prev: number; next: number }>();

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    const palette = usePaletteStore.getState();
    this.activeIndex = cursor.secondary ? palette.secondaryIndex : palette.primaryIndex;
    this.activePrimary = palette.primaryIndex;
    this.activeSecondary = palette.secondaryIndex;
    this.start = {
      x: Math.floor(cursor.canvasX / PIXEL_SIZE),
      y: Math.floor(cursor.canvasY / PIXEL_SIZE),
    };
  };

  onMove = (cursor: CursorState) => {
    if (!this.start) {
      return;
    }
    const preview = usePreviewStore.getState();
    preview.clear();
    const end = {
      x: Math.floor(cursor.canvasX / PIXEL_SIZE),
      y: Math.floor(cursor.canvasY / PIXEL_SIZE),
    };
    const mode = useRectangleStore.getState().mode;
    if (mode === 'filled') {
      drawFilledRect(this.start, end, this.activeIndex);
      return;
    }
    if (mode === 'outlined') {
      drawOutlineRect(this.start, end, this.activeIndex);
      return;
    }
    drawFilledRect(this.start, end, this.activeSecondary);
    drawOutlineRect(this.start, end, this.activePrimary);
  };

  onEnd = () => {
    if (!this.start) {
      return;
    }
    const preview = usePreviewStore.getState();
    const pixelStore = usePixelStore.getState();
    this.changes.clear();
    const pixelsToCommit: Array<{ x: number; y: number; paletteIndex: number }> = [];
    for (const pixel of preview.entries()) {
      const key = `${pixel.x}:${pixel.y}`;
      if (!this.changes.has(key)) {
        this.changes.set(key, {
          x: pixel.x,
          y: pixel.y,
          prev: pixelStore.getPixel(pixel.x, pixel.y),
          next: pixel.paletteIndex,
        });
      } else {
        const entry = this.changes.get(key);
        if (entry) {
          entry.next = pixel.paletteIndex;
        }
      }
      pixelsToCommit.push({ x: pixel.x, y: pixel.y, paletteIndex: pixel.paletteIndex });
    }
    if (pixelsToCommit.length > 0) {
      pixelStore.setPixels(pixelsToCommit);
      const history = useHistoryStore.getState();
      history.pushBatch({ changes: Array.from(this.changes.values()) });
    }
    preview.clear();
    this.start = null;
    this.changes.clear();
  };

  onCancel = () => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.start = null;
    this.changes.clear();
  };
}
