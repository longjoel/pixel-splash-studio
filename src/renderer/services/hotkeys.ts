import type { ToolId } from '@/state/toolStore';

export type GlobalHotkeyEvent = {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
};

export type GlobalHotkeyAction =
  | { type: 'tool'; tool: ToolId }
  | { type: 'palette-primary'; index: number };

export const getGlobalHotkeyAction = (
  event: GlobalHotkeyEvent
): GlobalHotkeyAction | null => {
  const isCommand = event.ctrlKey || event.metaKey;
  if (isCommand) {
    return null;
  }

  const key = event.key.toLowerCase();

  if (event.altKey) {
    if (key === 'o') {
      return { type: 'tool', tool: 'selection-oval' };
    }
    if (key === 'r') {
      return { type: 'tool', tool: 'selection-rect' };
    }
    if (key === 'p') {
      return { type: 'tool', tool: 'selection-lasso' };
    }
    return null;
  }

  if (event.shiftKey) {
    if (key === 's') {
      return { type: 'tool', tool: 'tile-sampler' };
    }
    if (key === 'p') {
      return { type: 'tool', tool: 'tile-pen' };
    }
    if (key === 'r') {
      return { type: 'tool', tool: 'tile-rectangle' };
    }
    if (key === 'n') {
      return { type: 'tool', tool: 'tile-9slice' };
    }
    if (key === 'e') {
      return { type: 'tool', tool: 'tile-export' };
    }
  }

  if (key.length === 1 && key >= '0' && key <= '9') {
    return { type: 'palette-primary', index: Number(key) };
  }

  if (key === 'p') {
    return { type: 'tool', tool: 'pen' };
  }
  if (key === 'r') {
    return { type: 'tool', tool: 'rectangle' };
  }
  if (key === 'o') {
    return { type: 'tool', tool: 'oval' };
  }
  if (key === 's') {
    return { type: 'tool', tool: 'spray' };
  }
  if (key === 'l') {
    return { type: 'tool', tool: 'line' };
  }
  if (key === 'f') {
    return { type: 'tool', tool: 'fill-bucket' };
  }
  if (key === 't') {
    return { type: 'tool', tool: 'text' };
  }
  if (key === 'e') {
    return { type: 'tool', tool: 'eyedropper' };
  }
  if (key === 'w') {
    return { type: 'tool', tool: 'magic-wand' };
  }
  if (key === 'v') {
    return { type: 'tool', tool: 'stamp' };
  }
  if (key === 'h') {
    return { type: 'tool', tool: 'reference-handle' };
  }
  if (key === 'q') {
    return { type: 'tool', tool: 'texture-roll' };
  }

  return null;
};
