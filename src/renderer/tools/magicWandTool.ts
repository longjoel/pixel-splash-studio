import type { CursorState, Tool } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePixelStore } from '@/state/pixelStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useViewportStore } from '@/state/viewportStore';

type Bounds = { minX: number; minY: number; maxX: number; maxY: number };

const getViewportBounds = (): Bounds | null => {
  const viewport = useViewportStore.getState();
  if (viewport.width === 0 || viewport.height === 0) {
    return null;
  }
  const viewWidth = viewport.width / viewport.camera.zoom;
  const viewHeight = viewport.height / viewport.camera.zoom;
  return {
    minX: Math.floor(viewport.camera.x / PIXEL_SIZE),
    minY: Math.floor(viewport.camera.y / PIXEL_SIZE),
    maxX: Math.floor((viewport.camera.x + viewWidth) / PIXEL_SIZE),
    maxY: Math.floor((viewport.camera.y + viewHeight) / PIXEL_SIZE),
  };
};

const toGridPoint = (cursor: CursorState) => ({
  x: Math.floor(cursor.canvasX / PIXEL_SIZE),
  y: Math.floor(cursor.canvasY / PIXEL_SIZE),
});

const collectFloodRegion = (
  startX: number,
  startY: number,
  sourceIndex: number,
  bounds: Bounds
) => {
  const pixelStore = usePixelStore.getState();
  const visited = new Set<string>();
  const queueX: number[] = [startX];
  const queueY: number[] = [startY];
  const pixels: Array<{ x: number; y: number }> = [];
  let touchesBoundary = false;

  for (let i = 0; i < queueX.length; i += 1) {
    const x = queueX[i];
    const y = queueY[i];
    if (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY) {
      continue;
    }
    const key = `${x}:${y}`;
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    if (pixelStore.getPixel(x, y) !== sourceIndex) {
      continue;
    }
    if (x === bounds.minX || x === bounds.maxX || y === bounds.minY || y === bounds.maxY) {
      touchesBoundary = true;
    }

    pixels.push({ x, y });
    queueX.push(x + 1, x - 1, x, x);
    queueY.push(y, y, y + 1, y - 1);
  }

  return { pixels, touchesBoundary };
};

export class MagicWandTool implements Tool {
  id = 'magic-wand';

  onBegin = (cursor: CursorState) => {
    const bounds = getViewportBounds();
    if (!bounds) {
      return;
    }

    const { x: startX, y: startY } = toGridPoint(cursor);
    if (startX < bounds.minX || startX > bounds.maxX || startY < bounds.minY || startY > bounds.maxY) {
      return;
    }

    const sourceIndex = usePixelStore.getState().getPixel(startX, startY);
    const { pixels, touchesBoundary } = collectFloodRegion(startX, startY, sourceIndex, bounds);
    if (pixels.length === 0) {
      return;
    }

    if (sourceIndex === 0 && touchesBoundary) {
      return;
    }

    const selected = !cursor.ctrl;
    useSelectionStore
      .getState()
      .setSelections(pixels.map((pixel) => ({ x: pixel.x, y: pixel.y, selected })));
  };
}
