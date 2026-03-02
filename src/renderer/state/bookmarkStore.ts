import { create } from 'zustand';
import { useProjectStore } from '@/state/projectStore';
import { useViewportStore } from '@/state/viewportStore';
import { PIXEL_SIZE } from '@/core/grid';

type RegionBookmark = {
  id: string;
  name: string;
  kind: 'region';
  x: number; // world pixel coordinate
  y: number; // world pixel coordinate
  width: number; // pixels
  height: number; // pixels
  fileName?: string;
};

type LegacyCameraBookmark = {
  id: string;
  name: string;
  kind: 'camera';
  centerX: number;
  centerY: number;
  zoom?: number;
};

export type Bookmark = RegionBookmark;

type BookmarkState = {
  items: Bookmark[];
  overlaysVisible: boolean;
  addFromCamera: () => void;
  addRegionTag: (payload: { x: number; y: number; width: number; height: number; name?: string }) => void;
  rename: (id: string, name: string) => void;
  setRegionPosition: (id: string, x: number, y: number) => void;
  setRegionSize: (id: string, width: number, height: number) => void;
  setRegionFileName: (id: string, fileName: string) => void;
  remove: (id: string) => void;
  move: (id: string, direction: 'up' | 'down') => void;
  jumpTo: (id: string) => void;
  setOverlaysVisible: (visible: boolean) => void;
  toggleOverlaysVisible: () => void;
  setAll: (items: Array<Bookmark | LegacyCameraBookmark>, overlaysVisible?: boolean) => void;
  clear: () => void;
};

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `bookmark-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const getViewportRegion = () => {
  const viewport = useViewportStore.getState();
  const zoom = viewport.camera.zoom;
  if (!Number.isFinite(zoom) || zoom <= 0) {
    return { x: 0, y: 0, width: 1, height: 1 };
  }
  const viewWidth = viewport.width / viewport.camera.zoom;
  const viewHeight = viewport.height / viewport.camera.zoom;
  const minX = Math.floor(viewport.camera.x / PIXEL_SIZE);
  const minY = Math.floor(viewport.camera.y / PIXEL_SIZE);
  const maxX = Math.ceil((viewport.camera.x + viewWidth) / PIXEL_SIZE);
  const maxY = Math.ceil((viewport.camera.y + viewHeight) / PIXEL_SIZE);
  return {
    x: minX,
    y: minY,
    width: Math.max(1, maxX - minX),
    height: Math.max(1, maxY - minY),
  };
};

const panCameraToCenter = (centerX: number, centerY: number) => {
  const viewport = useViewportStore.getState();
  const nextZoom = viewport.camera.zoom;
  const width = viewport.width;
  const height = viewport.height;
  if (width <= 0 || height <= 0 || !Number.isFinite(nextZoom) || nextZoom <= 0) {
    return;
  }
  const x = centerX - width / (2 * nextZoom);
  const y = centerY - height / (2 * nextZoom);
  viewport.setCamera({ x, y, zoom: nextZoom });
};

const toFiniteInt = (value: number, fallback = 0) =>
  Number.isFinite(value) ? Math.round(value) : fallback;

const normalizeBookmark = (bookmark: Bookmark | LegacyCameraBookmark): Bookmark | null => {
  if (!bookmark || typeof bookmark !== 'object') {
    return null;
  }
  if (bookmark.kind === 'camera') {
    const centerX = Number.isFinite(bookmark.centerX) ? bookmark.centerX : 0;
    const centerY = Number.isFinite(bookmark.centerY) ? bookmark.centerY : 0;
    const x = Math.round(centerX / PIXEL_SIZE);
    const y = Math.round(centerY / PIXEL_SIZE);
    return {
      id: bookmark.id,
      name: bookmark.name,
      kind: 'region',
      x,
      y,
      width: 32,
      height: 32,
      fileName: '',
    };
  }
  if (bookmark.kind === 'region') {
    return {
      id: bookmark.id,
      name: bookmark.name,
      kind: 'region',
      x: toFiniteInt(bookmark.x),
      y: toFiniteInt(bookmark.y),
      width: Math.max(1, toFiniteInt(bookmark.width, 1)),
      height: Math.max(1, toFiniteInt(bookmark.height, 1)),
      fileName: typeof bookmark.fileName === 'string' ? bookmark.fileName : '',
    };
  }
  return null;
};

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  items: [],
  overlaysVisible: true,
  addFromCamera: () =>
    set((state) => {
      const region = getViewportRegion();
      const id = createId();
      const name = `Bookmark ${state.items.length + 1}`;
      useProjectStore.getState().setDirty(true);
      return {
        items: [
          ...state.items,
          {
            id,
            name,
            kind: 'region',
            x: region.x,
            y: region.y,
            width: region.width,
            height: region.height,
            fileName: '',
          },
        ],
      };
    }),
  addRegionTag: ({ x, y, width, height, name }) =>
    set((state) => {
      const id = createId();
      const tagCount = state.items.filter((item) => item.kind === 'region').length;
      useProjectStore.getState().setDirty(true);
      return {
        items: [
          ...state.items,
          {
            id,
            name: name?.trim() ? name.trim() : `Bookmark ${tagCount + 1}`,
            kind: 'region',
            x: toFiniteInt(x),
            y: toFiniteInt(y),
            width: Math.max(1, toFiniteInt(width, 1)),
            height: Math.max(1, toFiniteInt(height, 1)),
            fileName: '',
          },
        ],
      };
    }),
  rename: (id, name) =>
    set((state) => {
      useProjectStore.getState().setDirty(true);
      return {
        items: state.items.map((item) => (item.id === id ? { ...item, name } : item)),
      };
    }),
  setRegionPosition: (id, x, y) =>
    set((state) => {
      let changed = false;
      const next = state.items.map((item) => {
        if (item.id !== id || item.kind !== 'region') {
          return item;
        }
        const nextX = toFiniteInt(x);
        const nextY = toFiniteInt(y);
        if (item.x === nextX && item.y === nextY) {
          return item;
        }
        changed = true;
        return { ...item, x: nextX, y: nextY };
      });
      if (!changed) {
        return state;
      }
      useProjectStore.getState().setDirty(true);
      return { items: next };
    }),
  setRegionSize: (id, width, height) =>
    set((state) => {
      let changed = false;
      const next = state.items.map((item) => {
        if (item.id !== id) {
          return item;
        }
        const nextWidth = Math.max(1, toFiniteInt(width, 1));
        const nextHeight = Math.max(1, toFiniteInt(height, 1));
        if (item.width === nextWidth && item.height === nextHeight) {
          return item;
        }
        changed = true;
        return { ...item, width: nextWidth, height: nextHeight };
      });
      if (!changed) {
        return state;
      }
      useProjectStore.getState().setDirty(true);
      return { items: next };
    }),
  setRegionFileName: (id, fileName) =>
    set((state) => {
      let changed = false;
      const next = state.items.map((item) => {
        if (item.id !== id) {
          return item;
        }
        if (item.fileName === fileName) {
          return item;
        }
        changed = true;
        return { ...item, fileName };
      });
      if (!changed) {
        return state;
      }
      useProjectStore.getState().setDirty(true);
      return { items: next };
    }),
  remove: (id) =>
    set((state) => {
      useProjectStore.getState().setDirty(true);
      return { items: state.items.filter((item) => item.id !== id) };
    }),
  move: (id, direction) =>
    set((state) => {
      const index = state.items.findIndex((item) => item.id === id);
      if (index === -1) {
        return state;
      }
      const nextIndex = direction === 'up' ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= state.items.length) {
        return state;
      }
      const next = [...state.items];
      const [moved] = next.splice(index, 1);
      next.splice(nextIndex, 0, moved);
      useProjectStore.getState().setDirty(true);
      return { items: next };
    }),
  jumpTo: (id) => {
    const bookmark = get().items.find((item) => item.id === id);
    if (!bookmark) {
      return;
    }
    const centerX = bookmark.x + bookmark.width / 2;
    const centerY = bookmark.y + bookmark.height / 2;
    panCameraToCenter(centerX * PIXEL_SIZE, centerY * PIXEL_SIZE);
  },
  setOverlaysVisible: (visible) =>
    set((state) => {
      const next = Boolean(visible);
      if (state.overlaysVisible === next) {
        return state;
      }
      useProjectStore.getState().setDirty(true);
      return { overlaysVisible: next };
    }),
  toggleOverlaysVisible: () =>
    set((state) => {
      useProjectStore.getState().setDirty(true);
      return { overlaysVisible: !state.overlaysVisible };
    }),
  setAll: (items, overlaysVisible = true) =>
    set({
      items: items.map(normalizeBookmark).filter((item): item is Bookmark => item !== null),
      overlaysVisible: Boolean(overlaysVisible),
    }),
  clear: () => set({ items: [], overlaysVisible: true }),
}));
