export type PlatformCapabilities = {
  importImage: boolean;
  exportPng: boolean;
  exportTileMap: boolean;
  exportImage: boolean;
  recording: boolean;
  ai: boolean;
  options: boolean;
  menuActions: boolean;
  viewMenuState: boolean;
  fullscreenToggle: boolean;
};

type PartialPlatformCapabilities = Partial<PlatformCapabilities>;

const PLATFORM_CAPABILITY_KEYS: Array<keyof PlatformCapabilities> = [
  'importImage',
  'exportPng',
  'exportTileMap',
  'exportImage',
  'recording',
  'ai',
  'options',
  'menuActions',
  'viewMenuState',
  'fullscreenToggle',
];

const getExplicitCapabilities = (): PartialPlatformCapabilities | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const explicit = (
    window as typeof window & { __PSS_PLATFORM_CAPABILITIES__?: PartialPlatformCapabilities }
  ).__PSS_PLATFORM_CAPABILITIES__;
  if (!explicit || typeof explicit !== 'object') {
    return null;
  }
  return explicit;
};

const mergePlatformCapabilities = (
  inferred: PlatformCapabilities,
  explicit: PartialPlatformCapabilities | null
): PlatformCapabilities => {
  if (!explicit) {
    return inferred;
  }
  const merged = { ...inferred };
  for (const key of PLATFORM_CAPABILITY_KEYS) {
    if (key in explicit) {
      merged[key] = Boolean(explicit[key]);
    }
  }
  return merged;
};

type PlatformApis = {
  projectApi?: Window['projectApi'];
  menuApi?: Window['menuApi'];
  viewMenuApi?: Window['viewMenuApi'];
  windowApi?: Window['windowApi'];
  recordingApi?: Window['recordingApi'];
  optionsApi?: Window['optionsApi'];
  aiApi?: Window['aiApi'];
};

export const resolvePlatformCapabilities = (apis: PlatformApis): PlatformCapabilities => ({
  importImage: Boolean(apis.projectApi?.importImage),
  exportPng: Boolean(apis.projectApi?.exportPng),
  exportTileMap: Boolean(apis.projectApi?.exportTileMap),
  exportImage: Boolean(apis.projectApi?.exportImage),
  recording: Boolean(apis.recordingApi?.start && apis.recordingApi?.stop),
  ai: Boolean(apis.aiApi?.generateSprite),
  options: Boolean(apis.optionsApi?.getAdvancedMode),
  menuActions: Boolean(apis.menuApi?.onAction),
  viewMenuState: Boolean(apis.viewMenuApi?.setState),
  fullscreenToggle: Boolean(apis.windowApi?.toggleFullscreen),
});

export const platform = {
  alert(message: string) {
    window.alert(message);
  },
  project() {
    return window.projectApi;
  },
  menu() {
    return window.menuApi;
  },
  viewMenu() {
    return window.viewMenuApi;
  },
  app() {
    return window.appApi;
  },
  appWindow() {
    return window.windowApi;
  },
  debug() {
    return window.debugApi;
  },
  recording() {
    return window.recordingApi;
  },
  palette() {
    return window.paletteApi;
  },
  options() {
    return window.optionsApi;
  },
  ai() {
    return window.aiApi;
  },
  uiScale() {
    return window.uiScaleApi;
  },
  capabilities(): PlatformCapabilities {
    const inferred = resolvePlatformCapabilities({
      projectApi: this.project(),
      menuApi: this.menu(),
      viewMenuApi: this.viewMenu(),
      windowApi: this.appWindow(),
      recordingApi: this.recording(),
      optionsApi: this.options(),
      aiApi: this.ai(),
    });
    return mergePlatformCapabilities(inferred, getExplicitCapabilities());
  },
  onCapabilitiesChange(handler: (value: PlatformCapabilities) => void) {
    if (typeof window === 'undefined') {
      return () => {};
    }
    const listener = () => {
      handler(this.capabilities());
    };
    window.addEventListener('pss:capabilities', listener);
    return () => {
      window.removeEventListener('pss:capabilities', listener);
    };
  },
};
