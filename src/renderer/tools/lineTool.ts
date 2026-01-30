import type { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePaletteStore } from '@/state/paletteStore';
import { usePreviewStore } from '@/state/previewStore';
import { usePixelStore } from '@/state/pixelStore';
import { useHistoryStore } from '@/state/historyStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useFillBucketStore } from '@/state/fillBucketStore';
import { getPaletteSelectionRamp } from '@/services/paletteRamp';
import { computeGradientPaletteMap, type Bounds } from '@/services/gradientRamp';

const setPreviewPixel = (x: number, y: number, paletteIndex: number) => {
  const selection = useSelectionStore.getState();
  if (selection.selectedCount > 0 && !selection.isSelected(x, y)) {
    return;
  }
  usePreviewStore.getState().setPixel(x, y, paletteIndex);
};

const drawLine = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  paletteIndex: number
) => {
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    setPreviewPixel(x0, y0, paletteIndex);
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

const collectLinePoints = (
  x0: number,
  y0: number,
  x1: number,
  y1: number
) => {
  const points: Array<{ x: number; y: number }> = [];
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    points.push({ x: x0, y: y0 });
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
  return points;
};

export class LineTool implements Tool {
  id = 'line';
  private start: { x: number; y: number } | null = null;
  private layerId: string | null = null;
  private activeIndex = 0;
  private activeRamp: number[] = [];
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
    setPreviewPixel(gridX, gridY, palette.primaryIndex);
  };

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    const palette = usePaletteStore.getState();
    this.layerId = usePixelStore.getState().activeLayerId;
    this.activeIndex = cursor.secondary ? palette.secondaryIndex : palette.primaryIndex;
    this.activeRamp = getPaletteSelectionRamp();
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
    const ramp = this.activeRamp.length > 1 ? this.activeRamp : [];
    if (ramp.length > 1) {
      const bounds: Bounds = {
        minX: Math.min(this.start.x, end.x),
        maxX: Math.max(this.start.x, end.x),
        minY: Math.min(this.start.y, end.y),
        maxY: Math.max(this.start.y, end.y),
      };
      const points = collectLinePoints(this.start.x, this.start.y, end.x, end.y);
      const { gradientDirection, gradientDither } = useFillBucketStore.getState();
      const paletteMap = computeGradientPaletteMap(
        points,
        bounds,
        ramp,
        gradientDirection,
        gradientDither
      );
      for (const point of points) {
        setPreviewPixel(point.x, point.y, paletteMap.get(`${point.x}:${point.y}`) ?? ramp[0] ?? 0);
      }
    } else {
      drawLine(this.start.x, this.start.y, end.x, end.y, this.activeIndex);
    }
  };

  onEnd = () => {
    if (!this.start) {
      return;
    }
    const preview = usePreviewStore.getState();
    const pixelStore = usePixelStore.getState();
    const layerId = this.layerId ?? pixelStore.activeLayerId;
    this.changes.clear();
    for (const pixel of preview.entries()) {
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
      pixelStore.setPixelInLayer(layerId, pixel.x, pixel.y, pixel.paletteIndex);
    }
    const history = useHistoryStore.getState();
    history.pushBatch({ layerId, changes: Array.from(this.changes.values()) });
    preview.clear();
    this.start = null;
    this.layerId = null;
    this.changes.clear();
    this.activeRamp = [];
  };

  onCancel = () => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.start = null;
    this.layerId = null;
    this.changes.clear();
    this.activeRamp = [];
  };
}
