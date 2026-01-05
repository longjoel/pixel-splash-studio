import React, { useEffect, useState } from 'react';
import ViewportCanvas from './canvas/ViewportCanvas';
import MinimapPanel from './canvas/MinimapPanel';
import PaletteBar from './ui/PaletteBar';
import { loadProject, newProject, saveProject } from './services/project';
import { useHistoryStore } from './state/historyStore';
import { useProjectStore, getProjectTitle } from './state/projectStore';
import { useToolStore } from './state/toolStore';
import { useBrushStore } from './state/brushStore';
import { useRectangleStore } from './state/rectangleStore';
import { useOvalStore } from './state/ovalStore';
import { useSelectionRectangleStore } from './state/selectionRectangleStore';
import { useFillBucketStore } from './state/fillBucketStore';
import { useSelectionStore } from './state/selectionStore';
import { copySelectionToClipboard, cutSelectionToClipboard } from './services/selectionClipboard';
import { useStampStore } from './state/stampStore';

const App = () => {
  const undo = useHistoryStore((state) => state.undo);
  const redo = useHistoryStore((state) => state.redo);
  const undoAvailable = useHistoryStore((state) => state.undoStack.length > 0);
  const redoAvailable = useHistoryStore((state) => state.redoStack.length > 0);
  const selectionCount = useSelectionStore((state) => state.selectedCount);
  const clearSelection = useSelectionStore((state) => state.clear);
  const projectPath = useProjectStore((state) => state.path);
  const dirty = useProjectStore((state) => state.dirty);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const activeTool = useToolStore((state) => state.activeTool);
  const setActiveTool = useToolStore((state) => state.setActiveTool);
  const brushSize = useBrushStore((state) => state.size);
  const brushShape = useBrushStore((state) => state.shape);
  const rectangleMode = useRectangleStore((state) => state.mode);
  const setRectangleMode = useRectangleStore((state) => state.setMode);
  const ovalMode = useOvalStore((state) => state.mode);
  const setOvalMode = useOvalStore((state) => state.setMode);
  const selectionSnap = useSelectionRectangleStore((state) => state.snap);
  const setSelectionSnap = useSelectionRectangleStore((state) => state.setSnap);
  const fillMode = useFillBucketStore((state) => state.mode);
  const setFillMode = useFillBucketStore((state) => state.setMode);
  const stampMode = useStampStore((state) => state.mode);
  const stampSnap = useStampStore((state) => state.snap);
  const stampRotation = useStampStore((state) => state.rotation);
  const stampScale = useStampStore((state) => state.scale);
  const stampFlipX = useStampStore((state) => state.flipX);
  const stampFlipY = useStampStore((state) => state.flipY);
  const stampDrag = useStampStore((state) => state.drag);
  const setStampMode = useStampStore((state) => state.setMode);
  const setStampSnap = useStampStore((state) => state.setSnap);
  const setStampRotation = useStampStore((state) => state.setRotation);
  const setStampScale = useStampStore((state) => state.setScale);
  const setStampFlipX = useStampStore((state) => state.setFlipX);
  const setStampFlipY = useStampStore((state) => state.setFlipY);
  const setStampDrag = useStampStore((state) => state.setDrag);
  const setBrushSize = useBrushStore((state) => state.setSize);
  const setBrushShape = useBrushStore((state) => state.setShape);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!event.ctrlKey) {
        return;
      }
      const key = event.key.toLowerCase();
      if (key === 'z') {
        event.preventDefault();
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if (key === 'y') {
        event.preventDefault();
        redo();
      }
      if (key === 's') {
        event.preventDefault();
        handleSave();
      }
      if (key === 'o') {
        event.preventDefault();
        handleLoad();
      }
      if (key === 'n') {
        event.preventDefault();
        handleNew();
      }
      if (key === 'c') {
        if (useSelectionStore.getState().selectedCount === 0) {
          return;
        }
        event.preventDefault();
        copySelectionToClipboard();
      }
      if (key === 'x') {
        if (useSelectionStore.getState().selectedCount === 0) {
          return;
        }
        event.preventDefault();
        cutSelectionToClipboard();
      }
      if (key === '/') {
        event.preventDefault();
        handleShortcuts();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [redo, undo, projectPath, dirty]);

  const handleSave = async () => {
    await saveProject(projectPath ?? undefined);
  };

  const handleSaveAs = async () => {
    await saveProject(undefined);
  };

  const handleLoad = async () => {
    if (dirty && !window.confirm('You have unsaved changes. Continue?')) {
      return;
    }
    await loadProject(projectPath ?? undefined);
  };

  const handleNew = () => {
    if (dirty && !window.confirm('You have unsaved changes. Continue?')) {
      return;
    }
    newProject();
  };

  const handleShortcuts = () => {
    setShowShortcuts(true);
  };

  useEffect(() => {
    window.appApi.setTitle(getProjectTitle());
  }, [dirty, projectPath]);

  useEffect(() => {
    const unsubscribe = window.menuApi.onAction((action) => {
      switch (action) {
        case 'new':
          handleNew();
          break;
        case 'open':
          handleLoad();
          break;
        case 'save':
          handleSave();
          break;
        case 'saveAs':
          handleSaveAs();
          break;
        case 'undo':
          undo();
          break;
        case 'redo':
          redo();
          break;
        case 'shortcuts':
          handleShortcuts();
          break;
        default:
          break;
      }
    });
    return () => unsubscribe();
  }, [projectPath]);

  return (
    <div className="app">
      <div className="app__canvas-layer">
        <ViewportCanvas />
      </div>
      <div className="app__ui-layer">
        <div className="app__toolbar panel">
          <div className="panel__section">
            <h2>Tools</h2>
            <button
              type="button"
              className="panel__item"
              data-active={activeTool === 'pen'}
              onClick={() => setActiveTool('pen')}
            >
              Pen
            </button>
            <button
              type="button"
              className="panel__item"
              data-active={activeTool === 'line'}
              onClick={() => setActiveTool('line')}
            >
              Line
            </button>
            <button
              type="button"
              className="panel__item"
              data-active={activeTool === 'rectangle'}
              onClick={() => setActiveTool('rectangle')}
            >
              Rectangle
            </button>
            <button
              type="button"
              className="panel__item"
              data-active={activeTool === 'oval'}
              onClick={() => setActiveTool('oval')}
            >
              Oval
            </button>
            <button
              type="button"
              className="panel__item"
              data-active={activeTool === 'fill-bucket'}
              onClick={() => setActiveTool('fill-bucket')}
            >
              Fill
            </button>
            <button
              type="button"
              className="panel__item"
              data-active={activeTool === 'eyedropper'}
              onClick={() => setActiveTool('eyedropper')}
            >
              Eyedropper
            </button>
            <button
              type="button"
              className="panel__item"
              data-active={activeTool === 'stamp'}
              onClick={() => setActiveTool('stamp')}
            >
              Stamp
            </button>
            <button
              type="button"
              className="panel__item"
              data-active={activeTool === 'selection-rect'}
              onClick={() => setActiveTool('selection-rect')}
            >
              Select
            </button>
            <button
              type="button"
              className="panel__item"
              data-active={activeTool === 'selection-oval'}
              onClick={() => setActiveTool('selection-oval')}
            >
              Select Oval
            </button>
          </div>
          <div className="panel__section">
            <h2>Options</h2>
            {activeTool === 'pen' ? (
              <>
                <div className="panel__group">
                  <span className="panel__label">Size</span>
                  <div className="panel__row">
                    {[1, 4, 8].map((size) => (
                      <button
                        key={size}
                        type="button"
                        className="panel__item"
                        data-active={brushSize === size}
                        disabled={brushShape === 'point'}
                        onClick={() => setBrushSize(size)}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>
                </div>
                <div className="panel__group">
                  <span className="panel__label">Brush</span>
                  <div className="panel__row">
                    {([
                      { id: 'point', label: 'fine-point' },
                      { id: 'square', label: 'rectangle' },
                      { id: 'round', label: 'circle' },
                    ] as const).map((shape) => (
                      <button
                        key={shape.id}
                        type="button"
                        className="panel__item"
                        data-active={brushShape === shape.id}
                        onClick={() => setBrushShape(shape.id)}
                      >
                    <span className="tool-label" aria-label={shape.label}>
                      {shape.label}
                    </span>
                  </button>
                ))}
                  </div>
                </div>
              </>
            ) : activeTool === 'rectangle' ? (
              <div className="panel__group">
                <span className="panel__label">Mode</span>
                <div className="panel__row">
                  <label className="panel__radio">
                    <input
                      type="radio"
                      name="rectangle-mode"
                      value="filled"
                      checked={rectangleMode === 'filled'}
                      onChange={() => setRectangleMode('filled')}
                    />
                    Filled
                  </label>
                  <label className="panel__radio">
                    <input
                      type="radio"
                      name="rectangle-mode"
                      value="outlined"
                      checked={rectangleMode === 'outlined'}
                      onChange={() => setRectangleMode('outlined')}
                    />
                    Outlined
                  </label>
                  <label className="panel__radio">
                    <input
                      type="radio"
                      name="rectangle-mode"
                      value="outline-fill"
                      checked={rectangleMode === 'outline-fill'}
                      onChange={() => setRectangleMode('outline-fill')}
                    />
                    Outline + Fill
                  </label>
                </div>
              </div>
            ) : activeTool === 'oval' ? (
              <div className="panel__group">
                <span className="panel__label">Mode</span>
                <div className="panel__row">
                  <label className="panel__radio">
                    <input
                      type="radio"
                      name="oval-mode"
                      value="filled"
                      checked={ovalMode === 'filled'}
                      onChange={() => setOvalMode('filled')}
                    />
                    Filled
                  </label>
                  <label className="panel__radio">
                    <input
                      type="radio"
                      name="oval-mode"
                      value="outlined"
                      checked={ovalMode === 'outlined'}
                      onChange={() => setOvalMode('outlined')}
                    />
                    Outlined
                  </label>
                  <label className="panel__radio">
                    <input
                      type="radio"
                      name="oval-mode"
                      value="outline-fill"
                      checked={ovalMode === 'outline-fill'}
                      onChange={() => setOvalMode('outline-fill')}
                    />
                    Outline + Fill
                  </label>
                </div>
              </div>
            ) : activeTool === 'fill-bucket' ? (
              <div className="panel__group">
                <span className="panel__label">Mode</span>
                <div className="panel__row">
                  <label className="panel__radio">
                    <input
                      type="radio"
                      name="fill-mode"
                      value="color"
                      checked={fillMode === 'color'}
                      onChange={() => setFillMode('color')}
                    />
                    Color
                  </label>
                  <label className="panel__radio">
                    <input
                      type="radio"
                      name="fill-mode"
                      value="selection"
                      checked={fillMode === 'selection'}
                      onChange={() => setFillMode('selection')}
                    />
                    Selection
                  </label>
                </div>
              </div>
            ) : activeTool === 'stamp' ? (
              <>
                <div className="panel__group">
                  <span className="panel__label">Mode</span>
                  <div className="panel__row">
                    <label className="panel__radio">
                      <input
                        type="radio"
                        name="stamp-mode"
                        value="soft"
                        checked={stampMode === 'soft'}
                        onChange={() => setStampMode('soft')}
                      />
                      Soft
                    </label>
                    <label className="panel__radio">
                      <input
                        type="radio"
                        name="stamp-mode"
                        value="hard"
                        checked={stampMode === 'hard'}
                        onChange={() => setStampMode('hard')}
                      />
                      Hard
                    </label>
                  </div>
                </div>
                <div className="panel__group">
                  <span className="panel__label">Snap</span>
                  <div className="panel__row">
                    <label className="panel__radio">
                      <input
                        type="radio"
                        name="stamp-snap"
                        value="pixel"
                        checked={stampSnap === 'pixel'}
                        onChange={() => setStampSnap('pixel')}
                      />
                      Pixel
                    </label>
                    <label className="panel__radio">
                      <input
                        type="radio"
                        name="stamp-snap"
                        value="tile"
                        checked={stampSnap === 'tile'}
                        onChange={() => setStampSnap('tile')}
                      />
                      Tile
                    </label>
                  </div>
                </div>
                <div className="panel__group">
                  <span className="panel__label">Scale</span>
                  <div className="panel__row">
                    {[1, 2, 4, 8].map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        className="panel__item"
                        data-active={stampScale === scale}
                        onClick={() => setStampScale(scale as 1 | 2 | 4 | 8)}
                      >
                        {scale}x
                      </button>
                    ))}
                  </div>
                </div>
                <div className="panel__group">
                  <span className="panel__label">Rotate</span>
                  <div className="panel__row">
                    {[0, 90, 180, 270].map((rotation) => (
                      <button
                        key={rotation}
                        type="button"
                        className="panel__item"
                        data-active={stampRotation === rotation}
                        onClick={() => setStampRotation(rotation as 0 | 90 | 180 | 270)}
                      >
                        {rotation}deg
                      </button>
                    ))}
                  </div>
                </div>
                <div className="panel__group">
                  <span className="panel__label">Flip</span>
                  <div className="panel__row">
                    <button
                      type="button"
                      className="panel__item"
                      data-active={stampFlipX}
                      onClick={() => setStampFlipX(!stampFlipX)}
                    >
                      Flip X
                    </button>
                    <button
                      type="button"
                      className="panel__item"
                      data-active={stampFlipY}
                      onClick={() => setStampFlipY(!stampFlipY)}
                    >
                      Flip Y
                    </button>
                  </div>
                </div>
                <div className="panel__group">
                  <span className="panel__label">Drag</span>
                  <div className="panel__row">
                    <label className="panel__radio">
                      <input
                        type="radio"
                        name="stamp-drag"
                        value="off"
                        checked={!stampDrag}
                        onChange={() => setStampDrag(false)}
                      />
                      Off
                    </label>
                    <label className="panel__radio">
                      <input
                        type="radio"
                        name="stamp-drag"
                        value="on"
                        checked={stampDrag}
                        onChange={() => setStampDrag(true)}
                      />
                      On
                    </label>
                  </div>
                </div>
              </>
            ) : activeTool === 'selection-rect' || activeTool === 'selection-oval' ? (
              <div className="panel__group">
                <span className="panel__label">Snap</span>
                <div className="panel__row">
                  <label className="panel__radio">
                    <input
                      type="radio"
                      name="selection-snap"
                      value="pixel"
                      checked={selectionSnap === 'pixel'}
                      onChange={() => setSelectionSnap('pixel')}
                    />
                    Pixel
                  </label>
                  <label className="panel__radio">
                    <input
                      type="radio"
                      name="selection-snap"
                      value="tile"
                      checked={selectionSnap === 'tile'}
                      onChange={() => setSelectionSnap('tile')}
                    />
                    Tile
                  </label>
                </div>
              </div>
            ) : (
              <div className="panel__item" aria-disabled="true">
                No options
              </div>
            )}
          </div>
          {(selectionCount > 0 || undoAvailable || redoAvailable) && (
            <div className="panel__section">
              <h2>Actions</h2>
              {undoAvailable && (
                <button type="button" className="panel__item" onClick={undo}>
                  Undo
                </button>
              )}
              {redoAvailable && (
                <button type="button" className="panel__item" onClick={redo}>
                  Redo
                </button>
              )}
              {selectionCount > 0 && (
                <button type="button" className="panel__item" onClick={copySelectionToClipboard}>
                  Copy Selection
                </button>
              )}
              {selectionCount > 0 && (
                <button type="button" className="panel__item" onClick={cutSelectionToClipboard}>
                  Cut Selection
                </button>
              )}
              {selectionCount > 0 && (
                <button type="button" className="panel__item" onClick={clearSelection}>
                  Clear Selection
                </button>
              )}
            </div>
          )}
        </div>
        <div className="app__palette panel">
          <PaletteBar />
        </div>
        <div className="app__minimap panel">
          <div className="panel__section">
            <h2>Minimap</h2>
            <MinimapPanel />
          </div>
        </div>
      </div>
      {showShortcuts && (
        <div className="modal">
          <div className="modal__backdrop" onClick={() => setShowShortcuts(false)} />
          <div className="modal__content" role="dialog" aria-modal="true">
            <div className="modal__header">
              <h2>Shortcut Map</h2>
              <button type="button" onClick={() => setShowShortcuts(false)}>
                Close
              </button>
            </div>
            <div className="modal__body">
              <div className="modal__row">
                <span>New</span>
                <span>Ctrl+N</span>
              </div>
              <div className="modal__row">
                <span>Open</span>
                <span>Ctrl+O</span>
              </div>
              <div className="modal__row">
                <span>Save</span>
                <span>Ctrl+S</span>
              </div>
              <div className="modal__row">
                <span>Save As</span>
                <span>Ctrl+Shift+S</span>
              </div>
              <div className="modal__row">
                <span>Undo</span>
                <span>Ctrl+Z</span>
              </div>
              <div className="modal__row">
                <span>Redo</span>
                <span>Ctrl+Y / Ctrl+Shift+Z</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
