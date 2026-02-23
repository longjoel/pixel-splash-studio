import React from 'react';
import type { ToolId } from '@/state/toolStore';
import { TOOL_ICONS } from '@/ui/toolIcons';
import { useHistoryStore } from '@/state/historyStore';
import { useClipboardStore } from '@/state/clipboardStore';
import { useLayerVisibilityStore } from '@/state/layerVisibilityStore';
import { copySelectionToClipboard, cutSelectionToClipboard } from '@/services/selectionClipboard';
import { exportSelectionAsPng } from '@/services/selectionExport';
import { useSelectionStore } from '@/state/selectionStore';

type TopbarProps = {
  activeTool: ToolId;
  selectionCount: number;
  activateTool: (tool: ToolId) => void;
  showAdvancedTools: boolean;
  showAiTool?: boolean;
  showExportButton?: boolean;
  showFullscreenButton?: boolean;
  showTileLayerControls?: boolean;
  toolOptions?: React.ReactNode;
};

type TopbarMenu = 'layers' | 'overlays';

type MenuState = {
  open: boolean;
  kind: TopbarMenu;
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const useMenuPosition = (open: boolean, x: number, y: number, ref: React.RefObject<HTMLElement>) => {
  const [pos, setPos] = React.useState({ x, y });

  React.useLayoutEffect(() => {
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

class TopbarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Topbar crashed:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="topbar" role="toolbar" aria-label="Tools">
          <div style={{ opacity: 0.9 }}>Toolbar disabled due to an error.</div>
          <div style={{ flex: 1 }} />
          <button type="button" className="topbar__mode-button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const TopbarInner = ({
  activeTool,
  selectionCount,
  activateTool,
  showAdvancedTools,
  showAiTool,
  showExportButton,
  showFullscreenButton,
  showTileLayerControls,
  toolOptions,
}: Pick<
  TopbarProps,
  | 'activeTool'
  | 'selectionCount'
  | 'activateTool'
  | 'toolOptions'
  | 'showAdvancedTools'
  | 'showAiTool'
  | 'showExportButton'
  | 'showFullscreenButton'
  | 'showTileLayerControls'
>) => {
  const topbarRef = React.useRef<HTMLDivElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const historyLocked = useHistoryStore((state) => state.locked);
  const undoAvailable = useHistoryStore((state) => state.undoStack.length > 0);
  const redoAvailable = useHistoryStore((state) => state.redoStack.length > 0);
  const undo = useHistoryStore((state) => state.undo);
  const redo = useHistoryStore((state) => state.redo);
  const clipboard = useClipboardStore((state) => state);
  const hasClipboard = clipboard.pixels.length > 0 && clipboard.width > 0 && clipboard.height > 0;
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

  const [menu, setMenu] = React.useState<MenuState>({
    open: false,
    kind: 'layers',
    x: 0,
    y: 0,
  });
  const pos = useMenuPosition(menu.open, menu.x, menu.y, menuRef);

  const closeMenu = React.useCallback(() => {
    setMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
  }, []);

  const openMenu = (kind: TopbarMenu) => (event: React.MouseEvent) => {
    event.preventDefault();
    const sameKind = menu.open && menu.kind === kind;
    if (sameKind) {
      closeMenu();
      return;
    }
    setMenu({ open: true, kind, x: event.clientX, y: event.clientY });
  };

  React.useEffect(() => {
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
  }, [closeMenu, menu.open]);

  React.useLayoutEffect(() => {
    const node = topbarRef.current;
    if (!node) {
      return;
    }
    const updateHeight = () => {
      const nextHeight = node.offsetHeight;
      if (nextHeight > 0) {
        document.documentElement.style.setProperty('--topbar-height', `${nextHeight}px`);
      }
    };
    updateHeight();
    if (typeof ResizeObserver === 'undefined') {
      const handleResize = () => updateHeight();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={topbarRef} className="topbar" role="toolbar" aria-label="Tools">
      <div className="topbar__tools" role="presentation">
        <button
          type="button"
          className="topbar__tool-button"
          onClick={undo}
          title="Undo (Ctrl/Cmd+Z)"
          aria-label="Undo"
          disabled={historyLocked || !undoAvailable}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.undo}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          onClick={redo}
          title="Redo (Ctrl/Cmd+Shift+Z)"
          aria-label="Redo"
          disabled={historyLocked || !redoAvailable}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.redo}</span>
        </button>
        <span className="topbar__divider" aria-hidden="true" />
        <button
          type="button"
          className="topbar__tool-button"
          onClick={() => copySelectionToClipboard()}
          title="Copy Selection (Active Layer)"
          aria-label="Copy Selection"
          disabled={selectionCount === 0}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.copy}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          onClick={() => copySelectionToClipboard({ deep: true })}
          title="Deep Copy Selection (Merged)"
          aria-label="Deep Copy Selection"
          disabled={selectionCount === 0}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['copy-deep']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          onClick={() => cutSelectionToClipboard()}
          title="Cut Selection"
          aria-label="Cut Selection"
          disabled={selectionCount === 0}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.cut}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          onClick={() => activateTool('stamp')}
          title="Paste (Stamp Tool)"
          aria-label="Paste"
          disabled={!hasClipboard}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.paste}</span>
        </button>
        {showExportButton !== false && (
          <button
            type="button"
            className="topbar__tool-button"
            onClick={() => {
              void exportSelectionAsPng();
            }}
            title="Export PNG…"
            aria-label="Export PNG"
            disabled={selectionCount === 0}
          >
            <span className="toolbar__tool-icon">{TOOL_ICONS.export}</span>
          </button>
        )}
        <button
          type="button"
          className="topbar__tool-button"
          onClick={() => useSelectionStore.getState().clear()}
          title="Clear Selection"
          aria-label="Clear Selection"
          disabled={selectionCount === 0}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.clear}</span>
        </button>
        <span className="topbar__divider" aria-hidden="true" />
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'pen'}
          onClick={() => activateTool('pen')}
          title="Pen (P)"
          aria-label="Pen"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.pen}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'spray'}
          onClick={() => activateTool('spray')}
          title="Spray (S)"
          aria-label="Spray"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.spray}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'line'}
          onClick={() => activateTool('line')}
          title="Line (L)"
          aria-label="Line"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.line}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'rectangle'}
          onClick={() => activateTool('rectangle')}
          title="Rectangle (R)"
          aria-label="Rectangle"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.rectangle}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'oval'}
          onClick={() => activateTool('oval')}
          title="Oval (O)"
          aria-label="Oval"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.oval}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'fill-bucket'}
          onClick={() => activateTool('fill-bucket')}
          title="Fill (F)"
          aria-label="Fill"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['fill-bucket']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'text'}
          onClick={() => activateTool('text')}
          title="Text (T)"
          aria-label="Text"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.text}</span>
        </button>
        {showAiTool !== false && (
          <button
            type="button"
            className="topbar__tool-button"
            data-active={activeTool === 'ai'}
            onClick={() => activateTool('ai')}
            title="AI Prompt"
            aria-label="AI Prompt"
          >
            <span className="toolbar__tool-icon">{TOOL_ICONS.ai}</span>
          </button>
        )}
        <span className="topbar__divider" aria-hidden="true" />
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'reference-handle'}
          onClick={() => activateTool('reference-handle')}
          title="Reference Handle (H)"
          aria-label="Reference Handle"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['reference-handle']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'eyedropper'}
          onClick={() => activateTool('eyedropper')}
          title="Eyedropper (E)"
          aria-label="Eyedropper"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.eyedropper}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'stamp'}
          onClick={() => activateTool('stamp')}
          title="Stamp (V)"
          aria-label="Stamp"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.stamp}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'selection-rect'}
          onClick={() => activateTool('selection-rect')}
          title="Selection Rectangle (Alt+R)"
          aria-label="Selection Rectangle"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['selection-rect']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'selection-oval'}
          onClick={() => activateTool('selection-oval')}
          title="Selection Oval (Alt+O)"
          aria-label="Selection Oval"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['selection-oval']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'magic-wand'}
          onClick={() => activateTool('magic-wand')}
          title="Magic Wand (W)"
          aria-label="Magic Wand"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['magic-wand']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'selection-lasso'}
          onClick={() => activateTool('selection-lasso')}
          title="Selection Lasso (Alt+P)"
          aria-label="Selection Lasso"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['selection-lasso']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'texture-roll'}
          onClick={() => activateTool('texture-roll')}
          title="Scroll Selection (Q)"
          aria-label="Scroll Selection"
          disabled={selectionCount === 0}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['texture-roll']}</span>
        </button>
        {showAdvancedTools && (
          <>
            <span className="topbar__divider" aria-hidden="true" />
            <button
              type="button"
              className="topbar__tool-button"
              data-active={activeTool === 'tile-sampler'}
              onClick={() => activateTool('tile-sampler')}
              title="Tile Sampler (Shift+S)"
              aria-label="Tile Sampler"
            >
              <span className="toolbar__tool-icon">{TOOL_ICONS['tile-sampler']}</span>
            </button>
            <button
              type="button"
              className="topbar__tool-button"
              data-active={activeTool === 'tile-pen'}
              onClick={() => activateTool('tile-pen')}
              title="Tile Pen (Shift+P)"
              aria-label="Tile Pen"
            >
              <span className="toolbar__tool-icon">{TOOL_ICONS['tile-pen']}</span>
            </button>
            <button
              type="button"
              className="topbar__tool-button"
              data-active={activeTool === 'tile-rectangle'}
              onClick={() => activateTool('tile-rectangle')}
              title="Tile Rectangle (Shift+R)"
              aria-label="Tile Rectangle"
            >
              <span className="toolbar__tool-icon">{TOOL_ICONS['tile-rectangle']}</span>
            </button>
            <button
              type="button"
              className="topbar__tool-button"
              data-active={activeTool === 'tile-9slice'}
              onClick={() => activateTool('tile-9slice')}
              title="Tile 9-Slice (Shift+N)"
              aria-label="Tile 9-Slice"
            >
              <span className="toolbar__tool-icon">{TOOL_ICONS['tile-9slice']}</span>
            </button>
            <button
              type="button"
              className="topbar__tool-button"
              data-active={activeTool === 'tile-export'}
              onClick={() => activateTool('tile-export')}
              title="Tile Export (Shift+E)"
              aria-label="Tile Export"
            >
              <span className="toolbar__tool-icon">{TOOL_ICONS['tile-export']}</span>
            </button>
          </>
        )}
        <span className="topbar__divider" aria-hidden="true" />
        <button
          type="button"
          className="topbar__tool-button"
          data-active={menu.open && menu.kind === 'layers'}
          onClick={openMenu('layers')}
          title="Layers"
          aria-label="Layers"
          aria-expanded={menu.open && menu.kind === 'layers'}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.layers}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={menu.open && menu.kind === 'overlays'}
          onClick={openMenu('overlays')}
          title="Overlays"
          aria-label="Overlays"
          aria-expanded={menu.open && menu.kind === 'overlays'}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.overlays}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          onClick={() => window.dispatchEvent(new Event('palette:open-add-swatch'))}
          title="Add Swatch Preset"
          aria-label="Add Swatch Preset"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.swatch}</span>
        </button>
        {showFullscreenButton !== false && (
          <button
            type="button"
            className="topbar__tool-button"
            onClick={() => {
              void window.windowApi?.toggleFullscreen?.();
            }}
            title="Toggle Full Screen (F11)"
            aria-label="Toggle Full Screen"
          >
            <span className="toolbar__tool-icon">{TOOL_ICONS.fullscreen}</span>
          </button>
        )}
        {toolOptions && <div className="topbar__options">{toolOptions}</div>}
      </div>
      {menu.open && (
        <div
          ref={menuRef}
          className="bottom-dock__menu"
          role="menu"
          aria-label={menu.kind === 'layers' ? 'Layers' : 'Overlays'}
          style={{ top: pos.y, left: pos.x }}
        >
          <div className="bottom-dock__menu-title">
            {menu.kind === 'layers' ? 'Layers' : 'Overlays'}
          </div>
          {menu.kind === 'layers' ? (
            <div className="bottom-dock__menu-stack">
              <ToggleRow checked={showReferenceLayer} label="Reference" onChange={toggleReferenceLayer} />
              <ToggleRow checked={showPixelLayer} label="Pixels" onChange={togglePixelLayer} />
              {showTileLayerControls !== false && (
                <ToggleRow checked={showTileLayer} label="Tiles" onChange={toggleTileLayer} />
              )}
            </div>
          ) : (
            <div className="bottom-dock__menu-stack">
              <ToggleRow
                checked={showPixelGrid}
                label="Pixel Grid"
                onChange={togglePixelGrid}
                title="Toggle pixel grid visibility"
              />
              {showTileLayerControls !== false && (
                <ToggleRow
                  checked={showTileGrid}
                  label="Tile Grid"
                  onChange={toggleTileGrid}
                  title="Toggle tile grid visibility"
                />
              )}
              <ToggleRow checked={showAxes} label="Axes" onChange={toggleAxes} title="Toggle axis visibility" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Topbar = ({
  activeTool,
  selectionCount,
  activateTool,
  showAdvancedTools,
  showAiTool,
  showExportButton,
  showFullscreenButton,
  showTileLayerControls,
  toolOptions,
}: TopbarProps) => (
  <TopbarErrorBoundary>
    <TopbarInner
      activeTool={activeTool}
      selectionCount={selectionCount}
      activateTool={activateTool}
      showAdvancedTools={showAdvancedTools}
      showAiTool={showAiTool}
      showExportButton={showExportButton}
      showFullscreenButton={showFullscreenButton}
      showTileLayerControls={showTileLayerControls}
      toolOptions={toolOptions}
    />
  </TopbarErrorBoundary>
);
