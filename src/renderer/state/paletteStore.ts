import { create } from 'zustand';
import { DEFAULT_COLORS } from '../../constants';

type PaletteState = {
  colors: string[];
  primaryIndex: number;
  secondaryIndex: number;
  addColor: (color: string) => void;
  removeColor: (index: number) => void;
  setColor: (index: number, color: string) => void;
  setPalette: (colors: string[], primaryIndex: number, secondaryIndex: number) => void;
  reset: () => void;
  setPrimary: (index: number) => void;
  setSecondary: (index: number) => void;
};

export const usePaletteStore = create<PaletteState>((set) => ({
  colors: DEFAULT_COLORS,
  primaryIndex: 0,
  secondaryIndex: 1,
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
      return { colors, primaryIndex, secondaryIndex };
    }),
  setColor: (index, color) =>
    set((state) => ({
      colors: state.colors.map((entry, idx) => (idx === index ? color : entry)),
    })),
  setPalette: (colors, primaryIndex, secondaryIndex) =>
    set({
      colors,
      primaryIndex,
      secondaryIndex,
    }),
  reset: () =>
    set({
      colors: DEFAULT_COLORS,
      primaryIndex: 0,
      secondaryIndex: 1,
    }),
  setPrimary: (index) => set({ primaryIndex: index }),
  setSecondary: (index) => set({ secondaryIndex: index }),
}));
