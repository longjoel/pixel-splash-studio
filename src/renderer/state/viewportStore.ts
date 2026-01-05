import { create } from 'zustand';

export type CameraState = {
  x: number;
  y: number;
  zoom: number;
};

type ViewportState = {
  width: number;
  height: number;
  camera: CameraState;
  setSize: (width: number, height: number) => void;
  setCamera: (camera: Partial<CameraState>) => void;
  resetCamera: () => void;
  zoomBy: (delta: number, anchor?: { x: number; y: number }) => void;
  panTo: (x: number, y: number) => void;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const useViewportStore = create<ViewportState>((set, get) => ({
  width: 0,
  height: 0,
  camera: { x: 0, y: 0, zoom: 1 },
  setSize: (width, height) => set({ width, height }),
  setCamera: (camera) =>
    set((state) => ({
      camera: { ...state.camera, ...camera },
    })),
  resetCamera: () => set({ camera: { x: 0, y: 0, zoom: 1 } }),
  zoomBy: (delta, anchor) => {
    const { camera } = get();
    const nextZoom = clamp(camera.zoom + delta, 0.2, 16);
    if (!anchor) {
      set({ camera: { ...camera, zoom: nextZoom } });
      return;
    }

    const zoomRatio = nextZoom / camera.zoom;
    const nextX = anchor.x - (anchor.x - camera.x) * zoomRatio;
    const nextY = anchor.y - (anchor.y - camera.y) * zoomRatio;
    set({ camera: { x: nextX, y: nextY, zoom: nextZoom } });
  },
  panTo: (x, y) =>
    set((state) => ({
      camera: { ...state.camera, x, y },
    })),
}));
