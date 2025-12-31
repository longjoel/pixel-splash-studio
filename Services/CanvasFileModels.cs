using System.Collections.Generic;

namespace PixelSplashStudio
{
    public class CanvasFileData
    {
        public List<CanvasChunkData> Chunks { get; set; } = new List<CanvasChunkData>();
        public string PaletteName { get; set; }
        public List<PaletteColorData> PaletteColors { get; set; } = new List<PaletteColorData>();
        public List<ReferenceItemData> References { get; set; } = new List<ReferenceItemData>();
    }

    public class CanvasChunkData
    {
        public int ChunkX { get; set; }
        public int ChunkY { get; set; }
        public byte[] Data { get; set; }
    }

    public class ReferenceItemData
    {
        public string Type { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public double Opacity { get; set; } = 1.0;
        public string Text { get; set; }
        public string FontFamily { get; set; }
        public double FontSize { get; set; }
        public string ImagePath { get; set; }
        public string ImageData { get; set; }
    }
}
