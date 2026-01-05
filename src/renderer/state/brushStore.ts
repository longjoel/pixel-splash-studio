import { create } from 'zustand';

export type BrushShape = 'point' | 'square' | 'round';

type BrushState = {
  size: number;
  shape: BrushShape;
  setSize: (size: number) => void;
  setShape: (shape: BrushShape) => void;
};

export const useBrushStore = create<BrushState>((set) => ({
  size: 1,
  shape: 'point',
  setSize: (size) => set({ size }),
  setShape: (shape) => set({ shape }),
}));
