import { describe, it, expect, beforeEach } from 'vitest';
import { useBookmarkStore } from '@/state/bookmarkStore';
import { useViewportStore } from '@/state/viewportStore';
import { newProject } from '@/services/project';

describe('bookmarkStore', () => {
  beforeEach(() => {
    useBookmarkStore.getState().clear();
    useViewportStore.getState().setSize(800, 600);
    useViewportStore.getState().setCamera({ x: 0, y: 0, zoom: 2 });
  });

  it('adds a bookmark at the current camera center', () => {
    useBookmarkStore.getState().addFromCamera();
    const items = useBookmarkStore.getState().items;
    expect(items).toHaveLength(1);
    const first = items[0];
    expect(first?.name).toBe('Bookmark 1');
    expect(first?.kind).toBe('camera');
    if (!first || first.kind !== 'camera') {
      return;
    }
    expect(first.centerX).toBe(200);
    expect(first.centerY).toBe(150);
    expect(first.zoom).toBe(2);
  });

  it('reorders bookmarks', () => {
    useBookmarkStore.getState().addFromCamera();
    useViewportStore.getState().panTo(100, 100);
    useBookmarkStore.getState().addFromCamera();
    const [first, second] = useBookmarkStore.getState().items;
    expect(first && second).toBeTruthy();
    if (!first || !second) {
      return;
    }
    useBookmarkStore.getState().move(second.id, 'up');
    expect(useBookmarkStore.getState().items[0]?.id).toBe(second.id);
    useBookmarkStore.getState().move(second.id, 'down');
    expect(useBookmarkStore.getState().items[1]?.id).toBe(second.id);
  });

  it('jumps to a bookmark and restores zoom', () => {
    useViewportStore.getState().setCamera({ x: 50, y: 25, zoom: 1 });
    useBookmarkStore.getState().addFromCamera();
    const id = useBookmarkStore.getState().items[0]?.id;
    expect(id).toBeTruthy();
    if (!id) {
      return;
    }

    useViewportStore.getState().setCamera({ x: 999, y: 999, zoom: 4 });
    useBookmarkStore.getState().jumpTo(id);

    const camera = useViewportStore.getState().camera;
    expect(camera.zoom).toBe(1);
    expect(camera.x).toBe(50);
    expect(camera.y).toBe(25);
  });

  it('clears bookmarks on new project', () => {
    useBookmarkStore.getState().addFromCamera();
    expect(useBookmarkStore.getState().items.length).toBe(1);
    newProject();
    expect(useBookmarkStore.getState().items.length).toBe(0);
  });

  it('adds and moves a region tag bookmark', () => {
    useBookmarkStore.getState().addRegionTag({ x: 10, y: 12, width: 16, height: 8 });
    let tag = useBookmarkStore.getState().items[0];
    expect(tag?.kind).toBe('region');
    if (!tag || tag.kind !== 'region') {
      return;
    }
    expect(tag.x).toBe(10);
    expect(tag.y).toBe(12);
    useBookmarkStore.getState().setRegionPosition(tag.id, 40, 50);
    tag = useBookmarkStore.getState().items[0];
    expect(tag?.kind).toBe('region');
    if (!tag || tag.kind !== 'region') {
      return;
    }
    expect(tag.x).toBe(40);
    expect(tag.y).toBe(50);
  });

  it('toggles bookmark overlay visibility', () => {
    expect(useBookmarkStore.getState().overlaysVisible).toBe(true);
    useBookmarkStore.getState().toggleOverlaysVisible();
    expect(useBookmarkStore.getState().overlaysVisible).toBe(false);
    useBookmarkStore.getState().setOverlaysVisible(true);
    expect(useBookmarkStore.getState().overlaysVisible).toBe(true);
  });
});
