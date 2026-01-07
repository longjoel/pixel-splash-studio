import { create } from 'zustand';
import { useProjectStore } from '@/state/projectStore';

export type ReferenceImage = {
  id: string;
  image: HTMLImageElement;
  assetFilename: string;
  assetType: string;
  assetData: Uint8Array;
  width: number;
  height: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  opacity: number;
};

type ReferenceState = {
  items: ReferenceImage[];
  selectedId: string | null;
  addReference: (payload: Omit<ReferenceImage, 'id'> & { id?: string }) => string;
  setSelected: (id: string | null) => void;
  updateReference: (id: string, patch: Partial<Omit<ReferenceImage, 'id' | 'image'>>) => void;
  removeReference: (id: string) => void;
  clear: () => void;
};

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `ref-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const useReferenceStore = create<ReferenceState>((set) => ({
  items: [],
  selectedId: null,
  addReference: (payload) => {
    const { id: providedId, ...rest } = payload;
    const id = providedId ?? createId();
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      items: [...state.items, { id, ...rest }],
      selectedId: id,
    }));
    return id;
  },
  setSelected: (id) => set({ selectedId: id }),
  updateReference: (id, patch) => {
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  },
  removeReference: (id) => {
    useProjectStore.getState().setDirty(true);
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }));
  },
  clear: () => {
    useProjectStore.getState().setDirty(true);
    set({ items: [], selectedId: null });
  },
}));
