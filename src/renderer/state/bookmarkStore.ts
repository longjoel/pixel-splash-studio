import { create } from 'zustand';
import { useViewportStore } from '@/state/viewportStore';

export type Bookmark = {
  id: string;
  name: string;
  centerX: number;
  centerY: number;
  zoom: number;
};

type BookmarkState = {
  items: Bookmark[];
  addFromCamera: () => void;
  rename: (id: string, name: string) => void;
  remove: (id: string) => void;
  move: (id: string, direction: 'up' | 'down') => void;
  jumpTo: (id: string) => void;
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

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  items: [],
  addFromCamera: () =>
    set((state) => {
      const center = getViewportCenter();
      const id = createId();
      const name = `Bookmark ${state.items.length + 1}`;
      return {
        items: [
          ...state.items,
          { id, name, centerX: center.x, centerY: center.y, zoom: center.zoom },
        ],
      };
    }),
  rename: (id, name) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, name } : item)),
    })),
  remove: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
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
      return { items: next };
    }),
  jumpTo: (id) => {
    const bookmark = get().items.find((item) => item.id === id);
    if (!bookmark) {
      return;
    }
    panCameraToCenter(bookmark.centerX, bookmark.centerY, bookmark.zoom);
  },
  clear: () => set({ items: [] }),
}));

