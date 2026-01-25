import { create } from 'zustand';

export type RectangleMode = 'filled' | 'outlined' | 'outline-fill';

type RectangleState = {
  mode: RectangleMode;
  gradientFill: boolean;
  setMode: (mode: RectangleMode) => void;
  setGradientFill: (enabled: boolean) => void;
};

export const useRectangleStore = create<RectangleState>((set) => ({
  mode: 'filled',
  gradientFill: false,
  setMode: (mode) => set({ mode }),
  setGradientFill: (enabled) => set({ gradientFill: enabled }),
}));
