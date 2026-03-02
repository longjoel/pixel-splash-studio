import { describe, it, expect } from 'vitest';
import { platform, resolvePlatformCapabilities } from '@/platform/api';

describe('platform capabilities', () => {
  it('reports disabled capabilities for missing APIs', () => {
    const caps = resolvePlatformCapabilities({});
    expect(caps.importImage).toBe(false);
    expect(caps.exportPng).toBe(false);
    expect(caps.exportTileMap).toBe(false);
    expect(caps.exportImage).toBe(false);
    expect(caps.recording).toBe(false);
    expect(caps.ai).toBe(false);
    expect(caps.options).toBe(false);
    expect(caps.menuActions).toBe(false);
    expect(caps.viewMenuState).toBe(false);
    expect(caps.fullscreenToggle).toBe(false);
  });

  it('detects enabled capabilities when APIs are present', () => {
    const caps = resolvePlatformCapabilities({
      projectApi: {
        importImage: async () => null,
        exportPng: async () => null,
        exportTileMap: async () => null,
        exportImage: async () => null,
      } as unknown as Window['projectApi'],
      menuApi: {
        onAction: () => () => {},
      },
      viewMenuApi: {
        setState: () => {},
      },
      windowApi: {
        toggleFullscreen: async () => true,
        onFullscreenChange: () => () => {},
      },
      recordingApi: {
        start: async () => ({ frameDir: '/tmp' }),
        addFrame: async () => ({ framePath: '/tmp/1.png', frameCount: 1 }),
        stop: async () => ({ frameDir: '/tmp', frameCount: 1, videoPath: null, canceled: false }),
      },
      optionsApi: {
        getAdvancedMode: async () => true,
      } as unknown as Window['optionsApi'],
      aiApi: {
        generateSprite: async () => ({ pngBase64: '' }),
      },
    });

    expect(caps.importImage).toBe(true);
    expect(caps.exportPng).toBe(true);
    expect(caps.exportTileMap).toBe(true);
    expect(caps.exportImage).toBe(true);
    expect(caps.recording).toBe(true);
    expect(caps.ai).toBe(true);
    expect(caps.options).toBe(true);
    expect(caps.menuActions).toBe(true);
    expect(caps.viewMenuState).toBe(true);
    expect(caps.fullscreenToggle).toBe(true);
  });

  it('applies explicit host capability overrides when provided', () => {
    const previousWindow = (globalThis as { window?: unknown }).window;
    (globalThis as { window?: unknown }).window = {
      projectApi: {
        exportPng: async () => null,
        exportTileMap: async () => null,
      },
      menuApi: {
        onAction: () => () => {},
      },
      viewMenuApi: {
        setState: () => {},
      },
      windowApi: {
        toggleFullscreen: async () => true,
      },
      __PSS_PLATFORM_CAPABILITIES__: {
        exportPng: true,
        menuActions: false,
        fullscreenToggle: false,
      },
    } as unknown as Window;

    try {
      const caps = platform.capabilities();
      expect(caps.exportPng).toBe(true);
      expect(caps.exportTileMap).toBe(true);
      expect(caps.menuActions).toBe(false);
      expect(caps.fullscreenToggle).toBe(false);
    } finally {
      (globalThis as { window?: unknown }).window = previousWindow;
    }
  });
});
