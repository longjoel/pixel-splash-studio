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

    public bool HasPreview => _isDrawing;

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

    public void GetPreviewLine(out int startX, out int startY, out int endX, out int endY)
    {
        startX = _startX;
        startY = _startY;
        endX = _currentX;
        endY = _currentY;
    }
}
