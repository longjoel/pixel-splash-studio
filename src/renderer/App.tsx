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
import { exportSelectionAsPng } from './services/selectionExport';
import { exportSelectionAsGbr } from './services/selectionExportGbr';
import {
  exportSelectionAsBmp,
  exportSelectionAsGif,
  exportSelectionAsPcx,
  exportSelectionAsTga,
} from './services/selectionExportImage';
import { consolidatePalette } from './services/paletteConsolidate';
import { importImageAsProject } from './services/importImageProject';
import { useStampStore } from './state/stampStore';
import { usePixelStore } from './state/pixelStore';
import { usePreviewStore } from './state/previewStore';
import { useClipboardStore } from './state/clipboardStore';
import { usePaletteStore } from './state/paletteStore';
import { useViewportStore } from './state/viewportStore';
import { addReferenceFromFile } from './services/references';
import {
  traceReferenceWithMaxColors,
  traceReferenceWithPaletteRange,
} from './services/referenceTrace';
import { useReferenceStore } from './state/referenceStore';
import { useReferenceHandleStore } from './state/referenceHandleStore';
import {
  BYTES_PER_NUMBER,
  HISTORY_CHANGE_BYTES,
  MEMORY_SAMPLE_INTERVAL,
  PIXEL_RECORD_BYTES,
  REFERENCE_OPACITY_MAX,
  REFERENCE_OPACITY_MIN,
  REFERENCE_ROTATION_MAX,
  REFERENCE_ROTATION_MIN,
  REFERENCE_SCALE_MAX,
  REFERENCE_SCALE_MIN,
  TRACE_DEFAULT_MAX_COLORS,
  TRACE_MAX_COLORS_MAX,
  TRACE_MAX_COLORS_MIN,
  TOOL_LABELS,
} from '../constants';

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const REFERENCE_SCALE_SLIDER_MIN = 0;
const REFERENCE_SCALE_SLIDER_MAX = 100;
const REFERENCE_SCALE_LOG_MIN = Math.log10(REFERENCE_SCALE_MIN);
const REFERENCE_SCALE_LOG_MAX = Math.log10(REFERENCE_SCALE_MAX);
const REFERENCE_SCALE_LOG_RANGE = REFERENCE_SCALE_LOG_MAX - REFERENCE_SCALE_LOG_MIN;

const scaleToSlider = (scale: number) => {
  const clamped = clamp(scale, REFERENCE_SCALE_MIN, REFERENCE_SCALE_MAX);
  const ratio =
    REFERENCE_SCALE_LOG_RANGE === 0
      ? 0
      : (Math.log10(clamped) - REFERENCE_SCALE_LOG_MIN) / REFERENCE_SCALE_LOG_RANGE;
  return Math.round(
    REFERENCE_SCALE_SLIDER_MIN +
      ratio * (REFERENCE_SCALE_SLIDER_MAX - REFERENCE_SCALE_SLIDER_MIN)
  );
};

const sliderToScale = (value: number) => {
  const ratio =
    (clamp(value, REFERENCE_SCALE_SLIDER_MIN, REFERENCE_SCALE_SLIDER_MAX) -
      REFERENCE_SCALE_SLIDER_MIN) /
    (REFERENCE_SCALE_SLIDER_MAX - REFERENCE_SCALE_SLIDER_MIN);
  const logValue = REFERENCE_SCALE_LOG_MIN + ratio * REFERENCE_SCALE_LOG_RANGE;
  return Math.pow(10, logValue);
};

const bytesFromJson = (value: unknown) => {
  try {
    return new TextEncoder().encode(JSON.stringify(value)).length;
  } catch {
    return 0;
  }
};

const stripFunctions = (value: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(value).filter(([, entry]) => typeof entry !== 'function'));

const formatBytes = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes}B`;
  }
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(kb < 10 ? 1 : 0)}KB`;
  }
  const mb = kb / 1024;
  if (mb < 1024) {
    return `${mb.toFixed(mb < 10 ? 1 : 0)}MB`;
  }
  const gb = mb / 1024;
  return `${gb.toFixed(1)}GB`;
};

