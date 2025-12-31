using System;
using System.Collections.Generic;
using System.IO;
using Gtk;
using UI = Gtk.Builder.ObjectAttribute;

namespace PixelSplashStudio
{
    class ToolsPanelWidget : Gtk.Box
    {
        [UI] private Button _colorSwatchButton = null;
        [UI] private DrawingArea _primaryColorSwatch = null;
        [UI] private DrawingArea _secondaryColorSwatch = null;
        [UI] private ToggleButton _toolGrabZoom = null;
        [UI] private ToggleButton _toolPen = null;
        [UI] private ToggleButton _toolLine = null;
        [UI] private ToggleButton _toolRectangle = null;
        [UI] private ToggleButton _toolOval = null;
        [UI] private ToggleButton _toolSelection = null;
        [UI] private ToggleButton _toolSelectionWand = null;
        [UI] private ToggleButton _toolSelectionOval = null;
        [UI] private ToggleButton _toolFloodFill = null;
        [UI] private ToggleButton _toolStamp = null;
        [UI] private ToggleButton _toolErase = null;
        [UI] private ToggleButton _toolReference = null;

        public event System.Action GrabZoomRequested;
        public event System.Action PenRequested;
        public event System.Action LineRequested;
        public event System.Action RectangleRequested;
        public event System.Action OvalRequested;
        public event System.Action SelectionRequested;
        public event System.Action SelectionWandRequested;
        public event System.Action SelectionOvalRequested;
        public event System.Action FloodFillRequested;
        public event System.Action StampRequested;
        public event System.Action EraseRequested;
        public event System.Action ReferenceRequested;
        public event System.Action PaletteSwapRequested;

        private readonly PixelSplashPalette _palette;
        private readonly Dictionary<ToolMode, ToggleButton> _toolButtons;
        private ToolMode _activeTool = ToolMode.GrabZoom;
        private bool _suppressToggle;

        public ToolsPanelWidget(PixelSplashPalette palette) : this(UiBuilder.Load("ToolsPanelWidget.glade"), palette)
        {
        }

        private ToolsPanelWidget(Builder builder, PixelSplashPalette palette) : base(builder.GetRawOwnedObject("ToolsPanelWidget"))
        {
            builder.Autoconnect(this);
            _palette = palette;
            ApplyToolIcons();
            _toolButtons = new Dictionary<ToolMode, ToggleButton>
            {
                { ToolMode.GrabZoom, _toolGrabZoom },
                { ToolMode.Pen, _toolPen },
                { ToolMode.Line, _toolLine },
                { ToolMode.Rectangle, _toolRectangle },
                { ToolMode.Oval, _toolOval },
                { ToolMode.Selection, _toolSelection },
                { ToolMode.SelectionWand, _toolSelectionWand },
                { ToolMode.SelectionOval, _toolSelectionOval },
                { ToolMode.FloodFill, _toolFloodFill },
                { ToolMode.Stamp, _toolStamp },
                { ToolMode.Erase, _toolErase },
                { ToolMode.Reference, _toolReference }
            };
            foreach (var button in _toolButtons.Values)
            {
                button?.StyleContext.AddClass("tool-button");
            }

            _colorSwatchButton.Clicked += (_, __) => PaletteSwapRequested?.Invoke();
            _primaryColorSwatch.Drawn += OnPrimaryColorDraw;
            _secondaryColorSwatch.Drawn += OnSecondaryColorDraw;

            _toolGrabZoom.Toggled += (_, __) => HandleToolToggle(ToolMode.GrabZoom, _toolGrabZoom);
            _toolPen.Toggled += (_, __) => HandleToolToggle(ToolMode.Pen, _toolPen);
            _toolLine.Toggled += (_, __) => HandleToolToggle(ToolMode.Line, _toolLine);
            _toolRectangle.Toggled += (_, __) => HandleToolToggle(ToolMode.Rectangle, _toolRectangle);
            _toolOval.Toggled += (_, __) => HandleToolToggle(ToolMode.Oval, _toolOval);
            _toolSelection.Toggled += (_, __) => HandleToolToggle(ToolMode.Selection, _toolSelection);
            _toolSelectionWand.Toggled += (_, __) => HandleToolToggle(ToolMode.SelectionWand, _toolSelectionWand);
            _toolSelectionOval.Toggled += (_, __) => HandleToolToggle(ToolMode.SelectionOval, _toolSelectionOval);
            _toolFloodFill.Toggled += (_, __) => HandleToolToggle(ToolMode.FloodFill, _toolFloodFill);
            _toolStamp.Toggled += (_, __) => HandleToolToggle(ToolMode.Stamp, _toolStamp);
            _toolErase.Toggled += (_, __) => HandleToolToggle(ToolMode.Erase, _toolErase);
            _toolReference.Toggled += (_, __) => HandleToolToggle(ToolMode.Reference, _toolReference);

            SetActiveTool(ToolMode.GrabZoom);
        }

