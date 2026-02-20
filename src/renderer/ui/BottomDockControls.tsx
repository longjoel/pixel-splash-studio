import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useHistoryStore } from '@/state/historyStore';
import { openImageFilePicker } from '@/services/filePickers';
import { addReferenceFromFile } from '@/services/references';

type MenuState = {
  open: boolean;
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

export const BottomDockControls = () => {
  const undoAvailable = useHistoryStore((state) => state.undoStack.length > 0);
  const redoAvailable = useHistoryStore((state) => state.redoStack.length > 0);
  const historyLocked = useHistoryStore((state) => state.locked);

  const [menu, setMenu] = useState<MenuState>({
    open: false,
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

  const toggleMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenu((prev) =>
      prev.open ? { ...prev, open: false } : { open: true, x: event.clientX, y: event.clientY }
    );
  };

  const title = useMemo(() => 'Actions', []);

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
          data-active={menu.open}
          onClick={toggleMenu}
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
            
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomDockControls;
