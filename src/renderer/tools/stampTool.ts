import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE, TILE_SIZE } from '@/core/grid';
import { useClipboardStore } from '@/state/clipboardStore';
import { usePreviewStore } from '@/state/previewStore';
import { usePixelStore } from '@/state/pixelStore';
import { useHistoryStore } from '@/state/historyStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useStampStore, StampRotation, StampScale } from '@/state/stampStore';
import { duplicateClipboardPalette } from '@/services/clipboardPaletteDuplicate';

type TransformedPixel = { x: number; y: number; paletteIndex: number };

type TransformCache = {
  source: ReturnType<typeof useClipboardStore.getState>['pixels'];
  width: number;
  height: number;
  rotation: StampRotation;
  scale: StampScale;
  flipX: boolean;
  flipY: boolean;
  pixels: TransformedPixel[];
  transformedWidth: number;
  transformedHeight: number;
};

const toGridPoint = (cursor: CursorState) => ({
  x: Math.floor(cursor.canvasX / PIXEL_SIZE),
  y: Math.floor(cursor.canvasY / PIXEL_SIZE),
});

const snapPoint = (point: { x: number; y: number }, snap: 'pixel' | 'tile') => {
  if (snap === 'tile') {
    return {
      x: Math.floor(point.x / TILE_SIZE) * TILE_SIZE,
      y: Math.floor(point.y / TILE_SIZE) * TILE_SIZE,
    };
  }
  return point;
};

const buildTransformedPixels = (
  pixels: Array<{ x: number; y: number; paletteIndex: number }>,
  width: number,
  height: number,
  rotation: StampRotation,
  scale: StampScale,
  flipX: boolean,
  flipY: boolean
) => {
  const rotatedWidth = rotation === 90 || rotation === 270 ? height : width;
  const rotatedHeight = rotation === 90 || rotation === 270 ? width : height;
  const result: TransformedPixel[] = [];

  for (const pixel of pixels) {
    let x = pixel.x;
    let y = pixel.y;
    if (flipX) {
      x = width - 1 - x;
    }
    if (flipY) {
      y = height - 1 - y;
    }

    let rotatedX = x;
    let rotatedY = y;
    if (rotation === 90) {
      rotatedX = height - 1 - y;
      rotatedY = x;
    } else if (rotation === 180) {
      rotatedX = width - 1 - x;
      rotatedY = height - 1 - y;
    } else if (rotation === 270) {
      rotatedX = y;
      rotatedY = width - 1 - x;
    }

    if (scale === 1) {
      result.push({ x: rotatedX, y: rotatedY, paletteIndex: pixel.paletteIndex });
      continue;
    }

    const baseX = rotatedX * scale;
    const baseY = rotatedY * scale;
    for (let dy = 0; dy < scale; dy += 1) {
      for (let dx = 0; dx < scale; dx += 1) {
        result.push({ x: baseX + dx, y: baseY + dy, paletteIndex: pixel.paletteIndex });
      }
    }
  }

  return { pixels: result, width: rotatedWidth * scale, height: rotatedHeight * scale };
};

export class StampTool implements Tool {
  id = 'stamp';
  private cache: TransformCache | null = null;
  private changes = new Map<string, { x: number; y: number; prev: number; next: number }>();
  private dragging = false;
  private lastPoint: { x: number; y: number } | null = null;
  private lastAnchor: { x: number; y: number } | null = null;

  private getTransformed() {
    const clipboard = useClipboardStore.getState();
    if (clipboard.pixels.length === 0 || clipboard.width === 0 || clipboard.height === 0) {
      return null;
    }
    const stamp = useStampStore.getState();
    if (
      this.cache &&
      this.cache.source === clipboard.pixels &&
      this.cache.width === clipboard.width &&
      this.cache.height === clipboard.height &&
      this.cache.rotation === stamp.rotation &&
      this.cache.scale === stamp.scale &&
      this.cache.flipX === stamp.flipX &&
      this.cache.flipY === stamp.flipY
    ) {
      return {
        pixels: this.cache.pixels,
        width: this.cache.transformedWidth,
        height: this.cache.transformedHeight,
      };
    }

    const built = buildTransformedPixels(
      clipboard.pixels,
      clipboard.width,
      clipboard.height,
      stamp.rotation,
      stamp.scale,
      stamp.flipX,
      stamp.flipY
    );
    this.cache = {
      source: clipboard.pixels,
      width: clipboard.width,
      height: clipboard.height,
      rotation: stamp.rotation,
      scale: stamp.scale,
      flipX: stamp.flipX,
      flipY: stamp.flipY,
      pixels: built.pixels,
      transformedWidth: built.width,
      transformedHeight: built.height,
    };
    return { pixels: built.pixels, width: built.width, height: built.height };
  }

