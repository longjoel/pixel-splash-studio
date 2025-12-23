using System;

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

    public event Action PreviewChanged;

    public bool HasPreview => _hasPreview;

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

    public bool TryGetPreview(out int originX, out int originY, out SelectionClipboard clipboard)
    {
        clipboard = _clipboardProvider?.Invoke();
        if (!_hasPreview || clipboard == null || clipboard.Pixels.Count == 0)
        {
            originX = 0;
            originY = 0;
            return false;
        }

        originX = _previewX;
        originY = _previewY;
        return true;
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
        SelectionClipboard clipboard = _clipboardProvider?.Invoke();
        if (clipboard == null || clipboard.Pixels.Count == 0)
        {
            return;
        }

        for (int i = 0; i < clipboard.Pixels.Count; i++)
        {
            ClipboardPixel pixel = clipboard.Pixels[i];
            int worldX = originX + pixel.X;
            int worldY = originY + pixel.Y;
            if (!CanWriteTo(worldX, worldY))
            {
                continue;
            }

            _canvas.DrawPixel(worldX, worldY, pixel.ColorIndex);
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
        return _snapToTile ? SnapToTile(x, PixelSplashCanvasChunk.ChunkWidth) : x;
    }

    private int GetTargetY(int y)
    {
        return _snapToTile ? SnapToTile(y, PixelSplashCanvasChunk.ChunkHeight) : y;
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
