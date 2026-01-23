import React, { useEffect, useRef, useState } from 'react';
import Minimap from './Minimap';
import PastePreview from './PastePreview';
import NavigationPanel from './NavigationPanel';
import LayersPanel from './LayersPanel';
import { useClipboardStore } from '@/state/clipboardStore';

type TabId = 'minimap' | 'nav' | 'layers' | 'paste';

const MinimapPanel = () => {
  const hasClipboard = useClipboardStore(
    (state) => state.pixels.length > 0 && state.width > 0 && state.height > 0
  );
  const [activeTab, setActiveTab] = useState<TabId>('minimap');
  const hadClipboardRef = useRef(hasClipboard);

  useEffect(() => {
    if (!hasClipboard && activeTab === 'paste') {
      setActiveTab('minimap');
    }
  }, [hasClipboard, activeTab]);

  useEffect(() => {
    if (hasClipboard && !hadClipboardRef.current) {
      setActiveTab((prev) => (prev === 'minimap' ? 'paste' : prev));
    }
    hadClipboardRef.current = hasClipboard;
  }, [hasClipboard]);

  const showTabs = true;

  return (
    <div className="minimap-panel">
      {showTabs && (
        <div className="minimap__tabs" role="tablist" aria-label="Minimap tabs">
          <button
            type="button"
            role="tab"
            className="minimap__tab"
            aria-selected={activeTab === 'minimap'}
            data-active={activeTab === 'minimap'}
            onClick={() => setActiveTab('minimap')}
          >
            Minimap
          </button>
          <button
            type="button"
            role="tab"
            className="minimap__tab"
            aria-selected={activeTab === 'nav'}
            data-active={activeTab === 'nav'}
            onClick={() => setActiveTab('nav')}
          >
            Nav
          </button>
          <button
            type="button"
            role="tab"
            className="minimap__tab"
            aria-selected={activeTab === 'layers'}
            data-active={activeTab === 'layers'}
            onClick={() => setActiveTab('layers')}
          >
            Layers
          </button>
          <button
            type="button"
            role="tab"
            className="minimap__tab"
            aria-selected={activeTab === 'paste'}
            data-active={activeTab === 'paste'}
            onClick={() => setActiveTab('paste')}
            style={{ display: hasClipboard ? undefined : 'none' }}
          >
            Paste Preview
          </button>
        </div>
      )}
      {activeTab === 'nav' ? (
        <NavigationPanel />
      ) : activeTab === 'layers' ? (
        <LayersPanel />
      ) : activeTab === 'paste' && hasClipboard ? (
        <PastePreview />
      ) : (
        <Minimap />
      )}
    </div>
  );
};

export default MinimapPanel;
