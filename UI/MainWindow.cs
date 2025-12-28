using System;
using System.Collections.Generic;
using Gdk;
using Gtk;
using UI = Gtk.Builder.ObjectAttribute;

namespace PixelSplashStudio
{
    class MainWindow : Gtk.Window
    {
        [UI] private Box _viewportTab1 = null;
        [UI] private Box _viewportTab2 = null;
        [UI] private Notebook _viewportTabs = null;
        [UI] private Box _dockToolsHost = null;
        [UI] private MenuItem _toolGrabZoom = null;
        [UI] private MenuItem _toolPen = null;
        [UI] private MenuItem _toolLine = null;
        [UI] private MenuItem _toolRectangle = null;
        [UI] private MenuItem _toolSelection = null;
        [UI] private MenuItem _toolSelectionWand = null;
        [UI] private MenuItem _toolFloodFill = null;
        [UI] private MenuItem _toolSelectionOval = null;
        [UI] private MenuItem _toolStamp = null;
        [UI] private MenuItem _toolOval = null;
        [UI] private MenuItem _toolReference = null;
        [UI] private MenuItem _toolErase = null;
        [UI] private MenuItem _menuOptions = null;
        [UI] private MenuItem _editUndo = null;
        [UI] private MenuItem _editRedo = null;
        [UI] private MenuItem _editCopy = null;
        [UI] private MenuItem _fileNew = null;
        [UI] private MenuItem _fileOpen = null;
        [UI] private MenuItem _fileSave = null;
        [UI] private MenuItem _fileSaveAs = null;
        [UI] private CheckMenuItem _optionRectangleFill = null;
        [UI] private CheckMenuItem _optionTransparentOverwrite = null;
        [UI] private CheckMenuItem _optionFillSecondary = null;
        [UI] private CheckMenuItem _optionStampOverwrite = null;
        [UI] private MenuItem _optionSelectionCopy = null;
        [UI] private MenuItem _optionSelectionExport = null;
        [UI] private RadioMenuItem _optionSelectionAdd = null;
        [UI] private RadioMenuItem _optionSelectionSubtract = null;
        [UI] private RadioMenuItem _optionSelectionSnapPixel = null;
        [UI] private RadioMenuItem _optionSelectionSnapTile = null;
        [UI] private SeparatorMenuItem _optionSelectionSeparator = null;
        [UI] private SeparatorMenuItem _optionSelectionSnapSeparator = null;
        [UI] private SeparatorMenuItem _optionSelectionClearSeparator = null;
        [UI] private SeparatorMenuItem _optionStampSeparator = null;
        [UI] private SeparatorMenuItem _optionStampSnapSeparator = null;
        [UI] private RadioMenuItem _optionStampSnapPixel = null;
        [UI] private RadioMenuItem _optionStampSnapTile = null;
        [UI] private SeparatorMenuItem _optionStampScaleSeparator = null;
        [UI] private RadioMenuItem _optionStampScale1 = null;
        [UI] private RadioMenuItem _optionStampScale2 = null;
        [UI] private RadioMenuItem _optionStampScale4 = null;
        [UI] private SeparatorMenuItem _optionStampRotateSeparator = null;
        [UI] private RadioMenuItem _optionStampRotate0 = null;
        [UI] private RadioMenuItem _optionStampRotate90 = null;
        [UI] private RadioMenuItem _optionStampRotate180 = null;
        [UI] private RadioMenuItem _optionStampRotate270 = null;
        [UI] private SeparatorMenuItem _optionStampFlipSeparator = null;
        [UI] private CheckMenuItem _optionStampFlipX = null;
        [UI] private CheckMenuItem _optionStampFlipY = null;
        [UI] private SeparatorMenuItem _optionEraseSeparator = null;
        [UI] private RadioMenuItem _optionEraseSize4 = null;
        [UI] private RadioMenuItem _optionEraseSize8 = null;
        [UI] private RadioMenuItem _optionEraseSize16 = null;
        [UI] private SeparatorMenuItem _optionEraseShapeSeparator = null;
        [UI] private RadioMenuItem _optionEraseShapeSquare = null;
        [UI] private RadioMenuItem _optionEraseShapeRound = null;
        [UI] private SeparatorMenuItem _optionReferenceSeparator = null;
        [UI] private RadioMenuItem _optionReferenceSnapFree = null;
        [UI] private RadioMenuItem _optionReferenceSnapPixel = null;
        [UI] private RadioMenuItem _optionReferenceSnapTile = null;
        [UI] private SeparatorMenuItem _optionReferenceOpacitySeparator = null;
        [UI] private MenuItem _optionReferenceOpacityItem = null;
        [UI] private Scale _optionReferenceOpacity = null;
        [UI] private MenuItem _optionClearSelection = null;
        [UI] private MenuItem _optionEraseSelection = null;
        [UI] private SeparatorMenuItem _optionShapeSeparator = null;
        [UI] private CheckMenuItem _viewPaletteToggle = null;
        [UI] private CheckMenuItem _viewToolbarToggle = null;
        [UI] private MenuItem _viewNewViewport = null;

        private readonly PixelSplashCanvas _canvas;
        private readonly PixelSplashPalette _palette;
        private readonly CanvasViewportWidget _viewA;
        private readonly CanvasViewportWidget _viewB;
        private readonly PenTool _penTool;
        private readonly LineTool _lineTool;
        private readonly RectangleTool _rectangleTool;
        private readonly SelectionRectangleTool _selectionTool;
        private readonly SelectionOvalTool _selectionOvalTool;
        private readonly SelectionWandTool _selectionWandTool;
        private readonly FloodFillTool _floodFillTool;
        private readonly StampTool _stampTool;
        private readonly OvalTool _ovalTool;
        private readonly EraseTool _eraseTool;
        private readonly PalettePanelWidget _palettePanel;
        private readonly FloatingPaletteWidget _paletteWindow;
        private readonly ToolsPanelWidget _toolbarPanel;
        private readonly Gtk.Window _toolbarWindow;
        private readonly ViewportTool _viewportTool;
        private readonly CanvasViewportSettings _viewportSettings;
        private readonly AppConfig _config;
        private readonly AppState _appState;
        private readonly PaletteLibraryService _paletteLibraryService;
        private readonly CanvasHistoryService _history;
        private readonly CanvasFileService _canvasFiles;
        private readonly SelectionExportService _selectionExport;
        private readonly SelectionClipboardService _clipboardService;
        private readonly ToolCatalog _tools;
        private readonly ViewportFactory _viewportFactory;
        private readonly List<CanvasViewportWidget> _viewports = new List<CanvasViewportWidget>();
        private readonly Dictionary<Gtk.Window, CanvasViewportWidget> _detachedViewports = new Dictionary<Gtk.Window, CanvasViewportWidget>();
        private readonly Dictionary<CanvasViewportWidget, ViewportContext> _viewportContexts = new Dictionary<CanvasViewportWidget, ViewportContext>();
        private bool _suppressOptionEvents;
        private bool _suppressPaletteSelection;
        private readonly AccelGroup _accelGroup = new AccelGroup();
        private string _currentFilePath;

        public MainWindow(MainWindowDependencies dependencies) : this(UiBuilder.Load("MainWindow.glade"), dependencies) { }

