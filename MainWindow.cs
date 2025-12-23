using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Gtk;
using UI = Gtk.Builder.ObjectAttribute;

namespace pixel_splash_studio
{
    class MainWindow : Gtk.Window
    {
        [UI] private Box _viewportTab1 = null;
        [UI] private Box _viewportTab2 = null;
        [UI] private Notebook _viewportTabs = null;
        [UI] private MenuItem _toolGrabZoom = null;
        [UI] private MenuItem _toolPen = null;
        [UI] private MenuItem _toolLine = null;
        [UI] private MenuItem _toolRectangle = null;
        [UI] private MenuItem _toolSelection = null;
        [UI] private MenuItem _toolFloodFill = null;
        [UI] private MenuItem _toolSelectionOval = null;
        [UI] private MenuItem _toolStamp = null;
        [UI] private MenuItem _toolOval = null;
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
        [UI] private CheckMenuItem _optionStampOverwrite = null;
        [UI] private MenuItem _optionClearSelection = null;
        [UI] private SeparatorMenuItem _optionSeparator = null;
        [UI] private CheckMenuItem _viewPaletteToggle = null;
        [UI] private MenuItem _viewNewViewport = null;

        private readonly PixelSplashCanvas _canvas;
        private readonly PixelSplashPalette _palette;
        private readonly CanvasViewportWidget _viewA;
        private readonly CanvasViewportWidget _viewB;
        private readonly GrabAndZoomTool _grabToolA;
        private readonly GrabAndZoomTool _grabToolB;
        private readonly PenTool _penTool;
        private readonly LineTool _lineTool;
        private readonly RectangleTool _rectangleTool;
        private readonly SelectionRectangleTool _selectionTool;
        private readonly SelectionOvalTool _selectionOvalTool;
        private readonly FloodFillTool _floodFillTool;
        private readonly StampTool _stampTool;
        private readonly OvalTool _ovalTool;
        private readonly FloatingPaletteWidget _paletteWindow;
        private readonly ViewportTool _viewportTool;
        private readonly CanvasViewportSettings _viewportSettings;
        private readonly AppConfig _config;
        private readonly List<CanvasViewportWidget> _viewports = new List<CanvasViewportWidget>();
        private readonly Dictionary<Gtk.Window, CanvasViewportWidget> _detachedViewports = new Dictionary<Gtk.Window, CanvasViewportWidget>();
        private ToolMode _activeToolMode = ToolMode.GrabZoom;
        private bool _suppressOptionEvents;
        private readonly Stack<PixelSplashCanvasSnapshot> _undoStack = new Stack<PixelSplashCanvasSnapshot>();
        private readonly Stack<PixelSplashCanvasSnapshot> _redoStack = new Stack<PixelSplashCanvasSnapshot>();
        private PixelSplashCanvasSnapshot _pendingSnapshot;
        private readonly AccelGroup _accelGroup = new AccelGroup();
        private string _currentFilePath;
        private SelectionClipboard _clipboard;

        public MainWindow() : this(new Builder("MainWindow.glade"), AppConfig.Load()) { }

        public MainWindow(AppConfig config) : this(new Builder("MainWindow.glade"), config) { }

