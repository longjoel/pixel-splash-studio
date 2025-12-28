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

            if (!_canvas.TryGetPixel(x, y, out byte targetIndex))
            {
                return;
            }

            HashSet<(int, int)> region = new HashSet<(int, int)>();
            Queue<(int x, int y)> queue = new Queue<(int x, int y)>();
            HashSet<(int, int)> visited = new HashSet<(int, int)>();

            queue.Enqueue((x, y));
            visited.Add((x, y));

            while (queue.Count > 0)
            {
                (int cx, int cy) = queue.Dequeue();
                if (!_canvas.TryGetPixel(cx, cy, out byte currentIndex))
                {
                    continue;
                }

                if (currentIndex != targetIndex)
                {
                    continue;
                }

                region.Add((cx, cy));

                EnqueueNeighbor(cx + 1, cy, queue, visited);
                EnqueueNeighbor(cx - 1, cy, queue, visited);
                EnqueueNeighbor(cx, cy + 1, queue, visited);
                EnqueueNeighbor(cx, cy - 1, queue, visited);
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

        private static void EnqueueNeighbor(int x, int y, Queue<(int x, int y)> queue, HashSet<(int, int)> visited)
        {
            if (visited.Add((x, y)))
            {
                queue.Enqueue((x, y));
            }
        }
    }
}
