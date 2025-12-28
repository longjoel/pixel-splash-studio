using System;
using Cairo;

namespace PixelSplashStudio
{
    public class ReferenceTransformTool : ITool
    {
        private const double HandleSizePixels = 8.0;
        private const double MinSizeWorld = 1.0;

        private readonly ReferenceLayer _references;
        private readonly CanvasViewport _viewport;
        private bool _dragging;
        private ReferenceHandle _activeHandle = ReferenceHandle.None;
        private double _startWorldX;
        private double _startWorldY;
        private double _startX;
        private double _startY;
        private double _startWidth;
        private double _startHeight;
        private int _viewWidth;
        private int _viewHeight;

        public event Action PreviewChanged;

        public ReferenceSnapMode SnapMode { get; set; } = ReferenceSnapMode.Free;
        public int TileSize { get; set; } = 1;

        public ReferenceTransformTool(CanvasViewport viewport, ReferenceLayer references)
        {
            _viewport = viewport;
            _references = references;
        }

        public void BeginUseTool(bool primary, int x, int y)
        {
            if (!primary || _references == null)
            {
                return;
            }

            GetWorldCoordinates(x, y, out double worldX, out double worldY);
            ReferenceObject selected = _references.Selected;
            ReferenceHandle handle = ReferenceHandle.None;
            if (selected != null)
            {
                handle = HitTestHandle(selected, worldX, worldY);
                if (handle == ReferenceHandle.None && selected.Contains(worldX, worldY))
                {
                    handle = ReferenceHandle.Move;
                }
            }

            if (handle != ReferenceHandle.None && selected != null)
            {
                StartDrag(selected, handle, worldX, worldY);
                return;
            }

            ReferenceObject hit = _references.HitTest(worldX, worldY);
            if (hit != null)
            {
                _references.Select(hit);
                StartDrag(hit, ReferenceHandle.Move, worldX, worldY);
                PreviewChanged?.Invoke();
                return;
            }

            if (_references.Selected != null)
            {
                _references.ClearSelection();
                PreviewChanged?.Invoke();
            }
        }

        public void EndUseTool(bool primary, int x, int y)
        {
            if (!_dragging)
            {
                return;
            }

            _dragging = false;
            _activeHandle = ReferenceHandle.None;
            PreviewChanged?.Invoke();
        }

        public void UseTool(int x, int y)
        {
            if (!_dragging || _references?.Selected == null)
            {
                return;
            }

            GetWorldCoordinates(x, y, out double worldX, out double worldY);
            double deltaX = worldX - _startWorldX;
            double deltaY = worldY - _startWorldY;
            ReferenceObject selected = _references.Selected;

            if (_activeHandle == ReferenceHandle.Move)
            {
                selected.X = SnapValue(_startX + deltaX);
                selected.Y = SnapValue(_startY + deltaY);
                PreviewChanged?.Invoke();
                return;
            }

            ApplyResize(selected, deltaX, deltaY, _activeHandle);
            PreviewChanged?.Invoke();
        }

        public void DrawPreview(Context context, CanvasViewport viewport)
        {
            if (context == null || viewport == null || _references?.Selected == null)
            {
                return;
            }

            ReferenceObject selected = _references.Selected;
            if (selected.Width <= 0 || selected.Height <= 0)
            {
                return;
            }

            Rectangle clip = context.ClipExtents();
            viewport.GetViewportBounds(clip.Width, clip.Height, out int startX, out int startY, out _, out _);

            double screenX = (selected.X - startX) * viewport.PixelSize;
            double screenY = (selected.Y - startY) * viewport.PixelSize;
            double screenWidth = selected.Width * viewport.PixelSize;
            double screenHeight = selected.Height * viewport.PixelSize;

            context.Save();
            context.LineWidth = 1.0;
            context.SetSourceRGBA(0, 0, 0, 0.85);
            context.Rectangle(screenX + 0.5, screenY + 0.5, screenWidth, screenHeight);
            context.Stroke();
            context.SetSourceRGBA(1, 1, 1, 0.9);
            context.Rectangle(screenX - 0.5, screenY - 0.5, screenWidth, screenHeight);
            context.Stroke();

            DrawHandles(context, screenX, screenY, screenWidth, screenHeight);
            context.Restore();
        }

