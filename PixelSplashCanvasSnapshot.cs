using System.Collections.Generic;

public class PixelSplashCanvasSnapshot
{
    public Dictionary<(int, int), byte[]> Chunks { get; } = new Dictionary<(int, int), byte[]>();
}