const sumBlockBytes = (blocks: Array<{ block: Uint8Array }>) =>
  blocks.reduce((total, entry) => total + entry.block.byteLength, 0);

const openImageFilePicker = () =>
  new Promise<File | null>((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.position = 'fixed';
    input.style.left = '-1000px';
    input.style.opacity = '0';
    input.setAttribute('aria-hidden', 'true');
    let settled = false;
    const cleanup = () => {
      if (input.isConnected) {
        input.remove();
      }
      window.removeEventListener('focus', handleWindowFocus);
    };
    const finalize = (file: File | null) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      resolve(file);
    };
    const handleWindowFocus = () => {
      window.setTimeout(() => {
        if (settled) {
          return;
        }
        if (!input.files?.length) {
          finalize(null);
        }
      }, 0);
    };
    input.addEventListener('change', () => {
      const file = input.files?.[0] ?? null;
      finalize(file);
    });
    window.addEventListener('focus', handleWindowFocus);
    document.body.appendChild(input);
    input.click();
  });

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tag = target.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea') {
    return true;
  }
  return target.isContentEditable;
};

const buildMemorySummary = () => {
  const pixelBytes = sumBlockBytes(usePixelStore.getState().store.getBlocks());
  const selectionBytes = sumBlockBytes(useSelectionStore.getState().store.getBlocks());
  const previewBytes = usePreviewStore.getState().pixels.size * PIXEL_RECORD_BYTES;
  const clipboardBytes = useClipboardStore.getState().pixels.length * PIXEL_RECORD_BYTES;
  const referenceBytes = useReferenceStore
    .getState()
    .items.reduce((total, reference) => total + reference.width * reference.height * 4, 0);
  const history = useHistoryStore.getState();
  let changeCount = 0;
  for (const batch of history.undoStack) {
    changeCount += batch.changes.length;
  }
  for (const batch of history.redoStack) {
    changeCount += batch.changes.length;
  }
  const historyBytes = changeCount * HISTORY_CHANGE_BYTES;
  const palette = usePaletteStore.getState();
  const paletteBytes =
    palette.colors.reduce((total, color) => total + color.length * 2, 0) +
    BYTES_PER_NUMBER * 2;

  const uiState = {
    tool: stripFunctions(useToolStore.getState() as Record<string, unknown>),
    brush: stripFunctions(useBrushStore.getState() as Record<string, unknown>),
    rectangle: stripFunctions(useRectangleStore.getState() as Record<string, unknown>),
    oval: stripFunctions(useOvalStore.getState() as Record<string, unknown>),
    selection: stripFunctions(useSelectionRectangleStore.getState() as Record<string, unknown>),
    fill: stripFunctions(useFillBucketStore.getState() as Record<string, unknown>),
    stamp: stripFunctions(useStampStore.getState() as Record<string, unknown>),
    viewport: stripFunctions(useViewportStore.getState() as Record<string, unknown>),
    project: stripFunctions(useProjectStore.getState() as Record<string, unknown>),
    referenceHandle: stripFunctions(useReferenceHandleStore.getState() as Record<string, unknown>),
  };
  const uiBytes = bytesFromJson(uiState);

  const stats = [
    { label: 'px', bytes: pixelBytes },
    { label: 'sel', bytes: selectionBytes },
    { label: 'prev', bytes: previewBytes },
    { label: 'clip', bytes: clipboardBytes },
    { label: 'ref', bytes: referenceBytes },
    { label: 'hist', bytes: historyBytes },
    { label: 'pal', bytes: paletteBytes },
    { label: 'ui', bytes: uiBytes },
  ];
  const total = stats.reduce((sum, entry) => sum + entry.bytes, 0);
  const parts = stats
    .filter((entry) => entry.bytes > 0)
    .map((entry) => `${entry.label} ${formatBytes(entry.bytes)}`);
  return `Mem ${formatBytes(total)}${parts.length ? ` • ${parts.join(' • ')}` : ''}`;
};

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
  const [showLicense, setShowLicense] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [toolbarCollapsed, setToolbarCollapsed] = useState(false);
  const [minimapCollapsed, setMinimapCollapsed] = useState(false);
  const [memoryInfoEnabled, setMemoryInfoEnabled] = useState(false);
  const [memoryLabel, setMemoryLabel] = useState('');
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
  const stampPasteDuplicateColors = useStampStore((state) => state.pasteDuplicateColors);
  const removeReference = useReferenceStore((state) => state.removeReference);
  const pasteShortcutRef = React.useRef(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const applyScale = (scale: number) => {
      const nextScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
      root.style.setProperty('--ui-scale', String(nextScale));
    };
    applyScale(window.uiScaleApi?.getScale?.() ?? 1);
    const unsubscribe = window.uiScaleApi?.onScaleChange?.(applyScale);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  const setStampMode = useStampStore((state) => state.setMode);
  const setStampSnap = useStampStore((state) => state.setSnap);
  const setStampRotation = useStampStore((state) => state.setRotation);
  const setStampScale = useStampStore((state) => state.setScale);
  const setStampFlipX = useStampStore((state) => state.setFlipX);
  const setStampFlipY = useStampStore((state) => state.setFlipY);
  const setStampDrag = useStampStore((state) => state.setDrag);
  const setStampPasteDuplicateColors = useStampStore(
    (state) => state.setPasteDuplicateColors
  );
  const setBrushSize = useBrushStore((state) => state.setSize);
  const setBrushShape = useBrushStore((state) => state.setShape);
  const paletteColors = usePaletteStore((state) => state.colors);
  const referenceSnap = useReferenceHandleStore((state) => state.snap);
  const setReferenceSnap = useReferenceHandleStore((state) => state.setSnap);
  const setSelectedReference = useReferenceStore((state) => state.setSelected);
  const selectedReference = useReferenceStore((state) =>
    state.selectedId ? state.items.find((item) => item.id === state.selectedId) ?? null : null
  );
  const updateReference = useReferenceStore((state) => state.updateReference);
  const paletteMaxIndex = Math.max(0, paletteColors.length - 1);
  const [tracePaletteStart, setTracePaletteStart] = useState(0);
  const [tracePaletteEnd, setTracePaletteEnd] = useState(paletteMaxIndex);
  const [traceMaxColors, setTraceMaxColors] = useState(TRACE_DEFAULT_MAX_COLORS);
  const projectTitle = getProjectTitle();
  const toolbarTitle = TOOL_LABELS[activeTool] ?? 'Toolbar';

  useEffect(() => {
    setTracePaletteStart((value) => clamp(value, 0, paletteMaxIndex));
    setTracePaletteEnd((value) => clamp(value, 0, paletteMaxIndex));
  }, [paletteMaxIndex]);

  useEffect(() => {
    if (activeTool !== 'reference-handle') {
      setSelectedReference(null);
    }
  }, [activeTool, setSelectedReference]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }
      const isCommand = event.ctrlKey || event.metaKey;
      if (!isCommand) {
        const key = event.key.toLowerCase();
        if (
          (key === 'delete' || key === 'backspace') &&
          activeTool === 'reference-handle' &&
          selectedReference
        ) {
          event.preventDefault();
          removeReference(selectedReference.id);
        }
        return;
      }
      const key = event.key.toLowerCase();
      if (key === 'v') {
        pasteShortcutRef.current = true;
        window.setTimeout(() => {
          pasteShortcutRef.current = false;
        }, 200);
        return;
      }
      if (key === '+' || key === '=') {
        event.preventDefault();
        window.uiScaleApi?.stepScale?.(1.1);
        return;
      }
      if (key === '-') {
        event.preventDefault();
        window.uiScaleApi?.stepScale?.(1 / 1.1);
        return;
      }
      if (key === '0') {
        event.preventDefault();
        window.uiScaleApi?.resetScale?.();
        return;
      }
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
  }, [redo, undo, projectPath, dirty, activeTool, selectedReference, removeReference]);

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

  const handleAddReference = async () => {
    const file = await openImageFilePicker();
    if (!file) {
      return;
    }
    void addReferenceFromFile(file);
  };

  const updateSelectedReference = (patch: Parameters<typeof updateReference>[1]) => {
    if (!selectedReference) {
      return;
    }
    updateReference(selectedReference.id, patch);
  };

  const handleReferenceRotation = (value: number) => {
    if (!Number.isFinite(value)) {
      return;
    }
    updateSelectedReference({
      rotation: clamp(value, REFERENCE_ROTATION_MIN, REFERENCE_ROTATION_MAX),
    });
  };

  const handleReferenceScale = (value: number) => {
    if (!Number.isFinite(value)) {
      return;
    }
    updateSelectedReference({
      scale: clamp(value, REFERENCE_SCALE_MIN, REFERENCE_SCALE_MAX),
    });
  };

  const handleReferenceOpacity = (value: number) => {
    if (!Number.isFinite(value)) {
      return;
    }
    updateSelectedReference({
      opacity: clamp(value, REFERENCE_OPACITY_MIN, REFERENCE_OPACITY_MAX),
    });
  };

  const handleTracePaletteRange = () => {
    if (!selectedReference || paletteColors.length === 0) {
      return;
    }
    const minIndex = clamp(
      Math.round(Math.min(tracePaletteStart, tracePaletteEnd)),
      0,
      paletteMaxIndex
    );
    const maxIndex = clamp(
      Math.round(Math.max(tracePaletteStart, tracePaletteEnd)),
      0,
      paletteMaxIndex
    );
    traceReferenceWithPaletteRange(selectedReference, minIndex, maxIndex);
  };

  const handleTraceMaxColors = () => {
    if (!selectedReference || !Number.isFinite(traceMaxColors)) {
      return;
    }
    const maxColors = clamp(
      Math.round(traceMaxColors),
      TRACE_MAX_COLORS_MIN,
      TRACE_MAX_COLORS_MAX
    );
    traceReferenceWithMaxColors(selectedReference, maxColors);
  };

  const referenceRotation = selectedReference?.rotation ?? 0;
  const referenceScale = selectedReference?.scale ?? 1;
  const referenceScaleSlider = scaleToSlider(referenceScale);
  const referenceOpacity = selectedReference?.opacity ?? 0.7;
  const referenceFlipX = selectedReference?.flipX ?? false;
  const referenceFlipY = selectedReference?.flipY ?? false;
  const referenceDisabled = !selectedReference;

  useEffect(() => {
    if (!memoryInfoEnabled) {
      setMemoryLabel('');
      return undefined;
    }
    const update = () => {
      const nextLabel = buildMemorySummary();
      setMemoryLabel((prev) => (prev === nextLabel ? prev : nextLabel));
    };
    update();
    const intervalId = window.setInterval(update, MEMORY_SAMPLE_INTERVAL);
    return () => window.clearInterval(intervalId);
  }, [memoryInfoEnabled]);

  useEffect(() => {
    const title =
      memoryInfoEnabled && memoryLabel
        ? `${projectTitle} • ${memoryLabel}`
        : projectTitle;
    window.appApi.setTitle(title);
  }, [projectTitle, memoryInfoEnabled, memoryLabel]);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }
      if (!pasteShortcutRef.current) {
        return;
      }
      pasteShortcutRef.current = false;
      const items = Array.from(event.clipboardData?.items ?? []);
      const imageItem = items.find((item) => item.type.startsWith('image/'));
      if (!imageItem) {
        return;
      }
      const file = imageItem.getAsFile();
      if (!file) {
        return;
      }
      event.preventDefault();
      void addReferenceFromFile(file);
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

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
        case 'importImage':
          void importImageAsProject();
          break;
        case 'exportPng':
          void exportSelectionAsPng();
          break;
        case 'exportBmp':
          void exportSelectionAsBmp();
          break;
        case 'exportGif':
          void exportSelectionAsGif();
          break;
        case 'exportPcx':
          void exportSelectionAsPcx();
          break;
        case 'exportTga':
          void exportSelectionAsTga();
          break;
        case 'exportGbr':
          void exportSelectionAsGbr();
          break;
        case 'undo':
          undo();
          break;
        case 'redo':
          redo();
          break;
        case 'memory:on':
          setMemoryInfoEnabled(true);
          break;
        case 'memory:off':
          setMemoryInfoEnabled(false);
          break;
        case 'shortcuts':
          handleShortcuts();
          break;
        case 'palette:consolidate':
          consolidatePalette();
          break;
        case 'license':
          setShowLicense(true);
          break;
        case 'uiScale:reset':
          window.uiScaleApi?.resetScale?.();
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
        {showSplash && (
          <div className="app__splash" aria-hidden="true">
            <img src="/pss-logo.png" alt="" />
          </div>
        )}
        <div
          className={`app__toolbar panel${toolbarCollapsed ? ' app__toolbar--collapsed panel--collapsed' : ''}`}
        >
          <div className="panel__header">
            <h2>{toolbarTitle}</h2>
            <button
              type="button"
              className="panel__toggle"
              onClick={() => setToolbarCollapsed((prev) => !prev)}
            >
              {toolbarCollapsed ? 'Expand' : 'Collapse'}
            </button>
          </div>
          {!toolbarCollapsed && (
            <>
              <div className="toolbar__tools">
                <div className="toolbar__tool-group">
                  <span className="panel__label">Drawing</span>
                  <div className="toolbar__tools-grid">
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'pen'}
                      onClick={() => setActiveTool('pen')}
                      title="Pen"
                      aria-label="Pen"
                    >
                      <span className="toolbar__tool-icon">Pn</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'line'}
                      onClick={() => setActiveTool('line')}
                      title="Line"
                      aria-label="Line"
                    >
                      <span className="toolbar__tool-icon">Ln</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'rectangle'}
                      onClick={() => setActiveTool('rectangle')}
                      title="Rectangle"
                      aria-label="Rectangle"
                    >
                      <span className="toolbar__tool-icon">Rc</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'oval'}
                      onClick={() => setActiveTool('oval')}
                      title="Oval"
                      aria-label="Oval"
                    >
                      <span className="toolbar__tool-icon">Ov</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'fill-bucket'}
                      onClick={() => setActiveTool('fill-bucket')}
                      title="Fill"
                      aria-label="Fill"
                    >
                      <span className="toolbar__tool-icon">Fl</span>
                    </button>
                  </div>
                </div>
                <div className="toolbar__tool-group">
                  <span className="panel__label">Editing</span>
                  <div className="toolbar__tools-grid">
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'reference-handle'}
                      onClick={() => setActiveTool('reference-handle')}
                      title="Reference Handle"
                      aria-label="Reference Handle"
                    >
                      <span className="toolbar__tool-icon">Rf</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'eyedropper'}
                      onClick={() => setActiveTool('eyedropper')}
                      title="Eyedropper"
                      aria-label="Eyedropper"
                    >
                      <span className="toolbar__tool-icon">Ed</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'stamp'}
                      onClick={() => setActiveTool('stamp')}
                      title="Stamp"
                      aria-label="Stamp"
                    >
                      <span className="toolbar__tool-icon">St</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'selection-rect'}
                      onClick={() => setActiveTool('selection-rect')}
                      title="Selection Rectangle"
                      aria-label="Selection Rectangle"
                    >
                      <span className="toolbar__tool-icon">Se</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'selection-oval'}
                      onClick={() => setActiveTool('selection-oval')}
                      title="Selection Oval"
                      aria-label="Selection Oval"
                    >
                      <span className="toolbar__tool-icon">So</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="toolbar__body">
                <div className="panel__section">
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
                      <div className="panel__row panel__row--dual">
                        <div className="panel__group">
                          <span className="panel__label">Mode</span>
                          <div className="panel__toggle-group">
                            <label className="panel__toggle" data-active={stampMode === 'soft'}>
                              <input
                                type="radio"
                                name="stamp-mode"
                                value="soft"
                                checked={stampMode === 'soft'}
                                onChange={() => setStampMode('soft')}
                              />
                              Soft
                            </label>
                            <label className="panel__toggle" data-active={stampMode === 'hard'}>
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
                          <span className="panel__label">Drag</span>
                          <div className="panel__toggle-group">
                            <label className="panel__toggle" data-active={!stampDrag}>
                              <input
                                type="radio"
                                name="stamp-drag"
                                value="off"
                                checked={!stampDrag}
                                onChange={() => setStampDrag(false)}
                              />
                              Off
                            </label>
                            <label className="panel__toggle" data-active={stampDrag}>
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
                      </div>
                      <div className="panel__row panel__row--dual">
                        <div className="panel__group">
                          <span className="panel__label">Snap</span>
                          <div className="panel__toggle-group">
                            <label className="panel__toggle" data-active={stampSnap === 'pixel'}>
                              <input
                                type="radio"
                                name="stamp-snap"
                                value="pixel"
                                checked={stampSnap === 'pixel'}
                                onChange={() => setStampSnap('pixel')}
                              />
                              Pixel
                            </label>
                            <label className="panel__toggle" data-active={stampSnap === 'tile'}>
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
                          <span className="panel__label">Flip</span>
                          <div className="panel__toggle-group">
                            <button
                              type="button"
                              className="panel__toggle"
                              data-active={stampFlipX}
                              onClick={() => setStampFlipX(!stampFlipX)}
                            >
                              Flip X
                            </button>
                            <button
                              type="button"
                              className="panel__toggle"
                              data-active={stampFlipY}
                              onClick={() => setStampFlipY(!stampFlipY)}
                            >
                              Flip Y
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="panel__row panel__row--dual">
                        <div className="panel__group">
                          <span className="panel__label">Scale</span>
                          <select
                            className="panel__select"
                            aria-label="Scale"
                            value={stampScale}
                            onChange={(event) =>
                              setStampScale(Number(event.target.value) as 1 | 2 | 4 | 8)
                            }
                          >
                            {[1, 2, 4, 8].map((scale) => (
                              <option key={scale} value={scale}>
                                {scale}x
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="panel__group">
                          <span className="panel__label">Rotate</span>
                          <select
                            className="panel__select"
                            aria-label="Rotate"
                            value={stampRotation}
                            onChange={(event) =>
                              setStampRotation(
                                Number(event.target.value) as 0 | 90 | 180 | 270
                              )
                            }
                          >
                            {[0, 90, 180, 270].map((rotation) => (
                              <option key={rotation} value={rotation}>
                                {rotation}deg
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="panel__row">
                        <div className="panel__group">
                          <span className="panel__label">Paste</span>
                          <div className="panel__toggle-group">
                            <label
                              className="panel__toggle"
                              data-active={stampPasteDuplicateColors}
                            >
                              <input
                                type="checkbox"
                                checked={stampPasteDuplicateColors}
                                onChange={() =>
                                  setStampPasteDuplicateColors(!stampPasteDuplicateColors)
                                }
                              />
                              Duplicate Colors
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : activeTool === 'reference-handle' ? (
                    <div className="panel__group">
                      {referenceDisabled && (
                        <div className="panel__item" aria-disabled="true">
                          Select a reference
                        </div>
                      )}
                      <div className="panel__row panel__row--dual">
                        <div className="panel__group">
                          <span className="panel__label">Rotation</span>
                          <div className="panel__stack">
                            <input
                              type="range"
                              className="panel__range"
                              aria-label="Rotation"
                              min={REFERENCE_ROTATION_MIN}
                              max={REFERENCE_ROTATION_MAX}
                              step={1}
                              value={referenceRotation}
                              disabled={referenceDisabled}
                              onChange={(event) =>
                                handleReferenceRotation(event.currentTarget.valueAsNumber)
                              }
                            />
                            <input
                              type="number"
                              className="panel__number"
                              aria-label="Rotation"
                              min={REFERENCE_ROTATION_MIN}
                              max={REFERENCE_ROTATION_MAX}
                              step={1}
                              value={referenceRotation}
                              disabled={referenceDisabled}
                              onChange={(event) =>
                                handleReferenceRotation(event.currentTarget.valueAsNumber)
                              }
                            />
                          </div>
                        </div>
                        <div className="panel__group">
                          <span className="panel__label">Scale</span>
                          <div className="panel__stack">
                            <input
                              type="range"
                              className="panel__range"
                              aria-label="Scale"
                              min={REFERENCE_SCALE_SLIDER_MIN}
                              max={REFERENCE_SCALE_SLIDER_MAX}
                              step={1}
                              value={referenceScaleSlider}
                              disabled={referenceDisabled}
                              onChange={(event) =>
                                handleReferenceScale(
                                  sliderToScale(event.currentTarget.valueAsNumber)
                                )
                              }
                            />
                            <input
                              type="number"
                              className="panel__number"
                              aria-label="Scale"
                              min={REFERENCE_SCALE_MIN}
                              max={REFERENCE_SCALE_MAX}
                              step={0.01}
                              value={referenceScale}
                              disabled={referenceDisabled}
                              onChange={(event) =>
                                handleReferenceScale(event.currentTarget.valueAsNumber)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="panel__row">
                        <div className="panel__group">
                          <span className="panel__label">Opacity</span>
                          <div className="panel__stack">
                            <input
                              type="range"
                              className="panel__range"
                              aria-label="Opacity"
                              min={REFERENCE_OPACITY_MIN}
                              max={REFERENCE_OPACITY_MAX}
                              step={0.05}
                              value={referenceOpacity}
                              disabled={referenceDisabled}
                              onChange={(event) =>
                                handleReferenceOpacity(event.currentTarget.valueAsNumber)
                              }
                            />
                            <input
                              type="number"
                              className="panel__number"
                              aria-label="Opacity"
                              min={REFERENCE_OPACITY_MIN}
                              max={REFERENCE_OPACITY_MAX}
                              step={0.05}
                              value={referenceOpacity}
                              disabled={referenceDisabled}
                              onChange={(event) =>
                                handleReferenceOpacity(event.currentTarget.valueAsNumber)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="panel__row panel__row--dual">
                        <div className="panel__group">
                          <span className="panel__label">Flip</span>
                          <div className="panel__toggle-group">
                            <button
                              type="button"
                              className="panel__toggle"
                              data-active={referenceFlipX}
                              disabled={referenceDisabled}
                              onClick={() =>
                                updateSelectedReference({ flipX: !referenceFlipX })
                              }
                            >
                              Flip X
                            </button>
                            <button
                              type="button"
                              className="panel__toggle"
                              data-active={referenceFlipY}
                              disabled={referenceDisabled}
                              onClick={() =>
                                updateSelectedReference({ flipY: !referenceFlipY })
                              }
                            >
                              Flip Y
                            </button>
                          </div>
                        </div>
                        <div className="panel__group">
                          <span className="panel__label">Snap</span>
                          <div className="panel__toggle-group">
                            <label
                              className="panel__toggle"
                              data-active={referenceSnap === 'pixel'}
                            >
                              <input
                                type="radio"
                                name="reference-snap"
                                value="pixel"
                                checked={referenceSnap === 'pixel'}
                                onChange={() => setReferenceSnap('pixel')}
                              />
                              Pixel
                            </label>
                            <label
                              className="panel__toggle"
                              data-active={referenceSnap === 'tile'}
                            >
                              <input
                                type="radio"
                                name="reference-snap"
                                value="tile"
                                checked={referenceSnap === 'tile'}
                                onChange={() => setReferenceSnap('tile')}
                              />
                              Tile
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="panel__row">
                        <button
                          type="button"
                          className="panel__item"
                          disabled={referenceDisabled}
                          onClick={() => {
                            if (selectedReference) {
                              removeReference(selectedReference.id);
                            }
                          }}
                        >
                          Delete Reference
                        </button>
                      </div>
                      <div className="panel__row panel__row--dual">
                        <div className="panel__group">
                          <span className="panel__label">Auto Trace (Palette)</span>
                          <div className="panel__row">
                            <input
                              type="number"
                              className="panel__number"
                              aria-label="Trace palette start index"
                              min={0}
                              max={paletteMaxIndex}
                              step={1}
                              value={tracePaletteStart}
                              disabled={referenceDisabled}
                              onChange={(event) => {
                                const next = event.currentTarget.valueAsNumber;
                                if (Number.isFinite(next)) {
                                  setTracePaletteStart(Math.round(next));
                                }
                              }}
                            />
                            <input
                              type="number"
                              className="panel__number"
                              aria-label="Trace palette end index"
                              min={0}
                              max={paletteMaxIndex}
                              step={1}
                              value={tracePaletteEnd}
                              disabled={referenceDisabled}
                              onChange={(event) => {
                                const next = event.currentTarget.valueAsNumber;
                                if (Number.isFinite(next)) {
                                  setTracePaletteEnd(Math.round(next));
                                }
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            className="panel__item"
                            disabled={referenceDisabled || paletteColors.length === 0}
                            onClick={handleTracePaletteRange}
                          >
                            Trace Range
                          </button>
                        </div>
                        <div className="panel__group">
                          <span className="panel__label">Auto Trace (Max Colors)</span>
                          <input
                            type="number"
                            className="panel__number"
                            aria-label="Trace max colors"
                            min={TRACE_MAX_COLORS_MIN}
                            max={TRACE_MAX_COLORS_MAX}
                            step={1}
                            value={traceMaxColors}
                            disabled={referenceDisabled}
                            onChange={(event) => {
                              const next = event.currentTarget.valueAsNumber;
                              if (Number.isFinite(next)) {
                                setTraceMaxColors(Math.round(next));
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="panel__item"
                            disabled={referenceDisabled}
                            onClick={handleTraceMaxColors}
                          >
                            Trace Max Colors
                          </button>
                        </div>
                      </div>
                    </div>
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
                <div className="panel__section">
                  <span className="panel__label">Actions</span>
                  <button type="button" className="panel__item" onClick={handleAddReference}>
                    Add Reference
                  </button>
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
                    <button
                      type="button"
                      className="panel__item"
                      onClick={copySelectionToClipboard}
                    >
                      Copy Selection
                    </button>
                  )}
                  {selectionCount > 0 && (
                    <button
                      type="button"
                      className="panel__item"
                      onClick={cutSelectionToClipboard}
                    >
                      Cut Selection
                    </button>
                  )}
                  {selectionCount > 0 && (
                    <button
                      type="button"
                      className="panel__item"
                      onClick={() => void exportSelectionAsPng()}
                    >
                      Export PNG
                    </button>
                  )}
                 
                  {selectionCount > 0 && (
                    <button type="button" className="panel__item" onClick={clearSelection}>
                      Clear Selection
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="app__palette panel">
          <PaletteBar />
        </div>
        <div
          className={`app__minimap panel${minimapCollapsed ? ' app__minimap--collapsed panel--collapsed' : ''}`}
        >
          <div className="panel__header">
            <h2>Minimap</h2>
            <button
              type="button"
              className="panel__toggle"
              onClick={() => setMinimapCollapsed((prev) => !prev)}
            >
              {minimapCollapsed ? 'Expand' : 'Collapse'}
            </button>
          </div>
          {!minimapCollapsed && <MinimapPanel />}
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
                <span>Export PNG</span>
                <span>Ctrl+Shift+E</span>
              </div>
              <div className="modal__row">
                <span>Export GBR</span>
                <span>Ctrl+Shift+G</span>
              </div>
              <div className="modal__row">
                <span>Undo</span>
                <span>Ctrl+Z</span>
              </div>
              <div className="modal__row">
                <span>Redo</span>
                <span>Ctrl+Y / Ctrl+Shift+Z</span>
              </div>
              <div className="modal__row">
                <span>Trace Palette Range</span>
                <span>Reference panel button</span>
              </div>
              <div className="modal__row">
                <span>Trace Max Colors</span>
                <span>Reference panel button</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {showLicense && (
        <div className="modal">
          <div className="modal__backdrop" onClick={() => setShowLicense(false)} />
          <div className="modal__content modal__content--license">
            <div className="modal__header">
              <h2>License</h2>
              <button type="button" onClick={() => setShowLicense(false)}>
                Close
              </button>
            </div>
            <div className="modal__body modal__body--license">
              <pre className="modal__license">
MIT License

Copyright (c) 2026 Joel Longanecker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
