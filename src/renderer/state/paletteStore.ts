import { create } from 'zustand';
import { DEFAULT_COLORS } from '../../constants';

type PaletteState = {
  colors: string[];
  primaryIndex: number;
  secondaryIndex: number;
  selectedIndices: number[];
  addColor: (color: string) => void;
  removeColor: (index: number) => void;
  setColor: (index: number, color: string) => void;
  setPalette: (colors: string[], primaryIndex: number, secondaryIndex: number) => void;
  reset: () => void;
  setPrimary: (index: number) => void;
  setSecondary: (index: number) => void;
  setSelectedIndices: (indices: number[]) => void;
};

export const usePaletteStore = create<PaletteState>((set) => ({
  colors: DEFAULT_COLORS,
  primaryIndex: 0,
  secondaryIndex: 1,
  selectedIndices: [],
  addColor: (color) =>
    set((state) => ({
      colors: [...state.colors, color],
    })),
  removeColor: (index) =>
    set((state) => {
      if (state.colors.length <= 1) {
        return state;
      }
      const colors = state.colors.filter((_, idx) => idx !== index);
      const clampIndex = (value: number) =>
        Math.max(0, Math.min(value, colors.length - 1));
      let primaryIndex = state.primaryIndex;
      let secondaryIndex = state.secondaryIndex;
      if (index < primaryIndex) {
        primaryIndex -= 1;
      } else if (index === primaryIndex) {
        primaryIndex = clampIndex(primaryIndex);
      }
      if (index < secondaryIndex) {
        secondaryIndex -= 1;
      } else if (index === secondaryIndex) {
        secondaryIndex = clampIndex(secondaryIndex);
      }
      const selectedIndices = state.selectedIndices
        .filter((idx) => idx !== index)
        .map((idx) => (idx > index ? idx - 1 : idx))
        .filter((idx, pos, arr) => arr.indexOf(idx) === pos);
      return { colors, primaryIndex, secondaryIndex, selectedIndices };
    }),
  setColor: (index, color) =>
    set((state) => ({
      colors: state.colors.map((entry, idx) => (idx === index ? color : entry)),
    })),
  setPalette: (colors, primaryIndex, secondaryIndex) =>
    set((state) => ({
      colors,
      primaryIndex,
      secondaryIndex,
      selectedIndices: state.selectedIndices.filter(
        (idx, pos, arr) =>
          idx >= 0 &&
          idx < colors.length &&
          arr.indexOf(idx) === pos
      ),
    })),
  reset: () =>
    set({
      colors: DEFAULT_COLORS,
      primaryIndex: 0,
      secondaryIndex: 1,
      selectedIndices: [],
    }),
  setPrimary: (index) => set({ primaryIndex: index }),
  setSecondary: (index) => set({ secondaryIndex: index }),
  setSelectedIndices: (indices) =>
    set((state) => ({
      selectedIndices: indices
        .filter((idx, pos, arr) => arr.indexOf(idx) === pos)
        .filter((idx) => idx >= 0 && idx < state.colors.length),
    })),
}));
