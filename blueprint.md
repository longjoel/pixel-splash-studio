Here is the blueprint for pixel splash studio.

Canvas
 - infinite along the x axis in both positive and negitive
 - infinite along the y axis both positive and negitive
 - canvas render is always the bottom layer, with tools/windows/UI floating above it
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
 - secondary color = right click on a swatch
 - primary/secondary indicators shown on the lower left of the palette bar (DOS Paint style)
 - palette shows current palette size, with an empty swatch at the end for quick add
 - ctrl + click on a swatch opens a color picker dialog

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
 - scales to the full drawing bounds, with a minimum display size of 512 x 512 world units
 - viewport rectangle must always remain inside the minimap bounds

Paste preview [second tab]
 - visible when there is something in the clipboard
 - exposed as a tab next to mini-map.

UI layout
 - tools + tool options anchored at the top
 - palette bar anchored bottom center (full-width dock)
 - minimap anchored lower right

 
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
 - can be an outline, or filled, or outlined filled
 - on hover: do nothing
 - on begin use: start tracking the first corner of the rectangle at cursor coordinates
 - on use tool: track the current cursor coordinates, write to the preview buffer.
 - on relase: write the rectangle from the preview buffer to the canvas, clear the preview buffer.
 - restricted to the viewport and selection layer
- Oval
 - draws an oval
 - can be an outline, or filled, or outlined filled
 - on hover: do nothing
 - on begin use: start tracking the first corner of the oval at cursor coordinates
 - on use tool: track the current cursor coordinates, write to the preview buffer.
 - on relase: write the oval from the preview buffer to the canvas, clear the preview buffer.
 - restricted to the viewport and selection layer
Editing Tools
 - actions
  - copy to buffer
   - moves pixels captured by the selection area to the clone buffer
   - clears the current selection buffer
   - switches to the stamp tool.
  - cut to buffer
   - same as copy, but sets the pixel where the buffer was to index 0

- Selection Rectangle
 - for a given rectangle either add it or remove it from the selection layer
 - on hover / tool select: if there is nothing selected, display the selection area, bound to the window, as unselected
 - on begin use:keep track of the start x/y coords for the selection rectangle
 - on use: use the preview layer to show the area that is going to be added to / removed from, keeping track of end x/y
 - on release: write a rectangle to the selection area (start, end), clear the preview buffer
 - restricted to the viewport, does not effect the pixel buffer, writes to the preview buffer / selection buffer
 - options: snap to pixel, snap to tile (8x8, 16x16, 24x24, 32x32)

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
 - on hover: display a preview of the selection buffer as an image over the canvas, through the viewport.
  - cache the bitmap, and draw this until it's time to commit the pixels.
