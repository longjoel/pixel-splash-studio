import { useClipboardStore } from '@/state/clipboardStore';
import { useHistoryStore } from '@/state/historyStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { usePreviewStore } from '@/state/previewStore';
import { useProjectStore } from '@/state/projectStore';

const normalizeColor = (color: string) => color.trim().toLowerCase();

const buildIndexMap = (colors: string[]) => {
  const seen = new Map<string, number>();
  const mapped: number[] = [];
  const nextColors: string[] = [];

  colors.forEach((color, index) => {
    const key = normalizeColor(color);
    const existing = seen.get(key);
    if (existing !== undefined) {
      mapped[index] = existing;
      return;
    }
    const nextIndex = nextColors.length;
    seen.set(key, nextIndex);
    mapped[index] = nextIndex;
    nextColors.push(color);
  });

  return { mapped, nextColors };
};

export const consolidatePalette = () => {
  const paletteStore = usePaletteStore.getState();
  const colors = paletteStore.colors;
  const { mapped, nextColors } = buildIndexMap(colors);
  if (nextColors.length === colors.length) {
    return false;
  }

  const mapIndex = (value: number) =>
    Number.isFinite(value) && value >= 0 && value < mapped.length ? mapped[value] : 0;

  paletteStore.setPalette(
    nextColors,
    mapIndex(paletteStore.primaryIndex),
    mapIndex(paletteStore.secondaryIndex)
  );

  const pixelStore = usePixelStore.getState();
  const remappedLayers = pixelStore.exportLayerPayloads().map((layer) => ({
    ...layer,
    blocks: layer.blocks.map(({ row, col, data: source }) => {
      const data = new Uint8Array(source.length);
      for (let i = 0; i < source.length; i += 1) {
        data[i] = mapIndex(source[i]);
      }
      return { row, col, data };
    }),
  }));
  pixelStore.loadLayerPayloads(remappedLayers, pixelStore.activeLayerId);

  const previewStore = usePreviewStore.getState();
  for (const [key, pixel] of previewStore.pixels.entries()) {
    const nextIndex = mapIndex(pixel.paletteIndex);
    if (nextIndex !== pixel.paletteIndex) {
      previewStore.pixels.set(key, { ...pixel, paletteIndex: nextIndex });
    }
  }

  const clipboard = useClipboardStore.getState();
  if (clipboard.pixels.length > 0) {
    const nextPixels = clipboard.pixels.map((pixel) => ({
      ...pixel,
      paletteIndex: mapIndex(pixel.paletteIndex),
    }));
    const origin = clipboard.origin ?? { x: 0, y: 0 };
    useClipboardStore.getState().setBuffer({
      pixels: nextPixels,
      origin,
      width: clipboard.width,
      height: clipboard.height,
    });
  }

  const historyStore = useHistoryStore.getState();
  const remapBatch = (batch: {
    layerId?: string;
    changes: Array<{ x: number; y: number; prev: number; next: number }>;
  }) => ({
    layerId: batch.layerId,
    changes: batch.changes.map((change) => ({
      ...change,
      prev: mapIndex(change.prev),
      next: mapIndex(change.next),
    })),
  });
  historyStore.setStacks(
    historyStore.undoStack.map(remapBatch),
    historyStore.redoStack.map(remapBatch)
  );

  useProjectStore.getState().setDirty(true);
  return true;
};
