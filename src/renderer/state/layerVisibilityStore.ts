import { create } from 'zustand';

type LayerVisibilityState = {
  showReferenceLayer: boolean;
  showPixelLayer: boolean;
  showTileLayer: boolean;
  setShowReferenceLayer: (show: boolean) => void;
  setShowPixelLayer: (show: boolean) => void;
  setShowTileLayer: (show: boolean) => void;
  toggleReferenceLayer: () => void;
  togglePixelLayer: () => void;
  toggleTileLayer: () => void;
};

export const useLayerVisibilityStore = create<LayerVisibilityState>((set) => ({
  showReferenceLayer: true,
  showPixelLayer: true,
  showTileLayer: true,
  setShowReferenceLayer: (show) => set({ showReferenceLayer: show }),
  setShowPixelLayer: (show) => set({ showPixelLayer: show }),
  setShowTileLayer: (show) => set({ showTileLayer: show }),
  toggleReferenceLayer: () =>
    set((state) => ({ showReferenceLayer: !state.showReferenceLayer })),
  togglePixelLayer: () => set((state) => ({ showPixelLayer: !state.showPixelLayer })),
  toggleTileLayer: () => set((state) => ({ showTileLayer: !state.showTileLayer })),
}));

