import { describe, it, expect, beforeEach } from 'vitest';
import { TextureRollTool } from '@/tools/textureRollTool';
import { useHistoryStore } from '@/state/historyStore';
import { usePixelStore } from '@/state/pixelStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useSelectionRectangleStore } from '@/state/selectionRectangleStore';
import { PIXEL_SIZE } from '@/core/grid';

const cursorAt = (x: number, y: number) => ({
  screenX: 0,
  screenY: 0,
  canvasX: x * PIXEL_SIZE,
  canvasY: y * PIXEL_SIZE,
  primary: true,
  alt: false,
  ctrl: false,
  shift: false,
});

describe('Scroll selection tool', () => {
  beforeEach(() => {
    usePixelStore.getState().clear();
    useSelectionStore.getState().clear();
    useHistoryStore.getState().clear();
    useSelectionRectangleStore.getState().setSnap('pixel');
  });

  it('scrolls selected pixels as you drag (wraps at selection bounds)', () => {
    const pixelStore = usePixelStore.getState();
    const layerId = pixelStore.activeLayerId;

    // 3x1 selection with values [1,2,3]
    pixelStore.setPixelsInLayer(layerId, [
      { x: 0, y: 0, paletteIndex: 1 },
      { x: 1, y: 0, paletteIndex: 2 },
      { x: 2, y: 0, paletteIndex: 3 },
    ]);
    useSelectionStore.getState().setSelections([
      { x: 0, y: 0, selected: true },
      { x: 1, y: 0, selected: true },
      { x: 2, y: 0, selected: true },
    ]);

    const tool = new TextureRollTool();
    tool.onBegin?.(cursorAt(1, 0));
    tool.onMove?.(cursorAt(2, 0)); // drag right 1px
    tool.onEnd?.();

    expect(pixelStore.getPixelInLayer(layerId, 0, 0)).toBe(3);
    expect(pixelStore.getPixelInLayer(layerId, 1, 0)).toBe(1);
    expect(pixelStore.getPixelInLayer(layerId, 2, 0)).toBe(2);

    expect(useHistoryStore.getState().undoStack).toHaveLength(1);
  });

  it('does not lose pixels when the selection has gaps', () => {
    const pixelStore = usePixelStore.getState();
    const layerId = pixelStore.activeLayerId;

    pixelStore.setPixelsInLayer(layerId, [
      { x: 0, y: 0, paletteIndex: 1 },
      { x: 2, y: 0, paletteIndex: 2 },
    ]);
    useSelectionStore.getState().setSelections([
      { x: 0, y: 0, selected: true },
      { x: 2, y: 0, selected: true },
    ]);

    const tool = new TextureRollTool();
    tool.onBegin?.(cursorAt(0, 0));
    tool.onMove?.(cursorAt(1, 0)); // drag right 1px
    tool.onEnd?.();

    expect(pixelStore.getPixelInLayer(layerId, 0, 0)).toBe(2);
    expect(pixelStore.getPixelInLayer(layerId, 2, 0)).toBe(1);
  });
});
