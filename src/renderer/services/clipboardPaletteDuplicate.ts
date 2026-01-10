import { useClipboardStore } from '@/state/clipboardStore';
import { usePaletteStore } from '@/state/paletteStore';

export const duplicateClipboardPalette = () => {
  const clipboard = useClipboardStore.getState();
  if (clipboard.pixels.length === 0) {
    return false;
  }

  const paletteStore = usePaletteStore.getState();
  const baseColors = paletteStore.colors;
  const nextColors = [...baseColors];
  const indexMap = new Map<number, number>();

  for (const pixel of clipboard.pixels) {
    const sourceIndex = pixel.paletteIndex;
    if (sourceIndex === 0 || indexMap.has(sourceIndex)) {
      continue;
    }
    const color = baseColors[sourceIndex] ?? baseColors[0] ?? '#000000';
    indexMap.set(sourceIndex, nextColors.length);
    nextColors.push(color);
  }

  if (indexMap.size === 0) {
    return false;
  }

  const nextPixels = clipboard.pixels.map((pixel) => {
    const mapped = indexMap.get(pixel.paletteIndex);
    if (!mapped) {
      return pixel;
    }
    return { ...pixel, paletteIndex: mapped };
  });

  paletteStore.setPalette(
    nextColors,
    paletteStore.primaryIndex,
    paletteStore.secondaryIndex
  );

  useClipboardStore.getState().setBuffer({
    pixels: nextPixels,
    origin: clipboard.origin ?? { x: 0, y: 0 },
    width: clipboard.width,
    height: clipboard.height,
  });

  return true;
};
