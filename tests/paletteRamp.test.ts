import { describe, expect, it, beforeEach } from 'vitest';
import { usePaletteStore } from '@/state/paletteStore';
import { getPaletteSelectionRamp } from '@/services/paletteRamp';

describe('getPaletteSelectionRamp', () => {
  beforeEach(() => {
    usePaletteStore.getState().reset();
  });

  it('returns empty ramp for 0-1 selected colors', () => {
    usePaletteStore.getState().setSelectedIndices([3]);
    expect(getPaletteSelectionRamp()).toEqual([]);

    usePaletteStore.getState().setSelectedIndices([]);
    expect(getPaletteSelectionRamp()).toEqual([]);
  });

  it('preserves selection order (not palette index order)', () => {
    usePaletteStore.getState().setSelectedIndices([5, 2, 9]);
    expect(getPaletteSelectionRamp()).toEqual([5, 2, 9]);

    usePaletteStore.getState().setSelectedIndices([9, 2, 5]);
    expect(getPaletteSelectionRamp()).toEqual([9, 2, 5]);
  });
});

