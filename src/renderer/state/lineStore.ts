import { create } from 'zustand';

type LineState = {
  gradient: boolean;
  setGradient: (enabled: boolean) => void;
};

export const useLineStore = create<LineState>((set) => ({
  gradient: false,
  setGradient: (enabled) => set({ gradient: enabled }),
}));

