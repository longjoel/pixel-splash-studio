import { describe, it, expect } from 'vitest';
import { Viewport } from '@/core/viewport';

describe('Viewport', () => {
  it('converts between screen and canvas coordinates with camera offset', () => {
    const viewport = new Viewport(800, 600);
    viewport.setCamera({ x: 10, y: 20, zoom: 2 });

    const canvasPoint = viewport.screenToCanvas({ x: 100, y: 50 });
    expect(canvasPoint).toEqual({ x: 60, y: 45 });

    const screenPoint = viewport.canvasToScreen({ x: 60, y: 45 });
    expect(screenPoint).toEqual({ x: 100, y: 50 });
  });
});
