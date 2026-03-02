const vscode = require('vscode');
const {
  DEFAULT_VSCODE_CAPABILITIES,
  createHostRequestHandler,
  normalizePlatformCapabilities,
  packBinary,
  readProjectZip,
  sanitizeBaseName,
  textDecoder,
  textEncoder,
  unpackBinary,
  writeProjectZip,
} = require('./host-core');

const COMMAND_OPEN_EDITOR = 'pixelSplashStudio.openEditor';

const createNonce = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < 32; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
};

class PixelSplashWebviewHost {
  constructor(context, panel) {
    this.context = context;
    this.panel = panel;
    this.disposables = [];
    this.uiScale = 1;
    this.capabilities = normalizePlatformCapabilities(DEFAULT_VSCODE_CAPABILITIES);
    this.requestHandler = createHostRequestHandler({
      saveProjectPayload: (payload, existingPath) => this.saveProjectPayload(payload, existingPath),
      readProjectPayload: (existingPath) => this.readProjectPayload(existingPath),
      writeBinaryFile: (data, suggestedName, extensions) =>
        this.writeBinaryFile(data, suggestedName, extensions),
      writeTileMap: (payload) => this.writeTileMap(payload),
      setPanelTitle: (title) => {
        this.panel.title = title ? `Pixel Splash Studio • ${title}` : 'Pixel Splash Studio';
      },
      logPerf: (message) => {
        console.log('[PixelSplash][perf]', message);
      },
      getUiScale: () => this.uiScale,
      setUiScale: (value) => {
        this.uiScale = value;
      },
      emitUiScale: () => this.emitUiScale(),
      getCapabilities: () => this.capabilities,
    });
    this.open();
  }

  async open() {
    this.panel.webview.options = {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, 'media')],
    };
    this.panel.webview.html = await this.buildWebviewHtml();
    this.disposables.push(
      this.panel.webview.onDidReceiveMessage((message) => {
        void this.handleWebviewMessage(message);
      })
    );
  }

  dispose() {
    while (this.disposables.length > 0) {
      const item = this.disposables.pop();
      if (item) {
        item.dispose();
      }
    }
  }

  async readJson(uri) {
    const bytes = await vscode.workspace.fs.readFile(uri);
    const text = textDecoder.decode(bytes);
    return JSON.parse(text);
  }

  async writeJson(uri, value) {
    const text = JSON.stringify(value, null, 2);
    await vscode.workspace.fs.writeFile(uri, textEncoder.encode(text));
  }

  getWorkspaceDefaultUri() {
    return vscode.workspace.workspaceFolders?.[0]?.uri;
  }

  async promptOpenPath(existingPath) {
    if (typeof existingPath === 'string' && existingPath.trim()) {
      return vscode.Uri.file(existingPath);
    }
    const selected = await vscode.window.showOpenDialog({
      canSelectMany: false,
      canSelectFiles: true,
      canSelectFolders: false,
      defaultUri: this.getWorkspaceDefaultUri(),
      filters: {
        'Pixel Splash Project': ['splash', 'json'],
        'All Files': ['*'],
      },
    });
    return selected?.[0] ?? null;
  }

  async promptSavePath(existingPath, defaultName, extensions) {
    return (
      (await vscode.window.showSaveDialog({
        defaultUri:
          typeof existingPath === 'string' && existingPath.trim()
            ? vscode.Uri.file(existingPath)
            : this.getWorkspaceDefaultUri()
              ? vscode.Uri.joinPath(this.getWorkspaceDefaultUri(), defaultName)
              : undefined,
        filters: { Export: extensions },
      })) ?? null
    );
  }

  async buildWebviewHtml() {
    const webview = this.panel.webview;
    const manifestUri = vscode.Uri.joinPath(
      this.context.extensionUri,
      'media',
      'web',
      'manifest.json'
    );
    let manifest;
    try {
      manifest = await this.readJson(manifestUri);
    } catch {
      return `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 12px;">
  <h2>Pixel Splash Studio</h2>
  <p>Webview assets not found.</p>
  <p>Run <code>npm run build:vscode</code> from the repository root, then reopen this command.</p>
</body>
</html>`;
    }

    const nonce = createNonce();
    const cssLinks = Array.isArray(manifest.styles)
      ? manifest.styles
          .map(
            (stylePath) =>
              `<link rel="stylesheet" href="${webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'web', stylePath))}">`
          )
          .join('\n')
      : '';
    const scriptTags = Array.isArray(manifest.scripts)
      ? manifest.scripts
          .map(
            (scriptPath) =>
              `<script nonce="${nonce}" type="module" src="${webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'web', scriptPath))}"></script>`
          )
          .join('\n')
      : '';
    const bridgeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'webview-bridge.js')
    );

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} data: blob:; style-src ${webview.cspSource} 'unsafe-inline'; font-src ${webview.cspSource} data:; script-src 'nonce-${nonce}'; connect-src https: http:;">
  <title>Pixel Splash Studio</title>
  ${cssLinks}
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" src="${bridgeUri}"></script>
  ${scriptTags}
