import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePaletteStore } from '@/state/paletteStore';
import { usePreviewStore } from '@/state/previewStore';
import { usePixelStore } from '@/state/pixelStore';
import { useHistoryStore } from '@/state/historyStore';

const drawPoint = (cursor: CursorState, paletteIndex: number) => {
  const gridX = Math.floor(cursor.canvasX / PIXEL_SIZE);
  const gridY = Math.floor(cursor.canvasY / PIXEL_SIZE);
  const preview = usePreviewStore.getState();
  preview.setPixel(gridX, gridY, paletteIndex);
};

export class PenTool implements Tool {
  id = 'pen';
  private drawing = false;
  private activeIndex = 0;
  private changes = new Map<string, { x: number; y: number; prev: number; next: number }>();
  private lastPoint: { x: number; y: number } | null = null;

  onHover = (cursor: CursorState) => {
    if (this.drawing) {
      return;
    }
    const preview = usePreviewStore.getState();
    preview.clear();
    const palette = usePaletteStore.getState();
    drawPoint(cursor, palette.primaryIndex);
  };

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    const palette = usePaletteStore.getState();
    this.activeIndex = cursor.secondary ? palette.secondaryIndex : palette.primaryIndex;
    this.drawing = true;
    this.changes.clear();
    drawPoint(cursor, this.activeIndex);
    this.lastPoint = {
      x: Math.floor(cursor.canvasX / PIXEL_SIZE),
      y: Math.floor(cursor.canvasY / PIXEL_SIZE),
    };
  };

  onMove = (cursor: CursorState) => {
    if (!this.drawing) {
      this.onHover(cursor);
      return;
    }
    const nextPoint = {
      x: Math.floor(cursor.canvasX / PIXEL_SIZE),
      y: Math.floor(cursor.canvasY / PIXEL_SIZE),
    };
    if (this.lastPoint) {
      const preview = usePreviewStore.getState();
      const dx = Math.abs(nextPoint.x - this.lastPoint.x);
      const dy = Math.abs(nextPoint.y - this.lastPoint.y);
      const sx = this.lastPoint.x < nextPoint.x ? 1 : -1;
      const sy = this.lastPoint.y < nextPoint.y ? 1 : -1;
      let err = dx - dy;
      let x = this.lastPoint.x;
      let y = this.lastPoint.y;

      while (true) {
        preview.setPixel(x, y, this.activeIndex);
        if (x === nextPoint.x && y === nextPoint.y) {
          break;
        }
        const e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          x += sx;
        }
        if (e2 < dx) {
          err += dx;
          y += sy;
        }
      }
    } else {
      drawPoint(cursor, this.activeIndex);
    }
    this.lastPoint = nextPoint;
  };

  onEnd = () => {
    if (!this.drawing) {
      return;
    }
    const preview = usePreviewStore.getState();
    const pixelStore = usePixelStore.getState();
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
      pixelStore.setPixel(pixel.x, pixel.y, pixel.paletteIndex);
    }
    const history = useHistoryStore.getState();
    history.pushBatch({ changes: Array.from(this.changes.values()) });
    this.changes.clear();
    preview.clear();
    this.drawing = false;
    this.lastPoint = null;
  };

  onCancel = () => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.changes.clear();
    this.drawing = false;
    this.lastPoint = null;
  };
}
