using System;

namespace PixelSplashStudio
{
    public sealed class ViewportFactory
    {
        private readonly PixelSplashCanvas _canvas;
        private readonly PixelSplashPalette _palette;
        private readonly CanvasViewportSettings _settings;
        private readonly AppConfig _config;
        private readonly AppState _appState;

        public ViewportFactory(
            PixelSplashCanvas canvas,
            PixelSplashPalette palette,
            CanvasViewportSettings settings,
            AppConfig config,
            AppState appState)
        {
            _canvas = canvas ?? throw new ArgumentNullException(nameof(canvas));
            _palette = palette ?? throw new ArgumentNullException(nameof(palette));
            _settings = settings ?? throw new ArgumentNullException(nameof(settings));
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _appState = appState ?? throw new ArgumentNullException(nameof(appState));
        }

        public ViewportContext CreateViewport()
        {
            CanvasViewport viewport = new CanvasViewport(_canvas, _palette, _settings);
            GrabAndZoomTool grabTool = new GrabAndZoomTool(viewport, _config.ZoomDragStepPixels);
            ToolManager toolManager = new ToolManager(grabTool);
            CanvasViewportWidget widget = new CanvasViewportWidget(viewport, toolManager);
            ReferenceTransformTool referenceTool = new ReferenceTransformTool(viewport, _canvas.References)
            {
                TileSize = _config.TileGridSize,
                SnapMode = _appState.ReferenceSnapMode
            };

            return new ViewportContext(widget, grabTool, referenceTool);
        }
    }
}