</body>
</html>`;
  }

  postResponse(id, ok, result, error) {
    this.panel.webview.postMessage({
      type: 'pss:response',
      id,
      ok,
      result: packBinary(result),
      error,
    });
  }

  async readProjectPayload(existingPath) {
    const uri = await this.promptOpenPath(existingPath);
    if (!uri) {
      return null;
    }
    const bytes = await vscode.workspace.fs.readFile(uri);
    try {
      const payload = await readProjectZip(bytes);
      return { path: uri.fsPath, ...payload };
    } catch {
      const text = textDecoder.decode(bytes);
      const raw = JSON.parse(text);
      const payload = unpackBinary(raw);
      return { path: uri.fsPath, ...payload };
    }
  }

  async saveProjectPayload(payload, existingPath) {
    const uri = await this.promptSavePath(existingPath, 'project.splash', ['splash', 'json']);
    if (!uri) {
      return null;
    }
    const normalized = unpackBinary(payload);
    if (uri.path.toLowerCase().endsWith('.json')) {
      await this.writeJson(uri, packBinary(normalized));
      return uri.fsPath;
    }
    const zipBytes = await writeProjectZip(normalized);
    await vscode.workspace.fs.writeFile(uri, zipBytes);
    return uri.fsPath;
  }

  async writeBinaryFile(data, suggestedName, extensions) {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data ?? []);
    const uri = await this.promptSavePath(undefined, suggestedName, extensions);
    if (!uri) {
      return null;
    }
    await vscode.workspace.fs.writeFile(uri, bytes);
    return uri.fsPath;
  }

  async writeTileMap(payload) {
    const picked = await vscode.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      defaultUri: this.getWorkspaceDefaultUri(),
      openLabel: 'Select Export Folder',
    });
    if (!picked?.[0]) {
      return null;
    }
    const baseDir = picked[0];
    const baseName = sanitizeBaseName(payload.baseName, 'tiles');
    let outputDir = baseDir;

    const pngUri = vscode.Uri.joinPath(outputDir, `${baseName}.png`);
    const tmxUri = vscode.Uri.joinPath(outputDir, `${baseName}.tmx`);
    let exists = false;
    try {
      await vscode.workspace.fs.stat(pngUri);
      exists = true;
    } catch {
      // ignore
    }
    try {
      await vscode.workspace.fs.stat(tmxUri);
      exists = true;
    } catch {
      // ignore
    }

    if (exists) {
      const stamp = new Date().toISOString().replace(/[:.]/g, '-');
      outputDir = vscode.Uri.joinPath(baseDir, `${baseName}-export-${stamp}`);
      await vscode.workspace.fs.createDirectory(outputDir);
    }

    await vscode.workspace.fs.writeFile(
      vscode.Uri.joinPath(outputDir, `${baseName}.png`),
      payload.png instanceof Uint8Array ? payload.png : new Uint8Array(payload.png ?? [])
    );
    await vscode.workspace.fs.writeFile(
      vscode.Uri.joinPath(outputDir, `${baseName}.tmx`),
      textEncoder.encode(String(payload.tmx ?? ''))
    );
    return outputDir.fsPath;
  }

  emitUiScale() {
    this.panel.webview.postMessage({
      type: 'pss:event',
      event: 'uiScale',
      value: this.uiScale,
    });
  }

  emitCapabilities() {
    this.panel.webview.postMessage({
      type: 'pss:event',
      event: 'capabilities',
      value: this.capabilities,
    });
  }

  async handleRequest(method, payload) {
    return this.requestHandler(method, payload);
  }

  async handleWebviewMessage(message) {
    if (!message || typeof message !== 'object') {
      return;
    }
    if (message.type === 'pss:ready') {
      this.emitCapabilities();
      this.emitUiScale();
      return;
    }
    if (message.type !== 'pss:request') {
      return;
    }
    const id = message.id;
    try {
      const unpackedPayload = unpackBinary(message.payload);
      const result = await this.handleRequest(message.method, unpackedPayload);
      this.postResponse(id, true, result, undefined);
    } catch (error) {
      const messageText = error instanceof Error ? error.message : String(error);
      this.postResponse(id, false, null, messageText);
    }
  }
}

function activate(context) {
  const openEditor = vscode.commands.registerCommand(COMMAND_OPEN_EDITOR, () => {
    const panel = vscode.window.createWebviewPanel(
      'pixelSplashStudio',
      'Pixel Splash Studio',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')],
      }
    );
    const host = new PixelSplashWebviewHost(context, panel);
    context.subscriptions.push(
      host,
      panel.onDidDispose(() => {
        host.dispose();
      })
    );
  });

  context.subscriptions.push(openEditor);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
