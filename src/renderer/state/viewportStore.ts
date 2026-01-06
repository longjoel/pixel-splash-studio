import { create } from 'zustand';
import {
  CAMERA_ZOOM_MAX,
  CAMERA_ZOOM_MIN,
  DEFAULT_CAMERA,
  DEFAULT_VIEWPORT_SIZE,
} from '../../constants';

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
  ...DEFAULT_VIEWPORT_SIZE,
  camera: { ...DEFAULT_CAMERA },
  setSize: (width, height) => set({ width, height }),
  setCamera: (camera) =>
    set((state) => ({
      camera: { ...state.camera, ...camera },
    })),
  resetCamera: () => set({ camera: { ...DEFAULT_CAMERA } }),
  zoomBy: (delta, anchor) => {
    const { camera } = get();
    const nextZoom = clamp(camera.zoom + delta, CAMERA_ZOOM_MIN, CAMERA_ZOOM_MAX);
    if (!anchor) {
      set({ camera: { ...camera, zoom: nextZoom } });
      return;
    }

    const zoomRatio = nextZoom / camera.zoom;
    const nextX = anchor.x - (anchor.x - camera.x) / zoomRatio;
    const nextY = anchor.y - (anchor.y - camera.y) / zoomRatio;
    set({ camera: { x: nextX, y: nextY, zoom: nextZoom } });
  },
  panTo: (x, y) =>
    set((state) => ({
      camera: { ...state.camera, x, y },
    })),
}));
