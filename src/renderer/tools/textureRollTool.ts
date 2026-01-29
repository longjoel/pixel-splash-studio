import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE, TILE_SIZE } from '@/core/grid';
import { BLOCK_SIZE } from '@/core/canvasStore';
import { usePreviewStore } from '@/state/previewStore';
import { usePixelStore } from '@/state/pixelStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useHistoryStore } from '@/state/historyStore';
import { useSelectionRectangleStore } from '@/state/selectionRectangleStore';

type GridPoint = { x: number; y: number };

const mod = (value: number, size: number) => {
  const remainder = value % size;
  return remainder < 0 ? remainder + size : remainder;
};

const toGridPoint = (cursor: CursorState): GridPoint => ({
  x: Math.floor(cursor.canvasX / PIXEL_SIZE),
  y: Math.floor(cursor.canvasY / PIXEL_SIZE),
});

export class TextureRollTool implements Tool {
  id = 'texture-roll';

  private startCursor: GridPoint | null = null;
  private layerId: string | null = null;
  private dragging = false;
  private didMove = false;
  private selectedPixels: Array<{ x: number; y: number }> = [];
  private originalPixels: Map<string, number> = new Map();
  private rowGroups: Map<number, number[]> = new Map();
  private colGroups: Map<number, number[]> = new Map();
  private lastDx = 0;
  private lastDy = 0;

  private getStepSize() {
    const snap = useSelectionRectangleStore.getState().snap;
    return snap === 'tile' ? TILE_SIZE : 1;
  }

  private collectSelection() {
    const selection = useSelectionStore.getState();
    if (selection.selectedCount === 0) {
      return null;
    }

    const blocks = selection.store.getBlocks();
    const pixels: Array<{ x: number; y: number }> = [];
    const rows = new Map<number, number[]>();
    const cols = new Map<number, number[]>();

    for (const { row, col, block } of blocks) {
      const baseX = col * BLOCK_SIZE;
      const baseY = row * BLOCK_SIZE;
      for (let y = 0; y < BLOCK_SIZE; y += 1) {
        for (let x = 0; x < BLOCK_SIZE; x += 1) {
          if (block[y * BLOCK_SIZE + x] !== 1) {
            continue;
          }
          const worldX = baseX + x;
          const worldY = baseY + y;
          pixels.push({ x: worldX, y: worldY });
          const rowList = rows.get(worldY) ?? [];
          rowList.push(worldX);
          rows.set(worldY, rowList);
          const colList = cols.get(worldX) ?? [];
          colList.push(worldY);
          cols.set(worldX, colList);
        }
      }
    }

    if (pixels.length === 0) {
      return null;
    }

    for (const list of rows.values()) {
      list.sort((a, b) => a - b);
    }
    for (const list of cols.values()) {
      list.sort((a, b) => a - b);
    }

    return {
      pixels,
      rows,
      cols,
    };
  }

  private rotateRow(map: Map<string, number>, y: number, shift: number) {
    const xs = this.rowGroups.get(y);
    if (!xs || xs.length <= 1) {
      return;
    }
    const len = xs.length;
    const delta = mod(shift, len);
    if (delta === 0) {
      return;
    }
    const values = xs.map((x) => map.get(`${x}:${y}`) ?? 0);
    for (let i = 0; i < len; i += 1) {
      const srcIndex = mod(i - delta, len);
      const x = xs[i]!;
      map.set(`${x}:${y}`, values[srcIndex] ?? 0);
    }
  }

  private rotateCol(map: Map<string, number>, x: number, shift: number) {
    const ys = this.colGroups.get(x);
    if (!ys || ys.length <= 1) {
      return;
    }
    const len = ys.length;
    const delta = mod(shift, len);
    if (delta === 0) {
      return;
    }
    const values = ys.map((y) => map.get(`${x}:${y}`) ?? 0);
    for (let i = 0; i < len; i += 1) {
      const srcIndex = mod(i - delta, len);
      const y = ys[i]!;
      map.set(`${x}:${y}`, values[srcIndex] ?? 0);
    }
  }

