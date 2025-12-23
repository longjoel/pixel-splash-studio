using System.Collections.Generic;

public class SelectionClipboard
{
    public int OriginX { get; }
    public int OriginY { get; }
    public List<ClipboardPixel> Pixels { get; } = new List<ClipboardPixel>();

    public SelectionClipboard(int originX, int originY)
    {
        OriginX = originX;
        OriginY = originY;
    }
}

public readonly struct ClipboardPixel
{
    public int X { get; }
    public int Y { get; }
    public byte ColorIndex { get; }

    public ClipboardPixel(int x, int y, byte colorIndex)
    {
        X = x;
        Y = y;
        ColorIndex = colorIndex;
    }
}