        private MainWindow(Builder builder, AppConfig config) : base(builder.GetRawOwnedObject("MainWindow"))
        {
            builder.Autoconnect(this);
            AddAccelGroup(_accelGroup);
            _config = config ?? new AppConfig();

            _canvas = new PixelSplashCanvas();
            _palette = new PixelSplashPalette();
            InitializePalette(_palette);
            _viewportSettings = new CanvasViewportSettings
            {
                PixelGridMinSize = _config.PixelGridMinSize,
                TileGridSize = _config.TileGridSize
            };
            _viewA = new CanvasViewportWidget(_canvas, _palette, _viewportSettings);
            _viewB = new CanvasViewportWidget(_canvas, _palette, _viewportSettings);

            _viewportTab1.PackStart(_viewA, true, true, 0);
            _viewportTab2.PackStart(_viewB, true, true, 0);

            _viewA.Show();
            _viewB.Show();

            _grabToolA = new GrabAndZoomTool(_viewA.Viewport, _config.ZoomDragStepPixels);
            _grabToolB = new GrabAndZoomTool(_viewB.Viewport, _config.ZoomDragStepPixels);
            _penTool = new PenTool(_viewA.Viewport, _canvas, _palette);
            _lineTool = new LineTool(_canvas, _palette);
            _rectangleTool = new RectangleTool(_canvas, _palette);
            _selectionTool = new SelectionRectangleTool(_canvas);
            _selectionOvalTool = new SelectionOvalTool(_canvas);
            _floodFillTool = new FloodFillTool(_canvas, _palette);
            _stampTool = new StampTool(_canvas, _palette, () => _clipboard);
            _ovalTool = new OvalTool(_canvas, _palette);
            _viewportTool = new ViewportTool(_canvas, _palette, _viewportSettings);

            _viewports.Add(_viewA);
            _viewports.Add(_viewB);
            AttachViewportHandlers(_viewA);
            AttachViewportHandlers(_viewB);
            ApplyToolModeToAllViews();

            SeedCanvas(_canvas);

            _paletteWindow = new FloatingPaletteWidget(_palette)
            {
                TransientFor = this
            };
            _paletteWindow.Show();
            _paletteWindow.DeleteEvent += PaletteWindow_DeleteEvent;

            _viewportTool.ViewportCreated += HandleViewportCreated;
            _viewportTool.ViewportClosed += HandleViewportClosed;

            _toolGrabZoom.Activated += ToolGrabZoom_Activated;
            _toolPen.Activated += ToolPen_Activated;
            _toolLine.Activated += ToolLine_Activated;
            _toolRectangle.Activated += ToolRectangle_Activated;
            _toolSelection.Activated += ToolSelection_Activated;
            _toolFloodFill.Activated += ToolFloodFill_Activated;
            _toolSelectionOval.Activated += ToolSelectionOval_Activated;
            _toolStamp.Activated += ToolStamp_Activated;
            _toolOval.Activated += ToolOval_Activated;
            _viewNewViewport.Activated += ToolNewViewport_Activated;
            _editUndo.Activated += EditUndo_Activated;
            _editRedo.Activated += EditRedo_Activated;
            _editCopy.Activated += EditCopy_Activated;
            _fileNew.Activated += FileNew_Activated;
            _fileOpen.Activated += FileOpen_Activated;
            _fileSave.Activated += FileSave_Activated;
            _fileSaveAs.Activated += FileSaveAs_Activated;
            _viewPaletteToggle.Toggled += ViewPaletteToggle_Toggled;
            _optionRectangleFill.Toggled += OptionRectangleFill_Toggled;
            _optionTransparentOverwrite.Toggled += OptionTransparentOverwrite_Toggled;
            _optionStampOverwrite.Toggled += OptionStampOverwrite_Toggled;
            _optionClearSelection.Activated += OptionClearSelection_Activated;

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

        private static void InitializePalette(PixelSplashPalette palette)
        {
            palette.Palette.Add(new Tuple<byte, byte, byte, byte>(0, 0, 0, 0));
            palette.Palette.Add(new Tuple<byte, byte, byte, byte>(0, 0, 0, 255));
            palette.Palette.Add(new Tuple<byte, byte, byte, byte>(220, 20, 60, 255));
            palette.Palette.Add(new Tuple<byte, byte, byte, byte>(30, 144, 255, 255));
            palette.Palette.Add(new Tuple<byte, byte, byte, byte>(60, 179, 113, 255));
        }

        private static void SeedCanvas(PixelSplashCanvas canvas)
        {
            canvas.DrawLine(-8, -8, 8, 8, 2);
            canvas.DrawLine(-8, 8, 8, -8, 3);
            canvas.DrawRectangle(-12, -12, 24, 24, 4);
        }

        private void ToolGrabZoom_Activated(object sender, EventArgs e)
        {
            _activeToolMode = ToolMode.GrabZoom;
            ApplyToolModeToAllViews();
            UpdateOptionsMenu();
        }

        private void ToolPen_Activated(object sender, EventArgs e)
        {
            _activeToolMode = ToolMode.Pen;
            ApplyToolModeToAllViews();
            UpdateOptionsMenu();
        }

        private void ToolLine_Activated(object sender, EventArgs e)
        {
            _activeToolMode = ToolMode.Line;
            ApplyToolModeToAllViews();
            UpdateOptionsMenu();
        }

        private void ToolRectangle_Activated(object sender, EventArgs e)
        {
            _activeToolMode = ToolMode.Rectangle;
            ApplyToolModeToAllViews();
            UpdateOptionsMenu();
        }

        private void ToolSelection_Activated(object sender, EventArgs e)
        {
            _activeToolMode = ToolMode.Selection;
            ApplyToolModeToAllViews();
            UpdateOptionsMenu();
        }

        private void ToolFloodFill_Activated(object sender, EventArgs e)
        {
            _activeToolMode = ToolMode.FloodFill;
            ApplyToolModeToAllViews();
            UpdateOptionsMenu();
        }

        private void ToolSelectionOval_Activated(object sender, EventArgs e)
        {
            _activeToolMode = ToolMode.SelectionOval;
            ApplyToolModeToAllViews();
            UpdateOptionsMenu();
        }

        private void ToolStamp_Activated(object sender, EventArgs e)
        {
            _activeToolMode = ToolMode.Stamp;
            ApplyToolModeToAllViews();
            UpdateOptionsMenu();
        }

        private void ToolOval_Activated(object sender, EventArgs e)
        {
            _activeToolMode = ToolMode.Oval;
            ApplyToolModeToAllViews();
            UpdateOptionsMenu();
        }

        private void ToolNewViewport_Activated(object sender, EventArgs e)
        {
            _viewportTool.OpenViewportWindow(this);
        }

        private void FileNew_Activated(object sender, EventArgs e)
        {
            _canvas.ClearCanvas();
            _undoStack.Clear();
            _redoStack.Clear();
            _pendingSnapshot = null;
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
            if (_paletteWindow == null)
            {
                return;
            }

            if (_viewPaletteToggle.Active)
            {
                _paletteWindow.Show();
            }
            else
            {
                _paletteWindow.Hide();
            }
        }

        private void PaletteWindow_DeleteEvent(object sender, DeleteEventArgs e)
        {
            if (_viewPaletteToggle != null)
            {
                _viewPaletteToggle.Active = false;
            }

            _paletteWindow.Hide();
            e.RetVal = true;
        }

        private void HandleViewportCreated(CanvasViewportWidget viewport)
        {
            _viewports.Add(viewport);
            AttachViewportHandlers(viewport);
            ApplyToolModeToView(viewport);
        }

        private void HandleViewportClosed(CanvasViewportWidget viewport)
        {
            _viewports.Remove(viewport);
            DetachViewportHandlers(viewport);
        }

        private void ApplyToolModeToAllViews()
        {
            for (int i = 0; i < _viewports.Count; i++)
            {
                ApplyToolModeToView(_viewports[i]);
            }
        }

        private void ApplyToolModeToView(CanvasViewportWidget view)
        {
            if (view?.Viewport == null)
            {
                return;
            }

            switch (_activeToolMode)
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
                default:
                    if (view == _viewA)
                    {
                        view.SetActiveTool(_grabToolA);
                    }
                    else if (view == _viewB)
                    {
                        view.SetActiveTool(_grabToolB);
                    }
                    else
                    {
                        view.SetActiveTool(new GrabAndZoomTool(view.Viewport, _config.ZoomDragStepPixels));
                    }
                    break;
            }
        }

