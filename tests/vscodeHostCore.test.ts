import { afterEach, describe, expect, it } from 'vitest';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  DEFAULT_VSCODE_CAPABILITIES,
  createHostRequestHandler,
  normalizePlatformCapabilities,
  packBinary,
  readProjectZip,
  sanitizeBaseName,
  unpackBinary,
  writeProjectZip,
} = require('../apps/vscode-extension/host-core.js');

const makeProjectPayload = () => ({
  data: {
    palette: {
      colors: ['#000000', '#ffffff', '#ff0000', '#00ff00'],
    },
    camera: {
      x: 12,
      y: -8,
      zoom: 6,
    },
    pixelLayers: {
      layers: [{ id: 'layer-1', name: 'Layer 1', visible: true }],
      activeLayerId: 'layer-1',
    },
  },
  layers: [
    {
      id: 'layer-1',
      name: 'Layer 1',
      visible: true,
      blocks: [{ row: 0, col: 0, data: new Uint8Array([1, 2, 3, 4]) }],
    },
  ],
  referenceFiles: [{ filename: 'reference.bin', data: new Uint8Array([9, 8, 7]), type: 'bin' }],
});

describe('vscode host core', () => {
  const tempDirs: string[] = [];

  afterEach(async () => {
    while (tempDirs.length > 0) {
      const dir = tempDirs.pop();
      if (dir) {
        await rm(dir, { recursive: true, force: true });
      }
    }
  });

  it('round-trips layered splash payload through zip codec', async () => {
    const payload = makeProjectPayload();
    const zipped = await writeProjectZip(payload);
    const decoded = await readProjectZip(zipped);

    expect(decoded.data.camera.zoom).toBe(6);
    expect(decoded.layers).toBeDefined();
    expect(decoded.layers).toHaveLength(1);
    expect(decoded.layers?.[0]?.blocks?.[0]?.data).toEqual(new Uint8Array([1, 2, 3, 4]));
    expect(decoded.referenceFiles).toHaveLength(1);
  });

  it('normalizes capability payloads to known boolean keys', () => {
    const normalized = normalizePlatformCapabilities({
      exportPng: 1,
      ai: '',
      menuActions: true,
      unknownFlag: true,
    });

    expect(normalized).toEqual({
      ...DEFAULT_VSCODE_CAPABILITIES,
      exportPng: true,
      ai: false,
      menuActions: true,
    });
  });

  it('routes save/load/read/export requests end-to-end', async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), 'pss-vscode-host-'));
    tempDirs.push(tempDir);

    let panelTitle = 'Pixel Splash Studio';
    let uiScale = 1;
    let uiScaleEmits = 0;
    const perfLogs: string[] = [];
    let lastProjectPath: string | null = null;

    const saveProjectPayload = async (
      payload: ReturnType<typeof makeProjectPayload>,
      existingPath?: string
    ) => {
      const targetPath = existingPath ?? path.join(tempDir, 'project.splash');
      if (targetPath.toLowerCase().endsWith('.json')) {
        await writeFile(targetPath, JSON.stringify(packBinary(payload), null, 2), 'utf8');
      } else {
        const zipBytes = await writeProjectZip(payload);
        await writeFile(targetPath, zipBytes);
      }
      lastProjectPath = targetPath;
      return targetPath;
    };

    const readProjectPayload = async (existingPath?: string) => {
      const targetPath = existingPath ?? lastProjectPath;
      if (!targetPath) {
        return null;
      }
      const bytes = new Uint8Array(await readFile(targetPath));
      if (targetPath.toLowerCase().endsWith('.json')) {
        const raw = JSON.parse(Buffer.from(bytes).toString('utf8'));
        return { path: targetPath, ...unpackBinary(raw) };
      }
      const payload = await readProjectZip(bytes);
      return { path: targetPath, ...payload };
    };

    const writeBinaryFile = async (data: Uint8Array, suggestedName: string) => {
      const targetPath = path.join(tempDir, suggestedName);
      await writeFile(targetPath, data);
      return targetPath;
    };

    const writeTileMap = async (payload: { png: Uint8Array; tmx: string; baseName?: string }) => {
      const outputDir = path.join(tempDir, 'tilemap-out');
      await mkdir(outputDir, { recursive: true });
      const baseName = sanitizeBaseName(payload.baseName, 'tiles');
      const pngPath = path.join(outputDir, `${baseName}.png`);
      const tmxPath = path.join(outputDir, `${baseName}.tmx`);
      await writeFile(pngPath, payload.png);
      await writeFile(tmxPath, payload.tmx, 'utf8');
      return outputDir;
    };

    const handleRequest = createHostRequestHandler({
      saveProjectPayload,
      readProjectPayload,
      writeBinaryFile,
      writeTileMap,
      setPanelTitle: (title?: string) => {
        panelTitle = title ? `Pixel Splash Studio • ${title}` : 'Pixel Splash Studio';
      },
      logPerf: (message?: string) => {
        perfLogs.push(String(message ?? ''));
      },
      getUiScale: () => uiScale,
      setUiScale: (next: number) => {
        uiScale = next;
      },
      emitUiScale: () => {
        uiScaleEmits += 1;
      },
      getCapabilities: () => DEFAULT_VSCODE_CAPABILITIES,
    });

    const projectPath = path.join(tempDir, 'workspace-project.splash');
    const payload = makeProjectPayload();

    const savedPath = await handleRequest('project.save', { payload, existingPath: projectPath });
    expect(savedPath).toBe(projectPath);

    const loaded = await handleRequest('project.load', { existingPath: savedPath });
    expect(loaded.path).toBe(savedPath);
    expect(loaded.data.camera.x).toBe(12);

    const readResult = await handleRequest('project.read', { existingPath: savedPath });
    expect(readResult.layers).toHaveLength(1);

    const pngPath = await handleRequest('export.png', {
      data: new Uint8Array([5, 6, 7]),
      suggestedName: 'selection.png',
    });
    expect(path.basename(pngPath)).toBe('selection.png');
    expect(new Uint8Array(await readFile(pngPath))).toEqual(new Uint8Array([5, 6, 7]));

    const tileDir = await handleRequest('export.tilemap', {
      png: new Uint8Array([1, 2, 3]),
      tmx: '<map />',
      baseName: 'level:1',
    });
    expect(path.basename(tileDir)).toBe('tilemap-out');
    expect(new Uint8Array(await readFile(path.join(tileDir, 'level-1.png')))).toEqual(
      new Uint8Array([1, 2, 3])
    );
    expect((await readFile(path.join(tileDir, 'level-1.tmx'), 'utf8')).trim()).toBe('<map />');

    await handleRequest('app.setTitle', { title: 'Workspace' });
    expect(panelTitle).toBe('Pixel Splash Studio • Workspace');

    await handleRequest('debug.logPerf', { message: 'frame=4ms' });
    expect(perfLogs).toContain('frame=4ms');

    expect(await handleRequest('uiScale.get')).toBe(1);
    expect(await handleRequest('uiScale.set', { value: 1.5 })).toBe(1.5);
    expect(uiScale).toBe(1.5);
    expect(uiScaleEmits).toBe(1);

    expect(await handleRequest('platform.capabilities')).toEqual(DEFAULT_VSCODE_CAPABILITIES);
  });
});