        private MainWindow(Builder builder, MainWindowDependencies dependencies) : base(builder.GetRawOwnedObject("MainWindow"))
        {
            if (dependencies == null)
            {
                throw new ArgumentNullException(nameof(dependencies));
            }

            builder.Autoconnect(this);
            AddAccelGroup(_accelGroup);
            _config = dependencies.Config;
            _appState = dependencies.AppState;
            _canvas = dependencies.Canvas;
            _palette = dependencies.Palette;
            _viewportSettings = dependencies.ViewportSettings;
            _paletteLibraryService = dependencies.PaletteLibrary;
            _history = dependencies.History;
            _canvasFiles = dependencies.CanvasFiles;
            _selectionExport = dependencies.SelectionExport;
            _clipboardService = dependencies.ClipboardService;
            _tools = dependencies.Tools;
            _viewportFactory = dependencies.ViewportFactory;
            _viewportTool = dependencies.ViewportTool;
            
            UpdateBackgroundFromPalette();
            ViewportContext viewAContext = _viewportFactory.CreateViewport();
            ViewportContext viewBContext = _viewportFactory.CreateViewport();
            _viewA = viewAContext.Widget;
            _viewB = viewBContext.Widget;
            _viewportContexts[_viewA] = viewAContext;
            _viewportContexts[_viewB] = viewBContext;

            _viewportTab1.PackStart(_viewA, true, true, 0);
            _viewportTab2.PackStart(_viewB, true, true, 0);

            _viewA.Show();
            _viewB.Show();

            _penTool = _tools.Pen;
            _lineTool = _tools.Line;
            _rectangleTool = _tools.Rectangle;
            _selectionTool = _tools.SelectionRectangle;
            _selectionOvalTool = _tools.SelectionOval;
            _selectionWandTool = _tools.SelectionWand;
            _selectionTool.TileSize = _config.TileGridSize;
            _selectionOvalTool.TileSize = _config.TileGridSize;
            _floodFillTool = _tools.FloodFill;
            _stampTool = _tools.Stamp;
            _ovalTool = _tools.Oval;
            _eraseTool = _tools.Erase;
            _eraseTool.Size = _appState.EraseSize;
            _eraseTool.Shape = _appState.EraseShape;

            _viewports.Add(_viewA);
            _viewports.Add(_viewB);
            AttachViewportHandlers(_viewA);
            AttachViewportHandlers(_viewB);

            ThemeHelper.ApplyWindowBackground(this);

            _palettePanel = new PalettePanelWidget(_palette);
            _paletteWindow = new FloatingPaletteWidget(_palettePanel)
            {
                TransientFor = this
            };
            _paletteWindow.DeleteEvent += PaletteWindow_DeleteEvent;

            _toolbarPanel = new ToolsPanelWidget(_palette);
            _toolbarWindow = new Gtk.Window("Tools")
            {
                TransientFor = this
            };
            _toolbarWindow.SetDefaultSize(220, 520);
            ThemeHelper.ApplyWindowBackground(_toolbarWindow);
            _toolbarWindow.DeleteEvent += ToolbarWindow_DeleteEvent;

            // Wire up MESSAGE UP: Toolbar events notify changes
            _toolbarPanel.GrabZoomRequested += () => _appState.SetActiveTool(ToolMode.GrabZoom);
            _toolbarPanel.PenRequested += () => _appState.SetActiveTool(ToolMode.Pen);
            _toolbarPanel.LineRequested += () => _appState.SetActiveTool(ToolMode.Line);
            _toolbarPanel.RectangleRequested += () => _appState.SetActiveTool(ToolMode.Rectangle);
            _toolbarPanel.OvalRequested += () => _appState.SetActiveTool(ToolMode.Oval);
            _toolbarPanel.SelectionRequested += () => _appState.SetActiveTool(ToolMode.Selection);
            _toolbarPanel.SelectionWandRequested += () => _appState.SetActiveTool(ToolMode.SelectionWand);
            _toolbarPanel.SelectionOvalRequested += () => _appState.SetActiveTool(ToolMode.SelectionOval);
            _toolbarPanel.FloodFillRequested += () => _appState.SetActiveTool(ToolMode.FloodFill);
            _toolbarPanel.StampRequested += () => _appState.SetActiveTool(ToolMode.Stamp);
            _toolbarPanel.EraseRequested += () => _appState.SetActiveTool(ToolMode.Erase);
            _toolbarPanel.ReferenceRequested += () => _appState.SetActiveTool(ToolMode.Reference);
            _toolbarPanel.RectangleFillToggled += _appState.SetRectangleFill;
            _toolbarPanel.TransparentOverwriteToggled += _appState.SetTransparentOverwrite;
            _toolbarPanel.FillSecondaryToggled += _appState.SetShapeFillUseSecondary;
            _toolbarPanel.SelectionModeChanged += _appState.SetSelectionMode;
            _toolbarPanel.SelectionSnapModeChanged += _appState.SetSelectionSnapMode;
            _toolbarPanel.StampOverwriteToggled += _appState.SetStampOverwrite;
            _toolbarPanel.StampRotationChanged += _appState.SetStampRotation;
            _toolbarPanel.StampFlipXToggled += _appState.SetStampFlipX;
            _toolbarPanel.StampFlipYToggled += _appState.SetStampFlipY;
            _toolbarPanel.StampScaleChanged += _appState.SetStampScale;
            _toolbarPanel.StampSnapModeChanged += _appState.SetStampSnapMode;
            _toolbarPanel.ReferenceSnapModeChanged += _appState.SetReferenceSnapMode;
            _toolbarPanel.ReferenceOpacityChanged += HandleReferenceOpacityChanged;
            _toolbarPanel.EraseSizeChanged += _appState.SetEraseSize;
            _toolbarPanel.EraseShapeChanged += _appState.SetEraseShape;
            _toolbarPanel.SelectionCopyRequested += () => EditCopy_Activated(this, EventArgs.Empty);
            _toolbarPanel.SelectionExportRequested += () => ExportSelection_Activated(this, EventArgs.Empty);
            _toolbarPanel.PaletteToggleRequested += () =>
            {
                if (_viewPaletteToggle == null)
                {
                    return;
                }

                _viewPaletteToggle.Active = !_viewPaletteToggle.Active;
            };

            _palettePanel.PaletteSelected += HandlePaletteSelected;
            _palettePanel.PaletteNewRequested += HandlePaletteNewRequested;
            _palettePanel.PaletteSaveRequested += HandlePaletteSaveRequested;
            _palettePanel.PaletteImportRequested += HandlePaletteImportRequested;
            _palettePanel.PaletteExportRequested += HandlePaletteExportRequested;
            _palettePanel.PaletteEdited += HandlePaletteEdited;
            _palettePanel.PaletteColorsChanged += () => _appState.NotifyPaletteColorsChanged();

            // Wire up CALL DOWN: AppState changes call methods on UI components
            _appState.ActiveToolChanged += (tool) => ApplyToolModeToAllViewsAndToolbar(tool);
            _appState.RectangleFillEnabledChanged += (enabled) =>
            {
                _rectangleTool.Fill = enabled;
                _ovalTool.Fill = enabled;
                foreach (var viewport in _viewports)
                {
                    viewport.SetRectangleFill(enabled);
                }
                _toolbarPanel.SetRectangleOptions(enabled, _rectangleTool.OverwriteTransparent, _rectangleTool.FillUsesSecondary);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.TransparentOverwriteEnabledChanged += (enabled) =>
            {
                _rectangleTool.OverwriteTransparent = enabled;
                _ovalTool.OverwriteTransparent = enabled;
                foreach (var viewport in _viewports)
                {
                    viewport.SetTransparentOverwrite(enabled);
                }
                _toolbarPanel.SetRectangleOptions(_rectangleTool.Fill, enabled, _rectangleTool.FillUsesSecondary);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.ShapeFillUseSecondaryChanged += (enabled) =>
            {
                _rectangleTool.FillUsesSecondary = enabled;
                _ovalTool.FillUsesSecondary = enabled;
                foreach (var viewport in _viewports)
                {
                    viewport.SetFillUsesSecondary(enabled);
                }
                _toolbarPanel.SetRectangleOptions(_rectangleTool.Fill, _rectangleTool.OverwriteTransparent, enabled);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.SelectionModeChanged += (mode) =>
            {
                _selectionTool.Mode = mode;
                _selectionOvalTool.Mode = mode;
                _selectionWandTool.Mode = mode;
                foreach (var viewport in _viewports)
                {
                    viewport.SetSelectionMode(mode);
                }
                _toolbarPanel.SetSelectionMode(mode);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.SelectionSnapModeChanged += (mode) =>
            {
                _selectionTool.SnapMode = mode;
                _selectionOvalTool.SnapMode = mode;
                _selectionWandTool.SnapMode = mode;
                foreach (var viewport in _viewports)
                {
                    viewport.SetSelectionSnapMode(mode);
                }
                _toolbarPanel.SetSelectionSnapMode(mode);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.StampOverwriteEnabledChanged += (enabled) =>
            {
                _stampTool.OverwriteDestination = enabled;
                foreach (var viewport in _viewports)
                {
                    viewport.SetStampOverwrite(enabled);
                }
                _toolbarPanel.SetStampOverwrite(enabled);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.StampRotationChanged += (rotation) =>
            {
                _stampTool.Rotation = rotation;
                foreach (var viewport in _viewports)
                {
                    viewport.SetStampRotation(rotation);
                }
                _toolbarPanel.SetStampTransform(rotation, _stampTool.FlipX, _stampTool.FlipY);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.StampFlipXChanged += (flipX) =>
            {
                _stampTool.FlipX = flipX;
                foreach (var viewport in _viewports)
                {
                    viewport.SetStampFlip(flipX, _stampTool.FlipY);
                }
                _toolbarPanel.SetStampTransform(_stampTool.Rotation, flipX, _stampTool.FlipY);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.StampFlipYChanged += (flipY) =>
            {
                _stampTool.FlipY = flipY;
                foreach (var viewport in _viewports)
                {
                    viewport.SetStampFlip(_stampTool.FlipX, flipY);
                }
                _toolbarPanel.SetStampTransform(_stampTool.Rotation, _stampTool.FlipX, flipY);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.StampScaleChanged += (scale) =>
            {
                _stampTool.Scale = scale;
                foreach (var viewport in _viewports)
                {
                    viewport.SetStampScale(scale);
                }
                _toolbarPanel.SetStampScale(scale);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.StampSnapModeChanged += (mode) =>
            {
                _stampTool.SnapMode = mode;
                foreach (var viewport in _viewports)
                {
                    viewport.SetStampSnapMode(mode);
                }
                _toolbarPanel.SetStampSnapMode(mode);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.ReferenceSnapModeChanged += (mode) =>
            {
                foreach (ViewportContext context in _viewportContexts.Values)
                {
                    context.ReferenceTool.SnapMode = mode;
                }
                _toolbarPanel.SetReferenceSnapMode(mode);
                RedrawAllViewports();
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.EraseSizeChanged += (size) =>
            {
                _eraseTool.Size = size;
                foreach (var viewport in _viewports)
                {
                    viewport.SetEraseSize(size);
                }
                _toolbarPanel.SetEraseOptions(size, _eraseTool.Shape);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.EraseShapeChanged += (shape) =>
            {
                _eraseTool.Shape = shape;
                foreach (var viewport in _viewports)
                {
                    viewport.SetEraseShape(shape);
                }
                _toolbarPanel.SetEraseOptions(_eraseTool.Size, shape);
                UpdateOptionsMenu(_appState.ActiveTool);
            };
            _appState.PaletteColorsChanged += () =>
            {
                UpdateBackgroundFromPalette();
                _toolbarPanel.UpdateColorSwatches();
                RedrawAllViewports();
            };
            _canvas.References.Changed += HandleReferenceLayerChanged;

            // Initialize: Trigger initial state sync by setting the default active tool
            _appState.SetActiveTool(ToolMode.GrabZoom);
            
            // Ensure toolbar visibility is correctly set after all wiring
            _toolbarPanel.EnsureOptionVisibility();

            if (_viewToolbarToggle != null && _viewToolbarToggle.Active)
            {
                DockToolbar();
            }
            if (_viewPaletteToggle != null)
            {
                if (_viewPaletteToggle.Active)
                {
                    DockPalette();
                }
                else
                {
                    UndockPalette();
                }
            }

            InitializePaletteLibrary();

            _viewportTool.ViewportCreated += HandleViewportCreated;
            _viewportTool.ViewportClosed += HandleViewportClosed;

            _toolGrabZoom.Activated += ToolGrabZoom_Activated;
            _toolPen.Activated += ToolPen_Activated;
            _toolLine.Activated += ToolLine_Activated;
            _toolRectangle.Activated += ToolRectangle_Activated;
            _toolSelection.Activated += ToolSelection_Activated;
            _toolSelectionWand.Activated += ToolSelectionWand_Activated;
            _toolFloodFill.Activated += ToolFloodFill_Activated;
            _toolSelectionOval.Activated += ToolSelectionOval_Activated;
            _toolStamp.Activated += ToolStamp_Activated;
            _toolOval.Activated += ToolOval_Activated;
            _toolReference.Activated += ToolReference_Activated;
            _toolErase.Activated += ToolErase_Activated;
            _viewNewViewport.Activated += ToolNewViewport_Activated;
            _editUndo.Activated += EditUndo_Activated;
            _editRedo.Activated += EditRedo_Activated;
            _editCopy.Activated += EditCopy_Activated;
            _fileNew.Activated += FileNew_Activated;
            _fileOpen.Activated += FileOpen_Activated;
            _fileSave.Activated += FileSave_Activated;
            _fileSaveAs.Activated += FileSaveAs_Activated;
            _viewPaletteToggle.Toggled += ViewPaletteToggle_Toggled;
            _viewToolbarToggle.Toggled += ViewToolbarToggle_Toggled;
            _optionRectangleFill.Toggled += OptionRectangleFill_Toggled;
            _optionTransparentOverwrite.Toggled += OptionTransparentOverwrite_Toggled;
            _optionFillSecondary.Toggled += OptionFillSecondary_Toggled;
            _optionStampOverwrite.Toggled += OptionStampOverwrite_Toggled;
            _optionSelectionCopy.Activated += EditCopy_Activated;
            _optionSelectionExport.Activated += ExportSelection_Activated;
            _optionSelectionAdd.Toggled += OptionSelectionModeMenu_Toggled;
            _optionSelectionSubtract.Toggled += OptionSelectionModeMenu_Toggled;
            _optionSelectionSnapPixel.Toggled += OptionSelectionSnapMenu_Toggled;
            _optionSelectionSnapTile.Toggled += OptionSelectionSnapMenu_Toggled;
            _optionStampSnapPixel.Toggled += OptionStampSnapMenu_Toggled;
            _optionStampSnapTile.Toggled += OptionStampSnapMenu_Toggled;
            _optionStampScale1.Toggled += OptionStampScaleMenu_Toggled;
            _optionStampScale2.Toggled += OptionStampScaleMenu_Toggled;
            _optionStampScale4.Toggled += OptionStampScaleMenu_Toggled;
            _optionStampRotate0.Toggled += OptionStampRotationMenu_Toggled;
            _optionStampRotate90.Toggled += OptionStampRotationMenu_Toggled;
            _optionStampRotate180.Toggled += OptionStampRotationMenu_Toggled;
            _optionStampRotate270.Toggled += OptionStampRotationMenu_Toggled;
            _optionStampFlipX.Toggled += OptionStampFlipXMenu_Toggled;
            _optionStampFlipY.Toggled += OptionStampFlipYMenu_Toggled;
            _optionEraseSize4.Toggled += OptionEraseSizeMenu_Toggled;
            _optionEraseSize8.Toggled += OptionEraseSizeMenu_Toggled;
            _optionEraseSize16.Toggled += OptionEraseSizeMenu_Toggled;
            _optionEraseShapeSquare.Toggled += OptionEraseShapeMenu_Toggled;
            _optionEraseShapeRound.Toggled += OptionEraseShapeMenu_Toggled;
            _optionReferenceSnapFree.Toggled += OptionReferenceSnapMenu_Toggled;
            _optionReferenceSnapPixel.Toggled += OptionReferenceSnapMenu_Toggled;
            _optionReferenceSnapTile.Toggled += OptionReferenceSnapMenu_Toggled;
            _optionReferenceOpacity.ValueChanged += OptionReferenceOpacityMenu_Changed;
            _optionClearSelection.Activated += OptionClearSelection_Activated;
            _optionEraseSelection.Activated += OptionEraseSelection_Activated;

            _editUndo.AddAccelerator("activate", _accelGroup, (uint)Gdk.Key.z, Gdk.ModifierType.ControlMask, AccelFlags.Visible);
            _editRedo.AddAccelerator("activate", _accelGroup, (uint)Gdk.Key.y, Gdk.ModifierType.ControlMask, AccelFlags.Visible);
            _editCopy.AddAccelerator("activate", _accelGroup, (uint)Gdk.Key.c, Gdk.ModifierType.ControlMask, AccelFlags.Visible);
            _fileNew.AddAccelerator("activate", _accelGroup, (uint)Gdk.Key.n, Gdk.ModifierType.ControlMask, AccelFlags.Visible);
            _fileOpen.AddAccelerator("activate", _accelGroup, (uint)Gdk.Key.o, Gdk.ModifierType.ControlMask, AccelFlags.Visible);
            _fileSave.AddAccelerator("activate", _accelGroup, (uint)Gdk.Key.s, Gdk.ModifierType.ControlMask, AccelFlags.Visible);
            _fileSaveAs.AddAccelerator(
                "activate",
                _accelGroup,
                (uint)Gdk.Key.s,
                Gdk.ModifierType.ControlMask | Gdk.ModifierType.ShiftMask,
                AccelFlags.Visible);

            UpdateOptionsMenu();
            UpdateEditMenu();
            UpdateWindowTitle();

            SetDefaultSize(_config.WindowDefaultWidth, _config.WindowDefaultHeight);
            SetSizeRequest(_config.WindowMinWidth, _config.WindowMinHeight);

            DeleteEvent += Window_DeleteEvent;
        }

        private void Window_DeleteEvent(object sender, DeleteEventArgs a)
        {
            Application.Quit();
        }

        private void UpdateBackgroundFromPalette()
        {
            if (_palette?.Palette == null || _palette.Palette.Count == 0 || _viewportSettings == null)
            {
                return;
            }

            var background = _palette.Palette[0];
            _viewportSettings.BackgroundR = background.Item1;
            _viewportSettings.BackgroundG = background.Item2;
            _viewportSettings.BackgroundB = background.Item3;
            _viewportSettings.BackgroundA = background.Item4;
        }

        private static void SeedCanvas(PixelSplashCanvas canvas)
        {
            canvas.DrawLine(-8, -8, 8, 8, 2);
            canvas.DrawLine(-8, 8, 8, -8, 3);
            canvas.DrawRectangle(-12, -12, 24, 24, 4);
        }

        private void ToolGrabZoom_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.GrabZoom);
        }

        private void ToolPen_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.Pen);
        }

        private void ToolLine_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.Line);
        }

        private void ToolRectangle_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.Rectangle);
        }

        private void ToolSelection_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.Selection);
        }

        private void ToolSelectionWand_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.SelectionWand);
        }

        private void ToolFloodFill_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.FloodFill);
        }

