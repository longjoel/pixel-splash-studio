import React, { useEffect, useRef, useState } from 'react';

type OptionsModalProps = {
  onClose: () => void;
  onAdvancedModeChange: (enabled: boolean) => void;
};

export const OptionsModal = ({ onClose, onAdvancedModeChange }: OptionsModalProps) => {
  const [loading, setLoading] = useState(true);
  const [hasKey, setHasKey] = useState(false);
  const [encryptionAvailable, setEncryptionAvailable] = useState(false);
  const [storedEncrypted, setStoredEncrypted] = useState(false);
  const [imageModel, setImageModel] = useState<'gpt-image-1' | 'gpt-image-1-mini'>('gpt-image-1');
  const [imageProvider, setImageProvider] = useState<'openai' | 'localai'>('openai');
  const [localAiBaseUrl, setLocalAiBaseUrl] = useState('http://localhost:8080/v1');
  const [localAiModel, setLocalAiModel] = useState('sdxl');
  const [localAiHasKey, setLocalAiHasKey] = useState(false);
  const [localAiEncryptionAvailable, setLocalAiEncryptionAvailable] = useState(false);
  const [localAiStoredEncrypted, setLocalAiStoredEncrypted] = useState(false);
  const [localAiShowKey, setLocalAiShowKey] = useState(false);
  const [localAiApiKeyDraft, setLocalAiApiKeyDraft] = useState('');
  const [advancedMode, setAdvancedMode] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [apiKeyDraft, setApiKeyDraft] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const info = await window.optionsApi.getOpenAiKeyInfo();
        const model = await window.optionsApi.getOpenAiImageModel();
        const provider = await window.optionsApi.getAiImageProvider();
        const localConfig = await window.optionsApi.getLocalAiConfig();
        const localKeyInfo = await window.optionsApi.getLocalAiKeyInfo();
        const advanced = await window.optionsApi.getAdvancedMode();
        if (cancelled) {
          return;
        }
        setHasKey(info.hasKey);
        setEncryptionAvailable(info.encryptionAvailable);
        setStoredEncrypted(info.storedEncrypted);
        setImageModel(model);
        setImageProvider(provider);
        setLocalAiBaseUrl(localConfig.baseUrl);
        setLocalAiModel(localConfig.model);
        setLocalAiHasKey(localKeyInfo.hasKey);
        setLocalAiEncryptionAvailable(localKeyInfo.encryptionAvailable);
        setLocalAiStoredEncrypted(localKeyInfo.storedEncrypted);
        setAdvancedMode(advanced);
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

  const updateProvider = async (next: 'openai' | 'localai') => {
    setImageProvider(next);
    try {
      await window.optionsApi.setAiImageProvider(next);
    } catch (error) {
      console.error('Failed to set image provider:', error);
      window.alert('Unable to update image provider.');
      const current = await window.optionsApi.getAiImageProvider().catch(() => 'openai');
      setImageProvider(current);
    }
  };

  const saveLocalAiKey = async () => {
    const trimmed = localAiApiKeyDraft.trim();
    if (!trimmed) {
      window.alert('Paste your LocalAI API key, or use Clear.');
      return;
    }
    setLoading(true);
    try {
      await window.optionsApi.setLocalAiApiKey(trimmed);
      const info = await window.optionsApi.getLocalAiKeyInfo();
      setLocalAiHasKey(info.hasKey);
      setLocalAiEncryptionAvailable(info.encryptionAvailable);
      setLocalAiStoredEncrypted(info.storedEncrypted);
      setLocalAiApiKeyDraft('');
      setLocalAiShowKey(false);
    } catch (error) {
      console.error('Failed to save LocalAI API key:', error);
      window.alert('Unable to save LocalAI API key.');
    } finally {
      setLoading(false);
    }
  };

  const clearLocalAiKey = async () => {
    if (!window.confirm('Clear the saved LocalAI API key?')) {
      return;
    }
    setLoading(true);
    try {
      await window.optionsApi.setLocalAiApiKey(null);
      const info = await window.optionsApi.getLocalAiKeyInfo();
      setLocalAiHasKey(info.hasKey);
      setLocalAiEncryptionAvailable(info.encryptionAvailable);
      setLocalAiStoredEncrypted(info.storedEncrypted);
      setLocalAiApiKeyDraft('');
      setLocalAiShowKey(false);
    } catch (error) {
      console.error('Failed to clear LocalAI API key:', error);
      window.alert('Unable to clear LocalAI API key.');
    } finally {
      setLoading(false);
    }
  };

  const updateAdvancedMode = async (next: boolean) => {
    setAdvancedMode(next);
    try {
      await window.optionsApi.setAdvancedMode(next);
      onAdvancedModeChange(next);
    } catch (error) {
      console.error('Failed to update advanced mode:', error);
      window.alert('Unable to update advanced mode.');
      const current = await window.optionsApi.getAdvancedMode().catch(() => true);
      setAdvancedMode(current);
      onAdvancedModeChange(current);
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
            <span>Advanced Mode</span>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={advancedMode}
                  onChange={(e) => void updateAdvancedMode(e.currentTarget.checked)}
                  disabled={loading}
                />
                Show tile tools
              </label>
              <span style={{ opacity: 0.7 }}>Hide or reveal tiling tools in the toolbar.</span>
            </span>
          </div>
          <div className="modal__row">
            <span>AI Provider</span>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select
                value={imageProvider}
                onChange={(e) => void updateProvider(e.target.value as 'openai' | 'localai')}
                disabled={loading}
              >
                <option value="openai">OpenAI</option>
                <option value="localai">LocalAI</option>
              </select>
              <span style={{ opacity: 0.7 }}>Used by the AI Prompt tool.</span>
            </span>
          </div>

          {imageProvider === 'openai' && (
            <div className="modal__row">
              <span>OpenAI Image Model</span>
              <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <select
                  value={imageModel}
                  onChange={(e) =>
                    void updateModel(e.target.value as 'gpt-image-1' | 'gpt-image-1-mini')
                  }
                  disabled={loading}
                >
                  <option value="gpt-image-1-mini">gpt-image-1-mini (faster/cheaper)</option>
                  <option value="gpt-image-1">gpt-image-1 (higher quality)</option>
                </select>
              </span>
            </div>
          )}

          {imageProvider === 'localai' && (
            <>
              <div className="modal__row">
                <span>LocalAI Base URL</span>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="text"
                    value={localAiBaseUrl}
                    onChange={(e) => setLocalAiBaseUrl(e.target.value)}
                    onBlur={() => void window.optionsApi.setLocalAiBaseUrl(localAiBaseUrl)}
                    disabled={loading}
                    style={{ width: 360 }}
                  />
                  <span style={{ opacity: 0.7 }}>e.g. http://localhost:8080/v1</span>
                </span>
              </div>
              <div className="modal__row">
                <span>LocalAI Model</span>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="text"
                    value={localAiModel}
                    onChange={(e) => setLocalAiModel(e.target.value)}
                    onBlur={() => void window.optionsApi.setLocalAiImageModel(localAiModel)}
                    disabled={loading}
                    style={{ width: 240 }}
                  />
                  <span style={{ opacity: 0.7 }}>Must match your LocalAI image model name.</span>
                </span>
              </div>
              <div className="modal__row">
                <span>LocalAI API Key</span>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type={localAiShowKey ? 'text' : 'password'}
                    value={localAiApiKeyDraft}
                    placeholder={localAiHasKey ? '•••••••••••••••• (saved)' : '(optional)'}
                    onChange={(e) => setLocalAiApiKeyDraft(e.target.value)}
                    disabled={loading}
                    style={{ width: 320 }}
                  />
                  <button
                    type="button"
                    onClick={() => setLocalAiShowKey((prev) => !prev)}
                    disabled={loading}
                  >
                    {localAiShowKey ? 'Hide' : 'Show'}
                  </button>
                </span>
              </div>
              <div className="modal__row">
                <span>LocalAI Key Status</span>
                <span style={{ opacity: 0.9 }}>
                  {localAiHasKey
                    ? localAiStoredEncrypted
                      ? 'Saved (encrypted)'
                      : localAiEncryptionAvailable
                        ? 'Saved'
                        : 'Saved (not encrypted)'
                    : 'Not set (optional)'}
                </span>
              </div>
              <div className="modal__row">
                <span />
                <span style={{ display: 'flex', gap: 8 }}>
                  <button type="button" onClick={() => void saveLocalAiKey()} disabled={loading}>
                    Save Key
                  </button>
                  <button
                    type="button"
                    onClick={() => void clearLocalAiKey()}
                    disabled={loading || !localAiHasKey}
                  >
                    Clear
                  </button>
                </span>
              </div>
            </>
          )}

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
            <span>OpenAI Key Status</span>
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
          <div className="modal__row">
            <span />
            <span style={{ opacity: 0.75 }}>
              Note: LocalAI must expose OpenAI-compatible image endpoints at the Base URL.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
