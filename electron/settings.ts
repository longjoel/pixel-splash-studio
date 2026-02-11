import { app, safeStorage } from 'electron';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

type SettingsPayload = {
  openai?: {
    apiKey?: string; // encrypted if possible, otherwise plaintext
    apiKeyEncrypted?: boolean;
    imageModel?: 'gpt-image-1' | 'gpt-image-1-mini';
  };
  localai?: {
    baseUrl?: string; // e.g. http://localhost:8080/v1
    apiKey?: string; // optional; encrypted if possible, otherwise plaintext
    apiKeyEncrypted?: boolean;
    imageModel?: string; // e.g. "sdxl" depending on LocalAI config
  };
  ai?: {
    imageProvider?: 'openai' | 'localai';
  };
  ui?: {
    advancedMode?: boolean;
  };
};

const settingsPath = () => join(app.getPath('userData'), 'settings.json');

const readSettings = async (): Promise<SettingsPayload> => {
  try {
    const raw = await readFile(settingsPath(), 'utf8');
    const parsed = JSON.parse(raw) as SettingsPayload;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const writeSettings = async (payload: SettingsPayload) => {
  const dir = app.getPath('userData');
  await mkdir(dir, { recursive: true });
  await writeFile(settingsPath(), JSON.stringify(payload, null, 2), 'utf8');
};

export const getOpenAiKeyInfo = async () => {
  const settings = await readSettings();
  const key = settings.openai?.apiKey;
  return {
    hasKey: typeof key === 'string' && key.trim().length > 0,
    encryptionAvailable: safeStorage.isEncryptionAvailable(),
    storedEncrypted: settings.openai?.apiKeyEncrypted === true,
  };
};

export const getOpenAiApiKey = async (): Promise<string | null> => {
  const settings = await readSettings();
  const stored = settings.openai?.apiKey;
  if (!stored || typeof stored !== 'string' || !stored.trim()) {
    return null;
  }
  if (settings.openai?.apiKeyEncrypted && safeStorage.isEncryptionAvailable()) {
    try {
      const decrypted = safeStorage.decryptString(Buffer.from(stored, 'base64'));
      return decrypted.trim() ? decrypted : null;
    } catch {
      return null;
    }
  }
  return stored.trim();
};

export const setOpenAiApiKey = async (apiKey: string | null) => {
  const settings = await readSettings();
  const trimmed = apiKey?.trim() ?? '';
  const next: SettingsPayload = { ...settings, openai: { ...(settings.openai ?? {}) } };
  if (!trimmed) {
    delete next.openai?.apiKey;
    delete next.openai?.apiKeyEncrypted;
    if (next.openai && Object.keys(next.openai).length === 0) {
      delete next.openai;
    }
    await writeSettings(next);
    return;
  }

  if (safeStorage.isEncryptionAvailable()) {
    const encrypted = safeStorage.encryptString(trimmed);
    next.openai!.apiKey = encrypted.toString('base64');
    next.openai!.apiKeyEncrypted = true;
  } else {
    next.openai!.apiKey = trimmed;
    next.openai!.apiKeyEncrypted = false;
  }
  await writeSettings(next);
};

export const getOpenAiImageModel = async (): Promise<'gpt-image-1' | 'gpt-image-1-mini'> => {
  const settings = await readSettings();
  const model = settings.openai?.imageModel;
  return model === 'gpt-image-1-mini' ? 'gpt-image-1-mini' : 'gpt-image-1';
};

export const setOpenAiImageModel = async (model: 'gpt-image-1' | 'gpt-image-1-mini') => {
  const settings = await readSettings();
  const next: SettingsPayload = { ...settings, openai: { ...(settings.openai ?? {}) } };
  next.openai!.imageModel = model === 'gpt-image-1-mini' ? 'gpt-image-1-mini' : 'gpt-image-1';
  await writeSettings(next);
};

export const getAiImageProvider = async (): Promise<'openai' | 'localai'> => {
  const settings = await readSettings();
  const provider = settings.ai?.imageProvider;
  return provider === 'localai' ? 'localai' : 'openai';
};

export const setAiImageProvider = async (provider: 'openai' | 'localai') => {
  const settings = await readSettings();
  const next: SettingsPayload = { ...settings, ai: { ...(settings.ai ?? {}) } };
  next.ai!.imageProvider = provider === 'localai' ? 'localai' : 'openai';
  await writeSettings(next);
};

const defaultLocalAiBaseUrl = () => 'http://localhost:8080/v1';

export const getLocalAiConfig = async () => {
  const settings = await readSettings();
  const baseUrl =
    typeof settings.localai?.baseUrl === 'string' && settings.localai.baseUrl.trim()
      ? settings.localai.baseUrl.trim()
      : defaultLocalAiBaseUrl();
  const model =
    typeof settings.localai?.imageModel === 'string' && settings.localai.imageModel.trim()
      ? settings.localai.imageModel.trim()
      : 'sdxl';
  return { baseUrl, model };
};

export const setLocalAiBaseUrl = async (baseUrl: string) => {
  const settings = await readSettings();
  const next: SettingsPayload = { ...settings, localai: { ...(settings.localai ?? {}) } };
  next.localai!.baseUrl = baseUrl.trim() || defaultLocalAiBaseUrl();
  await writeSettings(next);
};

export const setLocalAiImageModel = async (model: string) => {
  const settings = await readSettings();
  const next: SettingsPayload = { ...settings, localai: { ...(settings.localai ?? {}) } };
  next.localai!.imageModel = model.trim() || 'sdxl';
  await writeSettings(next);
};

export const getLocalAiKeyInfo = async () => {
  const settings = await readSettings();
  const key = settings.localai?.apiKey;
  return {
    hasKey: typeof key === 'string' && key.trim().length > 0,
    encryptionAvailable: safeStorage.isEncryptionAvailable(),
    storedEncrypted: settings.localai?.apiKeyEncrypted === true,
  };
};

export const getAdvancedMode = async (): Promise<boolean> => {
  const settings = await readSettings();
  const value = settings.ui?.advancedMode;
  return value === true;
};

export const setAdvancedMode = async (value: boolean) => {
  const settings = await readSettings();
  const next: SettingsPayload = { ...settings, ui: { ...(settings.ui ?? {}) } };
  next.ui!.advancedMode = value === true;
  await writeSettings(next);
};

export const getLocalAiApiKey = async (): Promise<string | null> => {
  const settings = await readSettings();
  const stored = settings.localai?.apiKey;
  if (!stored || typeof stored !== 'string' || !stored.trim()) {
    return null;
  }
  if (settings.localai?.apiKeyEncrypted && safeStorage.isEncryptionAvailable()) {
    try {
      const decrypted = safeStorage.decryptString(Buffer.from(stored, 'base64'));
      return decrypted.trim() ? decrypted : null;
    } catch {
      return null;
    }
  }
  return stored.trim();
};

export const setLocalAiApiKey = async (apiKey: string | null) => {
  const settings = await readSettings();
  const trimmed = apiKey?.trim() ?? '';
  const next: SettingsPayload = { ...settings, localai: { ...(settings.localai ?? {}) } };
  if (!trimmed) {
    delete next.localai?.apiKey;
    delete next.localai?.apiKeyEncrypted;
    if (next.localai && Object.keys(next.localai).length === 0) {
      delete next.localai;
    }
    await writeSettings(next);
    return;
  }

  if (safeStorage.isEncryptionAvailable()) {
    const encrypted = safeStorage.encryptString(trimmed);
    next.localai!.apiKey = encrypted.toString('base64');
    next.localai!.apiKeyEncrypted = true;
  } else {
    next.localai!.apiKey = trimmed;
    next.localai!.apiKeyEncrypted = false;
  }
  await writeSettings(next);
};
