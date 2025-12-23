public class GrabAndZoomTool : ITool
{
    private CanvasViewport _viewport;
    private bool _isPanning;
    private double _lastPanX;
    private double _lastPanY;

    public event System.Action PreviewChanged;

    public GrabAndZoomTool(CanvasViewport viewport)
    {
        _viewport = viewport;
    }

    public void BeginUseTool(bool primary, int x, int y)
    {
        if (_viewport == null)
        {
            return;
        }

        _isPanning = true;
        _lastPanX = x;
        _lastPanY = y;
        PreviewChanged?.Invoke();
    }

    public void EndUseTool(bool primary, int x, int y)
    {
        _isPanning = false;
        PreviewChanged?.Invoke();
    }

    public void UseTool(int x, int y)
    {
        if (_viewport == null || !_isPanning || _viewport.PixelSize <= 0)
        {
            return;
        }

        double deltaX = x - _lastPanX;
        double deltaY = y - _lastPanY;
        _lastPanX = x;
        _lastPanY = y;

        int worldDeltaX = (int)System.Math.Round(deltaX / _viewport.PixelSize);
        int worldDeltaY = (int)System.Math.Round(deltaY / _viewport.PixelSize);

        if (worldDeltaX != 0 || worldDeltaY != 0)
        {
            _viewport.Pan(-worldDeltaX, -worldDeltaY);
            PreviewChanged?.Invoke();
        }
    }

    public void ZoomAt(int screenX, int screenY, int deltaPixelSize, int viewWidth, int viewHeight)
    {
        if (_viewport == null || viewWidth <= 0 || viewHeight <= 0)
        {
            return;
        }

        int oldSize = _viewport.PixelSize;
        int nextSize = oldSize + deltaPixelSize;
        if (nextSize < 1)
        {
            nextSize = 1;
        }

        if (nextSize == oldSize)
        {
            return;
        }

        double worldX = _viewport.CameraPixelX - (viewWidth / (2.0 * oldSize)) + (screenX / (double)oldSize);
        double worldY = _viewport.CameraPixelY - (viewHeight / (2.0 * oldSize)) + (screenY / (double)oldSize);

        double newCameraX = worldX + (viewWidth / (2.0 * nextSize)) - (screenX / (double)nextSize);
        double newCameraY = worldY + (viewHeight / (2.0 * nextSize)) - (screenY / (double)nextSize);

        _viewport.SetPixelSize(nextSize);
        _viewport.SetCamera((int)System.Math.Round(newCameraX), (int)System.Math.Round(newCameraY));
    }
}
