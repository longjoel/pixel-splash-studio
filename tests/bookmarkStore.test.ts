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

  it('adds a region bookmark from the current viewport bounds', () => {
    useBookmarkStore.getState().addFromCamera();
    const items = useBookmarkStore.getState().items;
    expect(items).toHaveLength(1);
    const first = items[0];
    expect(first?.name).toBe('Bookmark 1');
    expect(first?.kind).toBe('region');
    if (!first || first.kind !== 'region') {
      return;
    }
    expect(first.x).toBe(0);
    expect(first.y).toBe(0);
    expect(first.width).toBe(34);
    expect(first.height).toBe(25);
    expect(first.fileName).toBe('');
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

  it('jumps to a region bookmark center at current zoom', () => {
    useBookmarkStore.getState().addFromCamera();
    const id = useBookmarkStore.getState().items[0]?.id;
    expect(id).toBeTruthy();
    if (!id) {
      return;
    }

    useViewportStore.getState().setCamera({ x: 999, y: 999, zoom: 4 });
    useBookmarkStore.getState().jumpTo(id);

    const camera = useViewportStore.getState().camera;
    expect(camera.zoom).toBe(4);
    expect(camera.x).toBe(104);
    expect(camera.y).toBe(75);
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

  it('resizes a region and sets export file name', () => {
    useBookmarkStore.getState().addRegionTag({ x: 10, y: 12, width: 16, height: 8 });
    const id = useBookmarkStore.getState().items[0]?.id;
    expect(id).toBeTruthy();
    if (!id) {
      return;
    }

    useBookmarkStore.getState().setRegionSize(id, 64, 40);
    useBookmarkStore.getState().setRegionFileName(id, 'hero-idle');
    const tag = useBookmarkStore.getState().items[0];
    expect(tag?.kind).toBe('region');
    if (!tag || tag.kind !== 'region') {
      return;
    }
    expect(tag.width).toBe(64);
    expect(tag.height).toBe(40);
    expect(tag.fileName).toBe('hero-idle');
  });

  it('normalizes legacy camera bookmarks into region bookmarks', () => {
    useBookmarkStore.getState().setAll([
      {
        id: 'legacy',
        name: 'Legacy',
        kind: 'camera',
        centerX: 120,
        centerY: 240,
        zoom: 2,
      },
    ]);

    const item = useBookmarkStore.getState().items[0];
    expect(item?.kind).toBe('region');
    if (!item || item.kind !== 'region') {
      return;
    }
    expect(item.x).toBe(10);
    expect(item.y).toBe(20);
    expect(item.width).toBe(32);
    expect(item.height).toBe(32);
  });

  it('toggles bookmark overlay visibility', () => {
    expect(useBookmarkStore.getState().overlaysVisible).toBe(true);
    useBookmarkStore.getState().toggleOverlaysVisible();
    expect(useBookmarkStore.getState().overlaysVisible).toBe(false);
    useBookmarkStore.getState().setOverlaysVisible(true);
    expect(useBookmarkStore.getState().overlaysVisible).toBe(true);
  });
});
