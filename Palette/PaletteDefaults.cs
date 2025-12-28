using System;

namespace PixelSplashStudio
{
    public static class PaletteDefaults
    {
        public static void Apply(PixelSplashPalette palette)
        {
            if (palette == null)
            {
                return;
            }

            palette.Palette.Add(new Tuple<byte, byte, byte, byte>(0, 0, 0, 0));
            palette.Palette.Add(new Tuple<byte, byte, byte, byte>(0, 0, 0, 255));
            palette.Palette.Add(new Tuple<byte, byte, byte, byte>(220, 20, 60, 255));
            palette.Palette.Add(new Tuple<byte, byte, byte, byte>(30, 144, 255, 255));
            palette.Palette.Add(new Tuple<byte, byte, byte, byte>(60, 179, 113, 255));
        }
    }
}
