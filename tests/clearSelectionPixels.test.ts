import { beforeEach, describe, expect, it } from 'vitest';
import { usePixelStore } from '@/state/pixelStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useHistoryStore } from '@/state/historyStore';
import { clearSelectionPixels } from '@/services/selectionClipboard';

describe('clearSelectionPixels', () => {
  beforeEach(() => {
    usePixelStore.getState().clear();
    useSelectionStore.getState().clear();
    useHistoryStore.getState().clear();
  });

  it('clears selected pixels in the active layer and records a history batch', () => {
    const pixelStore = usePixelStore.getState();
    const selectionStore = useSelectionStore.getState();

    pixelStore.setPixel(0, 0, 5);
    pixelStore.setPixel(1, 0, 6);
    pixelStore.setPixel(2, 0, 7);

    selectionStore.setSelection(0, 0, true);
    selectionStore.setSelection(2, 0, true);

    clearSelectionPixels();

    expect(pixelStore.getPixel(0, 0)).toBe(0);
    expect(pixelStore.getPixel(2, 0)).toBe(0);
    expect(pixelStore.getPixel(1, 0)).toBe(6);

    const { undoStack } = useHistoryStore.getState();
    expect(undoStack.length).toBe(1);
    const batch = undoStack[0];
    expect(batch?.changes.length).toBe(2);
    expect(batch?.changes.map((change) => `${change.x}:${change.y}:${change.prev}->${change.next}`))
      .toEqual(['0:0:5->0', '2:0:7->0']);
  });
});
