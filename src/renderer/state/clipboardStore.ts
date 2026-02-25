import { create } from 'zustand';

export type ClipboardPixel = {
  x: number;
  y: number;
  paletteIndex: number;
};

export type ClipboardTileBuffer = {
  tileSetId: string;
  tiles: number[];
  cols: number;
  rows: number;
  source: 'palette' | 'map';
};

type ClipboardState = {
  pixels: ClipboardPixel[];
  origin: { x: number; y: number } | null;
  width: number;
  height: number;
  tileBuffer: ClipboardTileBuffer | null;
  setBuffer: (payload: {
    pixels: ClipboardPixel[];
    origin: { x: number; y: number };
    width: number;
    height: number;
  }) => void;
  setTileBuffer: (payload: ClipboardTileBuffer) => void;
  clear: () => void;
};

export const useClipboardStore = create<ClipboardState>((set) => ({
  pixels: [],
  origin: null,
  width: 0,
  height: 0,
  tileBuffer: null,
  setBuffer: ({ pixels, origin, width, height }) =>
    set({
      pixels,
      origin,
      width,
      height,
      tileBuffer: null,
    }),
  setTileBuffer: (payload) =>
    set({
      pixels: [],
      origin: null,
      width: 0,
      height: 0,
      tileBuffer: {
        tileSetId: payload.tileSetId,
        tiles: payload.tiles.slice(),
        cols: Math.max(1, Math.floor(payload.cols)),
        rows: Math.max(1, Math.floor(payload.rows)),
        source: payload.source,
      },
    }),
  clear: () =>
    set({
      pixels: [],
      origin: null,
      width: 0,
      height: 0,
      tileBuffer: null,
    }),
}));
