import { create } from 'zustand';
import { DEFAULT_COLORS } from '../../constants';

const DEFAULT_SELECTED_INDICES = [Math.max(0, DEFAULT_COLORS.length - 1)];

type PaletteState = {
  colors: string[];
  selectedIndices: number[];
  addColor: (color: string) => void;
  removeColor: (index: number) => void;
  setColor: (index: number, color: string) => void;
  setPalette: (colors: string[]) => void;
  reset: () => void;
  setSelectedIndices: (indices: number[]) => void;
  setActiveIndex: (index: number) => void;
  getActiveIndex: () => number;
};

const dedupe = (indices: number[]) => {
  const result: number[] = [];
  const seen = new Set<number>();
  for (const value of indices) {
    if (seen.has(value)) {
      continue;
    }
    seen.add(value);
    result.push(value);
  }
  return result;
};

const clampSelection = (indices: number[], colorCount: number) => {
  const clamped = dedupe(indices).filter((idx) => idx >= 0 && idx < colorCount);
  if (clamped.length > 0) {
    return clamped;
  }
  return [Math.max(0, colorCount - 1)];
};

export const usePaletteStore = create<PaletteState>((set, get) => ({
  colors: DEFAULT_COLORS,
  selectedIndices: DEFAULT_SELECTED_INDICES,
  addColor: (color) =>
    set((state) => {
      const colors = [...state.colors, color];
      const activeIndex = colors.length - 1;
      return {
        colors,
        selectedIndices: clampSelection(
          [...state.selectedIndices.filter((idx) => idx !== activeIndex), activeIndex],
          colors.length
        ),
      };
    }),
  removeColor: (index) =>
    set((state) => {
      if (state.colors.length <= 1) {
        return state;
      }
      const colors = state.colors.filter((_, idx) => idx !== index);
      const selectedIndices = clampSelection(
        state.selectedIndices
          .filter((idx) => idx !== index)
          .map((idx) => (idx > index ? idx - 1 : idx)),
        colors.length
      );
      return { colors, selectedIndices };
    }),
  setColor: (index, color) =>
    set((state) => ({
      colors: state.colors.map((entry, idx) => (idx === index ? color : entry)),
    })),
  setPalette: (colors) =>
    set((state) => ({
      colors,
      selectedIndices: clampSelection(state.selectedIndices, colors.length),
    })),
  reset: () =>
    set({
      colors: DEFAULT_COLORS,
      selectedIndices: DEFAULT_SELECTED_INDICES,
    }),
  setSelectedIndices: (indices) =>
    set((state) => ({
      selectedIndices: clampSelection(indices, state.colors.length),
    })),
  setActiveIndex: (index) =>
    set((state) => ({
      selectedIndices: clampSelection(
        [...state.selectedIndices.filter((idx) => idx !== index), index],
        state.colors.length
      ),
    })),
  getActiveIndex: () => {
    const state = get();
    const active = state.selectedIndices[state.selectedIndices.length - 1];
    if (typeof active === 'number') {
      return active;
    }
    return Math.max(0, state.colors.length - 1);
  },
}));
