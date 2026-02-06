import React, { useEffect, useRef, useState } from 'react';

type OptionsModalProps = {
  onClose: () => void;
};

export const OptionsModal = ({ onClose }: OptionsModalProps) => {
  const [loading, setLoading] = useState(true);
  const [hasKey, setHasKey] = useState(false);
  const [encryptionAvailable, setEncryptionAvailable] = useState(false);
  const [storedEncrypted, setStoredEncrypted] = useState(false);
  const [imageModel, setImageModel] = useState<'gpt-image-1' | 'gpt-image-1-mini'>('gpt-image-1');
  const [showKey, setShowKey] = useState(false);
  const [apiKeyDraft, setApiKeyDraft] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const info = await window.optionsApi.getOpenAiKeyInfo();
        const model = await window.optionsApi.getOpenAiImageModel();
        if (cancelled) {
          return;
        }
        setHasKey(info.hasKey);
        setEncryptionAvailable(info.encryptionAvailable);
        setStoredEncrypted(info.storedEncrypted);
        setImageModel(model);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [loading]);

  const saveKey = async () => {
    const trimmed = apiKeyDraft.trim();
    if (!trimmed) {
      window.alert('Paste your OpenAI API key, or use Clear.');
      return;
    }
    setLoading(true);
    try {
      await window.optionsApi.setOpenAiApiKey(trimmed);
      const info = await window.optionsApi.getOpenAiKeyInfo();
      setHasKey(info.hasKey);
      setEncryptionAvailable(info.encryptionAvailable);
      setStoredEncrypted(info.storedEncrypted);
      setApiKeyDraft('');
      setShowKey(false);
    } catch (error) {
      console.error('Failed to save OpenAI API key:', error);
      window.alert('Unable to save API key.');
    } finally {
      setLoading(false);
    }
  };

  const clearKey = async () => {
    if (!window.confirm('Clear the saved OpenAI API key?')) {
      return;
    }
    setLoading(true);
    try {
      await window.optionsApi.setOpenAiApiKey(null);
      const info = await window.optionsApi.getOpenAiKeyInfo();
      setHasKey(info.hasKey);
      setEncryptionAvailable(info.encryptionAvailable);
      setStoredEncrypted(info.storedEncrypted);
      setApiKeyDraft('');
      setShowKey(false);
    } catch (error) {
      console.error('Failed to clear OpenAI API key:', error);
      window.alert('Unable to clear API key.');
    } finally {
      setLoading(false);
    }
  };

  const updateModel = async (next: 'gpt-image-1' | 'gpt-image-1-mini') => {
    setImageModel(next);
    try {
      await window.optionsApi.setOpenAiImageModel(next);
    } catch (error) {
      console.error('Failed to set image model:', error);
      window.alert('Unable to update image model.');
      const current = await window.optionsApi.getOpenAiImageModel().catch(() => 'gpt-image-1');
      setImageModel(current);
    }
  };

  const status = hasKey
    ? storedEncrypted
      ? 'Saved (encrypted)'
      : encryptionAvailable
        ? 'Saved'
        : 'Saved (not encrypted)'
    : 'Not set';

  return (
    <div
      className="modal"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      }}
    >
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__content modal__content--options" role="dialog" aria-modal="true">
        <div className="modal__header">
          <h2>Options</h2>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal__body">
          <div className="modal__row">
            <span>AI Image Model</span>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select
                value={imageModel}
                onChange={(e) => void updateModel(e.target.value as 'gpt-image-1' | 'gpt-image-1-mini')}
                disabled={loading}
              >
                <option value="gpt-image-1-mini">gpt-image-1-mini (faster/cheaper)</option>
                <option value="gpt-image-1">gpt-image-1 (higher quality)</option>
              </select>
              <span style={{ opacity: 0.7 }}>Applies to the AI Prompt tool.</span>
            </span>
          </div>
          <div className="modal__row">
            <span>OpenAI API Key</span>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                ref={inputRef}
                type={showKey ? 'text' : 'password'}
                value={apiKeyDraft}
                placeholder={hasKey ? '•••••••••••••••• (saved)' : 'sk-...'}
                onChange={(e) => setApiKeyDraft(e.target.value)}
                disabled={loading}
                style={{ width: 320 }}
              />
              <button type="button" onClick={() => setShowKey((prev) => !prev)} disabled={loading}>
                {showKey ? 'Hide' : 'Show'}
              </button>
            </span>
          </div>
          <div className="modal__row">
            <span>Status</span>
            <span style={{ opacity: 0.9 }}>{status}</span>
          </div>
          {!encryptionAvailable && (
            <div className="modal__row">
              <span />
              <span style={{ opacity: 0.8 }}>
                Encryption is unavailable on this system; the key may be stored in plain text.
              </span>
            </div>
          )}
          <div className="modal__row">
            <span />
            <span style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={saveKey} disabled={loading}>
                Save Key
              </button>
              <button type="button" onClick={clearKey} disabled={loading || !hasKey}>
                Clear
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
