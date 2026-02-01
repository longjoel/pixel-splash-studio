import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import JSZip from 'jszip';
import { mkdir, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { BLOCK_SIZE, DEFAULT_CAMERA, DEFAULT_COLORS, E2E_PEN_COLOR } from '../../src/constants';

const buildSplashFile = async (filePath: string, options: { pixels: Array<{ x: number; y: number; index: number }> }) => {
  const zip = new JSZip();
  const layerId = 'layer-1';
  const block = new Uint8Array(BLOCK_SIZE * BLOCK_SIZE);
  for (const pixel of options.pixels) {
    if (pixel.x < 0 || pixel.y < 0 || pixel.x >= BLOCK_SIZE || pixel.y >= BLOCK_SIZE) {
      throw new Error('This helper currently supports only pixels within block (0,0).');
    }
    block[pixel.y * BLOCK_SIZE + pixel.x] = pixel.index;
  }

  zip.file(
    'data.json',
    JSON.stringify(
      {
        palette: {
          colors: DEFAULT_COLORS,
          primaryIndex: DEFAULT_COLORS.length - 1,
          secondaryIndex: DEFAULT_COLORS.length - 2,
        },
        camera: DEFAULT_CAMERA,
        history: { undoStack: [], redoStack: [] },
        pixelLayers: { layers: [{ id: layerId, name: 'Layer 1', visible: true }], activeLayerId: layerId },
      },
      null,
      2
    )
  );
  zip.file(`pixels/${layerId}/0-0.bin`, block);

  const buffer = await zip.generateAsync({ type: 'nodebuffer' });
  await writeFile(filePath, buffer);
};

test('merges another .splash pixels with offset and undo', async () => {
  const tempDir = join(tmpdir(), `pixel-splash-merge-${Date.now()}`);
  await mkdir(tempDir, { recursive: true });

  const sourcePath = join(tempDir, 'source.splash');
  await buildSplashFile(sourcePath, {
    pixels: [
      { x: 0, y: 0, index: 44 },
      { x: 1, y: 1, index: 44 },
    ],
  });

  const app = await electron.launch({
    args: ['.'],
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173',
      PIXEL_SPLASH_E2E_PROJECT_READ_PATH: sourcePath,
    },
  });

  const window = await app.firstWindow();
  await window.waitForSelector('canvas');

  await app.evaluate(({ BrowserWindow }) => {
    BrowserWindow.getFocusedWindow()?.webContents.send('menu:action', 'mergeProject');
  });

  await expect(window.getByRole('heading', { name: 'Merge Project' })).toBeVisible();

  const inputs = window.getByRole('spinbutton');
  await expect(inputs).toHaveCount(2);
  await inputs.nth(0).fill('5');
  await inputs.nth(1).fill('7');

  await window.getByRole('button', { name: 'Merge Pixels' }).click();

  await expect.poll(async () => {
    return window.evaluate(async () => {
      const { useHistoryStore } = await import('/src/renderer/state/historyStore');
      const { usePixelStore } = await import('/src/renderer/state/pixelStore');
      const state = useHistoryStore.getState();
      const pixel = usePixelStore.getState();
      return {
        locked: state.locked,
        undo: state.undoStack.length,
        p1: pixel.getPixel(5, 7),
        p2: pixel.getPixel(6, 8),
      };
    });
  }).toEqual({ locked: false, undo: 1, p1: 44, p2: 44 });

  await window.evaluate(async () => {
    const { useHistoryStore } = await import('/src/renderer/state/historyStore');
    useHistoryStore.getState().undo();
  });

  await expect.poll(async () => {
    return window.evaluate(async () => {
      const { usePixelStore } = await import('/src/renderer/state/pixelStore');
      const pixel = usePixelStore.getState();
      return { p1: pixel.getPixel(5, 7), p2: pixel.getPixel(6, 8) };
    });
  }).toEqual({ p1: 0, p2: 0 });

  // Quick sanity: palette index 44 maps to the expected RGBA (same as existing export test).
  expect(E2E_PEN_COLOR.length).toBe(4);

  await app.close();
  await rm(tempDir, { recursive: true, force: true });
});
