Here is the blueprint for pixel splash studio.

Canvas
 - infinite along the x axis in both positive and negitive
 - infinite along the y axis both positive and negitive
 - canvas render is always the bottom layer, with tools/windows/UI floating above it
 - pixel rendering snaps to grid cells (pen draws continuous line segments between points)
 - pixels are written to the canvas as batches
 - these batches will be stored to handle undo / redo
 - pixels (x, y, color) are indexed against a Palette
 - pixels are stored in blocks, 64 x 64 pixels (layer 1)
    - blocks are stored in rows. block[row][col] - this keeps it quick to look up, densly packed
    - to set a pixel, you must find it's block address [row] (divide y by 64) (keep in mind negitive space) [col] how far away from 0 the block is on the y axis.
    - take the remainder (remember for negitive space) to find the local x,y
    - fastest to copy line by line, block by block, or even block spans
 - Selection mask (layer 2)
    - a collection of blocks similar to the pixel layer, but a boolean mask for each pixel, in a given range over a viewport
    - you can paint the selection layer just like the pixel layer, but only two values, on and off, 0x00000000 | 0xFFFFFFFF
    - you can use the selection mask to restrict the use of tools, populate the clipboard stack
    - selected pixels are slightly brighter, unselected pixels are slightly darker.
    - dashed outlines along the boundary between selected and unselected.
    - current implementation: darken full view then brighten selected pixels
 - Preview layer (layer 3)
    - this layer is used by to the tools to show 'where' it's going to draw. For example, using a pen, places the pixel immediately. a line tool should not finalize
      the line location until the mouse button is released. This will show even over the selection mask.
 - reference layer (layer 0)
    - this layer is the lowest layer and contains images, text, and measurements that are helpful to the users in some planning capacity.
    - objects from this layer can be coppied to the pixel layer in two ways
        - using the existing palette
        - allowing the tool to overwrite the palette to match what's available in the image
    - objects in this layer can be translated, rotated, scaled, pinched, tilted, etc.
    - objects have selectable opacity
    - behind the reference layer is a background color that matches the 0th palette color.
    - drag/drop or paste images to add references
   
 
Viewport
 - connects the canvas to a window. 
 - accepts input from the host system
 - 'controls' the canvas
 - camera (region covered by the canvas)
   - x, y, w, h
 - translates screen coordinates to canvas coordinates
 - acts as a natural bounds for tools.
 - acts as a workspace, caches clean tiles
 - caches canvas at that location.
 - middle mouse drag pans the camera
 - mouse wheel zooms toward the cursor position
 - ruler along the top and left
 - pixel grid color 
 - pixel grid vanish distance
 - tile grid size (8x8, 16x16, 24x24, 32x32)
 - tile grid color
 - tile grid vanish distance (how far zoomed out before it disappears.)
 - draw axis lines at x=0 and y=0 over the grid
 - viewport resizes with the window at all times

Palette
 - contains up to 256 colors
 - has a name
 - is attached to the canvas
 - changing a palette color will change all currently drawn pixels
 - ability to import from other programs, like asprite, paintshop pro
 - ability to export palette. 
 - when a project is loaded, check the existing palette, if there is a matching one, use that one
 - if there isn't a copy of it locally, you will be given the option to import it from the file.
 - palette bar UI is docked to the bottom of the screen (full width), showing all colors at once
 - primary color = left click on a swatch
 - secondary color = ctrl + left click on a swatch
 - right click opens a context menu: set color, remove color, add color, add swatch
 - add swatch offers preset palettes (complementary, analogous, split complementary, triad, tetrad, tints + shades, pastel, muted, vibrant, monochrome ramp, hue sweep)
 - set color and add color open a color picker dialog
 - primary/secondary indicators shown on the lower left of the palette bar (DOS Paint style)
 - palette shows current palette size, with an empty swatch at the end for quick add

Cursor
 - connects a tool to a viewport
 - primary index
 - secondary index
 - screen x, y
 - canvas x, y
 - primary (left click) | secondary (right click) | modifiers (ctrl, alt, shift)

Minimap [first tab]
 - shows the full extent of the canvas in a mini map, that acts as a pan and zoom
 - only displays the pixel layer, and an overlay where the camera is.
 - has a zoom in / zoom out / home button
 - anchored to the lower right of the screen
 - shows axis lines for x=0 and y=0
 - shows readout for camera x, camera y, and zoom
 - camera x/y are editable inputs (enter/blur to warp)
 - scales to the full drawing bounds, with a minimum display size of 512 x 512 world units
 - viewport rectangle must always remain inside the minimap bounds
 - panning behaves like an on-screen joystick (smoothed movement)
 - minimap scale matches viewport world scale (uses the same grid cell units as the canvas)
 - minimap rendering samples pixels more aggressively as zoom decreases

