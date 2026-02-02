import type { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePaletteStore } from '@/state/paletteStore';
import { usePreviewStore } from '@/state/previewStore';
import { usePixelStore } from '@/state/pixelStore';
import { useHistoryStore } from '@/state/historyStore';
import { useOvalStore } from '@/state/ovalStore';
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

const drawFilledOval = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  paletteIndex: number
) => {
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);
  const rx = (maxX - minX) / 2;
  const ry = (maxY - minY) / 2;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  if (rx === 0 && ry === 0) {
    setPreviewPixel(minX, minY, paletteIndex);
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
        setPreviewPixel(x, y, paletteIndex);
      }
    }
  }
};

const drawOutlineOval = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  paletteIndex: number
) => {
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);
  const rx = (maxX - minX) / 2;
  const ry = (maxY - minY) / 2;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  if (rx === 0 && ry === 0) {
    setPreviewPixel(minX, minY, paletteIndex);
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
    setPreviewPixel(x, yTop, paletteIndex);
    setPreviewPixel(x, yBottom, paletteIndex);
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
    setPreviewPixel(xLeft, y, paletteIndex);
    setPreviewPixel(xRight, y, paletteIndex);
  }
};

export class OvalTool implements Tool {
  id = 'oval';
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
    const mode = useOvalStore.getState().mode;
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
      const rx = (bounds.maxX - bounds.minX) / 2;
      const ry = (bounds.maxY - bounds.minY) / 2;
      const centerX = (bounds.minX + bounds.maxX) / 2;
      const centerY = (bounds.minY + bounds.maxY) / 2;

      const allow = (x: number, y: number) =>
        selection.selectedCount === 0 || selection.isSelected(x, y);

      const add = (x: number, y: number) => {
        if (!allow(x, y)) {
          return;
        }
        points.push({ x, y });
      };

      if (rx === 0 && ry === 0) {
        add(bounds.minX, bounds.minY);
      } else if (rx === 0) {
        for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
          add(bounds.minX, y);
        }
      } else if (ry === 0) {
        for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
          add(x, bounds.minY);
        }
      } else if (mode === 'filled') {
        const rxSq = rx * rx;
        const rySq = ry * ry;
        for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
          const dy = y - centerY;
          for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
            const dx = x - centerX;
            const value = (dx * dx) / rxSq + (dy * dy) / rySq;
            if (value <= 1) {
              add(x, y);
            }
          }
        }
      } else {
        const rxSq = rx * rx;
        const rySq = ry * ry;
        for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
          const dx = x - centerX;
          const value = 1 - (dx * dx) / rxSq;
          if (value < 0) {
            continue;
          }
          const yOffset = Math.sqrt(value) * ry;
          add(x, Math.round(centerY - yOffset));
          add(x, Math.round(centerY + yOffset));
        }
        for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
          const dy = y - centerY;
          const value = 1 - (dy * dy) / rySq;
          if (value < 0) {
            continue;
          }
          const xOffset = Math.sqrt(value) * rx;
          add(Math.round(centerX - xOffset), y);
          add(Math.round(centerX + xOffset), y);
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
      drawFilledOval(this.start, end, this.activeIndex);
      return;
    }
    drawOutlineOval(this.start, end, this.activeIndex);
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
