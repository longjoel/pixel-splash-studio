using System;

namespace PixelSplashStudio
{
    public class StampTool : ITool
    {
        private readonly PixelSplashCanvas _canvas;
        private readonly PixelSplashPalette _palette;
        private readonly Func<SelectionClipboard> _clipboardProvider;
        private bool _isStamping;
        private int _lastX;
        private int _lastY;
        private int _previewX;
        private int _previewY;
        private bool _hasPreview;
        private bool _snapToTile;
        private bool _overwriteDestination = true;
        private StampRotation _rotation = StampRotation.Deg0;
        private bool _flipX;
        private bool _flipY;
        private int _scale = 1;
        private SelectionSnapMode _snapMode = SelectionSnapMode.Pixel;

        public event Action PreviewChanged;

        public bool OverwriteDestination
        {
            get { return _overwriteDestination; }
            set
            {
                if (_overwriteDestination == value)
                {
                    return;
                }

                _overwriteDestination = value;
                PreviewChanged?.Invoke();
            }
        }

        public StampRotation Rotation
        {
            get { return _rotation; }
            set
            {
                if (_rotation == value)
                {
                    return;
                }

                _rotation = value;
                PreviewChanged?.Invoke();
            }
        }

        public bool FlipX
        {
            get { return _flipX; }
            set
            {
                if (_flipX == value)
                {
                    return;
                }

                _flipX = value;
                PreviewChanged?.Invoke();
            }
        }

        public bool FlipY
        {
            get { return _flipY; }
            set
            {
                if (_flipY == value)
                {
                    return;
                }

                _flipY = value;
                PreviewChanged?.Invoke();
            }
        }

        public int Scale
        {
            get { return _scale; }
            set
            {
                int next = value < 1 ? 1 : value;
                if (next == _scale)
                {
                    return;
                }

                _scale = next;
                PreviewChanged?.Invoke();
            }
        }

        public SelectionSnapMode SnapMode
        {
            get { return _snapMode; }
            set
            {
                if (_snapMode == value)
                {
                    return;
                }

                _snapMode = value;
                PreviewChanged?.Invoke();
            }
        }

        public bool CanStamp
        {
            get
            {
                SelectionClipboard clipboard = _clipboardProvider?.Invoke();
                return clipboard != null && clipboard.Pixels.Count > 0;
            }
        }

        public StampTool(PixelSplashCanvas canvas, PixelSplashPalette palette, Func<SelectionClipboard> clipboardProvider)
        {
            _canvas = canvas;
            _palette = palette;
            _clipboardProvider = clipboardProvider;
        }

        public void BeginUseTool(bool primary, int x, int y)
        {
            if (!CanStamp || _canvas == null)
            {
                _hasPreview = false;
                PreviewChanged?.Invoke();
                return;
            }

            _snapToTile = !primary;
            int targetX = GetTargetX(x);
            int targetY = GetTargetY(y);
            _isStamping = true;
            _lastX = targetX;
            _lastY = targetY;
            _previewX = targetX;
            _previewY = targetY;
            _hasPreview = true;
            PlaceStamp(targetX, targetY);
            PreviewChanged?.Invoke();
        }

        public void EndUseTool(bool primary, int x, int y)
        {
            if (!_isStamping)
            {
                return;
            }

            _isStamping = false;
            PreviewChanged?.Invoke();
        }

        public void UseTool(int x, int y)
        {
            if (!CanStamp || _canvas == null)
            {
                if (_hasPreview)
                {
                    _hasPreview = false;
                    PreviewChanged?.Invoke();
                }

                return;
            }

            int targetX = GetTargetX(x);
            int targetY = GetTargetY(y);
            _previewX = targetX;
            _previewY = targetY;
            _hasPreview = true;

            if (!_isStamping)
            {
                PreviewChanged?.Invoke();
                return;
            }

            StampAlongLine(_lastX, _lastY, targetX, targetY);
            _lastX = targetX;
            _lastY = targetY;
            PreviewChanged?.Invoke();
        }

