import { create } from 'zustand';

export type SelectionSnap = 'pixel' | 'tile';

type SelectionRectangleState = {
  snap: SelectionSnap;
  setSnap: (snap: SelectionSnap) => void;
};

export const useSelectionRectangleStore = create<SelectionRectangleState>((set) => ({
  snap: 'pixel',
  setSnap: (snap) => set({ snap }),
}));
