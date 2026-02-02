import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

test('captures drawing tool tutorial screenshots', async () => {
  test.setTimeout(120_000);
  const outDir = join(process.cwd(), 'docs', 'tutorials');
  await mkdir(outDir, { recursive: true });

  const app = await electron.launch({
    args: ['.'],
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173',
    },
  });

  const window = await app.firstWindow();
  await window.waitForSelector('.viewport canvas');

  await window.waitForTimeout(2200);
  const save = async (filename: string) => {
    await window.waitForTimeout(160);
    const bytes = await window.screenshot();
    await writeFile(join(outDir, filename), bytes);
  };

  const resetScene = async () => {
    await window.evaluate(
      async () => {
        const { newProject } = await import('/src/renderer/services/project');
        const { useViewportStore } = await import('/src/renderer/state/viewportStore');
        const { useBrushStore } = await import('/src/renderer/state/brushStore');
        const { useRectangleStore } = await import('/src/renderer/state/rectangleStore');
        const { useFillBucketStore } = await import('/src/renderer/state/fillBucketStore');
        const { usePaletteStore } = await import('/src/renderer/state/paletteStore');
        const { useLayerVisibilityStore } = await import('/src/renderer/state/layerVisibilityStore');

        newProject();
        useBrushStore.getState().setShape('point');
        useBrushStore.getState().setSize(1);
        useRectangleStore.getState().setMode('filled');
        useFillBucketStore.getState().setMode('color');
        usePaletteStore.getState().setSelectedIndices([44]);
        useLayerVisibilityStore.getState().setShowPixelLayer(true);

        const start = Date.now();
        while (
          (() => {
            const viewport = useViewportStore.getState();
            return viewport.width === 0 || viewport.height === 0;
          })() &&
          Date.now() - start < 2000
        ) {
          await new Promise((resolve) => setTimeout(resolve, 20));
        }

        useViewportStore.getState().resetCamera();
      },
      undefined
    );
  };

  const selectTool = async (ariaLabel: string, expectedTitle: string) => {
    await window.locator(`button[aria-label="${ariaLabel}"]`).click();
    await expect(window.locator('.panel__header h2')).toHaveText(expectedTitle);
  };

  // 01: Pen simple stroke (simulate pen result)
  await resetScene();
  await selectTool('Pen', 'Pen');
  await window.evaluate(async () => {
    const { usePixelStore } = await import('/src/renderer/state/pixelStore');
    const pixelStore = usePixelStore.getState();
    const pixels: Array<{ x: number; y: number; paletteIndex: number }> = [];
    for (let x = -18; x <= 18; x += 1) {
      pixels.push({ x, y: -12, paletteIndex: 44 });
    }
    for (let t = -12; t <= 12; t += 1) {
      pixels.push({ x: -18 + t + 12, y: -2 + t, paletteIndex: 44 });
    }
    pixelStore.setPixels(pixels);
  });
  await expect.poll(async () => {
    return window.evaluate(async () => {
      const { usePixelStore } = await import('/src/renderer/state/pixelStore');
      const store = usePixelStore.getState();
      const active =
        store.layers.find((layer) => layer.id === store.activeLayerId) ?? store.layers[0];
      return active?.store.getBlocks().length ?? 0;
    });
  }).toBeGreaterThan(0);
  await save('drawing-tools-01-pen.png');

  // 02: Pen options (square brush, 4px) — show thicker “stamp-like” stroke
  await resetScene();
  await selectTool('Pen', 'Pen');
  await window.evaluate(async () => {
    const { useBrushStore } = await import('/src/renderer/state/brushStore');
    const { usePixelStore } = await import('/src/renderer/state/pixelStore');
    useBrushStore.getState().setShape('square');
    useBrushStore.getState().setSize(4);

    const pixelStore = usePixelStore.getState();
    const pixels: Array<{ x: number; y: number; paletteIndex: number }> = [];
    const paintSquare = (cx: number, cy: number, half: number) => {
      for (let y = cy - half; y <= cy + half; y += 1) {
        for (let x = cx - half; x <= cx + half; x += 1) {
          pixels.push({ x, y, paletteIndex: 44 });
        }
      }
    };
    for (let i = 0; i < 7; i += 1) {
      paintSquare(8 + i * 3, -10, 2);
    }
    for (let i = 0; i < 7; i += 1) {
      paintSquare(8 + i * 3, 10 + i * 1, 2);
    }
    pixelStore.setPixels(pixels);
  });
  await expect.poll(async () => {
    return window.evaluate(async () => {
      const { usePixelStore } = await import('/src/renderer/state/pixelStore');
      const store = usePixelStore.getState();
      const active =
        store.layers.find((layer) => layer.id === store.activeLayerId) ?? store.layers[0];
      return active?.store.getBlocks().length ?? 0;
    });
  }).toBeGreaterThan(0);
  await save('drawing-tools-02-pen-options.png');

  // 03: Line tool (simulate a snapped line)
  await resetScene();
  await selectTool('Line', 'Line');
  await window.evaluate(async () => {
    const { usePixelStore } = await import('/src/renderer/state/pixelStore');
    const pixelStore = usePixelStore.getState();
    const pixels: Array<{ x: number; y: number; paletteIndex: number }> = [];
    for (let t = -16; t <= 16; t += 1) {
      pixels.push({ x: -14 + t, y: 2 + t, paletteIndex: 44 });
    }
    pixelStore.setPixels(pixels);
  });
  await expect.poll(async () => {
    return window.evaluate(async () => {
      const { usePixelStore } = await import('/src/renderer/state/pixelStore');
      const store = usePixelStore.getState();
      const active =
        store.layers.find((layer) => layer.id === store.activeLayerId) ?? store.layers[0];
      return active?.store.getBlocks().length ?? 0;
    });
  }).toBeGreaterThan(0);
  await save('drawing-tools-03-line.png');

  // 04: Rectangle tool (filled)
  await resetScene();
  await selectTool('Rectangle', 'Rectangle');
  await window.evaluate(async () => {
    const { useRectangleStore } = await import('/src/renderer/state/rectangleStore');
    const { usePixelStore } = await import('/src/renderer/state/pixelStore');
    useRectangleStore.getState().setMode('filled');
    const pixelStore = usePixelStore.getState();
    const pixels: Array<{ x: number; y: number; paletteIndex: number }> = [];
    for (let y = 2; y <= 18; y += 1) {
      for (let x = 10; x <= 30; x += 1) {
        pixels.push({ x, y, paletteIndex: 44 });
      }
    }
    pixelStore.setPixels(pixels);
  });
  await expect.poll(async () => {
    return window.evaluate(async () => {
      const { usePixelStore } = await import('/src/renderer/state/pixelStore');
      const store = usePixelStore.getState();
      const active =
        store.layers.find((layer) => layer.id === store.activeLayerId) ?? store.layers[0];
      return active?.store.getBlocks().length ?? 0;
    });
  }).toBeGreaterThan(0);
  await save('drawing-tools-04-rectangle.png');

  // 05: Fill bucket (color fill) — show a bounded region filled
  await resetScene();
  await selectTool('Fill', 'Fill');
  await window.evaluate(async () => {
    const { useFillBucketStore } = await import('/src/renderer/state/fillBucketStore');
    const { usePixelStore } = await import('/src/renderer/state/pixelStore');
    useFillBucketStore.getState().setMode('color');
    const pixelStore = usePixelStore.getState();
    const pixels: Array<{ x: number; y: number; paletteIndex: number }> = [];
    const borderIndex = 12;
    const left = -30;
    const right = -8;
    const top = 6;
    const bottom = 22;
    for (let x = left; x <= right; x += 1) {
      pixels.push({ x, y: top, paletteIndex: borderIndex });
      pixels.push({ x, y: bottom, paletteIndex: borderIndex });
    }
    for (let y = top; y <= bottom; y += 1) {
      pixels.push({ x: left, y, paletteIndex: borderIndex });
      pixels.push({ x: right, y, paletteIndex: borderIndex });
    }
    for (let y = top + 1; y <= bottom - 1; y += 1) {
      for (let x = left + 1; x <= right - 1; x += 1) {
        pixels.push({ x, y, paletteIndex: 44 });
      }
    }
    pixelStore.setPixels(pixels);
  });
  await expect.poll(async () => {
    return window.evaluate(async () => {
      const { usePixelStore } = await import('/src/renderer/state/pixelStore');
      const store = usePixelStore.getState();
      const active =
        store.layers.find((layer) => layer.id === store.activeLayerId) ?? store.layers[0];
      return active?.store.getBlocks().length ?? 0;
    });
  }).toBeGreaterThan(0);
  await save('drawing-tools-05-fill.png');

  await app.close();
});
