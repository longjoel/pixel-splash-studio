import { describe, it, expect, beforeEach } from 'vitest';
import { useClipboardStore } from '@/state/clipboardStore';
import { usePixelStore } from '@/state/pixelStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useToolStore } from '@/state/toolStore';
import { copySelectionToClipboard } from '@/services/selectionClipboard';

describe('deep copy selection', () => {
  beforeEach(() => {
    usePixelStore.getState().clear();
    useSelectionStore.getState().clear();
    useClipboardStore.getState().clear();
    useToolStore.getState().setActiveTool('pen');
  });

  it('copies from active layer only by default', () => {
    const pixelStore = usePixelStore.getState();
    const baseLayerId = pixelStore.activeLayerId;
    pixelStore.setPixel(0, 0, 1);

    const topLayerId = pixelStore.createLayer('Top');
    pixelStore.setActiveLayer(topLayerId);
    pixelStore.setPixel(0, 0, 2);

    pixelStore.setActiveLayer(baseLayerId);
    useSelectionStore.getState().setSelection(0, 0, true);

    copySelectionToClipboard();

    const clipboard = useClipboardStore.getState();
    expect(clipboard.pixels).toHaveLength(1);
    expect(clipboard.pixels[0]?.paletteIndex).toBe(1);
  });

  it('deep copy flattens active layer plus visible layers', () => {
    const pixelStore = usePixelStore.getState();
    const baseLayerId = pixelStore.activeLayerId;
    pixelStore.setPixel(0, 0, 1);

    const topLayerId = pixelStore.createLayer('Top');
    pixelStore.setActiveLayer(topLayerId);
    pixelStore.setPixel(0, 0, 2);

    pixelStore.setActiveLayer(baseLayerId);
    useSelectionStore.getState().setSelection(0, 0, true);

    copySelectionToClipboard({ deep: true });

    const clipboard = useClipboardStore.getState();
    expect(clipboard.pixels).toHaveLength(1);
    expect(clipboard.pixels[0]?.paletteIndex).toBe(2);
  });

  it('deep copy includes active layer even if hidden', () => {
    const pixelStore = usePixelStore.getState();
    const baseLayerId = pixelStore.activeLayerId;
    pixelStore.setPixel(1, 0, 3);
    pixelStore.setLayerVisible(baseLayerId, false);

    useSelectionStore.getState().setSelection(1, 0, true);
    copySelectionToClipboard({ deep: true });

    const clipboard = useClipboardStore.getState();
    expect(clipboard.pixels).toHaveLength(1);
    expect(clipboard.pixels[0]?.paletteIndex).toBe(3);
  });
});

