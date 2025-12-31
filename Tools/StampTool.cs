using System;

namespace PixelSplashStudio
{
    public class StampTool : ITool
    {
        private readonly PixelSplashCanvas _canvas;
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
        private const int MaxPreviewOutlinePixels = 50000;
        private SelectionClipboard _cachedClipboard;
        private StampRotation _cachedRotation;
        private bool _cachedFlipX;
        private bool _cachedFlipY;
        private int _cachedWidth;
        private int _cachedHeight;
        private int _cachedPixelWidth;
        private int _cachedPixelHeight;
        private System.Collections.Generic.List<CachedPixel> _cachedPixels;
        private Cairo.ImageSurface _cachedPreviewSurface;
        private int _cachedPaletteHash;
        private int _cachedPaletteCount;

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
                return clipboard != null && clipboard.PixelCount > 0;
            }
        }

        public StampTool(PixelSplashCanvas canvas, Func<SelectionClipboard> clipboardProvider)
        {
            _canvas = canvas;
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
            try
            {
                if (!_hasPreview || viewport?.Palette == null)
                {
                    return;
                }

                SelectionClipboard clipboard = _clipboardProvider?.Invoke();
                if (clipboard == null || clipboard.PixelCount == 0)
                {
                    return;
                }

                System.Collections.Generic.List<CachedPixel> cachedPixels = GetCachedPixels(clipboard);
                if (cachedPixels == null || cachedPixels.Count == 0)
                {
                    return;
                }

                long previewPixelCount = (long)clipboard.PixelCount * _scale * _scale;
                bool collectOutline = previewPixelCount <= MaxPreviewOutlinePixels;
                System.Collections.Generic.HashSet<(int, int)> previewPixels = collectOutline
                    ? new System.Collections.Generic.HashSet<(int, int)>()
                    : null;

                bool hasSelectionMask = viewport.Selection?.HasSelection == true;
                if (!hasSelectionMask)
                {
                    Cairo.ImageSurface previewSurface = GetCachedPreviewSurface(viewport.Palette, cachedPixels);
                    if (previewSurface != null)
                    {
                        viewport.WorldToScreen(_previewX, _previewY, context.ClipExtents().Width, context.ClipExtents().Height, out double screenX, out double screenY);
                        context.Save();
                        context.Translate(screenX, screenY);
                        double scale = viewport.PixelSize * _scale;
                        context.Scale(scale, scale);
                        using (Cairo.SurfacePattern pattern = new Cairo.SurfacePattern(previewSurface))
                        {
                            pattern.Filter = Cairo.Filter.Nearest;
                            context.SetSource(pattern);
                            context.Paint();
                        }
                        context.Restore();
                    }

                    if (!collectOutline)
                    {
                        return;
                    }
                }

                for (int i = 0; i < cachedPixels.Count; i++)
                {
                    CachedPixel pixel = cachedPixels[i];
                    int paletteIndex = pixel.ColorIndex;
                    if (paletteIndex < 0 || paletteIndex >= viewport.Palette.Palette.Count)
                    {
                        continue;
                    }

                    bool isTransparentIndex = paletteIndex == 0;
                    if (!OverwriteDestination && isTransparentIndex)
                    {
                        continue;
                    }

                    Tuple<byte, byte, byte, byte> color = viewport.Palette.Palette[paletteIndex];
                    if (hasSelectionMask && !isTransparentIndex)
                    {
                        double alpha = (color.Item4 / 255.0) * 0.4;
                        context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, alpha);
                    }

                    int scaledX = pixel.X * _scale;
                    int scaledY = pixel.Y * _scale;
                    for (int sy = 0; sy < _scale; sy++)
                    {
                        int worldY = _previewY + scaledY + sy;
                        for (int sx = 0; sx < _scale; sx++)
                        {
                            int worldX = _previewX + scaledX + sx;
                            if (hasSelectionMask && !viewport.Selection.IsSelected(worldX, worldY))
                            {
                                continue;
                            }

                            if (hasSelectionMask && !isTransparentIndex)
                            {
                                DrawPreviewPixel(context, viewport, worldX, worldY);
                            }
                            if (collectOutline)
                            {
                                previewPixels.Add((worldX, worldY));
                            }
                        }
                    }
                }

                if (!collectOutline || previewPixels.Count == 0)
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
            catch (Exception ex)
            {
                LogPreviewException(ex, viewport);
                throw;
            }
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

        private bool ShouldWriteSourcePixel(byte colorIndex)
        {
            return OverwriteDestination || colorIndex != 0;
        }

        private void PlaceStamp(int originX, int originY)
        {
            SelectionClipboard clipboard = _clipboardProvider?.Invoke();
            if (clipboard == null || clipboard.PixelCount == 0)
            {
                return;
            }

            System.Collections.Generic.List<CachedPixel> cachedPixels = GetCachedPixels(clipboard);
            if (cachedPixels == null || cachedPixels.Count == 0)
            {
                return;
            }

            for (int i = 0; i < cachedPixels.Count; i++)
            {
                CachedPixel pixel = cachedPixels[i];
                if (!ShouldWriteSourcePixel(pixel.ColorIndex))
                {
                    continue;
                }

                int scaledX = pixel.X * _scale;
                int scaledY = pixel.Y * _scale;
                for (int sy = 0; sy < _scale; sy++)
                {
                    int worldY = originY + scaledY + sy;
                    for (int sx = 0; sx < _scale; sx++)
                    {
                        int worldX = originX + scaledX + sx;
                        _canvas.DrawPixel(worldX, worldY, pixel.ColorIndex);
                    }
                }
            }
        }

        private System.Collections.Generic.List<CachedPixel> GetCachedPixels(SelectionClipboard clipboard)
        {
            if (clipboard == null || clipboard.PixelCount == 0 || clipboard.Width <= 0 || clipboard.Height <= 0)
            {
                ClearCache();
                return null;
            }

            if (_cachedClipboard == clipboard &&
                _cachedRotation == _rotation &&
                _cachedFlipX == _flipX &&
                _cachedFlipY == _flipY &&
                _cachedWidth == clipboard.Width &&
                _cachedHeight == clipboard.Height &&
                _cachedPixels != null)
            {
                return _cachedPixels;
            }

            _cachedClipboard = clipboard;
            _cachedRotation = _rotation;
            _cachedFlipX = _flipX;
            _cachedFlipY = _flipY;
            _cachedWidth = clipboard.Width;
            _cachedHeight = clipboard.Height;
            _cachedPixelWidth = (_cachedRotation == StampRotation.Deg90 || _cachedRotation == StampRotation.Deg270) ? _cachedHeight : _cachedWidth;
            _cachedPixelHeight = (_cachedRotation == StampRotation.Deg90 || _cachedRotation == StampRotation.Deg270) ? _cachedWidth : _cachedHeight;
            _cachedPixels = new System.Collections.Generic.List<CachedPixel>(clipboard.PixelCount);
            ClearPreviewSurface();

            foreach (ClipboardPixel pixel in clipboard.EnumeratePixels())
            {
                TransformPixel(pixel.X, pixel.Y, _cachedWidth, _cachedHeight, out int tx, out int ty);
                _cachedPixels.Add(new CachedPixel(tx, ty, pixel.ColorIndex));
            }

            return _cachedPixels;
        }

        private void ClearCache()
        {
            _cachedClipboard = null;
            _cachedPixels = null;
            _cachedWidth = 0;
            _cachedHeight = 0;
            _cachedPixelWidth = 0;
            _cachedPixelHeight = 0;
            ClearPreviewSurface();
        }

        private void ClearPreviewSurface()
        {
            if (_cachedPreviewSurface != null)
            {
                _cachedPreviewSurface.Dispose();
                _cachedPreviewSurface = null;
            }

            _cachedPaletteHash = 0;
            _cachedPaletteCount = 0;
        }

        private Cairo.ImageSurface GetCachedPreviewSurface(PixelSplashPalette palette, System.Collections.Generic.List<CachedPixel> cachedPixels)
        {
            if (palette?.Palette == null || cachedPixels == null || cachedPixels.Count == 0)
            {
                return null;
            }

            if (_cachedPixelWidth <= 0 || _cachedPixelHeight <= 0)
            {
                return null;
            }

            int paletteCount = palette.Palette.Count;
            if (paletteCount == 0)
            {
                return null;
            }

            int paletteHash = GetPaletteHash(palette.Palette);
            if (_cachedPreviewSurface != null &&
        
                _cachedPaletteHash == paletteHash &&
                _cachedPaletteCount == paletteCount &&
                _cachedPreviewSurface.Width == _cachedPixelWidth &&
                _cachedPreviewSurface.Height == _cachedPixelHeight)
            {
                return _cachedPreviewSurface;
            }

            ClearPreviewSurface();
            _cachedPreviewSurface = new Cairo.ImageSurface(Cairo.Format.Argb32, _cachedPixelWidth, _cachedPixelHeight);
            _cachedPaletteHash = paletteHash;
            _cachedPaletteCount = paletteCount;

            byte[] data = _cachedPreviewSurface.Data;
            System.Array.Clear(data, 0, data.Length);
            int stride = _cachedPreviewSurface.Stride;

            for (int i = 0; i < cachedPixels.Count; i++)
            {
                CachedPixel pixel = cachedPixels[i];
                int paletteIndex = pixel.ColorIndex;
                if (paletteIndex <= 0 || paletteIndex >= paletteCount)
                {
                    continue;
                }

                Tuple<byte, byte, byte, byte> color = palette.Palette[paletteIndex];
                byte alpha = (byte)(color.Item4 * 0.4);
                if (alpha == 0)
                {
                    continue;
                }

                byte r = (byte)((color.Item1 * alpha) / 255);
                byte g = (byte)((color.Item2 * alpha) / 255);
                byte b = (byte)((color.Item3 * alpha) / 255);
                int offset = (pixel.Y * stride) + (pixel.X * 4);
                if (offset < 0 || offset + 3 >= data.Length)
                {
                    continue;
                }

                data[offset] = b;
                data[offset + 1] = g;
                data[offset + 2] = r;
                data[offset + 3] = alpha;
            }

            _cachedPreviewSurface.MarkDirty();
            return _cachedPreviewSurface;
        }

        private static int GetPaletteHash(System.Collections.Generic.IReadOnlyList<Tuple<byte, byte, byte, byte>> palette)
        {
            if (palette == null)
            {
                return 0;
            }

            unchecked
            {
                int hash = 17;
                hash = (hash * 31) + palette.Count;
                for (int i = 0; i < palette.Count; i++)
                {
                    Tuple<byte, byte, byte, byte> color = palette[i];
                    hash = (hash * 31) + color.Item1;
                    hash = (hash * 31) + color.Item2;
                    hash = (hash * 31) + color.Item3;
                    hash = (hash * 31) + color.Item4;
                }

                return hash;
            }
        }

        private void LogPreviewException(Exception ex, CanvasViewport viewport)
        {
            try
            {
                SelectionClipboard clipboard = null;
                int clipboardPixels = 0;
                int clipboardWidth = 0;
                int clipboardHeight = 0;
                try
                {
                    clipboard = _clipboardProvider?.Invoke();
                    if (clipboard != null)
                    {
                        clipboardPixels = clipboard.PixelCount;
                        clipboardWidth = clipboard.Width;
                        clipboardHeight = clipboard.Height;
                    }
                }
                catch (Exception clipboardEx)
                {
                    Console.Error.WriteLine($"StampTool.DrawPreview clipboard error: {clipboardEx}");
                }

                int paletteCount = viewport?.Palette?.Palette?.Count ?? 0;
                bool hasSelection = viewport?.Selection?.HasSelection ?? false;
                int cachedCount = _cachedPixels?.Count ?? 0;
                int surfaceWidth = _cachedPreviewSurface?.Width ?? 0;
                int surfaceHeight = _cachedPreviewSurface?.Height ?? 0;

                Console.Error.WriteLine($"StampTool.DrawPreview crashed: {ex.GetType().Name}: {ex.Message}");
                Console.Error.WriteLine($"Preview state: hasPreview={_hasPreview}, preview=({_previewX},{_previewY}), scale={_scale}, rotation={_rotation}, flipX={_flipX}, flipY={_flipY}, overwrite={_overwriteDestination}");
                Console.Error.WriteLine($"Clipboard: available={(clipboard != null)}, pixelCount={clipboardPixels}, width={clipboardWidth}, height={clipboardHeight}");
                Console.Error.WriteLine($"Cache: cachedPixels={cachedCount}, cachedSize={_cachedWidth}x{_cachedHeight}, cachedPixelSize={_cachedPixelWidth}x{_cachedPixelHeight}, surface={surfaceWidth}x{surfaceHeight}");
                Console.Error.WriteLine($"Viewport: pixelSize={viewport?.PixelSize ?? 0}, selection={hasSelection}, paletteCount={paletteCount}");
                Console.Error.WriteLine(ex.ToString());
            }
            catch (Exception logEx)
            {
                Console.Error.WriteLine($"StampTool.DrawPreview logging failed: {logEx}");
            }
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

        private readonly struct CachedPixel
        {
            public int X { get; }
            public int Y { get; }
            public byte ColorIndex { get; }

            public CachedPixel(int x, int y, byte colorIndex)
            {
                X = x;
                Y = y;
                ColorIndex = colorIndex;
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
