/// <reference types="vite/client" />

type ProjectPayload = {
  data: {
    palette: {
      colors: string[];
      primaryIndex: number;
      secondaryIndex: number;
    };
    camera: {
      x: number;
      y: number;
      zoom: number;
    };
    history?: {
      undoStack: Array<{ changes: Array<{ x: number; y: number; prev: number; next: number }> }>;
      redoStack: Array<{ changes: Array<{ x: number; y: number; prev: number; next: number }> }>;
    };
  };
  blocks: Array<{ row: number; col: number; data: Uint8Array }>;
};

type ProjectLoadResult = ProjectPayload & { path: string };

interface Window {
  projectApi: {
    save: (payload: ProjectPayload, existingPath?: string) => Promise<string | null>;
    load: (existingPath?: string) => Promise<ProjectLoadResult | null>;
  };
  menuApi: {
    onAction: (handler: (action: string) => void) => () => void;
  };
  appApi: {
    setTitle: (title: string) => void;
  };
}
