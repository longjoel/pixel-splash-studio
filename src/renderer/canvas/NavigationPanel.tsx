import React, { useMemo } from 'react';
import { useBookmarkStore } from '@/state/bookmarkStore';
import { useReferenceStore } from '@/state/referenceStore';
import { getReferenceBounds } from '@/core/referenceTransforms';
import { useViewportStore } from '@/state/viewportStore';
import { PIXEL_SIZE } from '@/core/grid';

const formatWorld = (value: number) => Math.round(value / PIXEL_SIZE);

const panCameraToCenter = (centerX: number, centerY: number) => {
  const viewport = useViewportStore.getState();
  const zoom = viewport.camera.zoom;
  const width = viewport.width;
  const height = viewport.height;
  if (width <= 0 || height <= 0 || !Number.isFinite(zoom) || zoom <= 0) {
    return;
  }
  const x = centerX - width / (2 * zoom);
  const y = centerY - height / (2 * zoom);
  viewport.setCamera({ x, y });
};

const NavigationPanel = () => {
  const bookmarks = useBookmarkStore((state) => state.items);
  const addBookmark = useBookmarkStore((state) => state.addFromCamera);
  const renameBookmark = useBookmarkStore((state) => state.rename);
  const removeBookmark = useBookmarkStore((state) => state.remove);
  const moveBookmark = useBookmarkStore((state) => state.move);
  const jumpToBookmark = useBookmarkStore((state) => state.jumpTo);
  const references = useReferenceStore((state) => state.items);

  const referenceRows = useMemo(
    () =>
      references.map((ref) => {
        const bounds = getReferenceBounds(ref);
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerY = (bounds.minY + bounds.maxY) / 2;
        return {
          id: ref.id,
          name: ref.assetFilename,
          centerX,
          centerY,
          x: formatWorld(centerX),
          y: formatWorld(centerY),
        };
      }),
    [references]
  );

  return (
    <div className="nav-panel">
      <div className="nav-panel__section">
        <div className="nav-panel__header">
          <div className="nav-panel__title">Bookmarks</div>
          <button
            type="button"
            className="nav-panel__button"
            onClick={addBookmark}
          >
            Add
          </button>
        </div>
        {bookmarks.length === 0 ? (
          <div className="nav-panel__empty">No bookmarks yet.</div>
        ) : (
          <div className="nav-panel__list">
            {bookmarks.map((bookmark, index) => (
              <div key={bookmark.id} className="nav-panel__row">
                <div className="nav-panel__meta">
                  <input
                    className="nav-panel__name"
                    value={bookmark.name}
                    aria-label={`Bookmark name ${index + 1}`}
                    onChange={(event) =>
                      renameBookmark(bookmark.id, event.currentTarget.value)
                    }
                  />
                  <div className="nav-panel__coords">
                    {formatWorld(bookmark.centerX)},{formatWorld(bookmark.centerY)} • z
                    {bookmark.zoom.toFixed(2)}
                  </div>
                </div>
                <div className="nav-panel__actions">
                  <button
                    type="button"
                    className="nav-panel__button"
                    onClick={() => jumpToBookmark(bookmark.id)}
                  >
                    Go
                  </button>
                  <button
                    type="button"
                    className="nav-panel__button"
                    disabled={index === 0}
                    onClick={() => moveBookmark(bookmark.id, 'up')}
                    aria-label="Move bookmark up"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="nav-panel__button"
                    disabled={index === bookmarks.length - 1}
                    onClick={() => moveBookmark(bookmark.id, 'down')}
                    aria-label="Move bookmark down"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="nav-panel__button nav-panel__button--danger"
                    onClick={() => removeBookmark(bookmark.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="nav-panel__section">
        <div className="nav-panel__header">
          <div className="nav-panel__title">References</div>
        </div>
        {referenceRows.length === 0 ? (
          <div className="nav-panel__empty">No references yet.</div>
        ) : (
          <div className="nav-panel__list">
            {referenceRows.map((ref) => (
              <div key={ref.id} className="nav-panel__row">
                <div className="nav-panel__meta">
                  <div className="nav-panel__name nav-panel__name--readonly">
                    {ref.name}
                  </div>
                  <div className="nav-panel__coords">
                    {ref.x},{ref.y}
                  </div>
                </div>
                <div className="nav-panel__actions">
                  <button
                    type="button"
                    className="nav-panel__button"
                    onClick={() => panCameraToCenter(ref.centerX, ref.centerY)}
                  >
                    Go
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationPanel;

