using System;

public class RectangleTool : ITool
{
    private readonly PixelSplashCanvas _canvas;
    private readonly PixelSplashPalette _palette;
    private bool _isDrawing;
    private int _startX;
    private int _startY;
    private int _currentX;
    private int _currentY;
    private bool _fill;
    private bool _overwriteTransparent;

    public event Action PreviewChanged;

    public bool Fill
    {
        get { return _fill; }
        set
        {
            if (_fill == value)
            {
                return;
            }

            _fill = value;
            PreviewChanged?.Invoke();
        }
    }

    public bool OverwriteTransparent
    {
        get { return _overwriteTransparent; }
        set
        {
            if (_overwriteTransparent == value)
            {
                return;
            }

            _overwriteTransparent = value;
            PreviewChanged?.Invoke();
        }
    }

    public bool HasPreview => _isDrawing;

    public Tuple<byte, byte, byte, byte> OutlinePreviewColor
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

    public Tuple<byte, byte, byte, byte> FillPreviewColor
    {
        get
        {
            int index = _palette.SecondaryIndex;
            if (index < 0 || index >= _palette.Palette.Count)
            {
                return new Tuple<byte, byte, byte, byte>(0, 0, 0, 255);
            }

            return _palette.Palette[index];
        }
    }

    public RectangleTool(PixelSplashCanvas canvas, PixelSplashPalette palette)
    {
        _canvas = canvas;
        _palette = palette;
    }

    public void BeginUseTool(int x, int y)
    {
        _isDrawing = true;
        _startX = x;
        _startY = y;
        _currentX = x;
        _currentY = y;
        PreviewChanged?.Invoke();
    }

    public void EndUseTool()
    {
        if (!_isDrawing)
        {
            return;
        }

        _isDrawing = false;

        int minX = Math.Min(_startX, _currentX);
        int maxX = Math.Max(_startX, _currentX);
        int minY = Math.Min(_startY, _currentY);
        int maxY = Math.Max(_startY, _currentY);

        if (_fill && TryGetSecondaryColorIndex(out byte fillColorIndex, out byte fillAlpha) && ShouldDrawPixel(fillAlpha))
        {
            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    _canvas.DrawPixel(x, y, fillColorIndex);
                }
            }
        }

        if (TryGetPrimaryColorIndex(out byte outlineColorIndex, out byte outlineAlpha) && ShouldDrawPixel(outlineAlpha))
        {
            for (int x = minX; x <= maxX; x++)
            {
                _canvas.DrawPixel(x, minY, outlineColorIndex);
                _canvas.DrawPixel(x, maxY, outlineColorIndex);
            }

            for (int y = minY + 1; y <= maxY - 1; y++)
            {
                _canvas.DrawPixel(minX, y, outlineColorIndex);
                _canvas.DrawPixel(maxX, y, outlineColorIndex);
            }
        }

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

    public void GetPreviewRect(out int startX, out int startY, out int endX, out int endY, out bool fill)
    {
        startX = _startX;
        startY = _startY;
        endX = _currentX;
        endY = _currentY;
        fill = _fill;
    }

    private bool TryGetPrimaryColorIndex(out byte colorIndex, out byte alpha)
    {
        alpha = 0;
        colorIndex = 0;

        int index = _palette.PrimaryIndex;
        if (index < 0 || index >= _palette.Palette.Count)
        {
            return false;
        }

        Tuple<byte, byte, byte, byte> color = _palette.Palette[index];
        colorIndex = (byte)index;
        alpha = color.Item4;
        return true;
    }

    private bool TryGetSecondaryColorIndex(out byte colorIndex, out byte alpha)
    {
        alpha = 0;
        colorIndex = 0;

        int index = _palette.SecondaryIndex;
        if (index < 0 || index >= _palette.Palette.Count)
        {
            return false;
        }

        Tuple<byte, byte, byte, byte> color = _palette.Palette[index];
        colorIndex = (byte)index;
        alpha = color.Item4;
        return true;
    }

    private bool ShouldDrawPixel(byte alpha)
    {
        return alpha != 0 || _overwriteTransparent;
    }
}
