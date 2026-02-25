import type { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE, TILE_SIZE } from '@/core/grid';
import { usePreviewStore } from '@/state/previewStore';
import { useSelectionStore } from '@/state/selectionStore';
import type { SelectionSnap } from '@/state/selectionRectangleStore';
import { useSelectionRectangleStore } from '@/state/selectionRectangleStore';
import { useWorkspaceStore } from '@/state/workspaceStore';

type GridPoint = { x: number; y: number };

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

const toPixelBounds = (start: GridPoint, end: GridPoint, snap: SelectionSnap) => {
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

const drawFilledRect = (
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
  const preview = usePreviewStore.getState();
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      preview.setPixel(x, y, 1);
    }
  }
};

export class SelectionRectangleTool implements Tool {
  id = 'selection-rect';
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
    drawFilledRect({ x: bounds.minX, y: bounds.minY }, { x: bounds.maxX, y: bounds.maxY });
  };

  onEnd = (cursor?: CursorState) => {
    if (!this.start) {
      return;
    }
    const preview = usePreviewStore.getState();
    const selection = useSelectionStore.getState();
    const end = cursor
      ? toSnappedPoint(cursor, this.snap)
      : this.last ?? this.start;
    const bounds = toPixelBounds(this.start, end, this.snap);
    const selected = !this.isRemoving;
    const pixels: Array<{ x: number; y: number; selected: boolean }> = [];
    for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
      for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
        pixels.push({ x, y, selected });
      }
    }
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