        public void DrawPreview(Cairo.Context context, CanvasViewport viewport)
        {
            if (!_hasPreview || viewport?.Palette == null)
            {
                return;
            }

            if (!TryGetTransformedPixels(_previewX, _previewY, out System.Collections.Generic.List<(int x, int y, byte colorIndex)> pixels))
            {
                return;
            }

            var previewPixels = new System.Collections.Generic.HashSet<(int, int)>();
            for (int i = 0; i < pixels.Count; i++)
            {
                (int worldX, int worldY, byte colorIndex) = pixels[i];
                if (viewport.Selection?.HasSelection == true && !viewport.Selection.IsSelected(worldX, worldY))
                {
                    continue;
                }
                int paletteIndex = colorIndex;
                if (paletteIndex < 0 || paletteIndex >= viewport.Palette.Palette.Count)
                {
                    continue;
                }

                Tuple<byte, byte, byte, byte> color = viewport.Palette.Palette[paletteIndex];
                double alpha = (color.Item4 / 255.0) * 0.4;
                context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, alpha);
                DrawPreviewPixel(context, viewport, worldX, worldY);
                previewPixels.Add((worldX, worldY));
            }

            if (previewPixels.Count == 0)
            {
                return;
            }

            double dashOffset = CanvasViewport.GetMarchingAntsOffset();
            context.LineWidth = 1.0;

            context.SetSourceRGBA(0, 0, 0, 1);
            context.SetDash(new double[] { 4, 4 }, dashOffset);
            DrawStampOutline(context, viewport, previewPixels);
            context.Stroke();

            context.SetSourceRGBA(1, 1, 1, 1);
            context.SetDash(new double[] { 4, 4 }, dashOffset + 4);
            DrawStampOutline(context, viewport, previewPixels);
            context.Stroke();
        }

