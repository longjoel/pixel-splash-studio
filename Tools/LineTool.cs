using System;

public class LineTool : ITool
{
    private readonly PixelSplashCanvas _canvas;
    private readonly PixelSplashPalette _palette;
    private bool _isDrawing;
    private int _startX;
    private int _startY;
    private int _currentX;
    private int _currentY;

    public event System.Action PreviewChanged;

    public LineTool(PixelSplashCanvas canvas, PixelSplashPalette palette)
    {
        _canvas = canvas;
        _palette = palette;
    }

    public void BeginUseTool(bool primary, int x, int y)
    {
        _isDrawing = true;
        _startX = x;
        _startY = y;
        _currentX = x;
        _currentY = y;
        PreviewChanged?.Invoke();
    }

    public void EndUseTool(bool primary, int x, int y)
    {
        if (!_isDrawing)
        {
            return;
        }

        foreach ((int px, int py) in LineRasterizer.Rasterize(_startX, _startY, _currentX, _currentY))
        {
            _canvas.DrawPixel(px, py, (byte)_palette.PrimaryIndex);
        }
        _isDrawing = false;
        PreviewChanged?.Invoke();
    }

    public void UseTool(int x, int y)
    {
        if (!_isDrawing)
        {
            return;
        }

        _currentX = x;
        _currentY = y;
        PreviewChanged?.Invoke();
    }

    public void DrawPreview(Cairo.Context context, CanvasViewport viewport)
    {
        if (!_isDrawing)
        {
            return;
        }

        int index = _palette.PrimaryIndex;
        if (index < 0 || index >= _palette.Palette.Count)
        {
            return;
        }

        var color = _palette.Palette[index];
        double alpha = (color.Item4 / 255.0) * 0.4;
        context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, alpha);

        foreach ((int px, int py) in LineRasterizer.Rasterize(_startX, _startY, _currentX, _currentY))
        {
            viewport.WorldToScreen(px, py, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
            context.Rectangle(screenX, screenY, viewport.PixelSize, viewport.PixelSize);
            context.Fill();
        }
    }
}
