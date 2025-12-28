using System;

namespace PixelSplashStudio
{
    public class SelectionRectangleTool : ITool
    {
        private readonly PixelSplashCanvas _canvas;
        private bool _isSelecting;
        private bool _isAdd;
        private int _startX;
        private int _startY;
        private int _currentX;
        private int _currentY;

        public event Action PreviewChanged;

        public SelectionMode Mode { get; set; } = SelectionMode.Add;
        public SelectionSnapMode SnapMode { get; set; } = SelectionSnapMode.Pixel;
        public int TileSize { get; set; } = 8;

        public SelectionRectangleTool(PixelSplashCanvas canvas)
        {
            _canvas = canvas;
        }

        public void BeginUseTool(bool primary, int x, int y)
        {
            if (_canvas == null)
            {
                return;
            }

            _isSelecting = true;
            _isAdd = Mode == SelectionMode.Add;
            _startX = x;
            _startY = y;
            _currentX = x;
            _currentY = y;
            PreviewChanged?.Invoke();
        }

        public void EndUseTool(bool primary, int endX, int endY)
        {
            if (!_isSelecting || _canvas == null)
            {
                return;
            }

            _isSelecting = false;

            GetSnappedRect(out int minX, out int minY, out int maxX, out int maxY);

            int width = maxX - minX + 1;
            int height = maxY - minY + 1;
            if (width <= 0 || height <= 0)
            {
                PreviewChanged?.Invoke();
                return;
            }

            if (_isAdd)
            {
                _canvas.Selection.AddRectangle(minX, minY, width, height);
            }
            else
            {
                _canvas.Selection.SubtractRectangle(minX, minY, width, height);
            }

            PreviewChanged?.Invoke();
        }

        public void UseTool(int x, int y)
        {
            if (!_isSelecting)
            {
                return;
            }

            _currentX = x;
            _currentY = y;
            PreviewChanged?.Invoke();
        }

        public void DrawPreview(Cairo.Context context, CanvasViewport viewport)
        {
            if (!_isSelecting)
            {
                return;
            }

            GetSnappedRect(out int minX, out int minY, out int maxX, out int maxY);

            viewport.WorldToScreen(minX, minY, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
            double width = (maxX - minX + 1) * viewport.PixelSize;
            double height = (maxY - minY + 1) * viewport.PixelSize;

            double dashOffset = CanvasViewport.GetMarchingAntsOffset();
            context.LineWidth = 1.0;

            context.SetSourceRGBA(0, 0, 0, 1);
            context.SetDash(new double[] { 4, 4 }, dashOffset);
            context.Rectangle(screenX + 0.5, screenY + 0.5, width, height);
            context.Stroke();

            context.SetSourceRGBA(1, 1, 1, 1);
            context.SetDash(new double[] { 4, 4 }, dashOffset + 4);
            context.Rectangle(screenX + 0.5, screenY + 0.5, width, height);
            context.Stroke();
        }

        private void GetSnappedRect(out int startX, out int startY, out int endX, out int endY)
        {
            int minX = Math.Min(_startX, _currentX);
            int maxX = Math.Max(_startX, _currentX);
            int minY = Math.Min(_startY, _currentY);
            int maxY = Math.Max(_startY, _currentY);

            if (SnapMode == SelectionSnapMode.Tile && TileSize > 1)
            {
                minX = FloorToTile(minX, TileSize);
                minY = FloorToTile(minY, TileSize);
                maxX = CeilToTile(maxX + 1, TileSize) - 1;
                maxY = CeilToTile(maxY + 1, TileSize) - 1;
            }

            startX = minX;
            startY = minY;
            endX = maxX;
            endY = maxY;
        }

        private static int FloorToTile(int value, int tileSize)
        {
            int mod = value % tileSize;
            if (mod < 0)
            {
                mod += tileSize;
            }

            return value - mod;
        }

        private static int CeilToTile(int value, int tileSize)
        {
            int mod = value % tileSize;
            if (mod < 0)
            {
                mod += tileSize;
            }

            if (mod == 0)
            {
                return value;
            }

            return value + (tileSize - mod);
        }
    }
}
