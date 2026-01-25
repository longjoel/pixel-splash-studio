import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePaletteStore } from '@/state/paletteStore';
import { usePreviewStore } from '@/state/previewStore';
import { usePixelStore } from '@/state/pixelStore';
import { useHistoryStore } from '@/state/historyStore';
import { useRectangleStore } from '@/state/rectangleStore';
import { useSelectionStore } from '@/state/selectionStore';
import { getPaletteSelectionRamp, paletteIndexFromRamp } from '@/services/paletteRamp';

const drawFilledRect = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  paletteIndex: number
) => {
  const selection = useSelectionStore.getState();
  const preview = usePreviewStore.getState();
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      if (selection.selectedCount > 0 && !selection.isSelected(x, y)) {
        continue;
      }
      preview.setPixel(x, y, paletteIndex);
    }
  }
};

const drawFilledRectGradient = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  ramp: number[]
) => {
  if (ramp.length === 0) {
    return;
  }
  const selection = useSelectionStore.getState();
  const preview = usePreviewStore.getState();
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);
  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);
  const horizontal = width >= height;

  for (let y = minY; y <= maxY; y += 1) {
    const ty = height === 0 ? 0 : (y - minY) / height;
    for (let x = minX; x <= maxX; x += 1) {
      const tx = width === 0 ? 0 : (x - minX) / width;
      const t = horizontal ? tx : ty;
      const paletteIndex = paletteIndexFromRamp(ramp, t);
      if (selection.selectedCount > 0 && !selection.isSelected(x, y)) {
        continue;
      }
      preview.setPixel(x, y, paletteIndex);
    }
  }
};

const drawOutlineRect = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  paletteIndex: number
) => {
  const selection = useSelectionStore.getState();
  const preview = usePreviewStore.getState();
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  for (let x = minX; x <= maxX; x += 1) {
    if (selection.selectedCount === 0 || selection.isSelected(x, minY)) {
      preview.setPixel(x, minY, paletteIndex);
    }
    if (selection.selectedCount === 0 || selection.isSelected(x, maxY)) {
      preview.setPixel(x, maxY, paletteIndex);
    }
  }
  for (let y = minY + 1; y <= maxY - 1; y += 1) {
    if (selection.selectedCount === 0 || selection.isSelected(minX, y)) {
      preview.setPixel(minX, y, paletteIndex);
    }
    if (selection.selectedCount === 0 || selection.isSelected(maxX, y)) {
      preview.setPixel(maxX, y, paletteIndex);
    }
  }
};

const drawOutlineRectGradient = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  ramp: number[]
) => {
  if (ramp.length === 0) {
    return;
  }
  const selection = useSelectionStore.getState();
  const preview = usePreviewStore.getState();
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);
  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);
  const horizontal = width >= height;
  const tFor = (x: number, y: number) =>
    horizontal ? (x - minX) / width : (y - minY) / height;

  for (let x = minX; x <= maxX; x += 1) {
    const t = tFor(x, minY);
    const paletteIndex = paletteIndexFromRamp(ramp, t);
    if (selection.selectedCount === 0 || selection.isSelected(x, minY)) {
      preview.setPixel(x, minY, paletteIndex);
    }
    if (selection.selectedCount === 0 || selection.isSelected(x, maxY)) {
      preview.setPixel(x, maxY, paletteIndexFromRamp(ramp, tFor(x, maxY)));
    }
  }
  for (let y = minY + 1; y <= maxY - 1; y += 1) {
    const leftT = tFor(minX, y);
    const rightT = tFor(maxX, y);
    if (selection.selectedCount === 0 || selection.isSelected(minX, y)) {
      preview.setPixel(minX, y, paletteIndexFromRamp(ramp, leftT));
    }
    if (selection.selectedCount === 0 || selection.isSelected(maxX, y)) {
      preview.setPixel(maxX, y, paletteIndexFromRamp(ramp, rightT));
    }
  }
};

export class RectangleTool implements Tool {
  id = 'rectangle';
  private start: { x: number; y: number } | null = null;
  private layerId: string | null = null;
  private activeIndex = 0;
  private activeRamp: number[] = [];
  private changes = new Map<string, { x: number; y: number; prev: number; next: number }>();

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
    const end = {
      x: Math.floor(cursor.canvasX / PIXEL_SIZE),
      y: Math.floor(cursor.canvasY / PIXEL_SIZE),
    };
    const mode = useRectangleStore.getState().mode;
    const ramp = this.activeRamp.length > 1 ? this.activeRamp : [];
    if (mode === 'filled') {
      if (ramp.length > 0) {
        drawFilledRectGradient(this.start, end, ramp);
      } else {
        drawFilledRect(this.start, end, this.activeIndex);
      }
      return;
    }
    if (ramp.length > 0) {
      drawOutlineRectGradient(this.start, end, ramp);
    } else {
      drawOutlineRect(this.start, end, this.activeIndex);
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
    const pixelsToCommit: Array<{ x: number; y: number; paletteIndex: number }> = [];
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
      pixelsToCommit.push({ x: pixel.x, y: pixel.y, paletteIndex: pixel.paletteIndex });
    }
    if (pixelsToCommit.length > 0) {
      pixelStore.setPixelsInLayer(layerId, pixelsToCommit);
      const history = useHistoryStore.getState();
      history.pushBatch({ layerId, changes: Array.from(this.changes.values()) });
    }
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
