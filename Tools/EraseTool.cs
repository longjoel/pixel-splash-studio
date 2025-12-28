using System;

namespace PixelSplashStudio
{
    public class EraseTool : ITool
    {
        private readonly PixelSplashCanvas _canvas;
        private int _lastX;
        private int _lastY;
        private bool _hasLast;
        private int _previewX;
        private int _previewY;
        private bool _hasPreview;

        public event Action PreviewChanged;

        public int Size { get; set; } = 4;
        public EraseBrushShape Shape { get; set; } = EraseBrushShape.Square;

        public EraseTool(PixelSplashCanvas canvas)
        {
            _canvas = canvas;
        }

        public void BeginUseTool(bool primary, int x, int y)
        {
            _hasLast = true;
            _lastX = x;
            _lastY = y;
            _previewX = x;
            _previewY = y;
            _hasPreview = true;
            ApplyBrush(x, y);
            PreviewChanged?.Invoke();
        }

        public void EndUseTool(bool primary, int x, int y)
        {
            if (_hasLast)
            {
                ApplyBrushAlongLine(_lastX, _lastY, x, y);
            }

            _hasLast = false;
            PreviewChanged?.Invoke();
        }

        public void UseTool(int x, int y)
        {
            if (!_hasLast)
            {
                _lastX = x;
                _lastY = y;
                _hasLast = true;
            }
            else
            {
                ApplyBrushAlongLine(_lastX, _lastY, x, y);
                _lastX = x;
                _lastY = y;
            }

            _previewX = x;
            _previewY = y;
            _hasPreview = true;
            PreviewChanged?.Invoke();
        }

        public void DrawPreview(Cairo.Context context, CanvasViewport viewport)
        {
            if (!_hasPreview || context == null || viewport == null)
            {
                return;
            }

            int size = Math.Max(1, Size);
            int half = size / 2;
            int startX = _previewX - half;
            int startY = _previewY - half;
            double radius = size / 2.0;
            double centerX = _previewX + 0.5;
            double centerY = _previewY + 0.5;

            context.SetSourceRGBA(1, 1, 1, 0.6);

            for (int y = 0; y < size; y++)
            {
                int worldY = startY + y;
                for (int x = 0; x < size; x++)
                {
                    int worldX = startX + x;
                    if (!IsInsideBrush(worldX, worldY, centerX, centerY, radius))
                    {
                        continue;
                    }

                    if (!IsOutlinePixel(worldX, worldY, centerX, centerY, radius))
                    {
                        continue;
                    }

                    viewport.WorldToScreen(worldX, worldY, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
                    context.Rectangle(screenX, screenY, viewport.PixelSize, viewport.PixelSize);
                    context.Fill();
                }
            }
        }

        public void UpdatePreview(int x, int y)
        {
            _previewX = x;
            _previewY = y;
            _hasPreview = true;
            PreviewChanged?.Invoke();
        }

        public void ClearPreview()
        {
            _hasPreview = false;
            PreviewChanged?.Invoke();
        }

        private bool IsInsideBrush(int worldX, int worldY, double centerX, double centerY, double radius)
        {
            if (Shape == EraseBrushShape.Square)
            {
                return true;
            }

            double dx = (worldX + 0.5) - centerX;
            double dy = (worldY + 0.5) - centerY;
            return (dx * dx + dy * dy) <= (radius * radius);
        }

        private bool IsOutlinePixel(int worldX, int worldY, double centerX, double centerY, double radius)
        {
            if (Shape == EraseBrushShape.Square)
            {
                return worldX == (int)Math.Floor(centerX - radius) ||
                       worldX == (int)Math.Floor(centerX + radius - 1) ||
                       worldY == (int)Math.Floor(centerY - radius) ||
                       worldY == (int)Math.Floor(centerY + radius - 1);
            }

            bool up = IsInsideBrush(worldX, worldY - 1, centerX, centerY, radius);
            bool down = IsInsideBrush(worldX, worldY + 1, centerX, centerY, radius);
            bool left = IsInsideBrush(worldX - 1, worldY, centerX, centerY, radius);
            bool right = IsInsideBrush(worldX + 1, worldY, centerX, centerY, radius);
            return !(up && down && left && right);
        }

        private void ApplyBrushAlongLine(int startX, int startY, int endX, int endY)
        {
            foreach ((int x, int y) in LineRasterizer.Rasterize(startX, startY, endX, endY))
            {
                ApplyBrush(x, y);
            }
        }

        private void ApplyBrush(int centerX, int centerY)
        {
            int size = Math.Max(1, Size);
            int half = size / 2;
            int startX = centerX - half;
            int startY = centerY - half;
            double radius = size / 2.0;
            double center = centerX + 0.5;
            double centerYPos = centerY + 0.5;

            for (int y = 0; y < size; y++)
            {
                int worldY = startY + y;
                for (int x = 0; x < size; x++)
                {
                    int worldX = startX + x;
                    if (Shape == EraseBrushShape.Round)
                    {
                        double dx = (worldX + 0.5) - center;
                        double dy = (worldY + 0.5) - centerYPos;
                        if ((dx * dx + dy * dy) > (radius * radius))
                        {
                            continue;
                        }
                    }

                    _canvas.DrawPixel(worldX, worldY, 0);
                }
            }
        }
    }
}
