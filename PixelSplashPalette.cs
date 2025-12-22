using System;
using System.Collections.Generic;

public class PixelSplashPalette
{
    public List<Tuple<byte, byte, byte, byte>> Palette { get; set; }

    public int PrimaryIndex { get; set; }
    public int SecondaryIndex { get; set; }

    public PixelSplashPalette()
    {
        Palette = new List<Tuple<byte, byte, byte, byte>>(256);
        PrimaryIndex = 1;
        SecondaryIndex = 0;

        // Initialize the palette with default values
        for (int i = 0; i < 64; i++)
        {
            Palette.Add(NesNtscColors[i]);
        }

        // Repeat the 64-color pattern 4 times to fill 256 entries
        for (int i = 64; i < 256; i++)
        {
            Palette.Add(NesNtscColors[i % 64]);
        }
    }

    private readonly Tuple<byte, byte, byte, byte>[] NesNtscColors = new[]
    {
            new Tuple<byte,byte,byte,byte>(0,0,0,0),
            new Tuple<byte,byte,byte,byte>(84, 84, 84, 255),
            new Tuple<byte,byte,byte,byte>(0, 30, 116, 255),
            new Tuple<byte,byte,byte,byte>(8, 16, 144, 255),
            new Tuple<byte,byte,byte,byte>(48, 0, 136, 255),
            new Tuple<byte,byte,byte,byte>(68, 0, 100, 255),
            new Tuple<byte,byte,byte,byte>(92, 0, 48, 255),
            new Tuple<byte,byte,byte,byte>(84, 4, 0, 255),
            new Tuple<byte,byte,byte,byte>(60, 24, 0, 255),
            new Tuple<byte,byte,byte,byte>(32, 42, 0, 255),
            new Tuple<byte,byte,byte,byte>(8, 58, 0, 255),
            new Tuple<byte,byte,byte,byte>(0, 64, 0, 255),
            new Tuple<byte,byte,byte,byte>(0, 60, 20, 255),
            new Tuple<byte,byte,byte,byte>(0, 50, 60, 255),
            new Tuple<byte,byte,byte,byte>(0, 0, 0, 255),
            new Tuple<byte,byte,byte,byte>(0, 0, 0, 255),
            new Tuple<byte,byte,byte,byte>(0, 0, 0, 255),
            new Tuple<byte,byte,byte,byte>(152, 150, 152, 255),
            new Tuple<byte,byte,byte,byte>(8, 76, 196, 255),
            new Tuple<byte,byte,byte,byte>(48, 50, 236, 255),
            new Tuple<byte,byte,byte,byte>(92, 30, 228, 255),
            new Tuple<byte,byte,byte,byte>(136, 20, 176, 255),
            new Tuple<byte,byte,byte,byte>(160, 20, 100, 255),
            new Tuple<byte,byte,byte,byte>(152, 34, 32, 255),
            new Tuple<byte,byte,byte,byte>(120, 60, 0, 255),
            new Tuple<byte,byte,byte,byte>(84, 90, 0, 255),
            new Tuple<byte,byte,byte,byte>(40, 114, 0, 255),
            new Tuple<byte,byte,byte,byte>(8, 124, 0, 255),
            new Tuple<byte,byte,byte,byte>(0, 118, 40, 255),
            new Tuple<byte,byte,byte,byte>(0, 102, 120, 255),
            new Tuple<byte,byte,byte,byte>(0, 0, 0, 255),
            new Tuple<byte,byte,byte,byte>(0, 0, 0, 255),
            new Tuple<byte,byte,byte,byte>(0, 0, 0, 255),
            new Tuple<byte,byte,byte,byte>(236, 238, 236, 255),
            new Tuple<byte,byte,byte,byte>(76, 154, 236, 255),
            new Tuple<byte,byte,byte,byte>(120, 124, 236, 255),
            new Tuple<byte,byte,byte,byte>(176, 98, 236, 255),
            new Tuple<byte,byte,byte,byte>(228, 84, 236, 255),
            new Tuple<byte,byte,byte,byte>(236, 88, 180, 255),
            new Tuple<byte,byte,byte,byte>(236, 106, 100, 255),
            new Tuple<byte,byte,byte,byte>(212, 136, 32, 255),
            new Tuple<byte,byte,byte,byte>(160, 170, 0, 255),
            new Tuple<byte,byte,byte,byte>(116, 196, 0, 255),
            new Tuple<byte,byte,byte,byte>(76, 208, 32, 255),
            new Tuple<byte,byte,byte,byte>(56, 204, 108, 255),
            new Tuple<byte,byte,byte,byte>(56, 180, 204, 255),
            new Tuple<byte,byte,byte,byte>(60, 60, 60, 255),
            new Tuple<byte,byte,byte,byte>(0, 0, 0, 255),
            new Tuple<byte,byte,byte,byte>(0, 0, 0, 255),
            new Tuple<byte,byte,byte,byte>(236, 238, 236, 255),
            new Tuple<byte,byte,byte,byte>(168, 204, 236, 255),
            new Tuple<byte,byte,byte,byte>(188, 188, 236, 255),
            new Tuple<byte,byte,byte,byte>(212, 178, 236, 255),
            new Tuple<byte,byte,byte,byte>(236, 174, 236, 255),
            new Tuple<byte,byte,byte,byte>(236, 174, 212, 255),
            new Tuple<byte,byte,byte,byte>(236, 180, 176, 255),
            new Tuple<byte,byte,byte,byte>(228, 196, 144, 255),
            new Tuple<byte,byte,byte,byte>(204, 210, 120, 255),
            new Tuple<byte,byte,byte,byte>(180, 222, 120, 255),
            new Tuple<byte,byte,byte,byte>(168, 226, 144, 255),
            new Tuple<byte,byte,byte,byte>(152, 226, 180, 255),
            new Tuple<byte,byte,byte,byte>(160, 214, 228, 255),
            new Tuple<byte,byte,byte,byte>(192, 192, 192, 255),
            new Tuple<byte,byte,byte,byte>(0, 0, 0, 255),
            new Tuple<byte,byte,byte,byte>(0, 0, 0, 255),
    };
}
