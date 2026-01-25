import { describe, it, expect, beforeEach } from 'vitest';
import { useLayerVisibilityStore } from '@/state/layerVisibilityStore';

describe('layerVisibilityStore', () => {
  beforeEach(() => {
    const state = useLayerVisibilityStore.getState();
    state.setShowReferenceLayer(true);
    state.setShowPixelLayer(true);
    state.setShowTileLayer(true);
    state.setShowPixelGrid(true);
    state.setShowTileGrid(true);
    state.setShowAxes(true);
  });

  it('toggles pixel grid visibility', () => {
    expect(useLayerVisibilityStore.getState().showPixelGrid).toBe(true);
    useLayerVisibilityStore.getState().togglePixelGrid();
    expect(useLayerVisibilityStore.getState().showPixelGrid).toBe(false);
    useLayerVisibilityStore.getState().togglePixelGrid();
    expect(useLayerVisibilityStore.getState().showPixelGrid).toBe(true);
  });

  it('toggles tile grid visibility', () => {
    expect(useLayerVisibilityStore.getState().showTileGrid).toBe(true);
    useLayerVisibilityStore.getState().toggleTileGrid();
    expect(useLayerVisibilityStore.getState().showTileGrid).toBe(false);
    useLayerVisibilityStore.getState().toggleTileGrid();
    expect(useLayerVisibilityStore.getState().showTileGrid).toBe(true);
  });

  it('toggles axes visibility', () => {
    expect(useLayerVisibilityStore.getState().showAxes).toBe(true);
    useLayerVisibilityStore.getState().toggleAxes();
    expect(useLayerVisibilityStore.getState().showAxes).toBe(false);
    useLayerVisibilityStore.getState().toggleAxes();
    expect(useLayerVisibilityStore.getState().showAxes).toBe(true);
  });
});
