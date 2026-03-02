# Multi-Target Backend Plan

## Goal
Run one shared editor core across three host targets:

1. Standalone web (demo)
2. Standalone Electron (full app)
3. VS Code extension (direct file editing workflow)

## Principles

1. Keep drawing/tools/state logic host-agnostic.
2. Move host-specific I/O, dialogs, commands, and settings behind a platform boundary.
3. Ship incrementally: keep Electron stable while adding web and VS Code adapters.

## Target Model

### Shared (`editor-core`)

1. Canvas tools
2. Zustand stores
3. Export encoders (pure data transforms)
4. UI components

### Host Adapters

1. Electron adapter (IPC-backed)
2. Web adapter (browser APIs + download flows)
3. VS Code adapter (webview <-> extension host messaging)

## Phase Tracker

### Phase 0: Alignment
- [x] Define three-target strategy and migration phases.
- [x] Persist plan in repository for continuity across context refreshes.

### Phase 1: Platform Boundary
- [x] Add renderer platform API module (`src/renderer/platform/api.ts`).
- [x] Replace direct `window.*Api` usage in renderer with `platform` calls.
- [x] Add capability flags (`platform.capabilities`) for UI gating.

### Phase 2: Project/Export Service Migration
- [x] Route project load/save/read through platform adapter.
- [x] Route import/export services through platform adapter.
- [x] Ensure tilemap/bookmark export uses adapter-only host calls.

### Phase 3: UI/Commands Migration
- [x] Route menu, title, fullscreen, palette apply, debug perf via adapter.
- [x] Remove remaining direct `window.*Api` calls from `App.tsx`/UI.

### Phase 4: Packaging Structure
- [x] Split shared editor and host shells (`apps/electron`, `apps/web`, `apps/vscode-extension`).
- [ ] Add shared build config and target-specific entrypoints.

### Phase 5: VS Code Host
- [x] Create extension host scaffold (`activate`, command, webview panel).
- [x] Implement webview messaging bridge to platform adapter.
- [x] Implement workspace file read/write and export in extension host.

### Phase 6: Test Matrix
- [x] Add adapter contract tests.
- [x] Add smoke tests per target.
- [x] Document known capability differences per target.

## Iteration Log

### 2026-03-02 (Iteration 1)
Completed:
1. Bookmarks + export workflow extended (PNG, tilemap, both).
2. Baseline direct API usage inventory captured for migration.
3. Plan persisted in-repo.

In progress:
1. Introduce platform abstraction module.
2. Migrate core project/export services to abstraction.

Next:
1. Finish replacing service-level `window.projectApi` calls.
2. Add capability metadata and gate unsupported actions cleanly.
3. Migrate high-traffic UI host calls in `App.tsx`.

### 2026-03-02 (Iteration 2)
Completed:
1. Added shared renderer platform adapter at `src/renderer/platform/api.ts`.
2. Migrated project/import/export services to use `platform` host calls.
3. Migrated App/UI/canvas/tool host integrations (menu, title, options, palette, AI, recording, perf, fullscreen) to `platform`.
4. Verified no remaining direct `window.*Api` usage outside the platform adapter and demo host bootstrap.
5. Verified build/test stability (`build:renderer` and focused vitest suite).
6. Added capability map (`platform.capabilities`) and wired key UI gating for AI/export/fullscreen/options checks.
7. Added platform adapter capability contract tests (`tests/platformApi.test.ts`).

In progress:
1. VS Code host bridge hardening and compatibility.

Next:
1. Complete VS Code bridge contract alignment with full platform API surface.
2. Add shared build config and target-specific entrypoint wiring.
3. Begin `packages/editor-core` code extraction from `src/renderer`.

### 2026-03-02 (Iteration 3)
Completed:
1. Added host target skeleton directories: `apps/web`, `apps/electron`, `apps/vscode-extension`, `packages/editor-core`.
2. Added VS Code extension scaffold (`apps/vscode-extension/extension.js`) with command + webview host.
3. Added webview bridge (`apps/vscode-extension/media/webview-bridge.js`) and message protocol.
4. Added webview asset preparation pipeline (`npm run build:vscode`) via `prepare-webview.mjs`.
5. Added binary-safe payload packing for webview host requests/responses.
6. Implemented VS Code host handlers for project save/load/read and binary export endpoints.

In progress:
1. Expand VS Code host support beyond JSON-backed project payloads to full `.splash` zip compatibility.
2. Align bridge surface for currently unsupported APIs (options/AI/recording/menu dispatch).

Next:
1. Implement `.splash` zip read/write in VS Code host using shared project file codec.
2. Add bridge capability negotiation so UI reflects unsupported host methods.
3. Start extraction of shared renderer into `packages/editor-core`.

### 2026-03-02 (Iteration 4)
Completed:
1. Implemented `.splash` zip read/write support in VS Code host with `.json` fallback parsing.
2. Updated VS Code target docs and build pipeline validation.
3. Re-validated renderer build and focused tests after extension host changes.

In progress:
1. Add bridge-driven capability negotiation for runtime host API variance.
2. Expand target packaging config beyond root-script orchestration.

Next:
1. Implement capability handshake event from extension host to webview bridge.
2. Start extracting renderer modules into `packages/editor-core`.
3. Add VS Code smoke test coverage for open/save/load/export paths.

### 2026-03-02 (Iteration 5)
Completed:
1. Added shared VS Code host core module at `apps/vscode-extension/host-core.js` for codec, capability normalization, and request routing.
2. Added capability negotiation handshake (`pss:ready` + `pss:event/capabilities`) between extension host and webview bridge.
3. Updated renderer platform capabilities to merge explicit host-provided capabilities and react to `pss:capabilities` updates.
4. Added VS Code host smoke tests at `tests/vscodeHostCore.test.ts` covering save/load/read/export request flows.
5. Fixed `.splash` reference file decode filter in VS Code host codec (`references/` prefix guard).

In progress:
1. Shared packaging/build split beyond root scripts.
2. Extraction of host-agnostic renderer modules into `packages/editor-core`.

Next:
1. Define first extraction slice for `packages/editor-core` (project/export services + state stores).
2. Add smoke validation entrypoints for Electron and web demo targets.
3. Document per-target capability matrix (Electron/web/VS Code) in docs.

### 2026-03-02 (Iteration 6)
Completed:
1. Added cross-target smoke scripts in root `package.json` (`smoke:web`, `smoke:electron`, `smoke:vscode`, `smoke:targets`).
2. Added target capability matrix documentation at `docs/target-capability-matrix.md`.
3. Marked Phase 6 test/documentation matrix complete with repeatable smoke commands.

In progress:
1. Shared packaging/build split beyond root-script orchestration.
2. Extraction of host-agnostic renderer modules into `packages/editor-core`.

Next:
1. Extract first host-agnostic module slice into `packages/editor-core`.
2. Wire target-specific app shells to consume extracted package entrypoints.
3. Add CI job wiring for `npm run smoke:targets`.
