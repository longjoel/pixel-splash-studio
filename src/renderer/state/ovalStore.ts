import { create } from 'zustand';

export type OvalMode = 'filled' | 'outlined';

type OvalState = {
  mode: OvalMode;
  setMode: (mode: OvalMode) => void;
};

export const useOvalStore = create<OvalState>((set) => ({
  mode: 'filled',
  setMode: (mode) => set({ mode }),
}));
