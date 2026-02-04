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

const fillEnclosedPixelsFromStroke = (strokePixels: Array<{ x: number; y: number }>) => {
  if (strokePixels.length === 0) {
    return [];
  }

  let minX = strokePixels[0]?.x ?? 0;
  let maxX = strokePixels[0]?.x ?? 0;
  let minY = strokePixels[0]?.y ?? 0;
  let maxY = strokePixels[0]?.y ?? 0;
  for (const pixel of strokePixels) {
    minX = Math.min(minX, pixel.x);
    maxX = Math.max(maxX, pixel.x);
    minY = Math.min(minY, pixel.y);
    maxY = Math.max(maxY, pixel.y);
  }

  const pad = 1;
  const originX = minX - pad;
  const originY = minY - pad;
  const width = maxX - minX + 1 + pad * 2;
  const height = maxY - minY + 1 + pad * 2;

  if (width <= 0 || height <= 0) {
    return [];
  }

  const cellCount = width * height;
  // Safety cap: avoid huge allocations if the user somehow creates an enormous lasso.
  if (cellCount > 5_000_000) {
    return strokePixels;
  }

  const boundary = new Uint8Array(cellCount);
  for (const pixel of strokePixels) {
    const localX = pixel.x - originX;
    const localY = pixel.y - originY;
    if (localX < 0 || localX >= width || localY < 0 || localY >= height) {
      continue;
    }
    boundary[localX + localY * width] = 1;
  }

  const visited = new Uint8Array(cellCount);
  const queue: number[] = [];
  let head = 0;

  const enqueue = (localX: number, localY: number) => {
    const idx = localX + localY * width;
    if (visited[idx] === 1 || boundary[idx] === 1) {
      return;
    }
    visited[idx] = 1;
    queue.push(idx);
  };

  // Seed flood-fill from the padded bounding box edges (outside region).
  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  while (head < queue.length) {
    const idx = queue[head] ?? 0;
    head += 1;
    const localX = idx % width;
    const localY = Math.floor(idx / width);

    if (localX > 0) {
      enqueue(localX - 1, localY);
    }
    if (localX + 1 < width) {
      enqueue(localX + 1, localY);
    }
    if (localY > 0) {
      enqueue(localX, localY - 1);
    }
    if (localY + 1 < height) {
      enqueue(localX, localY + 1);
    }
  }

  const filled: Array<{ x: number; y: number }> = [];
  for (let localY = 1; localY < height - 1; localY += 1) {
    for (let localX = 1; localX < width - 1; localX += 1) {
      const idx = localX + localY * width;
      const isBoundary = boundary[idx] === 1;
      const isOutside = visited[idx] === 1;
      if (!isOutside || isBoundary) {
        filled.push({ x: originX + localX, y: originY + localY });
      }
    }
  }

  return filled;
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

    const { shape } = useBrushStore.getState();
    const startPoint = this.startPoint;
    const endPoint = this.lastPoint;
    if (startPoint && endPoint && (startPoint.x !== endPoint.x || startPoint.y !== endPoint.y)) {
      drawLinePreview(endPoint, startPoint);
    }

    const path: GridPoint[] = [];
    for (const point of this.path) {
      const last = path[path.length - 1];
      if (!last || last.x !== point.x || last.y !== point.y) {
        path.push(point);
      }
    }
    const start = startPoint ?? path[0] ?? null;
    const last = path[path.length - 1] ?? null;
    if (start && last && (start.x !== last.x || start.y !== last.y)) {
      path.push(start);
    }

    const strokePixels = Array.from(preview.entries()).map((pixel) => ({ x: pixel.x, y: pixel.y }));
    const fillPixels = shape === 'point' ? fillPolygonPixels(path) : fillEnclosedPixelsFromStroke(strokePixels);
    const pixels: Array<{ x: number; y: number; selected: boolean }> = (
      fillPixels.length > 0 ? fillPixels : strokePixels
    ).map((pixel) => ({ x: pixel.x, y: pixel.y, selected }));
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
