import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { useViewportStore } from '@/state/viewportStore';
import { usePreviewStore } from '@/state/previewStore';
import { useHistoryStore } from '@/state/historyStore';
import { useProjectStore } from '@/state/projectStore';

export const buildProjectPayload = () => {
  const palette = usePaletteStore.getState();
  const viewport = useViewportStore.getState();
  const pixelStore = usePixelStore.getState();
  const history = useHistoryStore.getState();

  return {
    data: {
      palette: {
        colors: palette.colors,
        primaryIndex: palette.primaryIndex,
        secondaryIndex: palette.secondaryIndex,
      },
      camera: viewport.camera,
      history: {
        undoStack: history.undoStack,
        redoStack: history.redoStack,
      },
    },
    blocks: pixelStore.store.getBlocks().map((block) => ({
      row: block.row,
      col: block.col,
      data: block.block,
    })),
  } satisfies ProjectPayload;
};

export const applyProjectPayload = (payload: ProjectPayload) => {
  const palette = usePaletteStore.getState();
  palette.setPalette(
    payload.data.palette.colors,
    payload.data.palette.primaryIndex,
    payload.data.palette.secondaryIndex
  );

  const viewport = useViewportStore.getState();
  viewport.setCamera(payload.data.camera);

  const pixelStore = usePixelStore.getState();
  pixelStore.loadBlocks(payload.blocks);

  const preview = usePreviewStore.getState();
  preview.clear();

  const history = useHistoryStore.getState();
  history.setStacks(payload.data.history?.undoStack ?? [], payload.data.history?.redoStack ?? []);

  const project = useProjectStore.getState();
  project.setDirty(false);
};

export const saveProject = async (existingPath?: string) => {
  const payload = buildProjectPayload();
  const path = await window.projectApi.save(payload, existingPath);
  if (path) {
    const project = useProjectStore.getState();
    project.setPath(path);
    project.setDirty(false);
  }
  return path;
};

export const loadProject = async (existingPath?: string) => {
  const result = await window.projectApi.load(existingPath);
  if (!result) {
    return null;
  }
  applyProjectPayload(result);
  const project = useProjectStore.getState();
  project.setPath(result.path);
  project.setDirty(false);
  return result.path;
};

export const newProject = () => {
  const palette = usePaletteStore.getState();
  palette.reset();
  const viewport = useViewportStore.getState();
  viewport.setCamera({ x: 0, y: 0, zoom: 1 });
  const pixelStore = usePixelStore.getState();
  pixelStore.clear();
  const preview = usePreviewStore.getState();
  preview.clear();
  const history = useHistoryStore.getState();
  history.clear();
  const project = useProjectStore.getState();
  project.setPath(null);
  project.setDirty(false);
};
