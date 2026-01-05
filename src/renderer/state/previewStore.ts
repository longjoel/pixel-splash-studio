import { create } from 'zustand';

export type PreviewPixel = {
  x: number;
  y: number;
  paletteIndex: number;
};

type PreviewState = {
  pixels: Map<string, PreviewPixel>;
  setPixel: (x: number, y: number, paletteIndex: number) => void;
  clear: () => void;
  entries: () => IterableIterator<PreviewPixel>;
};

const keyFor = (x: number, y: number) => `${x}:${y}`;

export const usePreviewStore = create<PreviewState>(() => {
  const pixels = new Map<string, PreviewPixel>();

  return {
    pixels,
    setPixel: (x, y, paletteIndex) => {
      pixels.set(keyFor(x, y), { x, y, paletteIndex });
    },
    clear: () => {
      pixels.clear();
    },
    entries: () => pixels.values(),
  };
});
