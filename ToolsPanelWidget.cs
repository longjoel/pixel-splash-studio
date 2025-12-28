using System;
using System.Collections.Generic;
using System.IO;
using Gtk;
using UI = Gtk.Builder.ObjectAttribute;

namespace pixel_splash_studio
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
        [UI] private Box _toolOptionsBox = null;
        [UI] private Box _rectangleOptions = null;
        [UI] private Box _selectionOptions = null;
        [UI] private Box _stampOptions = null;
        [UI] private Box _referenceOptions = null;
        [UI] private Box _eraseOptions = null;
        [UI] private CheckButton _optionFillShape = null;
        [UI] private CheckButton _optionTransparentOverwrite = null;
        [UI] private CheckButton _optionFillSecondary = null;
        [UI] private Button _optionSelectionCopy = null;
        [UI] private Button _optionSelectionExport = null;
        [UI] private RadioButton _optionSelectionAdd = null;
        [UI] private RadioButton _optionSelectionSubtract = null;
        [UI] private RadioButton _optionSnapPixel = null;
        [UI] private RadioButton _optionSnapTile = null;
        [UI] private CheckButton _optionStampOverwrite = null;
        [UI] private RadioButton _optionStampSnapPixel = null;
        [UI] private RadioButton _optionStampSnapTile = null;
        [UI] private RadioButton _optionScale1x = null;
        [UI] private RadioButton _optionScale2x = null;
        [UI] private RadioButton _optionScale4x = null;
        [UI] private RadioButton _optionRotate0 = null;
        [UI] private RadioButton _optionRotate90 = null;
        [UI] private RadioButton _optionRotate180 = null;
        [UI] private RadioButton _optionRotate270 = null;
        [UI] private CheckButton _optionFlipX = null;
        [UI] private CheckButton _optionFlipY = null;
        [UI] private RadioButton _optionReferenceSnapFree = null;
        [UI] private RadioButton _optionReferenceSnapPixel = null;
        [UI] private RadioButton _optionReferenceSnapTile = null;
        [UI] private Scale _optionReferenceOpacity = null;
        [UI] private RadioButton _optionEraseSize4 = null;
        [UI] private RadioButton _optionEraseSize8 = null;
        [UI] private RadioButton _optionEraseSize16 = null;
        [UI] private RadioButton _optionEraseShapeSquare = null;
        [UI] private RadioButton _optionEraseShapeRound = null;

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
        public event System.Action PaletteToggleRequested;
        public event System.Action<bool> RectangleFillToggled;
        public event System.Action<bool> TransparentOverwriteToggled;
        public event System.Action<bool> FillSecondaryToggled;
        public event System.Action SelectionCopyRequested;
        public event System.Action SelectionExportRequested;
        public event System.Action<SelectionMode> SelectionModeChanged;
        public event System.Action<SelectionSnapMode> SelectionSnapModeChanged;
        public event System.Action<bool> StampOverwriteToggled;
        public event System.Action<StampRotation> StampRotationChanged;
        public event System.Action<bool> StampFlipXToggled;
        public event System.Action<bool> StampFlipYToggled;
        public event System.Action<int> StampScaleChanged;
        public event System.Action<SelectionSnapMode> StampSnapModeChanged;
        public event System.Action<ReferenceSnapMode> ReferenceSnapModeChanged;
        public event System.Action<double> ReferenceOpacityChanged;
        public event System.Action<int> EraseSizeChanged;
        public event System.Action<EraseBrushShape> EraseShapeChanged;

        private readonly Dictionary<ToolId, ToggleButton> _toolButtons;
        private ToolId _activeTool = ToolId.GrabZoom;
        private bool _suppressToggle;
        private bool _suppressOptionEvents;

        public ToolsPanelWidget() : this(new Builder("ToolsPanelWidget.glade"))
        {
        }

        private ToolsPanelWidget(Builder builder) : base(builder.GetRawOwnedObject("ToolsPanelWidget"))
        {
            builder.Autoconnect(this);
            ApplyToolIcons();
            _toolButtons = new Dictionary<ToolId, ToggleButton>
            {
                { ToolId.GrabZoom, _toolGrabZoom },
                { ToolId.Pen, _toolPen },
                { ToolId.Line, _toolLine },
                { ToolId.Rectangle, _toolRectangle },
                { ToolId.Oval, _toolOval },
                { ToolId.Selection, _toolSelection },
                { ToolId.SelectionWand, _toolSelectionWand },
                { ToolId.SelectionOval, _toolSelectionOval },
                { ToolId.FloodFill, _toolFloodFill },
                { ToolId.Stamp, _toolStamp },
                { ToolId.Erase, _toolErase },
                { ToolId.Reference, _toolReference }
            };
            foreach (var button in _toolButtons.Values)
            {
                button?.StyleContext.AddClass("tool-button");
            }

            // Color swatch button wiring
            _colorSwatchButton.Clicked += (_, __) => PaletteToggleRequested?.Invoke();

            // Setup color swatch drawing areas
            _primaryColorSwatch.Drawn += OnPrimaryColorDraw;
            _secondaryColorSwatch.Drawn += OnSecondaryColorDraw;

            _toolGrabZoom.Toggled += (_, __) => HandleToolToggle(ToolId.GrabZoom, _toolGrabZoom);
            _toolPen.Toggled += (_, __) => HandleToolToggle(ToolId.Pen, _toolPen);
            _toolLine.Toggled += (_, __) => HandleToolToggle(ToolId.Line, _toolLine);
            _toolRectangle.Toggled += (_, __) => HandleToolToggle(ToolId.Rectangle, _toolRectangle);
            _toolOval.Toggled += (_, __) => HandleToolToggle(ToolId.Oval, _toolOval);
            _toolSelection.Toggled += (_, __) => HandleToolToggle(ToolId.Selection, _toolSelection);
            _toolSelectionWand.Toggled += (_, __) => HandleToolToggle(ToolId.SelectionWand, _toolSelectionWand);
            _toolSelectionOval.Toggled += (_, __) => HandleToolToggle(ToolId.SelectionOval, _toolSelectionOval);
            _toolFloodFill.Toggled += (_, __) => HandleToolToggle(ToolId.FloodFill, _toolFloodFill);
            _toolStamp.Toggled += (_, __) => HandleToolToggle(ToolId.Stamp, _toolStamp);
            _toolErase.Toggled += (_, __) => HandleToolToggle(ToolId.Erase, _toolErase);
            _toolReference.Toggled += (_, __) => HandleToolToggle(ToolId.Reference, _toolReference);

            _optionFillShape.Toggled += (_, __) => HandleOptionToggle(() => RectangleFillToggled?.Invoke(_optionFillShape.Active));
            _optionTransparentOverwrite.Toggled += (_, __) => HandleOptionToggle(() => TransparentOverwriteToggled?.Invoke(_optionTransparentOverwrite.Active));
            _optionFillSecondary.Toggled += (_, __) => HandleOptionToggle(() => FillSecondaryToggled?.Invoke(_optionFillSecondary.Active));
            _optionSelectionCopy.Clicked += (_, __) => SelectionCopyRequested?.Invoke();
            _optionSelectionExport.Clicked += (_, __) => SelectionExportRequested?.Invoke();
            _optionSelectionAdd.Toggled += (_, __) => HandleSelectionModeToggle();
            _optionSelectionSubtract.Toggled += (_, __) => HandleSelectionModeToggle();
            _optionSnapPixel.Toggled += (_, __) => HandleSelectionSnapToggle();
            _optionSnapTile.Toggled += (_, __) => HandleSelectionSnapToggle();
            _optionStampOverwrite.Toggled += (_, __) => HandleOptionToggle(() => StampOverwriteToggled?.Invoke(_optionStampOverwrite.Active));
            _optionStampSnapPixel.Toggled += (_, __) => HandleStampSnapToggle();
            _optionStampSnapTile.Toggled += (_, __) => HandleStampSnapToggle();
            _optionScale1x.Toggled += (_, __) => HandleScaleToggle();
            _optionScale2x.Toggled += (_, __) => HandleScaleToggle();
            _optionScale4x.Toggled += (_, __) => HandleScaleToggle();
            _optionRotate0.Toggled += (_, __) => HandleRotationToggle();
            _optionRotate90.Toggled += (_, __) => HandleRotationToggle();
            _optionRotate180.Toggled += (_, __) => HandleRotationToggle();
            _optionRotate270.Toggled += (_, __) => HandleRotationToggle();
            _optionFlipX.Toggled += (_, __) => HandleOptionToggle(() => StampFlipXToggled?.Invoke(_optionFlipX.Active));
            _optionFlipY.Toggled += (_, __) => HandleOptionToggle(() => StampFlipYToggled?.Invoke(_optionFlipY.Active));
            _optionReferenceSnapFree.Toggled += (_, __) => HandleReferenceSnapToggle();
            _optionReferenceSnapPixel.Toggled += (_, __) => HandleReferenceSnapToggle();
            _optionReferenceSnapTile.Toggled += (_, __) => HandleReferenceSnapToggle();
            _optionReferenceOpacity.ValueChanged += (_, __) => HandleReferenceOpacityChanged();
            _optionEraseSize4.Toggled += (_, __) => HandleEraseSizeToggle();
            _optionEraseSize8.Toggled += (_, __) => HandleEraseSizeToggle();
            _optionEraseSize16.Toggled += (_, __) => HandleEraseSizeToggle();
            _optionEraseShapeSquare.Toggled += (_, __) => HandleEraseShapeToggle();
            _optionEraseShapeRound.Toggled += (_, __) => HandleEraseShapeToggle();

            SetActiveTool(ToolId.GrabZoom);
            LockOptionsBoxHeight();
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
                button.WidthRequest = 56;
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

        /// <summary>
        /// Explicitly update option visibility based on currently active tool.
        /// Used during initialization to ensure correct visibility state.
        /// </summary>
        public void EnsureOptionVisibility()
        {
            UpdateOptionsVisibility(_activeTool);
        }

        public void SetActiveTool(ToolId tool)
        {
            _activeTool = tool;
            EnsureActive(tool);
            UpdateOptionsVisibility(tool);
            UpdateActiveToolHighlight();
        }

        public void SetRectangleOptions(bool fill, bool overwriteTransparent, bool fillSecondary)
        {
            _suppressOptionEvents = true;
            _optionFillShape.Active = fill;
            _optionTransparentOverwrite.Active = overwriteTransparent;
            _optionFillSecondary.Active = fillSecondary;
            _suppressOptionEvents = false;
        }

        public void SetStampOverwrite(bool overwrite)
        {
            _suppressOptionEvents = true;
            _optionStampOverwrite.Active = overwrite;
            _suppressOptionEvents = false;
        }

        public void SetSelectionMode(SelectionMode mode)
        {
            _suppressOptionEvents = true;
            _optionSelectionAdd.Active = mode == SelectionMode.Add;
            _optionSelectionSubtract.Active = mode == SelectionMode.Subtract;
            _suppressOptionEvents = false;
        }

        public void SetSelectionSnapMode(SelectionSnapMode mode)
        {
            _suppressOptionEvents = true;
            _optionSnapPixel.Active = mode == SelectionSnapMode.Pixel;
            _optionSnapTile.Active = mode == SelectionSnapMode.Tile;
            _suppressOptionEvents = false;
        }

        public void SetStampTransform(StampRotation rotation, bool flipX, bool flipY)
        {
            _suppressOptionEvents = true;
            _optionRotate0.Active = rotation == StampRotation.Deg0;
            _optionRotate90.Active = rotation == StampRotation.Deg90;
            _optionRotate180.Active = rotation == StampRotation.Deg180;
            _optionRotate270.Active = rotation == StampRotation.Deg270;
            _optionFlipX.Active = flipX;
            _optionFlipY.Active = flipY;
            _suppressOptionEvents = false;
        }

        public void SetStampScale(int scale)
        {
            _suppressOptionEvents = true;
            _optionScale1x.Active = scale <= 1;
            _optionScale2x.Active = scale == 2;
            _optionScale4x.Active = scale == 4;
            _suppressOptionEvents = false;
        }

        public void SetStampSnapMode(SelectionSnapMode mode)
        {
            _suppressOptionEvents = true;
            _optionStampSnapPixel.Active = mode == SelectionSnapMode.Pixel;
            _optionStampSnapTile.Active = mode == SelectionSnapMode.Tile;
            _suppressOptionEvents = false;
        }

        public void SetReferenceSnapMode(ReferenceSnapMode mode)
        {
            _suppressOptionEvents = true;
            _optionReferenceSnapFree.Active = mode == ReferenceSnapMode.Free;
            _optionReferenceSnapPixel.Active = mode == ReferenceSnapMode.Pixel;
            _optionReferenceSnapTile.Active = mode == ReferenceSnapMode.Tile;
            _suppressOptionEvents = false;
        }

        public void SetReferenceOpacity(double opacity, bool hasSelection)
        {
            _suppressOptionEvents = true;
            double clamped = Math.Max(0, Math.Min(1, opacity));
            _optionReferenceOpacity.Value = clamped * 100.0;
            _optionReferenceOpacity.Sensitive = hasSelection;
            _suppressOptionEvents = false;
        }

        public void SetEraseOptions(int size, EraseBrushShape shape)
        {
            _suppressOptionEvents = true;
            _optionEraseSize4.Active = size <= 4;
            _optionEraseSize8.Active = size == 8;
            _optionEraseSize16.Active = size == 16;
            _optionEraseShapeSquare.Active = shape == EraseBrushShape.Square;
            _optionEraseShapeRound.Active = shape == EraseBrushShape.Round;
            _suppressOptionEvents = false;
        }

        private void HandleToolToggle(ToolId tool, ToggleButton button)
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

        private void EnsureActive(ToolId tool)
        {
            _suppressToggle = true;
            _toolGrabZoom.Active = tool == ToolId.GrabZoom;
            _toolPen.Active = tool == ToolId.Pen;
            _toolLine.Active = tool == ToolId.Line;
            _toolRectangle.Active = tool == ToolId.Rectangle;
            _toolOval.Active = tool == ToolId.Oval;
            _toolSelection.Active = tool == ToolId.Selection;
            _toolSelectionWand.Active = tool == ToolId.SelectionWand;
            _toolSelectionOval.Active = tool == ToolId.SelectionOval;
            _toolFloodFill.Active = tool == ToolId.FloodFill;
            _toolStamp.Active = tool == ToolId.Stamp;
            _toolErase.Active = tool == ToolId.Erase;
            _toolReference.Active = tool == ToolId.Reference;
            _suppressToggle = false;
        }

        private void UpdateOptionsVisibility(ToolId tool)
        {
            bool showRectangle = tool == ToolId.Rectangle || tool == ToolId.Oval;
            bool showSelection = tool == ToolId.Selection || tool == ToolId.SelectionOval || tool == ToolId.SelectionWand;
            bool showStamp = tool == ToolId.Stamp;
            bool showReference = tool == ToolId.Reference;
            bool showErase = tool == ToolId.Erase;

            _rectangleOptions.Visible = showRectangle;
            _selectionOptions.Visible = showSelection;
            _stampOptions.Visible = showStamp;
            _referenceOptions.Visible = showReference;
            _eraseOptions.Visible = showErase;
            _toolOptionsBox.Visible = true;
        }

        private void LockOptionsBoxHeight()
        {
            if (_toolOptionsBox == null)
            {
                return;
            }

            int maxHeight = 0;
            var optionBoxes = new[]
            {
                _rectangleOptions,
                _selectionOptions,
                _stampOptions,
                _referenceOptions,
                _eraseOptions
            };

            foreach (var box in optionBoxes)
            {
                if (box == null)
                {
                    continue;
                }

                bool wasVisible = box.Visible;
                box.Visible = true;
                box.ShowAll();
                box.GetPreferredHeight(out _, out int naturalHeight);
                maxHeight = Math.Max(maxHeight, naturalHeight);
                box.Visible = wasVisible;
            }

            if (maxHeight > 0)
            {
                _toolOptionsBox.HeightRequest = maxHeight;
                _toolOptionsBox.Visible = true;
            }
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

        private void HandleOptionToggle(System.Action handler)
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            handler?.Invoke();
        }

        private void HandleSelectionModeToggle()
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            SelectionMode mode = _optionSelectionSubtract.Active ? SelectionMode.Subtract : SelectionMode.Add;
            SelectionModeChanged?.Invoke(mode);
        }

        private void HandleSelectionSnapToggle()
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            SelectionSnapMode mode = _optionSnapTile.Active ? SelectionSnapMode.Tile : SelectionSnapMode.Pixel;
            SelectionSnapModeChanged?.Invoke(mode);
        }

        private void HandleRotationToggle()
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            StampRotation rotation = StampRotation.Deg0;
            if (_optionRotate90.Active)
            {
                rotation = StampRotation.Deg90;
            }
            else if (_optionRotate180.Active)
            {
                rotation = StampRotation.Deg180;
            }
            else if (_optionRotate270.Active)
            {
                rotation = StampRotation.Deg270;
            }

            StampRotationChanged?.Invoke(rotation);
        }

        private void HandleScaleToggle()
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            int scale = 1;
            if (_optionScale2x.Active)
            {
                scale = 2;
            }
            else if (_optionScale4x.Active)
            {
                scale = 4;
            }

            StampScaleChanged?.Invoke(scale);
        }

        private void HandleStampSnapToggle()
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            SelectionSnapMode mode = _optionStampSnapTile.Active ? SelectionSnapMode.Tile : SelectionSnapMode.Pixel;
            StampSnapModeChanged?.Invoke(mode);
        }

        private void HandleReferenceSnapToggle()
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            ReferenceSnapMode mode = ReferenceSnapMode.Free;
            if (_optionReferenceSnapPixel.Active)
            {
                mode = ReferenceSnapMode.Pixel;
            }
            else if (_optionReferenceSnapTile.Active)
            {
                mode = ReferenceSnapMode.Tile;
            }

            ReferenceSnapModeChanged?.Invoke(mode);
        }

        private void HandleReferenceOpacityChanged()
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            double opacity = _optionReferenceOpacity.Value / 100.0;
            ReferenceOpacityChanged?.Invoke(opacity);
        }

        private void HandleEraseSizeToggle()
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            int size = 4;
            if (_optionEraseSize8.Active)
            {
                size = 8;
            }
            else if (_optionEraseSize16.Active)
            {
                size = 16;
            }

            EraseSizeChanged?.Invoke(size);
        }

        private void HandleEraseShapeToggle()
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            EraseBrushShape shape = _optionEraseShapeRound.Active ? EraseBrushShape.Round : EraseBrushShape.Square;
            EraseShapeChanged?.Invoke(shape);
        }

        private void RaiseToolRequested(ToolId tool)
        {
            switch (tool)
            {
                case ToolId.GrabZoom:
                    GrabZoomRequested?.Invoke();
                    break;
                case ToolId.Pen:
                    PenRequested?.Invoke();
                    break;
                case ToolId.Line:
                    LineRequested?.Invoke();
                    break;
                case ToolId.Rectangle:
                    RectangleRequested?.Invoke();
                    break;
                case ToolId.Oval:
                    OvalRequested?.Invoke();
                    break;
                case ToolId.Selection:
                    SelectionRequested?.Invoke();
                    break;
                case ToolId.SelectionWand:
                    SelectionWandRequested?.Invoke();
                    break;
                case ToolId.SelectionOval:
                    SelectionOvalRequested?.Invoke();
                    break;
                case ToolId.FloodFill:
                    FloodFillRequested?.Invoke();
                    break;
                case ToolId.Stamp:
                    StampRequested?.Invoke();
                    break;
                case ToolId.Erase:
                    EraseRequested?.Invoke();
                    break;
                case ToolId.Reference:
                    ReferenceRequested?.Invoke();
                    break;
            }
        }

        [GLib.ConnectBefore]
        private void OnPrimaryColorDraw(object sender, DrawnArgs args)
        {
            var palette = AppState.Current?.Palette;
            if (palette != null && palette.PrimaryIndex >= 0 && palette.PrimaryIndex < palette.Palette.Count)
            {
                var color = palette.Palette[palette.PrimaryIndex];
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
            var palette = AppState.Current?.Palette;
            if (palette != null && palette.SecondaryIndex >= 0 && palette.SecondaryIndex < palette.Palette.Count)
            {
                var color = palette.Palette[palette.SecondaryIndex];
                DrawColorSwatch(args.Cr, color.Item1, color.Item2, color.Item3);
            }
            else
            {
                DrawColorSwatch(args.Cr, 255, 255, 255);
            }
        }

        private void DrawColorSwatch(Cairo.Context ctx, byte r, byte g, byte b)
        {
            // Draw the color rectangle
            ctx.SetSourceRGB(r / 255.0, g / 255.0, b / 255.0);
            ctx.Rectangle(0, 0, _primaryColorSwatch.AllocatedWidth, _primaryColorSwatch.AllocatedHeight);
            ctx.Fill();

            // Draw border
            ctx.SetSourceRGB(0.5, 0.5, 0.5);
            ctx.Rectangle(0, 0, _primaryColorSwatch.AllocatedWidth, _primaryColorSwatch.AllocatedHeight);
            ctx.Stroke();
        }

        public void UpdateColorSwatches()
        {
            _primaryColorSwatch?.QueueDraw();
            _secondaryColorSwatch?.QueueDraw();
        }

        public enum ToolId
        {
            GrabZoom,
            Pen,
            Line,
            Rectangle,
            Oval,
            Selection,
            SelectionWand,
            SelectionOval,
            FloodFill,
            Stamp,
            Erase,
            Reference
        }
    }
}
