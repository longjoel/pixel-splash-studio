import { describe, it, expect, beforeEach } from 'vitest';
import { SelectionLassoTool } from '@/tools/selectionLassoTool';
import { PIXEL_SIZE } from '@/core/grid';
import { useBrushStore } from '@/state/brushStore';
import { usePreviewStore } from '@/state/previewStore';
import { useSelectionStore } from '@/state/selectionStore';

const cursorAt = (x: number, y: number, overrides?: Partial<ReturnType<typeof cursorAt>>) => ({
  screenX: 0,
  screenY: 0,
  canvasX: x * PIXEL_SIZE,
  canvasY: y * PIXEL_SIZE,
  primary: true,
  alt: false,
  ctrl: false,
  shift: false,
  ...(overrides ?? {}),
});

describe('SelectionLassoTool', () => {
  beforeEach(() => {
    useSelectionStore.getState().clear();
    usePreviewStore.getState().clear();
    useBrushStore.getState().setSize(1);
    useBrushStore.getState().setShape('round');
  });

  it('fills the enclosed area when closing the loop (point brush)', () => {
    useBrushStore.getState().setShape('point');
    const tool = new SelectionLassoTool();

    tool.onBegin?.(cursorAt(0, 0));
    tool.onMove?.(cursorAt(4, 0));
    tool.onMove?.(cursorAt(4, 4));
    tool.onMove?.(cursorAt(0, 4));
    tool.onEnd?.();

    const selection = useSelectionStore.getState();
    expect(selection.selectedCount).toBe(16);
    expect(selection.isSelected(0, 0)).toBe(true);
    expect(selection.isSelected(3, 0)).toBe(true);
    expect(selection.isSelected(0, 3)).toBe(true);
    expect(selection.isSelected(3, 3)).toBe(true);
    expect(selection.isSelected(4, 4)).toBe(false);
    expect(selection.isSelected(-1, -1)).toBe(false);
  });

  it('uses the exterior outline when using a sized brush', () => {
    useBrushStore.getState().setShape('round');
    useBrushStore.getState().setSize(1);

    const tool = new SelectionLassoTool();

    tool.onBegin?.(cursorAt(0, 0));
    tool.onMove?.(cursorAt(4, 0));
    tool.onMove?.(cursorAt(4, 4));
    tool.onMove?.(cursorAt(0, 4));
    tool.onEnd?.();

    const selection = useSelectionStore.getState();
    expect(selection.selectedCount).toBeGreaterThan(16);
    // Pixels just outside the centerline polygon should become included.
    expect(selection.isSelected(-1, 2)).toBe(true);
    expect(selection.isSelected(5, 2)).toBe(true);
    // Still outside the stroke's exterior outline for a radius-1 round brush.
    expect(selection.isSelected(-1, -1)).toBe(false);
    expect(selection.isSelected(6, 2)).toBe(false);
  });

  it('subtracts the enclosed area with ctrl', () => {
    useBrushStore.getState().setShape('point');
    const initial: Array<{ x: number; y: number; selected: boolean }> = [];
    for (let y = 0; y < 4; y += 1) {
      for (let x = 0; x < 4; x += 1) {
        initial.push({ x, y, selected: true });
      }
    }
    useSelectionStore.getState().setSelections(initial);
    expect(useSelectionStore.getState().selectedCount).toBe(16);

    const tool = new SelectionLassoTool();
    tool.onBegin?.(cursorAt(1, 1, { ctrl: true }));
    tool.onMove?.(cursorAt(3, 1, { ctrl: true }));
    tool.onMove?.(cursorAt(3, 3, { ctrl: true }));
    tool.onMove?.(cursorAt(1, 3, { ctrl: true }));
    tool.onEnd?.();

    expect(useSelectionStore.getState().selectedCount).toBe(12);
    expect(useSelectionStore.getState().isSelected(1, 1)).toBe(false);
    expect(useSelectionStore.getState().isSelected(2, 2)).toBe(false);
    expect(useSelectionStore.getState().isSelected(0, 0)).toBe(true);
    expect(useSelectionStore.getState().isSelected(3, 3)).toBe(true);
  });
});