Paste preview [second tab]
 - visible when there is something in the clipboard
 - exposed as a tab next to mini-map.

UI layout
 - tools + tool options anchored at the top
 - toolbar can be collapsed to reclaim space
 - tools are grouped into drawing and editing sections
 - tools are always visible in the toolbar, actions follow options when available
 - toolbar header shows the active tool name
 - tool buttons use compact icon labels with tooltips
 - actions panel anchored at the top with context-sensitive actions
  - show undo/redo only when available
  - show clear selection only when a selection exists
  - show copy/cut selection when a selection exists
  - add reference from file is always available
 - palette bar anchored bottom center (full-width dock)
 - minimap anchored lower right and can be collapsed
 - header bar removed; file operations live in app menu/title bar
 - help menu shows shortcut map in an in-app modal
 - drawing tools are disabled below 0.6 zoom with a disabled cursor
 - options menu includes a performance logging toggle
 - options menu includes a memory usage toggle that reports state sizes in the window bar

File menu and persistence
 - New/Open/Save/Save As live in the app menu (no header buttons)
 - project file extension is .splash
 - undo/redo history is persisted in project files, capped to last 8 actions
 - reference images are stored inside the project zip under references/
 - project payload includes tile sets + tile maps (see Tile Mapping)

Tile Mapping
 - tile sets define tile size (w, h) and a list of tiles extracted from pixel data
 - a tile is a bounded pixel region stored as a reusable asset
 - tile map is a grid of tile indices referencing a tile set
 - tile maps have origin (x, y) in world space and a grid size (cols, rows)
 - tile map render is a layer over the pixel canvas, aligned to the tile grid
 - tile picker shows tiles with alignment controls (columns, rows, offset) and placeholders
 - tile picker supports multi-select (shift add, ctrl remove)
 - tile picker can consolidate duplicate tiles or delete selected tiles with confirmation
 - export tile map region to Tiled TMX with tiles.png atlas
 - selection to tile: convert selection bounds into a tile (snap to tile size)
 - tile set builder
    - extract tiles from selection or a pixel region
    - de-duplicate tiles by pixel content
    - assign tile IDs and optionally name groups
 - tile map editor
    - paint tiles into the tile map grid
    - erase tiles (set empty index)
    - sample tile from map (eyedropper for tiles)
    - snap to tile grid by default
 - tile map tools
    - tile sampler: capture a rectangular region into the tile set
    - tile pen: place single or multi-tile selections
    - tile rectangle: fill a rectangular region, random when multiple tiles selected
    - tile 9-slice: sample a 3x3 set and fill rectangles (corners/edges/center)
    - tile export: export a tile map region as tiles.png + tiles.tmx (Tiled)

Performance work log
 - project saves are written in a worker thread to keep UI responsive
 - pen stroke commits batch pixel writes (single version bump)
 - viewport caches block canvases and refreshes only dirty blocks
 - minimap downsampling increases as zoom decreases
 - perf logging writes to OS temp file on pen end and slow renders, toggleable in Options

 
Drawing Tools
- Pen
 - draws either the primary color or the secondary color depending on the mouse button or trigger.
 - brush can either be 1px, 4px, 8px, and square or round
 - on hover: display the brush in the preview layer, clearing the preview layer every frame 
 - on begin use: start tracking coordinates of the pen and if its a primary or secondary palette index
 - on use tool: write data to the preview layer.
 - on release: flush the writes to the canvas.
 - restricted to the viewport and selection layer
- Line
 - draws a single pixel wide line from a start coordinate to an end coordinate
 - on hover: do nothing
 - on begin use: keep track of where the start coordinates are
 - on use tool: write data to the preview layer, clear the preview layer between renders, using either the primary or secondary color
 - on release: write the preview layer to pixel layer, then clear the preview layer.
 - restricted to the viewport and selection layer
- Rectangle
 - draws a rectangle
 - can be filled, outlined, or primary outline with secondary fill
 - on hover: do nothing
 - on begin use: start tracking the first corner of the rectangle at cursor coordinates
 - on use tool: track the current cursor coordinates, write to the preview buffer.
 - on relase: write the rectangle from the preview buffer to the canvas, clear the preview buffer.
 - restricted to the viewport and selection layer
