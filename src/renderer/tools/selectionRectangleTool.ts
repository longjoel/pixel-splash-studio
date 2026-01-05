import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePreviewStore } from '@/state/previewStore';
import { useSelectionStore } from '@/state/selectionStore';

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
  private start: { x: number; y: number } | null = null;
  private last: { x: number; y: number } | null = null;
  private isRemoving = false;

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    if (cursor.secondary) {
      useSelectionStore.getState().clear();
      this.start = null;
      this.last = null;
      this.isRemoving = false;
      return;
    }
    this.isRemoving = cursor.ctrl;
    this.start = {
      x: Math.floor(cursor.canvasX / PIXEL_SIZE),
      y: Math.floor(cursor.canvasY / PIXEL_SIZE),
    };
    this.last = this.start;
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
    this.last = end;
    drawFilledRect(this.start, end);
  };

  onEnd = (cursor?: CursorState) => {
    if (!this.start) {
      return;
    }
    const preview = usePreviewStore.getState();
    const selection = useSelectionStore.getState();
    const end = cursor
      ? {
          x: Math.floor(cursor.canvasX / PIXEL_SIZE),
          y: Math.floor(cursor.canvasY / PIXEL_SIZE),
        }
      : this.last ?? this.start;
    const minX = Math.min(this.start.x, end.x);
    const maxX = Math.max(this.start.x, end.x);
    const minY = Math.min(this.start.y, end.y);
    const maxY = Math.max(this.start.y, end.y);
    const selected = !this.isRemoving;
    const pixels: Array<{ x: number; y: number; selected: boolean }> = [];
    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
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
