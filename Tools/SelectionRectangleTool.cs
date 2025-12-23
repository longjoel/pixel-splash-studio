using System;

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

    public bool HasPreview => _isSelecting;
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
        _startX = ApplySnap(x);
        _startY = ApplySnap(y);
        _currentX = ApplySnap(x);
        _currentY = ApplySnap(y);
        PreviewChanged?.Invoke();
    }

    public void EndUseTool(bool primary, int endX, int endY)
    {
        if (!_isSelecting || _canvas == null)
        {
            return;
        }

        _isSelecting = false;

        int minX = Math.Min(_startX, _currentX);
        int maxX = Math.Max(_startX, _currentX);
        int minY = Math.Min(_startY, _currentY);
        int maxY = Math.Max(_startY, _currentY);

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

        _currentX = ApplySnap(x);
        _currentY = ApplySnap(y);
        PreviewChanged?.Invoke();
    }

    public void GetPreviewRect(out int startX, out int startY, out int endX, out int endY, out bool isAdd)
    {
        startX = _startX;
        startY = _startY;
        endX = _currentX;
        endY = _currentY;
        isAdd = _isAdd;
    }

    private int ApplySnap(int value)
    {
        if (SnapMode == SelectionSnapMode.Tile && TileSize > 1)
        {
            return (int)Math.Round(value / (double)TileSize, MidpointRounding.AwayFromZero) * TileSize;
        }

        return value;
    }
}
