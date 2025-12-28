using System.Collections.Generic;

namespace PixelSplashStudio
{
    public class PixelSplashCanvasSnapshot
    {
        public Dictionary<(int, int), byte[]> Chunks { get; } = new Dictionary<(int, int), byte[]>();
    }
}
