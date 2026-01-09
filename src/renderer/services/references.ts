import { PIXEL_SIZE } from '@/core/grid';
import { useReferenceStore } from '@/state/referenceStore';
import { useViewportStore } from '@/state/viewportStore';
import { useToolStore } from '@/state/toolStore';
import { REFERENCE_SCALE_MAX, REFERENCE_SCALE_MIN } from '../../constants';
import { EXTENSION_MIME_MAP, MIME_EXTENSION_MAP } from '../../constants';

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image'));
    image.src = src;
  });

const sanitizeExtension = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '');

const getExtensionFromName = (name: string) => {
  const parts = name.split('.');
  if (parts.length < 2) {
    return '';
  }
  return sanitizeExtension(parts[parts.length - 1]);
};

const resolveReferenceExtension = (file: File, type: string) => {
  const nameExtension = getExtensionFromName(file.name ?? '');
  if (nameExtension) {
    return nameExtension;
  }
  return sanitizeExtension(MIME_EXTENSION_MAP[type] ?? type.split('/')[1] ?? '');
};

const resolveReferenceMimeType = (type: string, extension: string) => {
  if (type) {
    return type;
  }
  if (extension && EXTENSION_MIME_MAP[extension]) {
    return EXTENSION_MIME_MAP[extension];
  }
  return 'image/png';
};

const createReferenceFilename = (file: File, type: string) => {
  const extension = resolveReferenceExtension(file, type);
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `reference-${id}${extension ? `.${extension}` : ''}`;
};

const getViewportCenter = () => {
  const viewport = useViewportStore.getState();
  const viewWidth = viewport.width / viewport.camera.zoom;
  const viewHeight = viewport.height / viewport.camera.zoom;
  return {
    x: viewport.camera.x + viewWidth / 2,
    y: viewport.camera.y + viewHeight / 2,
  };
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getReferenceFitScale = (image: HTMLImageElement) => {
  const viewport = useViewportStore.getState();
  const viewWidth = viewport.width / viewport.camera.zoom;
  const viewHeight = viewport.height / viewport.camera.zoom;
  if (!image.naturalWidth || !image.naturalHeight) {
    return 1;
  }
  const baseWidth = image.naturalWidth * PIXEL_SIZE;
  const baseHeight = image.naturalHeight * PIXEL_SIZE;
  const fitScale = Math.min(viewWidth / baseWidth, viewHeight / baseHeight) * 0.9;
  return clamp(fitScale, REFERENCE_SCALE_MIN, REFERENCE_SCALE_MAX);
};

const toGrid = (world: { x: number; y: number }) => ({
  x: Math.floor(world.x / PIXEL_SIZE),
  y: Math.floor(world.y / PIXEL_SIZE),
});

export const addReferenceFromFile = async (
  file: File,
  worldPosition?: { x: number; y: number }
) => {
  if (!file.type.startsWith('image/')) {
    return;
  }
  const rawType = file.type ?? '';
  const extension = resolveReferenceExtension(file, rawType);
  const assetType = resolveReferenceMimeType(rawType, extension);
  const [dataUrl, buffer] = await Promise.all([readFileAsDataUrl(file), file.arrayBuffer()]);
  const image = await loadImage(dataUrl);
  const position = worldPosition ?? getViewportCenter();
  const gridPosition = toGrid(position);
  const scale = getReferenceFitScale(image);
  const assetFilename = createReferenceFilename(file, assetType);
  useReferenceStore.getState().addReference({
    image,
    assetFilename,
    assetType,
    assetData: new Uint8Array(buffer),
    width: image.naturalWidth || image.width,
    height: image.naturalHeight || image.height,
    x: gridPosition.x,
    y: gridPosition.y,
    scale,
    rotation: 0,
    flipX: false,
    flipY: false,
    opacity: 0.7,
  });
  useToolStore.getState().setActiveTool('reference-handle');
};

export const addReferencesFromFiles = async (
  files: File[],
  worldPosition?: { x: number; y: number }
) => {
  const imageFiles = files.filter((file) => file.type.startsWith('image/'));
  if (imageFiles.length === 0) {
    return;
  }
  const base = worldPosition ?? getViewportCenter();
  for (let i = 0; i < imageFiles.length; i += 1) {
    const offset = i * PIXEL_SIZE * 2;
    const pos = { x: base.x + offset, y: base.y + offset };
    await addReferenceFromFile(imageFiles[i], pos);
  }
};
