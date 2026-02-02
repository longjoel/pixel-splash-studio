import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TOOL_LABELS } from '../../constants';
import { useToolStore } from '@/state/toolStore';
import { useBrushStore } from '@/state/brushStore';
import { useSprayStore } from '@/state/sprayStore';
import { useFillBucketStore } from '@/state/fillBucketStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useViewportStore } from '@/state/viewportStore';

type ToolContextMenuProps = {
  x: number;
  y: number;
  onClose: () => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const ToolContextMenu = ({ x, y, onClose }: ToolContextMenuProps) => {
  const activeTool = useToolStore((state) => state.activeTool);
  const brushSize = useBrushStore((state) => state.size);
  const brushShape = useBrushStore((state) => state.shape);
  const sprayRadius = useSprayStore((state) => state.radius);
  const sprayDensity = useSprayStore((state) => state.density);
  const fillMode = useFillBucketStore((state) => state.mode);
  const selectionCount = useSelectionStore((state) => state.selectedCount);

  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x, y });

  const label = useMemo(() => TOOL_LABELS[activeTool] ?? 'Tools', [activeTool]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }
      onClose();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const padding = 8;
    const maxX = Math.max(padding, window.innerWidth - rect.width - padding);
    const maxY = Math.max(padding, window.innerHeight - rect.height - padding);
    const nextX = clamp(x, padding, maxX);
    const nextY = clamp(y, padding, maxY);
    setPos({ x: nextX, y: nextY });
  }, [x, y]);

  const setBrushSize = (next: number) => useBrushStore.getState().setSize(next);
  const setBrushShape = (next: 'point' | 'square' | 'round') =>
    useBrushStore.getState().setShape(next);
  const setSprayRadius = (next: number) => useSprayStore.getState().setRadius(next);
  const setSprayDensity = (next: number) => useSprayStore.getState().setDensity(next);
  const setFillMode = (next: 'color' | 'selection') => useFillBucketStore.getState().setMode(next);

  const isBrushTool =
    activeTool === 'pen' ||
    activeTool === 'line' ||
    activeTool === 'rectangle' ||
    activeTool === 'oval' ||
    activeTool === 'selection-lasso';

  return (
    <div
      ref={ref}
      className="tool-context-menu"
      role="menu"
      style={{ top: pos.y, left: pos.x }}
    >
      <div className="tool-context-menu__title">{label}</div>

      <button
        type="button"
        className="tool-context-menu__item"
        onClick={() => {
          useViewportStore.getState().resetCamera();
          onClose();
        }}
      >
        Reset View
      </button>
      <button
        type="button"
        className="tool-context-menu__item"
        onClick={() => {
          useViewportStore.getState().zoomBy(0.25);
          onClose();
        }}
      >
        Zoom In
      </button>
      <button
        type="button"
        className="tool-context-menu__item"
        onClick={() => {
          useViewportStore.getState().zoomBy(-0.25);
          onClose();
        }}
      >
        Zoom Out
      </button>

      {selectionCount > 0 && (
        <button
          type="button"
          className="tool-context-menu__item"
          onClick={() => {
            useSelectionStore.getState().clear();
            onClose();
          }}
        >
          Clear Selection
        </button>
      )}

      {isBrushTool && (
        <>
          <div className="tool-context-menu__separator" />
          <div className="tool-context-menu__label">Brush</div>
          <button
            type="button"
            className="tool-context-menu__item"
            onClick={() => setBrushSize(clamp(brushSize - 1, 1, 64))}
          >
            Size - ({brushSize})
          </button>
          <button
            type="button"
            className="tool-context-menu__item"
            onClick={() => setBrushSize(clamp(brushSize + 1, 1, 64))}
          >
            Size + ({brushSize})
          </button>
          <button
            type="button"
            className="tool-context-menu__item"
            aria-checked={brushShape === 'point'}
            role="menuitemradio"
            onClick={() => setBrushShape('point')}
          >
            Shape: Point
          </button>
          <button
            type="button"
            className="tool-context-menu__item"
            aria-checked={brushShape === 'square'}
            role="menuitemradio"
            onClick={() => setBrushShape('square')}
          >
            Shape: Square
          </button>
          <button
            type="button"
            className="tool-context-menu__item"
            aria-checked={brushShape === 'round'}
            role="menuitemradio"
            onClick={() => setBrushShape('round')}
          >
            Shape: Round
          </button>
        </>
      )}

      {activeTool === 'spray' && (
        <>
          <div className="tool-context-menu__separator" />
          <div className="tool-context-menu__label">Spray</div>
          <button
            type="button"
            className="tool-context-menu__item"
            onClick={() => setSprayRadius(sprayRadius - 1)}
          >
            Radius - ({sprayRadius})
          </button>
          <button
            type="button"
            className="tool-context-menu__item"
            onClick={() => setSprayRadius(sprayRadius + 1)}
          >
            Radius + ({sprayRadius})
          </button>
          <button
            type="button"
            className="tool-context-menu__item"
            onClick={() => setSprayDensity(sprayDensity - 50)}
          >
            Density - ({sprayDensity})
          </button>
          <button
            type="button"
            className="tool-context-menu__item"
            onClick={() => setSprayDensity(sprayDensity + 50)}
          >
            Density + ({sprayDensity})
          </button>
        </>
      )}

      {activeTool === 'fill-bucket' && (
        <>
          <div className="tool-context-menu__separator" />
          <div className="tool-context-menu__label">Fill</div>
          <button
            type="button"
            className="tool-context-menu__item"
            aria-checked={fillMode === 'color'}
            role="menuitemradio"
            onClick={() => setFillMode('color')}
          >
            Mode: Color
          </button>
          <button
            type="button"
            className="tool-context-menu__item"
            aria-checked={fillMode === 'selection'}
            role="menuitemradio"
            onClick={() => setFillMode('selection')}
          >
            Mode: Selection
          </button>
        </>
      )}
    </div>
  );
};

export default ToolContextMenu;
