using System;
using Cairo;
using Gdk;
using Gtk;
using UI = Gtk.Builder.ObjectAttribute;

namespace pixel_splash_studio
{
    class FloatingPaletteWidget : Gtk.Window
    {
        [UI] private DrawingArea _palettePage0 = null;
        [UI] private DrawingArea _palettePage1 = null;
        [UI] private DrawingArea _palettePage2 = null;
        [UI] private DrawingArea _palettePage3 = null;

        private const int Columns = 8;
        private const int Rows = 8;
        private const int PaletteMargin = 8;
        private const int MinCellSize = 6;
        private const int PageSize = Columns * Rows;

        private PixelSplashPalette _palette;
        private DrawingArea[] _pages;

        public FloatingPaletteWidget(PixelSplashPalette palette) : this(new Builder("FloatingPaletteWidget.glade"), palette)
        {
        }

        private FloatingPaletteWidget(Builder builder, PixelSplashPalette palette) : base(builder.GetRawOwnedObject("FloatingPaletteWindow"))
        {
            builder.Autoconnect(this);
            _palette = palette;
            _pages = new[] { _palettePage0, _palettePage1, _palettePage2, _palettePage3 };

            for (int i = 0; i < _pages.Length; i++)
            {
                DrawingArea page = _pages[i];
                page.Drawn += PaletteArea_Drawn;
                page.AddEvents((int)(EventMask.ButtonPressMask));
                page.ButtonPressEvent += PaletteArea_ButtonPressEvent;
            }
        }

        private void PaletteArea_Drawn(object sender, DrawnArgs args)
        {
            if (sender is DrawingArea page)
            {
                int pageIndex = Array.IndexOf(_pages, page);
                RenderPalettePage(args.Cr, page, pageIndex);
            }
        }

        private void PaletteArea_ButtonPressEvent(object o, ButtonPressEventArgs args)
        {
            if (_palette == null || o is not DrawingArea page)
            {
                return;
            }

            int pageIndex = Array.IndexOf(_pages, page);
            if (pageIndex < 0)
            {
                return;
            }

            if (!TryGetPaletteIndex(page, pageIndex, args.Event.X, args.Event.Y, out int paletteIndex))
            {
                return;
            }

            if (args.Event.Button == 1)
            {
                _palette.PrimaryIndex = paletteIndex;
            }
            else if (args.Event.Button == 3)
            {
                _palette.SecondaryIndex = paletteIndex;
            }

            QueueRedrawPages();
        }

        private void RenderPalettePage(Context context, DrawingArea page, int pageIndex)
        {
            if (_palette == null || pageIndex < 0)
            {
                return;
            }

            int width = page.AllocatedWidth;
            int height = page.AllocatedHeight;
            if (width <= 0 || height <= 0)
            {
                return;
            }

            int cellWidth = Math.Max(MinCellSize, (width - (PaletteMargin * 2)) / Columns);
            int cellHeight = Math.Max(MinCellSize, (height - (PaletteMargin * 2)) / Rows);

            context.SetSourceRGBA(1, 1, 1, 1);
            context.Rectangle(0, 0, width, height);
            context.Fill();

            int startIndex = pageIndex * PageSize;
            int endIndex = Math.Min(startIndex + PageSize, _palette.Palette.Count);

            for (int i = startIndex; i < endIndex; i++)
            {
                int localIndex = i - startIndex;
                int row = localIndex / Columns;
                int col = localIndex % Columns;
                double x = PaletteMargin + (col * cellWidth);
                double y = PaletteMargin + (row * cellHeight);

                Tuple<byte, byte, byte, byte> color = _palette.Palette[i];
                context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, color.Item4 / 255.0);
                context.Rectangle(x, y, cellWidth, cellHeight);
                context.FillPreserve();

                context.SetSourceRGBA(0, 0, 0, 0.2);
                context.LineWidth = 1;
                context.Stroke();

                if (i == _palette.PrimaryIndex || i == _palette.SecondaryIndex)
                {
                    context.Save();
                    if (i == _palette.PrimaryIndex)
                    {
                        context.SetSourceRGBA(0.05, 0.2, 0.95, 1.0);
                    }
                    else
                    {
                        context.SetSourceRGBA(0.9, 0.15, 0.15, 1.0);
                    }

                    context.LineWidth = 2;
                    context.Rectangle(x + 1, y + 1, cellWidth - 2, cellHeight - 2);
                    context.Stroke();
                    context.Restore();
                }
            }
        }

        private void QueueRedrawPages()
        {
            for (int i = 0; i < _pages.Length; i++)
            {
                _pages[i].QueueDraw();
            }
        }

        private bool TryGetPaletteIndex(DrawingArea page, int pageIndex, double x, double y, out int paletteIndex)
        {
            paletteIndex = -1;

            int width = page.AllocatedWidth;
            int height = page.AllocatedHeight;
            if (width <= 0 || height <= 0)
            {
                return false;
            }

            int cellWidth = Math.Max(MinCellSize, (width - (PaletteMargin * 2)) / Columns);
            int cellHeight = Math.Max(MinCellSize, (height - (PaletteMargin * 2)) / Rows);

            double localX = x - PaletteMargin;
            double localY = y - PaletteMargin;
            if (localX < 0 || localY < 0)
            {
                return false;
            }

            int col = (int)(localX / cellWidth);
            int row = (int)(localY / cellHeight);
            if (col < 0 || col >= Columns || row < 0 || row >= Rows)
            {
                return false;
            }

            int index = (pageIndex * PageSize) + (row * Columns) + col;
            if (index < 0 || index >= _palette.Palette.Count)
            {
                return false;
            }

            paletteIndex = index;
            return true;
        }
    }
}
