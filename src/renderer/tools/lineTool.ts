import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePaletteStore } from '@/state/paletteStore';
import { usePreviewStore } from '@/state/previewStore';
import { usePixelStore } from '@/state/pixelStore';
import { useHistoryStore } from '@/state/historyStore';

const drawLine = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  paletteIndex: number
) => {
  const preview = usePreviewStore.getState();
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    preview.setPixel(x0, y0, paletteIndex);
    if (x0 === x1 && y0 === y1) {
      break;
    }
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
};

export class LineTool implements Tool {
  id = 'line';
  private start: { x: number; y: number } | null = null;
  private activeIndex = 0;
  private changes = new Map<string, { x: number; y: number; prev: number; next: number }>();

  onHover = (cursor: CursorState) => {
    if (this.start) {
      return;
    }
    const preview = usePreviewStore.getState();
    preview.clear();
    const palette = usePaletteStore.getState();
    const gridX = Math.floor(cursor.canvasX / PIXEL_SIZE);
    const gridY = Math.floor(cursor.canvasY / PIXEL_SIZE);
    preview.setPixel(gridX, gridY, palette.primaryIndex);
  };

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    const palette = usePaletteStore.getState();
    this.activeIndex = cursor.secondary ? palette.secondaryIndex : palette.primaryIndex;
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
    const rawEnd = {
      x: Math.floor(cursor.canvasX / PIXEL_SIZE),
      y: Math.floor(cursor.canvasY / PIXEL_SIZE),
    };
    let end = rawEnd;
    if (cursor.shift) {
      const dx = rawEnd.x - this.start.x;
      const dy = rawEnd.y - this.start.y;
      const angle = Math.atan2(dy, dx);
      const snapped = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);
      const length = Math.max(Math.abs(dx), Math.abs(dy));
      end = {
        x: this.start.x + Math.round(Math.cos(snapped) * length),
        y: this.start.y + Math.round(Math.sin(snapped) * length),
      };
    }
    drawLine(this.start.x, this.start.y, end.x, end.y, this.activeIndex);
  };

  onEnd = () => {
    if (!this.start) {
      return;
    }
    const preview = usePreviewStore.getState();
    const pixelStore = usePixelStore.getState();
    this.changes.clear();
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
