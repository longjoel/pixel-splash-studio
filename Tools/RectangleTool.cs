using System;

namespace PixelSplashStudio
{
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
        private bool _fillUsesSecondary;

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

        public bool FillUsesSecondary
        {
            get { return _fillUsesSecondary; }
            set
            {
                if (_fillUsesSecondary == value)
                {
                    return;
                }

                _fillUsesSecondary = value;
                PreviewChanged?.Invoke();
            }
        }

        public RectangleTool(PixelSplashCanvas canvas, PixelSplashPalette palette)
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

            if (_fill && TryGetFillColorIndex(out byte fillColorIndex, out byte fillAlpha) && ShouldDrawPixel(fillAlpha))
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

            if (_fill)
            {
                if (TryGetFillColorIndex(out byte colorIndex, out byte alpha))
                {
                    var color = _palette.Palette[colorIndex];
                    double a = (color.Item4 / 255.0) * 0.4;
                    context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, a);
                    viewport.WorldToScreen(minX, minY, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
                    double width = (maxX - minX + 1) * viewport.PixelSize;
                    double height = (maxY - minY + 1) * viewport.PixelSize;
                    context.Rectangle(screenX, screenY, width, height);
                    context.Fill();
                }
            }

            if (TryGetPrimaryColorIndex(out byte outlineColorIndex, out byte outlineAlpha))
            {
                var color = _palette.Palette[outlineColorIndex];
                double a = (color.Item4 / 255.0) * 0.4;
                context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, a);

                for (int x = minX; x <= maxX; x++)
                {
                    DrawPreviewPixel(context, viewport, x, minY);
                    DrawPreviewPixel(context, viewport, x, maxY);
                }

                for (int y = minY + 1; y <= maxY - 1; y++)
                {
                    DrawPreviewPixel(context, viewport, minX, y);
                    DrawPreviewPixel(context, viewport, maxX, y);
                }
            }
        }

        private void DrawPreviewPixel(Cairo.Context context, CanvasViewport viewport, int x, int y)
        {
            viewport.WorldToScreen(x, y, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
            context.Rectangle(screenX, screenY, viewport.PixelSize, viewport.PixelSize);
            context.Fill();
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

        private bool TryGetFillColorIndex(out byte colorIndex, out byte alpha)
        {
            if (FillUsesSecondary)
            {
                return TryGetSecondaryColorIndex(out colorIndex, out alpha);
            }

            return TryGetPrimaryColorIndex(out colorIndex, out alpha);
        }

        private bool ShouldDrawPixel(byte alpha)
        {
            return alpha != 0 || _overwriteTransparent;
        }
    }
}
