import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

const installDemoApis = () => {
  const listeners = new Set<(scale: number) => void>();
  let scale = 1;

  window.projectApi = {
    save: async () => null,
    load: async () => null,
    read: async () => null,
    exportPng: async () => null,
    exportGbr: async () => null,
    exportChr: async () => null,
    exportBsave: async () => null,
    exportTileMap: async () => null,
    importImage: async () => null,
    exportImage: async () => null,
  };
  window.menuApi = {
    onAction: () => () => {},
  };
  window.viewMenuApi = {
    setState: () => {},
  };
  window.appApi = {
    setTitle: (title: string) => {
      document.title = title;
    },
  };
  window.windowApi = {
    toggleFullscreen: async () => {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen?.();
        return true;
      }
      await document.exitFullscreen?.();
      return false;
    },
    onFullscreenChange: () => () => {},
  };
  window.debugApi = {
    logPerf: async () => null,
  };
  window.paletteApi = {
    importLospec: async () => {
      throw new Error('LoSpec import is unavailable in browser demo mode.');
    },
    onApply: () => () => {},
  };
  window.optionsApi = {
    getOpenAiKeyInfo: async () => ({
      hasKey: false,
      encryptionAvailable: false,
      storedEncrypted: false,
    }),
    setOpenAiApiKey: async () => {},
    getOpenAiImageModel: async () => 'gpt-image-1',
    setOpenAiImageModel: async () => {},
    getAiImageProvider: async () => 'openai',
    setAiImageProvider: async () => {},
    getLocalAiConfig: async () => ({ baseUrl: '', model: '' }),
    setLocalAiBaseUrl: async () => {},
    setLocalAiImageModel: async () => {},
    getLocalAiKeyInfo: async () => ({
      hasKey: false,
      encryptionAvailable: false,
      storedEncrypted: false,
    }),
    setLocalAiApiKey: async () => {},
    getAdvancedMode: async () => false,
    setAdvancedMode: async () => {},
  };
  window.aiApi = {
    generateSprite: async () => {
      throw new Error('AI tools are disabled in browser demo mode.');
    },
  };
  window.uiScaleApi = {
    getScale: () => scale,
    resetScale: () => {
      scale = 1;
      listeners.forEach((handler) => handler(scale));
    },
    setScale: (next: number) => {
      if (!Number.isFinite(next)) {
        return;
      }
      scale = Math.max(0.5, Math.min(3, next));
      listeners.forEach((handler) => handler(scale));
    },
    stepScale: (factor: number) => {
      if (!Number.isFinite(factor) || factor === 0) {
        return;
      }
      scale = Math.max(0.5, Math.min(3, scale * factor));
      listeners.forEach((handler) => handler(scale));
    },
    onScaleChange: (handler: (nextScale: number) => void) => {
      listeners.add(handler);
      handler(scale);
      return () => listeners.delete(handler);
    },
  };
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: unknown }> {
  state = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  componentDidCatch(error: unknown) {
    console.error('Browser demo crashed:', error);
  }

  render() {
    if (this.state.error) {
      const message =
        this.state.error instanceof Error
          ? `${this.state.error.name}: ${this.state.error.message}\n${this.state.error.stack ?? ''}`
          : String(this.state.error);
      return (
        <div style={{ padding: 16, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          <h1 style={{ marginTop: 0 }}>Pixel Splash Studio demo crashed</h1>
          <pre>{message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

installDemoApis();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
