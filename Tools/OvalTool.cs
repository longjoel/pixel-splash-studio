using System;

public class OvalTool : ITool
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

    public OvalTool(PixelSplashCanvas canvas, PixelSplashPalette palette)
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

    public void EndUseTool(bool primary, int endX, int endY)
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

        GetEllipseMetrics(minX, maxX, minY, maxY, out double centerX, out double centerY, out double rx, out double ry);

        if (_fill && TryGetSecondaryColorIndex(out byte fillColorIndex, out byte fillAlpha) && ShouldDrawPixel(fillAlpha))
        {
            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    if (IsInsideEllipse(x, y, centerX, centerY, rx, ry))
                    {
                        _canvas.DrawPixel(x, y, fillColorIndex);
                    }
                }
            }
        }

        if (TryGetPrimaryColorIndex(out byte outlineColorIndex, out byte outlineAlpha) && ShouldDrawPixel(outlineAlpha))
        {
            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    if (!IsInsideEllipse(x, y, centerX, centerY, rx, ry))
                    {
                        continue;
                    }

                    if (!IsInsideEllipse(x + 1, y, centerX, centerY, rx, ry) ||
                        !IsInsideEllipse(x - 1, y, centerX, centerY, rx, ry) ||
                        !IsInsideEllipse(x, y + 1, centerX, centerY, rx, ry) ||
                        !IsInsideEllipse(x, y - 1, centerX, centerY, rx, ry))
                    {
                        _canvas.DrawPixel(x, y, outlineColorIndex);
                    }
                }
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

    public void DrawPreview(Cairo.Context context, CanvasViewport viewport)
    {
        if (!_isDrawing)
        {
            return;
        }

        int minX = Math.Min(_startX, _currentX);
        int maxX = Math.Max(_startX, _currentX);
        int minY = Math.Min(_startY, _currentY);
        int maxY = Math.Max(_startY, _currentY);

        GetEllipseMetrics(minX, maxX, minY, maxY, out double centerX, out double centerY, out double rx, out double ry);

        if (_fill)
        {
            if (TryGetSecondaryColorIndex(out byte colorIndex, out byte alpha))
            {
                var color = _palette.Palette[colorIndex];
                double a = (color.Item4 / 255.0) * 0.4;
                context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, a);

                for (int y = minY; y <= maxY; y++)
                {
                    for (int x = minX; x <= maxX; x++)
                    {
                        if (IsInsideEllipse(x, y, centerX, centerY, rx, ry))
                        {
                            viewport.WorldToScreen(x, y, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
                            context.Rectangle(screenX, screenY, viewport.PixelSize, viewport.PixelSize);
                            context.Fill();
                        }
                    }
                }
            }
        }

        if (TryGetPrimaryColorIndex(out byte outlineColorIndex, out byte outlineAlpha))
        {
            var color = _palette.Palette[outlineColorIndex];
            double a = (color.Item4 / 255.0) * 0.4;
            context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, a);

            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    if (!IsInsideEllipse(x, y, centerX, centerY, rx, ry))
                    {
                        continue;
                    }

                    if (!IsInsideEllipse(x + 1, y, centerX, centerY, rx, ry) ||
                        !IsInsideEllipse(x - 1, y, centerX, centerY, rx, ry) ||
                        !IsInsideEllipse(x, y + 1, centerX, centerY, rx, ry) ||
                        !IsInsideEllipse(x, y - 1, centerX, centerY, rx, ry))
                    {
                        viewport.WorldToScreen(x, y, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
                        context.Rectangle(screenX, screenY, viewport.PixelSize, viewport.PixelSize);
                        context.Fill();
                    }
                }
            }
        }
    }

    private static void GetEllipseMetrics(int minX, int maxX, int minY, int maxY, out double centerX, out double centerY, out double rx, out double ry)
    {
        double width = maxX - minX + 1;
        double height = maxY - minY + 1;
        rx = width / 2.0;
        ry = height / 2.0;
        centerX = minX + rx;
        centerY = minY + ry;
    }

    private static bool IsInsideEllipse(int x, int y, double centerX, double centerY, double rx, double ry)
    {
        double dx = (x + 0.5) - centerX;
        double dy = (y + 0.5) - centerY;
        double nx = (dx * dx) / (rx * rx);
        double ny = (dy * dy) / (ry * ry);
        return (nx + ny) <= 1.0;
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
