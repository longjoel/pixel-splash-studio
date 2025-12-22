using System;
using System.Collections.Generic;
using Gtk;
using UI = Gtk.Builder.ObjectAttribute;

namespace pixel_splash_studio
{
    class MainWindow : Window
    {
        [UI] private Box _viewportTab1 = null;
        [UI] private Box _viewportTab2 = null;
        [UI] private Notebook _viewportTabs = null;
        [UI] private MenuItem _toolGrabZoom = null;
        [UI] private MenuItem _toolPen = null;
        [UI] private MenuItem _toolLine = null;
        [UI] private MenuItem _toolRectangle = null;
        [UI] private MenuItem _toolOval = null;
        [UI] private MenuItem _menuOptions = null;
        [UI] private CheckMenuItem _optionRectangleFill = null;
        [UI] private CheckMenuItem _optionTransparentOverwrite = null;
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
        private readonly OvalTool _ovalTool;
        private readonly FloatingPaletteWidget _paletteWindow;
        private readonly ViewportTool _viewportTool;
        private readonly List<CanvasViewportWidget> _viewports = new List<CanvasViewportWidget>();
        private readonly Dictionary<Window, CanvasViewportWidget> _detachedViewports = new Dictionary<Window, CanvasViewportWidget>();
        private ToolMode _activeToolMode = ToolMode.GrabZoom;
        private bool _suppressOptionEvents;

        public MainWindow() : this(new Builder("MainWindow.glade")) { }

        private MainWindow(Builder builder) : base(builder.GetRawOwnedObject("MainWindow"))
        {
            builder.Autoconnect(this);

            _canvas = new PixelSplashCanvas();
            _palette = new PixelSplashPalette();
            InitializePalette(_palette);
            _viewA = new CanvasViewportWidget(_canvas, _palette);
            _viewB = new CanvasViewportWidget(_canvas, _palette);

            _viewportTab1.PackStart(_viewA, true, true, 0);
            _viewportTab2.PackStart(_viewB, true, true, 0);

            _viewA.Show();
            _viewB.Show();

            _grabToolA = new GrabAndZoomTool(_viewA.Viewport);
            _grabToolB = new GrabAndZoomTool(_viewB.Viewport);
            _penTool = new PenTool(_viewA.Viewport, _canvas, _palette);
            _lineTool = new LineTool(_canvas, _palette);
            _rectangleTool = new RectangleTool(_canvas, _palette);
            _ovalTool = new OvalTool(_canvas, _palette);
            _viewportTool = new ViewportTool(_canvas, _palette);

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
            _toolOval.Activated += ToolOval_Activated;
            _viewNewViewport.Activated += ToolNewViewport_Activated;
            _viewPaletteToggle.Toggled += ViewPaletteToggle_Toggled;
            _optionRectangleFill.Toggled += OptionRectangleFill_Toggled;
            _optionTransparentOverwrite.Toggled += OptionTransparentOverwrite_Toggled;

            UpdateOptionsMenu();

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
                        view.SetActiveTool(new GrabAndZoomTool(view.Viewport));
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
        }

        private void DetachViewportHandlers(CanvasViewportWidget viewport)
        {
            if (viewport == null)
            {
                return;
            }

            viewport.DetachRequested -= Viewport_DetachRequested;
            viewport.ReattachRequested -= Viewport_ReattachRequested;
        }

        private void Viewport_DetachRequested(CanvasViewportWidget viewport)
        {
            if (viewport == null)
            {
                return;
            }

            if (viewport.Parent is Window)
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

            Window window = new Window("Viewport");
            window.SetDefaultSize(640, 480);
            window.TransientFor = this;
            window.Add(viewport);
            _detachedViewports[window] = viewport;
            window.DeleteEvent += DetachedWindow_DeleteEvent;
            window.ShowAll();
        }

        private void DetachedWindow_DeleteEvent(object sender, DeleteEventArgs args)
        {
            if (sender is Window window && _detachedViewports.TryGetValue(window, out CanvasViewportWidget viewport))
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

            if (!(viewport.Parent is Window window))
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

        private void UpdateOptionsMenu()
        {
            if (_menuOptions == null || _rectangleTool == null || _ovalTool == null)
            {
                return;
            }

            bool isShape = _activeToolMode == ToolMode.Rectangle || _activeToolMode == ToolMode.Oval;
            _menuOptions.Sensitive = isShape;

            _suppressOptionEvents = true;
            if (_activeToolMode == ToolMode.Oval)
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
    }
}
