import { create } from 'zustand';
import { useLayerVisibilityStore } from '@/state/layerVisibilityStore';

export type WorkspaceMode = 'pixel' | 'tile';

type WorkspaceState = {
  mode: WorkspaceMode;
  setMode: (mode: WorkspaceMode) => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  mode: 'pixel',
  setMode: (mode) => {
    const nextMode = mode === 'tile' ? 'tile' : 'pixel';
    set({ mode: nextMode });

    const visibility = useLayerVisibilityStore.getState();
    if (nextMode === 'tile') {
      visibility.setShowTileLayer(true);
      visibility.setShowPixelLayer(false);
      return;
    }
    visibility.setShowPixelLayer(true);
    visibility.setShowTileLayer(false);
  },
}));
