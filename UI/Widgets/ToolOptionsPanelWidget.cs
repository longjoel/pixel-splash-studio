using System;
using Gtk;
using UI = Gtk.Builder.ObjectAttribute;

namespace PixelSplashStudio
{
    class ToolOptionsPanelWidget : Gtk.Box
    {
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
        [UI] private Button _optionSelectionCut = null;
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

        public event System.Action<bool> RectangleFillToggled;
        public event System.Action<bool> TransparentOverwriteToggled;
        public event System.Action<bool> FillSecondaryToggled;
        public event System.Action SelectionCopyRequested;
        public event System.Action SelectionCutRequested;
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

        private ToolMode _activeTool = ToolMode.GrabZoom;
        private bool _suppressOptionEvents;

        public ToolOptionsPanelWidget() : this(UiBuilder.Load("ToolOptionsPanelWidget.glade"))
        {
        }

        private ToolOptionsPanelWidget(Builder builder) : base(builder.GetRawOwnedObject("ToolOptionsPanelWidget"))
        {
            builder.Autoconnect(this);

            _optionFillShape.Toggled += (_, __) => HandleOptionToggle(() => RectangleFillToggled?.Invoke(_optionFillShape.Active));
            _optionTransparentOverwrite.Toggled += (_, __) => HandleOptionToggle(() => TransparentOverwriteToggled?.Invoke(_optionTransparentOverwrite.Active));
            _optionFillSecondary.Toggled += (_, __) => HandleOptionToggle(() => FillSecondaryToggled?.Invoke(_optionFillSecondary.Active));
            _optionSelectionCopy.Clicked += (_, __) => SelectionCopyRequested?.Invoke();
            _optionSelectionCut.Clicked += (_, __) => SelectionCutRequested?.Invoke();
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

            SetActiveTool(ToolMode.GrabZoom);
            LockOptionsBoxHeight();
        }

        public void EnsureOptionVisibility()
        {
            UpdateOptionsVisibility(_activeTool);
        }

        public void SetActiveTool(ToolMode tool)
        {
            _activeTool = tool;
            UpdateOptionsVisibility(tool);
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

        private void UpdateOptionsVisibility(ToolMode tool)
        {
            bool showRectangle = tool == ToolMode.Rectangle || tool == ToolMode.Oval;
            bool showSelection = tool == ToolMode.Selection || tool == ToolMode.SelectionOval || tool == ToolMode.SelectionWand;
            bool showStamp = tool == ToolMode.Stamp;
            bool showReference = tool == ToolMode.Reference;
            bool showErase = tool == ToolMode.Erase;

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
    }
}
