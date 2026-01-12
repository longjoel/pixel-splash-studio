/// <reference types="vite/client" />

type TileSetPayload = {
  id: string;
  name: string;
  tileWidth: number;
  tileHeight: number;
  tiles: Array<{
    id: string;
    name?: string;
    pixels: number[];
  }>;
};

type TileMapPayload = {
  id: string;
  name: string;
  tileSetId: string;
  originX: number;
  originY: number;
  columns: number;
  rows: number;
  tiles: number[];
};

type ProjectPayload = {
  data: {
    palette: {
      colors: string[];
      primaryIndex: number;
      secondaryIndex: number;
    };
    camera: {
      x: number;
      y: number;
      zoom: number;
    };
    history?: {
      undoStack: Array<{ changes: Array<{ x: number; y: number; prev: number; next: number }> }>;
      redoStack: Array<{ changes: Array<{ x: number; y: number; prev: number; next: number }> }>;
    };
    references?: Array<{
      id: string;
      filename: string;
      type: string;
      width: number;
      height: number;
      x: number;
      y: number;
      scale: number;
      rotation: number;
      flipX: boolean;
      flipY: boolean;
      opacity: number;
    }>;
    tileSets?: TileSetPayload[];
    tileMaps?: TileMapPayload[];
  };
  blocks: Array<{ row: number; col: number; data: Uint8Array }>;
  referenceFiles?: Array<{ filename: string; data: Uint8Array; type: string }>;
};

type ProjectLoadResult = ProjectPayload & { path: string };

type ImportedImagePayload = {
  format: string;
  width: number;
  height: number;
  colorType: 'indexed' | 'rgba';
  pixels: Uint8Array;
  palette?: Array<[number, number, number]>;
  transparentIndex?: number;
};

type ExportImagePayload =
  | {
      kind: 'rgba';
      width: number;
      height: number;
      data: Uint8Array;
    }
  | {
      kind: 'indexed';
      width: number;
      height: number;
      data: Uint8Array;
      palette: Uint8Array;
    };

interface Window {
  projectApi: {
    save: (payload: ProjectPayload, existingPath?: string) => Promise<string | null>;
    load: (existingPath?: string) => Promise<ProjectLoadResult | null>;
    exportPng: (data: Uint8Array, suggestedName?: string) => Promise<string | null>;
    exportGbr: (data: Uint8Array, suggestedName?: string) => Promise<string | null>;
    exportChr: (data: Uint8Array, suggestedName?: string) => Promise<string | null>;
    exportBsave: (data: Uint8Array, suggestedName?: string) => Promise<string | null>;
    exportTileMap: (payload: { png: Uint8Array; tmx: string }) => Promise<string | null>;
    importImage: () => Promise<ImportedImagePayload | null>;
    exportImage: (
      format: string,
      payload: ExportImagePayload,
      suggestedName?: string
    ) => Promise<string | null>;
  };
  menuApi: {
    onAction: (handler: (action: string) => void) => () => void;
  };
  appApi: {
    setTitle: (title: string) => void;
  };
  debugApi: {
    logPerf: (message: string) => Promise<string | null>;
  };
  uiScaleApi: {
    getScale: () => number;
    resetScale: () => void;
    setScale: (scale: number) => void;
    stepScale: (factor: number) => void;
    onScaleChange: (handler: (scale: number) => void) => () => void;
  };
}
