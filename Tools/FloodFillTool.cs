using System;
using System.Collections.Generic;

namespace PixelSplashStudio
{
    public class FloodFillTool : ITool
    {
        private readonly PixelSplashCanvas _canvas;
        private readonly PixelSplashPalette _palette;

        public event Action PreviewChanged;

        public FloodFillTool(PixelSplashCanvas canvas, PixelSplashPalette palette)
        {
            _canvas = canvas;
            _palette = palette;
        }

        public void BeginUseTool(bool primary, int x, int y)
        {
            if (_canvas == null || _palette == null)
            {
                return;
            }

            int primaryIndex = _palette.PrimaryIndex;
            int secondaryIndex = _palette.SecondaryIndex;
            if (primaryIndex < 0 || primaryIndex >= _palette.Palette.Count ||
                secondaryIndex < 0 || secondaryIndex >= _palette.Palette.Count)
            {
                return;
            }

            byte fillIndex = (byte)(primary ? primaryIndex : secondaryIndex);
            if (_canvas.Selection.HasSelection)
            {
                if (!_canvas.Selection.IsSelected(x, y))
                {
                    return;
                }

                if (_canvas.Selection.TryGetBounds(out int selectionMinX, out int selectionMinY, out int selectionMaxX, out int selectionMaxY))
                {
                    for (int py = selectionMinY; py <= selectionMaxY; py++)
                    {
                        for (int px = selectionMinX; px <= selectionMaxX; px++)
                        {
                            if (_canvas.Selection.IsSelected(px, py))
                            {
                                _canvas.DrawPixel(px, py, fillIndex);
                            }
                        }
                    }
                }

                PreviewChanged?.Invoke();
                return;
            }

            byte startIndex = _canvas.GetPixel(x, y);
            if (fillIndex == startIndex)
            {
                return;
            }

            if (!TryGetFillBounds(x, y, startIndex, out int minX, out int minY, out int maxX, out int maxY, out byte targetIndex))
            {
                return;
            }

            var queue = new Queue<(int x, int y)>();
            var visited = new HashSet<(int x, int y)>();
            queue.Enqueue((x, y));
            visited.Add((x, y));

            while (queue.Count > 0)
            {
                (int px, int py) = queue.Dequeue();
                if (px < minX || px > maxX || py < minY || py > maxY)
                {
                    continue;
                }

                byte currentIndex = _canvas.GetPixel(px, py);
                if (currentIndex != startIndex)
                {
                    continue;
                }

                _canvas.DrawPixel(px, py, fillIndex);

                TryEnqueue(px + 1, py);
                TryEnqueue(px - 1, py);
                TryEnqueue(px, py + 1);
                TryEnqueue(px, py - 1);
            }

            PreviewChanged?.Invoke();

            void TryEnqueue(int nx, int ny)
            {
                if (visited.Contains((nx, ny)))
                {
                    return;
                }

                if (nx < minX || nx > maxX || ny < minY || ny > maxY)
                {
                    return;
                }

                visited.Add((nx, ny));
                queue.Enqueue((nx, ny));
            }
        }

        public void EndUseTool(bool primary, int endX, int endY)
        {
        }

        public void UseTool(int x, int y)
        {
        }

        public void DrawPreview(Cairo.Context context, CanvasViewport viewport)
        {
            // No preview for this tool
        }

