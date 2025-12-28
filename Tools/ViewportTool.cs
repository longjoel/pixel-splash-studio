using System;
using System.Collections.Generic;
using Gtk;

namespace PixelSplashStudio
{
    public class ViewportTool
    {
        private readonly ViewportFactory _viewportFactory;
        private readonly Dictionary<Window, ViewportContext> _windows = new Dictionary<Window, ViewportContext>();

        public event Action<ViewportContext> ViewportCreated;
        public event Action<ViewportContext> ViewportClosed;

        public ViewportTool(ViewportFactory viewportFactory)
        {
            _viewportFactory = viewportFactory ?? throw new ArgumentNullException(nameof(viewportFactory));
        }

        public void OpenViewportWindow(Window parent = null)
        {
            Window window = new Window("Viewport");
            window.SetDefaultSize(640, 480);
            if (parent != null)
            {
                window.TransientFor = parent;
            }
            ThemeHelper.ApplyWindowBackground(window);

            ViewportContext context = _viewportFactory.CreateViewport();
            window.Add(context.Widget);
            _windows[window] = context;
            ViewportCreated?.Invoke(context);

            window.DeleteEvent += (sender, args) =>
            {
                ViewportClosed?.Invoke(context);
                _windows.Remove(window);
                window.Destroy();
            };

            window.ShowAll();
        }
    }
}
