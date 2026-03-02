# VS Code Extension Target

This extension hosts Pixel Splash Studio in a VS Code webview.

Current scope:
1. Opens the renderer in a webview panel.
2. Bridges host calls for project save/load/read and binary exports via `host-core`.
3. Uses a generated webview bundle copied from root `dist/`.
4. Negotiates runtime platform capabilities from extension host to renderer.

## Build Webview Assets

```bash
npm run build:vscode
```

This will:
1. Build the renderer bundle (`dist/`).
2. Copy web assets into `apps/vscode-extension/media/web/`.
3. Generate `apps/vscode-extension/media/web/manifest.json`.

## Run Extension In VS Code

1. Open this repository in VS Code.
2. Run command: `Developer: Install Extension from Location...`
3. Choose `apps/vscode-extension`.
4. Run command: `Pixel Splash Studio: Open Editor`.

Notes:
1. The VS Code target supports `.splash` zip read/write and `.json` fallback payloads.
2. Some host APIs (AI/options/recording/fullscreen) are intentionally unsupported in this target for now.
