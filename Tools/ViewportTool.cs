using System;
using System.Collections.Generic;
using Gtk;

public class ViewportTool
{
    private readonly PixelSplashCanvas _canvas;
    private readonly PixelSplashPalette _palette;
    private readonly CanvasViewportSettings _settings;
    private readonly Dictionary<Window, CanvasViewportWidget> _windows = new Dictionary<Window, CanvasViewportWidget>();

    public event Action<CanvasViewportWidget> ViewportCreated;
    public event Action<CanvasViewportWidget> ViewportClosed;

    public ViewportTool(PixelSplashCanvas canvas, PixelSplashPalette palette, CanvasViewportSettings settings)
    {
        _canvas = canvas;
        _palette = palette;
        _settings = settings;
    }

        public void OpenViewportWindow(Window parent = null)
        {
            Window window = new Window("Viewport");
            window.SetDefaultSize(640, 480);
            if (parent != null)
            {
                window.TransientFor = parent;
            }
            pixel_splash_studio.ThemeHelper.ApplyWindowBackground(window);

            CanvasViewportWidget viewport = new CanvasViewportWidget(_canvas, _palette, _settings);
        window.Add(viewport);
        _windows[window] = viewport;
        ViewportCreated?.Invoke(viewport);

        window.DeleteEvent += (sender, args) =>
        {
            ViewportClosed?.Invoke(viewport);
            _windows.Remove(window);
            window.Destroy();
        };

        window.ShowAll();
    }
}
