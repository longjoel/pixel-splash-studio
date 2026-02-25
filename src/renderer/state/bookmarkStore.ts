import { create } from 'zustand';
import { useProjectStore } from '@/state/projectStore';
import { useViewportStore } from '@/state/viewportStore';
import { PIXEL_SIZE } from '@/core/grid';

type CameraBookmark = {
  id: string;
  name: string;
  kind: 'camera';
  centerX: number; // world-space canvas units
  centerY: number; // world-space canvas units
  zoom: number; // viewport zoom at capture time
};

type RegionBookmark = {
  id: string;
  name: string;
  kind: 'region';
  x: number; // world pixel coordinate
  y: number; // world pixel coordinate
  width: number; // pixels
  height: number; // pixels
};

export type Bookmark = CameraBookmark | RegionBookmark;

type BookmarkState = {
  items: Bookmark[];
  overlaysVisible: boolean;
  addFromCamera: () => void;
  addRegionTag: (payload: { x: number; y: number; width: number; height: number; name?: string }) => void;
  rename: (id: string, name: string) => void;
  setRegionPosition: (id: string, x: number, y: number) => void;
  remove: (id: string) => void;
  move: (id: string, direction: 'up' | 'down') => void;
  jumpTo: (id: string) => void;
  setOverlaysVisible: (visible: boolean) => void;
  toggleOverlaysVisible: () => void;
  setAll: (items: Bookmark[], overlaysVisible?: boolean) => void;
  clear: () => void;
};

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `bookmark-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const getViewportCenter = () => {
  const viewport = useViewportStore.getState();
  const viewWidth = viewport.width / viewport.camera.zoom;
  const viewHeight = viewport.height / viewport.camera.zoom;
  return {
    x: viewport.camera.x + viewWidth / 2,
    y: viewport.camera.y + viewHeight / 2,
    zoom: viewport.camera.zoom,
  };
};

const panCameraToCenter = (centerX: number, centerY: number, zoom?: number) => {
  const viewport = useViewportStore.getState();
  const nextZoom = zoom ?? viewport.camera.zoom;
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

const normalizeBookmark = (bookmark: Bookmark): Bookmark | null => {
  if (!bookmark || typeof bookmark !== 'object') {
    return null;
  }
  if (bookmark.kind === 'camera') {
    return {
      id: bookmark.id,
      name: bookmark.name,
      kind: 'camera',
      centerX: Number.isFinite(bookmark.centerX) ? bookmark.centerX : 0,
      centerY: Number.isFinite(bookmark.centerY) ? bookmark.centerY : 0,
      zoom: Number.isFinite(bookmark.zoom) && bookmark.zoom > 0 ? bookmark.zoom : 1,
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
    };
  }
  return null;
};

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  items: [],
  overlaysVisible: true,
  addFromCamera: () =>
    set((state) => {
      const center = getViewportCenter();
      const id = createId();
      const name = `Bookmark ${state.items.length + 1}`;
      useProjectStore.getState().setDirty(true);
      return {
        items: [
          ...state.items,
          {
            id,
            name,
            kind: 'camera',
            centerX: center.x,
            centerY: center.y,
            zoom: center.zoom,
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
            name: name?.trim() ? name.trim() : `Tile Tag ${tagCount + 1}`,
            kind: 'region',
            x: toFiniteInt(x),
            y: toFiniteInt(y),
            width: Math.max(1, toFiniteInt(width, 1)),
            height: Math.max(1, toFiniteInt(height, 1)),
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
    if (bookmark.kind === 'camera') {
      panCameraToCenter(bookmark.centerX, bookmark.centerY, bookmark.zoom);
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
