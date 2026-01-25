# Pixel Splash Studio - Feature List

## Canvas + Viewport
- Infinite canvas in positive and negative space
- Camera-based viewport with pan + zoom
- Pixel grid + tile grid overlays with axis lines
- Selection mask layer and live preview layer
- Reference layer rendered under pixels
- Multiple pixel layers (create, rename, delete, reorder, visibility; tools edit active layer)
- Block-based rendering (64x64) for performance
- Minimap with zoom, pan, axis lines, camera readout, and home controls
- Minimap can collapse/expand
- Paste preview tab in minimap (clipboard preview)

## Drawing Tools
- Pen tool (point, square, round brush shapes; multiple sizes)
- Line tool (optional gradient stroke from palette selection)
- Rectangle tool (filled, outlined, outline+fill; optional gradient fill from palette selection)
- Oval tool (filled, outlined, outline+fill; optional gradient fill from palette selection)
- Fill bucket (color fill, selection fill, gradient dither)
- Eyedropper (primary and secondary color selection)
- Stamp tool (paste clipboard with rotate/scale/flip, soft/hard mode, drag mode, snap)

## Selection Tools
- Rectangle selection
- Oval selection
- Selection snap modes: pixel or tile
- Copy selection to clipboard (active layer only)
- Deep copy selection (Ctrl+Shift+C): merged active layer + visible layers
- Cut selection to clipboard
- Clear selection

## Tile Mapping
- Tile sets (tile size and tile library)
- Tile maps (grid with world origin and size)
- Tile map rendering layered over the pixel canvas
- Tile palette bar with resizable height
- Tile picker alignment controls: columns, rows, offset
- Tile picker placeholders for stride/offset
- Tile picker multi-select (shift add, ctrl remove)
- Tile picker consolidate duplicates
- Tile picker delete tiles with confirmation
- Tile tools:
  - Tile sampler (capture a rectangular region into the tile set)
  - Tile pen (place single or multi-tile selections)
  - Tile rectangle (fills a region; randomizes when multiple tiles are selected)
  - Tile 9-slice (sample a 3x3 region, place filled rectangles)
  - Tile export (export tiles.png + tiles.tmx)

## Palette
- 256-color indexed palette
- Primary/secondary colors
- Palette context menu (set, add, remove)
- Multi-select palette swatches (shift range, alt/meta toggle)
- Edit selected colors in batch
- Clear selected colors (reset to index 0 color)
- Delete selected colors
- Cycle selected colors
- Consolidate duplicate colors
- Swatch presets: complementary, analogous, split complementary, triad, tetrad, tints + shades, pastel, muted, vibrant, monochrome ramp, hue sweep

## References
- Add reference image (file picker or paste)
- Move/rotate/scale references
- Flip X/Y
- Opacity control
- Snap reference transforms to pixel or tile grid
- Auto-trace references by palette range
- Auto-trace references by max colors
- Delete reference

## Import
- Import images/ROMs: BMP, GIF, PCX, TGA, GBR, NES, CHR, GB, GBC, IFF, ILBM, LBM, BBM
- Paste image from clipboard as reference

## Export
- Export selection to PNG
- Export selection to BMP, GIF, PCX, TGA
- Export selection to Game Boy (GBR)
- Export selection to NES (CHR)
- Export selection to BSAVE (CGA, EGA, VGA)
- Export tile map region to Tiled TMX + tiles.png

## Project + File Format
- Save/open projects as .splash
- Project payload includes pixels, palette, references, tile sets, and tile maps
- References embedded in project file
- Undo/redo history stored in project (latest batch window)

## UI + Workflow
- Toolbar with drawing, editing, and tiling tool groups
- Collapsible toolbar
- Actions panel (undo/redo, reference, selection operations)
- Palette bar docked bottom, full width
- Tile bar replaces palette bar while in tiling tools
- Palette bar resizable height
- Shortcut map modal
- License modal
- GitHub link in Help menu
- UI scale controls (menu reset, zoom handling)
- Options menu toggles:
  - Consolidate palette
  - Memory usage readout
  - Performance logging
  - Tile debug overlay

## Performance
- Batched pixel writes with history tracking
- Dirty block rendering cache
- Selection caching and preview layer for fast tool feedback
- Worker-based project writing to keep UI responsive
