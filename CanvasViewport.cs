

using System;
using Cairo;

public class CanvasViewport
{
    private PixelSplashCanvas _canvas;
    private int _pixelSize;
    private PixelSplashPalette _palette;
    private CanvasViewportSettings _settings;

    private int CameraX { get; set; }
    private int CameraY { get; set; }

    public const int DefaultPixelSize = 16;

    public int PixelSize {get { return _pixelSize; } set { _pixelSize = value; } }
    public int CameraPixelX { get { return CameraX; } set { CameraX = value; } }
    public int CameraPixelY { get { return CameraY; } set { CameraY = value; } }

    public CanvasViewport(PixelSplashCanvas canvas, PixelSplashPalette palette)
        : this(canvas, palette, new CanvasViewportSettings())
    {
    }

    public CanvasViewport(PixelSplashCanvas canvas, PixelSplashPalette palette, CanvasViewportSettings settings)
    {
        _canvas = canvas;
        _pixelSize = DefaultPixelSize;
        _palette = palette;
        _settings = settings ?? new CanvasViewportSettings();
    }

    public SelectionLayer Selection => _canvas?.Selection;
    public ReferenceLayer References => _canvas?.References;
    public PixelSplashPalette Palette => _palette;

    public void SetPixelSize(int pixelSize)
    {
        _pixelSize = pixelSize;
    }

    public void SetCamera(int pixelX, int pixelY)
    {
        CameraX = pixelX;
        CameraY = pixelY;
    }

    public void Pan(int deltaX, int deltaY)
    {
        CameraX += deltaX;
        CameraY += deltaY;
    }

    public void Zoom(int deltaPixelSize)
    {
        int nextSize = _pixelSize + deltaPixelSize;
        _pixelSize = nextSize < 1 ? 1 : nextSize;
    }

    private static int FloorDiv(int value, int divisor)
    {
        int quotient = value / divisor;
        if (value % divisor != 0 && ((value < 0) ^ (divisor < 0)))
        {
            quotient -= 1;
        }

        return quotient;
    }

    private static int Mod(int value, int modulo)
    {
        int result = value % modulo;
        return result < 0 ? result + modulo : result;
    }

    private static int NextMultiple(int value, int step)
    {
        int remainder = Mod(value, step);
        return remainder == 0 ? value : value + (step - remainder);
    }

    private static void SetSourceColor(Cairo.Context context, byte r, byte g, byte b, byte a)
    {
        context.SetSourceRGBA(r / 255.0, g / 255.0, b / 255.0, a / 255.0);
    }

    private static void SetSourceColorScaled(Cairo.Context context, byte r, byte g, byte b, byte a, double rgbScale, double alphaScale)
    {
        double red = Math.Min(255.0, r * rgbScale);
        double green = Math.Min(255.0, g * rgbScale);
        double blue = Math.Min(255.0, b * rgbScale);
        double alpha = Math.Min(255.0, a * alphaScale);
        context.SetSourceRGBA(red / 255.0, green / 255.0, blue / 255.0, alpha / 255.0);
    }

