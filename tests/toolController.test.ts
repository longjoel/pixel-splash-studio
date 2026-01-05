import { describe, it, expect } from 'vitest';
import { CursorState, ToolController } from '@/core/tools';

const makeCursor = (): CursorState => ({
  screenX: 10,
  screenY: 20,
  canvasX: 1,
  canvasY: 2,
  primary: true,
  secondary: false,
  alt: false,
  ctrl: false,
  shift: false,
});

describe('ToolController', () => {
  it('forwards events to the active tool in order', () => {
    const events: string[] = [];
    const controller = new ToolController();

    controller.setTool({
      id: 'mock',
      onBegin: () => events.push('begin'),
      onMove: () => events.push('move'),
      onEnd: () => events.push('end'),
    });

    const cursor = makeCursor();
    controller.handleEvent('begin', cursor);
    controller.handleEvent('move', cursor);
    controller.handleEvent('end', cursor);

    expect(events).toEqual(['begin', 'move', 'end']);
  });

  it('ignores events when no tool is active', () => {
    const controller = new ToolController();
    const cursor = makeCursor();

    expect(() => controller.handleEvent('begin', cursor)).not.toThrow();
  });
});
