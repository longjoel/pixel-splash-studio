import type { CursorState, Tool } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { useHistoryStore } from '@/state/historyStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { usePreviewStore } from '@/state/previewStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useSprayStore } from '@/state/sprayStore';

type PixelChange = { x: number; y: number; prev: number; next: number };

type FrameHandle = number | ReturnType<typeof setTimeout>;

const scheduleFrame =
  typeof requestAnimationFrame === 'function'
    ? (callback: FrameRequestCallback): FrameHandle => requestAnimationFrame(callback)
    : (callback: FrameRequestCallback) =>
        globalThis.setTimeout(() => callback(Date.now()), 16);

const cancelFrame =
  typeof cancelAnimationFrame === 'function'
    ? (handle: FrameHandle) => cancelAnimationFrame(handle as number)
    : (handle: FrameHandle) => globalThis.clearTimeout(handle as ReturnType<typeof setTimeout>);

const setPreviewPixel = (cursor: CursorState, x: number, y: number, paletteIndex: number) => {
  const selection = useSelectionStore.getState();
  if (selection.selectedCount > 0 && !selection.isSelected(x, y)) {
    return;
  }
  usePreviewStore.getState().setPixel(x, y, paletteIndex);
};

const getSelectedPaletteIndices = () => {
  const palette = usePaletteStore.getState();
  const selection = palette.selectedIndices.filter(
    (idx, pos, arr) => arr.indexOf(idx) === pos && idx >= 0 && idx < palette.colors.length
  );
  return selection;
};

// Mulberry32 PRNG
const mulberry32 = (seed: number) => {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export class SprayTool implements Tool {
  id = 'spray';

  private drawing = false;
  private layerId: string | null = null;
  private activeIndex = 0;
  private lastCursor: CursorState | null = null;
  private frameHandle: FrameHandle | null = null;
  private lastFrameTime = 0;
  private emissionBudget = 0;
  private changes = new Map<string, PixelChange>();
  private rng: (() => number) | null = null;

  private stopLoop() {
    if (this.frameHandle != null) {
      cancelFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  private step = (now: number) => {
    if (!this.drawing || !this.lastCursor) {
      this.stopLoop();
      return;
    }

    const settings = useSprayStore.getState();
    const cursor = this.lastCursor;
    const dtMs = this.lastFrameTime === 0 ? 0 : now - this.lastFrameTime;
    this.lastFrameTime = now;
    const dt = Math.min(0.1, Math.max(0, dtMs / 1000));
    this.emissionBudget += settings.density * dt;

    const maxPerFrame = 1500;
    const emitCount = Math.min(maxPerFrame, Math.floor(this.emissionBudget));
    this.emissionBudget -= emitCount;

    if (emitCount > 0) {
      const centerX = Math.floor(cursor.canvasX / PIXEL_SIZE);
      const centerY = Math.floor(cursor.canvasY / PIXEL_SIZE);
      const radius = Math.max(1, settings.radius);
      const falloff = Math.min(1, Math.max(0, settings.falloff));
      const exp = 0.5 + falloff * 2.5;
      const random = this.rng ?? Math.random;
      const selectedIndices =
        this.activeIndex === 0 ? [0] : getSelectedPaletteIndices();
      const useDither = selectedIndices.length > 1;
      const ditherIndices = useDither ? selectedIndices : null;
      const singleIndex = selectedIndices[0] ?? this.activeIndex;

      for (let i = 0; i < emitCount; i += 1) {
        const angle = random() * Math.PI * 2;
        const u = random();
        const r = Math.pow(u, exp) * radius;
        const dx = Math.round(Math.cos(angle) * r);
        const dy = Math.round(Math.sin(angle) * r);
        const paletteIndex = useDither
          ? (ditherIndices?.[Math.floor(random() * (ditherIndices?.length ?? 1))] ??
            0)
          : singleIndex;
        setPreviewPixel(cursor, centerX + dx, centerY + dy, paletteIndex);
      }
    }

    this.frameHandle = scheduleFrame(this.step);
  };

  onHover = (cursor: CursorState) => {
    if (this.drawing) {
      return;
    }
    const preview = usePreviewStore.getState();
    preview.clear();
    const palette = usePaletteStore.getState();
    const x = Math.floor(cursor.canvasX / PIXEL_SIZE);
    const y = Math.floor(cursor.canvasY / PIXEL_SIZE);
    const paletteIndex = cursor.alt ? 0 : palette.getActiveIndex();
    setPreviewPixel(cursor, x, y, paletteIndex);
  };

  onBegin = (cursor: CursorState) => {
    const preview = usePreviewStore.getState();
    preview.clear();
    const palette = usePaletteStore.getState();
    this.layerId = usePixelStore.getState().activeLayerId;
    this.activeIndex = cursor.alt ? 0 : palette.getActiveIndex();
    this.drawing = true;
    this.changes.clear();
    this.lastCursor = cursor;
    this.emissionBudget = 0;
    this.lastFrameTime =
      typeof requestAnimationFrame === 'function' ? performance.now() : Date.now();
    const { deterministic, seed } = useSprayStore.getState();
    this.rng = deterministic ? mulberry32(seed) : null;
    this.stopLoop();
    this.frameHandle = scheduleFrame(this.step);
  };

  onMove = (cursor: CursorState) => {
    if (!this.drawing) {
      this.onHover(cursor);
      return;
    }
    this.lastCursor = cursor;
  };

  onEnd = () => {
    if (!this.drawing) {
      return;
    }
    this.stopLoop();
    const preview = usePreviewStore.getState();
    const pixelStore = usePixelStore.getState();
    const layerId = this.layerId ?? pixelStore.activeLayerId;
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

    pixelStore.setPixelsInLayer(layerId, pixelsToCommit);
    useHistoryStore
      .getState()
      .pushBatch({ layerId, changes: Array.from(this.changes.values()) });
    preview.clear();
    this.changes.clear();
    this.drawing = false;
    this.layerId = null;
    this.lastCursor = null;
    this.rng = null;
    this.lastFrameTime = 0;
    this.emissionBudget = 0;
  };

  onCancel = () => {
    this.stopLoop();
    usePreviewStore.getState().clear();
    this.changes.clear();
    this.drawing = false;
    this.layerId = null;
    this.lastCursor = null;
    this.rng = null;
    this.lastFrameTime = 0;
    this.emissionBudget = 0;
  };
}
