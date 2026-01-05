export type Point = {
  x: number;
  y: number;
};

export type Camera = {
  x: number;
  y: number;
  zoom: number;
};

export class Viewport {
  width: number;
  height: number;
  camera: Camera;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.camera = { x: 0, y: 0, zoom: 1 };
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setCamera(camera: Partial<Camera>) {
    this.camera = { ...this.camera, ...camera };
  }

  screenToCanvas(point: Point): Point {
    return {
      x: point.x / this.camera.zoom + this.camera.x,
      y: point.y / this.camera.zoom + this.camera.y,
    };
  }

  canvasToScreen(point: Point): Point {
    return {
      x: (point.x - this.camera.x) * this.camera.zoom,
      y: (point.y - this.camera.y) * this.camera.zoom,
    };
  }
}
