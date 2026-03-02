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

  it('merges the active layer into the one below and removes the source layer', () => {
    const store = usePixelStore.getState();
    const bottomId = store.activeLayerId;
    store.setPixel(0, 0, 1);
    store.setPixel(1, 1, 4);

    const topId = store.createLayer('Top');
    store.setActiveLayer(topId);
    store.setPixel(0, 0, 2);
    store.setPixel(1, 1, 0);
    store.setPixel(2, 2, 3);

    store.mergeLayerDown(topId);

    const next = usePixelStore.getState();
    expect(next.layers.map((layer) => layer.id)).toEqual([bottomId]);
    expect(next.activeLayerId).toBe(bottomId);
    expect(next.getPixelInLayer(bottomId, 0, 0)).toBe(2);
    expect(next.getPixelInLayer(bottomId, 1, 1)).toBe(4);
    expect(next.getPixelInLayer(bottomId, 2, 2)).toBe(3);
  });

  it('does nothing when trying to merge the bottom layer down', () => {
    const store = usePixelStore.getState();
    const bottomId = store.activeLayerId;
    const beforeVersion = store.version;

    store.mergeLayerDown(bottomId);

    const next = usePixelStore.getState();
    expect(next.layers).toHaveLength(1);
    expect(next.activeLayerId).toBe(bottomId);
    expect(next.version).toBe(beforeVersion);
  });
});
