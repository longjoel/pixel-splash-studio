import { describe, it, expect, beforeEach } from 'vitest';
import { usePixelStore } from '@/state/pixelStore';

describe('pixel layers', () => {
  beforeEach(() => {
    usePixelStore.getState().clear();
  });

  it('isolates pixel data per layer and composites top-most visible pixel', () => {
    const store = usePixelStore.getState();
    const baseLayerId = store.activeLayerId;
    store.setPixel(0, 0, 1);

    const topLayerId = store.createLayer('Top');
    store.setActiveLayer(topLayerId);
    store.setPixel(0, 0, 2);

    expect(store.getPixelInLayer(baseLayerId, 0, 0)).toBe(1);
    expect(store.getPixelInLayer(topLayerId, 0, 0)).toBe(2);

    expect(store.getPixel(0, 0)).toBe(2);
    expect(store.getPixelComposite(0, 0)).toBe(2);

    store.setLayerVisible(topLayerId, false);
    expect(store.getPixelComposite(0, 0)).toBe(1);
  });

  it('reorders layers to affect stacking order', () => {
    const store = usePixelStore.getState();
    const bottomId = store.activeLayerId;
    store.setPixel(0, 0, 1);

    const topId = store.createLayer('Top');
    store.setActiveLayer(topId);
    store.setPixel(0, 0, 2);

    expect(store.getPixelComposite(0, 0)).toBe(2);

    store.moveLayer(bottomId, 'up');
    expect(store.getPixelComposite(0, 0)).toBe(1);
  });
});

