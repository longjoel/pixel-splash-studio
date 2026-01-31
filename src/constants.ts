export const DEFAULT_VIEWPORT_SIZE = {
  width: 0,
  height: 0,
};

export const DEFAULT_CAMERA = {
  x: 0,
  y: 0,
  zoom: 1,
};

export const CAMERA_ZOOM_MIN = 0.02;
export const CAMERA_ZOOM_MAX = 16;
export const MIN_TOOL_ZOOM = 0.2;
export const WHEEL_ZOOM_SCALE = 0.002;
export const WHEEL_ZOOM_MAX_STEP = 0.6;

export const PIXEL_SIZE = 12;
export const TILE_SIZE = 8;
export const BLOCK_SIZE = 64;
export const MIN_WORLD_SIZE = 512 * PIXEL_SIZE;

export const REFERENCE_CORNERS = ['nw', 'ne', 'se', 'sw'] as const;
export const REFERENCE_ROTATION_MIN = -180;
export const REFERENCE_ROTATION_MAX = 180;
export const REFERENCE_SCALE_MIN = 0.01;
export const REFERENCE_SCALE_MAX = 5;
export const REFERENCE_OPACITY_MIN = 0;
export const REFERENCE_OPACITY_MAX = 1;
export const HANDLE_SIZE = PIXEL_SIZE * 0.9;
export const HANDLE_HALF = HANDLE_SIZE / 2;

export const TRACE_ALPHA_THRESHOLD = 16;
export const TRACE_COLOR_BUCKET_STEP = 8;
export const TRACE_DEFAULT_MAX_COLORS = 8;
export const TRACE_MAX_COLORS_MIN = 1;
export const TRACE_MAX_COLORS_MAX = 64;
export const TRACE_CANVAS_MAX_DIMENSION = 4096;
export const TRACE_CANVAS_MAX_PIXELS = 4_000_000;
export const TRACE_CANVAS_OVERRIDE_STORAGE_KEY = 'pss.traceCanvasOversize';

export const BYTES_PER_NUMBER = 8;
export const PIXEL_RECORD_BYTES = BYTES_PER_NUMBER * 3;
export const HISTORY_CHANGE_BYTES = BYTES_PER_NUMBER * 4;
export const MEMORY_SAMPLE_INTERVAL = 1000;

export const MIME_EXTENSION_MAP: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/bmp': 'bmp',
  'image/pcx': 'pcx',
  'image/x-pcx': 'pcx',
  'image/tga': 'tga',
  'image/x-tga': 'tga',
};

export const EXTENSION_MIME_MAP: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  bmp: 'image/bmp',
  pcx: 'image/x-pcx',
  tga: 'image/x-tga',
};

export const DEFAULT_COLORS = [
  '#000000', '#1a1a1a', '#3a3a3a', '#5a5a5a', '#7a7a7a', '#9a9a9a', '#bababa', '#ffffff',
  '#3b1f0f', '#5c2c14', '#8a3c1d', '#b45626', '#e07a3c', '#f6a04d', '#f8c17a', '#fbe4b3',
  '#1b2f5b', '#26407a', '#3657a6', '#4a6fd6', '#5f8bff', '#7aa5ff', '#9cc0ff', '#c5ddff',
  '#0f3b2a', '#165238', '#1f6d49', '#2d8c5e', '#3ab073', '#5fd790', '#8df0b2', '#c6f8dd',
  '#4a0f5b', '#651478', '#8a1aa6', '#b424d6', '#d64aff', '#e679ff', '#f0a6ff', '#f8d2ff',
  '#5b0f1f', '#7a1429', '#a61a37', '#d6244a', '#ff4a64', '#ff7a8a', '#ff9caa', '#ffd1d8',
];

export const TOOL_LABELS = {
  pen: 'Pen',
  spray: 'Spray',
  line: 'Line',
  rectangle: 'Rectangle',
  oval: 'Oval',
  'fill-bucket': 'Fill',
  text: 'Text',
  eyedropper: 'Eyedropper',
  'reference-handle': 'Reference',
  stamp: 'Stamp',
  'selection-rect': 'Select',
  'selection-oval': 'Select Oval',
  'selection-lasso': 'Lasso',
  'texture-roll': 'Scroll',
  'tile-sampler': 'Tile Sampler',
  'tile-pen': 'Tile Pen',
  'tile-rectangle': 'Tile Rectangle',
  'tile-9slice': 'Tile 9-Slice',
  'tile-export': 'Tile Export',
};

export const E2E_BACKGROUND_COLOR = [20, 24, 36, 255];
export const E2E_PEN_COLOR = [255, 74, 100, 255];
export const E2E_REFERENCE_COLOR = [236, 190, 82, 255];
