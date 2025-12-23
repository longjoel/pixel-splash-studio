using System;
using System.Collections.Generic;

public class PenTool : ITool
{
    private CanvasViewport _viewport;
    private PixelSplashCanvas _canvas;
    private PixelSplashPalette _palette;
    private List<(int,int)> _points = new List<(int, int)>();

    public event Action PreviewChanged;
    public IReadOnlyList<(int, int)> PreviewPoints => _points;

    public Tuple<byte, byte, byte, byte> PreviewColor
    {
        get
        {
            int index = _palette.PrimaryIndex;
            if (index < 0 || index >= _palette.Palette.Count)
            {
                return new Tuple<byte, byte, byte, byte>(0, 0, 0, 255);
            }

            return _palette.Palette[index];
        }
    }

    public PenTool(CanvasViewport viewport, PixelSplashCanvas canvas, PixelSplashPalette palette)
    {
        _viewport = viewport;
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
}
