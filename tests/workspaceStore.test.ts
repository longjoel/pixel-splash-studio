import { beforeEach, describe, expect, it } from 'vitest';
import { useLayerVisibilityStore } from '@/state/layerVisibilityStore';
import { useWorkspaceStore } from '@/state/workspaceStore';

describe('workspaceStore', () => {
  beforeEach(() => {
    useLayerVisibilityStore.getState().setShowPixelLayer(true);
    useLayerVisibilityStore.getState().setShowTileLayer(true);
    useWorkspaceStore.getState().setMode('pixel');
  });

  it('defaults to tile layer when switching to tile mode', () => {
    useLayerVisibilityStore.getState().setShowPixelLayer(true);
    useLayerVisibilityStore.getState().setShowTileLayer(false);

    useWorkspaceStore.getState().setMode('tile');

    const visibility = useLayerVisibilityStore.getState();
    expect(useWorkspaceStore.getState().mode).toBe('tile');
    expect(visibility.showPixelLayer).toBe(false);
    expect(visibility.showTileLayer).toBe(true);
  });

  it('defaults to pixel layer when switching back to pixel mode', () => {
    useWorkspaceStore.getState().setMode('tile');
    useLayerVisibilityStore.getState().setShowPixelLayer(true);
    useLayerVisibilityStore.getState().setShowTileLayer(true);

    useWorkspaceStore.getState().setMode('pixel');

    const visibility = useLayerVisibilityStore.getState();
    expect(useWorkspaceStore.getState().mode).toBe('pixel');
    expect(visibility.showPixelLayer).toBe(true);
    expect(visibility.showTileLayer).toBe(false);
  });

  it('still allows manual layer toggles after switching', () => {
    useWorkspaceStore.getState().setMode('tile');
    useLayerVisibilityStore.getState().setShowPixelLayer(true);
    useLayerVisibilityStore.getState().setShowTileLayer(false);

    const visibility = useLayerVisibilityStore.getState();
    expect(visibility.showPixelLayer).toBe(true);
    expect(visibility.showTileLayer).toBe(false);
  });
});
