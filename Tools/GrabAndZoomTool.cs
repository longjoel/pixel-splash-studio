namespace PixelSplashStudio
{
    public class GrabAndZoomTool : ITool
    {
        private CanvasViewport _viewport;
        private bool _isPanning;
        private bool _isZooming;
        private double _lastPanX;
        private double _lastPanY;
        private double _panRemainderX;
        private double _panRemainderY;
        private double _lastZoomX;
        private double _lastZoomY;
        private double _zoomAccumulator;
        private int _viewWidth;
        private int _viewHeight;
        private readonly double _zoomStepPixels;

        public event System.Action PreviewChanged;

        public GrabAndZoomTool(CanvasViewport viewport, double zoomStepPixels = 8.0)
        {
            _viewport = viewport;
            _zoomStepPixels = zoomStepPixels <= 0 ? 8.0 : zoomStepPixels;
        }

        public void BeginUseTool(bool primary, int x, int y)
        {
            if (_viewport == null)
            {
                return;
            }

            if (primary)
            {
                _isPanning = true;
                _isZooming = false;
                _lastPanX = x;
                _lastPanY = y;
                _panRemainderX = 0;
                _panRemainderY = 0;
            }
            else
            {
                _isZooming = true;
                _isPanning = false;
                _lastZoomX = x;
                _lastZoomY = y;
                _zoomAccumulator = 0;
            }
            PreviewChanged?.Invoke();
        }

        public void EndUseTool(bool primary, int x, int y)
        {
            _isPanning = false;
            _isZooming = false;
            PreviewChanged?.Invoke();
        }

        public void UseTool(int x, int y)
        {
            if (_viewport == null || _viewport.PixelSize <= 0)
            {
                return;
            }

            if (_isPanning)
            {
                double deltaX = x - _lastPanX;
                double deltaY = y - _lastPanY;
                _lastPanX = x;
                _lastPanY = y;

                _panRemainderX += deltaX / _viewport.PixelSize;
                _panRemainderY += deltaY / _viewport.PixelSize;
                int worldDeltaX = (int)System.Math.Truncate(_panRemainderX);
                int worldDeltaY = (int)System.Math.Truncate(_panRemainderY);
                _panRemainderX -= worldDeltaX;
                _panRemainderY -= worldDeltaY;

                if (worldDeltaX != 0 || worldDeltaY != 0)
                {
                    _viewport.Pan(-worldDeltaX, -worldDeltaY);
                    PreviewChanged?.Invoke();
                }
            }
            else if (_isZooming)
            {
                double deltaY = y - _lastZoomY;
                _lastZoomX = x;
                _lastZoomY = y;
                _zoomAccumulator += deltaY;

                int steps = (int)System.Math.Truncate(_zoomAccumulator / _zoomStepPixels);
                if (steps != 0)
                {
                    ZoomAt((int)_lastZoomX, (int)_lastZoomY, -steps, _viewWidth, _viewHeight);
                    _zoomAccumulator -= steps * _zoomStepPixels;
                    PreviewChanged?.Invoke();
                }
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

        public void SetViewSize(int viewWidth, int viewHeight)
        {
            _viewWidth = viewWidth;
            _viewHeight = viewHeight;
        }

        public void DrawPreview(Cairo.Context context, CanvasViewport viewport)
        {
            // No preview for this tool
        }
    }
}
