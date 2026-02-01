import React from 'react';
import type { ToolId } from '@/state/toolStore';
import { TOOL_ICONS } from '@/ui/toolIcons';

type ToolGroupsProps = {
  activeTool: ToolId;
  selectionCount: number;
  activateTool: (tool: ToolId) => void;
};

export const ToolGroups = ({ activeTool, selectionCount, activateTool }: ToolGroupsProps) => (
  <div className="toolbar__tools">
    <div className="toolbar__tool-group">
      <span className="panel__label">Drawing</span>
      <div className="toolbar__tools-grid">
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'pen'}
          onClick={() => activateTool('pen')}
          title="Pen"
          aria-label="Pen"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.pen}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'spray'}
          onClick={() => activateTool('spray')}
          title="Spray"
          aria-label="Spray"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.spray}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'line'}
          onClick={() => activateTool('line')}
          title="Line"
          aria-label="Line"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.line}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'rectangle'}
          onClick={() => activateTool('rectangle')}
          title="Rectangle"
          aria-label="Rectangle"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.rectangle}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'oval'}
          onClick={() => activateTool('oval')}
          title="Oval"
          aria-label="Oval"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.oval}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'fill-bucket'}
          onClick={() => activateTool('fill-bucket')}
          title="Fill"
          aria-label="Fill"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['fill-bucket']}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'text'}
          onClick={() => activateTool('text')}
          title="Text"
          aria-label="Text"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.text}</span>
        </button>
      </div>
    </div>
    <div className="toolbar__tool-group">
      <span className="panel__label">Editing</span>
      <div className="toolbar__tools-grid">
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'reference-handle'}
          onClick={() => activateTool('reference-handle')}
          title="Reference Handle"
          aria-label="Reference Handle"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['reference-handle']}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'eyedropper'}
          onClick={() => activateTool('eyedropper')}
          title="Eyedropper"
          aria-label="Eyedropper"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.eyedropper}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'stamp'}
          onClick={() => activateTool('stamp')}
          title="Stamp"
          aria-label="Stamp"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS.stamp}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'selection-rect'}
          onClick={() => activateTool('selection-rect')}
          title="Selection Rectangle"
          aria-label="Selection Rectangle"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['selection-rect']}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'selection-oval'}
          onClick={() => activateTool('selection-oval')}
          title="Selection Oval"
          aria-label="Selection Oval"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['selection-oval']}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'magic-wand'}
          onClick={() => activateTool('magic-wand')}
          title="Magic Wand"
          aria-label="Magic Wand"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['magic-wand']}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'selection-lasso'}
          onClick={() => activateTool('selection-lasso')}
          title="Selection Lasso"
          aria-label="Selection Lasso"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['selection-lasso']}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'texture-roll'}
          onClick={() => activateTool('texture-roll')}
          title="Scroll Selection"
          aria-label="Scroll Selection"
          disabled={selectionCount === 0}
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['texture-roll']}</span>
        </button>
      </div>
    </div>
    <div className="toolbar__tool-group">
      <span className="panel__label">Tiling</span>
      <div className="toolbar__tools-grid">
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'tile-sampler'}
          onClick={() => activateTool('tile-sampler')}
          title="Tile Sampler"
          aria-label="Tile Sampler"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['tile-sampler']}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'tile-pen'}
          onClick={() => activateTool('tile-pen')}
          title="Tile Pen"
          aria-label="Tile Pen"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['tile-pen']}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'tile-rectangle'}
          onClick={() => activateTool('tile-rectangle')}
          title="Tile Rectangle"
          aria-label="Tile Rectangle"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['tile-rectangle']}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'tile-9slice'}
          onClick={() => activateTool('tile-9slice')}
          title="Tile 9-Slice"
          aria-label="Tile 9-Slice"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['tile-9slice']}</span>
        </button>
        <button
          type="button"
          className="panel__item toolbar__tool-button"
          data-active={activeTool === 'tile-export'}
          onClick={() => activateTool('tile-export')}
          title="Tile Export"
          aria-label="Tile Export"
        >
          <span className="toolbar__tool-icon">{TOOL_ICONS['tile-export']}</span>
        </button>
      </div>
    </div>
  </div>
);

