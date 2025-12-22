

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

        context.Save();
        SetSourceColor(context, _settings.GridR, _settings.GridG, _settings.GridB, _settings.GridA);
        context.LineWidth = 1.0;

        double viewportWidth = x2 - x1;
        double viewportHeight = y2 - y1;

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

        const int subGridSize = 8;
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
    }
}
