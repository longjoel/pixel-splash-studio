import type { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { useBrushStore } from '@/state/brushStore';
import { usePreviewStore } from '@/state/previewStore';
import { useSelectionStore } from '@/state/selectionStore';

type GridPoint = { x: number; y: number };

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

const toGridPoint = (cursor: CursorState): GridPoint => ({
  x: Math.floor(cursor.canvasX / PIXEL_SIZE),
  y: Math.floor(cursor.canvasY / PIXEL_SIZE),
});

const applyBrushPreview = (x: number, y: number) => {
  const { size, shape } = useBrushStore.getState();
  const preview = usePreviewStore.getState();

  if (shape === 'point') {
    preview.setPixel(x, y, 1);
    return;
  }

  const offsets = getBrushOffsets(size, shape);
  for (const [dx, dy] of offsets) {
    preview.setPixel(x + dx, y + dy, 1);
  }
};

const drawLinePreview = (from: GridPoint, to: GridPoint) => {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  const sx = from.x < to.x ? 1 : -1;
  const sy = from.y < to.y ? 1 : -1;
  let err = dx - dy;
  let x = from.x;
  let y = from.y;

  while (true) {
    applyBrushPreview(x, y);
    if (x === to.x && y === to.y) {
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
};

const fillPolygonPixels = (points: GridPoint[]) => {
  if (points.length < 4) {
    return [];
  }

  let minY = points[0]?.y ?? 0;
  let maxY = points[0]?.y ?? 0;
  for (const point of points) {
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }

  const pixels: Array<{ x: number; y: number }> = [];

  for (let y = minY; y <= maxY; y += 1) {
    const ySample = y + 0.5;
    const intersections: number[] = [];

    for (let i = 0; i < points.length - 1; i += 1) {
      const a = points[i];
      const b = points[i + 1];
      if (!a || !b) {
        continue;
      }
      if (a.y === b.y) {
        continue;
      }

      const yMin = Math.min(a.y, b.y);
      const yMax = Math.max(a.y, b.y);

      if (ySample < yMin || ySample >= yMax) {
        continue;
      }

      const t = (ySample - a.y) / (b.y - a.y);
      const x = a.x + t * (b.x - a.x);
      intersections.push(x);
    }

    intersections.sort((lhs, rhs) => lhs - rhs);

    for (let i = 0; i < intersections.length - 1; i += 2) {
      const xA = intersections[i] ?? 0;
      const xB = intersections[i + 1] ?? 0;
      const start = Math.ceil(Math.min(xA, xB) - 0.5);
      const end = Math.floor(Math.max(xA, xB) - 0.5);
      for (let x = start; x <= end; x += 1) {
        pixels.push({ x, y });
      }
    }
  }

  return pixels;
};

export class SelectionLassoTool implements Tool {
  id = 'selection-lasso';
  private drawing = false;
  private isRemoving = false;
  private startPoint: GridPoint | null = null;
  private lastPoint: GridPoint | null = null;
  private path: GridPoint[] = [];

  onHover = (cursor: CursorState) => {
    if (this.drawing) {
      return;
    }
    const preview = usePreviewStore.getState();
    preview.clear();
    const point = toGridPoint(cursor);
    applyBrushPreview(point.x, point.y);
  };

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.drawing = true;
    this.isRemoving = cursor.ctrl;
    const point = toGridPoint(cursor);
    applyBrushPreview(point.x, point.y);
    this.startPoint = point;
    this.lastPoint = point;
    this.path = [point];
  };

  onMove = (cursor: CursorState) => {
    if (!this.drawing) {
      this.onHover(cursor);
      return;
    }
    const nextPoint = toGridPoint(cursor);
    if (this.lastPoint && nextPoint.x === this.lastPoint.x && nextPoint.y === this.lastPoint.y) {
      return;
    }
    if (this.lastPoint) {
      drawLinePreview(this.lastPoint, nextPoint);
    } else {
      applyBrushPreview(nextPoint.x, nextPoint.y);
    }
    this.lastPoint = nextPoint;
    this.path.push(nextPoint);
  };

  onEnd = () => {
    if (!this.drawing) {
      return;
    }
    const preview = usePreviewStore.getState();
    const selection = useSelectionStore.getState();
    const selected = !this.isRemoving;
    const path: GridPoint[] = [];
    for (const point of this.path) {
      const last = path[path.length - 1];
      if (!last || last.x !== point.x || last.y !== point.y) {
        path.push(point);
      }
    }
    const start = this.startPoint ?? path[0] ?? null;
    const last = path[path.length - 1] ?? null;
    if (start && last && (start.x !== last.x || start.y !== last.y)) {
      path.push(start);
    }

    const fillPixels = fillPolygonPixels(path);
    const pixels: Array<{ x: number; y: number; selected: boolean }> =
      fillPixels.length > 0
        ? fillPixels.map((pixel) => ({ x: pixel.x, y: pixel.y, selected }))
        : Array.from(preview.entries()).map((pixel) => ({
            x: pixel.x,
            y: pixel.y,
            selected,
          }));
    selection.setSelections(pixels);
    preview.clear();
    this.drawing = false;
    this.isRemoving = false;
    this.startPoint = null;
    this.lastPoint = null;
    this.path = [];
  };

  onCancel = () => {
    usePreviewStore.getState().clear();
    this.drawing = false;
    this.isRemoving = false;
    this.startPoint = null;
    this.lastPoint = null;
    this.path = [];
  };
}
