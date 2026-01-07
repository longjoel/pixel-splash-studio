import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import { PNG } from 'pngjs';
import { mkdir, readFile, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { E2E_PEN_COLOR } from '../../src/constants';

const waitForFile = async (filePath: string, attempts = 30, delayMs = 100) => {
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await readFile(filePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  throw new Error(`Timed out waiting for file: ${filePath}`);
};

test('exports selection as png', async () => {
  const tempDir = join(tmpdir(), `pixel-splash-export-${Date.now()}`);
  await mkdir(tempDir, { recursive: true });
  const exportPath = join(tempDir, 'selection.png');

  const app = await electron.launch({
    args: ['.'],
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173',
      PIXEL_SPLASH_E2E_EXPORT_PATH: exportPath,
    },
  });

  const window = await app.firstWindow();
  await window.waitForSelector('canvas');

  await window.evaluate(async () => {
    const { usePixelStore } = await import('/src/renderer/state/pixelStore');
    const { useSelectionStore } = await import('/src/renderer/state/selectionStore');
    usePixelStore.getState().setPixel(10, 10, 44);
    const pixels = [];
    for (let y = 9; y <= 11; y += 1) {
      for (let x = 9; x <= 11; x += 1) {
        pixels.push({ x, y, selected: true });
      }
    }
    useSelectionStore.getState().setSelections(pixels);
  });

  await expect.poll(async () => {
    return window.evaluate(async () => {
      const { useSelectionStore } = await import('/src/renderer/state/selectionStore');
      return useSelectionStore.getState().selectedCount;
    });
  }).toBeGreaterThan(0);

  const exportButton = window.getByRole('button', { name: 'Export PNG' });
  await expect(exportButton).toBeVisible();
  await exportButton.click();

  const fileBytes = await waitForFile(exportPath);
  const png = PNG.sync.read(fileBytes);

  expect(png.width).toBe(3);
  expect(png.height).toBe(3);

  const index = (1 * png.width + 1) * 4;
  expect(png.data[index]).toBe(E2E_PEN_COLOR[0]);
  expect(png.data[index + 1]).toBe(E2E_PEN_COLOR[1]);
  expect(png.data[index + 2]).toBe(E2E_PEN_COLOR[2]);
  expect(png.data[index + 3]).toBe(E2E_PEN_COLOR[3]);

  await app.close();
  await rm(tempDir, { recursive: true, force: true });
});
