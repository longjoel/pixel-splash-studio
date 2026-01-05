import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import { PNG } from 'pngjs';
import { mkdir, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

const BACKGROUND = [20, 24, 36, 255];
const PEN_COLOR = [255, 74, 100, 255];
const GRID_PIXEL_SIZE = 12;

const isNear = (value: number, target: number, tolerance: number) =>
  Math.abs(value - target) <= tolerance;

const isApproxColor = (data: Uint8Array, index: number, color: number[], tolerance = 6) => {
  return (
    isNear(data[index], color[0], tolerance) &&
    isNear(data[index + 1], color[1], tolerance) &&
    isNear(data[index + 2], color[2], tolerance) &&
    isNear(data[index + 3], color[3], tolerance)
  );
};

const MIN_WORLD_SIZE = 512;

const getWorldBounds = (camera: { x: number; y: number; zoom: number }, viewSize: { width: number; height: number }) => {
  let minX = -MIN_WORLD_SIZE / 2;
  let minY = -MIN_WORLD_SIZE / 2;
  let maxX = MIN_WORLD_SIZE / 2;
  let maxY = MIN_WORLD_SIZE / 2;

  const viewWidth = viewSize.width / camera.zoom;
  const viewHeight = viewSize.height / camera.zoom;
  minX = Math.min(minX, camera.x);
  minY = Math.min(minY, camera.y);
  maxX = Math.max(maxX, camera.x + viewWidth);
  maxY = Math.max(maxY, camera.y + viewHeight);

  const width = maxX - minX;
  const height = maxY - minY;

  return { minX, minY, maxX, maxY };
};

test('renders grid lines when camera is in negative world space', async () => {
  const app = await electron.launch({
    args: ['.'],
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173',
    },
  });

  const window = await app.firstWindow();
  await window.waitForSelector('canvas');

  for (let i = 0; i < 5; i += 1) {
    await window.locator('.minimap__controls button').nth(0).click();
  }

  const viewportSize = await window.evaluate(() => {
    const viewport = document.querySelector('.viewport');
    if (!viewport) {
      throw new Error('Viewport not found');
    }
    return { width: viewport.clientWidth, height: viewport.clientHeight };
  });

  const minimapCanvas = window.locator('.minimap__canvas canvas');
  const minimapBox = await minimapCanvas.boundingBox();
  if (!minimapBox) {
    throw new Error('Minimap canvas not found');
  }

  const zoom = 2;
  const targetCamera = { x: -100, y: -100 };
  const targetCenter = {
    x: targetCamera.x + viewportSize.width / (2 * zoom),
    y: targetCamera.y + viewportSize.height / (2 * zoom),
  };

  const camera = { x: 0, y: 0, zoom: 2 };
  const bounds = getWorldBounds(camera, viewportSize);
  const worldWidth = bounds.maxX - bounds.minX;
  const worldHeight = bounds.maxY - bounds.minY;
  const scale = Math.min(minimapBox.width / worldWidth, minimapBox.height / worldHeight);
  const offsetX = (minimapBox.width - worldWidth * scale) / 2 - bounds.minX * scale;
  const offsetY = (minimapBox.height - worldHeight * scale) / 2 - bounds.minY * scale;

  const clickX = minimapBox.x + offsetX + targetCenter.x * scale;
  const clickY = minimapBox.y + offsetY + targetCenter.y * scale;

  await window.mouse.move(clickX, clickY);
  await window.mouse.down();
  await window.mouse.up();
  await window.waitForTimeout(200);

  const viewportCanvas = window.locator('.viewport canvas');
  const viewportBox = await viewportCanvas.boundingBox();
  if (!viewportBox) {
    throw new Error('Viewport canvas not found');
  }

  const screenshot = await window.screenshot({
    clip: {
      x: Math.floor(viewportBox.x),
      y: Math.floor(viewportBox.y),
      width: Math.floor(viewportBox.width),
      height: Math.floor(viewportBox.height),
    },
  });
  const png = PNG.sync.read(screenshot);

  let foundGridLine = false;
  const regionWidth = Math.min(30, png.width);
  const regionHeight = Math.min(30, png.height);

  for (let y = 0; y < regionHeight && !foundGridLine; y += 1) {
    for (let x = 0; x < regionWidth && !foundGridLine; x += 1) {
      const index = (png.width * y + x) * 4;
      const red = png.data[index];
      const green = png.data[index + 1];
      const blue = png.data[index + 2];

      const isBackground =
        red === BACKGROUND[0] && green === BACKGROUND[1] && blue === BACKGROUND[2];

      if (!isBackground) {
        foundGridLine = true;
      }
    }
  }

  expect(foundGridLine).toBe(true);

  await app.close();
});

