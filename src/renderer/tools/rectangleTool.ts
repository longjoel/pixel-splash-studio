import type { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePaletteStore } from '@/state/paletteStore';
import { usePreviewStore } from '@/state/previewStore';
import { usePixelStore } from '@/state/pixelStore';
import { useHistoryStore } from '@/state/historyStore';
import { useRectangleStore } from '@/state/rectangleStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useFillBucketStore } from '@/state/fillBucketStore';
import { getPaletteSelectionRamp } from '@/services/paletteRamp';
import { computeGradientPaletteMap, type Bounds } from '@/services/gradientRamp';

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
    this.activeIndex = cursor.alt ? 0 : palette.getActiveIndex();
    this.activeRamp = cursor.alt ? [] : getPaletteSelectionRamp();
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
    const bounds: Bounds = {
      minX: Math.min(this.start.x, end.x),
      maxX: Math.max(this.start.x, end.x),
      minY: Math.min(this.start.y, end.y),
      maxY: Math.max(this.start.y, end.y),
    };

    if (ramp.length > 1) {
      const selection = useSelectionStore.getState();
      const points: Array<{ x: number; y: number }> = [];

      if (mode === 'filled') {
        for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
          for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
            if (selection.selectedCount > 0 && !selection.isSelected(x, y)) {
              continue;
            }
            points.push({ x, y });
          }
        }
      } else {
        for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
          if (selection.selectedCount === 0 || selection.isSelected(x, bounds.minY)) {
            points.push({ x, y: bounds.minY });
          }
          if (selection.selectedCount === 0 || selection.isSelected(x, bounds.maxY)) {
            points.push({ x, y: bounds.maxY });
          }
        }
        for (let y = bounds.minY + 1; y <= bounds.maxY - 1; y += 1) {
          if (selection.selectedCount === 0 || selection.isSelected(bounds.minX, y)) {
            points.push({ x: bounds.minX, y });
          }
          if (selection.selectedCount === 0 || selection.isSelected(bounds.maxX, y)) {
            points.push({ x: bounds.maxX, y });
          }
        }
      }

      const { gradientDirection, gradientDither } = useFillBucketStore.getState();
      const paletteMap = computeGradientPaletteMap(
        points,
        bounds,
        ramp,
        gradientDirection,
        gradientDither
      );
      for (const point of points) {
        preview.setPixel(point.x, point.y, paletteMap.get(`${point.x}:${point.y}`) ?? ramp[0] ?? 0);
      }
      return;
    }
    if (mode === 'filled') {
      drawFilledRect(this.start, end, this.activeIndex);
      return;
    }
    drawOutlineRect(this.start, end, this.activeIndex);
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
