export type CursorState = {
  screenX: number;
  screenY: number;
  canvasX: number;
  canvasY: number;
  primary: boolean;
  alt: boolean;
  ctrl: boolean;
  shift: boolean;
};

export type ToolEvent = 'hover' | 'begin' | 'move' | 'end' | 'cancel';

export interface Tool {
  id: string;
  onHover?: (cursor: CursorState) => void;
  onBegin?: (cursor: CursorState) => void;
  onMove?: (cursor: CursorState) => void;
  onEnd?: (cursor: CursorState) => void;
  onCancel?: (cursor: CursorState) => void;
}

export class ToolController {
  private activeTool: Tool | null = null;

  setTool(tool: Tool | null) {
    this.activeTool = tool;
  }

  handleEvent(event: ToolEvent, cursor: CursorState) {
    if (!this.activeTool) {
      return;
    }

    switch (event) {
      case 'hover':
        this.activeTool.onHover?.(cursor);
        break;
      case 'begin':
        this.activeTool.onBegin?.(cursor);
        break;
      case 'move':
        this.activeTool.onMove?.(cursor);
        break;
      case 'end':
        this.activeTool.onEnd?.(cursor);
        break;
      case 'cancel':
        this.activeTool.onCancel?.(cursor);
        break;
      default:
        break;
    }
  }
}