test('minimap shows axes and readout updates', async () => {
  const app = await electron.launch({
    args: ['.'],
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173',
    },
  });

  const window = await app.firstWindow();
  await window.waitForSelector('.minimap__canvas canvas');

  const readout = window.locator('.minimap__readout');
  await expect(readout).toContainText('X: 0');
  await expect(readout).toContainText('Y: 0');
  await expect(readout).toContainText('Zoom: 1.00');

  await window.locator('.minimap__controls button').nth(0).click();
  await expect(readout).toContainText('Zoom: 1.20');

  const minimapCanvas = window.locator('.minimap__canvas canvas');
  const minimapBox = await minimapCanvas.boundingBox();
  if (!minimapBox) {
    throw new Error('Minimap canvas not found');
  }

  const screenshot = await window.screenshot({
    clip: {
      x: Math.floor(minimapBox.x),
      y: Math.floor(minimapBox.y),
      width: Math.floor(minimapBox.width),
      height: Math.floor(minimapBox.height),
    },
  });
  const png = PNG.sync.read(screenshot);
  let foundAxis = false;
  for (let y = 0; y < png.height && !foundAxis; y += 1) {
    for (let x = 0; x < png.width && !foundAxis; x += 1) {
      const index = (png.width * y + x) * 4;
      if (isApproxColor(png.data, index, [245, 197, 66, 255], 10)) {
        foundAxis = true;
      }
    }
  }

  expect(foundAxis).toBe(true);

  await app.close();
});

test('draws pen shapes aligned to the grid', async () => {
  const app = await electron.launch({
    args: ['.'],
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173',
    },
  });

  const window = await app.firstWindow();
  await window.waitForSelector('canvas');

  await window.locator('[aria-label="Palette color 44"]').click();

  const canvas = window.locator('.viewport canvas');
  const canvasBox = await canvas.boundingBox();
  if (!canvasBox) {
    throw new Error('Viewport canvas not found');
  }

  const toScreen = (gridX: number, gridY: number) => ({
    x: canvasBox.x + gridX * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
    y: canvasBox.y + gridY * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
  });

  const drawPoints = async (points: Array<[number, number]>) => {
    for (const [x, y] of points) {
      const screen = toScreen(x, y);
      await window.mouse.click(screen.x, screen.y);
    }
  };

  const diamondCenter: [number, number] = [12, 26];
  const diamondPoints: Array<[number, number]> = [];
  const diamondRadius = 3;
  for (let dy = -diamondRadius; dy <= diamondRadius; dy += 1) {
    const width = diamondRadius - Math.abs(dy);
    for (let dx = -width; dx <= width; dx += 1) {
      diamondPoints.push([diamondCenter[0] + dx, diamondCenter[1] + dy]);
    }
  }

  const heartOffset: [number, number] = [24, 24];
  const heartPoints: Array<[number, number]> = [
    [1, 0], [3, 0],
    [0, 1], [2, 1], [4, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
    [1, 3], [2, 3], [3, 3],
    [2, 4],
  ].map(([x, y]) => [x + heartOffset[0], y + heartOffset[1]]);

  await drawPoints(diamondPoints);
  await drawPoints(heartPoints);
  await window.waitForTimeout(200);

  const screenshot = await window.screenshot({
    clip: {
      x: Math.floor(canvasBox.x),
      y: Math.floor(canvasBox.y),
      width: Math.floor(canvasBox.width),
      height: Math.floor(canvasBox.height),
    },
  });
  const png = PNG.sync.read(screenshot);

  const assertPainted = (gridX: number, gridY: number) => {
    const screen = toScreen(gridX, gridY);
    const localX = Math.floor(screen.x - canvasBox.x);
    const localY = Math.floor(screen.y - canvasBox.y);
    const index = (png.width * localY + localX) * 4;
    expect(isApproxColor(png.data, index, PEN_COLOR, 12)).toBe(true);
  };

  const assertEmpty = (gridX: number, gridY: number) => {
    const screen = toScreen(gridX, gridY);
    const localX = Math.floor(screen.x - canvasBox.x);
    const localY = Math.floor(screen.y - canvasBox.y);
    const index = (png.width * localY + localX) * 4;
    expect(isApproxColor(png.data, index, PEN_COLOR, 12)).toBe(false);
  };

  assertPainted(diamondCenter[0], diamondCenter[1]);
  assertPainted(heartOffset[0] + 2, heartOffset[1] + 2);
  assertEmpty(diamondCenter[0] + diamondRadius + 2, diamondCenter[1]);
  assertEmpty(heartOffset[0] + 7, heartOffset[1] + 2);

  await app.close();
});

