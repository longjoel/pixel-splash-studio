import React, { useEffect, useRef, useState } from 'react';
import Minimap from './Minimap';
import PastePreview from './PastePreview';
import { useClipboardStore } from '@/state/clipboardStore';

type TabId = 'minimap' | 'paste';

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
      setActiveTab('paste');
    }
    hadClipboardRef.current = hasClipboard;
  }, [hasClipboard]);

  const showTabs = hasClipboard;

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
            aria-selected={activeTab === 'paste'}
            data-active={activeTab === 'paste'}
            onClick={() => setActiveTab('paste')}
          >
            Paste Preview
          </button>
        </div>
      )}
      {activeTab === 'paste' && hasClipboard ? <PastePreview /> : <Minimap />}
    </div>
  );
};

export default MinimapPanel;
