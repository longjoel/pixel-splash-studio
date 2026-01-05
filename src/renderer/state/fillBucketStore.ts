import { create } from 'zustand';

export type FillBucketMode = 'color' | 'selection';

type FillBucketState = {
  mode: FillBucketMode;
  setMode: (mode: FillBucketMode) => void;
};

export const useFillBucketStore = create<FillBucketState>((set) => ({
  mode: 'color',
  setMode: (mode) => set({ mode }),
}));
