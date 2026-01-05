import { create } from 'zustand';

type PaletteState = {
  colors: string[];
  primaryIndex: number;
  secondaryIndex: number;
  addColor: (color: string) => void;
  setColor: (index: number, color: string) => void;
  setPalette: (colors: string[], primaryIndex: number, secondaryIndex: number) => void;
  reset: () => void;
  setPrimary: (index: number) => void;
  setSecondary: (index: number) => void;
};

const DEFAULT_COLORS = [
  '#000000', '#1a1a1a', '#3a3a3a', '#5a5a5a', '#7a7a7a', '#9a9a9a', '#bababa', '#ffffff',
  '#3b1f0f', '#5c2c14', '#8a3c1d', '#b45626', '#e07a3c', '#f6a04d', '#f8c17a', '#fbe4b3',
  '#1b2f5b', '#26407a', '#3657a6', '#4a6fd6', '#5f8bff', '#7aa5ff', '#9cc0ff', '#c5ddff',
  '#0f3b2a', '#165238', '#1f6d49', '#2d8c5e', '#3ab073', '#5fd790', '#8df0b2', '#c6f8dd',
  '#4a0f5b', '#651478', '#8a1aa6', '#b424d6', '#d64aff', '#e679ff', '#f0a6ff', '#f8d2ff',
  '#5b0f1f', '#7a1429', '#a61a37', '#d6244a', '#ff4a64', '#ff7a8a', '#ff9caa', '#ffd1d8',
];

export const usePaletteStore = create<PaletteState>((set) => ({
  colors: DEFAULT_COLORS,
  primaryIndex: 0,
  secondaryIndex: 1,
  addColor: (color) =>
    set((state) => ({
      colors: [...state.colors, color],
    })),
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
