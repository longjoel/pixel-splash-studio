import React, { useEffect, useMemo, useRef } from 'react';
import { usePaletteStore } from '@/state/paletteStore';
import { ensureContrast, getComplement, hexToRgb, mix, toRgb, toRgba } from '@/core/colorUtils';
import type { TextFontFamily } from '@/services/textClipboard';
import { applyGradientToRasterizedText, quantizeFontSize, rasterizeText } from '@/services/textClipboard';
import { getPaletteSelectionRamp } from '@/services/paletteRamp';
import { useFillBucketStore } from '@/state/fillBucketStore';

type TextToolModalProps = {
  initialText?: string;
  initialFontFamily?: TextFontFamily;
  initialFontSize?: number;
  onCancel: () => void;
  onConfirm: (payload: { text: string; fontFamily: TextFontFamily; fontSize: number }) => void;
};

const FONT_OPTIONS: Array<{ label: string; value: TextFontFamily }> = [
  { label: 'Monospace', value: 'monospace' },
  { label: 'Sans', value: 'sans-serif' },
  { label: 'Serif', value: 'serif' },
];

const SIZE_OPTIONS = [8, 16, 24, 32];

const setupCanvas = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.imageSmoothingEnabled = false;
  return context;
};

export const TextToolModal = ({
  initialText = '',
  initialFontFamily = 'monospace',
  initialFontSize = 16,
  onCancel,
  onConfirm,
}: TextToolModalProps) => {
  const paletteColors = usePaletteStore((state) => state.colors);
  const selectedIndices = usePaletteStore((state) => state.selectedIndices);
  const activeIndex = usePaletteStore((state) => state.getActiveIndex());
  const gradientDirection = useFillBucketStore((state) => state.gradientDirection);
  const gradientDither = useFillBucketStore((state) => state.gradientDither);
  const [text, setText] = React.useState(initialText);
  const [fontFamily, setFontFamily] = React.useState<TextFontFamily>(initialFontFamily);
  const [fontSize, setFontSize] = React.useState<number>(quantizeFontSize(initialFontSize));
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previewWrapperRef = useRef<HTMLDivElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select?.();
  }, []);

  const rasterized = useMemo(() => {
    try {
      const base = rasterizeText({
        text,
        fontFamily,
        fontSize,
        paletteIndex: activeIndex,
      });
      if (!base) {
        return null;
      }
      const ramp = getPaletteSelectionRamp();
      if (ramp.length <= 1) {
        return base;
      }
      return applyGradientToRasterizedText(base, ramp, gradientDirection, gradientDither);
    } catch {
      return null;
    }
  }, [activeIndex, fontFamily, fontSize, gradientDirection, gradientDither, selectedIndices, text]);

  useEffect(() => {
    const wrapper = previewWrapperRef.current;
    const canvas = previewCanvasRef.current;
    if (!wrapper || !canvas) {
      return undefined;
    }

    const render = () => {
      const context = setupCanvas(canvas, wrapper.clientWidth, wrapper.clientHeight);
      if (!context) {
        return;
      }

      const width = wrapper.clientWidth;
      const height = wrapper.clientHeight;
      const bgHex = paletteColors[0] ?? '#000000';
      const bgRgb = hexToRgb(bgHex) ?? { r: 0, g: 0, b: 0 };
      const accent = ensureContrast(bgRgb, getComplement(bgRgb));
      const surfaceColor = toRgb(mix(bgRgb, accent, 0.1));
      const borderColor = toRgba(accent, 0.12);

      context.clearRect(0, 0, width, height);
      context.fillStyle = bgHex;
      context.fillRect(0, 0, width, height);

      if (!rasterized || rasterized.pixels.length === 0) {
        return;
      }

      const padding = 12;
      const availableWidth = Math.max(1, width - padding * 2);
      const availableHeight = Math.max(1, height - padding * 2);
      const scale = Math.max(
        1,
        Math.floor(
          Math.min(availableWidth / rasterized.width, availableHeight / rasterized.height)
        )
      );

      const scaledWidth = rasterized.width * scale;
      const scaledHeight = rasterized.height * scale;
      const offsetX = Math.floor((width - scaledWidth) / 2);
      const offsetY = Math.floor((height - scaledHeight) / 2);

      context.fillStyle = surfaceColor;
      context.fillRect(offsetX, offsetY, scaledWidth, scaledHeight);
      context.strokeStyle = borderColor;
      context.strokeRect(offsetX, offsetY, scaledWidth, scaledHeight);

      const groups = new Map<number, Array<{ x: number; y: number }>>();
      for (const pixel of rasterized.pixels) {
        const entry = groups.get(pixel.paletteIndex);
        if (entry) {
          entry.push({ x: pixel.x, y: pixel.y });
        } else {
          groups.set(pixel.paletteIndex, [{ x: pixel.x, y: pixel.y }]);
        }
      }

      for (const [paletteIndex, pixels] of groups) {
        context.fillStyle = paletteColors[paletteIndex] ?? paletteColors[activeIndex] ?? '#ffffff';
        for (const pixel of pixels) {
          context.fillRect(
            offsetX + pixel.x * scale,
            offsetY + pixel.y * scale,
            scale,
            scale
          );
        }
      }
    };

    render();
    const unsubscribePalette = usePaletteStore.subscribe(render);
    const resizeObserver = new ResizeObserver(render);
    resizeObserver.observe(wrapper);
    return () => {
      unsubscribePalette();
      resizeObserver.disconnect();
    };
  }, [activeIndex, paletteColors, rasterized]);

  return (
    <div
      className="modal"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onCancel();
        }
      }}
    >
      <div className="modal__backdrop" onClick={onCancel} />
      <div className="modal__content modal__content--text" role="dialog" aria-modal="true">
        <div className="modal__header">
          <h2>Text</h2>
          <button type="button" onClick={onCancel}>
            Close
          </button>
        </div>
        <div className="modal__body">
          <div className="modal__row">
            <span>Font</span>
            <span>
              <select
                value={fontFamily}
                onChange={(event) => setFontFamily(event.target.value as TextFontFamily)}
              >
                {FONT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </span>
          </div>
          <div className="modal__row">
            <span>Size</span>
            <span>
              <select
                value={fontSize}
                onChange={(event) => setFontSize(Number(event.target.value))}
              >
                {SIZE_OPTIONS.map((value) => (
                  <option key={value} value={value}>
                    {value}px
                  </option>
                ))}
              </select>
            </span>
          </div>
          <div className="modal__row">
            <span>Text</span>
            <span className="text-tool__text-field">
              <input
                ref={inputRef}
                className="text-tool__text-input"
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Type text…"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    if (!text.trim()) {
                      return;
                    }
                    onConfirm({ text, fontFamily, fontSize });
                  }
                }}
              />
            </span>
          </div>
          <div className="text-tool__preview" ref={previewWrapperRef}>
            <canvas ref={previewCanvasRef} />
          </div>
          <div className="modal__row">
            <span />
            <span style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onConfirm({ text, fontFamily, fontSize })}
                disabled={!text.trim()}
              >
                OK
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