  private getAnchor = (
    point: { x: number; y: number },
    width: number,
    height: number
  ) => {
    const stamp = useStampStore.getState();
    const snapped = snapPoint(point, stamp.snap);
    return {
      x: snapped.x - Math.floor(width / 2),
      y: snapped.y - Math.floor(height / 2),
    };
  };

  private renderPreview = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    const transformed = this.getTransformed();
    if (!transformed) {
      return;
    }
    const anchor = this.getAnchor(
      toGridPoint(cursor),
      transformed.width,
      transformed.height
    );
    const selection = useSelectionStore.getState();
    const restrictToSelection = selection.selectedCount > 0;

    for (const pixel of transformed.pixels) {
      if (useStampStore.getState().mode === 'soft' && pixel.paletteIndex === 0) {
        continue;
      }
      const worldX = anchor.x + pixel.x;
      const worldY = anchor.y + pixel.y;
      if (restrictToSelection && !selection.isSelected(worldX, worldY)) {
        continue;
      }
      preview.setPixel(worldX, worldY, pixel.paletteIndex);
    }
  };

  private applyStampAt = (anchorX: number, anchorY: number) => {
    const transformed = this.getTransformed();
    if (!transformed) {
      return;
    }
    const stamp = useStampStore.getState();
    const selection = useSelectionStore.getState();
    const restrictToSelection = selection.selectedCount > 0;
    const pixelStore = usePixelStore.getState();
    const pixelsToCommit: Array<{ x: number; y: number; paletteIndex: number }> = [];

    for (const pixel of transformed.pixels) {
      if (stamp.mode === 'soft' && pixel.paletteIndex === 0) {
        continue;
      }
      const worldX = anchorX + pixel.x;
      const worldY = anchorY + pixel.y;
      if (restrictToSelection && !selection.isSelected(worldX, worldY)) {
        continue;
      }
      const current = pixelStore.getPixel(worldX, worldY);
      if (current === pixel.paletteIndex) {
        continue;
      }
      const key = `${worldX}:${worldY}`;
      if (!this.changes.has(key)) {
        this.changes.set(key, { x: worldX, y: worldY, prev: current, next: pixel.paletteIndex });
      } else {
        const entry = this.changes.get(key);
        if (entry) {
          entry.next = pixel.paletteIndex;
        }
      }
      pixelsToCommit.push({ x: worldX, y: worldY, paletteIndex: pixel.paletteIndex });
    }

    if (pixelsToCommit.length === 0) {
      return;
    }

    pixelStore.setPixels(pixelsToCommit);
  };

  private flushChanges = () => {
    if (this.changes.size === 0) {
      return;
    }
    useHistoryStore.getState().pushBatch({ changes: Array.from(this.changes.values()) });
    this.changes.clear();
  };

  private stampLine = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    let x = from.x;
    let y = from.y;
    const dx = Math.abs(to.x - from.x);
    const dy = Math.abs(to.y - from.y);
    const sx = from.x < to.x ? 1 : -1;
    const sy = from.y < to.y ? 1 : -1;
    let err = dx - dy;

    while (true) {
      const transformed = this.getTransformed();
      if (!transformed) {
        return;
      }
      const anchor = this.getAnchor({ x, y }, transformed.width, transformed.height);
      if (
        !this.lastAnchor ||
        this.lastAnchor.x !== anchor.x ||
        this.lastAnchor.y !== anchor.y
      ) {
        this.applyStampAt(anchor.x, anchor.y);
        this.lastAnchor = anchor;
      }
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

  onHover = (cursor: CursorState) => {
    this.renderPreview(cursor);
  };

  onBegin = (cursor: CursorState) => {
    this.changes.clear();
    this.lastAnchor = null;
    const stamp = useStampStore.getState();
    const dragEnabled = stamp.drag;
    if (!dragEnabled && stamp.pasteDuplicateColors) {
      duplicateClipboardPalette();
    }
    const point = toGridPoint(cursor);
    if (dragEnabled) {
      this.dragging = true;
      this.lastPoint = point;
      this.stampLine(point, point);
      this.renderPreview(cursor);
      return;
    }
    const transformed = this.getTransformed();
    if (!transformed) {
      return;
    }
    const centered = this.getAnchor(point, transformed.width, transformed.height);
    this.applyStampAt(centered.x, centered.y);
    this.flushChanges();
    this.renderPreview(cursor);
  };

  onMove = (cursor: CursorState) => {
    if (this.dragging && this.lastPoint) {
      const nextPoint = toGridPoint(cursor);
      this.stampLine(this.lastPoint, nextPoint);
      this.lastPoint = nextPoint;
    }
    this.renderPreview(cursor);
  };

  onEnd = () => {
    if (this.dragging) {
      this.flushChanges();
    }
    this.dragging = false;
    this.lastPoint = null;
    this.lastAnchor = null;
    usePreviewStore.getState().clear();
  };

  onCancel = () => {
    usePreviewStore.getState().clear();
    this.dragging = false;
    this.lastPoint = null;
    this.lastAnchor = null;
    this.changes.clear();
  };
}
