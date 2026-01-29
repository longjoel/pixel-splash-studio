import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('@/services/largeOperationQueue', () => {
  return {
    enqueuePixelChanges: vi.fn(),
  };
});

import { FillBucketTool } from '@/tools/fillBucketTool';
import { enqueuePixelChanges } from '@/services/largeOperationQueue';
import { useFillBucketStore } from '@/state/fillBucketStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useViewportStore } from '@/state/viewportStore';
import { PIXEL_SIZE } from '@/core/grid';

const cursorAt = (x: number, y: number) => ({
  screenX: 0,
  screenY: 0,
  canvasX: x * PIXEL_SIZE,
  canvasY: y * PIXEL_SIZE,
  primary: true,
  secondary: false,
  alt: false,
  ctrl: false,
  shift: false,
});

describe('FillBucketTool gradient selection', () => {
  beforeEach(() => {
    useViewportStore.getState().setSize(100, 100);
    useViewportStore.getState().setCamera({ x: 0, y: 0, zoom: 1 });
    usePixelStore.getState().clear();
    useSelectionStore.getState().clear();
    useFillBucketStore.getState().setMode('selection');
    useFillBucketStore.getState().setGradientDirection('top-bottom');
    useFillBucketStore.getState().setGradientDither('none');
    usePaletteStore.getState().setSelectedIndices([]);
    (enqueuePixelChanges as unknown as ReturnType<typeof vi.fn>).mockClear();
  });

  it('does not gradient-fill when only one palette color is selected', () => {
    usePaletteStore.getState().setPrimary(12);
    usePaletteStore.getState().setSecondary(0);
    usePaletteStore.getState().setSelectedIndices([12]);

    useSelectionStore.getState().setSelections([
      { x: 0, y: 0, selected: true },
      { x: 0, y: 1, selected: true },
    ]);
    usePixelStore.getState().setPixelsInLayer(usePixelStore.getState().activeLayerId, [
      { x: 0, y: 0, paletteIndex: 0 },
      { x: 0, y: 1, paletteIndex: 0 },
    ]);

    const tool = new FillBucketTool();
    tool.onBegin?.(cursorAt(0, 0));

    expect(enqueuePixelChanges).toHaveBeenCalledTimes(1);
    const [changes, options] = (enqueuePixelChanges as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0] as [Array<{ x: number; y: number; prev: number; next: number }>, { label?: string }];
    expect(options?.label).toBe('Fill Selection');
    expect(changes.map((c) => c.next)).toEqual([12, 12]);
  });

  it('gradient-fills when multiple palette colors are selected', () => {
    usePaletteStore.getState().setPrimary(5);
    usePaletteStore.getState().setSecondary(0);
    usePaletteStore.getState().setSelectedIndices([0, 5]);

    useSelectionStore.getState().setSelections([
      { x: 0, y: 0, selected: true },
      { x: 0, y: 3, selected: true },
    ]);
    usePixelStore.getState().setPixelsInLayer(usePixelStore.getState().activeLayerId, [
      { x: 0, y: 0, paletteIndex: 2 },
      { x: 0, y: 3, paletteIndex: 2 },
    ]);

    const tool = new FillBucketTool();
    tool.onBegin?.(cursorAt(0, 0));

    expect(enqueuePixelChanges).toHaveBeenCalledTimes(1);
    const [changes, options] = (enqueuePixelChanges as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0] as [Array<{ x: number; y: number; prev: number; next: number }>, { label?: string }];
    expect(options?.label).toBe('Gradient Fill');
    const byKey = new Map(changes.map((c) => [`${c.x}:${c.y}`, c.next] as const));
    expect(byKey.get('0:0')).toBe(0);
    expect(byKey.get('0:3')).toBe(5);
  });
});

