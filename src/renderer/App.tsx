import React, { useCallback, useEffect, useRef, useState } from 'react';
import ViewportCanvas from './canvas/ViewportCanvas';
import MinimapPanel from './canvas/MinimapPanel';
import PaletteBar from './ui/PaletteBar';
import TileBar from './ui/TileBar';
import DropdownSelect from './ui/DropdownSelect';
import { TextToolModal } from './ui/TextToolModal';
import { OptionsModal } from './ui/OptionsModal';
import { AiPromptModal } from './ui/AiPromptModal';
import { Topbar } from './ui/Topbar';
import { ToolGroups } from './ui/ToolGroups';
import BottomDockControls from './ui/BottomDockControls';
import pssLogoUrl from './assets/pss-logo.png';
import { loadProject, newProject, saveProject } from './services/project';
import { mergeProjectPixels, readSplashProject } from './services/projectMerge';
import { useHistoryStore } from './state/historyStore';
import { useProjectStore, getProjectTitle } from './state/projectStore';
import { type ToolId, useToolStore } from './state/toolStore';
import { useBrushStore } from './state/brushStore';
import { useSprayStore } from './state/sprayStore';
import { useRectangleStore } from './state/rectangleStore';
import { useOvalStore } from './state/ovalStore';
import { useSelectionRectangleStore } from './state/selectionRectangleStore';
import { useFillBucketStore } from './state/fillBucketStore';
import { useSelectionStore } from './state/selectionStore';
import {
  clearSelectionPixels,
  copySelectionToClipboard,
  cutSelectionToClipboard,
} from './services/selectionClipboard';
import { exportSelectionAsPng } from './services/selectionExport';
import { openImageFilePicker } from './services/filePickers';
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
import { applyImportedImageAsNewProject } from './services/importImageProject';
import { useStampStore } from './state/stampStore';
import { usePixelStore } from './state/pixelStore';
import { usePreviewStore } from './state/previewStore';
import { useClipboardStore } from './state/clipboardStore';
import { usePaletteStore } from './state/paletteStore';
import { useViewportStore } from './state/viewportStore';
import { useLayerVisibilityStore } from './state/layerVisibilityStore';
import { addReferenceFromFile } from './services/references';
import { copyTextToClipboard, type TextFontFamily } from './services/textClipboard';
import { getGlobalHotkeyAction } from './services/hotkeys';
import {
  traceReferenceWithMaxColors,
  traceReferenceWithPaletteRange,
} from './services/referenceTrace';
import { useReferenceStore } from './state/referenceStore';
import { useReferenceHandleStore } from './state/referenceHandleStore';
import { useTileMapStore } from './state/tileMapStore';
import {
  applyPaletteMap,
  buildNearestPaletteMap,
  buildUnusedPaletteMap,
  clampRect,
  extractIndexedRegion,
  indexedToRgba,
  paletteToHex,
  scaleIndexedNearest,
  type Rect,
} from './services/romImport';
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
  const selectionCount = useSelectionStore((state) => state.selectedCount);
  const projectPath = useProjectStore((state) => state.path);
  const dirty = useProjectStore((state) => state.dirty);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showLicense, setShowLicense] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [compactTools, setCompactTools] = useState(() => {
    try {
      const stored = window.localStorage.getItem('pss.toolsCompact');
      if (stored === null) {
        return true;
      }
      return stored === '1';
    } catch {
      return true;
    }
  });
  const [textModalOpen, setTextModalOpen] = useState(false);
  const [textModalReturnTool, setTextModalReturnTool] = useState<ToolId>('pen');
  const [textToolDraft, setTextToolDraft] = useState('');
  const [textToolFontFamily, setTextToolFontFamily] = useState<TextFontFamily>('monospace');
  const [textToolFontSize, setTextToolFontSize] = useState(16);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiModalReturnTool, setAiModalReturnTool] = useState<ToolId>('pen');
  const [aiPromptDraft, setAiPromptDraft] = useState('');
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [mergeSourcePath, setMergeSourcePath] = useState<string | null>(null);
  const [mergePayload, setMergePayload] = useState<ProjectLoadResult | null>(null);
  const [mergeOffsetX, setMergeOffsetX] = useState(0);
  const [mergeOffsetY, setMergeOffsetY] = useState(0);
  const [romImportOpen, setRomImportOpen] = useState(false);
  const [romPayload, setRomPayload] = useState<ImportedImagePayload | null>(null);
  const [romSelections, setRomSelections] = useState<Rect[]>([]);
  const [romScale, setRomScale] = useState(2);
  const [romPaletteMode, setRomPaletteMode] = useState<'nearest' | 'unused'>('nearest');
  const [romPage, setRomPage] = useState(0);
  const romPageTileRows = 32;
  const romDisplayScale = 2;
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
  const activePaletteIndex = usePaletteStore((state) => state.getActiveIndex());
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

  useEffect(() => {
    try {
      window.localStorage.setItem('pss.toolsCompact', compactTools ? '1' : '0');
    } catch {
      // Ignore.
    }
  }, [compactTools]);

  const disableCompactTools = useCallback(() => {
    setCompactTools(false);
    try {
      window.localStorage.setItem('pss.toolsCompact', '0');
    } catch {
      // Ignore.
    }
  }, []);

  const tileSelectionRows = useTileMapStore((state) => state.selectedTileRows);
  const removeReference = useReferenceStore((state) => state.removeReference);
  const pasteShortcutRef = React.useRef(false);
  const romCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const romPreviewRef = useRef<HTMLCanvasElement | null>(null);
  const romDragRef = useRef<{
    startTileX: number;
    startTileY: number;
    pointerId: number;
  } | null>(null);

  const ROM_TILE_SIZE = 8;
  const romTilesAcross = romPayload ? Math.floor(romPayload.width / ROM_TILE_SIZE) : 0;
  const romTilesDown = romPayload ? Math.floor(romPayload.height / ROM_TILE_SIZE) : 0;
  const romPageCount = Math.max(1, Math.ceil(romTilesDown / romPageTileRows));
  const romPageClamped = Math.min(Math.max(0, romPage), Math.max(0, romPageCount - 1));
  const romPageStartTileY = romPageClamped * romPageTileRows;
  const romActiveSelection = romSelections[romSelections.length - 1] ?? null;

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

  useEffect(() => {
    if (!window.paletteApi?.onApply) {
      return;
    }
    return window.paletteApi.onApply((payload) => {
      const colors = Array.isArray(payload.colors) ? payload.colors : [];
      if (colors.length === 0) {
        return;
      }
      const paletteStore = usePaletteStore.getState();
      paletteStore.setPalette(colors);
      paletteStore.setSelectedIndices([]);
      useProjectStore.getState().setDirty(true);
    });
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
  const activateTool = useCallback(
    (tool: ToolId) => {
      if (tool === 'selection-lasso') {
        setActiveTool('selection-lasso');
        setBrushSize(1);
        setBrushShape('round');
        return;
      }
      if (tool === 'text') {
        setTextModalReturnTool((prev) => (activeTool === 'text' ? prev : activeTool));
        setActiveTool('text');
        setTextModalOpen(true);
        return;
      }
      if (tool === 'ai') {
        setAiModalReturnTool((prev) => (activeTool === 'ai' ? prev : activeTool));
        setActiveTool('ai');
        setAiModalOpen(true);
        return;
      }
      setActiveTool(tool);
    },
    [activeTool, setActiveTool, setBrushShape, setBrushSize]
  );
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

  const handleSave = React.useCallback(async () => {
    await saveProject(projectPath ?? undefined);
  }, [projectPath]);

  const handleSaveAs = React.useCallback(async () => {
    await saveProject(undefined);
  }, []);

  const handleLoad = React.useCallback(async () => {
    if (dirty && !window.confirm('You have unsaved changes. Continue?')) {
      return;
    }
    await loadProject(undefined);
  }, [dirty]);

  const handleNew = React.useCallback(() => {
    if (dirty && !window.confirm('You have unsaved changes. Continue?')) {
      return;
    }
    newProject();
  }, [dirty]);

  const handleShortcuts = React.useCallback(() => {
    setShowShortcuts(true);
  }, [setShowShortcuts]);

  const handleMergeProject = useCallback(async () => {
    const result = await readSplashProject();
    if (!result) {
      return;
    }
    setMergePayload(result);
    setMergeSourcePath(result.path ?? null);
    setMergeOffsetX(0);
    setMergeOffsetY(0);
    setMergeModalOpen(true);
  }, []);

  const handleImport = useCallback(async () => {
    if (!window.projectApi?.importImage) {
      window.alert('Import is unavailable. Restart the app to load the latest import support.');
      return;
    }

    const payload = await window.projectApi.importImage();
    if (!payload) {
      return;
    }

    const isRom =
      payload.format === 'nes' ||
      payload.format === 'gb' ||
      payload.format === 'gbc' ||
      payload.format === 'chr';
    if (!isRom) {
      if (payload.width > 512 || payload.height > 512) {
        window.alert('Large images (over 512x512) can take a while to load.');
      }
      applyImportedImageAsNewProject(payload);
      return;
    }

    if (payload.colorType !== 'indexed') {
      window.alert('ROM import preview requires indexed pixels.');
      return;
    }

    setRomPayload(payload);
    setRomSelections([
      {
        x: 0,
        y: 0,
        width: Math.floor(payload.width / ROM_TILE_SIZE),
        height: Math.floor(payload.height / ROM_TILE_SIZE),
      },
    ]);
    setRomScale(2);
    setRomPaletteMode('nearest');
    setRomPage(0);
    setRomImportOpen(true);
  }, []);

  const closeRomImport = useCallback(() => {
    setRomImportOpen(false);
    setRomPayload(null);
    setRomSelections([]);
    romDragRef.current = null;
  }, []);

  const updateRomActiveSelection = useCallback(
    (patch: Partial<Rect>) => {
      if (!romPayload) {
        return;
      }
      setRomSelections((prev) => {
        if (prev.length === 0) {
          return prev;
        }
        const next = prev.slice();
        const current = next[next.length - 1] ?? { x: 0, y: 0, width: 1, height: 1 };
        next[next.length - 1] = clampRect({ ...current, ...patch }, romTilesAcross, romTilesDown);
        return next;
      });
    },
    [romPayload, romTilesAcross, romTilesDown]
  );

  const getUsedPaletteIndices = useCallback(() => {
    const pixelStore = usePixelStore.getState();
    const used = new Set<number>();
    for (const layer of pixelStore.layers) {
      for (const block of layer.store.getBlocks()) {
        for (let i = 0; i < block.block.length; i += 1) {
          const v = block.block[i] ?? 0;
          if (v !== 0) {
            used.add(v);
          }
        }
      }
    }
    return used;
  }, []);

  const sendRomSelectionsToStamp = useCallback(() => {
    if (!romPayload || romSelections.length === 0) {
      return;
    }
    if (!romPayload.palette) {
      window.alert('ROM palette is missing.');
      return;
    }
    const extractedRegions = romSelections
      .map((rect) => clampRect(rect, romTilesAcross, romTilesDown))
      .filter((rect) => rect.width > 0 && rect.height > 0);
    if (extractedRegions.length === 0) {
      window.alert('Select at least one region.');
      return;
    }

    const sourcePaletteHex = paletteToHex(romPayload.palette, romPayload.pixels);
    const scaledRegions = extractedRegions.map((rect) => {
      const pixelRect = clampRect(
        {
          x: rect.x * ROM_TILE_SIZE,
          y: rect.y * ROM_TILE_SIZE,
          width: rect.width * ROM_TILE_SIZE,
          height: rect.height * ROM_TILE_SIZE,
        },
        romPayload.width,
        romPayload.height
      );
      const region = extractIndexedRegion(
        romPayload.pixels,
        romPayload.width,
        romPayload.height,
        pixelRect
      );
      return scaleIndexedNearest(region.pixels, region.width, region.height, romScale);
    });

    const paddingPx = ROM_TILE_SIZE * romScale;
    const maxRowWidthPx = Math.max(ROM_TILE_SIZE * romScale * 32, 512);
    let cursorX = 0;
    let cursorY = 0;
    let rowH = 0;
    const placements: Array<{ x: number; y: number; w: number; h: number; pixels: Uint8Array }> = [];

    for (const region of scaledRegions) {
      const w = region.width;
      const h = region.height;
      if (cursorX > 0 && cursorX + w > maxRowWidthPx) {
        cursorX = 0;
        cursorY += rowH + paddingPx;
        rowH = 0;
      }
      placements.push({ x: cursorX, y: cursorY, w, h, pixels: region.pixels });
      cursorX += w + paddingPx;
      rowH = Math.max(rowH, h);
    }
    const packedWidth = placements.length === 0 ? 1 : Math.max(...placements.map((p) => p.x + p.w));
    const packedHeight = placements.length === 0 ? 1 : Math.max(...placements.map((p) => p.y + p.h));

    const packed = new Uint8Array(packedWidth * packedHeight);
    for (const place of placements) {
      for (let y = 0; y < place.h; y += 1) {
        for (let x = 0; x < place.w; x += 1) {
          packed[(place.y + y) * packedWidth + (place.x + x)] =
            place.pixels[y * place.w + x] ?? 0;
        }
      }
    }

    const paletteStore = usePaletteStore.getState();
    const used = getUsedPaletteIndices();
    let mappedPacked: Uint8Array;
    if (romPaletteMode === 'unused') {
      const result = buildUnusedPaletteMap(sourcePaletteHex, paletteStore.colors, used);
      const ok = window.confirm(
        'This will write ROM colors into unused palette slots (and may append new colors). Continue?'
      );
      if (!ok) {
        return;
      }
      paletteStore.setPalette(result.palette);
      paletteStore.setSelectedIndices([]);
      mappedPacked = applyPaletteMap(packed, result.map);
    } else {
      const map = buildNearestPaletteMap(romPayload.palette, paletteStore.colors);
      mappedPacked = applyPaletteMap(packed, map);
    }

    const pixels: Array<{ x: number; y: number; paletteIndex: number }> = [];
    for (let i = 0; i < mappedPacked.length; i += 1) {
      const paletteIndex = mappedPacked[i] ?? 0;
      if (paletteIndex === 0) {
        continue;
      }
      pixels.push({ x: i % packedWidth, y: Math.floor(i / packedWidth), paletteIndex });
    }
    useClipboardStore.getState().setBuffer({
      pixels,
      origin: { x: 0, y: 0 },
      width: packedWidth,
      height: packedHeight,
    });
    useStampStore.getState().setSnap('tile');
    useStampStore.getState().setScale(1);
    useToolStore.getState().setActiveTool('stamp');
    closeRomImport();
  }, [
    closeRomImport,
    getUsedPaletteIndices,
    romPaletteMode,
    romPayload,
    romScale,
    romSelections,
    romTilesAcross,
    romTilesDown,
  ]);

  useEffect(() => {
    const activeSelection = romSelections[romSelections.length - 1] ?? null;
    if (!romImportOpen || !romPayload || !activeSelection) {
      return;
    }
    const canvas = romCanvasRef.current;
    const preview = romPreviewRef.current;
    if (!canvas || !preview) {
      return;
    }

    const sourcePaletteHex = paletteToHex(romPayload.palette, romPayload.pixels);
    const tilesAcross = Math.floor(romPayload.width / ROM_TILE_SIZE);
    const tilesDown = Math.floor(romPayload.height / ROM_TILE_SIZE);
    const pageCount = Math.max(1, Math.ceil(tilesDown / romPageTileRows));
    const page = Math.min(Math.max(0, romPage), pageCount - 1);
    const pageStartTileY = page * romPageTileRows;
    const pageTileHeight = Math.min(romPageTileRows, Math.max(0, tilesDown - pageStartTileY));

    const pagePixels = extractIndexedRegion(romPayload.pixels, romPayload.width, romPayload.height, {
      x: 0,
      y: pageStartTileY * ROM_TILE_SIZE,
      width: tilesAcross * ROM_TILE_SIZE,
      height: pageTileHeight * ROM_TILE_SIZE,
    });

    const extractedRegions = romSelections
      .map((rect) => clampRect(rect, tilesAcross, tilesDown))
      .filter((rect) => rect.width > 0 && rect.height > 0);

    const scaledRegions = extractedRegions.map((rect) => {
      const pixelRect = clampRect(
        {
          x: rect.x * ROM_TILE_SIZE,
          y: rect.y * ROM_TILE_SIZE,
          width: rect.width * ROM_TILE_SIZE,
          height: rect.height * ROM_TILE_SIZE,
        },
        romPayload.width,
        romPayload.height
      );
      const region = extractIndexedRegion(
        romPayload.pixels,
        romPayload.width,
        romPayload.height,
        pixelRect
      );
      const scaled = scaleIndexedNearest(region.pixels, region.width, region.height, romScale);
      return { rect, scaled };
    });

    const drawIndexedScaled = (
      target: HTMLCanvasElement,
      w: number,
      h: number,
      pixels: Uint8Array,
      pal: string[],
      scale: number
    ) => {
      const factor = Math.max(1, Math.trunc(scale));
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const off = offscreen.getContext('2d');
      if (!off) {
        return;
      }
      const rgba = indexedToRgba(pixels, w, h, pal);
      off.putImageData(new ImageData(rgba, w, h), 0, 0);

      target.width = w * factor;
      target.height = h * factor;
      const ctx = target.getContext('2d');
      if (!ctx) {
        return;
      }
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, target.width, target.height);
      ctx.drawImage(offscreen, 0, 0, target.width, target.height);
    };

    drawIndexedScaled(
      canvas,
      pagePixels.width,
      pagePixels.height,
      pagePixels.pixels,
      sourcePaletteHex,
      romDisplayScale
    );

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.strokeStyle = 'rgba(255, 74, 100, 0.95)';
      ctx.lineWidth = 1;
      for (const rect of extractedRegions) {
        const y0 = rect.y - pageStartTileY;
        if (y0 + rect.height <= 0 || y0 >= pageTileHeight) {
          continue;
        }
        const clipY = Math.max(0, y0);
        const clipH = Math.min(pageTileHeight, y0 + rect.height) - clipY;
        if (clipH <= 0) {
          continue;
        }
        const xPx = rect.x * ROM_TILE_SIZE * romDisplayScale;
        const yPx = clipY * ROM_TILE_SIZE * romDisplayScale;
        const wPx = rect.width * ROM_TILE_SIZE * romDisplayScale;
        const hPx = clipH * ROM_TILE_SIZE * romDisplayScale;
        ctx.strokeRect(xPx + 0.5, yPx + 0.5, wPx - 1, hPx - 1);
      }
      ctx.restore();
    }

    // Pack selected regions into a single clipboard-like preview.
    const paddingPx = ROM_TILE_SIZE * romScale;
    const maxRowWidthPx = Math.max(ROM_TILE_SIZE * romScale * 32, 512);
    let cursorX = 0;
    let cursorY = 0;
    let rowH = 0;
    const placements: Array<{ x: number; y: number; w: number; h: number; pixels: Uint8Array }> = [];

    for (const region of scaledRegions) {
      const w = region.scaled.width;
      const h = region.scaled.height;
      if (cursorX > 0 && cursorX + w > maxRowWidthPx) {
        cursorX = 0;
        cursorY += rowH + paddingPx;
        rowH = 0;
      }
      placements.push({ x: cursorX, y: cursorY, w, h, pixels: region.scaled.pixels });
      cursorX += w + paddingPx;
      rowH = Math.max(rowH, h);
    }
    const packedWidth = placements.length === 0 ? 1 : Math.max(...placements.map((p) => p.x + p.w));
    const packedHeight = placements.length === 0 ? 1 : Math.max(...placements.map((p) => p.y + p.h));

    const packed = new Uint8Array(packedWidth * packedHeight);
    for (const place of placements) {
      for (let y = 0; y < place.h; y += 1) {
        for (let x = 0; x < place.w; x += 1) {
          packed[(place.y + y) * packedWidth + (place.x + x)] =
            place.pixels[y * place.w + x] ?? 0;
        }
      }
    }

    let mappedPacked = packed;
    let mappedPreviewPalette = paletteColors;
    if (romPaletteMode === 'nearest') {
      const sourcePalette = romPayload.palette;
      if (!sourcePalette) {
        return;
      }
      const map = buildNearestPaletteMap(sourcePalette, paletteColors);
      mappedPacked = applyPaletteMap(packed, map);
      mappedPreviewPalette = paletteColors;
    } else {
      const used = getUsedPaletteIndices();
      const { map, palette } = buildUnusedPaletteMap(sourcePaletteHex, paletteColors, used);
      mappedPacked = applyPaletteMap(packed, map);
      mappedPreviewPalette = palette;
    }

    drawIndexedScaled(preview, packedWidth, packedHeight, mappedPacked, mappedPreviewPalette, 2);
  }, [
    getUsedPaletteIndices,
    paletteColors,
    romImportOpen,
    romPaletteMode,
    romPayload,
    romPage,
    romScale,
    romSelections,
  ]);

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
          return;
        }
        if (key === 'delete' || key === 'backspace') {
          if (useSelectionStore.getState().selectedCount === 0) {
            return;
          }
          event.preventDefault();
          clearSelectionPixels();
          return;
        }
        const action = getGlobalHotkeyAction({
          key: event.key,
          altKey: event.altKey,
          ctrlKey: event.ctrlKey,
          metaKey: event.metaKey,
          shiftKey: event.shiftKey,
        });
        if (action) {
          if (action.type === 'tool') {
            event.preventDefault();
            activateTool(action.tool);
            return;
          }
          if (action.type === 'palette-primary') {
            const palette = usePaletteStore.getState();
            if (action.index >= 0 && action.index < palette.colors.length) {
              event.preventDefault();
              palette.setSelectedIndices([action.index]);
            }
            return;
          }
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
  }, [
    activeTool,
    activateTool,
    handleLoad,
    handleNew,
    handleSave,
    handleShortcuts,
    redo,
    removeReference,
    selectedReference,
    undo,
  ]);

  useEffect(() => {
    if (activeTool !== 'text' && textModalOpen) {
      setTextModalOpen(false);
    }
  }, [activeTool, textModalOpen]);

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
          void handleImport();
          break;
        case 'mergeProject':
          void handleMergeProject();
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
        case 'options':
          setShowOptions(true);
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
  }, [
    handleImport,
    handleLoad,
    handleMergeProject,
    handleNew,
    handleSave,
    handleSaveAs,
    handleShortcuts,
    redo,
    setActiveTool,
    setMinimapCollapsed,
    setMemoryInfoEnabled,
    setShowAxes,
    setShowLicense,
    setShowPixelGrid,
    setShowPixelLayer,
    setShowReferenceLayer,
    setShowTileGrid,
    setShowTileLayer,
    setTileDebugOverlay,
    setToolbarCollapsed,
    undo,
  ]);

  useEffect(() => {
    window.viewMenuApi?.setState({
      showReferenceLayer,
      showPixelLayer,
      showTileLayer,
      showPixelGrid,
      showTileGrid,
      showAxes,
      tileDebugOverlay,
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
    tileDebugOverlay,
    toolbarCollapsed,
    minimapCollapsed,
  ]);

  return (
    <div className={`app${compactTools ? ' app--compact-tools' : ''}`}>
      <div className="app__canvas-layer">
        <ViewportCanvas />
      </div>
      <div className="app__ui-layer">
        {compactTools && (
          <Topbar
            activeTool={activeTool}
            selectionCount={selectionCount}
            activateTool={activateTool}
            onExitCompact={disableCompactTools}
          />
        )}
	        {showSplash && (
	          <div className="app__splash" aria-hidden="true">
	            <img src={pssLogoUrl} alt="" />
	          </div>
	        )}
	        <div
	          className={`app__toolbar panel${toolbarCollapsed ? ' app__toolbar--collapsed panel--collapsed' : ''}`}
	        >
          <div className="panel__header">
            <h2>{toolbarTitle}</h2>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                type="button"
                className="panel__toggle"
                onClick={() => setToolbarCollapsed((prev) => !prev)}
              >
                {toolbarCollapsed ? 'Expand' : 'Collapse'}
              </button>
            </div>
          </div>
          {!toolbarCollapsed && (
            <>
              {!compactTools && (
                <ToolGroups
                  activeTool={activeTool}
                  selectionCount={selectionCount}
                  activateTool={activateTool}
                />
              )}
              <div className="toolbar__body">
                <div className="panel__section">
                  {activeTool === 'pen' || activeTool === 'selection-lasso' ? (
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
                        </div>
                        <div className="panel__note">
                          Select 2+ palette swatches (Shift-click) for gradient ramp.
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
                        </>
                      )}
                    </>
                  ) : activeTool === 'texture-roll' ? (
                    <div className="panel__note">
                      {selectionCount === 0
                        ? 'Make a selection first.'
                        : 'Click and drag inside the selection to scroll it (wraps at selection bounds). Selection snap controls pixel vs tile steps.'}
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
          <div className={`bottom-bar${isTilingTool ? ' bottom-bar--tile' : ''}`}>
            <div className="bottom-bar__left">
              <BottomDockControls />
            </div>
            <div className="bottom-bar__center">{isTilingTool ? <TileBar /> : <PaletteBar />}</div>
          </div>
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
      {romImportOpen && romPayload && romActiveSelection && (
        <div className="modal">
          <div className="modal__backdrop" onClick={closeRomImport} />
          <div className="modal__content modal__content--rom" role="dialog" aria-modal="true">
            <div className="modal__header">
              <h2>Import ROM Segment</h2>
              <button type="button" onClick={closeRomImport}>
                Close
              </button>
            </div>
            <div className="modal__body">
              <div className="modal__row">
                <span>Selections</span>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span>{romSelections.length}</span>
                  <button
                    type="button"
                    onClick={() => setRomSelections([])}
                    disabled={romSelections.length === 0}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setRomSelections((prev) => (prev.length > 0 ? prev.slice(0, -1) : prev))
                    }
                    disabled={romSelections.length === 0}
                  >
                    Remove last
                  </button>
                  <span style={{ opacity: 0.8 }}>Ctrl+drag to add</span>
                </span>
              </div>
              <div className="modal__row">
                <span>Selection (tiles)</span>
                <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <label>
                    X{' '}
                    <input
                      type="number"
                      value={romActiveSelection.x}
                      onChange={(e) =>
                        updateRomActiveSelection({ x: Number(e.target.value) })
                      }
                    />
                  </label>
                  <label>
                    Y{' '}
                    <input
                      type="number"
                      value={romActiveSelection.y}
                      onChange={(e) =>
                        updateRomActiveSelection({ y: Number(e.target.value) })
                      }
                    />
                  </label>
                  <label>
                    W{' '}
                    <input
                      type="number"
                      value={romActiveSelection.width}
                      onChange={(e) =>
                        updateRomActiveSelection({ width: Number(e.target.value) })
                      }
                    />
                  </label>
                  <label>
                    H{' '}
                    <input
                      type="number"
                      value={romActiveSelection.height}
                      onChange={(e) =>
                        updateRomActiveSelection({ height: Number(e.target.value) })
                      }
                    />
                  </label>
                </span>
              </div>
              <div className="modal__row">
                <span>Page</span>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setRomPage((p) => Math.max(0, p - 1))}
                    disabled={romPageClamped <= 0}
                  >
                    Prev
                  </button>
                  <span>
                    {romPageClamped + 1}/{romPageCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRomPage((p) => Math.min(romPageCount - 1, p + 1))}
                    disabled={romPageClamped >= romPageCount - 1}
                  >
                    Next
                  </button>
                </span>
              </div>
              <div className="modal__row">
                <span>Scale</span>
                <span>
                  <select
                    value={romScale}
                    onChange={(e) => setRomScale(Number(e.target.value))}
                  >
                    <option value={1}>1x</option>
                    <option value={2}>2x</option>
                    <option value={3}>3x</option>
                    <option value={4}>4x</option>
                  </select>
                </span>
              </div>
              <div className="modal__row">
                <span>Palette</span>
                <span>
                  <select
                    value={romPaletteMode}
                    onChange={(e) =>
                      setRomPaletteMode(
                        e.target.value === 'unused' ? 'unused' : 'nearest'
                      )
                    }
                  >
                    <option value="nearest">Map to nearest existing colors</option>
                    <option value="unused">Import into unused palette slots</option>
                  </select>
                </span>
              </div>
              <div className="modal__row">
                <span>Pick region</span>
                <span className="rom-import__grid">
                  <div className="rom-import__selection">
                    <canvas
                      ref={romCanvasRef}
                      className="rom-import__canvas"
                      onPointerDown={(event) => {
                        event.preventDefault();
                        const canvas = romCanvasRef.current;
                        if (!canvas) {
                          return;
                        }
                        canvas.setPointerCapture?.(event.pointerId);
                        const rect = canvas.getBoundingClientRect();
                        const pixelX = Math.floor(
                          ((event.clientX - rect.left) / rect.width) * canvas.width
                        );
                        const pixelY = Math.floor(
                          ((event.clientY - rect.top) / rect.height) * canvas.height
                        );
                        const rawTileX = Math.floor(pixelX / (ROM_TILE_SIZE * romDisplayScale));
                        const rawTileY =
                          romPageStartTileY +
                          Math.floor(pixelY / (ROM_TILE_SIZE * romDisplayScale));
                        const tileX = Math.trunc(clamp(rawTileX, 0, romTilesAcross - 1));
                        const tileY = Math.trunc(clamp(rawTileY, 0, romTilesDown - 1));
                        romDragRef.current = {
                          startTileX: tileX,
                          startTileY: tileY,
                          pointerId: event.pointerId,
                        };
                        const additive = event.ctrlKey || event.metaKey;
                        const nextRect = { x: tileX, y: tileY, width: 1, height: 1 };
                        setRomSelections((prev) =>
                          additive ? [...prev, nextRect] : [nextRect]
                        );
                      }}
                      onPointerMove={(event) => {
                        const canvas = romCanvasRef.current;
                        const start = romDragRef.current;
                        if (!canvas || !start || !romPayload) {
                          return;
                        }
                        if (start.pointerId !== event.pointerId) {
                          return;
                        }
                        const rect = canvas.getBoundingClientRect();
                        const pixelX = Math.floor(
                          ((event.clientX - rect.left) / rect.width) * canvas.width
                        );
                        const pixelY = Math.floor(
                          ((event.clientY - rect.top) / rect.height) * canvas.height
                        );
                        const tileX = Math.floor(pixelX / (ROM_TILE_SIZE * romDisplayScale));
                        const tileY =
                          romPageStartTileY +
                          Math.floor(pixelY / (ROM_TILE_SIZE * romDisplayScale));
                        const minX = Math.min(start.startTileX, tileX);
                        const minY = Math.min(start.startTileY, tileY);
                        const maxX = Math.max(start.startTileX, tileX);
                        const maxY = Math.max(start.startTileY, tileY);
                        setRomSelections((prev) => {
                          if (prev.length === 0) {
                            return prev;
                          }
                          const next = prev.slice();
                          next[next.length - 1] = clampRect(
                            {
                              x: minX,
                              y: minY,
                              width: maxX - minX + 1,
                              height: maxY - minY + 1,
                            },
                            romTilesAcross,
                            romTilesDown
                          );
                          return next;
                        });
                      }}
                      onPointerUp={(event) => {
                        const canvas = romCanvasRef.current;
                        if (canvas) {
                          canvas.releasePointerCapture?.(event.pointerId);
                        }
                        romDragRef.current = null;
                      }}
                      onPointerLeave={(event) => {
                        const canvas = romCanvasRef.current;
                        if (canvas) {
                          canvas.releasePointerCapture?.(event.pointerId);
                        }
                        romDragRef.current = null;
                      }}
                    />
                  </div>
                  <div className="rom-import__preview">
                    <canvas
                      ref={romPreviewRef}
                      className="rom-import__canvas"
                    />
                  </div>
                </span>
              </div>
              <div className="modal__row">
                <span />
                <button type="button" onClick={sendRomSelectionsToStamp}>
                  Send to Stamp Tool
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {mergeModalOpen && mergePayload && (
        <div className="modal">
          <div
            className="modal__backdrop"
            onClick={() => {
              setMergeModalOpen(false);
              setMergePayload(null);
              setMergeSourcePath(null);
            }}
          />
          <div className="modal__content" role="dialog" aria-modal="true">
            <div className="modal__header">
              <h2>Merge Project</h2>
              <button
                type="button"
                onClick={() => {
                  setMergeModalOpen(false);
                  setMergePayload(null);
                  setMergeSourcePath(null);
                }}
              >
                Close
              </button>
            </div>
            <div className="modal__body">
              <div className="modal__row">
                <span>Source</span>
                <span>{mergeSourcePath ?? '(unknown)'}</span>
              </div>
              <div className="modal__row">
                <span>Offset X</span>
                <input
                  type="number"
                  value={mergeOffsetX}
                  onChange={(e) => setMergeOffsetX(Number(e.target.value))}
                />
              </div>
              <div className="modal__row">
                <span>Offset Y</span>
                <input
                  type="number"
                  value={mergeOffsetY}
                  onChange={(e) => setMergeOffsetY(Number(e.target.value))}
                />
              </div>
              <div className="modal__row">
                <span />
                <button
                  type="button"
                  onClick={() => {
                    mergeProjectPixels(mergePayload, {
                      offsetX: mergeOffsetX,
                      offsetY: mergeOffsetY,
                    });
                    setMergeModalOpen(false);
                    setMergePayload(null);
                    setMergeSourcePath(null);
                  }}
                >
                  Merge Pixels
                </button>
              </div>
              <div className="modal__row">
                <span />
                <span style={{ opacity: 0.8 }}>
                  Current merge supports pixels only and requires identical palettes.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {showShortcuts && (
        <div className="modal">
          <div className="modal__backdrop" onClick={() => setShowShortcuts(false)} />
          <div className="modal__content" role="dialog" aria-modal="true">
            <div className="modal__header">
              <h2>Shortcut Map & Hotkeys</h2>
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
                <span style={{ opacity: 0.8 }}>Tool hotkeys</span>
                <span style={{ opacity: 0.8 }}>Global</span>
              </div>
              <div className="modal__row">
                <span>Palette primary color 0–9</span>
                <span>0–9</span>
              </div>
              <div className="modal__row">
                <span>Pen / Rectangle / Oval</span>
                <span>P / R / O</span>
              </div>
              <div className="modal__row">
                <span>Spray / Line / Fill / Text</span>
                <span>S / L / F / T</span>
              </div>
              <div className="modal__row">
                <span>Eyedropper / Magic Wand</span>
                <span>E / W</span>
              </div>
              <div className="modal__row">
                <span>Stamp / Reference Handle / Scroll Selection</span>
                <span>V / H / Q</span>
              </div>
              <div className="modal__row">
                <span>Select Oval / Rectangle / Lasso</span>
                <span>Alt+O / Alt+R / Alt+P</span>
              </div>
              <div className="modal__row">
                <span>Tile tools</span>
                <span>Shift+S / Shift+P / Shift+R / Shift+N / Shift+E</span>
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
      {showOptions && (
        <OptionsModal
          onClose={() => {
            setShowOptions(false);
          }}
        />
      )}
      {textModalOpen && activeTool === 'text' && (
        <TextToolModal
          initialText={textToolDraft}
          initialFontFamily={textToolFontFamily}
          initialFontSize={textToolFontSize}
          onCancel={() => {
            setTextModalOpen(false);
            setActiveTool(textModalReturnTool);
          }}
          onConfirm={({ text, fontFamily, fontSize }) => {
            setTextToolDraft(text);
            setTextToolFontFamily(fontFamily);
            setTextToolFontSize(fontSize);
            copyTextToClipboard({
              text,
              fontFamily,
              fontSize,
              paletteIndex: activePaletteIndex,
            });
            setTextModalOpen(false);
          }}
        />
      )}
      {aiModalOpen && activeTool === 'ai' && (
        <AiPromptModal
          initialPrompt={aiPromptDraft}
          onCancel={() => {
            setAiModalOpen(false);
            setActiveTool(aiModalReturnTool);
          }}
          onConfirm={({ prompt }) => {
            setAiPromptDraft(prompt);
            setAiModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
