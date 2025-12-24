using System.Collections.Generic;

namespace pixel_splash_studio
{
    public class PaletteColorData
    {
        public byte R { get; set; }
        public byte G { get; set; }
        public byte B { get; set; }
        public byte A { get; set; }
    }

    public class PaletteEntryData
    {
        public string Name { get; set; }
        public List<PaletteColorData> Colors { get; set; } = new List<PaletteColorData>();
    }

    public class PaletteLibraryData
    {
        public string SelectedName { get; set; }
        public List<PaletteEntryData> Palettes { get; set; } = new List<PaletteEntryData>();
    }

    public class PaletteFileData
    {
        public string Name { get; set; }
        public List<PaletteColorData> Colors { get; set; } = new List<PaletteColorData>();
    }
}
