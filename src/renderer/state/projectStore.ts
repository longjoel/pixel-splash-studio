import { create } from 'zustand';

const defaultTitle = 'Pixel Splash Studio';

const formatTitle = (path: string | null, dirty: boolean) => {
  const name = path ? path.split(/[/\\]/).pop() ?? path : '(unsaved)';
  return `${defaultTitle} - ${name}${dirty ? '*' : ''}`;
};

type ProjectState = {
  path: string | null;
  dirty: boolean;
  setPath: (path: string | null) => void;
  setDirty: (dirty: boolean) => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  path: null,
  dirty: false,
  setPath: (path) => set({ path }),
  setDirty: (dirty) => set({ dirty }),
}));

export const getProjectTitle = () => {
  const state = useProjectStore.getState();
  return formatTitle(state.path, state.dirty);
};