- Oval
 - draws an oval
 - can be filled, outlined, or primary outline with secondary fill
 - on hover: do nothing
 - on begin use: start tracking the first corner of the oval at cursor coordinates
 - on use tool: track the current cursor coordinates, write to the preview buffer.
 - on relase: write the oval from the preview buffer to the canvas, clear the preview buffer.
 - restricted to the viewport and selection layer
 - drawing tools are restricted to selected pixels when a selection exists
- Fill Bucket
 - flood fills a region with the primary color.
 - flood fill can either fill based on source color, or fill based on selection area
 - if it's the selection area, it's the entire selection area, regardless of if it's continuous or not.
 - you are not allowed to flood fill in an unbounded area.
 - on hover: do nothing,
 - on begin use, determine the volume that needs to be filled, and fill that space.
 - on use tool: do nothing
 - on release: do nothing.
 - restricted to the viewport, the selection area or pixels bound to the current selected shape of a matching color.
- Eyedropper
 - selects the palette index under the cursor
 - left click sets the primary color, ctrl + left click or right click sets the secondary color
 - on hover: clear the preview layer
 - on begin use: read the pixel at cursor position and set the palette index
Editing Tools
 - actions
  - copy to buffer
   - moves pixels captured by the selection area to the clone buffer
   - clears the current selection buffer
   - switches to the stamp tool.
  - cut to buffer
   - same as copy, but sets the pixel where the buffer was to index 0

- Reference Handle
 - select a reference image by clicking it
 - drag inside the bounds to move it
 - drag corner handles to scale uniformly
 - options: snap to pixel, snap to tile
 - options: rotation -180 to +180
 - options: scale 0.25x to 5x
 - options: flip x, flip y
 - options: opacity 0 to 1
 - adding a reference (paste, drop, file) switches to the reference tool

- Selection Rectangle
 - for a given rectangle either add it or remove it from the selection layer
 - on hover / tool select: if there is nothing selected, display the selection area, bound to the window, as unselected
 - on begin use:keep track of the start x/y coords for the selection rectangle
 - on use: use the preview layer to show the area that is going to be added to / removed from, keeping track of end x/y
 - on release: write a rectangle to the selection area (start, end), clear the preview buffer
 - restricted to the viewport, does not effect the pixel buffer, writes to the preview buffer / selection buffer
 - options: snap to pixel, snap to tile (8x8, 16x16, 24x24, 32x32)
 - current implementation: left click adds, ctrl subtracts, right click clears selection

- Selection oval
 - for a given oval either add it or remove it from the selection layer
 - on hover / tool select: if there is nothing selected, display the selection area, bound to the window, as unselected
 - on begin use:keep track of the start x/y coords for the selection rectangle
 - on use: use the preview layer to show the area that is going to be added to / removed from, keeping track of end x/y
 - on release: write a rectangle to the selection area (start, end), clear the preview buffer
 - restricted to the viewport, does not effect the pixel buffer, writes to the preview buffer / selection buffer
 - options: snap to pixel, snap to tile (8x8, 16x16, 24x24, 32x32)

- magic wand
 - selects adjacent pixels of the same palette index recursively, bound by the viewport, and a maximum of x iterations.
 - can add / remove to the selection mask.
 - on hover / tool select: if there is nothing selected, display the selection area, bound to the window, as unselected
 - on begin use:keep track of the start x/y coords for the magic wand
 - on use: do nothing, wait for release
 - on release: perform the traversal over similar pixels to the selection area
 - restricted to the viewport, does not effect the pixel buffer, writes to the preview buffer / selection buffer

- stamp tool
 - pastes the contents of the selection buffer to the canvas, through the viewport
 - there is an option to soft stamp, meaning not overwrite destination pixels where the source pixel is transparent
 - there is a hard stamp option, overwriting the destination pixel with the source pixel, regardless if 's transparent
 - you can paste the contents rotated 90, 180, 270 degrees, flipped horizontally or vertically, and scaled 2x, 4x, 8x
 - can snap to pixel or tile (8x8, 16x16, 24x24, 32x32)
 - optional drag mode stamps repeatedly while dragging to leave a trail
 - on hover: display a preview of the selection buffer as an image over the canvas, through the viewport.
  - cache the bitmap, and draw this until it's time to commit the pixels.
