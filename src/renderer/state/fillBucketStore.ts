import { create } from 'zustand';

export type FillBucketMode = 'color' | 'selection' | 'gradient';

export type FillBucketGradientDirection =
  | 'top-bottom'
  | 'bottom-top'
  | 'left-right'
  | 'right-left';

export type FillBucketGradientDither = 'bayer2' | 'none';

type FillBucketState = {
  mode: FillBucketMode;
  gradientDirection: FillBucketGradientDirection;
  gradientDither: FillBucketGradientDither;
  setMode: (mode: FillBucketMode) => void;
  setGradientDirection: (direction: FillBucketGradientDirection) => void;
  setGradientDither: (dither: FillBucketGradientDither) => void;
};

export const useFillBucketStore = create<FillBucketState>((set) => ({
  mode: 'color',
  gradientDirection: 'top-bottom',
  gradientDither: 'bayer2',
  setMode: (mode) => set({ mode }),
  setGradientDirection: (direction) => set({ gradientDirection: direction }),
  setGradientDither: (dither) => set({ gradientDither: dither }),
}));