        private enum ToolMode
        {
            GrabZoom,
            Pen,
            Line,
            Rectangle,
            Selection,
            FloodFill,
            SelectionOval,
            Stamp,
            Oval
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
            viewport.StampOverwriteToggled += Viewport_StampOverwriteToggled;
            viewport.ClearSelectionRequested += Viewport_ClearSelectionRequested;
            viewport.SelectionChanged += Viewport_SelectionChanged;
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
            viewport.StampOverwriteToggled -= Viewport_StampOverwriteToggled;
            viewport.ClearSelectionRequested -= Viewport_ClearSelectionRequested;
            viewport.SelectionChanged -= Viewport_SelectionChanged;
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
            _pendingSnapshot = _canvas.CreateSnapshot();
        }

        private void Viewport_ToolUseCompleted(CanvasViewportWidget viewport)
        {
            if (_pendingSnapshot == null)
            {
                return;
            }

            _undoStack.Push(_pendingSnapshot);
            _pendingSnapshot = null;
            _redoStack.Clear();
            UpdateEditMenu();
        }

        private void EditUndo_Activated(object sender, EventArgs e)
        {
            if (_undoStack.Count == 0)
            {
                return;
            }

            _redoStack.Push(_canvas.CreateSnapshot());
            _canvas.RestoreSnapshot(_undoStack.Pop());
            RedrawAllViewports();
            UpdateEditMenu();
        }

        private void EditRedo_Activated(object sender, EventArgs e)
        {
            if (_redoStack.Count == 0)
            {
                return;
            }

            _undoStack.Push(_canvas.CreateSnapshot());
            _canvas.RestoreSnapshot(_redoStack.Pop());
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

            _clipboard = clipboard;
            UpdateEditMenu();
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
                _editUndo.Sensitive = _undoStack.Count > 0;
            }

            if (_editRedo != null)
            {
                _editRedo.Sensitive = _redoStack.Count > 0;
            }

            if (_editCopy != null)
            {
                _editCopy.Sensitive = _canvas.Selection.HasSelection;
            }
        }

