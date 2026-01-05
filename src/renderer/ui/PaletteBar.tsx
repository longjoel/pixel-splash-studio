import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePaletteStore } from '@/state/paletteStore';
import { hexToRgb, mix, type Rgb } from '@/core/colorUtils';

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
  const removePicker = () => {
    if (input.isConnected) {
      input.remove();
    }
    window.removeEventListener('focus', removePicker);
  };
  input.addEventListener('change', () => {
    onPick(input.value);
    removePicker();
  });
  window.addEventListener('focus', removePicker);
  document.body.appendChild(input);
  input.click();
};

const PaletteBar = () => {
  const colors = usePaletteStore((state) => state.colors);
  const primaryIndex = usePaletteStore((state) => state.primaryIndex);
  const secondaryIndex = usePaletteStore((state) => state.secondaryIndex);
  const setPrimary = usePaletteStore((state) => state.setPrimary);
  const setSecondary = usePaletteStore((state) => state.setSecondary);
  const setColor = usePaletteStore((state) => state.setColor);
  const addColor = usePaletteStore((state) => state.addColor);
  const removeColor = usePaletteStore((state) => state.removeColor);

  const [menu, setMenu] = useState<MenuState>({
    open: false,
    x: 0,
    y: 0,
    index: null,
  });
  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => {
    setMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
  };

  const openMenu = (event: React.MouseEvent, index: number | null) => {
    event.preventDefault();
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
      : colors[primaryIndex] ?? '#ffffff';
  const swatchPresets = buildSwatchPresets(baseSwatchColor);

  const handleSetColor = () => {
    if (!canSetColor || menu.index === null) {
      return;
    }
    openColorPicker(selectedColor, (value) => {
      setColor(menu.index ?? 0, value);
    });
    closeMenu();
  };

  const handleRemoveColor = () => {
    if (!canRemoveColor || menu.index === null) {
      return;
    }
    removeColor(menu.index);
    closeMenu();
  };

  const handleAddColor = () => {
    openColorPicker('#ffffff', (value) => {
      addColor(value);
    });
    closeMenu();
  };

  const handleAddSwatch = (swatchColors: string[]) => {
    const existing = new Set(colors.map((color) => color.toLowerCase()));
    dedupeColors(swatchColors)
      .filter((color) => !existing.has(color.toLowerCase()))
      .forEach((color) => addColor(color));
    closeMenu();
  };

  return (
    <div className="palette-bar">
      <div className="palette-bar__swatches" role="listbox" aria-label="Palette colors">
        {colors.map((color, index) => (
          <button
            key={`${color}-${index}`}
            type="button"
            className="palette-bar__swatch"
            style={{ background: color }}
            data-primary={index === primaryIndex}
            data-secondary={index === secondaryIndex}
            onClick={(event) => {
              if (event.ctrlKey) {
                setSecondary(index);
              } else {
                setPrimary(index);
              }
            }}
            onContextMenu={(event) => openMenu(event, index)}
            aria-label={`Palette color ${index + 1}`}
          />
        ))}
        <button
          type="button"
          className="palette-bar__swatch palette-bar__swatch--empty"
          onClick={() => addColor('#ffffff')}
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
          <button
            type="button"
            className="palette-bar__menu-item"
            role="menuitem"
            disabled={!canSetColor}
            onClick={handleSetColor}
          >
            Set Color
          </button>
          <button
            type="button"
            className="palette-bar__menu-item"
            role="menuitem"
            disabled={!canRemoveColor}
            onClick={handleRemoveColor}
          >
            Remove Color
          </button>
          <button
            type="button"
            className="palette-bar__menu-item"
            role="menuitem"
            onClick={handleAddColor}
          >
            Add Color
          </button>
          <div className="palette-bar__menu-label">Add Swatch</div>
          <div className="palette-bar__menu-options" role="group" aria-label="Add swatch">
            {swatchPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="palette-bar__menu-option"
                role="menuitem"
                onClick={() => handleAddSwatch(preset.colors)}
              >
                <span className="palette-bar__menu-option-label">{preset.label}</span>
                <span className="palette-bar__menu-preview" aria-hidden="true">
                  {preset.colors.map((swatch, index) => (
                    <span
                      key={`${preset.id}-${swatch}-${index}`}
                      className="palette-bar__menu-chip"
                      style={{ background: swatch }}
                    />
                  ))}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaletteBar;
