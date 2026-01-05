import { create } from 'zustand';

export type ClipboardPixel = {
  x: number;
  y: number;
  paletteIndex: number;
};

type ClipboardState = {
  pixels: ClipboardPixel[];
  origin: { x: number; y: number } | null;
  width: number;
  height: number;
  setBuffer: (payload: {
    pixels: ClipboardPixel[];
    origin: { x: number; y: number };
    width: number;
    height: number;
  }) => void;
  clear: () => void;
};

export const useClipboardStore = create<ClipboardState>((set) => ({
  pixels: [],
  origin: null,
  width: 0,
  height: 0,
  setBuffer: ({ pixels, origin, width, height }) =>
    set({
      pixels,
      origin,
      width,
      height,
    }),
  clear: () =>
    set({
      pixels: [],
      origin: null,
      width: 0,
      height: 0,
    }),
}));
