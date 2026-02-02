import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePaletteStore } from '@/state/paletteStore';
import { useProjectStore } from '@/state/projectStore';
import { hexToRgb, mix, type Rgb } from '@/core/colorUtils';
import { consolidatePalette } from '@/services/paletteConsolidate';
import DropdownSelect from './DropdownSelect';

type MenuState = {
  open: boolean;
  x: number;
  y: number;
  index: number | null;
};

type Hsl = { h: number; s: number; l: number };

const isValidHex = (value: string) => /^#[0-9a-f]{6}$/i.test(value);

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const wrapHue = (value: number) => ((value % 360) + 360) % 360;

const toHex = (value: number) => value.toString(16).padStart(2, '0');

const rgbToHex = (rgb: Rgb) => `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;

const rgbToHsl = (rgb: Rgb): Hsl => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h *= 60;
  }
  if (h < 0) {
    h += 360;
  }
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  return { h, s, l };
};

const hslToRgb = (hsl: Hsl): Rgb => {
  const h = wrapHue(hsl.h);
  const s = clamp01(hsl.s);
  const l = clamp01(hsl.l);
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

const dedupeColors = (colors: string[]) => {
  const seen = new Set<string>();
  return colors.filter((color) => {
    const normalized = color.toLowerCase();
    if (seen.has(normalized)) {
      return false;
    }
    seen.add(normalized);
    return true;
  });
};

const buildSwatchPresets = (baseHex: string) => {
  const baseRgb = hexToRgb(baseHex) ?? { r: 255, g: 255, b: 255 };
  const black: Rgb = { r: 0, g: 0, b: 0 };
  const white: Rgb = { r: 255, g: 255, b: 255 };
  const baseHsl = rgbToHsl(baseRgb);
  const makeHslAbsolute = (hOffset: number, s: number, l: number) =>
    rgbToHex(
      hslToRgb({
        h: wrapHue(baseHsl.h + hOffset),
        s: clamp01(s),
        l: clamp01(l),
      })
    );
  const makeHsl = (hOffset: number, sOffset = 0, lOffset = 0) =>
    makeHslAbsolute(hOffset, baseHsl.s + sOffset, baseHsl.l + lOffset);

  const complementary = dedupeColors([
    makeHsl(0, 0, 0.12),
    makeHsl(0, 0, -0.12),
    makeHsl(180, 0, 0),
    makeHsl(180, 0, 0.12),
    makeHsl(180, 0, -0.12),
  ]);

  const analogous = dedupeColors([
    makeHsl(-40),
    makeHsl(-20),
    makeHsl(0),
    makeHsl(20),
    makeHsl(40),
  ]);

  const splitComplementary = dedupeColors([
    makeHsl(0),
    makeHsl(150),
    makeHsl(210),
    makeHsl(150, 0, 0.12),
    makeHsl(210, 0, -0.12),
  ]);

  const triad = dedupeColors([
    makeHsl(0),
    makeHsl(120),
    makeHsl(240),
    makeHsl(120, 0, 0.12),
    makeHsl(240, 0, -0.12),
  ]);

  const tetrad = dedupeColors([
    makeHsl(0),
    makeHsl(90),
    makeHsl(180),
    makeHsl(270),
  ]);

  const tintsShades = dedupeColors([
    rgbToHex(mix(baseRgb, black, 0.7)),
    rgbToHex(mix(baseRgb, black, 0.5)),
    rgbToHex(mix(baseRgb, black, 0.3)),
    rgbToHex(mix(baseRgb, white, 0.25)),
    rgbToHex(mix(baseRgb, white, 0.5)),
  ]);

  const pastelS = clamp01(baseHsl.s * 0.45 + 0.15);
  const pastelL = clamp01(baseHsl.l * 0.4 + 0.6);
  const pastel = dedupeColors([
    makeHslAbsolute(-25, pastelS, clamp01(pastelL + 0.05)),
    makeHslAbsolute(-10, pastelS, clamp01(pastelL + 0.02)),
    makeHslAbsolute(0, pastelS, pastelL),
    makeHslAbsolute(10, pastelS, clamp01(pastelL - 0.03)),
    makeHslAbsolute(25, pastelS, clamp01(pastelL - 0.06)),
  ]);

  const mutedS = clamp01(baseHsl.s * 0.35 + 0.12);
  const mutedL = clamp01(baseHsl.l * 0.8 + 0.1);
  const muted = dedupeColors([
    makeHslAbsolute(-30, mutedS, clamp01(mutedL - 0.08)),
    makeHslAbsolute(-15, mutedS, mutedL),
    makeHslAbsolute(0, mutedS, clamp01(mutedL + 0.05)),
    makeHslAbsolute(15, mutedS, clamp01(mutedL - 0.03)),
    makeHslAbsolute(30, mutedS, clamp01(mutedL + 0.08)),
  ]);

  const vibrantS = clamp01(Math.max(0.7, baseHsl.s * 1.25));
  const vibrantL = clamp01(baseHsl.l * 0.85 + 0.06);
  const vibrant = dedupeColors([
    makeHslAbsolute(-20, vibrantS, clamp01(vibrantL - 0.08)),
    makeHslAbsolute(-10, vibrantS, vibrantL),
    makeHslAbsolute(0, vibrantS, clamp01(vibrantL + 0.04)),
    makeHslAbsolute(15, vibrantS, clamp01(vibrantL - 0.04)),
    makeHslAbsolute(30, vibrantS, clamp01(vibrantL + 0.08)),
  ]);

  const monoS = clamp01(baseHsl.s * 0.9 + 0.05);
  const monochrome = dedupeColors([
    makeHslAbsolute(0, monoS, 0.14),
    makeHslAbsolute(0, monoS, 0.3),
    makeHslAbsolute(0, monoS, 0.5),
    makeHslAbsolute(0, monoS, 0.7),
    makeHslAbsolute(0, monoS, 0.86),
  ]);

  const hueSweep = dedupeColors([
    makeHslAbsolute(0, baseHsl.s, clamp01(baseHsl.l - 0.06)),
    makeHslAbsolute(45, baseHsl.s, baseHsl.l),
    makeHslAbsolute(90, baseHsl.s, clamp01(baseHsl.l + 0.05)),
    makeHslAbsolute(135, baseHsl.s, baseHsl.l),
    makeHslAbsolute(180, baseHsl.s, clamp01(baseHsl.l - 0.04)),
  ]);

  return [
    { id: 'complementary', label: 'Complementary', colors: complementary },
    { id: 'analogous', label: 'Analogous', colors: analogous },
    { id: 'split', label: 'Split Complementary', colors: splitComplementary },
    { id: 'triad', label: 'Triad', colors: triad },
    { id: 'tetrad', label: 'Tetrad', colors: tetrad },
    { id: 'tints', label: 'Tints + Shades', colors: tintsShades },
    { id: 'pastel', label: 'Pastel', colors: pastel },
    { id: 'muted', label: 'Muted', colors: muted },
    { id: 'vibrant', label: 'Vibrant', colors: vibrant },
    { id: 'mono', label: 'Monochrome Ramp', colors: monochrome },
    { id: 'hue-sweep', label: 'Hue Sweep', colors: hueSweep },
  ];
};

const openColorPicker = (initial: string, onPick: (value: string) => void) => {
  const input = document.createElement('input');
  input.type = 'color';
  input.value = isValidHex(initial) ? initial : '#ffffff';
  input.style.position = 'fixed';
  input.style.left = '-1000px';
  input.style.opacity = '0';
  input.setAttribute('aria-hidden', 'true');
  let lastValue = input.value;
  const removePicker = () => {
    if (input.isConnected) {
      input.remove();
    }
    window.removeEventListener('focus', removePicker);
  };
  input.addEventListener('input', () => {
    lastValue = input.value;
    onPick(input.value);
  });
  input.addEventListener('change', () => {
    if (input.value !== lastValue) {
      onPick(input.value);
    }
    removePicker();
  });
  window.addEventListener('focus', removePicker);
  document.body.appendChild(input);
  input.click();
};

const PaletteBar = () => {
  const colors = usePaletteStore((state) => state.colors);
  const selectedIndices = usePaletteStore((state) => state.selectedIndices);
  const setColor = usePaletteStore((state) => state.setColor);
  const setPalette = usePaletteStore((state) => state.setPalette);
  const setSelectedIndices = usePaletteStore((state) => state.setSelectedIndices);
  const activeIndex = usePaletteStore((state) => state.getActiveIndex());
  const addColor = usePaletteStore((state) => state.addColor);
  const removeColor = usePaletteStore((state) => state.removeColor);

  const ensureActiveLast = (indices: number[], active: number) => {
    const next = indices.filter((idx) => idx !== active);
    next.push(active);
    return next;
  };

  const [menu, setMenu] = useState<MenuState>({
    open: false,
    x: 0,
    y: 0,
    index: null,
  });
  const [swatchPresetChoice, setSwatchPresetChoice] = useState('none');
  const [menuActionChoice, setMenuActionChoice] = useState('none');
  const [lospecOpen, setLospecOpen] = useState(false);
  const [lospecUrl, setLospecUrl] = useState('');
  const [lospecBusy, setLospecBusy] = useState(false);
  const [lospecError, setLospecError] = useState<string | null>(null);
  const [maxRows, setMaxRows] = useState<number>(() => {
    try {
      const stored = window.localStorage.getItem('pss.paletteRows');
      const parsed = stored ? Number(stored) : 3;
      const normalized = Number.isFinite(parsed) ? Math.floor(parsed) : 3;
      return Math.min(4, Math.max(2, normalized));
    } catch {
      return 3;
    }
  });
  const lastSelectedRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const selectingRef = useRef(false);
  const selectionAnchorRef = useRef<number | null>(null);
  const didDragRef = useRef(false);
  const dragBaseSelectionRef = useRef<Set<number>>(new Set());
  const dragAdditiveRef = useRef(false);
  const isMac = React.useMemo(
    () => typeof navigator !== 'undefined' && navigator.platform.toLowerCase().includes('mac'),
    []
  );

  const closeMenu = () => {
    setMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
  };

  const openMenu = (event: React.MouseEvent, index: number | null) => {
    event.preventDefault();
    if (typeof index === 'number') {
      const selection = new Set(selectedIndices);
      if (!selection.has(index)) {
        setSelectedIndices([index]);
      }
      lastSelectedRef.current = index;
    }
    setMenu({
      open: true,
      x: event.clientX,
      y: event.clientY,
      index,
    });
  };

  useEffect(() => {
    if (!menu.open) {
      return;
    }
    const handlePointerDown = (event: MouseEvent) => {
      const targetEl = event.target as HTMLElement | null;
      if (targetEl?.closest?.('.dropdown-select__menu')) {
        return;
      }
      if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        return;
      }
      closeMenu();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menu.open]);

  useLayoutEffect(() => {
    if (!menu.open || !menuRef.current) {
      return;
    }
    const rect = menuRef.current.getBoundingClientRect();
    const padding = 8;
    const maxX = Math.max(padding, window.innerWidth - rect.width - padding);
    const maxY = Math.max(padding, window.innerHeight - rect.height - padding);
    const nextX = Math.min(Math.max(padding, menu.x), maxX);
    const nextY = Math.min(Math.max(padding, menu.y), maxY);
    if (nextX !== menu.x || nextY !== menu.y) {
      setMenu((prev) => ({ ...prev, x: nextX, y: nextY }));
    }
  }, [menu.open, menu.x, menu.y]);

  const canSetColor =
    menu.index !== null && menu.index >= 0 && menu.index < colors.length;
  const canRemoveColor = canSetColor && colors.length > 1;
  const selectedColor = canSetColor ? colors[menu.index] : '#ffffff';
  const baseSwatchColor =
    menu.index !== null && menu.index >= 0 && menu.index < colors.length
      ? colors[menu.index]
      : colors[selectedIndices[selectedIndices.length - 1] ?? 0] ?? '#ffffff';
  const swatchPresets = buildSwatchPresets(baseSwatchColor);
  const hasDuplicates =
    new Set(colors.map((color) => color.trim().toLowerCase())).size !== colors.length;

  const handleSetColor = () => {
    if (!canSetColor || menu.index === null) {
      return;
    }
    closeMenu();
    openColorPicker(selectedColor, (value) => {
      setColor(menu.index ?? 0, value);
    });
  };

  const handleRemoveColor = () => {
    if (!canRemoveColor || menu.index === null) {
      return;
    }
    removeColor(menu.index);
    closeMenu();
  };

  const handleAddColor = () => {
    closeMenu();
    openColorPicker('#ffffff', (value) => {
      addColor(value);
    });
  };

  const selectionSet = new Set(selectedIndices);
  const orderedSelection = [...selectionSet].sort((a, b) => a - b);
  const selectionCount = orderedSelection.length;
  const canEditSelection = selectionCount > 0;
  const canCycleSelection = selectionCount > 1;
  const canDeleteSelection = colors.length - selectionCount >= 1;

  const setSelection = (indices: number[]) => {
    setSelectedIndices(indices);
  };

  const clampSelectionToPalette = () => {
    if (selectedIndices.length === 0) {
      return;
    }
    const clamped = selectedIndices.filter((idx) => idx >= 0 && idx < colors.length);
    if (clamped.length !== selectedIndices.length) {
      setSelectedIndices(clamped);
    }
  };

  useEffect(clampSelectionToPalette, [colors.length, selectedIndices, setSelectedIndices]);

  const handleClearSelected = () => {
    if (!canEditSelection) {
      return;
    }
    const nextColors = [...colors];
    const clearColor = colors[0] ?? '#000000';
    for (const index of orderedSelection) {
      nextColors[index] = clearColor;
    }
    setPalette(nextColors);
    closeMenu();
  };

  const handleEditSelected = () => {
    if (!canEditSelection) {
      return;
    }
    const startIndex = orderedSelection[0] ?? 0;
    const initial = colors[startIndex] ?? '#ffffff';
    closeMenu();
    openColorPicker(initial, (value) => {
      const nextColors = [...colors];
      for (const index of orderedSelection) {
        nextColors[index] = value;
      }
      setPalette(nextColors);
    });
  };

  const handleDeleteSelected = () => {
    if (!canEditSelection || !canDeleteSelection) {
      return;
    }
    const toDelete = new Set(orderedSelection);
    const nextColors = colors.filter((_color, index) => !toDelete.has(index));
    if (nextColors.length === 0) {
      return;
    }
    const adjustIndex = (value: number) => {
      let next = value;
      for (const index of orderedSelection) {
        if (index < value) {
          next -= 1;
        }
      }
      if (toDelete.has(value)) {
        next = Math.min(next, nextColors.length - 1);
      }
      return Math.max(0, Math.min(next, nextColors.length - 1));
    };
    setPalette(nextColors);
    closeMenu();
  };

  const handleCycleSelected = () => {
    if (!canCycleSelection) {
      return;
    }
    const columns = layout.columns;
    const ordered = [...selectionSet].sort((a, b) => {
      const aRow = Math.floor(a / columns);
      const aCol = a % columns;
      const bRow = Math.floor(b / columns);
      const bCol = b % columns;
      if (aCol !== bCol) {
        return aCol - bCol;
      }
      return aRow - bRow;
    });
    if (ordered.length < 2) {
      return;
    }
    const nextColors = [...colors];
    const lastColor = nextColors[ordered[ordered.length - 1]];
    for (let i = ordered.length - 1; i > 0; i -= 1) {
      nextColors[ordered[i]] = nextColors[ordered[i - 1]];
    }
    nextColors[ordered[0]] = lastColor;
    setPalette(nextColors);
    closeMenu();
  };

  const handleAddSwatch = (swatchColors: string[]) => {
    const existing = new Set(colors.map((color) => color.toLowerCase()));
    dedupeColors(swatchColors)
      .filter((color) => !existing.has(color.toLowerCase()))
      .forEach((color) => addColor(color));
    closeMenu();
  };

  const closeLospec = () => {
    setLospecOpen(false);
    setLospecBusy(false);
    setLospecError(null);
    setLospecUrl('');
  };

  const submitLospec = async () => {
    if (!window.paletteApi?.importLospec) {
      setLospecError('LoSpec import is unavailable (paletteApi not found). Restart the app.');
      return;
    }
    const input = lospecUrl.trim();
    if (!input) {
      setLospecError('Paste a LoSpec palette URL or slug.');
      return;
    }
    setLospecBusy(true);
    setLospecError(null);
    try {
      const payload = await window.paletteApi.importLospec(input);
      const nextColors = payload.colors.length > 0 ? payload.colors : colors;
      setPalette(nextColors);
      setSelectedIndices([Math.max(0, nextColors.length - 1)]);
      useProjectStore.getState().setDirty(true);
      closeLospec();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to import palette.';
      setLospecError(message);
      setLospecBusy(false);
    }
  };

  const layout = React.useMemo(() => {
    const count = colors.length + 1;
    const rows = Math.min(maxRows, Math.max(1, Math.ceil(count / 16)));
    const columns = Math.max(1, Math.ceil(count / rows));
    return { rows, columns };
  }, [colors.length, maxRows]);

  useEffect(() => {
    try {
      window.localStorage.setItem('pss.paletteRows', String(maxRows));
    } catch {
      // ignore
    }
  }, [maxRows]);

  useEffect(() => {
    const onPointerUp = () => {
      selectingRef.current = false;
      selectionAnchorRef.current = null;
      dragAdditiveRef.current = false;
      dragBaseSelectionRef.current = new Set();
    };
    window.addEventListener('pointerup', onPointerUp);
    return () => window.removeEventListener('pointerup', onPointerUp);
  }, []);

  const getGridPos = (index: number) => ({
    row: Math.floor(index / layout.columns),
    col: index % layout.columns,
  });

  const buildDragSelection = (startIndex: number, endIndex: number) => {
    const start = getGridPos(startIndex);
    const end = getGridPos(endIndex);
    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);
    const minCol = Math.min(start.col, end.col);
    const maxCol = Math.max(start.col, end.col);
    const indices: number[] = [];
    for (let row = minRow; row <= maxRow; row += 1) {
      for (let col = minCol; col <= maxCol; col += 1) {
        const idx = row * layout.columns + col;
        if (idx < 0 || idx >= colors.length) {
          continue;
        }
        indices.push(idx);
      }
    }
    return indices;
  };

  return (
    <div className="palette-bar">
      <div
        className="palette-bar__swatches"
        role="listbox"
        aria-label="Palette colors"
        style={
          {
            '--palette-rows': layout.rows,
            '--palette-columns': layout.columns,
          } as React.CSSProperties
        }
      >
        {colors.map((color, index) => (
          <button
            key={`${color}-${index}`}
            type="button"
            className="palette-bar__swatch"
            style={{ background: color }}
            data-active={index === activeIndex}
            data-selected={selectionSet.has(index)}
            onMouseDown={(event) => {
              if (isMac && event.button === 0 && event.ctrlKey) {
                suppressClickRef.current = true;
              }
            }}
            onPointerDown={(event) => {
              if (event.button !== 0) {
                return;
              }
              selectingRef.current = true;
              selectionAnchorRef.current = index;
              didDragRef.current = false;
              dragAdditiveRef.current = event.shiftKey || event.metaKey || event.ctrlKey || event.altKey;
              dragBaseSelectionRef.current = dragAdditiveRef.current ? new Set(selectionSet) : new Set();
              const next = buildDragSelection(index, index);
              if (dragAdditiveRef.current) {
                const merged = new Set(dragBaseSelectionRef.current);
                next.forEach((value) => merged.add(value));
                setSelectedIndices(ensureActiveLast(Array.from(merged), index));
              } else {
                setSelectedIndices(ensureActiveLast(next, index));
              }
              lastSelectedRef.current = index;
            }}
            onPointerEnter={() => {
              if (!selectingRef.current || selectionAnchorRef.current === null) {
                return;
              }
              didDragRef.current = true;
              const range = buildDragSelection(selectionAnchorRef.current, index);
              if (dragAdditiveRef.current) {
                const merged = new Set(dragBaseSelectionRef.current);
                range.forEach((value) => merged.add(value));
                setSelectedIndices(ensureActiveLast(Array.from(merged), index));
              } else {
                setSelectedIndices(ensureActiveLast(range, index));
              }
            }}
            onClick={(event) => {
              if (didDragRef.current) {
                didDragRef.current = false;
                return;
              }
              if (suppressClickRef.current) {
                suppressClickRef.current = false;
                return;
              }
              if (event.shiftKey && lastSelectedRef.current !== null) {
                const start = Math.min(lastSelectedRef.current, index);
                const end = Math.max(lastSelectedRef.current, index);
                const next = new Set(selectionSet);
                for (let i = start; i <= end; i += 1) {
                  next.add(i);
                }
                setSelectedIndices(ensureActiveLast(Array.from(next), index));
                lastSelectedRef.current = index;
              } else if (event.metaKey || event.altKey) {
                const next = new Set(selectionSet);
                if (next.has(index)) {
                  next.delete(index);
                } else {
                  next.add(index);
                }
                const nextIndices = Array.from(next);
                setSelectedIndices(
                  next.has(index) ? ensureActiveLast(nextIndices, index) : nextIndices
                );
                lastSelectedRef.current = index;
              } else if (event.ctrlKey) {
                const next = new Set(selectionSet);
                if (next.has(index)) {
                  next.delete(index);
                } else {
                  next.add(index);
                }
                const nextIndices = Array.from(next);
                setSelectedIndices(
                  next.has(index) ? ensureActiveLast(nextIndices, index) : nextIndices
                );
                lastSelectedRef.current = index;
              } else {
                setSelection([index]);
                lastSelectedRef.current = index;
              }
            }}
            onContextMenu={(event) => openMenu(event, index)}
            aria-label={`Palette color ${index + 1}`}
            aria-selected={selectionSet.has(index)}
          />
        ))}
        <button
          type="button"
          className="palette-bar__swatch palette-bar__swatch--empty"
          onClick={() => {
            setSelectedIndices([]);
            addColor('#ffffff');
          }}
          onContextMenu={(event) => openMenu(event, null)}
          aria-label="Add palette color"
        />
      </div>
      {menu.open && (
        <div
          ref={menuRef}
          className="palette-bar__menu"
          role="menu"
          style={{ top: menu.y, left: menu.x }}
        >
          <div className="palette-bar__menu-label">Actions</div>
          <DropdownSelect
            ariaLabel="Palette actions"
            className="palette-bar__menu-item palette-bar__menu-select"
            value={menuActionChoice}
            onChange={(value) => {
              setMenuActionChoice(value);
              if (value === 'none') {
                return;
              }
              if (value === 'importLospec') {
                closeMenu();
                setLospecOpen(true);
                setLospecUrl('https://lospec.com/palette-list/');
                setLospecError(null);
                setMenuActionChoice('none');
                return;
              }
              if (value === 'setColor') {
                handleSetColor();
              } else if (value === 'editSelected') {
                handleEditSelected();
              } else if (value === 'clearSelected') {
                handleClearSelected();
              } else if (value === 'removeColor') {
                handleRemoveColor();
              } else if (value === 'deleteSelected') {
                handleDeleteSelected();
              } else if (value === 'cycleSelected') {
                handleCycleSelected();
              } else if (value === 'addColor') {
                handleAddColor();
              } else if (value === 'consolidate') {
                consolidatePalette();
                closeMenu();
              }
              setMenuActionChoice('none');
            }}
            options={[
              { value: 'none', label: 'Choose action…' },
              { value: 'importLospec', label: 'Import LoSpec Palette URL…' },
              { value: 'setColor', label: 'Set Color', disabled: !canSetColor },
              { value: 'editSelected', label: 'Edit Selected', disabled: !canEditSelection },
              { value: 'clearSelected', label: 'Clear Selected', disabled: !canEditSelection },
              { value: 'removeColor', label: 'Remove Color', disabled: !canRemoveColor },
              {
                value: 'deleteSelected',
                label: 'Delete Selected',
                disabled: !canEditSelection || !canDeleteSelection,
              },
              { value: 'cycleSelected', label: 'Cycle Selected', disabled: !canCycleSelection },
              { value: 'addColor', label: 'Add Color' },
              { value: 'consolidate', label: 'Consolidate Duplicates', disabled: !hasDuplicates },
            ]}
          />
          <div className="palette-bar__menu-label">Add Swatch</div>
          <DropdownSelect
            ariaLabel="Swatch presets"
            className="palette-bar__menu-item palette-bar__menu-select"
            value={swatchPresetChoice}
            onChange={(value) => {
              setSwatchPresetChoice(value);
              if (value === 'none') {
                return;
              }
              const preset = swatchPresets.find((entry) => entry.id === value);
              if (preset) {
                handleAddSwatch(preset.colors);
              }
              setSwatchPresetChoice('none');
            }}
            options={[
              { value: 'none', label: 'Choose preset…' },
              ...swatchPresets.map((preset) => ({
                value: preset.id,
                label: preset.label,
                render: (
                  <span className="palette-bar__preset-option">
                    <span className="palette-bar__preset-option-label">{preset.label}</span>
                    <span className="palette-bar__menu-preview" aria-hidden="true">
                      {preset.colors.map((swatch, index) => (
                        <span
                          key={`${preset.id}-${swatch}-${index}`}
                          className="palette-bar__menu-chip"
                          style={{ background: swatch }}
                        />
                      ))}
                    </span>
                  </span>
                ),
              })),
            ]}
          />
          <div className="palette-bar__menu-label">Palette Rows</div>
          <DropdownSelect
            ariaLabel="Palette rows"
            className="palette-bar__menu-item palette-bar__menu-select"
            value={String(maxRows)}
            onChange={(value) => {
              const next = Math.min(4, Math.max(1, Number(value)));
              setMaxRows(Number.isFinite(next) ? next : 3);
              closeMenu();
            }}
            options={[
              { value: '2', label: '2 rows' },
              { value: '3', label: '3 rows' },
              { value: '4', label: '4 rows' },
            ]}
          />
        </div>
      )}
      {lospecOpen &&
        createPortal(
          <div
            className="modal"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                closeLospec();
              }
            }}
          >
            <div className="modal__backdrop" onClick={closeLospec} />
            <div className="modal__content" role="dialog" aria-modal="true">
              <div className="modal__header">
                <h2>Import LoSpec Palette</h2>
                <button type="button" onClick={closeLospec}>
                  Close
                </button>
              </div>
              <div className="modal__body">
                <label className="panel__label" htmlFor="lospec-url">
                  URL or slug
                </label>
                <input
                  id="lospec-url"
                  type="text"
                  className="panel__number"
                  value={lospecUrl}
                  placeholder="https://lospec.com/palette-list/black-scarlet-16"
                  onChange={(event) => setLospecUrl(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      void submitLospec();
                    }
                  }}
                  autoFocus
                />
                {lospecError && (
                  <div className="panel__note" style={{ color: 'rgba(255, 120, 120, 0.9)' }}>
                    {lospecError}
                  </div>
                )}
                <div className="modal__row" style={{ justifyContent: 'flex-end', gap: 8 }}>
                  <button type="button" className="panel__item" onClick={closeLospec} disabled={lospecBusy}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="panel__item"
                    onClick={() => void submitLospec()}
                    disabled={lospecBusy}
                  >
                    {lospecBusy ? 'Importing…' : 'Import'}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default PaletteBar;