  private applyOffset(dx: number, dy: number) {
    if (!this.layerId) {
      return;
    }
    if (dx === this.lastDx && dy === this.lastDy) {
      return;
    }
    this.lastDx = dx;
    this.lastDy = dy;
    this.didMove = this.didMove || dx !== 0 || dy !== 0;

    const step = this.getStepSize();
    const shiftX = Math.trunc(dx / step);
    const shiftY = Math.trunc(dy / step);

    const current = new Map(this.originalPixels);
    if (shiftX !== 0) {
      for (const y of this.rowGroups.keys()) {
        this.rotateRow(current, y, shiftX);
      }
    }
    if (shiftY !== 0) {
      for (const x of this.colGroups.keys()) {
        this.rotateCol(current, x, shiftY);
      }
    }

    const pixelsToSet: Array<{ x: number; y: number; paletteIndex: number }> = [];
    for (const pixel of this.selectedPixels) {
      pixelsToSet.push({
        x: pixel.x,
        y: pixel.y,
        paletteIndex: current.get(`${pixel.x}:${pixel.y}`) ?? 0,
      });
    }
    usePixelStore.getState().setPixelsInLayer(this.layerId, pixelsToSet);
  }

  onBegin = (cursor: CursorState) => {
    usePreviewStore.getState().clear();
    if (cursor.secondary) {
      return;
    }
    const selection = useSelectionStore.getState();
    if (selection.selectedCount === 0) {
      return;
    }
    const point = toGridPoint(cursor);
    if (!selection.isSelected(point.x, point.y)) {
      return;
    }

    const collected = this.collectSelection();
    if (!collected) {
      return;
    }

    this.startCursor = point;
    this.layerId = usePixelStore.getState().activeLayerId;
    this.dragging = true;
    this.didMove = false;
    this.selectedPixels = collected.pixels;
    this.rowGroups = collected.rows;
    this.colGroups = collected.cols;
    this.originalPixels = new Map();
    this.lastDx = 0;
    this.lastDy = 0;

    const pixelStore = usePixelStore.getState();
    for (const pixel of this.selectedPixels) {
      this.originalPixels.set(
        `${pixel.x}:${pixel.y}`,
        pixelStore.getPixelInLayer(this.layerId, pixel.x, pixel.y)
      );
    }
  };

  onMove = (cursor: CursorState) => {
    if (!this.dragging || !this.startCursor) {
      return;
    }
    const now = toGridPoint(cursor);
    const step = this.getStepSize();
    const dx = Math.round((now.x - this.startCursor.x) / step) * step;
    const dy = Math.round((now.y - this.startCursor.y) / step) * step;
    this.applyOffset(dx, dy);
  };

  onEnd = () => {
    if (!this.dragging || !this.layerId) {
      return;
    }
    const pixelStore = usePixelStore.getState();
    const changes: Array<{ x: number; y: number; prev: number; next: number }> = [];
    if (this.didMove) {
      for (const pixel of this.selectedPixels) {
        const key = `${pixel.x}:${pixel.y}`;
        const prev = this.originalPixels.get(key) ?? 0;
        const next = pixelStore.getPixelInLayer(this.layerId, pixel.x, pixel.y);
        if (prev === next) {
          continue;
        }
        changes.push({ x: pixel.x, y: pixel.y, prev, next });
      }
    }
    if (changes.length > 0) {
      useHistoryStore.getState().pushBatch({ layerId: this.layerId, changes });
    }

    usePreviewStore.getState().clear();
    this.startCursor = null;
    this.layerId = null;
    this.dragging = false;
    this.didMove = false;
    this.selectedPixels = [];
    this.originalPixels = new Map();
    this.rowGroups = new Map();
    this.colGroups = new Map();
    this.lastDx = 0;
    this.lastDy = 0;
  };

  onCancel = () => {
    usePreviewStore.getState().clear();
    if (this.dragging && this.layerId) {
      const pixelStore = usePixelStore.getState();
      const restore: Array<{ x: number; y: number; paletteIndex: number }> = [];
      for (const pixel of this.selectedPixels) {
        restore.push({
          x: pixel.x,
          y: pixel.y,
          paletteIndex: this.originalPixels.get(`${pixel.x}:${pixel.y}`) ?? 0,
        });
      }
      pixelStore.setPixelsInLayer(this.layerId, restore);
    }

    this.startCursor = null;
    this.layerId = null;
    this.dragging = false;
    this.didMove = false;
    this.selectedPixels = [];
    this.originalPixels = new Map();
    this.rowGroups = new Map();
    this.colGroups = new Map();
    this.lastDx = 0;
    this.lastDy = 0;
  };
}
