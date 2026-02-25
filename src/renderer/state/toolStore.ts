import { create } from 'zustand';

export type ToolId =
  | 'pen'
  | 'spray'
  | 'line'
  | 'rectangle'
  | 'oval'
  | 'fill-bucket'
  | 'text'
  | 'ai'
  | 'eyedropper'
  | 'reference-handle'
  | 'stamp'
  | 'magic-wand'
  | 'selection-rect'
  | 'selection-oval'
  | 'selection-lasso'
  | 'texture-roll'
  | 'tile-sampler'
  | 'tile-pen'
  | 'tile-stamp'
  | 'tile-rectangle'
  | 'tile-9slice'
  | 'tile-export';

type ToolState = {
  activeTool: ToolId;
  setActiveTool: (tool: ToolId) => void;
};

export const useToolStore = create<ToolState>((set) => ({
  activeTool: 'pen',
  setActiveTool: (tool) => set({ activeTool: tool }),
}));
