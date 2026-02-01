import React from 'react';

export const TOOL_ICONS: Record<string, React.ReactNode> = {
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
};