        private void ToolSelectionOval_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.SelectionOval);
        }

        private void ToolStamp_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.Stamp);
        }

        private void ToolOval_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.Oval);
        }

        private void ToolReference_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.Reference);
        }

        private void ToolErase_Activated(object sender, EventArgs e)
        {
            _appState.SetActiveTool(ToolMode.Erase);
        }

        private void ToolNewViewport_Activated(object sender, EventArgs e)
        {
            _viewportTool.OpenViewportWindow(this);
        }

        private void UpdateToolbarSelection(ToolMode toolMode = ToolMode.GrabZoom)
        {
            if (_toolbarPanel == null)
            {
                return;
            }

            switch (toolMode)
            {
                case ToolMode.GrabZoom:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.GrabZoom);
                    break;
                case ToolMode.Pen:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.Pen);
                    break;
                case ToolMode.Line:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.Line);
                    break;
                case ToolMode.Rectangle:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.Rectangle);
                    break;
                case ToolMode.Oval:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.Oval);
                    break;
                case ToolMode.Selection:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.Selection);
                    break;
                case ToolMode.SelectionWand:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.SelectionWand);
                    break;
                case ToolMode.SelectionOval:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.SelectionOval);
                    break;
                case ToolMode.FloodFill:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.FloodFill);
                    break;
                case ToolMode.Stamp:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.Stamp);
                    break;
                case ToolMode.Erase:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.Erase);
                    break;
                case ToolMode.Reference:
                    _toolbarPanel.SetActiveTool(ToolsPanelWidget.ToolId.Reference);
                    break;
            }
        }

        private void FileNew_Activated(object sender, EventArgs e)
        {
            _canvas.ClearCanvas();
            _history.Clear();
            _currentFilePath = null;
            UpdateEditMenu();
            UpdateWindowTitle();
            RedrawAllViewports();
        }

        private void FileSave_Activated(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(_currentFilePath))
            {
                FileSaveAs_Activated(sender, e);
                return;
            }

            SaveCanvasToFile(_currentFilePath);
        }

        private void FileOpen_Activated(object sender, EventArgs e)
        {
            FileChooserDialog dialog = new FileChooserDialog(
                "Open Canvas",
                this,
                FileChooserAction.Open,
                "Cancel",
                ResponseType.Cancel,
                "Open",
                ResponseType.Accept);

            try
            {
                if (dialog.Run() == (int)ResponseType.Accept)
                {
                    LoadCanvasFromFile(dialog.Filename);
                }
            }
            catch (Exception ex)
            {
                ShowError($"Open failed: {ex.Message}");
            }
            finally
            {
                dialog.Destroy();
            }
        }

        private void FileSaveAs_Activated(object sender, EventArgs e)
        {
            FileChooserDialog dialog = new FileChooserDialog(
                "Save Canvas",
                this,
                FileChooserAction.Save,
                "Cancel",
                ResponseType.Cancel,
                "Save",
                ResponseType.Accept);
            dialog.DoOverwriteConfirmation = true;
            dialog.CurrentName = "canvas.pss";

            try
            {
                if (dialog.Run() == (int)ResponseType.Accept)
                {
                    _currentFilePath = dialog.Filename;
                    SaveCanvasToFile(_currentFilePath);
                    UpdateWindowTitle();
                }
            }
            catch (Exception ex)
            {
                ShowError($"Save failed: {ex.Message}");
            }
            finally
            {
                dialog.Destroy();
            }
        }

        private void ViewPaletteToggle_Toggled(object sender, EventArgs e)
        {
            if (_palettePanel == null || _dockToolsHost == null || _paletteWindow == null)
            {
                return;
            }

            if (_viewPaletteToggle.Active)
            {
                DockPalette();
            }
            else
            {
                UndockPalette();
            }
        }

        private void ViewToolbarToggle_Toggled(object sender, EventArgs e)
        {
            if (_toolbarPanel == null || _dockToolsHost == null || _toolbarWindow == null)
            {
                return;
            }

            if (_viewToolbarToggle.Active)
            {
                DockToolbar();
            }
            else
            {
                UndockToolbar();
            }
        }

        private void PaletteWindow_DeleteEvent(object sender, DeleteEventArgs e)
        {
            if (_viewPaletteToggle != null)
            {
                _viewPaletteToggle.Active = true;
            }

            if (IsWidgetAlive(_paletteWindow))
            {
                _paletteWindow.Hide();
            }
            e.RetVal = true;
        }

        private void ToolbarWindow_DeleteEvent(object sender, DeleteEventArgs e)
        {
            if (_viewToolbarToggle != null)
            {
                _viewToolbarToggle.Active = true;
            }

            if (IsWidgetAlive(_toolbarWindow))
            {
                _toolbarWindow.Hide();
            }
            e.RetVal = true;
        }

        private void DockToolbar()
        {
            if (_toolbarPanel.Parent is Container parent)
            {
                parent.Remove(_toolbarPanel);
            }

            _dockToolsHost.PackStart(_toolbarPanel, false, false, 0);
            _toolbarPanel.ShowAll();
            _toolbarPanel.EnsureOptionVisibility();  // Re-apply visibility after ShowAll()
            UpdateDockHostVisibility();
            if (IsWidgetAlive(_toolbarWindow))
            {
                _toolbarWindow.Hide();
            }
        }

        private void UndockToolbar()
        {
            if (!IsWidgetAlive(_toolbarWindow))
            {
                if (_viewToolbarToggle != null && !_viewToolbarToggle.Active)
                {
                    _viewToolbarToggle.Active = true;
                }
                return;
            }

            if (_toolbarPanel.Parent is Container parent)
            {
                parent.Remove(_toolbarPanel);
            }

            _toolbarWindow.Add(_toolbarPanel);
            _toolbarWindow.ShowAll();
            _toolbarPanel.EnsureOptionVisibility();  // Re-apply visibility after ShowAll()
            UpdateDockHostVisibility();
        }

        private void DockPalette()
        {
            if (_palettePanel.Parent is Container parent)
            {
                parent.Remove(_palettePanel);
            }

            _palettePanel.SetDockedMode(true);
            _palettePanel.SetSizeRequest(-1, 260);
            _dockToolsHost.PackEnd(_palettePanel, false, false, 0);
            _palettePanel.ShowAll();
            UpdateDockHostVisibility();
            if (IsWidgetAlive(_paletteWindow))
            {
                _paletteWindow.Hide();
            }
        }

        private void UndockPalette()
        {
            if (!IsWidgetAlive(_paletteWindow))
            {
                if (_viewPaletteToggle != null && !_viewPaletteToggle.Active)
                {
                    _viewPaletteToggle.Active = true;
                }
                return;
            }

            if (_palettePanel.Parent is Container parent)
            {
                parent.Remove(_palettePanel);
            }

            _palettePanel.SetDockedMode(false);
            _palettePanel.SetSizeRequest(-1, -1);
            _paletteWindow.Add(_palettePanel);
            _paletteWindow.ShowAll();
            UpdateDockHostVisibility();
        }

        private void UpdateDockHostVisibility()
        {
            if (_dockToolsHost == null)
            {
                return;
            }

            bool hasDockedTools = _toolbarPanel?.Parent == _dockToolsHost;
            bool hasDockedPalette = _palettePanel?.Parent == _dockToolsHost;
            _dockToolsHost.Visible = hasDockedTools || hasDockedPalette;
        }

        private void InitializePaletteLibrary()
        {
            _paletteLibraryService.LoadLibrary();
            ApplyPaletteFromLibrary(_paletteLibraryService.Library?.SelectedName);
            UpdatePaletteSelector();
        }

        private void UpdatePaletteSelector()
        {
            if (_palettePanel == null || _paletteLibraryService.Library == null)
            {
                return;
            }

            _suppressPaletteSelection = true;
            _palettePanel.SetPaletteOptions(_paletteLibraryService.GetPaletteNames(), _paletteLibraryService.Library.SelectedName);
            _suppressPaletteSelection = false;
        }

        private void ApplyPaletteFromLibrary(string name)
        {
            if (!_paletteLibraryService.ApplyPalette(name))
            {
                return;
            }

            _palettePanel.RefreshPalette();
            _appState.NotifyPaletteColorsChanged();
            RedrawAllViewports();
        }

        private void ApplyPaletteFromFile(CanvasFileData data, string path)
        {
            if (_paletteLibraryService.Library == null || data?.PaletteColors == null || data.PaletteColors.Count == 0)
            {
                return;
            }

            string baseName = !string.IsNullOrWhiteSpace(data.PaletteName)
                ? data.PaletteName
                : System.IO.Path.GetFileNameWithoutExtension(path);
            PaletteEntryData entry = _paletteLibraryService.AddPalette(baseName, data.PaletteColors);
            UpdatePaletteSelector();
            ApplyPaletteFromLibrary(entry.Name);
        }

        private void HandlePaletteSelected(string name)
        {
            if (_suppressPaletteSelection || _paletteLibraryService.Library == null)
            {
                return;
            }

            ApplyPaletteFromLibrary(name);
            _paletteLibraryService.SaveLibrary();
        }

        private void HandlePaletteNewRequested()
        {
            string name = PromptForPaletteName("New Palette", "New Palette");
            if (string.IsNullOrWhiteSpace(name) || _paletteLibraryService.Library == null)
            {
                return;
            }

            PaletteEntryData entry = _paletteLibraryService.AddPaletteFromCurrent(name);
            UpdatePaletteSelector();
            ApplyPaletteFromLibrary(entry.Name);
        }

        private void HandlePaletteSaveRequested()
        {
            if (_paletteLibraryService.Library == null)
            {
                return;
            }

            string targetName = _paletteLibraryService.Library.SelectedName;
            PaletteEntryData entry = _paletteLibraryService.FindPalette(targetName);
            if (entry == null)
            {
                targetName = PromptForPaletteName("Save Palette", "New Palette");
                if (string.IsNullOrWhiteSpace(targetName))
                {
                    return;
                }
            }

            _paletteLibraryService.SaveCurrentPalette(targetName);
            UpdatePaletteSelector();
        }

        private void HandlePaletteImportRequested()
        {
            FileChooserDialog dialog = new FileChooserDialog(
                "Import Palette",
                this,
                FileChooserAction.Open,
                "Cancel", ResponseType.Cancel,
                "Import", ResponseType.Accept);

            FileFilter allFilter = new FileFilter { Name = "Palette files" };
            allFilter.AddPattern("*.pspal");
            allFilter.AddPattern("*.gpl");
            allFilter.AddPattern("*.pal");
            dialog.AddFilter(allFilter);
            FileFilter pspalFilter = new FileFilter { Name = "Pixel Splash Palette (*.pspal)" };
            pspalFilter.AddPattern("*.pspal");
            dialog.AddFilter(pspalFilter);

            try
            {
                if (dialog.Run() == (int)ResponseType.Accept)
                {
                    PaletteFileData fileData = _paletteLibraryService.LoadPaletteFile(dialog.Filename);
                    string name = string.IsNullOrWhiteSpace(fileData.Name)
                        ? System.IO.Path.GetFileNameWithoutExtension(dialog.Filename)
                        : fileData.Name;
                    PaletteEntryData entry = _paletteLibraryService.AddPalette(name, fileData.Colors);
                    UpdatePaletteSelector();
                    ApplyPaletteFromLibrary(entry.Name);
                }
            }
            catch (Exception ex)
            {
                ShowError($"Import failed: {ex.Message}");
            }
            finally
            {
                dialog.Destroy();
            }
        }

        private void HandlePaletteExportRequested()
        {
            if (_paletteLibraryService.Library == null)
            {
                return;
            }

            FileChooserDialog dialog = new FileChooserDialog(
                "Export Palette",
                this,
                FileChooserAction.Save,
                "Cancel", ResponseType.Cancel,
                "Export", ResponseType.Accept);
            dialog.DoOverwriteConfirmation = true;
            FileFilter filter = new FileFilter { Name = "Pixel Splash Palette (*.pspal)" };
            filter.AddPattern("*.pspal");
            dialog.AddFilter(filter);

            if (!string.IsNullOrWhiteSpace(_paletteLibraryService.Library.SelectedName))
            {
                dialog.CurrentName = $"{_paletteLibraryService.Library.SelectedName}.pspal";
            }

            try
            {
                if (dialog.Run() == (int)ResponseType.Accept)
                {
                    string filename = dialog.Filename;
                    if (!filename.EndsWith(".pspal", StringComparison.OrdinalIgnoreCase))
                    {
                        filename += ".pspal";
                    }
                    PaletteFileData data = new PaletteFileData
                    {
                        Name = _paletteLibraryService.Library.SelectedName,
                        Colors = PaletteStorage.NormalizeColors(PaletteStorage.ToColorData(_palette.Palette))
                    };
                    _paletteLibraryService.SavePaletteFile(filename, data);
                }
            }
            catch (Exception ex)
            {
                ShowError($"Export failed: {ex.Message}");
            }
            finally
            {
                dialog.Destroy();
            }
        }

        private void HandlePaletteEdited()
        {
            if (!_paletteLibraryService.UpdateSelectedFromCurrent())
            {
                return;
            }
            RedrawAllViewports();
        }

        private string PromptForPaletteName(string title, string defaultName)
        {
            Dialog dialog = new Dialog(title, this, DialogFlags.Modal);
            dialog.AddButton("Cancel", ResponseType.Cancel);
            dialog.AddButton("OK", ResponseType.Ok);

            Entry entry = new Entry
            {
                Text = defaultName ?? string.Empty,
                ActivatesDefault = true
            };
            dialog.DefaultResponse = ResponseType.Ok;
            dialog.ContentArea.PackStart(new Label("Palette name:"), false, false, 6);
            dialog.ContentArea.PackStart(entry, false, false, 6);
            dialog.ContentArea.ShowAll();

            try
            {
                if (dialog.Run() == (int)ResponseType.Ok)
                {
                    return entry.Text?.Trim();
                }
            }
            finally
            {
                dialog.Destroy();
            }

            return null;
        }

        private string PromptForReferenceText(string title, string defaultText)
        {
            Dialog dialog = new Dialog(title, this, DialogFlags.Modal);
            dialog.AddButton("Cancel", ResponseType.Cancel);
            dialog.AddButton("OK", ResponseType.Ok);

            Entry entry = new Entry
            {
                Text = defaultText ?? string.Empty,
                ActivatesDefault = true
            };
            dialog.DefaultResponse = ResponseType.Ok;
            dialog.ContentArea.PackStart(new Label("Reference text:"), false, false, 6);
            dialog.ContentArea.PackStart(entry, false, false, 6);
            dialog.ContentArea.ShowAll();

            try
            {
                if (dialog.Run() == (int)ResponseType.Ok)
                {
                    return entry.Text?.Trim();
                }
            }
            finally
            {
                dialog.Destroy();
            }

            return null;
        }

        private static bool IsWidgetAlive(Widget widget)
        {
            return widget != null && widget.Handle != IntPtr.Zero;
        }

        private void HandleViewportCreated(ViewportContext context)
        {
            if (context == null)
            {
                return;
            }

            _viewportContexts[context.Widget] = context;
            _viewports.Add(context.Widget);
            AttachViewportHandlers(context.Widget);
            ApplyToolModeToView(context.Widget, _appState.ActiveTool);
        }

        private void HandleViewportClosed(ViewportContext context)
        {
            if (context == null)
            {
                return;
            }

            _viewports.Remove(context.Widget);
            _viewportContexts.Remove(context.Widget);
            DetachViewportHandlers(context.Widget);
        }

        private void ApplyToolModeToAllViewsAndToolbar(ToolMode toolMode)
        {
            // CALL DOWN to all viewports
            foreach (var view in _viewports)
            {
                ApplyToolModeToView(view, toolMode);
            }
            
            // CALL DOWN to toolbar - update selection AND visibility
            UpdateToolbarSelection(toolMode);
            UpdateOptionsMenu(toolMode);
        }

        private void ApplyToolModeToView(CanvasViewportWidget view, ToolMode toolMode)
        {
            if (view?.Viewport == null)
            {
                return;
            }

            ViewportContext context = GetViewportContext(view);

            switch (toolMode)
            {
                case ToolMode.Pen:
                    view.SetActiveTool(_penTool);
                    break;
                case ToolMode.Line:
                    view.SetActiveTool(_lineTool);
                    break;
                case ToolMode.Rectangle:
                    view.SetActiveTool(_rectangleTool);
                    break;
                case ToolMode.Selection:
                    view.SetActiveTool(_selectionTool);
                    break;
                case ToolMode.SelectionWand:
                    view.SetActiveTool(_selectionWandTool);
                    break;
                case ToolMode.FloodFill:
                    view.SetActiveTool(_floodFillTool);
                    break;
                case ToolMode.SelectionOval:
                    view.SetActiveTool(_selectionOvalTool);
                    break;
                case ToolMode.Stamp:
                    view.SetActiveTool(_stampTool);
                    break;
                case ToolMode.Oval:
                    view.SetActiveTool(_ovalTool);
                    break;
                case ToolMode.Erase:
                    view.SetActiveTool(_eraseTool);
                    break;
                case ToolMode.Reference:
                    if (context != null)
                    {
                        view.SetActiveTool(context.ReferenceTool);
                    }
                    break;
                default:
                    if (context != null)
                    {
                        view.SetActiveTool(context.GrabTool);
                    }
                    break;
            }
        }

        private ViewportContext GetViewportContext(CanvasViewportWidget view)
        {
            if (view == null)
            {
                return null;
            }

            _viewportContexts.TryGetValue(view, out ViewportContext context);
            return context;
        }

        private void AttachViewportHandlers(CanvasViewportWidget viewport)
        {
            if (viewport == null)
            {
                return;
            }

            viewport.DetachRequested += Viewport_DetachRequested;
            viewport.ReattachRequested += Viewport_ReattachRequested;
            viewport.ToolUseStarted += Viewport_ToolUseStarted;
            viewport.ToolUseCompleted += Viewport_ToolUseCompleted;
            viewport.RectangleFillToggled += Viewport_RectangleFillToggled;
            viewport.TransparentOverwriteToggled += Viewport_TransparentOverwriteToggled;
            viewport.FillSecondaryToggled += Viewport_FillSecondaryToggled;
            viewport.StampOverwriteToggled += Viewport_StampOverwriteToggled;
            viewport.StampRotationChanged += Viewport_StampRotationChanged;
            viewport.StampFlipXToggled += Viewport_StampFlipXToggled;
            viewport.StampFlipYToggled += Viewport_StampFlipYToggled;
            viewport.StampScaleChanged += Viewport_StampScaleChanged;
            viewport.StampSnapModeChanged += Viewport_StampSnapModeChanged;
            viewport.ClearSelectionRequested += Viewport_ClearSelectionRequested;
            viewport.SelectionChanged += Viewport_SelectionChanged;
            viewport.SelectionModeChanged += Viewport_SelectionModeChanged;
            viewport.SelectionSnapModeChanged += Viewport_SelectionSnapModeChanged;
            viewport.SelectionCopyRequested += Viewport_SelectionCopyRequested;
            viewport.SelectionExportRequested += Viewport_SelectionExportRequested;
            viewport.SelectionEraseRequested += Viewport_SelectionEraseRequested;
            viewport.ReferenceAddTextRequested += Viewport_ReferenceAddTextRequested;
            viewport.ReferenceAddImageRequested += Viewport_ReferenceAddImageRequested;
            viewport.ReferenceDeleteRequested += Viewport_ReferenceDeleteRequested;
        }

        private void DetachViewportHandlers(CanvasViewportWidget viewport)
        {
            if (viewport == null)
            {
                return;
            }

            viewport.DetachRequested -= Viewport_DetachRequested;
            viewport.ReattachRequested -= Viewport_ReattachRequested;
            viewport.ToolUseStarted -= Viewport_ToolUseStarted;
            viewport.ToolUseCompleted -= Viewport_ToolUseCompleted;
            viewport.RectangleFillToggled -= Viewport_RectangleFillToggled;
            viewport.TransparentOverwriteToggled -= Viewport_TransparentOverwriteToggled;
            viewport.FillSecondaryToggled -= Viewport_FillSecondaryToggled;
            viewport.StampOverwriteToggled -= Viewport_StampOverwriteToggled;
            viewport.StampRotationChanged -= Viewport_StampRotationChanged;
            viewport.StampFlipXToggled -= Viewport_StampFlipXToggled;
            viewport.StampFlipYToggled -= Viewport_StampFlipYToggled;
            viewport.StampScaleChanged -= Viewport_StampScaleChanged;
            viewport.StampSnapModeChanged -= Viewport_StampSnapModeChanged;
            viewport.ClearSelectionRequested -= Viewport_ClearSelectionRequested;
            viewport.SelectionChanged -= Viewport_SelectionChanged;
            viewport.SelectionModeChanged -= Viewport_SelectionModeChanged;
            viewport.SelectionSnapModeChanged -= Viewport_SelectionSnapModeChanged;
            viewport.SelectionCopyRequested -= Viewport_SelectionCopyRequested;
            viewport.SelectionExportRequested -= Viewport_SelectionExportRequested;
            viewport.SelectionEraseRequested -= Viewport_SelectionEraseRequested;
            viewport.ReferenceAddTextRequested -= Viewport_ReferenceAddTextRequested;
            viewport.ReferenceAddImageRequested -= Viewport_ReferenceAddImageRequested;
            viewport.ReferenceDeleteRequested -= Viewport_ReferenceDeleteRequested;
        }

        private void Viewport_DetachRequested(CanvasViewportWidget viewport)
        {
            if (viewport == null)
            {
                return;
            }

            if (viewport.Parent is Gtk.Window)
            {
                return;
            }

            Widget parent = viewport.Parent;
            if (parent is Container container)
            {
                Notebook notebook = container.Parent as Notebook;
                if (notebook != null)
                {
                    int pageIndex = notebook.PageNum(container);
                    if (pageIndex >= 0)
                    {
                        container.Remove(viewport);
                        notebook.RemovePage(pageIndex);
                    }
                    else
                    {
                        container.Remove(viewport);
                    }
                }
                else
                {
                    container.Remove(viewport);
                }
            }

            Gtk.Window window = new Gtk.Window("Viewport");
            window.SetDefaultSize(640, 480);
            window.TransientFor = this;
            ThemeHelper.ApplyWindowBackground(window);
            window.Add(viewport);
            _detachedViewports[window] = viewport;
            window.DeleteEvent += DetachedWindow_DeleteEvent;
            window.ShowAll();
        }

        private void DetachedWindow_DeleteEvent(object sender, DeleteEventArgs args)
        {
            if (sender is Gtk.Window window && _detachedViewports.TryGetValue(window, out CanvasViewportWidget viewport))
            {
                _detachedViewports.Remove(window);
                _viewports.Remove(viewport);
                _viewportContexts.Remove(viewport);
                DetachViewportHandlers(viewport);
                window.Destroy();
                args.RetVal = true;
            }
        }

        private void Viewport_ReattachRequested(CanvasViewportWidget viewport)
        {
            if (viewport == null || _viewportTabs == null)
            {
                return;
            }

            if (!(viewport.Parent is Gtk.Window window))
            {
                return;
            }

            _detachedViewports.Remove(window);
            window.DeleteEvent -= DetachedWindow_DeleteEvent;
            window.Remove(viewport);
            window.Destroy();

            Box container = new Box(Orientation.Vertical, 0);
            container.PackStart(viewport, true, true, 0);
            Label label = new Label($"View {_viewportTabs.NPages + 1}");
            _viewportTabs.AppendPage(container, label);
            container.ShowAll();
        }

        private void Viewport_ToolUseStarted(CanvasViewportWidget viewport)
        {
            _history.BeginSnapshot();
        }

        private void Viewport_ToolUseCompleted(CanvasViewportWidget viewport)
        {
            _history.CommitSnapshot();
            UpdateEditMenu();
        }

        private void EditUndo_Activated(object sender, EventArgs e)
        {
            if (!_history.Undo())
            {
                return;
            }

            RedrawAllViewports();
            UpdateEditMenu();
        }

        private void EditRedo_Activated(object sender, EventArgs e)
        {
            if (!_history.Redo())
            {
                return;
            }

            RedrawAllViewports();
            UpdateEditMenu();
        }

        private void EditCopy_Activated(object sender, EventArgs e)
        {
            if (!_canvas.Selection.HasSelection)
            {
                return;
            }

            if (!_canvas.Selection.TryGetBounds(out int minX, out int minY, out int maxX, out int maxY))
            {
                return;
            }

            SelectionClipboard clipboard = new SelectionClipboard(minX, minY);
            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    if (!_canvas.Selection.IsSelected(x, y))
                    {
                        continue;
                    }

                    clipboard.Pixels.Add(new ClipboardPixel(x - minX, y - minY, _canvas.GetPixel(x, y)));
                }
            }

            if (clipboard.Pixels.Count == 0)
            {
                return;
            }

            _clipboardService.Clipboard = clipboard;
            ClearSelection();
            ToolStamp_Activated(this, EventArgs.Empty);
            UpdateEditMenu();
        }

        private void ExportSelection_Activated(object sender, EventArgs e)
        {
            if (!_canvas.Selection.HasSelection)
            {
                return;
            }

            if (!_canvas.Selection.TryGetBounds(out int minX, out int minY, out int maxX, out int maxY))
            {
                return;
            }

            int width = maxX - minX + 1;
            int height = maxY - minY + 1;
            if (width <= 0 || height <= 0)
            {
                return;
            }

            FileChooserDialog dialog = new FileChooserDialog(
                "Export Selection",
                this,
                FileChooserAction.Save,
                "Cancel",
                ResponseType.Cancel,
                "Export",
                ResponseType.Accept);
            dialog.DoOverwriteConfirmation = true;
            dialog.CurrentName = "selection.png";

            FileFilter pngFilter = new FileFilter();
            pngFilter.Name = "PNG files";
            pngFilter.AddPattern("*.png");
            dialog.AddFilter(pngFilter);

            FileFilter allFilter = new FileFilter();
            allFilter.Name = "All files";
            allFilter.AddPattern("*");
            dialog.AddFilter(allFilter);

            try
            {
                if (dialog.Run() == (int)ResponseType.Accept)
                {
                    string filename = dialog.Filename;
                    if (string.IsNullOrWhiteSpace(System.IO.Path.GetExtension(filename)))
                    {
                        filename += ".png";
                    }
                    _selectionExport.SaveSelectionToPng(filename, minX, minY, width, height);
                }
            }
            catch (Exception ex)
            {
                ShowError($"Export failed: {ex.Message}");
            }
            finally
            {
                dialog.Destroy();
            }
        }

        private void RedrawAllViewports()
        {
            for (int i = 0; i < _viewports.Count; i++)
            {
                _viewports[i].QueueDraw();
            }
        }

        private void UpdateEditMenu()
        {
            if (_editUndo != null)
            {
                _editUndo.Sensitive = _history.CanUndo;
            }

            if (_editRedo != null)
            {
                _editRedo.Sensitive = _history.CanRedo;
            }

            if (_editCopy != null)
            {
                _editCopy.Sensitive = _canvas.Selection.HasSelection;
            }
        }

        private void UpdateOptionsMenu(ToolMode toolMode = ToolMode.GrabZoom)
        {
            if (_menuOptions == null || _rectangleTool == null || _ovalTool == null || _optionClearSelection == null || _optionStampOverwrite == null)
            {
                return;
            }

            bool isShape = toolMode == ToolMode.Rectangle || toolMode == ToolMode.Oval;
            bool isStamp = toolMode == ToolMode.Stamp;
            bool isSelectionTool = toolMode == ToolMode.Selection || toolMode == ToolMode.SelectionOval || toolMode == ToolMode.SelectionWand;
            bool isReference = toolMode == ToolMode.Reference;
            bool isErase = toolMode == ToolMode.Erase;
            bool hasSelection = _canvas.Selection.HasSelection;
            bool showSelectionClear = hasSelection;

            _menuOptions.Sensitive = isShape || isStamp || isSelectionTool || isReference || isErase || hasSelection;

            _optionRectangleFill.Visible = isShape;
            _optionTransparentOverwrite.Visible = isShape;
            _optionFillSecondary.Visible = isShape;
            _optionShapeSeparator.Visible = isShape && (isSelectionTool || isStamp || isReference || showSelectionClear || isErase);

            bool showSelectionTools = isSelectionTool;
            bool showSelectionActions = hasSelection;
            _optionSelectionCopy.Visible = showSelectionActions;
            _optionSelectionExport.Visible = showSelectionActions;
            _optionSelectionSeparator.Visible = showSelectionActions && showSelectionTools;
            _optionSelectionAdd.Visible = showSelectionTools;
            _optionSelectionSubtract.Visible = showSelectionTools;
            _optionSelectionSnapSeparator.Visible = showSelectionTools;
            _optionSelectionSnapPixel.Visible = showSelectionTools;
            _optionSelectionSnapTile.Visible = showSelectionTools;
            _optionSelectionClearSeparator.Visible = showSelectionActions;
            _optionClearSelection.Visible = showSelectionActions;
            _optionEraseSelection.Visible = showSelectionActions;
            _optionSelectionCopy.Sensitive = hasSelection;
            _optionSelectionExport.Sensitive = hasSelection;
            _optionEraseSelection.Sensitive = hasSelection;

            _optionStampSeparator.Visible = isStamp;
            _optionStampOverwrite.Visible = isStamp;
            _optionStampSnapSeparator.Visible = isStamp;
            _optionStampSnapPixel.Visible = isStamp;
            _optionStampSnapTile.Visible = isStamp;
            _optionStampScaleSeparator.Visible = isStamp;
            _optionStampScale1.Visible = isStamp;
            _optionStampScale2.Visible = isStamp;
            _optionStampScale4.Visible = isStamp;
            _optionStampRotateSeparator.Visible = isStamp;
            _optionStampRotate0.Visible = isStamp;
            _optionStampRotate90.Visible = isStamp;
            _optionStampRotate180.Visible = isStamp;
            _optionStampRotate270.Visible = isStamp;
            _optionStampFlipSeparator.Visible = isStamp;
            _optionStampFlipX.Visible = isStamp;
            _optionStampFlipY.Visible = isStamp;

            _optionEraseSeparator.Visible = isErase;
            _optionEraseSize4.Visible = isErase;
            _optionEraseSize8.Visible = isErase;
            _optionEraseSize16.Visible = isErase;
            _optionEraseShapeSeparator.Visible = isErase;
            _optionEraseShapeSquare.Visible = isErase;
            _optionEraseShapeRound.Visible = isErase;

            _optionReferenceSeparator.Visible = isReference;
            _optionReferenceSnapFree.Visible = isReference;
            _optionReferenceSnapPixel.Visible = isReference;
            _optionReferenceSnapTile.Visible = isReference;
            bool showReferenceOpacity = isReference && _canvas.References.Selected != null;
            _optionReferenceOpacitySeparator.Visible = showReferenceOpacity;
            _optionReferenceOpacityItem.Visible = showReferenceOpacity;

            _suppressOptionEvents = true;
            if (isStamp)
            {
                _optionStampOverwrite.Active = _stampTool.OverwriteDestination;
                _optionStampSnapPixel.Active = _stampTool.SnapMode == SelectionSnapMode.Pixel;
                _optionStampSnapTile.Active = _stampTool.SnapMode == SelectionSnapMode.Tile;
                _optionStampScale1.Active = _stampTool.Scale <= 1;
                _optionStampScale2.Active = _stampTool.Scale == 2;
                _optionStampScale4.Active = _stampTool.Scale == 4;
                _optionStampRotate0.Active = _stampTool.Rotation == StampRotation.Deg0;
                _optionStampRotate90.Active = _stampTool.Rotation == StampRotation.Deg90;
                _optionStampRotate180.Active = _stampTool.Rotation == StampRotation.Deg180;
                _optionStampRotate270.Active = _stampTool.Rotation == StampRotation.Deg270;
                _optionStampFlipX.Active = _stampTool.FlipX;
                _optionStampFlipY.Active = _stampTool.FlipY;
            }
            else if (toolMode == ToolMode.Oval)
            {
                _optionRectangleFill.Active = _ovalTool.Fill;
                _optionTransparentOverwrite.Active = _ovalTool.OverwriteTransparent;
                _optionFillSecondary.Active = _ovalTool.FillUsesSecondary;
            }
            else
            {
                _optionRectangleFill.Active = _rectangleTool.Fill;
                _optionTransparentOverwrite.Active = _rectangleTool.OverwriteTransparent;
                _optionFillSecondary.Active = _rectangleTool.FillUsesSecondary;
            }

            if (isSelectionTool)
            {
                _optionSelectionAdd.Active = _selectionTool.Mode == SelectionMode.Add;
                _optionSelectionSubtract.Active = _selectionTool.Mode == SelectionMode.Subtract;
                _optionSelectionSnapPixel.Active = _selectionTool.SnapMode == SelectionSnapMode.Pixel;
                _optionSelectionSnapTile.Active = _selectionTool.SnapMode == SelectionSnapMode.Tile;
            }

            if (isReference)
            {
                _optionReferenceSnapFree.Active = _appState.ReferenceSnapMode == ReferenceSnapMode.Free;
                _optionReferenceSnapPixel.Active = _appState.ReferenceSnapMode == ReferenceSnapMode.Pixel;
                _optionReferenceSnapTile.Active = _appState.ReferenceSnapMode == ReferenceSnapMode.Tile;
            }
            if (isErase)
            {
                _optionEraseSize4.Active = _eraseTool.Size <= 4;
                _optionEraseSize8.Active = _eraseTool.Size == 8;
                _optionEraseSize16.Active = _eraseTool.Size == 16;
                _optionEraseShapeSquare.Active = _eraseTool.Shape == EraseBrushShape.Square;
                _optionEraseShapeRound.Active = _eraseTool.Shape == EraseBrushShape.Round;
            }
            _suppressOptionEvents = false;

            UpdateToolbarOptions();

            bool anyVisible =
                _optionRectangleFill.Visible ||
                _optionTransparentOverwrite.Visible ||
                _optionFillSecondary.Visible ||
                _optionSelectionCopy.Visible ||
                _optionSelectionExport.Visible ||
                _optionSelectionAdd.Visible ||
                _optionSelectionSubtract.Visible ||
                _optionSelectionSnapPixel.Visible ||
                _optionSelectionSnapTile.Visible ||
                _optionClearSelection.Visible ||
                _optionEraseSelection.Visible ||
                _optionStampOverwrite.Visible ||
                _optionStampSnapPixel.Visible ||
                _optionStampSnapTile.Visible ||
                _optionStampScale1.Visible ||
                _optionStampScale2.Visible ||
                _optionStampScale4.Visible ||
                _optionStampRotate0.Visible ||
                _optionStampRotate90.Visible ||
                _optionStampRotate180.Visible ||
                _optionStampRotate270.Visible ||
                _optionStampFlipX.Visible ||
                _optionStampFlipY.Visible ||
                _optionEraseSize4.Visible ||
                _optionEraseSize8.Visible ||
                _optionEraseSize16.Visible ||
                _optionEraseShapeSquare.Visible ||
                _optionEraseShapeRound.Visible ||
                _optionReferenceSnapFree.Visible ||
                _optionReferenceSnapPixel.Visible ||
                _optionReferenceSnapTile.Visible ||
                _optionReferenceOpacityItem.Visible;

            _menuOptions.Visible = anyVisible;
        }

        private void ClearSelection()
        {
            _canvas.Selection.Clear();
            UpdateOptionsMenu();
            UpdateEditMenu();
            RedrawAllViewports();
        }

        private void EraseSelection()
        {
            if (!_canvas.Selection.HasSelection)
            {
                return;
            }

            if (!_canvas.Selection.TryGetBounds(out int minX, out int minY, out int maxX, out int maxY))
            {
                return;
            }

            _history.BeginSnapshot();

            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    if (_canvas.Selection.IsSelected(x, y))
                    {
                        _canvas.DrawPixel(x, y, 0);
                    }
                }
            }

            _history.CommitSnapshot();
            UpdateEditMenu();
            RedrawAllViewports();
        }

        private void OptionRectangleFill_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents || _rectangleTool == null)
            {
                return;
            }

            SetRectangleFill(_optionRectangleFill.Active);
        }

        private void OptionTransparentOverwrite_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents || _rectangleTool == null)
            {
                return;
            }

            SetTransparentOverwrite(_optionTransparentOverwrite.Active);
        }

        private void OptionFillSecondary_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            _appState.SetShapeFillUseSecondary(_optionFillSecondary.Active);
        }

        private void OptionStampOverwrite_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents || _stampTool == null)
            {
                return;
            }

            SetStampOverwrite(_optionStampOverwrite.Active);
        }

        private void OptionSelectionModeMenu_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            SelectionMode mode = _optionSelectionSubtract.Active ? SelectionMode.Subtract : SelectionMode.Add;
            SetSelectionMode(mode);
        }

        private void OptionSelectionSnapMenu_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            SelectionSnapMode mode = _optionSelectionSnapTile.Active ? SelectionSnapMode.Tile : SelectionSnapMode.Pixel;
            SetSelectionSnapMode(mode);
        }

        private void OptionStampSnapMenu_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            SelectionSnapMode mode = _optionStampSnapTile.Active ? SelectionSnapMode.Tile : SelectionSnapMode.Pixel;
            _appState.SetStampSnapMode(mode);
        }

        private void OptionStampScaleMenu_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            int scale = 1;
            if (_optionStampScale2.Active)
            {
                scale = 2;
            }
            else if (_optionStampScale4.Active)
            {
                scale = 4;
            }

            _appState.SetStampScale(scale);
        }

        private void OptionStampRotationMenu_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            StampRotation rotation = StampRotation.Deg0;
            if (_optionStampRotate90.Active)
            {
                rotation = StampRotation.Deg90;
            }
            else if (_optionStampRotate180.Active)
            {
                rotation = StampRotation.Deg180;
            }
            else if (_optionStampRotate270.Active)
            {
                rotation = StampRotation.Deg270;
            }

            _appState.SetStampRotation(rotation);
        }

        private void OptionStampFlipXMenu_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            _appState.SetStampFlipX(_optionStampFlipX.Active);
        }

        private void OptionStampFlipYMenu_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            _appState.SetStampFlipY(_optionStampFlipY.Active);
        }

        private void OptionEraseSizeMenu_Toggled(object sender, EventArgs e)
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

            _appState.SetEraseSize(size);
        }

        private void OptionEraseShapeMenu_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            EraseBrushShape shape = _optionEraseShapeRound.Active ? EraseBrushShape.Round : EraseBrushShape.Square;
            _appState.SetEraseShape(shape);
        }

        private void OptionReferenceSnapMenu_Toggled(object sender, EventArgs e)
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

            _appState.SetReferenceSnapMode(mode);
        }

        private void OptionReferenceOpacityMenu_Changed(object sender, EventArgs e)
        {
            if (_suppressOptionEvents)
            {
                return;
            }

            double opacity = _optionReferenceOpacity.Value / 100.0;
            HandleReferenceOpacityChanged(opacity);
        }

        private void OptionClearSelection_Activated(object sender, EventArgs e)
        {
            ClearSelection();
        }

        private void OptionEraseSelection_Activated(object sender, EventArgs e)
        {
            EraseSelection();
        }

        private void Viewport_RectangleFillToggled(CanvasViewportWidget viewport, bool isFilled)
        {
            if (_rectangleTool == null || _ovalTool == null)
            {
                return;
            }

            _suppressOptionEvents = true;
            _optionRectangleFill.Active = isFilled;
            _suppressOptionEvents = false;

            SetRectangleFill(isFilled);
        }

        private void Viewport_TransparentOverwriteToggled(CanvasViewportWidget viewport, bool isEnabled)
        {
            if (_rectangleTool == null || _ovalTool == null)
            {
                return;
            }

            _suppressOptionEvents = true;
            _optionTransparentOverwrite.Active = isEnabled;
            _suppressOptionEvents = false;

            SetTransparentOverwrite(isEnabled);
        }

        private void Viewport_FillSecondaryToggled(CanvasViewportWidget viewport, bool isEnabled)
        {
            _appState.SetShapeFillUseSecondary(isEnabled);
        }

        private void Viewport_StampOverwriteToggled(CanvasViewportWidget viewport, bool isEnabled)
        {
            if (_stampTool == null)
            {
                return;
            }

            _suppressOptionEvents = true;
            _optionStampOverwrite.Active = isEnabled;
            _suppressOptionEvents = false;

            SetStampOverwrite(isEnabled);
        }

        private void SetRectangleFill(bool isFilled)
        {
            _appState.SetRectangleFill(isFilled);
        }

        private void SetTransparentOverwrite(bool isEnabled)
        {
            _appState.SetTransparentOverwrite(isEnabled);
        }

        private void SetStampOverwrite(bool isEnabled)
        {
            _appState.SetStampOverwrite(isEnabled);
        }

        private void Viewport_StampRotationChanged(CanvasViewportWidget viewport, StampRotation rotation)
        {
            _appState.SetStampRotation(rotation);
        }

        private void Viewport_StampFlipXToggled(CanvasViewportWidget viewport, bool isEnabled)
        {
            _appState.SetStampFlipX(isEnabled);
        }

        private void Viewport_StampFlipYToggled(CanvasViewportWidget viewport, bool isEnabled)
        {
            _appState.SetStampFlipY(isEnabled);
        }

        private void Viewport_StampScaleChanged(CanvasViewportWidget viewport, int scale)
        {
            _appState.SetStampScale(scale);
        }

        private void Viewport_StampSnapModeChanged(CanvasViewportWidget viewport, SelectionSnapMode mode)
        {
            _appState.SetStampSnapMode(mode);
        }

        private void SetSelectionMode(SelectionMode mode)
        {
            _appState.SetSelectionMode(mode);
        }

        private void SetSelectionSnapMode(SelectionSnapMode mode)
        {
            _appState.SetSelectionSnapMode(mode);
        }

        private void UpdateToolbarOptions()
        {
            if (_toolbarPanel == null)
            {
                return;
            }

            _toolbarPanel.SetRectangleOptions(_rectangleTool.Fill, _rectangleTool.OverwriteTransparent, _rectangleTool.FillUsesSecondary);
            _toolbarPanel.SetStampOverwrite(_stampTool.OverwriteDestination);
            _toolbarPanel.SetStampTransform(_stampTool.Rotation, _stampTool.FlipX, _stampTool.FlipY);
            _toolbarPanel.SetStampScale(_stampTool.Scale);
            _toolbarPanel.SetStampSnapMode(_stampTool.SnapMode);
            _toolbarPanel.SetSelectionMode(_selectionTool.Mode);
            _toolbarPanel.SetSelectionSnapMode(_selectionTool.SnapMode);
            _toolbarPanel.SetReferenceSnapMode(_appState.ReferenceSnapMode);
            _toolbarPanel.SetEraseOptions(_eraseTool.Size, _eraseTool.Shape);
            UpdateReferenceOptions();
        }

        private void Viewport_ClearSelectionRequested(CanvasViewportWidget viewport)
        {
            ClearSelection();
        }

        private void Viewport_SelectionChanged(CanvasViewportWidget viewport)
        {
            UpdateOptionsMenu();
            UpdateEditMenu();
        }

        private void Viewport_SelectionModeChanged(CanvasViewportWidget viewport, SelectionMode mode)
        {
            SetSelectionMode(mode);
        }

        private void Viewport_SelectionSnapModeChanged(CanvasViewportWidget viewport, SelectionSnapMode mode)
        {
            SetSelectionSnapMode(mode);
        }

        private void Viewport_SelectionCopyRequested(CanvasViewportWidget viewport)
        {
            EditCopy_Activated(this, EventArgs.Empty);
        }

        private void Viewport_SelectionExportRequested(CanvasViewportWidget viewport)
        {
            ExportSelection_Activated(this, EventArgs.Empty);
        }

        private void Viewport_SelectionEraseRequested(CanvasViewportWidget viewport)
        {
            EraseSelection();
        }

        private void Viewport_ReferenceAddTextRequested(CanvasViewportWidget viewport, int worldX, int worldY)
        {
            string text = PromptForReferenceText("Add Reference Text", "Reference");
            if (string.IsNullOrWhiteSpace(text))
            {
                return;
            }

            _canvas.References.AddText(text, worldX, worldY, 12, "Sans");
            RedrawAllViewports();
        }

        private void Viewport_ReferenceAddImageRequested(CanvasViewportWidget viewport, int worldX, int worldY)
        {
            FileChooserDialog dialog = new FileChooserDialog(
                "Add Reference Image",
                this,
                FileChooserAction.Open,
                "Cancel",
                ResponseType.Cancel,
                "Add",
                ResponseType.Accept);

            FileFilter imageFilter = new FileFilter
            {
                Name = "Images"
            };
            imageFilter.AddPattern("*.png");
            imageFilter.AddPattern("*.jpg");
            imageFilter.AddPattern("*.jpeg");
            imageFilter.AddPattern("*.bmp");
            imageFilter.AddPattern("*.gif");
            dialog.AddFilter(imageFilter);

            FileFilter allFilter = new FileFilter
            {
                Name = "All Files"
            };
            allFilter.AddPattern("*");
            dialog.AddFilter(allFilter);

            try
            {
                if (dialog.Run() == (int)ResponseType.Accept)
                {
                    using (Pixbuf pixbuf = new Pixbuf(dialog.Filename))
                    {
                        int pixelSize = viewport?.Viewport?.PixelSize ?? CanvasViewport.DefaultPixelSize;
                        pixelSize = Math.Max(1, pixelSize);
                        double width = pixbuf.Width / (double)pixelSize;
                        double height = pixbuf.Height / (double)pixelSize;
                        Pixbuf imageCopy = pixbuf.Copy();
                        _canvas.References.AddImage(imageCopy, dialog.Filename, worldX, worldY, width, height);
                    }

                    RedrawAllViewports();
                }
            }
            catch (Exception ex)
            {
                ShowError($"Add reference image failed: {ex.Message}");
            }
            finally
            {
                dialog.Destroy();
            }
        }

        private void Viewport_ReferenceDeleteRequested(CanvasViewportWidget viewport)
        {
            if (_canvas.References.RemoveSelected())
            {
                RedrawAllViewports();
            }
        }

        private void HandleReferenceLayerChanged()
        {
            UpdateReferenceOptions();
        }

        private void HandleReferenceOpacityChanged(double opacity)
        {
            ReferenceObject selected = _canvas.References.Selected;
            if (selected == null)
            {
                return;
            }

            selected.Opacity = Math.Max(0, Math.Min(1, opacity));
            RedrawAllViewports();
        }

        private void UpdateReferenceOptions()
        {
            ReferenceObject selected = _canvas.References.Selected;
            double opacity = selected?.Opacity ?? 1.0;
            _toolbarPanel.SetReferenceOpacity(opacity, selected != null);
            if (_optionReferenceOpacity != null)
            {
                _suppressOptionEvents = true;
                _optionReferenceOpacity.Value = Math.Max(0, Math.Min(1, opacity)) * 100.0;
                _optionReferenceOpacity.Sensitive = selected != null;
                _suppressOptionEvents = false;
            }
        }

        private void UpdateWindowTitle()
        {
            string title = "Pixel Splash Studio";
            if (!string.IsNullOrWhiteSpace(_currentFilePath))
            {
                title += $" - {System.IO.Path.GetFileName(_currentFilePath)}";
            }

            Title = title;
        }

        private void SaveCanvasToFile(string path)
        {
            try
            {
                _canvasFiles.Save(path, _paletteLibraryService.Library?.SelectedName);
            }
            catch (Exception ex)
            {
                ShowError($"Save failed: {ex.Message}");
            }
        }

        private void LoadCanvasFromFile(string path)
        {
            try
            {
                CanvasFileData data = _canvasFiles.Load(path);
                _history.Clear();
                _currentFilePath = path;
                UpdateEditMenu();
                UpdateWindowTitle();
                ApplyPaletteFromFile(data, path);
                RedrawAllViewports();
            }
            catch (Exception ex)
            {
                ShowError($"Open failed: {ex.Message}");
            }
        }

        private void ShowError(string message)
        {
            MessageDialog dialog = new MessageDialog(
                this,
                DialogFlags.Modal,
                MessageType.Error,
                ButtonsType.Ok,
                message);
            try
            {
                dialog.Run();
            }
            finally
            {
                dialog.Destroy();
            }
        }


    }
}
