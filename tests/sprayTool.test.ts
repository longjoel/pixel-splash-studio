import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SprayTool } from '@/tools/sprayTool';
import { useHistoryStore } from '@/state/historyStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { usePreviewStore } from '@/state/previewStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useSprayStore } from '@/state/sprayStore';
import { useViewportStore } from '@/state/viewportStore';

const makeCursor = () => ({
  screenX: 500,
  screenY: 500,
  canvasX: 0,
  canvasY: 0,
  primary: true,
  alt: false,
  ctrl: false,
  shift: false,
});

describe('SprayTool', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(0));
    useViewportStore.getState().setSize(1000, 1000);
    useViewportStore.getState().setCamera({ x: 0, y: 0, zoom: 1 });
    usePixelStore.getState().clear();
    usePreviewStore.getState().clear();
    useHistoryStore.getState().clear();
    useSelectionStore.getState().clear();
    usePaletteStore.getState().setSelectedIndices([1]);
    useSprayStore.getState().setRadius(3);
    useSprayStore.getState().setDensity(100);
    useSprayStore.getState().setFalloff(0);
    useSprayStore.getState().setDeterministic(true);
    useSprayStore.getState().setSeed(123);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('sprays deterministically with a seed and commits as one history batch', () => {
    const tool = new SprayTool();
    tool.onBegin?.(makeCursor());

    vi.advanceTimersByTime(64);

    tool.onEnd?.(makeCursor());

    const pixelStore = usePixelStore.getState();
    const activeLayer =
      pixelStore.layers.find((layer) => layer.id === pixelStore.activeLayerId) ??
      pixelStore.layers[0];
    const pixels = activeLayer?.store.getBlocks() ?? [];
    expect(pixels.length).toBeGreaterThan(0);

    const history = useHistoryStore.getState();
    expect(history.undoStack).toHaveLength(1);
    expect(history.redoStack).toHaveLength(0);
    expect(history.undoStack[0]?.changes.length).toBeGreaterThan(0);

    const committed = Array.from(history.undoStack[0]?.changes ?? [])
      .filter((change) => change.next !== change.prev)
      .map((change) => `${change.x}:${change.y}:${change.next}`)
      .sort();

    expect(committed).toMatchInlineSnapshot(`
      [
        "-1:0:1",
        "-2:2:1",
        "0:-1:1",
        "2:-2:1",
      ]
    `);
  });
});
