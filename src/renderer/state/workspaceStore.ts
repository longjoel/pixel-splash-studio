import { create } from 'zustand';

export type WorkspaceMode = 'pixel' | 'tile';

type WorkspaceState = {
  mode: WorkspaceMode;
  setMode: (mode: WorkspaceMode) => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  mode: 'pixel',
  setMode: (mode) => set({ mode: mode === 'tile' ? 'tile' : 'pixel' }),
}));
