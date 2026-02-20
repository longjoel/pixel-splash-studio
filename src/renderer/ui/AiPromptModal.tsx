import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePaletteStore } from '@/state/paletteStore';
import { useClipboardStore } from '@/state/clipboardStore';
import { useToolStore } from '@/state/toolStore';
import { quantizeImageToPalette } from '@/services/aiQuantize';
import { buildSelectionPngBase64 } from '@/services/selectionPng';

type AiPromptModalProps = {
  initialPrompt?: string;
  onCancel: () => void;
  onConfirm: (payload: {
    prompt: string;
    cellWidth: number;
    cellHeight: number;
    columns: number;
    rows: number;
    useSelectionAsReference: boolean;
  }) => void;
};

const clampInt = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Math.trunc(value)));

export const AiPromptModal = ({
  initialPrompt = '',
  onCancel,
  onConfirm,
}: AiPromptModalProps) => {
  const palette = usePaletteStore((state) => state.colors);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [cellWidth, setCellWidth] = useState(16);
  const [cellHeight, setCellHeight] = useState(16);
  const [columns, setColumns] = useState(1);
  const [rows, setRows] = useState(1);
  const [useSelectionAsReference, setUseSelectionAsReference] = useState(false);
  const [busy, setBusy] = useState(false);
  const [busyStage, setBusyStage] = useState<string>('');
  const [busyElapsedSec, setBusyElapsedSec] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const totalWidth = useMemo(() => clampInt(cellWidth, 1, 512) * clampInt(columns, 1, 64), [
    cellWidth,
    columns,
  ]);
  const totalHeight = useMemo(() => clampInt(cellHeight, 1, 512) * clampInt(rows, 1, 64), [
    cellHeight,
    rows,
  ]);

  useEffect(() => {
    window.setTimeout(() => textareaRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!busy) {
      setBusyElapsedSec(0);
      return undefined;
    }
    const startedAt = Date.now();
    const intervalId = window.setInterval(() => {
      setBusyElapsedSec(Math.floor((Date.now() - startedAt) / 1000));
    }, 250);
    return () => window.clearInterval(intervalId);
  }, [busy]);

  const generate = async () => {
    setError(null);
    const trimmed = prompt.trim();
    if (!trimmed) {
      setError('Enter a prompt.');
      return;
    }
    if (!window.aiApi?.generateSprite) {
      setError('AI is unavailable. Restart the app to load the latest AI support.');
      return;
    }
    setBusy(true);
    setBusyStage('Preparing request…');
    try {
      setBusyStage(useSelectionAsReference ? 'Encoding reference…' : 'Preparing prompt…');
      const referencePngBase64 = useSelectionAsReference ? await buildSelectionPngBase64() : null;
      setBusyStage('Waiting for OpenAI…');
      const result = await window.aiApi.generateSprite({
        prompt: trimmed,
        palette,
        cellWidth: clampInt(cellWidth, 1, 512),
        cellHeight: clampInt(cellHeight, 1, 512),
        columns: clampInt(columns, 1, 64),
        rows: clampInt(rows, 1, 64),
        referencePngBase64,
      });

      setBusyStage('Processing image…');
      const img = new Image();
      const dataUrl = `data:image/png;base64,${result.pngBase64}`;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load generated image.'));
        img.src = dataUrl;
      });

      const canvas = document.createElement('canvas');
      canvas.width = totalWidth;
      canvas.height = totalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas unavailable.');
      }
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, totalWidth, totalHeight);
      ctx.drawImage(img, 0, 0, totalWidth, totalHeight);

      setBusyStage('Quantizing to palette…');
      const imageData = ctx.getImageData(0, 0, totalWidth, totalHeight);
      const quantized = quantizeImageToPalette(imageData, palette, { alphaThreshold: 10 });

      setBusyStage('Copying to Stamp…');
      useClipboardStore.getState().setBuffer({
        pixels: quantized.pixels,
        origin: { x: 0, y: 0 },
        width: totalWidth,
        height: totalHeight,
      });
      useToolStore.getState().setActiveTool('stamp');

      onConfirm({
        prompt: trimmed,
        cellWidth,
        cellHeight,
        columns,
        rows,
        useSelectionAsReference,
      });
    } catch (e) {
      console.error('AI generation failed:', e);
      setError(e instanceof Error ? e.message : 'AI generation failed.');
    } finally {
      setBusy(false);
      setBusyStage('');
    }
  };

  return (
    <div
      className="modal"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onCancel();
        }
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
          event.preventDefault();
          void generate();
        }
      }}
    >
      <div className="modal__backdrop" onClick={onCancel} />
      <div className="modal__content modal__content--ai" role="dialog" aria-modal="true">
        <div className="modal__header">
          <h2>AI Prompt</h2>
          <button type="button" onClick={onCancel} disabled={busy}>
            Close
          </button>
        </div>
        <div className="modal__body">
          <div className="modal__row">
            <span>Prompt</span>
            <span style={{ width: 420 }}>
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                style={{ width: '100%', resize: 'vertical' }}
                placeholder="e.g. give me a hero standing idle in 4 directions, 16x32 pixels tall for each cell"
                disabled={busy}
              />
              <div style={{ opacity: 0.75, marginTop: 6 }}>
                Ctrl/Cmd+Enter to generate. Uses current palette.
              </div>
            </span>
          </div>

          {busy && (
            <div className="modal__row">
              <span>Status</span>
              <span style={{ display: 'grid', gap: 8, width: 420 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span className="spinner" aria-hidden="true" />
                  <span style={{ opacity: 0.9 }}>
                    {busyStage || 'Generating…'}
                    {busyElapsedSec > 0 ? ` (${busyElapsedSec}s)` : ''}
                  </span>
                </div>
                <div className="progress-bar" aria-hidden="true">
                  <div className="progress-bar__indeterminate" />
                </div>
              </span>
            </div>
          )}

          <div className="modal__row">
            <span>Cell</span>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="number"
                min={1}
                max={512}
                value={cellWidth}
                onChange={(e) => setCellWidth(Number(e.target.value))}
                disabled={busy}
              />
              <span>×</span>
              <input
                type="number"
                min={1}
                max={512}
                value={cellHeight}
                onChange={(e) => setCellHeight(Number(e.target.value))}
                disabled={busy}
              />
              <span>px</span>
            </span>
          </div>

          <div className="modal__row">
            <span>Grid</span>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="number"
                min={1}
                max={64}
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                disabled={busy}
              />
              <span>cols</span>
              <input
                type="number"
                min={1}
                max={64}
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                disabled={busy}
              />
              <span>rows</span>
              <span style={{ opacity: 0.75 }}>
                ({totalWidth}×{totalHeight})
              </span>
            </span>
          </div>

          <div className="modal__row">
            <span>Reference</span>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={useSelectionAsReference}
                onChange={(e) => setUseSelectionAsReference(e.target.checked)}
                disabled={busy}
              />
              Use current selection as reference image (optional)
            </label>
          </div>

          {error && (
            <div className="modal__row">
              <span />
              <span style={{ color: '#ff9caa' }}>{error}</span>
            </div>
          )}

          <div className="modal__row">
            <span />
            <span style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={() => void generate()} disabled={busy}>
                {busy ? 'Generating…' : 'Generate'}
              </button>
              <button type="button" onClick={onCancel} disabled={busy}>
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
