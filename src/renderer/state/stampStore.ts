import { create } from 'zustand';

export type StampMode = 'soft' | 'hard';
export type StampSnap = 'pixel' | 'tile';
export type StampRotation = 0 | 90 | 180 | 270;
export type StampScale = 1 | 2 | 4 | 8;

type StampState = {
  mode: StampMode;
  snap: StampSnap;
  rotation: StampRotation;
  scale: StampScale;
  flipX: boolean;
  flipY: boolean;
  drag: boolean;
  pasteDuplicateColors: boolean;
  setMode: (mode: StampMode) => void;
  setSnap: (snap: StampSnap) => void;
  setRotation: (rotation: StampRotation) => void;
  setScale: (scale: StampScale) => void;
  setFlipX: (flip: boolean) => void;
  setFlipY: (flip: boolean) => void;
  setDrag: (drag: boolean) => void;
  setPasteDuplicateColors: (value: boolean) => void;
};

export const useStampStore = create<StampState>((set) => ({
  mode: 'soft',
  snap: 'pixel',
  rotation: 0,
  scale: 1,
  flipX: false,
  flipY: false,
  drag: false,
  pasteDuplicateColors: false,
  setMode: (mode) => set({ mode }),
  setSnap: (snap) => set({ snap }),
  setRotation: (rotation) => set({ rotation }),
  setScale: (scale) => set({ scale }),
  setFlipX: (flip) => set({ flipX: flip }),
  setFlipY: (flip) => set({ flipY: flip }),
  setDrag: (drag) => set({ drag }),
  setPasteDuplicateColors: (value) => set({ pasteDuplicateColors: value }),
}));
