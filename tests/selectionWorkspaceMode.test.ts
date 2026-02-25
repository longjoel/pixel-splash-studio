import { beforeEach, describe, expect, it } from 'vitest';
import { PIXEL_SIZE, TILE_SIZE } from '@/core/grid';
import { SelectionRectangleTool } from '@/tools/selectionRectangleTool';
import { SelectionLassoTool } from '@/tools/selectionLassoTool';
import { useBrushStore } from '@/state/brushStore';
import { usePreviewStore } from '@/state/previewStore';
import { useSelectionRectangleStore } from '@/state/selectionRectangleStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useWorkspaceStore } from '@/state/workspaceStore';

const cursorAtPixel = (x: number, y: number) => ({
  screenX: 0,
  screenY: 0,
  canvasX: x * PIXEL_SIZE,
  canvasY: y * PIXEL_SIZE,
  primary: true,
  alt: false,
  ctrl: false,
  shift: false,
});

describe('selection tools respect Tile Space mode', () => {
  beforeEach(() => {
    useSelectionStore.getState().clear();
    usePreviewStore.getState().clear();
    useWorkspaceStore.getState().setMode('pixel');
    useSelectionRectangleStore.getState().setSnap('pixel');
    useBrushStore.getState().setShape('point');
    useBrushStore.getState().setSize(1);
  });

  it('forces rectangle selection snap to tile grid in tile workspace', () => {
    useWorkspaceStore.getState().setMode('tile');
    useSelectionRectangleStore.getState().setSnap('pixel');

    const tool = new SelectionRectangleTool();
    tool.onBegin?.(cursorAtPixel(1, 1));
    tool.onMove?.(cursorAtPixel(TILE_SIZE + 1, TILE_SIZE + 1));
    tool.onEnd?.(cursorAtPixel(TILE_SIZE + 1, TILE_SIZE + 1));

    const selection = useSelectionStore.getState();
    expect(selection.selectedCount).toBe((2 * TILE_SIZE) * (2 * TILE_SIZE));
    expect(selection.isSelected(0, 0)).toBe(true);
    expect(selection.isSelected(TILE_SIZE * 2 - 1, TILE_SIZE * 2 - 1)).toBe(true);
    expect(selection.isSelected(TILE_SIZE * 2, TILE_SIZE * 2)).toBe(false);
  });

  it('lasso paints full tile cells in tile workspace', () => {
    useWorkspaceStore.getState().setMode('tile');

    const tool = new SelectionLassoTool();
    tool.onBegin?.(cursorAtPixel(0, 0));
    tool.onMove?.(cursorAtPixel(TILE_SIZE * 2, 0));
    tool.onMove?.(cursorAtPixel(TILE_SIZE * 2, TILE_SIZE * 2));
    tool.onMove?.(cursorAtPixel(0, TILE_SIZE * 2));
    tool.onEnd?.();

    const selection = useSelectionStore.getState();
    expect(selection.selectedCount).toBe(9 * TILE_SIZE * TILE_SIZE);
    expect(selection.isSelected(TILE_SIZE + 1, TILE_SIZE + 1)).toBe(true);
    expect(selection.isSelected(TILE_SIZE * 3 + 1, TILE_SIZE * 3 + 1)).toBe(false);
  });
});
