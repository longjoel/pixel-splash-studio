import { usePaletteStore } from '@/state/paletteStore';

export const getPaletteSelectionRamp = (): number[] => {
  const palette = usePaletteStore.getState();
  const uniqueInSelectionOrder = palette.selectedIndices
    .filter((idx, pos, arr) => arr.indexOf(idx) === pos)
    .filter((idx) => idx >= 0 && idx < palette.colors.length);
  if (uniqueInSelectionOrder.length <= 1) {
    return [];
  }
  return uniqueInSelectionOrder;
};

export const paletteIndexFromRamp = (ramp: number[], t: number): number => {
  if (ramp.length === 0) {
    return 0;
  }
  if (ramp.length === 1) {
    return ramp[0] ?? 0;
  }
  const clamped = Math.min(1, Math.max(0, t));
  const idx = Math.round(clamped * (ramp.length - 1));
  return ramp[Math.min(ramp.length - 1, Math.max(0, idx))] ?? ramp[0] ?? 0;
};
