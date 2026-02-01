import React from 'react';
import type { ToolId } from '@/state/toolStore';
import { TOOL_ICONS } from '@/ui/toolIcons';

type TopbarProps = {
  activeTool: ToolId;
  selectionCount: number;
  activateTool: (tool: ToolId) => void;
  onExitCompact: () => void;
};

class TopbarErrorBoundary extends React.Component<
  { onDisable: () => void; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Topbar crashed:', error);
    this.props.onDisable();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="topbar" role="toolbar" aria-label="Tools">
          <div style={{ opacity: 0.9 }}>Compact tools disabled due to an error.</div>
          <div style={{ flex: 1 }} />
          <button type="button" className="topbar__mode-button" onClick={this.props.onDisable}>
            Disable Compact
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export const Topbar = ({ activeTool, selectionCount, activateTool, onExitCompact }: TopbarProps) => (
  <TopbarErrorBoundary onDisable={onExitCompact}>
    <div className="topbar" role="toolbar" aria-label="Tools">
      <div className="topbar__tools" role="presentation">
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'pen'}
          onClick={() => activateTool('pen')}
          title="Pen"
          aria-label="Pen"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.pen}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'spray'}
          onClick={() => activateTool('spray')}
          title="Spray"
          aria-label="Spray"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.spray}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'line'}
          onClick={() => activateTool('line')}
          title="Line"
          aria-label="Line"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.line}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'rectangle'}
          onClick={() => activateTool('rectangle')}
          title="Rectangle"
          aria-label="Rectangle"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.rectangle}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'oval'}
          onClick={() => activateTool('oval')}
          title="Oval"
          aria-label="Oval"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.oval}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'fill-bucket'}
          onClick={() => activateTool('fill-bucket')}
          title="Fill"
          aria-label="Fill"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['fill-bucket']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'text'}
          onClick={() => activateTool('text')}
          title="Text"
          aria-label="Text"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.text}</span>
        </button>
        <span className="topbar__divider" aria-hidden="true" />
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'reference-handle'}
          onClick={() => activateTool('reference-handle')}
          title="Reference Handle"
          aria-label="Reference Handle"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['reference-handle']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'eyedropper'}
          onClick={() => activateTool('eyedropper')}
          title="Eyedropper"
          aria-label="Eyedropper"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.eyedropper}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'stamp'}
          onClick={() => activateTool('stamp')}
          title="Stamp"
          aria-label="Stamp"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.stamp}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'selection-rect'}
          onClick={() => activateTool('selection-rect')}
          title="Selection Rectangle"
          aria-label="Selection Rectangle"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['selection-rect']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'selection-oval'}
          onClick={() => activateTool('selection-oval')}
          title="Selection Oval"
          aria-label="Selection Oval"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['selection-oval']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'magic-wand'}
          onClick={() => activateTool('magic-wand')}
          title="Magic Wand"
          aria-label="Magic Wand"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['magic-wand']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'selection-lasso'}
          onClick={() => activateTool('selection-lasso')}
          title="Selection Lasso"
          aria-label="Selection Lasso"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['selection-lasso']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'texture-roll'}
          onClick={() => activateTool('texture-roll')}
          title="Scroll Selection"
          aria-label="Scroll Selection"
          disabled={selectionCount === 0}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['texture-roll']}</span>
        </button>
        <span className="topbar__divider" aria-hidden="true" />
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'tile-sampler'}
          onClick={() => activateTool('tile-sampler')}
          title="Tile Sampler"
          aria-label="Tile Sampler"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['tile-sampler']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'tile-pen'}
          onClick={() => activateTool('tile-pen')}
          title="Tile Pen"
          aria-label="Tile Pen"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['tile-pen']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'tile-rectangle'}
          onClick={() => activateTool('tile-rectangle')}
          title="Tile Rectangle"
          aria-label="Tile Rectangle"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['tile-rectangle']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'tile-9slice'}
          onClick={() => activateTool('tile-9slice')}
          title="Tile 9-Slice"
          aria-label="Tile 9-Slice"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['tile-9slice']}</span>
        </button>
        <button
          type="button"
          className="topbar__tool-button"
          data-active={activeTool === 'tile-export'}
          onClick={() => activateTool('tile-export')}
          title="Tile Export"
          aria-label="Tile Export"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['tile-export']}</span>
        </button>
      </div>
      <button
        type="button"
        className="topbar__mode-button"
        onClick={onExitCompact}
        title="Exit compact tools mode"
      >
        Exit Compact
      </button>
    </div>
  </TopbarErrorBoundary>
);

