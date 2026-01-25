import { create } from 'zustand';

export type OvalMode = 'filled' | 'outlined' | 'outline-fill';

type OvalState = {
  mode: OvalMode;
  gradientFill: boolean;
  setMode: (mode: OvalMode) => void;
  setGradientFill: (enabled: boolean) => void;
};

export const useOvalStore = create<OvalState>((set) => ({
  mode: 'filled',
  gradientFill: false,
  setMode: (mode) => set({ mode }),
  setGradientFill: (enabled) => set({ gradientFill: enabled }),
}));
