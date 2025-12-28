namespace PixelSplashStudio
{
    public sealed class AppBootstrapper
    {
        internal MainWindow CreateMainWindow()
        {
            AppConfig config = AppConfig.Load();
            AppState appState = new AppState();
            PixelSplashCanvas canvas = new PixelSplashCanvas();
            PixelSplashPalette palette = new PixelSplashPalette();
            PaletteDefaults.Apply(palette);

            CanvasViewportSettings viewportSettings = new CanvasViewportSettings
            {
                PixelGridMinSize = config.PixelGridMinSize,
                TileGridSize = config.TileGridSize
            };

            PaletteLibraryService paletteLibrary = new PaletteLibraryService(palette);
            CanvasHistoryService history = new CanvasHistoryService(canvas);
            CanvasFileService canvasFiles = new CanvasFileService(canvas, palette);
            SelectionExportService selectionExport = new SelectionExportService(canvas, palette);
            SelectionClipboardService clipboardService = new SelectionClipboardService();
            ToolCatalog tools = new ToolCatalog(canvas, palette, clipboardService);
            ViewportFactory viewportFactory = new ViewportFactory(canvas, palette, viewportSettings, config, appState);
            ViewportTool viewportTool = new ViewportTool(viewportFactory);

            MainWindowDependencies dependencies = new MainWindowDependencies(
                config,
                appState,
                canvas,
                palette,
                viewportSettings,
                paletteLibrary,
                history,
                canvasFiles,
                selectionExport,
                clipboardService,
                tools,
                viewportFactory,
                viewportTool);

            return new MainWindow(dependencies);
        }
    }
}
