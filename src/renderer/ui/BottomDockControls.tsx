import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLayerVisibilityStore } from '@/state/layerVisibilityStore';
import { useHistoryStore } from '@/state/historyStore';
import { useSelectionStore } from '@/state/selectionStore';
import { copySelectionToClipboard, cutSelectionToClipboard } from '@/services/selectionClipboard';
import { exportSelectionAsPng } from '@/services/selectionExport';
import { openImageFilePicker } from '@/services/filePickers';
import { addReferenceFromFile } from '@/services/references';

type DockMenu = 'layers' | 'overlays' | 'actions';

type MenuState = {
  open: boolean;
  kind: DockMenu;
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const useMenuPosition = (open: boolean, x: number, y: number, ref: React.RefObject<HTMLElement>) => {
  const [pos, setPos] = useState({ x, y });

  useLayoutEffect(() => {
    if (!open || !ref.current) {
      setPos({ x, y });
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const padding = 8;
    const maxX = Math.max(padding, window.innerWidth - rect.width - padding);
    const maxY = Math.max(padding, window.innerHeight - rect.height - padding);
    setPos({
      x: clamp(x, padding, maxX),
      y: clamp(y, padding, maxY),
    });
  }, [open, ref, x, y]);

  return pos;
};

const ToggleRow = ({
  checked,
  label,
  onChange,
  title,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
  title?: string;
}) => (
  <button
    type="button"
    className="bottom-dock__menu-item bottom-dock__menu-toggle"
    data-active={checked}
    onClick={onChange}
    title={title}
    role="menuitemcheckbox"
    aria-checked={checked}
  >
    <span className="bottom-dock__menu-toggle-indicator" aria-hidden="true" />
    <span>{label}</span>
  </button>
);

export const BottomDockControls = () => {
  const showReferenceLayer = useLayerVisibilityStore((state) => state.showReferenceLayer);
  const showPixelLayer = useLayerVisibilityStore((state) => state.showPixelLayer);
  const showTileLayer = useLayerVisibilityStore((state) => state.showTileLayer);
  const showPixelGrid = useLayerVisibilityStore((state) => state.showPixelGrid);
  const showTileGrid = useLayerVisibilityStore((state) => state.showTileGrid);
  const showAxes = useLayerVisibilityStore((state) => state.showAxes);
  const toggleReferenceLayer = useLayerVisibilityStore((state) => state.toggleReferenceLayer);
  const togglePixelLayer = useLayerVisibilityStore((state) => state.togglePixelLayer);
  const toggleTileLayer = useLayerVisibilityStore((state) => state.toggleTileLayer);
  const togglePixelGrid = useLayerVisibilityStore((state) => state.togglePixelGrid);
  const toggleTileGrid = useLayerVisibilityStore((state) => state.toggleTileGrid);
  const toggleAxes = useLayerVisibilityStore((state) => state.toggleAxes);

  const selectionCount = useSelectionStore((state) => state.selectedCount);
  const undoAvailable = useHistoryStore((state) => state.undoStack.length > 0);
  const redoAvailable = useHistoryStore((state) => state.redoStack.length > 0);
  const historyLocked = useHistoryStore((state) => state.locked);

  const [menu, setMenu] = useState<MenuState>({
    open: false,
    kind: 'actions',
    x: 0,
    y: 0,
  });
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pos = useMenuPosition(menu.open, menu.x, menu.y, menuRef);

  const closeMenu = () => setMenu((prev) => (prev.open ? { ...prev, open: false } : prev));

  useEffect(() => {
    if (!menu.open) {
      return;
    }
    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        return;
      }
      closeMenu();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menu.open]);

  const open = (kind: DockMenu) => (event: React.MouseEvent) => {
    event.preventDefault();
    const sameKind = menu.open && menu.kind === kind;
    if (sameKind) {
      closeMenu();
      return;
    }
    setMenu({ open: true, kind, x: event.clientX, y: event.clientY });
  };

  const title = useMemo(() => {
    if (menu.kind === 'layers') return 'Layers';
    if (menu.kind === 'overlays') return 'Overlays';
    return 'Actions';
  }, [menu.kind]);

  const onAddReference = async () => {
    const file = await openImageFilePicker();
    if (!file) {
      return;
    }
    await addReferenceFromFile(file);
  };

  return (
    <div className="bottom-dock" role="toolbar" aria-label="Bottom dock">
      <div className="bottom-dock__buttons" role="presentation">
        <button
          type="button"
          className="bottom-dock__button"
          data-active={menu.open && menu.kind === 'layers'}
          onClick={open('layers')}
          aria-label="Layers"
          title="Layers"
        >
          Layers
        </button>
        <button
          type="button"
          className="bottom-dock__button"
          data-active={menu.open && menu.kind === 'overlays'}
          onClick={open('overlays')}
          aria-label="Overlays"
          title="Overlays"
        >
          Overlays
        </button>
        <button
          type="button"
          className="bottom-dock__button"
          data-active={menu.open && menu.kind === 'actions'}
          onClick={open('actions')}
          aria-label="Actions"
          title="Actions"
        >
          Actions
        </button>
      </div>

      {menu.open && (
        <div
          ref={menuRef}
          className="bottom-dock__menu"
          role="menu"
          aria-label={title}
          style={{ top: pos.y, left: pos.x }}
        >
          <div className="bottom-dock__menu-title">{title}</div>

          {menu.kind === 'layers' && (
            <div className="bottom-dock__menu-stack">
              <ToggleRow checked={showReferenceLayer} label="Reference" onChange={toggleReferenceLayer} />
              <ToggleRow checked={showPixelLayer} label="Pixels" onChange={togglePixelLayer} />
              <ToggleRow checked={showTileLayer} label="Tiles" onChange={toggleTileLayer} />
            </div>
          )}

          {menu.kind === 'overlays' && (
            <div className="bottom-dock__menu-stack">
              <ToggleRow
                checked={showPixelGrid}
                label="Pixel Grid"
                onChange={togglePixelGrid}
                title="Toggle pixel grid visibility"
              />
              <ToggleRow
                checked={showTileGrid}
                label="Tile Grid"
                onChange={toggleTileGrid}
                title="Toggle tile grid visibility"
              />
              <ToggleRow checked={showAxes} label="Axes" onChange={toggleAxes} title="Toggle axis visibility" />
            </div>
          )}

          {menu.kind === 'actions' && (
            <div className="bottom-dock__menu-stack">
              <button
                type="button"
                className="bottom-dock__menu-item"
                onClick={async () => {
                  await onAddReference();
                  closeMenu();
                }}
              >
                Add Reference…
              </button>
              <button
                type="button"
                className="bottom-dock__menu-item"
                disabled={!undoAvailable || historyLocked}
                onClick={() => {
                  useHistoryStore.getState().undo();
                  closeMenu();
                }}
              >
                Undo
              </button>
              <button
                type="button"
                className="bottom-dock__menu-item"
                disabled={!redoAvailable || historyLocked}
                onClick={() => {
                  useHistoryStore.getState().redo();
                  closeMenu();
                }}
              >
                Redo
              </button>
              {historyLocked && (
                <div className="bottom-dock__menu-note">Undo/redo is disabled during large operations.</div>
              )}

              <div className="bottom-dock__menu-separator" />

              <button
                type="button"
                className="bottom-dock__menu-item"
                disabled={selectionCount === 0}
                onClick={() => {
                  copySelectionToClipboard();
                  closeMenu();
                }}
              >
                Copy Selection (Active Layer)
              </button>
              <button
                type="button"
                className="bottom-dock__menu-item"
                disabled={selectionCount === 0}
                onClick={() => {
                  copySelectionToClipboard({ deep: true });
                  closeMenu();
                }}
              >
                Deep Copy Selection (Merged)
              </button>
              <button
                type="button"
                className="bottom-dock__menu-item"
                disabled={selectionCount === 0}
                onClick={() => {
                  cutSelectionToClipboard();
                  closeMenu();
                }}
              >
                Cut Selection
              </button>
              <button
                type="button"
                className="bottom-dock__menu-item"
                disabled={selectionCount === 0}
                onClick={async () => {
                  await exportSelectionAsPng();
                  closeMenu();
                }}
              >
                Export PNG…
              </button>
              <button
                type="button"
                className="bottom-dock__menu-item"
                disabled={selectionCount === 0}
                onClick={() => {
                  useSelectionStore.getState().clear();
                  closeMenu();
                }}
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BottomDockControls;

