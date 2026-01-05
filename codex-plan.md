# Pixel Splash Studio Electron Plan

## Goals
- Build an Electron desktop app for an infinite pixel canvas with layered rendering, palette-indexed pixels, and tool-driven editing.
- Establish a modular architecture that supports performance (tiling, caching), undo/redo, and extensible tools.
- Apply inversion of control for tools and dependency injection for shared services.

## Proposed Libraries
- Electron: app shell and desktop integration.
- TypeScript: type safety for data structures and tool contracts.
- Vite: fast dev server and bundling for the renderer.
- React: renderer UI layer.
- Canvas API: primary 2D rendering.
- Zustand: lightweight state container for UI state (tool selection, palette UI, panels).
- Immer: immutable updates for undo/redo-friendly state transitions.
- Zod: runtime validation for project file schema.
- nanoid: stable IDs for blocks, layers, and undo batches.
- Electron Builder: packaging and distributables.

Notes:
- If you prefer a single-file build, replace Vite with Electron Forge or plain Webpack.

## Architecture Overview
- Main process
  - App lifecycle, menus, file dialogs, filesystem access, project persistence.
  - Expose a minimal IPC API to the renderer.
- Renderer process
  - Canvas engine: block store, palette, layers, tile cache, rendering passes.
  - Tool system: inversion of control via a registry and tool interfaces.
  - UI: toolbar, palette editor, minimap, paste preview, settings.

## Design Patterns
- Inversion of control for tools
  - Define a Tool interface with lifecycle hooks: onHover, onBegin, onMove, onEnd, onCancel.
  - Tools receive only the services they need via DI.
  - The active tool is selected by a ToolController which delegates input events.
- Dependency injection for services
  - Create a ServiceContainer (simple map of interfaces to instances).
  - Services include: CanvasStore, Viewport, PaletteStore, HistoryService, ClipboardService, RenderService.
  - Tools request dependencies through their constructor or a factory function.

## Core Data Model
- Palette: 0-255 indexed colors, name, import/export.
- Block store: 64x64 blocks keyed by signed row/col.
- Layers: reference (bitmap + transforms), pixel (indexed), selection mask (bitmask), preview (indexed).
- History: batch diffs per tool action, stored as block-level changes.

## Rendering Pipeline
- Viewport camera maps screen to canvas coordinates.
- Render passes: reference -> pixel -> selection -> preview -> overlays.
- Cached offscreen canvases per block, invalidated on edits.
- Overlays: rulers, pixel grid, tile grid, selection boundary.

## Input & Cursor Model
- Input system normalizes mouse/pen/touch into a cursor state.
- Cursor holds screen/canvas coords and button/modifier state.
- ToolController routes events to the active tool with the current cursor state.

## Clipboard + Stamp
- Clipboard stores selection bitmap and palette indices.
- Stamp tool renders a preview image, then commits on release.
- Support soft/hard stamp, rotate/flip/scale and snapping.

## Persistence
- Project files are zip archives with this layout:
  - `pixels/{row}-{col}.bin` for 64x64 pixel blocks.
  - `references/{ref-name}.png` for reference assets.
  - `data.json` for palette, metadata, and reference transforms.
- Palette matching on load; prompt user if palette not found.
- Export/import palette as separate files.

## Implementation Phases
1) Scaffold
   - Electron + Vite + TypeScript.
   - Base window, renderer bootstrap, IPC plumbing.
2) Core Engine
   - Block store, palette, layers, viewport, render pipeline.
   - Simple drawing and block caching.
3) Tools and History
   - Pen, line, rectangle, oval.
   - Selection rectangle/oval and magic wand.
   - HistoryService for undo/redo batches.
4) UI + Panels
   - Toolbar, palette editor, minimap, paste preview tabs.
   - Settings for grid/ruler visibility.
5) Clipboard + Stamp
   - Copy/cut to buffer, stamp tool with transforms.
6) Persistence + Packaging
   - Save/load projects, export palettes.
   - Electron Builder setup.

## Risks and Mitigations
- Infinite canvas performance: enforce block cache limits and lazy loading.
- Large undo history: store diffs at block-level, not per-pixel.
- Tool complexity: strict contracts and DI to keep tools isolated.

## Next Steps
- Start scaffolding with Electron + Vite + TypeScript.