        private void DrawPreviewPixel(Cairo.Context context, CanvasViewport viewport, int x, int y)
        {
            viewport.WorldToScreen(x, y, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
            context.Rectangle(screenX, screenY, viewport.PixelSize, viewport.PixelSize);
            context.Fill();
        }

        private void DrawStampOutline(Cairo.Context context, CanvasViewport viewport, System.Collections.Generic.HashSet<(int, int)> pixels)
        {
            foreach ((int x, int y) in pixels)
            {
                bool top = !pixels.Contains((x, y - 1));
                bool right = !pixels.Contains((x + 1, y));
                bool bottom = !pixels.Contains((x, y + 1));
                bool left = !pixels.Contains((x - 1, y));

                if (!(top || right || bottom || left))
                {
                    continue;
                }

                viewport.WorldToScreen(x, y, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
                double x0 = screenX + 0.5;
                double y0 = screenY + 0.5;
                double x1 = screenX + viewport.PixelSize + 0.5;
                double y1 = screenY + viewport.PixelSize + 0.5;

                if (top)
                {
                    context.MoveTo(x0, y0);
                    context.LineTo(x1, y0);
                }
                if (right)
                {
                    context.MoveTo(x1, y0);
                    context.LineTo(x1, y1);
                }
                if (bottom)
                {
                    context.MoveTo(x0, y1);
                    context.LineTo(x1, y1);
                }
                if (left)
                {
                    context.MoveTo(x0, y0);
                    context.LineTo(x0, y1);
                }
            }
        }

        public bool CanWriteTo(int x, int y)
        {
            if (OverwriteDestination || _canvas == null || _palette == null)
            {
                return true;
            }

            byte colorIndex = _canvas.GetPixel(x, y);
            if (colorIndex >= _palette.Palette.Count)
            {
                return true;
            }

            Tuple<byte, byte, byte, byte> color = _palette.Palette[colorIndex];
            return color.Item4 == 0;
        }

        private void PlaceStamp(int originX, int originY)
        {
            if (!TryGetTransformedPixels(originX, originY, out System.Collections.Generic.List<(int x, int y, byte colorIndex)> pixels))
            {
                return;
            }

            for (int i = 0; i < pixels.Count; i++)
            {
                (int worldX, int worldY, byte colorIndex) = pixels[i];
                if (!CanWriteTo(worldX, worldY))
                {
                    continue;
                }

                _canvas.DrawPixel(worldX, worldY, colorIndex);
            }
        }

        private bool TryGetTransformedPixels(int originX, int originY, out System.Collections.Generic.List<(int x, int y, byte colorIndex)> pixels)
        {
            pixels = null;
            SelectionClipboard clipboard = _clipboardProvider?.Invoke();
            if (clipboard == null || clipboard.Pixels.Count == 0)
            {
                return false;
            }

            if (!TryGetClipboardSize(clipboard, out int width, out int height))
            {
                return false;
            }

            pixels = new System.Collections.Generic.List<(int x, int y, byte colorIndex)>(clipboard.Pixels.Count);
            for (int i = 0; i < clipboard.Pixels.Count; i++)
            {
                ClipboardPixel pixel = clipboard.Pixels[i];
                TransformPixel(pixel.X, pixel.Y, width, height, out int tx, out int ty);
                int scaledX = tx * _scale;
                int scaledY = ty * _scale;
                for (int sy = 0; sy < _scale; sy++)
                {
                    for (int sx = 0; sx < _scale; sx++)
                    {
                        pixels.Add((originX + scaledX + sx, originY + scaledY + sy, pixel.ColorIndex));
                    }
                }
            }

            return true;
        }

        private bool TryGetClipboardSize(SelectionClipboard clipboard, out int width, out int height)
        {
            width = 0;
            height = 0;
            if (clipboard == null || clipboard.Pixels.Count == 0)
            {
                return false;
            }

            int maxX = 0;
            int maxY = 0;
            for (int i = 0; i < clipboard.Pixels.Count; i++)
            {
                ClipboardPixel pixel = clipboard.Pixels[i];
                if (pixel.X > maxX) maxX = pixel.X;
                if (pixel.Y > maxY) maxY = pixel.Y;
            }

            width = maxX + 1;
            height = maxY + 1;
            return width > 0 && height > 0;
        }

        private void TransformPixel(int x, int y, int width, int height, out int tx, out int ty)
        {
            int localX = _flipX ? (width - 1 - x) : x;
            int localY = _flipY ? (height - 1 - y) : y;

            switch (_rotation)
            {
                case StampRotation.Deg90:
                    tx = (height - 1) - localY;
                    ty = localX;
                    break;
                case StampRotation.Deg180:
                    tx = (width - 1) - localX;
                    ty = (height - 1) - localY;
                    break;
                case StampRotation.Deg270:
                    tx = localY;
                    ty = (width - 1) - localX;
                    break;
                default:
                    tx = localX;
                    ty = localY;
                    break;
            }
        }

        private void StampAlongLine(int startX, int startY, int endX, int endY)
        {
            int dx = endX - startX;
            int dy = endY - startY;
            int steps = Math.Max(Math.Abs(dx), Math.Abs(dy));
            if (steps == 0)
            {
                PlaceStamp(startX, startY);
                return;
            }

            for (int i = 0; i <= steps; i++)
            {
                int x = startX + (dx * i) / steps;
                int y = startY + (dy * i) / steps;
                PlaceStamp(x, y);
            }
        }

        private int GetTargetX(int x)
        {
            if (_snapToTile || _snapMode == SelectionSnapMode.Tile)
            {
                return SnapToTile(x, PixelSplashCanvasChunk.ChunkWidth);
            }

            return x;
        }

        private int GetTargetY(int y)
        {
            if (_snapToTile || _snapMode == SelectionSnapMode.Tile)
            {
                return SnapToTile(y, PixelSplashCanvasChunk.ChunkHeight);
            }

            return y;
        }

        private static int SnapToTile(int value, int tileSize)
        {
            if (tileSize <= 0)
            {
                return value;
            }

            double snapped = Math.Round(value / (double)tileSize, MidpointRounding.AwayFromZero) * tileSize;
            return (int)snapped;
        }
    }
}
