import { describe, expect, it } from 'vitest';
import { getGlobalHotkeyAction } from '@/services/hotkeys';

describe('getGlobalHotkeyAction', () => {
  it('maps number keys 0-9 to palette primary indices', () => {
    expect(
      getGlobalHotkeyAction({
        key: '0',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'palette-primary', index: 0 });
    expect(
      getGlobalHotkeyAction({
        key: '9',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'palette-primary', index: 9 });
  });

  it('maps tool hotkeys', () => {
    expect(
      getGlobalHotkeyAction({
        key: 'p',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'tool', tool: 'pen' });
    expect(
      getGlobalHotkeyAction({
        key: 'f',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'tool', tool: 'fill-bucket' });
    expect(
      getGlobalHotkeyAction({
        key: 't',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'tool', tool: 'text' });
    expect(
      getGlobalHotkeyAction({
        key: 'e',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'tool', tool: 'eyedropper' });
    expect(
      getGlobalHotkeyAction({
        key: 'w',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'tool', tool: 'magic-wand' });
    expect(
      getGlobalHotkeyAction({
        key: 'v',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'tool', tool: 'stamp' });
    expect(
      getGlobalHotkeyAction({
        key: 'h',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'tool', tool: 'reference-handle' });
    expect(
      getGlobalHotkeyAction({
        key: 'q',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'tool', tool: 'texture-roll' });
  });

  it('maps alt+o/r/p to selection tools', () => {
    expect(
      getGlobalHotkeyAction({
        key: 'o',
        altKey: true,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'tool', tool: 'selection-oval' });
    expect(
      getGlobalHotkeyAction({
        key: 'r',
        altKey: true,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'tool', tool: 'selection-rect' });
    expect(
      getGlobalHotkeyAction({
        key: 'p',
        altKey: true,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      })
    ).toEqual({ type: 'tool', tool: 'selection-lasso' });
  });

  it('maps shift+S/P/R/N/E to tile tools', () => {
    expect(
      getGlobalHotkeyAction({
        key: 'S',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: true,
      })
    ).toEqual({ type: 'tool', tool: 'tile-sampler' });
    expect(
      getGlobalHotkeyAction({
        key: 'P',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: true,
      })
    ).toEqual({ type: 'tool', tool: 'tile-pen' });
    expect(
      getGlobalHotkeyAction({
        key: 'R',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: true,
      })
    ).toEqual({ type: 'tool', tool: 'tile-rectangle' });
    expect(
      getGlobalHotkeyAction({
        key: 'N',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: true,
      })
    ).toEqual({ type: 'tool', tool: 'tile-9slice' });
    expect(
      getGlobalHotkeyAction({
        key: 'E',
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: true,
      })
    ).toEqual({ type: 'tool', tool: 'tile-export' });
  });

  it('ignores ctrl/cmd combos (reserved for app shortcuts)', () => {
    expect(
      getGlobalHotkeyAction({
        key: 'p',
        altKey: false,
        ctrlKey: true,
        metaKey: false,
        shiftKey: false,
      })
    ).toBeNull();
    expect(
      getGlobalHotkeyAction({
        key: '1',
        altKey: false,
        ctrlKey: false,
        metaKey: true,
        shiftKey: false,
      })
    ).toBeNull();
  });
});
