import type { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE } from '@/core/grid';
import { usePixelStore } from '@/state/pixelStore';
import { usePaletteStore } from '@/state/paletteStore';
import { usePreviewStore } from '@/state/previewStore';

const pickColorAtCursor = (cursor: CursorState) => {
  const gridX = Math.floor(cursor.canvasX / PIXEL_SIZE);
  const gridY = Math.floor(cursor.canvasY / PIXEL_SIZE);
  const paletteIndex = usePixelStore.getState().getPixelComposite(gridX, gridY);
  const palette = usePaletteStore.getState();
  if (cursor.ctrl) {
    palette.setSelectedIndices(
      [...palette.selectedIndices.filter((idx) => idx !== paletteIndex), paletteIndex]
    );
    return;
  }
  palette.setSelectedIndices([paletteIndex]);
};

export class EyeDropperTool implements Tool {
  id = 'eyedropper';

  onHover = () => {
    usePreviewStore.getState().clear();
  };

  onBegin = (cursor: CursorState) => {
    usePreviewStore.getState().clear();
    pickColorAtCursor(cursor);
  };

  onMove = (cursor: CursorState) => {
    pickColorAtCursor(cursor);
  };

  onCancel = () => {
    usePreviewStore.getState().clear();
  };
}
