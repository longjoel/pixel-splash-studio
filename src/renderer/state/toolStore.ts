import { create } from 'zustand';

export type ToolId =
  | 'pen'
  | 'line'
  | 'rectangle'
  | 'oval'
  | 'fill-bucket'
  | 'eyedropper'
  | 'reference-handle'
  | 'stamp'
  | 'selection-rect'
  | 'selection-oval'
  | 'tile-sampler'
  | 'tile-pen'
  | 'tile-rectangle'
  | 'tile-9slice';

type ToolState = {
  activeTool: ToolId;
  setActiveTool: (tool: ToolId) => void;
};

export const useToolStore = create<ToolState>((set) => ({
  activeTool: 'pen',
  setActiveTool: (tool) => set({ activeTool: tool }),
}));
