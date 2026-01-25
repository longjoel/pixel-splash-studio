import React, { useEffect, useState } from 'react';
import ViewportCanvas from './canvas/ViewportCanvas';
import MinimapPanel from './canvas/MinimapPanel';
import PaletteBar from './ui/PaletteBar';
import TileBar from './ui/TileBar';
import DropdownSelect from './ui/DropdownSelect';
import { loadProject, newProject, saveProject } from './services/project';
import { useHistoryStore } from './state/historyStore';
import { useProjectStore, getProjectTitle } from './state/projectStore';
import { useToolStore } from './state/toolStore';
import { useBrushStore } from './state/brushStore';
import { useSprayStore } from './state/sprayStore';
import { useRectangleStore } from './state/rectangleStore';
import { useOvalStore } from './state/ovalStore';
import { useSelectionRectangleStore } from './state/selectionRectangleStore';
import { useFillBucketStore } from './state/fillBucketStore';
import { useSelectionStore } from './state/selectionStore';
import { copySelectionToClipboard, cutSelectionToClipboard } from './services/selectionClipboard';
import { exportSelectionAsPng } from './services/selectionExport';
import { exportSelectionAsGbr } from './services/selectionExportGbr';
import { exportSelectionAsChr } from './services/selectionExportChr';
import {
  exportSelectionAsBmp,
  exportSelectionAsGif,
  exportSelectionAsPcx,
  exportSelectionAsTga,
} from './services/selectionExportImage';
import {
  exportSelectionAsBsaveCga,
  exportSelectionAsBsaveEga,
  exportSelectionAsBsaveVga,
} from './services/selectionExportBsave';
import { consolidatePalette } from './services/paletteConsolidate';
import { importImageAsProject } from './services/importImageProject';
import { useStampStore } from './state/stampStore';
import { usePixelStore } from './state/pixelStore';
import { usePreviewStore } from './state/previewStore';
import { useClipboardStore } from './state/clipboardStore';
import { usePaletteStore } from './state/paletteStore';
import { useViewportStore } from './state/viewportStore';
import { useLayerVisibilityStore } from './state/layerVisibilityStore';
import { addReferenceFromFile } from './services/references';
import {
  traceReferenceWithMaxColors,
  traceReferenceWithPaletteRange,
} from './services/referenceTrace';
import { useReferenceStore } from './state/referenceStore';
import { useReferenceHandleStore } from './state/referenceHandleStore';
import { useTileMapStore } from './state/tileMapStore';
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

