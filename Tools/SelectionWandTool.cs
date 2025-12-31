using System;
using System.Collections.Generic;

namespace PixelSplashStudio
{
    public class SelectionWandTool : ITool
    {
        private readonly PixelSplashCanvas _canvas;

        public event Action PreviewChanged;

        public SelectionMode Mode { get; set; } = SelectionMode.Add;
        public SelectionSnapMode SnapMode { get; set; } = SelectionSnapMode.Pixel;

        public SelectionWandTool(PixelSplashCanvas canvas)
        {
            _canvas = canvas;
        }

        public void BeginUseTool(bool primary, int x, int y)
        {
            if (_canvas == null)
            {
                return;
            }

            bool hasPixel = _canvas.TryGetPixel(x, y, out byte targetIndex);
            if (!hasPixel)
            {
                targetIndex = 0;
            }

            bool limitToBounds = false;
            int minX = 0;
            int minY = 0;
            int maxX = 0;
            int maxY = 0;
            if (targetIndex == 0)
            {
                if (!TryGetChunkBounds(out minX, out minY, out maxX, out maxY))
                {
                    return;
                }

                if (x < minX || x > maxX || y < minY || y > maxY)
                {
                    return;
                }

                limitToBounds = true;
            }

            HashSet<(int, int)> region = new HashSet<(int, int)>();
            Queue<(int x, int y)> queue = new Queue<(int x, int y)>();
            HashSet<(int, int)> visited = new HashSet<(int, int)>();

            queue.Enqueue((x, y));
            visited.Add((x, y));

            while (queue.Count > 0)
            {
                (int cx, int cy) = queue.Dequeue();
                if (limitToBounds && (cx < minX || cx > maxX || cy < minY || cy > maxY))
                {
                    continue;
                }

                if (!_canvas.TryGetPixel(cx, cy, out byte currentIndex))
                {
                    currentIndex = 0;
                }

                if (currentIndex != targetIndex)
                {
                    continue;
                }

                region.Add((cx, cy));

                EnqueueNeighbor(cx + 1, cy, queue, visited, limitToBounds, minX, minY, maxX, maxY);
                EnqueueNeighbor(cx - 1, cy, queue, visited, limitToBounds, minX, minY, maxX, maxY);
                EnqueueNeighbor(cx, cy + 1, queue, visited, limitToBounds, minX, minY, maxX, maxY);
                EnqueueNeighbor(cx, cy - 1, queue, visited, limitToBounds, minX, minY, maxX, maxY);
            }

            if (region.Count == 0)
            {
                return;
            }

            if (Mode == SelectionMode.Add)
            {
                _canvas.Selection.AddPixelMask(region);
            }
            else
            {
                _canvas.Selection.SubtractPixelMask(region);
            }

            PreviewChanged?.Invoke();
        }

        public void EndUseTool(bool primary, int x, int y)
        {
        }

        public void UseTool(int x, int y)
        {
        }

        public void DrawPreview(Cairo.Context context, CanvasViewport viewport)
        {
            // No preview for this tool
        }

        private static void EnqueueNeighbor(int x, int y, Queue<(int x, int y)> queue, HashSet<(int, int)> visited, bool limitToBounds, int minX, int minY, int maxX, int maxY)
        {
            if (limitToBounds && (x < minX || x > maxX || y < minY || y > maxY))
            {
                return;
            }

            if (visited.Add((x, y)))
            {
                queue.Enqueue((x, y));
            }
        }

        private bool TryGetChunkBounds(out int minX, out int minY, out int maxX, out int maxY)
        {
            minX = 0;
            minY = 0;
            maxX = 0;
            maxY = 0;

            if (_canvas?.Chunks == null || _canvas.Chunks.Count == 0)
            {
                return false;
            }

            bool hasAny = false;
            foreach (PixelSplashCanvasChunk chunk in _canvas.Chunks.Values)
            {
                if (chunk == null)
                {
                    continue;
                }

                int chunkMinX = chunk.X;
                int chunkMinY = chunk.Y;
                int chunkMaxX = chunk.X + PixelSplashCanvasChunk.ChunkWidth - 1;
                int chunkMaxY = chunk.Y + PixelSplashCanvasChunk.ChunkHeight - 1;

                if (!hasAny)
                {
                    minX = chunkMinX;
                    minY = chunkMinY;
                    maxX = chunkMaxX;
                    maxY = chunkMaxY;
                    hasAny = true;
                }
                else
                {
                    if (chunkMinX < minX) minX = chunkMinX;
                    if (chunkMinY < minY) minY = chunkMinY;
                    if (chunkMaxX > maxX) maxX = chunkMaxX;
                    if (chunkMaxY > maxY) maxY = chunkMaxY;
                }
            }

            return hasAny;
        }
    }
}
