import React from 'react';

export const TOOL_ICONS: Record<string, React.ReactNode> = {
  undo: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 7H5v4" />
      <path d="M5 11c2.2-3.4 6.1-5.5 10.2-5.5 4.8 0 8.8 3 9.8 7.3" />
      <path d="M5 11l4-4" />
    </svg>
  ),
  redo: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M15 7h4v4" />
      <path d="M19 11c-2.2-3.4-6.1-5.5-10.2-5.5-4.8 0-8.8 3-9.8 7.3" />
      <path d="M19 11l-4-4" />
    </svg>
  ),
  cut: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <path d="M8 8l12 8" />
      <path d="M8 16l6-4" />
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="6" y="6" width="10" height="10" rx="1.6" />
      <rect x="9" y="9" width="10" height="10" rx="1.6" />
    </svg>
  ),
  'copy-deep': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="7" width="9" height="9" rx="1.4" />
      <rect x="10" y="9" width="9" height="9" rx="1.4" />
      <path d="M17 5v4" />
      <path d="M15 7h4" />
    </svg>
  ),
  paste: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="6" y="7" width="12" height="13" rx="1.6" />
      <path d="M9 4h6v3H9z" />
      <path d="M9 11h6" />
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 20l4-1 12-12-3-3L5 16l-1 4z" />
      <path d="M13.5 5.5l3 3" />
      <path d="M7 17l2 2" />
    </svg>
  ),
  spray: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 10h7l2 2v3H9z" />
      <path d="M7 12h2" />
      <path d="M18 12h1" />
      <path d="M12.5 6v4" />
      <path d="M9.5 16.2l-1 1" />
      <path d="M12 17.2l-.6 1.2" />
      <path d="M14.6 16.6l1 1" />
      <path d="M16 18l.8.8" />
    </svg>
  ),
  line: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 18L18 6" />
      <path d="M6 18h0" />
      <path d="M18 6h0" />
    </svg>
  ),
  rectangle: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="6" width="14" height="12" rx="1.5" />
    </svg>
  ),
  oval: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <ellipse cx="12" cy="12" rx="7" ry="5.5" />
    </svg>
  ),
  'fill-bucket': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6.5 11.5l8-8 3 3-8 8H6.5z" />
      <path d="M6.8 15.5h6.4" />
      <path d="M18 14.5c0 1-1 2-2 2s-2-1-2-2 2-3 2-3 2 2 2 3z" />
    </svg>
  ),
  text: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 6h12" />
      <path d="M12 6v12" />
      <path d="M9 18h6" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 3l1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3z" />
      <path d="M18 12l.9 2.8L22 16l-3.1 1.2L18 20l-.9-2.8L14 16l3.1-1.2L18 12z" />
      <path d="M4 13l.8 2.4L7.5 16l-2.7 1L4 19.4l-.8-2.4L0.5 16l2.7-.6L4 13z" />
    </svg>
  ),
  'reference-handle': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
      <path d="M7.5 7.5h0" />
      <path d="M16.5 7.5h0" />
      <path d="M7.5 16.5h0" />
      <path d="M16.5 16.5h0" />
    </svg>
  ),
  eyedropper: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M14.5 5.5l4 4" />
      <path d="M6 19l8.2-8.2a2.2 2.2 0 000-3.1l-.9-.9a2.2 2.2 0 00-3.1 0L2 15.9V19h4z" />
      <path d="M9.5 9.5l5 5" />
    </svg>
  ),
  stamp: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 15h10v4H7z" />
      <path d="M9 15v-4a3 3 0 016 0v4" />
      <path d="M8 15h8" />
    </svg>
  ),
  'selection-rect': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="14" height="14" rx="1.5" strokeDasharray="2 2" />
      <path d="M8 8h0" />
      <path d="M16 16h0" />
    </svg>
  ),
  'selection-oval': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <ellipse cx="12" cy="12" rx="7" ry="5.5" strokeDasharray="2 2" />
      <path d="M9 9h0" />
      <path d="M15 15h0" />
    </svg>
  ),
  'magic-wand': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 20l9-9" />
      <path d="M12.5 12.5l7.5 7.5" />
      <path d="M17 4l.6 1.7L19 6l-1.4.3L17 8l-.6-1.7L15 6l1.4-.3L17 4z" />
      <path d="M14 8l.4 1.1L15.5 9l-1.1.2L14 10.3l-.4-1.1L12.5 9l1.1-.2L14 8z" />
    </svg>
  ),
  'selection-lasso': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 5c-4.5 0-8 2.1-8 4.8S7.5 14.6 12 14.6 20 12.5 20 9.8 16.5 5 12 5z" />
      <path d="M8.2 14.6l-2 4.9" />
      <path d="M6.2 19.5l2.6-1.2" />
    </svg>
  ),
  'texture-roll': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
    </svg>
  ),
  'tile-sampler': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 5h6v6H5z" />
      <path d="M13 5h6v6h-6z" />
      <path d="M5 13h6v6H5z" />
      <path d="M13 13h6v6h-6z" />
      <path d="M14.2 14.2l4.8 4.8" />
    </svg>
  ),
  'tile-pen': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 5h8v8H5z" />
      <path d="M12 12l8-8" />
      <path d="M14.2 6.2l3.6 3.6" />
    </svg>
  ),
  'tile-rectangle': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="14" height="14" rx="1.5" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h8" />
    </svg>
  ),
  'tile-9slice': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <path d="M10 6v12" />
      <path d="M14 6v12" />
      <path d="M6 10h12" />
      <path d="M6 14h12" />
    </svg>
  ),
  'tile-export': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="6" y="7" width="12" height="11" rx="1.5" />
      <path d="M12 4v8" />
      <path d="M9.5 6.5L12 4l2.5 2.5" />
    </svg>
  ),
  export: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 4v10" />
      <path d="M8 10l4 4 4-4" />
      <rect x="5" y="18" width="14" height="2" rx="1" />
    </svg>
  ),
  clear: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M8 8l8 8" />
      <path d="M16 8l-8 8" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 4l8 4-8 4-8-4 8-4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 16l8 4 8-4" />
    </svg>
  ),
  overlays: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="14" height="14" rx="1.8" />
      <path d="M12 5v14" />
      <path d="M5 12h14" />
      <path d="M8 8h0" />
      <path d="M16 16h0" />
    </svg>
  ),
  swatch: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4.5" y="6.5" width="15" height="11" rx="2" />
      <path d="M8 6.5v11" />
      <path d="M12 6.5v11" />
      <path d="M16 6.5v11" />
    </svg>
  ),
  fullscreen: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 9V4h5" />
      <path d="M20 9V4h-5" />
      <path d="M4 15v5h5" />
      <path d="M20 15v5h-5" />
    </svg>
  ),
};
