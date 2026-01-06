import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import { PNG } from 'pngjs';
import { mkdir, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

const BACKGROUND = [20, 24, 36, 255];
const PEN_COLOR = [255, 74, 100, 255];
const REFERENCE_COLOR = [236, 190, 82, 255];
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

test.skip('renders grid lines when camera is in negative world space', async () => {
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

test.skip('minimap shows axes and readout updates', async () => {
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

test.skip('draws pen shapes aligned to the grid', async () => {
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

test.skip('saves and restores a project from disk', async () => {
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

test('saves and restores references from disk', async () => {
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
  const projectPath = join(tempDir, 'reference-test.splash');

  const referencePng = new PNG({ width: 4, height: 4 });
  for (let y = 0; y < referencePng.height; y += 1) {
    for (let x = 0; x < referencePng.width; x += 1) {
      const index = (referencePng.width * y + x) * 4;
      referencePng.data[index] = REFERENCE_COLOR[0];
      referencePng.data[index + 1] = REFERENCE_COLOR[1];
      referencePng.data[index + 2] = REFERENCE_COLOR[2];
      referencePng.data[index + 3] = REFERENCE_COLOR[3];
    }
  }
  const referenceBase64 = PNG.sync.write(referencePng).toString('base64');
  const referenceGridX = 6;
  const referenceGridY = 6;

  await window.evaluate(
    async ({ base64, gridX, gridY }) => {
      const { addReferenceFromFile } = await import('/src/renderer/services/references');
      const { useReferenceStore } = await import('/src/renderer/state/referenceStore');
      const { PIXEL_SIZE } = await import('/src/renderer/core/grid');
      const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
      const file = new File([bytes], 'reference.png', { type: 'image/png' });
      await addReferenceFromFile(file, { x: gridX * PIXEL_SIZE, y: gridY * PIXEL_SIZE });
      const state = useReferenceStore.getState();
      if (state.selectedId) {
        state.updateReference(state.selectedId, { opacity: 1 });
      }
    },
    { base64: referenceBase64, gridX: referenceGridX, gridY: referenceGridY }
  );

  await window.waitForTimeout(200);

  await window.evaluate(async (path) => {
    const module = await import('/src/renderer/services/project');
    const payload = module.buildProjectPayload();
    await window.projectApi.save(payload, path);
  }, projectPath);

  await window.evaluate(async () => {
    const { useReferenceStore } = await import('/src/renderer/state/referenceStore');
    useReferenceStore.getState().clear();
  });

  await window.evaluate(async (path) => {
    const module = await import('/src/renderer/services/project');
    await module.loadProject(path);
  }, projectPath);

  await window.waitForTimeout(200);

  const canvas = window.locator('.viewport canvas');
  const canvasBox = await canvas.boundingBox();
  if (!canvasBox) {
    throw new Error('Viewport canvas not found');
  }

  const shot = await window.screenshot({
    clip: {
      x: Math.floor(canvasBox.x),
      y: Math.floor(canvasBox.y),
      width: Math.floor(canvasBox.width),
      height: Math.floor(canvasBox.height),
    },
  });

  const png = PNG.sync.read(shot);
  const screenX = canvasBox.x + (referenceGridX + 1) * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2;
  const screenY = canvasBox.y + (referenceGridY + 1) * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2;
  const localX = Math.floor(screenX - canvasBox.x);
  const localY = Math.floor(screenY - canvasBox.y);
  const index = (png.width * localY + localX) * 4;

  expect(isApproxColor(png.data, index, REFERENCE_COLOR, 14)).toBe(true);

  await app.close();
  await rm(tempDir, { recursive: true, force: true });
});

test.skip('pen tool draws continuous line segments', async () => {
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

test.skip('pen brush sizes/shapes and line shift snap', async () => {
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
  const toolbar = window.locator('.app__toolbar');
  await toolbar.locator('button:has-text("Pen")').click();

  const canvas = window.locator('.viewport canvas');
  const canvasBox = await canvas.boundingBox();
  if (!canvasBox) {
    throw new Error('Viewport canvas not found');
  }

  const toScreen = (gridX: number, gridY: number) => ({
    x: canvasBox.x + gridX * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
    y: canvasBox.y + gridY * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
  });

  const clickGrid = async (gridX: number, gridY: number) => {
    const screen = toScreen(gridX, gridY);
    await window.mouse.click(screen.x, screen.y);
  };

  const moveOut = async () => {
    await window.mouse.move(canvasBox.x - 20, canvasBox.y - 20);
  };

  await toolbar.locator('button:has-text("fine-point")').click();
  await clickGrid(10, 30);
  await moveOut();

  await toolbar.locator('button .tool-label[aria-label="rectangle"]').click();
  await toolbar.locator('button:has-text("1px")').click();
  await clickGrid(30, 30);
  await toolbar.locator('button:has-text("4px")').click();
  await clickGrid(50, 30);
  await toolbar.locator('button:has-text("8px")').click();
  await clickGrid(80, 30);
  await moveOut();

  await toolbar.locator('button .tool-label[aria-label="circle"]').click();
  await toolbar.locator('button:has-text("1px")').click();
  await clickGrid(10, 50);
  await toolbar.locator('button:has-text("4px")').click();
  await clickGrid(50, 50);
  await toolbar.locator('button:has-text("8px")').click();
  await clickGrid(70, 50);
  await moveOut();

  await toolbar.locator('button:has-text("Line")').click();
  await expect(toolbar.locator('button:has-text("Line")[data-active="true"]')).toBeVisible();
  const start = toScreen(20, 55);
  const end = toScreen(28, 57);
  await window.mouse.move(start.x, start.y);
  await window.mouse.down();
  await window.keyboard.down('Shift');
  await window.mouse.move(end.x, end.y, { steps: 5 });
  await window.mouse.up();
  await window.keyboard.up('Shift');
  await moveOut();

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

  const assertEmpty = (gridX: number, gridY: number) => {
    const screen = toScreen(gridX, gridY);
    const localX = Math.floor(screen.x - canvasBox.x);
    const localY = Math.floor(screen.y - canvasBox.y);
    const index = (png.width * localY + localX) * 4;
    expect(isApproxColor(png.data, index, PEN_COLOR, 12)).toBe(false);
  };

  assertPainted(10, 30);
  assertEmpty(11, 30);

  assertPainted(30, 30);
  assertPainted(31, 31);
  assertEmpty(32, 30);

  assertPainted(50, 30);
  assertPainted(54, 30);
  assertEmpty(55, 30);

  assertPainted(80, 30);
  assertPainted(88, 30);
  assertEmpty(89, 30);

  assertPainted(10, 50);
  assertPainted(11, 50);
  assertEmpty(11, 51);

  assertPainted(50, 50);
  assertPainted(54, 50);
  assertEmpty(54, 54);

  assertPainted(70, 50);
  assertPainted(78, 50);
  assertEmpty(78, 58);

  assertPainted(20, 55);
  assertPainted(28, 55);
  assertEmpty(28, 57);

  await app.close();
});

test('large pen circle draw stays responsive after fill', async () => {
  const app = await electron.launch({
    args: ['.'],
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173',
    },
  });

  const window = await app.firstWindow();
  await window.setViewportSize({ width: 1400, height: 900 });
  await window.waitForSelector('canvas');

  await window.evaluate(() => {
    document.body.style.userSelect = 'none';
  });

  await window.locator('[aria-label="Palette color 44"]').click();
  const toolbar = window.locator('.app__toolbar');
  await toolbar.locator('button:has-text("Pen")').click();
  await toolbar.locator('button .tool-label[aria-label="circle"]').click();
  await toolbar.locator('button:has-text("8px")').click();

  const zoomOut = window.locator('.minimap__controls button').nth(1);
  await zoomOut.click();
  await zoomOut.click();
  await zoomOut.click();
  await expect(window.locator('.minimap__readout')).toContainText('Zoom: 0.40');

  await window.evaluate(async () => {
    const module = await import('/src/renderer/state/pixelStore');
    (window as typeof window & { __pixelStore?: typeof module.usePixelStore }).__pixelStore =
      module.usePixelStore;
  });

  const canvas = window.locator('.viewport canvas');
  const canvasBox = await canvas.boundingBox();
  if (!canvasBox) {
    throw new Error('Viewport canvas not found');
  }

  const centerScreen = {
    x: canvasBox.x + canvasBox.width / 2,
    y: canvasBox.y + canvasBox.height / 2,
  };
  await window.mouse.move(centerScreen.x, centerScreen.y);
  await window.mouse.click(centerScreen.x, centerScreen.y);

  const toScreen = (gridX: number, gridY: number) => ({
    x: canvasBox.x + gridX * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
    y: canvasBox.y + gridY * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
  });

  const gridWidth = Math.floor(canvasBox.width / GRID_PIXEL_SIZE);
  const gridHeight = Math.floor(canvasBox.height / GRID_PIXEL_SIZE);
  const fillSize = {
    width: Math.min(100, gridWidth - 10),
    height: Math.min(70, gridHeight - 10),
  };
  const startGrid = {
    x: Math.max(5, Math.floor((gridWidth - fillSize.width) / 2)),
    y: Math.max(5, Math.floor((gridHeight - fillSize.height) / 2)),
  };
  const startScreen = toScreen(startGrid.x, startGrid.y);
  await window.mouse.move(startScreen.x, startScreen.y);
  await window.mouse.down();

  for (let row = 0; row <= fillSize.height; row += 1) {
    const gridY = startGrid.y + row;
    const gridX = row % 2 === 0 ? startGrid.x + fillSize.width : startGrid.x;
    const point = toScreen(gridX, gridY);
    await window.mouse.move(point.x, point.y, { steps: 4 });
  }

  await window.mouse.up();

  const targetGrid = {
    x: startGrid.x + fillSize.width + 20,
    y: startGrid.y + fillSize.height + 20,
  };

  const { expectedIndex, alreadyPainted } = await window.evaluate(async ({ x, y }) => {
    const store = (window as typeof window & { __pixelStore?: { getState: () => unknown } }).__pixelStore;
    if (!store) {
      throw new Error('Pixel store helper not available');
    }
    const palette = await import('/src/renderer/state/paletteStore');
    const state = store.getState() as { getPixel: (gx: number, gy: number) => number };
    return {
      expectedIndex: palette.usePaletteStore.getState().primaryIndex,
      alreadyPainted: state.getPixel(x, y) !== 0,
    };
  }, targetGrid);

  expect(alreadyPainted).toBe(false);

  const targetScreen = toScreen(targetGrid.x, targetGrid.y);
  const startTime = Date.now();
  await window.mouse.click(targetScreen.x, targetScreen.y);

  await window.waitForFunction(
    ({ x, y, expected }) => {
      const store = (window as typeof window & { __pixelStore?: { getState: () => unknown } }).__pixelStore;
      if (!store) {
        return false;
      }
      const state = store.getState() as { getPixel: (gx: number, gy: number) => number };
      return state.getPixel(x, y) === expected;
    },
    { x: targetGrid.x, y: targetGrid.y, expected: expectedIndex },
    { timeout: 1000 }
  );

  const elapsed = Date.now() - startTime;
  expect(elapsed).toBeLessThan(1000);

  await app.close();
});

test('selection rectangle adds and removes selection mask', async () => {
  const app = await electron.launch({
    args: ['.'],
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173',
    },
  });

  const window = await app.firstWindow();
  await window.setViewportSize({ width: 1200, height: 800 });
  await window.waitForSelector('canvas');

  await window.locator('.app__toolbar button:has-text("Select")').click();
  await window.evaluate(async () => {
    const module = await import('/src/renderer/state/toolStore');
    module.useToolStore.getState().setActiveTool('selection-rect');
  });
  await window.evaluate(async () => {
    const module = await import('/src/renderer/state/viewportStore');
    module.useViewportStore.getState().setCamera({ x: 0, y: 0, zoom: 1 });
  });

  const canvas = window.locator('.viewport canvas');
  const canvasBox = await canvas.boundingBox();
  if (!canvasBox) {
    throw new Error('Viewport canvas not found');
  }

  const toScreen = (gridX: number, gridY: number) => ({
    x: canvasBox.x + gridX * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
    y: canvasBox.y + gridY * GRID_PIXEL_SIZE + GRID_PIXEL_SIZE / 2,
  });

  await window.evaluate(async () => {
    const module = await import('/src/renderer/state/selectionStore');
    (window as typeof window & { __selectionStore?: typeof module.useSelectionStore }).__selectionStore =
      module.useSelectionStore;
  });

  const storeCheck = await window.evaluate(() => {
    const store = (window as typeof window & { __selectionStore?: { getState: () => unknown } }).__selectionStore;
    if (!store) {
      throw new Error('Selection store helper not available');
    }
    const state = store.getState() as {
      setSelections: (pixels: Array<{ x: number; y: number; selected: boolean }>) => void;
      isSelected: (x: number, y: number) => boolean;
      clear: () => void;
    };
    state.clear();
    state.setSelections([{ x: 2, y: 2, selected: true }]);
    return state.isSelected(2, 2);
  });
  expect(storeCheck).toBe(true);

  const start = toScreen(6, 6);
  const end = toScreen(14, 12);
  await window.mouse.move(start.x, start.y);
  await window.mouse.down();
  await window.mouse.move(end.x, end.y, { steps: 4 });
  await window.mouse.up();

  await window.waitForFunction(() => {
    const store = (window as typeof window & { __selectionStore?: { getState: () => unknown } }).__selectionStore;
    if (!store) {
      return false;
    }
    const state = store.getState() as { isSelected: (x: number, y: number) => boolean };
    return state.isSelected(10, 9);
  });

  const addResult = await window.evaluate(() => {
    const store = (window as typeof window & { __selectionStore?: { getState: () => unknown } }).__selectionStore;
    if (!store) {
      throw new Error('Selection store helper not available');
    }
    const state = store.getState() as { isSelected: (x: number, y: number) => boolean };
    return {
      inside: state.isSelected(10, 9),
      outside: state.isSelected(4, 4),
    };
  });

  expect(addResult.inside).toBe(true);
  expect(addResult.outside).toBe(false);

  const removeStart = toScreen(8, 8);
  const removeEnd = toScreen(12, 10);
  await window.mouse.move(removeStart.x, removeStart.y);
  await window.mouse.down({ button: 'right' });
  await window.mouse.move(removeEnd.x, removeEnd.y, { steps: 3 });
  await window.mouse.up({ button: 'right' });

  await window.waitForFunction(() => {
    const store = (window as typeof window & { __selectionStore?: { getState: () => unknown } }).__selectionStore;
    if (!store) {
      return false;
    }
    const state = store.getState() as { isSelected: (x: number, y: number) => boolean };
    return !state.isSelected(10, 9) && state.isSelected(13, 11);
  });

  const removeResult = await window.evaluate(() => {
    const store = (window as typeof window & { __selectionStore?: { getState: () => unknown } }).__selectionStore;
    if (!store) {
      throw new Error('Selection store helper not available');
    }
    const state = store.getState() as { isSelected: (x: number, y: number) => boolean };
    return {
      removed: state.isSelected(10, 9),
      stillSelected: state.isSelected(13, 11),
    };
  });

  expect(removeResult.removed).toBe(false);
  expect(removeResult.stillSelected).toBe(true);

  await app.close();
});