        private void ApplyToolIcons()
        {
            SetToolIcon(_toolGrabZoom, "grab_zoom", "Grab/Zoom");
            SetToolIcon(_toolPen, "pen", "Pen");
            SetToolIcon(_toolLine, "line", "Line");
            SetToolIcon(_toolRectangle, "rectangle", "Rectangle");
            SetToolIcon(_toolOval, "oval", "Oval");
            SetToolIcon(_toolSelection, "selection_rect", "Selection Rectangle");
            SetToolIcon(_toolSelectionWand, "selection_wand", "Magic Wand");
            SetToolIcon(_toolSelectionOval, "selection_oval", "Selection Oval");
            SetToolIcon(_toolFloodFill, "flood_fill", "Flood Fill");
            SetToolIcon(_toolStamp, "stamp", "Stamp");
            SetToolIcon(_toolErase, "erase", "Erase");
            SetToolIcon(_toolReference, "reference", "Reference");
        }

        private static void SetToolIcon(ToggleButton button, string iconBase, string tooltip)
        {
            if (button == null)
            {
                return;
            }

            bool useDark = UseDarkIcons(button);
            string iconFile = useDark ? $"{iconBase}_dark.png" : $"{iconBase}.png";
            string iconPath = System.IO.Path.Combine(AppContext.BaseDirectory, "res", "icons", iconFile);
            if (!File.Exists(iconPath))
            {
                iconPath = System.IO.Path.Combine("res", "icons", iconFile);
            }

            if (File.Exists(iconPath))
            {
                if (!string.IsNullOrWhiteSpace(tooltip))
                {
                    button.TooltipText = tooltip;
                }
                button.Label = null;
                var image = new Image(iconPath);
                if (button.Child != null)
                {
                    button.Remove(button.Child);
                }
                button.Add(image);
                button.WidthRequest = 48;
                button.HeightRequest = 48;
                button.ShowAll();
            }
        }

        private static bool UseDarkIcons(Widget widget)
        {
            if (widget?.StyleContext == null)
            {
                return false;
            }

            var color = widget.StyleContext.GetColor(StateFlags.Normal);
            double luminance = (0.2126 * color.Red) + (0.7152 * color.Green) + (0.0722 * color.Blue);
            return luminance > 0.6;
        }

        public void SetActiveTool(ToolMode tool)
        {
            _activeTool = tool;
            EnsureActive(tool);
            UpdateActiveToolHighlight();
        }

        private void HandleToolToggle(ToolMode tool, ToggleButton button)
        {
            if (_suppressToggle)
            {
                return;
            }

            if (!button.Active)
            {
                if (_activeTool == tool)
                {
                    _suppressToggle = true;
                    button.Active = true;
                    _suppressToggle = false;
                }

                return;
            }

            _activeTool = tool;
            EnsureActive(tool);
            RaiseToolRequested(tool);
        }

