import { create } from 'zustand';

export type ReferenceSnapMode = 'pixel' | 'tile';

type ReferenceHandleState = {
  snap: ReferenceSnapMode;
  setSnap: (snap: ReferenceSnapMode) => void;
};

export const useReferenceHandleStore = create<ReferenceHandleState>((set) => ({
  snap: 'pixel',
  setSnap: (snap) => set({ snap }),
}));
