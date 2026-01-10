import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { useViewportStore } from '@/state/viewportStore';
import { usePreviewStore } from '@/state/previewStore';
import { useHistoryStore } from '@/state/historyStore';
import { useProjectStore } from '@/state/projectStore';
import { useReferenceStore } from '@/state/referenceStore';

const loadImageFromBytes = (data: Uint8Array, type: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const blob = new Blob([data], { type: type || 'image/png' });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load reference image'));
    };
    image.src = url;
  });

export const buildProjectPayload = () => {
  const palette = usePaletteStore.getState();
  const viewport = useViewportStore.getState();
  const pixelStore = usePixelStore.getState();
  const history = useHistoryStore.getState();
  const referenceStore = useReferenceStore.getState();

  const referenceFiles = new Map<
    string,
    { filename: string; data: Uint8Array; type: string }
  >();
  const referenceData = referenceStore.items
    .filter((reference) => reference.assetFilename && reference.assetData)
    .map((reference) => {
      if (!referenceFiles.has(reference.assetFilename)) {
        referenceFiles.set(reference.assetFilename, {
          filename: reference.assetFilename,
          data: reference.assetData,
          type: reference.assetType,
        });
      }
      return {
        id: reference.id,
        filename: reference.assetFilename,
        type: reference.assetType,
        width: reference.width,
        height: reference.height,
        x: reference.x,
        y: reference.y,
        scale: reference.scale,
        rotation: reference.rotation,
        flipX: reference.flipX,
        flipY: reference.flipY,
        opacity: reference.opacity,
      };
    });

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
      references: referenceData.length > 0 ? referenceData : undefined,
    },
    blocks: pixelStore.store.getBlocks().map((block) => ({
      row: block.row,
      col: block.col,
      data: block.block,
    })),
    referenceFiles:
      referenceFiles.size > 0 ? Array.from(referenceFiles.values()) : undefined,
  } satisfies ProjectPayload;
};

export const applyProjectPayload = async (payload: ProjectPayload) => {
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

  const referenceStore = useReferenceStore.getState();
  referenceStore.clear();
  const referenceEntries = payload.data.references ?? [];
  const referenceFiles = payload.referenceFiles ?? [];
  if (referenceEntries.length > 0 && referenceFiles.length > 0) {
    const fileMap = new Map(referenceFiles.map((file) => [file.filename, file]));
    const loaded = await Promise.all(
      referenceEntries.map(async (reference) => {
        const file = fileMap.get(reference.filename);
        if (!file) {
          return null;
        }
        const image = await loadImageFromBytes(file.data, file.type || reference.type);
        const width = Number.isFinite(reference.width)
          ? reference.width
          : image.naturalWidth || image.width;
        const height = Number.isFinite(reference.height)
          ? reference.height
          : image.naturalHeight || image.height;
        return {
          id: reference.id,
          image,
          assetFilename: file.filename,
          assetType: file.type || reference.type,
          assetData: file.data,
          width,
          height,
          x: reference.x ?? 0,
          y: reference.y ?? 0,
          scale: reference.scale ?? 1,
          rotation: reference.rotation ?? 0,
          flipX: reference.flipX ?? false,
          flipY: reference.flipY ?? false,
          opacity: reference.opacity ?? 0.7,
        };
      })
    );
    for (const reference of loaded) {
      if (!reference) {
        continue;
      }
      referenceStore.addReference(reference);
    }
    referenceStore.setSelected(null);
  }

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
  await applyProjectPayload(result);
  const project = useProjectStore.getState();
  project.setPath(result.path);
  project.setDirty(false);
  return result.path;
};

export const newProject = () => {
  const palette = usePaletteStore.getState();
  palette.reset();
  const viewport = useViewportStore.getState();
  viewport.resetCamera();
  const pixelStore = usePixelStore.getState();
  pixelStore.clear();
  const preview = usePreviewStore.getState();
  preview.clear();
  const history = useHistoryStore.getState();
  history.clear();
  const referenceStore = useReferenceStore.getState();
  referenceStore.clear();
  const project = useProjectStore.getState();
  project.setPath(null);
  project.setDirty(false);
};