        private void EnsureActive(ToolMode tool)
        {
            _suppressToggle = true;
            _toolGrabZoom.Active = tool == ToolMode.GrabZoom;
            _toolPen.Active = tool == ToolMode.Pen;
            _toolLine.Active = tool == ToolMode.Line;
            _toolRectangle.Active = tool == ToolMode.Rectangle;
            _toolOval.Active = tool == ToolMode.Oval;
            _toolSelection.Active = tool == ToolMode.Selection;
            _toolSelectionWand.Active = tool == ToolMode.SelectionWand;
            _toolSelectionOval.Active = tool == ToolMode.SelectionOval;
            _toolFloodFill.Active = tool == ToolMode.FloodFill;
            _toolStamp.Active = tool == ToolMode.Stamp;
            _toolErase.Active = tool == ToolMode.Erase;
            _toolReference.Active = tool == ToolMode.Reference;
            _suppressToggle = false;
        }

        private void UpdateActiveToolHighlight()
        {
            if (_toolButtons == null)
            {
                return;
            }

            foreach (var pair in _toolButtons)
            {
                if (pair.Value == null)
                {
                    continue;
                }

                if (pair.Key == _activeTool)
                {
                    pair.Value.StyleContext.AddClass("tool-button-active");
                }
                else
                {
                    pair.Value.StyleContext.RemoveClass("tool-button-active");
                }
            }
        }

        private void RaiseToolRequested(ToolMode tool)
        {
            switch (tool)
            {
                case ToolMode.GrabZoom:
                    GrabZoomRequested?.Invoke();
                    break;
                case ToolMode.Pen:
                    PenRequested?.Invoke();
                    break;
                case ToolMode.Line:
                    LineRequested?.Invoke();
                    break;
                case ToolMode.Rectangle:
                    RectangleRequested?.Invoke();
                    break;
                case ToolMode.Oval:
                    OvalRequested?.Invoke();
                    break;
                case ToolMode.Selection:
                    SelectionRequested?.Invoke();
                    break;
                case ToolMode.SelectionWand:
                    SelectionWandRequested?.Invoke();
                    break;
                case ToolMode.SelectionOval:
                    SelectionOvalRequested?.Invoke();
                    break;
                case ToolMode.FloodFill:
                    FloodFillRequested?.Invoke();
                    break;
                case ToolMode.Stamp:
                    StampRequested?.Invoke();
                    break;
                case ToolMode.Erase:
                    EraseRequested?.Invoke();
                    break;
                case ToolMode.Reference:
                    ReferenceRequested?.Invoke();
                    break;
            }
        }

        [GLib.ConnectBefore]
        private void OnPrimaryColorDraw(object sender, DrawnArgs args)
        {
            if (_palette != null && _palette.PrimaryIndex >= 0 && _palette.PrimaryIndex < _palette.Palette.Count)
            {
                var color = _palette.Palette[_palette.PrimaryIndex];
                DrawColorSwatch(args.Cr, color.Item1, color.Item2, color.Item3);
            }
            else
            {
                DrawColorSwatch(args.Cr, 0, 0, 0);
            }
        }

        [GLib.ConnectBefore]
        private void OnSecondaryColorDraw(object sender, DrawnArgs args)
        {
            if (_palette != null && _palette.SecondaryIndex >= 0 && _palette.SecondaryIndex < _palette.Palette.Count)
            {
                var color = _palette.Palette[_palette.SecondaryIndex];
                DrawColorSwatch(args.Cr, color.Item1, color.Item2, color.Item3);
            }
            else
            {
                DrawColorSwatch(args.Cr, 255, 255, 255);
            }
        }

        private void DrawColorSwatch(Cairo.Context ctx, byte r, byte g, byte b)
        {
            ctx.SetSourceRGB(r / 255.0, g / 255.0, b / 255.0);
            ctx.Rectangle(0, 0, _primaryColorSwatch.AllocatedWidth, _primaryColorSwatch.AllocatedHeight);
            ctx.Fill();

            ctx.SetSourceRGB(0.5, 0.5, 0.5);
            ctx.Rectangle(0, 0, _primaryColorSwatch.AllocatedWidth, _primaryColorSwatch.AllocatedHeight);
            ctx.Stroke();
        }

        public void UpdateColorSwatches()
        {
            _primaryColorSwatch?.QueueDraw();
            _secondaryColorSwatch?.QueueDraw();
        }
    }
}
