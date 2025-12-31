using System.Collections;
using System.Collections.Generic;

namespace PixelSplashStudio
{
    public class SelectionClipboard
    {
        public int OriginX { get; }
        public int OriginY { get; }
        public int Width { get; }
        public int Height { get; }
        public int PixelCount { get; }

        private readonly int _boundsWidth;
        private readonly int _boundsHeight;
        private readonly byte[] _pixelData;
        private readonly BitArray _mask;

        public SelectionClipboard(int originX, int originY, int boundsWidth, int boundsHeight, int width, int height, byte[] pixelData, BitArray mask, int pixelCount)
        {
            OriginX = originX;
            OriginY = originY;
            _boundsWidth = boundsWidth;
            _boundsHeight = boundsHeight;
            Width = width;
            Height = height;
            _pixelData = pixelData;
            _mask = mask;
            PixelCount = pixelCount;
        }

        public IEnumerable<ClipboardPixel> EnumeratePixels()
        {
            if (_mask == null || _pixelData == null || _boundsWidth <= 0 || _boundsHeight <= 0)
            {
                yield break;
            }

            int index = 0;
            for (int y = 0; y < _boundsHeight; y++)
            {
                for (int x = 0; x < _boundsWidth; x++, index++)
                {
                    if (!_mask[index])
                    {
                        continue;
                    }

                    yield return new ClipboardPixel(x, y, _pixelData[index]);
                }
            }
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
}