    public void RenderViewport(Cairo.Context context)
    {
        if (context == null)
        {
            throw new ArgumentNullException(nameof(context));
        }

        if (_pixelSize <= 0)
        {
            return;
        }

        Rectangle clip = context.ClipExtents();
        double x1 = clip.X;
        double y1 = clip.Y;
        double x2 = clip.X + clip.Width;
        double y2 = clip.Y + clip.Height;

        context.Save();
        SetSourceColor(context, _settings.BackgroundR, _settings.BackgroundG, _settings.BackgroundB, _settings.BackgroundA);
        context.Rectangle(0, 0, x2 - x1, y2 - y1);
        context.Fill();
        context.Restore();

        int viewportPixelWidth = (int)Math.Ceiling((x2 - x1) / _pixelSize);
        int viewportPixelHeight = (int)Math.Ceiling((y2 - y1) / _pixelSize);

        int startX = CameraX - (viewportPixelWidth / 2);
        int startY = CameraY - (viewportPixelHeight / 2);
        int endX = startX + viewportPixelWidth - 1;
        int endY = startY + viewportPixelHeight - 1;

        DrawReferences(context, startX, startY, endX, endY);

        int chunkStartX = FloorDiv(startX, PixelSplashCanvasChunk.ChunkWidth);
        int chunkEndX = FloorDiv(endX, PixelSplashCanvasChunk.ChunkWidth);
        int chunkStartY = FloorDiv(startY, PixelSplashCanvasChunk.ChunkHeight);
        int chunkEndY = FloorDiv(endY, PixelSplashCanvasChunk.ChunkHeight);

        for (int chunkY = chunkStartY; chunkY <= chunkEndY; chunkY++)
        {
            for (int chunkX = chunkStartX; chunkX <= chunkEndX; chunkX++)
            {
                if (!_canvas.Chunks.TryGetValue((chunkX, chunkY), out PixelSplashCanvasChunk chunk))
                {
                    continue;
                }

                int chunkWorldX = chunk.X;
                int chunkWorldY = chunk.Y;

                for (int py = 0; py < PixelSplashCanvasChunk.ChunkHeight; py++)
                {
                    int worldY = chunkWorldY + py;
                    if (worldY < startY || worldY > endY)
                    {
                        continue;
                    }

                    for (int px = 0; px < PixelSplashCanvasChunk.ChunkWidth; px++)
                    {
                        int worldX = chunkWorldX + px;
                        if (worldX < startX || worldX > endX)
                        {
                            continue;
                        }

                        byte colorIndex = chunk.Data[py * PixelSplashCanvasChunk.ChunkWidth + px];
                        if (colorIndex >= _palette.Palette.Count)
                        {
                            continue;
                        }

                        var color = _palette.Palette[colorIndex];
                        double r = color.Item1 / 255.0;
                        double g = color.Item2 / 255.0;
                        double b = color.Item3 / 255.0;
                        double a = color.Item4 / 255.0;

                        double destX = (worldX - startX) * _pixelSize;
                        double destY = (worldY - startY) * _pixelSize;

                        context.SetSourceRGBA(r, g, b, a);
                        context.Rectangle(destX, destY, _pixelSize, _pixelSize);
                        context.Fill();
                    }
                }
            }
        }

        if (_canvas.Selection.HasSelection)
        {
            context.Save();
            context.SetSourceRGBA(0.85, 0.85, 0.85, 0.5);

            for (int worldY = startY; worldY <= endY; worldY++)
            {
                double destY = (worldY - startY) * _pixelSize;
                for (int worldX = startX; worldX <= endX; worldX++)
                {
                    if (_canvas.Selection.IsSelected(worldX, worldY))
                    {
                        continue;
                    }

                    double destX = (worldX - startX) * _pixelSize;
                    context.Rectangle(destX, destY, _pixelSize, _pixelSize);
                }
            }

            context.Fill();
            context.Restore();
        }

        context.Save();
        SetSourceColor(context, _settings.GridR, _settings.GridG, _settings.GridB, _settings.GridA);
        context.LineWidth = 1.0;

        double viewportWidth = x2 - x1;
        double viewportHeight = y2 - y1;

        int pixelGridMinSize = Math.Max(1, _settings.PixelGridMinSize);
        bool showPixelGrid = _pixelSize >= pixelGridMinSize;
        if (showPixelGrid)
        {
            for (int x = 0; x <= viewportPixelWidth; x++)
            {
                double xPos = (x * _pixelSize) + 0.5;
                context.MoveTo(xPos, 0);
                context.LineTo(xPos, viewportHeight);
            }

            for (int y = 0; y <= viewportPixelHeight; y++)
            {
                double yPos = (y * _pixelSize) + 0.5;
                context.MoveTo(0, yPos);
                context.LineTo(viewportWidth, yPos);
            }

            context.Stroke();
        }

        int subGridSize = Math.Max(1, _settings.TileGridSize);
        SetSourceColorScaled(context, _settings.GridR, _settings.GridG, _settings.GridB, _settings.GridA, 0.75, 1.0);

        int subGridStartX = NextMultiple(startX, subGridSize);
        for (int worldX = subGridStartX; worldX <= endX; worldX += subGridSize)
        {
            double xPos = ((worldX - startX) * _pixelSize) + 0.5;
            context.MoveTo(xPos, 0);
            context.LineTo(xPos, viewportHeight);
        }

        int subGridStartY = NextMultiple(startY, subGridSize);
        for (int worldY = subGridStartY; worldY <= endY; worldY += subGridSize)
        {
            double yPos = ((worldY - startY) * _pixelSize) + 0.5;
            context.MoveTo(0, yPos);
            context.LineTo(viewportWidth, yPos);
        }

        context.Stroke();

        SetSourceColorScaled(context, _settings.GridR, _settings.GridG, _settings.GridB, _settings.GridA, 0.5, 1.0);
        context.LineWidth = 2.0;

        if (startX <= 0 && endX >= 0)
        {
            double xPos = ((0 - startX) * _pixelSize) + 0.5;
            context.MoveTo(xPos, 0);
            context.LineTo(xPos, viewportHeight);
        }

        if (startY <= 0 && endY >= 0)
        {
            double yPos = ((0 - startY) * _pixelSize) + 0.5;
            context.MoveTo(0, yPos);
            context.LineTo(viewportWidth, yPos);
        }

        context.Stroke();
        context.Restore();

        if (_canvas.Selection.HasSelection)
        {
            DrawSelectionMarchingAnts(context, startX, startY, endX, endY);
        }
    }

