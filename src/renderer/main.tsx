import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: unknown }
> {
  state = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  componentDidCatch(error: unknown) {
    console.error('Renderer crashed:', error);
  }

  render() {
    if (this.state.error) {
      const message =
        this.state.error instanceof Error
          ? `${this.state.error.name}: ${this.state.error.message}\n${this.state.error.stack ?? ''}`
          : String(this.state.error);
      return (
        <div style={{ padding: 16, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          <h1 style={{ marginTop: 0 }}>Pixel Splash Studio crashed</h1>
          <p>Open DevTools console for details.</p>
          <pre>{message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
