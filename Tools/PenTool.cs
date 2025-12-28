using System;
using System.Collections.Generic;

namespace PixelSplashStudio
{
    public class PenTool : ITool
    {
    private PixelSplashCanvas _canvas;
    private PixelSplashPalette _palette;
    private List<(int,int)> _points = new List<(int, int)>();

        public event Action PreviewChanged;

    public PenTool(PixelSplashCanvas canvas, PixelSplashPalette palette)
    {
        _canvas = canvas;
        _palette = palette;
    }

        public void BeginUseTool(bool primary, int x, int y)
        {
            _points = [(x, y)];
            _canvas.DrawPixel(x, y, (byte)_palette.PrimaryIndex);
            PreviewChanged?.Invoke();
        }

        public void EndUseTool(bool primary, int x, int y)
        {
            for (int i = 1; i < _points.Count; i++)
            {
                (int startX, int startY) = _points[i - 1];
                (int endX, int endY) = _points[i];
                foreach ((int px, int py) in LineRasterizer.Rasterize(startX, startY, endX, endY))
                {
                    _canvas.DrawPixel(px, py, (byte)_palette.PrimaryIndex);
                }
            }

            _points.Clear();
            PreviewChanged?.Invoke();
        }

        public void UseTool(int x, int y)
        {
            _points.Add((x, y));
            PreviewChanged?.Invoke();
        }

        public void DrawPreview(Cairo.Context context, CanvasViewport viewport)
        {
            if (_points.Count > 0)
            {
                int index = _palette.PrimaryIndex;
                if (index < 0 || index >= _palette.Palette.Count)
                {
                    return;
                }

                var color = _palette.Palette[index];
                double alpha = (color.Item4 / 255.0) * 0.4;
                context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, alpha);

                if (_points.Count == 1)
                {
                    viewport.WorldToScreen(_points[0].Item1, _points[0].Item2, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
                    context.Rectangle(screenX, screenY, viewport.PixelSize, viewport.PixelSize);
                    context.Fill();
                }
                else
                {
                    for (int i = 1; i < _points.Count; i++)
                    {
                        (int startX, int startY) = _points[i - 1];
                        (int endX, int endY) = _points[i];
                        foreach ((int px, int py) in LineRasterizer.Rasterize(startX, startY, endX, endY))
                        {
                            viewport.WorldToScreen(px, py, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
                            context.Rectangle(screenX, screenY, viewport.PixelSize, viewport.PixelSize);
                            context.Fill();
                        }
                    }
                }
            }
        }
    }
}
