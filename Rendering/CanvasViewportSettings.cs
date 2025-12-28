namespace PixelSplashStudio
{
    public class CanvasViewportSettings
    {
        public byte BackgroundR { get; set; } = 255;
        public byte BackgroundG { get; set; } = 255;
        public byte BackgroundB { get; set; } = 255;
        public byte BackgroundA { get; set; } = 255;

        public byte GridR { get; set; } = 210;
        public byte GridG { get; set; } = 230;
        public byte GridB { get; set; } = 255;
        public byte GridA { get; set; } = 255;

        public int PixelGridMinSize { get; set; } = 10;
        public int TileGridSize { get; set; } = 8;
    }
}
