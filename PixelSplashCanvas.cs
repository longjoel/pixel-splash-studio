using System.Collections.Generic;

public class PixelSplashCanvas : ICanvasOperations
{
    public Dictionary<(int, int), PixelSplashCanvasChunk> Chunks { get; } = new Dictionary<(int, int), PixelSplashCanvasChunk>();
    public SelectionLayer Selection { get; } = new SelectionLayer();

    private static int FloorDiv(int value, int divisor)
    {
        int quotient = value / divisor;
        if (value % divisor != 0 && ((value < 0) ^ (divisor < 0)))
        {
            quotient -= 1;
        }

        return quotient;
    }

    private static int PositiveMod(int value, int modulus)
    {
        int result = value % modulus;
        return result < 0 ? result + modulus : result;
    }

    public void ClearCanvas()
    {
       Chunks.Clear();
    }

    public PixelSplashCanvasSnapshot CreateSnapshot()
    {
        var snapshot = new PixelSplashCanvasSnapshot();
        foreach (var entry in Chunks)
        {
            snapshot.Chunks[entry.Key] = (byte[])entry.Value.Data.Clone();
        }

        return snapshot;
    }

    public void RestoreSnapshot(PixelSplashCanvasSnapshot snapshot)
    {
        Chunks.Clear();
        if (snapshot == null)
        {
            return;
        }

        foreach (var entry in snapshot.Chunks)
        {
            int chunkX = entry.Key.Item1;
            int chunkY = entry.Key.Item2;
            var chunk = new PixelSplashCanvasChunk(
                chunkX * PixelSplashCanvasChunk.ChunkWidth,
                chunkY * PixelSplashCanvasChunk.ChunkHeight);
            chunk.Data = (byte[])entry.Value.Clone();
            Chunks[(chunkX, chunkY)] = chunk;
        }
    }

    public void DrawCircle(int x, int y, int radius, byte colorIndex)
    {
        int x0 = x - radius;
        int y0 = y - radius;
        int x1 = x + radius;
        int y1 = y + radius;

        for (int py = y0; py <= y1; py++)
        {
            for (int px = x0; px <= x1; px++)
            {
                int dx = px - x;
                int dy = py - y;
                if (dx * dx + dy * dy <= radius * radius)
                {
                    DrawPixel(px, py, colorIndex);
                }
            }
        }
    }

    public void DrawLine(int x1, int y1, int x2, int y2, byte colorIndex)
    {
        foreach ((int x, int y) in LineRasterizer.Rasterize(x1, y1, x2, y2))
        {
            DrawPixel(x, y, colorIndex);
        }
    }

    public void DrawPixel(int x, int y, byte colorIndex)
    {
        if (Selection.HasSelection && !Selection.IsSelected(x, y))
        {
            return;
        }

        int chunkX = FloorDiv(x, PixelSplashCanvasChunk.ChunkWidth);
        int chunkY = FloorDiv(y, PixelSplashCanvasChunk.ChunkHeight);
        int chunkPixelX = PositiveMod(x, PixelSplashCanvasChunk.ChunkWidth);
        int chunkPixelY = PositiveMod(y, PixelSplashCanvasChunk.ChunkHeight);

        if (!Chunks.ContainsKey((chunkX, chunkY)))
        {
            Chunks[(chunkX, chunkY)] = new PixelSplashCanvasChunk(chunkX * PixelSplashCanvasChunk.ChunkWidth, chunkY * PixelSplashCanvasChunk.ChunkHeight);
        }

        Chunks[(chunkX, chunkY)].Data[chunkPixelY * PixelSplashCanvasChunk.ChunkWidth + chunkPixelX] = colorIndex;
    }

    public byte GetPixel(int x, int y)
    {
        int chunkX = FloorDiv(x, PixelSplashCanvasChunk.ChunkWidth);
        int chunkY = FloorDiv(y, PixelSplashCanvasChunk.ChunkHeight);
        int chunkPixelX = PositiveMod(x, PixelSplashCanvasChunk.ChunkWidth);
        int chunkPixelY = PositiveMod(y, PixelSplashCanvasChunk.ChunkHeight);

        if (!Chunks.TryGetValue((chunkX, chunkY), out PixelSplashCanvasChunk chunk))
        {
            return 0;
        }

        return chunk.Data[chunkPixelY * PixelSplashCanvasChunk.ChunkWidth + chunkPixelX];
    }

    public bool TryGetPixel(int x, int y, out byte colorIndex)
    {
        int chunkX = FloorDiv(x, PixelSplashCanvasChunk.ChunkWidth);
        int chunkY = FloorDiv(y, PixelSplashCanvasChunk.ChunkHeight);
        int chunkPixelX = PositiveMod(x, PixelSplashCanvasChunk.ChunkWidth);
        int chunkPixelY = PositiveMod(y, PixelSplashCanvasChunk.ChunkHeight);

        if (!Chunks.TryGetValue((chunkX, chunkY), out PixelSplashCanvasChunk chunk))
        {
            colorIndex = 0;
            return false;
        }

        colorIndex = chunk.Data[chunkPixelY * PixelSplashCanvasChunk.ChunkWidth + chunkPixelX];
        return true;
    }

    public void DrawRectangle(int x, int y, int width, int height, byte colorIndex)
    {
        DrawLine(x, y, x + width, y, colorIndex);
        DrawLine(x + width, y, x + width, y + height, colorIndex);
        DrawLine(x + width, y + height, x, y + height, colorIndex);
        DrawLine(x, y + height, x, y, colorIndex);
    }

    public void FillCircle(int x, int y, int radius, byte colorIndex)
    {
        int x0 = x - radius;
        int y0 = y - radius;
        int x1 = x + radius;
        int y1 = y + radius;

        for (int py = y0; py <= y1; py++)
        {
            for (int px = x0; px <= x1; px++)
            {
                int dx = px - x;
                int dy = py - y;
                if (dx * dx + dy * dy <= radius * radius)
                {
                    DrawPixel(px, py, colorIndex);
                }
            }
        }
    }

    public void FillRectangle(int x, int y, int width, int height, byte colorIndex)
    {
        for (int py = y; py < y + height; py++)
        {
            for (int px = x; px < x + width; px++)
            {
                DrawPixel(px, py, colorIndex);
            }
        }
    }
}
