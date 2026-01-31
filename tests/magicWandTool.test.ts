import { beforeEach, describe, expect, it } from 'vitest';
import { MagicWandTool } from '@/tools/magicWandTool';
import { PIXEL_SIZE } from '@/core/grid';
import { usePixelStore } from '@/state/pixelStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useViewportStore } from '@/state/viewportStore';

const cursorAt = (x: number, y: number, overrides?: Partial<ReturnType<typeof cursorAt>>) => ({
  screenX: 0,
  screenY: 0,
  canvasX: x * PIXEL_SIZE,
  canvasY: y * PIXEL_SIZE,
  primary: true,
  secondary: false,
  alt: false,
  ctrl: false,
  shift: false,
  ...(overrides ?? {}),
});

describe('MagicWandTool', () => {
  beforeEach(() => {
    usePixelStore.getState().clear();
    useSelectionStore.getState().clear();
    useViewportStore.getState().setSize(11 * PIXEL_SIZE, 11 * PIXEL_SIZE);
    useViewportStore.getState().setCamera({ x: 0, y: 0, zoom: 1 });
  });

  it('selects connected pixels of the same color', () => {
    const pixelStore = usePixelStore.getState();
    pixelStore.setPixel(1, 1, 5);
    pixelStore.setPixel(2, 1, 5);
    pixelStore.setPixel(1, 2, 5);
    pixelStore.setPixel(5, 5, 5);

    const tool = new MagicWandTool();
    tool.onBegin?.(cursorAt(1, 1));

    const selection = useSelectionStore.getState();
    expect(selection.selectedCount).toBe(3);
    expect(selection.isSelected(1, 1)).toBe(true);
    expect(selection.isSelected(2, 1)).toBe(true);
    expect(selection.isSelected(1, 2)).toBe(true);
    expect(selection.isSelected(5, 5)).toBe(false);
  });

  it('subtracts from selection when ctrl-clicking', () => {
    const pixelStore = usePixelStore.getState();
    pixelStore.setPixel(1, 1, 5);
    pixelStore.setPixel(2, 1, 5);
    pixelStore.setPixel(1, 2, 5);

    useSelectionStore.getState().setSelections([
      { x: 1, y: 1, selected: true },
      { x: 2, y: 1, selected: true },
      { x: 1, y: 2, selected: true },
      { x: 9, y: 9, selected: true },
    ]);
    expect(useSelectionStore.getState().selectedCount).toBe(4);

    const tool = new MagicWandTool();
    tool.onBegin?.(cursorAt(1, 1, { ctrl: true }));

    const selection = useSelectionStore.getState();
    expect(selection.selectedCount).toBe(1);
    expect(selection.isSelected(1, 1)).toBe(false);
    expect(selection.isSelected(2, 1)).toBe(false);
    expect(selection.isSelected(1, 2)).toBe(false);
    expect(selection.isSelected(9, 9)).toBe(true);
  });

  it('does not select exterior empty pixels (palette index 0)', () => {
    const tool = new MagicWandTool();
    tool.onBegin?.(cursorAt(1, 1));
    expect(useSelectionStore.getState().selectedCount).toBe(0);
  });

  it('selects enclosed empty pixels (palette index 0)', () => {
    const pixelStore = usePixelStore.getState();

    for (let x = 1; x <= 5; x += 1) {
      pixelStore.setPixel(x, 1, 2);
      pixelStore.setPixel(x, 5, 2);
    }
    for (let y = 1; y <= 5; y += 1) {
      pixelStore.setPixel(1, y, 2);
      pixelStore.setPixel(5, y, 2);
    }

    const tool = new MagicWandTool();
    tool.onBegin?.(cursorAt(3, 3));

    const selection = useSelectionStore.getState();
    expect(selection.selectedCount).toBe(9);
    expect(selection.isSelected(3, 3)).toBe(true);
    expect(selection.isSelected(2, 2)).toBe(true);
    expect(selection.isSelected(4, 4)).toBe(true);
    expect(selection.isSelected(1, 1)).toBe(false);
  });
});