        private void StartDrag(ReferenceObject selected, ReferenceHandle handle, double worldX, double worldY)
        {
            _dragging = true;
            _activeHandle = handle;
            _startWorldX = worldX;
            _startWorldY = worldY;
            _startX = selected.X;
            _startY = selected.Y;
            _startWidth = selected.Width;
            _startHeight = selected.Height;
        }

        private void ApplyResize(ReferenceObject selected, double deltaX, double deltaY, ReferenceHandle handle)
        {
            double newX = _startX;
            double newY = _startY;
            double newWidth = _startWidth;
            double newHeight = _startHeight;

            bool left = handle == ReferenceHandle.TopLeft || handle == ReferenceHandle.Left || handle == ReferenceHandle.BottomLeft;
            bool right = handle == ReferenceHandle.TopRight || handle == ReferenceHandle.Right || handle == ReferenceHandle.BottomRight;
            bool top = handle == ReferenceHandle.TopLeft || handle == ReferenceHandle.Top || handle == ReferenceHandle.TopRight;
            bool bottom = handle == ReferenceHandle.BottomLeft || handle == ReferenceHandle.Bottom || handle == ReferenceHandle.BottomRight;

            if (left)
            {
                newX = _startX + deltaX;
                newWidth = _startWidth - deltaX;
            }
            else if (right)
            {
                newWidth = _startWidth + deltaX;
            }

            if (top)
            {
                newY = _startY + deltaY;
                newHeight = _startHeight - deltaY;
            }
            else if (bottom)
            {
                newHeight = _startHeight + deltaY;
            }

            if (SnapMode != ReferenceSnapMode.Free)
            {
                if (left)
                {
                    newX = SnapValue(newX);
                }
                if (right)
                {
                    double rightEdge = SnapValue(_startX + _startWidth + deltaX);
                    newWidth = rightEdge - newX;
                }
                if (top)
                {
                    newY = SnapValue(newY);
                }
                if (bottom)
                {
                    double bottomEdge = SnapValue(_startY + _startHeight + deltaY);
                    newHeight = bottomEdge - newY;
                }
            }

            if (newWidth < MinSizeWorld)
            {
                newWidth = MinSizeWorld;
                if (left)
                {
                    newX = _startX + (_startWidth - MinSizeWorld);
                }
            }

            if (newHeight < MinSizeWorld)
            {
                newHeight = MinSizeWorld;
                if (top)
                {
                    newY = _startY + (_startHeight - MinSizeWorld);
                }
            }

            selected.X = newX;
            selected.Y = newY;
            selected.Width = newWidth;
            selected.Height = newHeight;
        }

        private void DrawHandles(Context context, double screenX, double screenY, double screenWidth, double screenHeight)
        {
            double half = HandleSizePixels / 2.0;
            double left = screenX;
            double right = screenX + screenWidth;
            double top = screenY;
            double bottom = screenY + screenHeight;
            double midX = screenX + (screenWidth / 2.0);
            double midY = screenY + (screenHeight / 2.0);

            DrawHandle(context, left, top, half);
            DrawHandle(context, midX, top, half);
            DrawHandle(context, right, top, half);
            DrawHandle(context, left, midY, half);
            DrawHandle(context, midX, midY, half);
            DrawHandle(context, right, midY, half);
            DrawHandle(context, left, bottom, half);
            DrawHandle(context, midX, bottom, half);
            DrawHandle(context, right, bottom, half);
        }

