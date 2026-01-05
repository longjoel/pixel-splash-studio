import { create } from 'zustand';

export type ToolId = 'pen' | 'line' | 'rectangle' | 'oval' | 'selection-rect';

type ToolState = {
  activeTool: ToolId;
  setActiveTool: (tool: ToolId) => void;
};

export const useToolStore = create<ToolState>((set) => ({
  activeTool: 'pen',
  setActiveTool: (tool) => set({ activeTool: tool }),
}));
