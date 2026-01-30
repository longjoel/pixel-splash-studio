import type { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePaletteStore } from '@/state/paletteStore';
import { usePreviewStore } from '@/state/previewStore';
import { usePixelStore } from '@/state/pixelStore';
import { useHistoryStore } from '@/state/historyStore';
import { useBrushStore } from '@/state/brushStore';
import { useSelectionStore } from '@/state/selectionStore';

const getBrushOffsets = (radius: number, shape: 'square' | 'round') => {
  const offsets: Array<[number, number]> = [];
  const min = -radius;
  const max = radius;

  for (let y = min; y <= max; y += 1) {
    for (let x = min; x <= max; x += 1) {
      if (shape === 'round' && x * x + y * y > radius * radius) {
        continue;
      }
      offsets.push([x, y]);
    }
  }

  return offsets;
};

const setPreviewPixel = (x: number, y: number, paletteIndex: number) => {
  const selection = useSelectionStore.getState();
  if (selection.selectedCount > 0 && !selection.isSelected(x, y)) {
    return;
  }
  usePreviewStore.getState().setPixel(x, y, paletteIndex);
};

const applyBrush = (x: number, y: number, paletteIndex: number) => {
  const { size, shape } = useBrushStore.getState();
  if (shape === 'point') {
    setPreviewPixel(x, y, paletteIndex);
    return;
  }
  const offsets = getBrushOffsets(size, shape);
  for (const [dx, dy] of offsets) {
    setPreviewPixel(x + dx, y + dy, paletteIndex);
  }
};

const drawPoint = (cursor: CursorState, paletteIndex: number) => {
  const gridX = Math.floor(cursor.canvasX / PIXEL_SIZE);
  const gridY = Math.floor(cursor.canvasY / PIXEL_SIZE);
  applyBrush(gridX, gridY, paletteIndex);
};

export class PenTool implements Tool {
  id = 'pen';
  private drawing = false;
  private layerId: string | null = null;
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
    this.layerId = usePixelStore.getState().activeLayerId;
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
      const dx = Math.abs(nextPoint.x - this.lastPoint.x);
      const dy = Math.abs(nextPoint.y - this.lastPoint.y);
      const sx = this.lastPoint.x < nextPoint.x ? 1 : -1;
      const sy = this.lastPoint.y < nextPoint.y ? 1 : -1;
      let err = dx - dy;
      let x = this.lastPoint.x;
      let y = this.lastPoint.y;

      while (true) {
        applyBrush(x, y, this.activeIndex);
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
    const start = performance.now();
    const preview = usePreviewStore.getState();
    const pixelStore = usePixelStore.getState();
    const layerId = this.layerId ?? pixelStore.activeLayerId;
    const pixelsToCommit: Array<{ x: number; y: number; paletteIndex: number }> = [];
    let entryCount = 0;
    for (const pixel of preview.entries()) {
      entryCount += 1;
      const key = `${pixel.x}:${pixel.y}`;
      if (!this.changes.has(key)) {
        this.changes.set(key, {
          x: pixel.x,
          y: pixel.y,
          prev: pixelStore.getPixelInLayer(layerId, pixel.x, pixel.y),
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
    pixelStore.setPixelsInLayer(layerId, pixelsToCommit);
    const afterPixels = performance.now();
    const history = useHistoryStore.getState();
    history.pushBatch({ layerId, changes: Array.from(this.changes.values()) });
    const afterHistory = performance.now();
    this.changes.clear();
    preview.clear();
    this.drawing = false;
    this.layerId = null;
    this.lastPoint = null;
    const end = performance.now();
    window.debugApi?.logPerf(
      [
        'pen:onEnd',
        `entries=${entryCount}`,
        `pixelsMs=${(afterPixels - start).toFixed(2)}`,
        `historyMs=${(afterHistory - afterPixels).toFixed(2)}`,
        `totalMs=${(end - start).toFixed(2)}`,
      ].join(' ')
    );
  };

  onCancel = () => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.changes.clear();
    this.drawing = false;
    this.layerId = null;
    this.lastPoint = null;
  };
}