        private void DrawHandle(Context context, double centerX, double centerY, double half)
        {
            context.SetSourceRGBA(0, 0, 0, 0.85);
            context.Rectangle(centerX - half - 1, centerY - half - 1, (half * 2) + 2, (half * 2) + 2);
            context.Fill();
            context.SetSourceRGBA(1, 1, 1, 0.9);
            context.Rectangle(centerX - half, centerY - half, half * 2, half * 2);
            context.Fill();
        }

        private ReferenceHandle HitTestHandle(ReferenceObject selected, double worldX, double worldY)
        {
            double handleSize = GetHandleSizeWorld();
            double half = handleSize / 2.0;
            GetHandlePositions(selected,
                out double left, out double right, out double top, out double bottom,
                out double midX, out double midY);

            if (IsWithin(worldX, worldY, left, top, half)) return ReferenceHandle.TopLeft;
            if (IsWithin(worldX, worldY, midX, top, half)) return ReferenceHandle.Top;
            if (IsWithin(worldX, worldY, right, top, half)) return ReferenceHandle.TopRight;
            if (IsWithin(worldX, worldY, left, midY, half)) return ReferenceHandle.Left;
            if (IsWithin(worldX, worldY, midX, midY, half)) return ReferenceHandle.Move;
            if (IsWithin(worldX, worldY, right, midY, half)) return ReferenceHandle.Right;
            if (IsWithin(worldX, worldY, left, bottom, half)) return ReferenceHandle.BottomLeft;
            if (IsWithin(worldX, worldY, midX, bottom, half)) return ReferenceHandle.Bottom;
            if (IsWithin(worldX, worldY, right, bottom, half)) return ReferenceHandle.BottomRight;

            return ReferenceHandle.None;
        }

        private void GetHandlePositions(ReferenceObject selected,
            out double left, out double right, out double top, out double bottom,
            out double midX, out double midY)
        {
            left = selected.X;
            right = selected.X + selected.Width;
            top = selected.Y;
            bottom = selected.Y + selected.Height;
            if (right < left)
            {
                double temp = left;
                left = right;
                right = temp;
            }
            if (bottom < top)
            {
                double temp = top;
                top = bottom;
                bottom = temp;
            }
            midX = (left + right) / 2.0;
            midY = (top + bottom) / 2.0;
        }

        private double GetHandleSizeWorld()
        {
            if (_viewport == null || _viewport.PixelSize <= 0)
            {
                return MinSizeWorld;
            }

            return HandleSizePixels / _viewport.PixelSize;
        }

        public void SetViewSize(int viewWidth, int viewHeight)
        {
            _viewWidth = viewWidth;
            _viewHeight = viewHeight;
        }

        private void GetWorldCoordinates(int screenX, int screenY, out double worldX, out double worldY)
        {
            worldX = screenX;
            worldY = screenY;

            if (_viewport == null || _viewport.PixelSize <= 0 || _viewWidth <= 0 || _viewHeight <= 0)
            {
                return;
            }

            _viewport.GetViewportBounds(_viewWidth, _viewHeight, out int startX, out int startY, out _, out _);
            worldX = startX + (screenX / (double)_viewport.PixelSize);
            worldY = startY + (screenY / (double)_viewport.PixelSize);
        }

        private double SnapValue(double value)
        {
            switch (SnapMode)
            {
                case ReferenceSnapMode.Pixel:
                    return Math.Round(value);
                case ReferenceSnapMode.Tile:
                    int tile = Math.Max(1, TileSize);
                    return Math.Round(value / tile) * tile;
                default:
                    return value;
            }
        }

        private static bool IsWithin(double worldX, double worldY, double centerX, double centerY, double halfSize)
        {
            return worldX >= centerX - halfSize && worldX <= centerX + halfSize &&
                   worldY >= centerY - halfSize && worldY <= centerY + halfSize;
        }

        private enum ReferenceHandle
        {
            None,
            Move,
            TopLeft,
            Top,
            TopRight,
            Left,
            Right,
            BottomLeft,
            Bottom,
            BottomRight
        }
    }
}
