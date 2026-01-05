import { create } from 'zustand';

export type ToolId = 'pen' | 'line' | 'rectangle';

type ToolState = {
  activeTool: ToolId;
  setActiveTool: (tool: ToolId) => void;
};

export const useToolStore = create<ToolState>((set) => ({
  activeTool: 'pen',
  setActiveTool: (tool) => set({ activeTool: tool }),
}));
