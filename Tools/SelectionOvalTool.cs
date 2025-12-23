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

    public bool HasPreview => _isSelecting;

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
        _isAdd = primary;
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

    public void GetPreviewRect(out int startX, out int startY, out int endX, out int endY, out bool isAdd)
    {
        startX = _startX;
        startY = _startY;
        endX = _currentX;
        endY = _currentY;
        isAdd = _isAdd;
    }
}