const TOOL_ICONS = {
  pen: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 20l4-1 10-10-3-3-10 10-1 4z" />
      <path d="M14 6l3 3" />
    </svg>
  ),
  spray: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 10h6l2 2v2H8z" />
      <path d="M6 12h2" />
      <path d="M17 12h1.5" />
      <path d="M12 6v4" />
      <path d="M15 16l.8.8M13 17.5l.5 1M10.5 17.2l-.7.9M9 16l-1 1" />
    </svg>
  ),
  line: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <line x1="5" y1="19" x2="19" y2="5" />
    </svg>
  ),
  rectangle: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="14" height="14" rx="1.5" />
    </svg>
  ),
  oval: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <ellipse cx="12" cy="12" rx="7" ry="5.5" />
    </svg>
  ),
  'fill-bucket': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 10l7-7 4 4-7 7H7z" />
      <path d="M7 14h6" />
    </svg>
  ),
  'reference-handle': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  eyedropper: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 16l7-7 4 4-7 7H5z" />
      <path d="M14 6l4 4" />
    </svg>
  ),
  stamp: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 14h10v4H7z" />
      <path d="M9 14v-4a3 3 0 016 0v4" />
    </svg>
  ),
  'selection-rect': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="14" height="14" rx="1.5" strokeDasharray="2 2" />
    </svg>
  ),
  'selection-oval': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <ellipse cx="12" cy="12" rx="7" ry="5.5" strokeDasharray="2 2" />
    </svg>
  ),
  'tile-sampler': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="14" height="14" rx="1.5" strokeDasharray="2 2" />
      <path d="M9 9h2v2H9zM13 9h2v2h-2zM9 13h2v2H9zM13 13h2v2h-2z" />
    </svg>
  ),
  'tile-pen': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="10" height="10" rx="1.5" />
      <path d="M14.5 14.5l5.5-5.5-3-3-5.5 5.5-1 4 4-1z" />
    </svg>
  ),
  'tile-rectangle': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M8 10h4M8 14h8" />
    </svg>
  ),
  'tile-9slice': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16M4 14h16M10 4v16M14 4v16" />
    </svg>
  ),
  'tile-export': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="12" height="12" rx="2" />
      <path d="M12 12h8M16 8l4 4-4 4" />
    </svg>
  ),
} as const;

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
  const pixelStore = usePixelStore.getState();
  const pixelBytes = pixelStore.layers.reduce(
    (total, layer) => total + sumBlockBytes(layer.store.getBlocks()),
    0
  );
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
    spray: stripFunctions(useSprayStore.getState() as Record<string, unknown>),
    rectangle: stripFunctions(useRectangleStore.getState() as Record<string, unknown>),
    oval: stripFunctions(useOvalStore.getState() as Record<string, unknown>),
    selection: stripFunctions(useSelectionRectangleStore.getState() as Record<string, unknown>),
    fill: stripFunctions(useFillBucketStore.getState() as Record<string, unknown>),
    stamp: stripFunctions(useStampStore.getState() as Record<string, unknown>),
    viewport: stripFunctions(useViewportStore.getState() as Record<string, unknown>),
    layers: stripFunctions(useLayerVisibilityStore.getState() as Record<string, unknown>),
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
  const historyLocked = useHistoryStore((state) => state.locked);
  const selectionCount = useSelectionStore((state) => state.selectedCount);
  const clearSelection = useSelectionStore((state) => state.clear);
  const projectPath = useProjectStore((state) => state.path);
  const dirty = useProjectStore((state) => state.dirty);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showLicense, setShowLicense] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [toolbarCollapsed, setToolbarCollapsed] = useState(false);
  const [minimapCollapsed, setMinimapCollapsed] = useState(true);
  const [memoryInfoEnabled, setMemoryInfoEnabled] = useState(false);
  const [memoryLabel, setMemoryLabel] = useState('');
  const [paletteHeight, setPaletteHeight] = useState(96);
  const [tilePaletteHeight, setTilePaletteHeight] = useState(220);
  const activeTool = useToolStore((state) => state.activeTool);
  const setActiveTool = useToolStore((state) => state.setActiveTool);
  const showReferenceLayer = useLayerVisibilityStore((state) => state.showReferenceLayer);
  const showPixelLayer = useLayerVisibilityStore((state) => state.showPixelLayer);
  const showTileLayer = useLayerVisibilityStore((state) => state.showTileLayer);
  const showPixelGrid = useLayerVisibilityStore((state) => state.showPixelGrid);
  const showTileGrid = useLayerVisibilityStore((state) => state.showTileGrid);
  const showAxes = useLayerVisibilityStore((state) => state.showAxes);
  const setShowReferenceLayer = useLayerVisibilityStore((state) => state.setShowReferenceLayer);
  const setShowPixelLayer = useLayerVisibilityStore((state) => state.setShowPixelLayer);
  const setShowTileLayer = useLayerVisibilityStore((state) => state.setShowTileLayer);
  const setShowPixelGrid = useLayerVisibilityStore((state) => state.setShowPixelGrid);
  const setShowTileGrid = useLayerVisibilityStore((state) => state.setShowTileGrid);
  const setShowAxes = useLayerVisibilityStore((state) => state.setShowAxes);
  const toggleReferenceLayer = useLayerVisibilityStore((state) => state.toggleReferenceLayer);
  const togglePixelLayer = useLayerVisibilityStore((state) => state.togglePixelLayer);
  const toggleTileLayer = useLayerVisibilityStore((state) => state.toggleTileLayer);
  const togglePixelGrid = useLayerVisibilityStore((state) => state.togglePixelGrid);
  const toggleTileGrid = useLayerVisibilityStore((state) => state.toggleTileGrid);
  const toggleAxes = useLayerVisibilityStore((state) => state.toggleAxes);
  const tileSets = useTileMapStore((state) => state.tileSets);
  const tileMaps = useTileMapStore((state) => state.tileMaps);
  const activeTileSetId = useTileMapStore((state) => state.activeTileSetId);
  const activeTileMapId = useTileMapStore((state) => state.activeTileMapId);
  const selectedTileIndex = useTileMapStore((state) => state.selectedTileIndex);
  const brushSize = useBrushStore((state) => state.size);
  const brushShape = useBrushStore((state) => state.shape);
  const sprayRadius = useSprayStore((state) => state.radius);
  const sprayDensity = useSprayStore((state) => state.density);
  const sprayFalloff = useSprayStore((state) => state.falloff);
  const rectangleMode = useRectangleStore((state) => state.mode);
  const setRectangleMode = useRectangleStore((state) => state.setMode);
  const ovalMode = useOvalStore((state) => state.mode);
  const setOvalMode = useOvalStore((state) => state.setMode);
  const selectionSnap = useSelectionRectangleStore((state) => state.snap);
  const setSelectionSnap = useSelectionRectangleStore((state) => state.setSnap);
  const fillMode = useFillBucketStore((state) => state.mode);
  const setFillMode = useFillBucketStore((state) => state.setMode);
  const fillGradientDirection = useFillBucketStore((state) => state.gradientDirection);
  const setFillGradientDirection = useFillBucketStore((state) => state.setGradientDirection);
  const fillGradientDither = useFillBucketStore((state) => state.gradientDither);
  const setFillGradientDither = useFillBucketStore((state) => state.setGradientDither);
  const paletteSelectionCount = usePaletteStore((state) => state.selectedIndices.length);
  const stampMode = useStampStore((state) => state.mode);
  const stampSnap = useStampStore((state) => state.snap);
  const stampRotation = useStampStore((state) => state.rotation);
  const stampScale = useStampStore((state) => state.scale);
  const stampFlipX = useStampStore((state) => state.flipX);
  const stampFlipY = useStampStore((state) => state.flipY);
  const stampDrag = useStampStore((state) => state.drag);
  const stampPasteDuplicateColors = useStampStore((state) => state.pasteDuplicateColors);
  const tileDebugOverlay = useTileMapStore((state) => state.tileDebugOverlay);
  const setTileDebugOverlay = useTileMapStore((state) => state.setTileDebugOverlay);
  const nineSlice = useTileMapStore((state) => state.nineSlice);
  const tileSelectionCols = useTileMapStore((state) => state.selectedTileCols);
  const tileSelectionRows = useTileMapStore((state) => state.selectedTileRows);
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
  const setSprayRadius = useSprayStore((state) => state.setRadius);
  const setSprayDensity = useSprayStore((state) => state.setDensity);
  const setSprayFalloff = useSprayStore((state) => state.setFalloff);
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
  const activeTileSet = tileSets.find((set) => set.id === activeTileSetId) ?? tileSets[0];
  const activeTileMap = tileMaps.find((map) => map.id === activeTileMapId) ?? tileMaps[0];
  const isTilingTool =
    activeTool === 'tile-sampler' ||
    activeTool === 'tile-pen' ||
    activeTool === 'tile-rectangle' ||
    activeTool === 'tile-9slice' ||
    activeTool === 'tile-export';
  const paletteHeightValue = isTilingTool ? tilePaletteHeight : paletteHeight;
  const resizeModeRef = React.useRef<'palette' | 'tile'>('palette');
  const resizingRef = React.useRef(false);

  const startPaletteResize = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    resizeModeRef.current = isTilingTool ? 'tile' : 'palette';
    resizingRef.current = true;
  };

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!resizingRef.current) {
        return;
      }
      const viewportHeight = document.documentElement.clientHeight;
      const nextHeight = Math.max(72, Math.min(360, viewportHeight - event.clientY));
      if (resizeModeRef.current === 'tile') {
        setTilePaletteHeight(nextHeight);
      } else {
        setPaletteHeight(nextHeight);
      }
    };
    const handlePointerUp = () => {
      resizeModeRef.current = isTilingTool ? 'tile' : 'palette';
      resizingRef.current = false;
    };
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isTilingTool]);
  const paletteRightOffset = (minimapCollapsed ? 0 : 324) + 24;

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
        if (useHistoryStore.getState().locked) {
          return;
        }
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if (key === 'y') {
        event.preventDefault();
        if (useHistoryStore.getState().locked) {
          return;
        }
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
        if (event.shiftKey) {
          copySelectionToClipboard({ deep: true });
        } else {
          copySelectionToClipboard();
        }
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
    await loadProject(undefined);
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
      if (action.startsWith('view:set:')) {
        const parts = action.split(':');
        const key = parts[2] ?? '';
        const rawValue = parts[3] ?? '';
        const next = rawValue === 'true';
        switch (key) {
          case 'showReferenceLayer':
            setShowReferenceLayer(next);
            return;
          case 'showPixelLayer':
            setShowPixelLayer(next);
            return;
          case 'showTileLayer':
            setShowTileLayer(next);
            return;
          case 'showPixelGrid':
            setShowPixelGrid(next);
            return;
          case 'showTileGrid':
            setShowTileGrid(next);
            return;
          case 'showAxes':
            setShowAxes(next);
            return;
          case 'toolbarCollapsed':
            setToolbarCollapsed(next);
            return;
          case 'minimapCollapsed':
            setMinimapCollapsed(next);
            return;
          default:
            return;
        }
      }
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
        case 'exportBsaveCga':
          void exportSelectionAsBsaveCga();
          break;
        case 'exportBsaveEga':
          void exportSelectionAsBsaveEga();
          break;
        case 'exportBsaveVga':
          void exportSelectionAsBsaveVga();
          break;
        case 'exportGbr':
          void exportSelectionAsGbr();
          break;
        case 'exportChr':
          void exportSelectionAsChr();
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
        case 'tileDebug:on':
          setTileDebugOverlay(true);
          break;
        case 'tileDebug:off':
          setTileDebugOverlay(false);
          break;
        case 'view:select-tool:pen':
          setActiveTool('pen');
          break;
        default:
          break;
      }
    });
    return () => unsubscribe();
  }, [projectPath]);

  useEffect(() => {
    window.viewMenuApi?.setState({
      showReferenceLayer,
      showPixelLayer,
      showTileLayer,
      showPixelGrid,
      showTileGrid,
      showAxes,
      toolbarCollapsed,
      minimapCollapsed,
    });
  }, [
    showReferenceLayer,
    showPixelLayer,
    showTileLayer,
    showPixelGrid,
    showTileGrid,
    showAxes,
    toolbarCollapsed,
    minimapCollapsed,
  ]);

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
                      <span className="toolbar__tool-icon">{TOOL_ICONS.pen}</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'spray'}
                      onClick={() => setActiveTool('spray')}
                      title="Spray"
                      aria-label="Spray"
                    >
                      <span className="toolbar__tool-icon">{TOOL_ICONS.spray}</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'line'}
                      onClick={() => setActiveTool('line')}
                      title="Line"
                      aria-label="Line"
                    >
                      <span className="toolbar__tool-icon">{TOOL_ICONS.line}</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'rectangle'}
                      onClick={() => setActiveTool('rectangle')}
                      title="Rectangle"
                      aria-label="Rectangle"
                    >
                      <span className="toolbar__tool-icon">{TOOL_ICONS.rectangle}</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'oval'}
                      onClick={() => setActiveTool('oval')}
                      title="Oval"
                      aria-label="Oval"
                    >
                      <span className="toolbar__tool-icon">{TOOL_ICONS.oval}</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'fill-bucket'}
                      onClick={() => setActiveTool('fill-bucket')}
                      title="Fill"
                      aria-label="Fill"
                    >
                      <span className="toolbar__tool-icon">{TOOL_ICONS['fill-bucket']}</span>
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
                      <span className="toolbar__tool-icon">{TOOL_ICONS['reference-handle']}</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'eyedropper'}
                      onClick={() => setActiveTool('eyedropper')}
                      title="Eyedropper"
                      aria-label="Eyedropper"
                    >
                      <span className="toolbar__tool-icon">{TOOL_ICONS.eyedropper}</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'stamp'}
                      onClick={() => setActiveTool('stamp')}
                      title="Stamp"
                      aria-label="Stamp"
                    >
                      <span className="toolbar__tool-icon">{TOOL_ICONS.stamp}</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'selection-rect'}
                      onClick={() => setActiveTool('selection-rect')}
                      title="Selection Rectangle"
                      aria-label="Selection Rectangle"
                    >
                      <span className="toolbar__tool-icon">{TOOL_ICONS['selection-rect']}</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'selection-oval'}
                      onClick={() => setActiveTool('selection-oval')}
                      title="Selection Oval"
                      aria-label="Selection Oval"
                    >
                      <span className="toolbar__tool-icon">{TOOL_ICONS['selection-oval']}</span>
                    </button>
                  </div>
                </div>
                <div className="toolbar__tool-group">
                  <span className="panel__label">Tiling</span>
                  <div className="toolbar__tools-grid">
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'tile-sampler'}
                      onClick={() => setActiveTool('tile-sampler')}
                      title="Tile Sampler"
                      aria-label="Tile Sampler"
                    >
                      <span className="toolbar__tool-icon">{TOOL_ICONS['tile-sampler']}</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'tile-pen'}
                      onClick={() => setActiveTool('tile-pen')}
                      title="Tile Pen"
                      aria-label="Tile Pen"
                    >
                      <span className="toolbar__tool-icon">{TOOL_ICONS['tile-pen']}</span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'tile-rectangle'}
                      onClick={() => setActiveTool('tile-rectangle')}
                      title="Tile Rectangle"
                      aria-label="Tile Rectangle"
                    >
                      <span className="toolbar__tool-icon">
                        {TOOL_ICONS['tile-rectangle']}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'tile-9slice'}
                      onClick={() => setActiveTool('tile-9slice')}
                      title="Tile 9-Slice"
                      aria-label="Tile 9-Slice"
                    >
                      <span className="toolbar__tool-icon">
                        {TOOL_ICONS['tile-9slice']}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="panel__item toolbar__tool-button"
                      data-active={activeTool === 'tile-export'}
                      onClick={() => setActiveTool('tile-export')}
                      title="Tile Export"
                      aria-label="Tile Export"
                    >
                      <span className="toolbar__tool-icon">
                        {TOOL_ICONS['tile-export']}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="toolbar__body">
                <div className="panel__section">
                  <div className="panel__group">
                    <span className="panel__label">Layers</span>
                    <div className="panel__toggle-group">
                      <label className="panel__toggle" data-active={showReferenceLayer}>
                        <input
                          type="checkbox"
                          checked={showReferenceLayer}
                          onChange={toggleReferenceLayer}
                        />
                        Reference
                      </label>
                      <label className="panel__toggle" data-active={showPixelLayer}>
                        <input
                          type="checkbox"
                          checked={showPixelLayer}
                          onChange={togglePixelLayer}
                        />
                        Pixels
                      </label>
                      <label className="panel__toggle" data-active={showTileLayer}>
                        <input
                          type="checkbox"
                          checked={showTileLayer}
                          onChange={toggleTileLayer}
                        />
                        Tiles
                      </label>
                    </div>
                  </div>
                  <div className="panel__group">
                    <span className="panel__label">Overlays</span>
                    <div className="panel__toggle-group">
                      <label
                        className="panel__toggle"
                        data-active={showPixelGrid}
                        title="Toggle pixel grid visibility"
                      >
                        <input
                          type="checkbox"
                          checked={showPixelGrid}
                          onChange={togglePixelGrid}
                          aria-label="Toggle pixel grid visibility"
                        />
                        Pixel Grid
                      </label>
                      <label
                        className="panel__toggle"
                        data-active={showTileGrid}
                        title="Toggle tile grid visibility"
                      >
                        <input
                          type="checkbox"
                          checked={showTileGrid}
                          onChange={toggleTileGrid}
                          aria-label="Toggle tile grid visibility"
                        />
                        Tile Grid
                      </label>
                      <label
                        className="panel__toggle"
                        data-active={showAxes}
                        title="Toggle axis visibility"
                      >
                        <input
                          type="checkbox"
                          checked={showAxes}
                          onChange={toggleAxes}
                          aria-label="Toggle axis visibility"
                        />
                        Axes
                      </label>
                    </div>
                  </div>
                </div>
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
                  ) : activeTool === 'spray' ? (
                    <>
                      <div className="panel__row panel__row--dual">
                        <div className="panel__group">
                          <span className="panel__label">Radius</span>
                          <div className="panel__stack">
                            <input
                              type="range"
                              className="panel__range"
                              aria-label="Radius"
                              min={1}
                              max={64}
                              step={1}
                              value={sprayRadius}
                              onChange={(event) =>
                                setSprayRadius(event.currentTarget.valueAsNumber)
                              }
                            />
                            <input
                              type="number"
                              className="panel__number"
                              aria-label="Radius"
                              min={1}
                              max={64}
                              step={1}
                              value={sprayRadius}
                              onChange={(event) =>
                                setSprayRadius(event.currentTarget.valueAsNumber)
                              }
                            />
                          </div>
                        </div>
                        <div className="panel__group">
                          <span className="panel__label">Density</span>
                          <div className="panel__stack">
                            <input
                              type="range"
                              className="panel__range"
                              aria-label="Density"
                              min={10}
                              max={2000}
                              step={10}
                              value={Math.min(2000, sprayDensity)}
                              onChange={(event) =>
                                setSprayDensity(event.currentTarget.valueAsNumber)
                              }
                            />
                            <input
                              type="number"
                              className="panel__number"
                              aria-label="Density"
                              min={1}
                              max={20000}
                              step={10}
                              value={sprayDensity}
                              onChange={(event) =>
                                setSprayDensity(event.currentTarget.valueAsNumber)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="panel__row">
                        <div className="panel__group">
                          <span className="panel__label">Falloff</span>
                          <div className="panel__stack">
                            <input
                              type="range"
                              className="panel__range"
                              aria-label="Falloff"
                              min={0}
                              max={1}
                              step={0.05}
                              value={sprayFalloff}
                              onChange={(event) =>
                                setSprayFalloff(event.currentTarget.valueAsNumber)
                              }
                            />
                            <input
                              type="number"
                              className="panel__number"
                              aria-label="Falloff"
                              min={0}
                              max={1}
                              step={0.05}
                              value={sprayFalloff}
                              onChange={(event) =>
                                setSprayFalloff(event.currentTarget.valueAsNumber)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : activeTool === 'line' ? (
                    paletteSelectionCount >= 2 ? (
                      <>
                        <div className="panel__group">
                          <span className="panel__label">Direction</span>
                          <DropdownSelect
                            ariaLabel="Gradient direction"
                            value={fillGradientDirection}
                            onChange={setFillGradientDirection}
                            options={[
                              { value: 'top-bottom', label: 'Top → Bottom' },
                              { value: 'bottom-top', label: 'Bottom → Top' },
                              { value: 'left-right', label: 'Left → Right' },
                              { value: 'right-left', label: 'Right → Left' },
                            ]}
                          />
                        </div>
                        <div className="panel__group">
                          <span className="panel__label">Dither</span>
                          <DropdownSelect
                            ariaLabel="Gradient dither"
                            value={fillGradientDither}
                            onChange={setFillGradientDither}
                            options={[
                              { value: 'bayer2', label: 'Ordered (Bayer 2×2)' },
                              { value: 'bayer4', label: 'Ordered (Bayer 4×4)' },
                              { value: 'bayer8', label: 'Ordered (Bayer 8×8)' },
                              { value: 'none', label: 'None' },
                              { value: 'random', label: 'Random (stable)' },
                              { value: 'blue-noise', label: 'Blue noise (interleaved)' },
                              { value: 'floyd-steinberg', label: 'Error diffusion (Floyd–Steinberg)' },
                              { value: 'atkinson', label: 'Error diffusion (Atkinson)' },
                              { value: 'jarvis-judice-ninke', label: 'Error diffusion (Jarvis–Judice–Ninke)' },
                              { value: 'stucki', label: 'Error diffusion (Stucki)' },
                            ]}
                          />
                        </div>
                        <div className="panel__note">
                          Select 2+ palette swatches (Shift-click) for gradient ramp.
                        </div>
                      </>
                    ) : (
                      <div className="panel__note">
                        Select 2+ palette swatches (Shift-click) for gradient ramp.
                      </div>
                    )
                  ) : activeTool === 'rectangle' ? (
                    <>
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
                        </div>
                      </div>
                      {paletteSelectionCount >= 2 && (
                        <>
                          <div className="panel__group">
                            <span className="panel__label">Direction</span>
                            <DropdownSelect
                              ariaLabel="Gradient direction"
                              value={fillGradientDirection}
                              onChange={setFillGradientDirection}
                              options={[
                                { value: 'top-bottom', label: 'Top → Bottom' },
                                { value: 'bottom-top', label: 'Bottom → Top' },
                                { value: 'left-right', label: 'Left → Right' },
                                { value: 'right-left', label: 'Right → Left' },
                              ]}
                            />
                          </div>
                          <div className="panel__group">
                            <span className="panel__label">Dither</span>
                            <DropdownSelect
                              ariaLabel="Gradient dither"
                              value={fillGradientDither}
                              onChange={setFillGradientDither}
                              options={[
                                { value: 'bayer2', label: 'Ordered (Bayer 2×2)' },
                                { value: 'bayer4', label: 'Ordered (Bayer 4×4)' },
                                { value: 'bayer8', label: 'Ordered (Bayer 8×8)' },
                                { value: 'none', label: 'None' },
                                { value: 'random', label: 'Random (stable)' },
                                { value: 'blue-noise', label: 'Blue noise (interleaved)' },
                                { value: 'floyd-steinberg', label: 'Error diffusion (Floyd–Steinberg)' },
                                { value: 'atkinson', label: 'Error diffusion (Atkinson)' },
                                { value: 'jarvis-judice-ninke', label: 'Error diffusion (Jarvis–Judice–Ninke)' },
                                { value: 'stucki', label: 'Error diffusion (Stucki)' },
                              ]}
                            />
                          </div>
                          <div className="panel__note">
                            Select 2+ palette swatches (Shift-click) for gradient ramp.
                          </div>
                        </>
                      )}
                    </>
                  ) : activeTool === 'oval' ? (
                    <>
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
                        </div>
                      </div>
                      {paletteSelectionCount >= 2 && (
                        <>
                          <div className="panel__group">
                            <span className="panel__label">Direction</span>
                            <DropdownSelect
                              ariaLabel="Gradient direction"
                              value={fillGradientDirection}
                              onChange={setFillGradientDirection}
                              options={[
                                { value: 'top-bottom', label: 'Top → Bottom' },
                                { value: 'bottom-top', label: 'Bottom → Top' },
                                { value: 'left-right', label: 'Left → Right' },
                                { value: 'right-left', label: 'Right → Left' },
                              ]}
                            />
                          </div>
                          <div className="panel__group">
                            <span className="panel__label">Dither</span>
                            <DropdownSelect
                              ariaLabel="Gradient dither"
                              value={fillGradientDither}
                              onChange={setFillGradientDither}
                              options={[
                                { value: 'bayer2', label: 'Ordered (Bayer 2×2)' },
                                { value: 'bayer4', label: 'Ordered (Bayer 4×4)' },
                                { value: 'bayer8', label: 'Ordered (Bayer 8×8)' },
                                { value: 'none', label: 'None' },
                                { value: 'random', label: 'Random (stable)' },
                                { value: 'blue-noise', label: 'Blue noise (interleaved)' },
                                { value: 'floyd-steinberg', label: 'Error diffusion (Floyd–Steinberg)' },
                                { value: 'atkinson', label: 'Error diffusion (Atkinson)' },
                                { value: 'jarvis-judice-ninke', label: 'Error diffusion (Jarvis–Judice–Ninke)' },
                                { value: 'stucki', label: 'Error diffusion (Stucki)' },
                              ]}
                            />
                          </div>
                          <div className="panel__note">
                            Select 2+ palette swatches (Shift-click) for gradient ramp.
                          </div>
                        </>
                      )}
                    </>
                  ) : activeTool === 'fill-bucket' ? (
                    <>
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
                          <label className="panel__radio">
                            <input
                              type="radio"
                              name="fill-mode"
                              value="gradient"
                              checked={fillMode === 'gradient'}
                              onChange={() => setFillMode('gradient')}
                              disabled={paletteSelectionCount < 2}
                            />
                            Gradient
                          </label>
                        </div>
                        <div className="panel__note">
                          Select 2+ palette swatches (Shift-click) for gradient ramp.
                        </div>
                      </div>
                      {fillMode === 'gradient' && (
                        <>
                          <div className="panel__group">
                            <span className="panel__label">Direction</span>
                            <DropdownSelect
                              ariaLabel="Gradient direction"
                              value={fillGradientDirection}
                              onChange={setFillGradientDirection}
                              options={[
                                { value: 'top-bottom', label: 'Top → Bottom' },
                                { value: 'bottom-top', label: 'Bottom → Top' },
                                { value: 'left-right', label: 'Left → Right' },
                                { value: 'right-left', label: 'Right → Left' },
                              ]}
                            />
                          </div>
                        </>
                      )}
                    </>
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
                          <DropdownSelect
                            ariaLabel="Scale"
                            value={String(stampScale) as '1' | '2' | '4' | '8'}
                            onChange={(next) => setStampScale(Number(next) as 1 | 2 | 4 | 8)}
                            options={[
                              { value: '1', label: '1x' },
                              { value: '2', label: '2x' },
                              { value: '4', label: '4x' },
                              { value: '8', label: '8x' },
                            ]}
                          />
                        </div>
                        <div className="panel__group">
                          <span className="panel__label">Rotate</span>
                          <DropdownSelect
                            ariaLabel="Rotate"
                            value={
                              String(stampRotation) as '0' | '90' | '180' | '270'
                            }
                            onChange={(next) =>
                              setStampRotation(Number(next) as 0 | 90 | 180 | 270)
                            }
                            options={[
                              { value: '0', label: '0deg' },
                              { value: '90', label: '90deg' },
                              { value: '180', label: '180deg' },
                              { value: '270', label: '270deg' },
                            ]}
                          />
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
                  ) :
                  activeTool === 'tile-sampler' ||
                  activeTool === 'tile-pen' ||
                  activeTool === 'tile-rectangle' ||
                  activeTool === 'tile-9slice' ||
                  activeTool === 'tile-export' ? (
                    <div className="panel__group">
                      <span className="panel__label">Tile Context</span>
                      <div className="panel__note">
                        {activeTool === 'tile-sampler'
                          ? 'Drag to capture tiles on the tile grid.'
                          : activeTool === 'tile-rectangle'
                            ? 'Fill a tile rectangle using the selected tiles.'
                            : activeTool === 'tile-9slice'
                              ? 'Drag to set 3x3 source, then drag to fill.'
                              : activeTool === 'tile-export'
                                ? 'Drag to export a tile map region as tiles.png + tiles.tmx.'
                              : 'Paint tiles from the active tile set.'}
                      </div>
                      <div className="panel__stack">
                        <div className="panel__note">
                          Tile Set:{' '}
                          {activeTileSet
                            ? `${activeTileSet.name} (${activeTileSet.tiles.length} tiles)`
                            : 'None'}
                        </div>
                        <div className="panel__note">
                          Tile Map: {activeTileMap ? activeTileMap.name : 'None'}
                        </div>
                        <div className="panel__note">
                          Selected Tile: {activeTileSet ? selectedTileIndex + 1 : '—'}
                        </div>
                        {activeTool === 'tile-9slice' && (
                          <>
                            <div className="panel__note">
                              9-Slice: {nineSlice ? 'set' : 'unset'}
                            </div>
                            <div className="panel__note">
                              Selection: {tileSelectionCols}x{tileSelectionRows}
                            </div>
                          </>
                        )}
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
                    <button
                      type="button"
                      className="panel__item"
                      onClick={undo}
                      disabled={historyLocked}
                    >
                      Undo
                    </button>
                  )}
                  {redoAvailable && (
                    <button
                      type="button"
                      className="panel__item"
                      onClick={redo}
                      disabled={historyLocked}
                    >
                      Redo
                    </button>
                  )}
                  {historyLocked && (
                    <div className="panel__note">Undo/redo disabled while operation runs.</div>
                  )}
                  {selectionCount > 0 && (
                    <button
                      type="button"
                      className="panel__item"
                      onClick={() => copySelectionToClipboard()}
                    >
                      Copy Selection (Active Layer)
                    </button>
                  )}
                  {selectionCount > 0 && (
                    <button
                      type="button"
                      className="panel__item"
                      onClick={() => copySelectionToClipboard({ deep: true })}
                    >
                      Deep Copy Selection (Merged)
                    </button>
                  )}
                  {selectionCount > 0 && (
                    <button
                      type="button"
                      className="panel__item"
                      onClick={() => cutSelectionToClipboard()}
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
        <div
          className={`app__palette panel${isTilingTool ? ' app__palette--tile' : ''}`}
          style={
            {
              '--palette-right-offset': `${paletteRightOffset}px`,
              '--palette-bar-height': `${paletteHeightValue}px`,
            } as React.CSSProperties
          }
        >
          <div
            className="app__palette-resize"
            role="separator"
            aria-label="Resize palette bar"
            onPointerDown={startPaletteResize}
          />
          {isTilingTool ? <TileBar /> : <PaletteBar />}
        </div>
        {!minimapCollapsed ? (
          <div className="app__minimap panel">
            <div className="panel__header">
              <h2>Minimap</h2>
              <button
                type="button"
                className="panel__toggle"
                onClick={() => setMinimapCollapsed(true)}
              >
                Hide
              </button>
            </div>
            <MinimapPanel />
          </div>
        ) : (
          <div className="app__minimap-launch panel panel--collapsed">
            <button type="button" className="panel__toggle" onClick={() => setMinimapCollapsed(false)}>
              Minimap
            </button>
          </div>
        )}
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
                <span>Copy Selection (active layer)</span>
                <span>Ctrl+C</span>
              </div>
              <div className="modal__row">
                <span>Deep Copy Selection (merged)</span>
                <span>Ctrl+Shift+C</span>
              </div>
              <div className="modal__row">
                <span>Cut Selection</span>
                <span>Ctrl+X</span>
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
