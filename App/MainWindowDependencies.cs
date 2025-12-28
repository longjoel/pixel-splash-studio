using System;

namespace PixelSplashStudio
{
    public sealed class MainWindowDependencies
    {
        public AppConfig Config { get; }
        public AppState AppState { get; }
        public PixelSplashCanvas Canvas { get; }
        public PixelSplashPalette Palette { get; }
        public CanvasViewportSettings ViewportSettings { get; }
        public PaletteLibraryService PaletteLibrary { get; }
        public CanvasHistoryService History { get; }
        public CanvasFileService CanvasFiles { get; }
        public SelectionExportService SelectionExport { get; }
        public SelectionClipboardService ClipboardService { get; }
        public ToolCatalog Tools { get; }
        public ViewportFactory ViewportFactory { get; }
        public ViewportTool ViewportTool { get; }

        public MainWindowDependencies(
            AppConfig config,
            AppState appState,
            PixelSplashCanvas canvas,
            PixelSplashPalette palette,
            CanvasViewportSettings viewportSettings,
            PaletteLibraryService paletteLibrary,
            CanvasHistoryService history,
            CanvasFileService canvasFiles,
            SelectionExportService selectionExport,
            SelectionClipboardService clipboardService,
            ToolCatalog tools,
            ViewportFactory viewportFactory,
            ViewportTool viewportTool)
        {
            Config = config ?? throw new ArgumentNullException(nameof(config));
            AppState = appState ?? throw new ArgumentNullException(nameof(appState));
            Canvas = canvas ?? throw new ArgumentNullException(nameof(canvas));
            Palette = palette ?? throw new ArgumentNullException(nameof(palette));
            ViewportSettings = viewportSettings ?? throw new ArgumentNullException(nameof(viewportSettings));
            PaletteLibrary = paletteLibrary ?? throw new ArgumentNullException(nameof(paletteLibrary));
            History = history ?? throw new ArgumentNullException(nameof(history));
            CanvasFiles = canvasFiles ?? throw new ArgumentNullException(nameof(canvasFiles));
            SelectionExport = selectionExport ?? throw new ArgumentNullException(nameof(selectionExport));
            ClipboardService = clipboardService ?? throw new ArgumentNullException(nameof(clipboardService));
            Tools = tools ?? throw new ArgumentNullException(nameof(tools));
            ViewportFactory = viewportFactory ?? throw new ArgumentNullException(nameof(viewportFactory));
            ViewportTool = viewportTool ?? throw new ArgumentNullException(nameof(viewportTool));
        }
    }
}
