using System;
using System.Collections.Generic;

public class FloodFillTool : ITool
{
    private readonly PixelSplashCanvas _canvas;
    private readonly PixelSplashPalette _palette;

    public event Action PreviewChanged;

    public FloodFillTool(PixelSplashCanvas canvas, PixelSplashPalette palette)
    {
        _canvas = canvas;
        _palette = palette;
    }

    public void BeginUseTool(bool primary, int x, int y)
    {
        if (_canvas == null || _palette == null)
        {
            return;
        }

        if (!_canvas.Selection.HasSelection || !_canvas.Selection.IsSelected(x, y))
        {
            return;
        }

        int primaryIndex = _palette.PrimaryIndex;
        int secondaryIndex = _palette.SecondaryIndex;
        if (primaryIndex < 0 || primaryIndex >= _palette.Palette.Count ||
            secondaryIndex < 0 || secondaryIndex >= _palette.Palette.Count)
        {
            return;
        }

        List<(int x, int y)> region = new List<(int x, int y)>();
        bool hasBounds = false;
        int minX = 0;
        int maxX = 0;
        int minY = 0;
        int maxY = 0;

        if (_canvas.Selection.TryGetBounds(out int selMinX, out int selMinY, out int selMaxX, out int selMaxY))
        {
            for (int py = selMinY; py <= selMaxY; py++)
            {
                for (int px = selMinX; px <= selMaxX; px++)
                {
                    if (!_canvas.Selection.IsSelected(px, py))
                    {
                        continue;
                    }

                    region.Add((px, py));
                    if (!hasBounds)
                    {
                        minX = px;
                        maxX = px;
                        minY = py;
                        maxY = py;
                        hasBounds = true;
                    }
                    else
                    {
                        if (px < minX) minX = px;
                        if (px > maxX) maxX = px;
                        if (py < minY) minY = py;
                        if (py > maxY) maxY = py;
                    }
                }
            }
        }

        if (region.Count == 0)
        {
            return;
        }

        if (primary)
        {
            byte fillIndex = (byte)primaryIndex;
            for (int i = 0; i < region.Count; i++)
            {
                _canvas.DrawPixel(region[i].x, region[i].y, fillIndex);
            }
        }
        else
        {
            Tuple<byte, byte, byte, byte> startColor = _palette.Palette[primaryIndex];
            Tuple<byte, byte, byte, byte> endColor = _palette.Palette[secondaryIndex];
            int width = Math.Max(1, maxX - minX);
            int height = Math.Max(1, maxY - minY);

            for (int i = 0; i < region.Count; i++)
            {
                (int px, int py) = region[i];
                double t = width > 0 ? (px - minX) / (double)width : (py - minY) / (double)height;
                byte fillIndex = FindNearestPaletteIndex(startColor, endColor, t);
                _canvas.DrawPixel(px, py, fillIndex);
            }
        }

        PreviewChanged?.Invoke();
    }

    public void EndUseTool(bool primary, int endX, int endY)
    {
    }

    public void UseTool(int x, int y)
    {
    }

    public void DrawPreview(Cairo.Context context, CanvasViewport viewport)
    {
        // No preview for this tool
    }

    private byte FindNearestPaletteIndex(Tuple<byte, byte, byte, byte> startColor, Tuple<byte, byte, byte, byte> endColor, double t)
    {
        double clamped = Math.Min(1.0, Math.Max(0.0, t));
        byte r = (byte)Math.Round(startColor.Item1 + ((endColor.Item1 - startColor.Item1) * clamped));
        byte g = (byte)Math.Round(startColor.Item2 + ((endColor.Item2 - startColor.Item2) * clamped));
        byte b = (byte)Math.Round(startColor.Item3 + ((endColor.Item3 - startColor.Item3) * clamped));
        byte a = (byte)Math.Round(startColor.Item4 + ((endColor.Item4 - startColor.Item4) * clamped));

        int bestIndex = 0;
        double bestDistance = double.MaxValue;
        for (int i = 0; i < _palette.Palette.Count; i++)
        {
            Tuple<byte, byte, byte, byte> color = _palette.Palette[i];
            double dr = color.Item1 - r;
            double dg = color.Item2 - g;
            double db = color.Item3 - b;
            double da = color.Item4 - a;
            double distance = (dr * dr) + (dg * dg) + (db * db) + (da * da);
            if (distance < bestDistance)
            {
                bestDistance = distance;
                bestIndex = i;
            }
        }

        return (byte)bestIndex;
    }
}
