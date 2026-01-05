import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePaletteStore } from '@/state/paletteStore';
import { usePreviewStore } from '@/state/previewStore';
import { usePixelStore } from '@/state/pixelStore';
import { useHistoryStore } from '@/state/historyStore';
import { useOvalStore } from '@/state/ovalStore';

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

const drawFilledOval = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  paletteIndex: number
) => {
  const preview = usePreviewStore.getState();
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);
  const rx = (maxX - minX) / 2;
  const ry = (maxY - minY) / 2;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  if (rx === 0 && ry === 0) {
    preview.setPixel(minX, minY, paletteIndex);
    return;
  }
  if (rx === 0) {
    drawLine(minX, minY, minX, maxY, paletteIndex);
    return;
  }
  if (ry === 0) {
    drawLine(minX, minY, maxX, minY, paletteIndex);
    return;
  }

  const rxSq = rx * rx;
  const rySq = ry * ry;
  for (let y = minY; y <= maxY; y += 1) {
    const dy = y - centerY;
    for (let x = minX; x <= maxX; x += 1) {
      const dx = x - centerX;
      const value = (dx * dx) / rxSq + (dy * dy) / rySq;
      if (value <= 1) {
        preview.setPixel(x, y, paletteIndex);
      }
    }
  }
};

const drawOutlineOval = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  paletteIndex: number
) => {
  const preview = usePreviewStore.getState();
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);
  const rx = (maxX - minX) / 2;
  const ry = (maxY - minY) / 2;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  if (rx === 0 && ry === 0) {
    preview.setPixel(minX, minY, paletteIndex);
    return;
  }
  if (rx === 0) {
    drawLine(minX, minY, minX, maxY, paletteIndex);
    return;
  }
  if (ry === 0) {
    drawLine(minX, minY, maxX, minY, paletteIndex);
    return;
  }

  const rxSq = rx * rx;
  const rySq = ry * ry;

  for (let x = minX; x <= maxX; x += 1) {
    const dx = x - centerX;
    const value = 1 - (dx * dx) / rxSq;
    if (value < 0) {
      continue;
    }
    const yOffset = Math.sqrt(value) * ry;
    const yTop = Math.round(centerY - yOffset);
    const yBottom = Math.round(centerY + yOffset);
    preview.setPixel(x, yTop, paletteIndex);
    preview.setPixel(x, yBottom, paletteIndex);
  }

  for (let y = minY; y <= maxY; y += 1) {
    const dy = y - centerY;
    const value = 1 - (dy * dy) / rySq;
    if (value < 0) {
      continue;
    }
    const xOffset = Math.sqrt(value) * rx;
    const xLeft = Math.round(centerX - xOffset);
    const xRight = Math.round(centerX + xOffset);
    preview.setPixel(xLeft, y, paletteIndex);
    preview.setPixel(xRight, y, paletteIndex);
  }
};

export class OvalTool implements Tool {
  id = 'oval';
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
    const mode = useOvalStore.getState().mode;
    if (mode === 'filled') {
      drawFilledOval(this.start, end, this.activeIndex);
      return;
    }
    if (mode === 'outlined') {
      drawOutlineOval(this.start, end, this.activeIndex);
      return;
    }
    drawFilledOval(this.start, end, this.activeSecondary);
    drawOutlineOval(this.start, end, this.activePrimary);
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
