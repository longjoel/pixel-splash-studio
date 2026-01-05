import React, { useEffect, useState } from 'react';
import ViewportCanvas from './canvas/ViewportCanvas';
import Minimap from './canvas/Minimap';
import PaletteBar from './ui/PaletteBar';
import { loadProject, newProject, saveProject } from './services/project';
import { useHistoryStore } from './state/historyStore';
import { useProjectStore, getProjectTitle } from './state/projectStore';
import { useToolStore } from './state/toolStore';
import { useBrushStore } from './state/brushStore';
import { useRectangleStore } from './state/rectangleStore';
import { useOvalStore } from './state/ovalStore';

const App = () => {
  const undo = useHistoryStore((state) => state.undo);
  const redo = useHistoryStore((state) => state.redo);
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
            ) : (
              <div className="panel__item" aria-disabled="true">
                No options
              </div>
            )}
          </div>
        </div>
        <div className="app__palette panel">
          <PaletteBar />
        </div>
        <div className="app__minimap panel">
          <div className="panel__section">
            <h2>Minimap</h2>
            <Minimap />
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
