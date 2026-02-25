import type { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE, TILE_SIZE } from '@/core/grid';
import { usePreviewStore } from '@/state/previewStore';
import { useSelectionStore } from '@/state/selectionStore';
import type { SelectionSnap } from '@/state/selectionRectangleStore';
import { useSelectionRectangleStore } from '@/state/selectionRectangleStore';
import { useWorkspaceStore } from '@/state/workspaceStore';

type GridPoint = { x: number; y: number };

type PixelBounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

const toGridPoint = (cursor: CursorState): GridPoint => ({
  x: Math.floor(cursor.canvasX / PIXEL_SIZE),
  y: Math.floor(cursor.canvasY / PIXEL_SIZE),
});

const snapPoint = (point: GridPoint, snap: SelectionSnap): GridPoint => {
  if (snap === 'tile') {
    return {
      x: Math.floor(point.x / TILE_SIZE),
      y: Math.floor(point.y / TILE_SIZE),
    };
  }
  return point;
};

const toSnappedPoint = (cursor: CursorState, snap: SelectionSnap) =>
  snapPoint(toGridPoint(cursor), snap);

const toPixelBounds = (start: GridPoint, end: GridPoint, snap: SelectionSnap): PixelBounds => {
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  if (snap === 'tile') {
    return {
      minX: minX * TILE_SIZE,
      maxX: (maxX + 1) * TILE_SIZE - 1,
      minY: minY * TILE_SIZE,
      maxY: (maxY + 1) * TILE_SIZE - 1,
    };
  }

  return { minX, maxX, minY, maxY };
};

const forEachOvalPixel = (bounds: PixelBounds, handler: (x: number, y: number) => void) => {
  const { minX, maxX, minY, maxY } = bounds;
  const rx = (maxX - minX) / 2;
  const ry = (maxY - minY) / 2;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  if (rx === 0 && ry === 0) {
    handler(minX, minY);
    return;
  }
  if (rx === 0) {
    for (let y = minY; y <= maxY; y += 1) {
      handler(minX, y);
    }
    return;
  }
  if (ry === 0) {
    for (let x = minX; x <= maxX; x += 1) {
      handler(x, minY);
    }
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
        handler(x, y);
      }
    }
  }
};

export class SelectionOvalTool implements Tool {
  id = 'selection-oval';
  private start: GridPoint | null = null;
  private last: GridPoint | null = null;
  private isRemoving = false;
  private snap: SelectionSnap = 'pixel';

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.isRemoving = cursor.ctrl;
    this.snap =
      useWorkspaceStore.getState().mode === 'tile'
        ? 'tile'
        : useSelectionRectangleStore.getState().snap;
    this.start = toSnappedPoint(cursor, this.snap);
    this.last = this.start;
  };

  onMove = (cursor: CursorState) => {
    if (!this.start) {
      return;
    }
    const preview = usePreviewStore.getState();
    preview.clear();
    const end = toSnappedPoint(cursor, this.snap);
    this.last = end;
    const bounds = toPixelBounds(this.start, end, this.snap);
    forEachOvalPixel(bounds, (x, y) => preview.setPixel(x, y, 1));
  };

  onEnd = (cursor?: CursorState) => {
    if (!this.start) {
      return;
    }
    const preview = usePreviewStore.getState();
    const selection = useSelectionStore.getState();
    const end = cursor ? toSnappedPoint(cursor, this.snap) : this.last ?? this.start;
    const bounds = toPixelBounds(this.start, end, this.snap);
    const selected = !this.isRemoving;
    const pixels: Array<{ x: number; y: number; selected: boolean }> = [];
    forEachOvalPixel(bounds, (x, y) => {
      pixels.push({ x, y, selected });
    });
    selection.setSelections(pixels);
    preview.clear();
    this.start = null;
    this.last = null;
    this.isRemoving = false;
  };

  onCancel = () => {
    const preview = usePreviewStore.getState();
    preview.clear();
    this.start = null;
    this.last = null;
    this.isRemoving = false;
  };
}
