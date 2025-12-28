using System;
using System.Runtime.InteropServices;
using Gdk;

namespace PixelSplashStudio
{
    public sealed class SelectionExportService
    {
        private readonly PixelSplashCanvas _canvas;
        private readonly PixelSplashPalette _palette;

        public SelectionExportService(PixelSplashCanvas canvas, PixelSplashPalette palette)
        {
            _canvas = canvas ?? throw new ArgumentNullException(nameof(canvas));
            _palette = palette ?? throw new ArgumentNullException(nameof(palette));
        }

        public void SaveSelectionToPng(string path, int minX, int minY, int width, int height)
        {
            if (_palette.Palette == null || _palette.Palette.Count == 0)
            {
                return;
            }

            using (Pixbuf pixbuf = new Pixbuf(Colorspace.Rgb, true, 8, width, height))
            {
                int rowstride = pixbuf.Rowstride;
                int channels = pixbuf.NChannels;
                byte[] data = new byte[rowstride * height];

                for (int y = 0; y < height; y++)
                {
                    int worldY = minY + y;
                    int rowOffset = y * rowstride;
                    for (int x = 0; x < width; x++)
                    {
                        int worldX = minX + x;
                        if (!_canvas.Selection.IsSelected(worldX, worldY))
                        {
                            continue;
                        }

                        byte colorIndex = _canvas.GetPixel(worldX, worldY);
                        if (colorIndex >= _palette.Palette.Count)
                        {
                            continue;
                        }

                        var color = _palette.Palette[colorIndex];
                        int offset = rowOffset + (x * channels);
                        data[offset] = color.Item1;
                        data[offset + 1] = color.Item2;
                        data[offset + 2] = color.Item3;
                        data[offset + 3] = color.Item4;
                    }
                }

                Marshal.Copy(data, 0, pixbuf.Pixels, data.Length);
                pixbuf.Save(path, "png");
            }
        }
    }
}
