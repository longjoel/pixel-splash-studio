import { create } from 'zustand';

type LayerVisibilityState = {
  showReferenceLayer: boolean;
  showPixelLayer: boolean;
  showTileLayer: boolean;
  showPixelGrid: boolean;
  showTileGrid: boolean;
  showAxes: boolean;
  setShowReferenceLayer: (show: boolean) => void;
  setShowPixelLayer: (show: boolean) => void;
  setShowTileLayer: (show: boolean) => void;
  setShowPixelGrid: (show: boolean) => void;
  setShowTileGrid: (show: boolean) => void;
  setShowAxes: (show: boolean) => void;
  toggleReferenceLayer: () => void;
  togglePixelLayer: () => void;
  toggleTileLayer: () => void;
  togglePixelGrid: () => void;
  toggleTileGrid: () => void;
  toggleAxes: () => void;
};

export const useLayerVisibilityStore = create<LayerVisibilityState>((set) => ({
  showReferenceLayer: true,
  showPixelLayer: true,
  showTileLayer: true,
  showPixelGrid: true,
  showTileGrid: true,
  showAxes: true,
  setShowReferenceLayer: (show) => set({ showReferenceLayer: show }),
  setShowPixelLayer: (show) => set({ showPixelLayer: show }),
  setShowTileLayer: (show) => set({ showTileLayer: show }),
  setShowPixelGrid: (show) => set({ showPixelGrid: show }),
  setShowTileGrid: (show) => set({ showTileGrid: show }),
  setShowAxes: (show) => set({ showAxes: show }),
  toggleReferenceLayer: () =>
    set((state) => ({ showReferenceLayer: !state.showReferenceLayer })),
  togglePixelLayer: () => set((state) => ({ showPixelLayer: !state.showPixelLayer })),
  toggleTileLayer: () => set((state) => ({ showTileLayer: !state.showTileLayer })),
  togglePixelGrid: () => set((state) => ({ showPixelGrid: !state.showPixelGrid })),
  toggleTileGrid: () => set((state) => ({ showTileGrid: !state.showTileGrid })),
  toggleAxes: () => set((state) => ({ showAxes: !state.showAxes })),
}));
