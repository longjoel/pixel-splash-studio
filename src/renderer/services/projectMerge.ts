import { usePaletteStore } from '@/state/paletteStore';
import { usePixelStore } from '@/state/pixelStore';
import { enqueuePixelChanges } from '@/services/largeOperationQueue';
import { BLOCK_SIZE } from '@/core/canvasStore';

const palettesMatch = (a: string[], b: string[]) => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

export const readSplashProject = async (existingPath?: string) => {
  if (!window.projectApi?.read) {
    window.alert('Project import is unavailable. Restart the app to load the latest import support.');
    return null;
  }
  return window.projectApi.read(existingPath);
};

export const mergeProjectPixels = (
  payload: ProjectPayload,
  options: { offsetX: number; offsetY: number }
) => {
  const incomingPalette = payload.data.palette?.colors ?? [];
  const paletteStore = usePaletteStore.getState();
  if (!palettesMatch(paletteStore.colors, incomingPalette)) {
    window.alert(
      'Palette mismatch. For now, project merge requires both projects to have identical palettes.'
    );
    return;
  }

  const pixelStore = usePixelStore.getState();
  const targetLayerId = pixelStore.activeLayerId;

  const offsetX = Math.trunc(options.offsetX);
  const offsetY = Math.trunc(options.offsetY);

  // Composite all visible layers from the incoming project (topmost non-zero wins).
  const nextByKey = new Map<string, number>();
  const layers =
    payload.layers && payload.layers.length > 0
      ? payload.layers
      : payload.blocks
        ? [{ id: 'legacy', name: 'Layer 1', visible: true, blocks: payload.blocks }]
        : [];
  for (const layer of layers) {
    if (layer.visible === false) {
      continue;
    }
    for (const block of layer.blocks) {
      const baseX = block.col * BLOCK_SIZE;
      const baseY = block.row * BLOCK_SIZE;
      const data = block.data;
      for (let i = 0; i < data.length; i += 1) {
        const value = data[i] ?? 0;
        if (value === 0) {
          continue;
        }
        const localX = i % BLOCK_SIZE;
        const localY = Math.floor(i / BLOCK_SIZE);
        const x = baseX + localX;
        const y = baseY + localY;
        nextByKey.set(`${x}:${y}`, value);
      }
    }
  }

  const changes: Array<{ x: number; y: number; prev: number; next: number }> = [];
  for (const [key, next] of nextByKey.entries()) {
    const [xText, yText] = key.split(':');
    const sourceX = Number(xText);
    const sourceY = Number(yText);
    const x = sourceX + offsetX;
    const y = sourceY + offsetY;
    const prev = pixelStore.getPixelInLayer(targetLayerId, x, y);
    if (prev === next) {
      continue;
    }
    changes.push({ x, y, prev, next });
  }

  enqueuePixelChanges(changes, { label: 'Merge Project' });
};