        private void UpdateOptionsMenu()
        {
            if (_menuOptions == null || _rectangleTool == null || _ovalTool == null || _optionClearSelection == null || _optionSeparator == null || _optionStampOverwrite == null)
            {
                return;
            }

            bool isShape = _activeToolMode == ToolMode.Rectangle || _activeToolMode == ToolMode.Oval;
            bool isStamp = _activeToolMode == ToolMode.Stamp;
            bool isSelectionTool = _activeToolMode == ToolMode.Selection || _activeToolMode == ToolMode.SelectionOval;
            bool hasSelection = _canvas.Selection.HasSelection;
            _menuOptions.Sensitive = isShape || isStamp || isSelectionTool || hasSelection;

            _optionRectangleFill.Visible = isShape;
            _optionTransparentOverwrite.Visible = isShape;
            _optionStampOverwrite.Visible = isStamp;
            _optionSeparator.Visible = isSelectionTool || hasSelection;
            _optionClearSelection.Visible = isSelectionTool || hasSelection;
            _optionClearSelection.Sensitive = hasSelection;

            _suppressOptionEvents = true;
            if (isStamp)
            {
                _optionStampOverwrite.Active = _stampTool.OverwriteDestination;
            }
            else if (_activeToolMode == ToolMode.Oval)
            {
                _optionRectangleFill.Active = _ovalTool.Fill;
                _optionTransparentOverwrite.Active = _ovalTool.OverwriteTransparent;
            }
            else
            {
                _optionRectangleFill.Active = _rectangleTool.Fill;
                _optionTransparentOverwrite.Active = _rectangleTool.OverwriteTransparent;
            }
            _suppressOptionEvents = false;
        }

        private void ClearSelection()
        {
            _canvas.Selection.Clear();
            UpdateOptionsMenu();
            UpdateEditMenu();
            RedrawAllViewports();
        }

        private void OptionRectangleFill_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents || _rectangleTool == null)
            {
                return;
            }

            _rectangleTool.Fill = _optionRectangleFill.Active;
            _ovalTool.Fill = _optionRectangleFill.Active;
        }

        private void OptionTransparentOverwrite_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents || _rectangleTool == null)
            {
                return;
            }

            _rectangleTool.OverwriteTransparent = _optionTransparentOverwrite.Active;
            _ovalTool.OverwriteTransparent = _optionTransparentOverwrite.Active;
        }

        private void OptionStampOverwrite_Toggled(object sender, EventArgs e)
        {
            if (_suppressOptionEvents || _stampTool == null)
            {
                return;
            }

            _stampTool.OverwriteDestination = _optionStampOverwrite.Active;
        }

        private void OptionClearSelection_Activated(object sender, EventArgs e)
        {
            ClearSelection();
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

            _rectangleTool.Fill = isFilled;
            _ovalTool.Fill = isFilled;
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

            _rectangleTool.OverwriteTransparent = isEnabled;
            _ovalTool.OverwriteTransparent = isEnabled;
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

            _stampTool.OverwriteDestination = isEnabled;
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
                CanvasFileData data = new CanvasFileData();
                foreach (var entry in _canvas.Chunks)
                {
                    data.Chunks.Add(new CanvasChunkData
                    {
                        ChunkX = entry.Key.Item1,
                        ChunkY = entry.Key.Item2,
                        Data = (byte[])entry.Value.Data.Clone()
                    });
                }

                string json = JsonSerializer.Serialize(data, new JsonSerializerOptions
                {
                    WriteIndented = true
                });
                File.WriteAllText(path, json);
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
                string json = File.ReadAllText(path);
                CanvasFileData data = JsonSerializer.Deserialize<CanvasFileData>(json);
                _canvas.ClearCanvas();

                if (data?.Chunks != null)
                {
                    foreach (CanvasChunkData chunkData in data.Chunks)
                    {
                        int chunkX = chunkData.ChunkX;
                        int chunkY = chunkData.ChunkY;
                        var chunk = new PixelSplashCanvasChunk(
                            chunkX * PixelSplashCanvasChunk.ChunkWidth,
                            chunkY * PixelSplashCanvasChunk.ChunkHeight);
                        chunk.Data = chunkData.Data ?? new byte[PixelSplashCanvasChunk.ChunkWidth * PixelSplashCanvasChunk.ChunkHeight];
                        _canvas.Chunks[(chunkX, chunkY)] = chunk;
                    }
                }

                _undoStack.Clear();
                _redoStack.Clear();
                _pendingSnapshot = null;
                _currentFilePath = path;
                UpdateEditMenu();
                UpdateWindowTitle();
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


        private class CanvasFileData
        {
            public List<CanvasChunkData> Chunks { get; set; } = new List<CanvasChunkData>();
        }

        private class CanvasChunkData
        {
            public int ChunkX { get; set; }
            public int ChunkY { get; set; }
            public byte[] Data { get; set; }
        }
    }
}
