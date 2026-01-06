# Pixel Splash Studio

Pixel Splash Studio is a fast, grid-snapped pixel art editor built with Electron + React.

It focuses on a responsive “infinite canvas” workflow: paint pixels in blocks, pan/zoom freely, keep a minimap for navigation, and use reference images as an underlay for planning.

## Highlights

- Infinite canvas (positive + negative world space) with a camera-driven viewport
- Block-based pixel storage (`64x64`) for speed and efficient invalidation
- Non-destructive palette indexing (change a palette color → updates all pixels)
- Layered workflow: reference underlay, pixels, selection mask, and live preview layer
- Tools: Pen, Line, Rectangle, Oval, Fill Bucket, Eyedropper, Selection (rect/oval), Stamp
- Reference images: paste/drag-drop/import, move/rotate/scale, flip, opacity, snapping
- Minimap: zoom/pan controls, axes, camera readout
- `.splash` project format: zipped payload with pixel blocks + embedded reference assets

## Screenshots

These are currently placeholders. Replace the files under `docs/assets/` with real screenshots when available.

![Viewport](docs/assets/screenshot-viewport.svg)
![Reference Tool](docs/assets/screenshot-reference.svg)
![Minimap](docs/assets/screenshot-minimap.svg)

## Getting Started

### Prerequisites

- Node.js (recommend Node 20+)
- npm

### Install

```bash
npm ci
```

### Run (dev)

```bash
npm run dev
```

This runs:
- Vite dev server for the renderer
- TypeScript watch build for Electron (`electron/`)
- Electron app pointed at the dev server

### Build

```bash
npm run build
```

### Build (Docker/CI)

```bash
./scripts/docker-make.sh
```

### Run (built)

```bash
npm start
```

### Tests

```bash
npm test
```

E2E tests (Playwright):

```bash
npm run test:e2e
```

## Project Layout

- `electron/` – Electron main/preload and worker code
- `src/renderer/` – React UI, canvas, tools, and state (Zustand)
- `src/constants.ts` – Cross-project constants (shared by renderer + Electron)
- `tests/` – Unit and E2E tests

## How It Works (High Level)

- Pixels are stored by palette index (not raw RGBA) for efficient edits and smaller project payloads.
- The pixel layer is chunked into `64x64` blocks (`CanvasStore`) so rendering and operations can be localized.
- Tools write to a preview layer while interacting, then commit a batch to the pixel store + history.
- The viewport is camera-based (x/y + zoom) and maps screen coordinates to world coordinates.
- References are rendered underneath the pixel grid and support transforms (move/rotate/scale/flip/opacity).

## Contributing

Pixel Splash Studio is actively evolving; contributions are welcome.

### Ways to help

- Report bugs (include repro steps, platform, and a short recording if possible)
- Improve tools, UI ergonomics, and performance hot spots
- Add documentation and real screenshots
- Add tests around core math (viewport transforms, selection, file persistence)

### Development guidelines

- Prefer removing “magic numbers” by putting shared values in `src/constants.ts`.
- Keep changes focused and avoid drive-by refactors.
- If you add a new tool or feature, include a small unit test when it’s easy to do so.

### Pull requests

1. Fork + create a feature branch
2. Run `npm test` (and `npm run test:e2e` when relevant)
3. Open a PR describing the change and how to verify it

## Roadmap (partial)

See `blueprint.md` for the evolving design notes and planned features.
