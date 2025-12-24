using System;

public class SelectionOvalTool : ITool
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

    public SelectionOvalTool(PixelSplashCanvas canvas)
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
            _canvas.Selection.AddEllipse(minX, minY, width, height);
        }
        else
        {
            _canvas.Selection.SubtractEllipse(minX, minY, width, height);
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

        GetEllipseMetrics(minX, maxX, minY, maxY, out double centerX, out double centerY, out double rx, out double ry);

        double alpha = _isAdd ? 0.4 : 0.45;
        if (_isAdd)
        {
            context.SetSourceRGBA(0.9, 0.9, 0.9, alpha);
        }
        else
        {
            context.SetSourceRGBA(0.9, 0.6, 0.6, alpha);
        }

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
}