        private bool TryGetFillBounds(int startX, int startY, byte startIndex, out int minX, out int minY, out int maxX, out int maxY, out byte targetIndex)
        {
            minX = 0;
            minY = 0;
            maxX = 0;
            maxY = 0;
            targetIndex = 0;

            if (_canvas.Chunks.Count == 0)
            {
                return false;
            }

            bool hasBounds = false;
            foreach (var chunk in _canvas.Chunks.Values)
            {
                int chunkMinX = chunk.X;
                int chunkMaxX = chunk.X + PixelSplashCanvasChunk.ChunkWidth - 1;
                int chunkMinY = chunk.Y;
                int chunkMaxY = chunk.Y + PixelSplashCanvasChunk.ChunkHeight - 1;

                if (!hasBounds)
                {
                    minX = chunkMinX;
                    maxX = chunkMaxX;
                    minY = chunkMinY;
                    maxY = chunkMaxY;
                    hasBounds = true;
                }
                else
                {
                    minX = System.Math.Min(minX, chunkMinX);
                    maxX = System.Math.Max(maxX, chunkMaxX);
                    minY = System.Math.Min(minY, chunkMinY);
                    maxY = System.Math.Max(maxY, chunkMaxY);
                }
            }

            if (!hasBounds)
            {
                return false;
            }

            if (!TryFindTargetIndex(startX, startY, startIndex, minX, minY, maxX, maxY, out targetIndex))
            {
                return false;
            }

            if (!TryFindBoundsForTarget(startX, startY, startIndex, targetIndex, minX, minY, maxX, maxY,
                    out int left, out int right, out int top, out int bottom))
            {
                return false;
            }

            minX = left + 1;
            maxX = right - 1;
            minY = top + 1;
            maxY = bottom - 1;
            if (minX > maxX || minY > maxY)
            {
                return false;
            }

            return true;
        }

        private bool TryFindTargetIndex(int startX, int startY, byte startIndex, int minX, int minY, int maxX, int maxY, out byte targetIndex)
        {
            targetIndex = 0;
            bool found = false;

            if (!TryFindFurthestNonStart(startX, startY, -1, 0, startIndex, minX, minY, maxX, maxY, out byte leftIndex))
            {
                return false;
            }

            if (!TryFindFurthestNonStart(startX, startY, 1, 0, startIndex, minX, minY, maxX, maxY, out byte rightIndex))
            {
                return false;
            }

            if (!TryFindFurthestNonStart(startX, startY, 0, -1, startIndex, minX, minY, maxX, maxY, out byte topIndex))
            {
                return false;
            }

            if (!TryFindFurthestNonStart(startX, startY, 0, 1, startIndex, minX, minY, maxX, maxY, out byte bottomIndex))
            {
                return false;
            }

            if (leftIndex != rightIndex || leftIndex != topIndex || leftIndex != bottomIndex)
            {
                return false;
            }

            targetIndex = leftIndex;
            found = true;
            return found;
        }

        private bool TryFindBoundsForTarget(int startX, int startY, byte startIndex, byte targetIndex, int minX, int minY, int maxX, int maxY,
            out int left, out int right, out int top, out int bottom)
        {
            left = startX;
            right = startX;
            top = startY;
            bottom = startY;

            if (!TryFindFurthestTarget(startX, startY, -1, 0, targetIndex, minX, minY, maxX, maxY, out left))
            {
                return false;
            }

            if (!TryFindFurthestTarget(startX, startY, 1, 0, targetIndex, minX, minY, maxX, maxY, out right))
            {
                return false;
            }

            if (!TryFindFurthestTarget(startX, startY, 0, -1, targetIndex, minX, minY, maxX, maxY, out top))
            {
                return false;
            }

            if (!TryFindFurthestTarget(startX, startY, 0, 1, targetIndex, minX, minY, maxX, maxY, out bottom))
            {
                return false;
            }

            return targetIndex != startIndex;
        }

        private bool TryFindFurthestNonStart(int startX, int startY, int stepX, int stepY, byte startIndex, int minX, int minY, int maxX, int maxY, out byte foundIndex)
        {
            foundIndex = 0;
            bool found = false;
            int x = startX;
            int y = startY;

            while (x >= minX && x <= maxX && y >= minY && y <= maxY)
            {
                byte color = _canvas.GetPixel(x, y);
                if (color != startIndex)
                {
                    foundIndex = color;
                    found = true;
                }

                x += stepX;
                y += stepY;
            }

            return found;
        }

        private bool TryFindFurthestTarget(int startX, int startY, int stepX, int stepY, byte targetIndex, int minX, int minY, int maxX, int maxY, out int foundCoord)
        {
            int x = startX;
            int y = startY;
            foundCoord = stepX != 0 ? startX : startY;
            bool found = false;

            while (x >= minX && x <= maxX && y >= minY && y <= maxY)
            {
                if (_canvas.GetPixel(x, y) == targetIndex)
                {
                    foundCoord = stepX != 0 ? x : y;
                    found = true;
                }

                x += stepX;
                y += stepY;
            }

            return found;
        }

    }
}
