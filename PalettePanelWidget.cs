using System;
using Cairo;
using Gdk;
using Gtk;

namespace pixel_splash_studio
{
    class PalettePanelWidget : Gtk.Box
    {
        private const int Columns = 8;
        private const int Rows = 8;
        private const int PaletteMargin = 8;
        private const int MinCellSize = 6;
        private const int PageSize = Columns * Rows;

        private readonly PixelSplashPalette _palette;
        private readonly DrawingArea[] _pages;
        private readonly ComboBoxText _paletteSelector;
        private readonly Button _paletteNewButton;
        private readonly Button _paletteSaveButton;
        private readonly Button _paletteImportButton;
        private readonly Button _paletteExportButton;
        private readonly Button _paletteEditButton;
        private readonly Notebook _paletteTabs;
        private bool _suppressSelectionChanged;
        private int _lastSelectedIndex;

        public event System.Action<string> PaletteSelected;
        public event System.Action PaletteNewRequested;
        public event System.Action PaletteSaveRequested;
        public event System.Action PaletteImportRequested;
        public event System.Action PaletteExportRequested;
        public event System.Action PaletteEdited;

        public PalettePanelWidget(PixelSplashPalette palette) : base(Orientation.Vertical, 4)
        {
            _palette = palette;
            _pages = new DrawingArea[4];
            _lastSelectedIndex = _palette?.PrimaryIndex ?? 0;

            Box header = new Box(Orientation.Vertical, 2)
            {
                Visible = true
            };
            Box selectorRow = new Box(Orientation.Horizontal, 4)
            {
                Visible = true
            };
            Label selectorLabel = new Label("Palette")
            {
                Visible = true
            };
            _paletteSelector = new ComboBoxText
            {
                Visible = true
            };
            selectorRow.PackStart(selectorLabel, false, false, 0);
            selectorRow.PackStart(_paletteSelector, true, true, 0);

            Box buttonRow = new Box(Orientation.Horizontal, 4)
            {
                Visible = true
            };
            _paletteNewButton = new Button("New")
            {
                Visible = true
            };
            _paletteSaveButton = new Button("Save")
            {
                Visible = true
            };
            _paletteImportButton = new Button("Import")
            {
                Visible = true
            };
            _paletteExportButton = new Button("Export")
            {
                Visible = true
            };
            _paletteEditButton = new Button("Edit")
            {
                Visible = true
            };
            buttonRow.PackStart(_paletteNewButton, false, false, 0);
            buttonRow.PackStart(_paletteSaveButton, false, false, 0);
            buttonRow.PackStart(_paletteImportButton, false, false, 0);
            buttonRow.PackStart(_paletteExportButton, false, false, 0);
            buttonRow.PackEnd(_paletteEditButton, false, false, 0);

            header.PackStart(selectorRow, false, false, 0);
            header.PackStart(buttonRow, false, false, 0);

            _paletteTabs = new Notebook
            {
                Visible = true,
                CanFocus = false
            };

            for (int i = 0; i < _pages.Length; i++)
            {
                DrawingArea page = new DrawingArea
                {
                    Visible = true,
                    CanFocus = false
                };
                page.Drawn += PaletteArea_Drawn;
                page.AddEvents((int)EventMask.ButtonPressMask);
                page.ButtonPressEvent += PaletteArea_ButtonPressEvent;
                _paletteTabs.AppendPage(page, new Label(i.ToString()));
                _pages[i] = page;
            }

            PackStart(header, false, false, 0);
            PackStart(_paletteTabs, true, true, 0);

            _paletteSelector.Changed += PaletteSelector_Changed;
            _paletteNewButton.Clicked += (_, __) => PaletteNewRequested?.Invoke();
            _paletteSaveButton.Clicked += (_, __) => PaletteSaveRequested?.Invoke();
            _paletteImportButton.Clicked += (_, __) => PaletteImportRequested?.Invoke();
            _paletteExportButton.Clicked += (_, __) => PaletteExportRequested?.Invoke();
            _paletteEditButton.Clicked += (_, __) => EditSelectedColor();
        }

        public void SetPaletteOptions(System.Collections.Generic.IReadOnlyList<string> names, string selectedName)
        {
            _suppressSelectionChanged = true;
            _paletteSelector.RemoveAll();
            int selectedIndex = -1;
            if (names != null)
            {
                for (int i = 0; i < names.Count; i++)
                {
                    string name = names[i];
                    _paletteSelector.AppendText(name);
                    if (!string.IsNullOrWhiteSpace(selectedName) && name == selectedName)
                    {
                        selectedIndex = i;
                    }
                }
            }

            if (selectedIndex >= 0)
            {
                _paletteSelector.Active = selectedIndex;
            }
            else if (names != null && names.Count > 0)
            {
                _paletteSelector.Active = 0;
            }
            else
            {
                _paletteSelector.Active = -1;
            }
            _suppressSelectionChanged = false;
        }

        public void RefreshPalette()
        {
            QueueRedrawPages();
        }

        public void SetDockedMode(bool docked)
        {
            _paletteTabs.SetSizeRequest(-1, docked ? 180 : -1);
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

            _lastSelectedIndex = paletteIndex;
            if (args.Event.Button == 1)
            {
                _palette.PrimaryIndex = paletteIndex;
            }
            else if (args.Event.Button == 3)
            {
                _palette.SecondaryIndex = paletteIndex;
            }

            AppState.Current?.NotifyPaletteColorsChanged();
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

        private void PaletteSelector_Changed(object sender, EventArgs e)
        {
            if (_suppressSelectionChanged)
            {
                return;
            }

            string selected = _paletteSelector.ActiveText;
            if (!string.IsNullOrWhiteSpace(selected))
            {
                PaletteSelected?.Invoke(selected);
            }
        }

        private void EditSelectedColor()
        {
            if (_palette == null || _palette.Palette == null || _palette.Palette.Count == 0)
            {
                return;
            }

            int index = _lastSelectedIndex;
            if (index < 0 || index >= _palette.Palette.Count)
            {
                index = _palette.PrimaryIndex;
            }
            if (index < 0 || index >= _palette.Palette.Count)
            {
                return;
            }

            Gtk.Window parent = Toplevel as Gtk.Window;
            ColorChooserDialog dialog = new ColorChooserDialog("Edit Color", parent);
            try
            {
                var current = _palette.Palette[index];
                dialog.Rgba = new RGBA
                {
                    Red = current.Item1 / 255.0,
                    Green = current.Item2 / 255.0,
                    Blue = current.Item3 / 255.0,
                    Alpha = current.Item4 / 255.0
                };
                dialog.UseAlpha = true;

                if (dialog.Run() == (int)ResponseType.Ok)
                {
                    RGBA selected = dialog.Rgba;
                    _palette.Palette[index] = new Tuple<byte, byte, byte, byte>(
                        (byte)Math.Round(selected.Red * 255),
                        (byte)Math.Round(selected.Green * 255),
                        (byte)Math.Round(selected.Blue * 255),
                        (byte)Math.Round(selected.Alpha * 255));
                    AppState.Current?.NotifyPaletteColorsChanged();
                    QueueRedrawPages();
                    PaletteEdited?.Invoke();
                }
            }
            finally
            {
                dialog.Destroy();
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
