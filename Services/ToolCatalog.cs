using System;

namespace PixelSplashStudio
{
    public sealed class ToolCatalog
    {
        public PenTool Pen { get; }
        public LineTool Line { get; }
        public RectangleTool Rectangle { get; }
        public OvalTool Oval { get; }
        public SelectionRectangleTool SelectionRectangle { get; }
        public SelectionOvalTool SelectionOval { get; }
        public SelectionWandTool SelectionWand { get; }
        public FloodFillTool FloodFill { get; }
        public StampTool Stamp { get; }
        public EraseTool Erase { get; }

        public ToolCatalog(
            PixelSplashCanvas canvas,
            PixelSplashPalette palette,
            SelectionClipboardService clipboardService)
        {
            if (canvas == null) throw new ArgumentNullException(nameof(canvas));
            if (palette == null) throw new ArgumentNullException(nameof(palette));
            if (clipboardService == null) throw new ArgumentNullException(nameof(clipboardService));

            Pen = new PenTool(canvas, palette);
            Line = new LineTool(canvas, palette);
            Rectangle = new RectangleTool(canvas, palette);
            Oval = new OvalTool(canvas, palette);
            SelectionRectangle = new SelectionRectangleTool(canvas);
            SelectionOval = new SelectionOvalTool(canvas);
            SelectionWand = new SelectionWandTool(canvas);
            FloodFill = new FloodFillTool(canvas, palette);
            Stamp = new StampTool(canvas, palette, () => clipboardService.Clipboard);
            Erase = new EraseTool(canvas);
        }
    }
}