    private void DrawReferences(Context context, int startX, int startY, int endX, int endY)
    {
        if (_canvas?.References == null || _canvas.References.Objects.Count == 0)
        {
            return;
        }

        foreach (ReferenceObject reference in _canvas.References.Objects)
        {
            if (reference == null || reference.Width <= 0 || reference.Height <= 0)
            {
                continue;
            }

            double refMinX = Math.Min(reference.X, reference.X + reference.Width);
            double refMaxX = Math.Max(reference.X, reference.X + reference.Width);
            double refMinY = Math.Min(reference.Y, reference.Y + reference.Height);
            double refMaxY = Math.Max(reference.Y, reference.Y + reference.Height);

            if (refMaxX < startX || refMinX > endX + 1 || refMaxY < startY || refMinY > endY + 1)
            {
                continue;
            }

            double screenX = (reference.X - startX) * _pixelSize;
            double screenY = (reference.Y - startY) * _pixelSize;
            double screenWidth = reference.Width * _pixelSize;
            double screenHeight = reference.Height * _pixelSize;
            reference.Draw(context, this, screenX, screenY, screenWidth, screenHeight);
        }
    }

    private void DrawSelectionMarchingAnts(Context context, int startX, int startY, int endX, int endY)
    {
        context.Save();
        context.LineWidth = 1.0;
        double dashOffset = GetMarchingAntsOffset();

        context.SetSourceRGBA(0, 0, 0, 1);
        context.SetDash(new double[] { 4, 4 }, dashOffset);
        BuildSelectionBoundaryPath(context, startX, startY, endX, endY);
        context.Stroke();

        context.SetSourceRGBA(1, 1, 1, 1);
        context.SetDash(new double[] { 4, 4 }, dashOffset + 4);
        BuildSelectionBoundaryPath(context, startX, startY, endX, endY);
        context.Stroke();

        context.Restore();
    }

    private void BuildSelectionBoundaryPath(Context context, int startX, int startY, int endX, int endY)
    {
        for (int worldY = startY; worldY <= endY; worldY++)
        {
            double yStart = ((worldY - startY) * _pixelSize) + 0.5;
            double yEnd = ((worldY + 1 - startY) * _pixelSize) + 0.5;
            for (int worldX = startX; worldX <= endX; worldX++)
            {
                bool selected = _canvas.Selection.IsSelected(worldX, worldY);
                bool rightSelected = _canvas.Selection.IsSelected(worldX + 1, worldY);
                if (selected != rightSelected)
                {
                    double xPos = ((worldX + 1 - startX) * _pixelSize) + 0.5;
                    context.MoveTo(xPos, yStart);
                    context.LineTo(xPos, yEnd);
                }

                bool downSelected = _canvas.Selection.IsSelected(worldX, worldY + 1);
                if (selected != downSelected)
                {
                    double xStart = ((worldX - startX) * _pixelSize) + 0.5;
                    double xEnd = ((worldX + 1 - startX) * _pixelSize) + 0.5;
                    double yPos = ((worldY + 1 - startY) * _pixelSize) + 0.5;
                    context.MoveTo(xStart, yPos);
                    context.LineTo(xEnd, yPos);
                }
            }
        }
    }

    public static double GetMarchingAntsOffset()
    {
        double ms = DateTime.UtcNow.TimeOfDay.TotalMilliseconds;
        return (ms / 100.0) % 8.0;
    }

    public void WorldToScreen(int worldX, int worldY, double viewWidth, double viewHeight, out double screenX, out double screenY)
    {
        screenX = 0;
        screenY = 0;

        if (PixelSize <= 0 || viewWidth <= 0 || viewHeight <= 0)
        {
            return;
        }

        GetViewportBounds(viewWidth, viewHeight, out int startX, out int startY, out _, out _);
        screenX = (worldX - startX) * PixelSize;
        screenY = (worldY - startY) * PixelSize;
    }

    public void GetViewportBounds(double viewWidth, double viewHeight, out int startX, out int startY, out int endX, out int endY)
    {
        startX = 0;
        startY = 0;
        endX = 0;
        endY = 0;

        if (PixelSize <= 0 || viewWidth <= 0 || viewHeight <= 0)
        {
            return;
        }
        
        int viewportPixelWidth = (int)Math.Ceiling(viewWidth / PixelSize);
        int viewportPixelHeight = (int)Math.Ceiling(viewHeight / PixelSize);

        startX = CameraPixelX - (viewportPixelWidth / 2);
        startY = CameraPixelY - (viewportPixelHeight / 2);
        endX = startX + viewportPixelWidth - 1;
        endY = startY + viewportPixelHeight - 1;
    }
}