test('saves and restores a project from disk', async () => {
  const app = await electron.launch({
    args: ['.'],
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173',
    },
  });

  const window = await app.firstWindow();
  await window.waitForSelector('canvas');

  const tempDir = join(tmpdir(), `pixel-splash-${Date.now()}`);
  await mkdir(tempDir, { recursive: true });
  const projectPath = join(tempDir, 'save-test.splash');

  await window.locator('[aria-label="Palette color 44"]').click();

  const canvas = window.locator('.viewport canvas');
  const canvasBox = await canvas.boundingBox();
  if (!canvasBox) {
    throw new Error('Viewport canvas not found');
  }

  const toScreen = (gridX: number, gridY: number) => ({
    x: canvasBox.x + gridX * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
    y: canvasBox.y + gridY * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
  });

  const drawPoints = async (points: Array<[number, number]>) => {
    for (const [x, y] of points) {
      const screen = toScreen(x, y);
      await window.mouse.click(screen.x, screen.y);
    }
  };

  const clearHover = async () => {
    await window.mouse.move(canvasBox.x - 20, canvasBox.y - 20);
    await window.waitForTimeout(50);
  };

  await drawPoints([
    [10, 18],
    [11, 18],
    [12, 18],
  ]);
  await window.waitForTimeout(100);
  await clearHover();

  const shot1 = await window.screenshot({
    clip: {
      x: Math.floor(canvasBox.x),
      y: Math.floor(canvasBox.y),
      width: Math.floor(canvasBox.width),
      height: Math.floor(canvasBox.height),
    },
  });

  const payload = await window.evaluate(async () => {
    const module = await import('/src/renderer/services/project');
    return module.buildProjectPayload();
  });

  await window.evaluate(
    async ({ data, path }) => {
      await window.projectApi.save(data, path);
    },
    { data: payload, path: projectPath }
  );

  await drawPoints([
    [20, 22],
    [21, 22],
    [22, 22],
  ]);
  await window.waitForTimeout(100);
  await clearHover();

  const shot2 = await window.screenshot({
    clip: {
      x: Math.floor(canvasBox.x),
      y: Math.floor(canvasBox.y),
      width: Math.floor(canvasBox.width),
      height: Math.floor(canvasBox.height),
    },
  });

  await window.evaluate(async (path) => {
    const module = await import('/src/renderer/services/project');
    await module.loadProject(path);
  }, projectPath);

  await window.waitForTimeout(200);
  await clearHover();

  const shot3 = await window.screenshot({
    clip: {
      x: Math.floor(canvasBox.x),
      y: Math.floor(canvasBox.y),
      width: Math.floor(canvasBox.width),
      height: Math.floor(canvasBox.height),
    },
  });

  const png1 = PNG.sync.read(shot1);
  const png2 = PNG.sync.read(shot2);
  const png3 = PNG.sync.read(shot3);

  const pixelsEqual = (a: PNG, b: PNG) => {
    if (a.width !== b.width || a.height !== b.height || a.data.length !== b.data.length) {
      return false;
    }
    for (let i = 0; i < a.data.length; i += 1) {
      if (a.data[i] !== b.data[i]) {
        return false;
      }
    }
    return true;
  };

  expect(pixelsEqual(png1, png3)).toBe(true);
  expect(pixelsEqual(png1, png2)).toBe(false);
  expect(pixelsEqual(png2, png3)).toBe(false);

  await app.close();
  await rm(tempDir, { recursive: true, force: true });
});

test('pen tool draws continuous line segments', async () => {
  const app = await electron.launch({
    args: ['.'],
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173',
    },
  });

  const window = await app.firstWindow();
  await window.waitForSelector('canvas');

  await window.locator('[aria-label="Palette color 44"]').click();

  const canvas = window.locator('.viewport canvas');
  const canvasBox = await canvas.boundingBox();
  if (!canvasBox) {
    throw new Error('Viewport canvas not found');
  }

  const toScreen = (gridX: number, gridY: number) => ({
    x: canvasBox.x + gridX * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
    y: canvasBox.y + gridY * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
  });

  const start = toScreen(8, 28);
  const end = toScreen(20, 28);
  await window.mouse.move(start.x, start.y);
  await window.mouse.down();
  await window.mouse.move(end.x, end.y, { steps: 5 });
  await window.mouse.up();
  await window.waitForTimeout(150);

  const screenshot = await window.screenshot({
    clip: {
      x: Math.floor(canvasBox.x),
      y: Math.floor(canvasBox.y),
      width: Math.floor(canvasBox.width),
      height: Math.floor(canvasBox.height),
    },
  });
  const png = PNG.sync.read(screenshot);

  const assertPainted = (gridX: number, gridY: number) => {
    const screen = toScreen(gridX, gridY);
    const localX = Math.floor(screen.x - canvasBox.x);
    const localY = Math.floor(screen.y - canvasBox.y);
    const index = (png.width * localY + localX) * 4;
    expect(isApproxColor(png.data, index, PEN_COLOR, 12)).toBe(true);
  };

  for (let x = 8; x <= 20; x += 1) {
    assertPainted(x, 28);
  }

  await app.close();
});
