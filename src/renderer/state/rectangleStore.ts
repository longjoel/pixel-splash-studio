import { create } from 'zustand';

export type RectangleMode = 'filled' | 'outlined' | 'outline-fill';

type RectangleState = {
  mode: RectangleMode;
  setMode: (mode: RectangleMode) => void;
};

export const useRectangleStore = create<RectangleState>((set) => ({
  mode: 'filled',
  setMode: (mode) => set({ mode }),
}));
