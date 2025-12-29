using System;
using Cairo;
using Gdk;
using Gtk;

namespace PixelSplashStudio
{
    class MiniMapWidget : Gtk.Box
    {
        private const int DefaultWorldSize = 64;
        private const int MapPadding = 6;
        private const int MinMapSize = 160;

        private readonly PixelSplashCanvas _canvas;
        private readonly PixelSplashPalette _palette;
        private readonly CanvasViewportSettings _settings;
        private readonly DrawingArea _mapArea;
        private readonly Button _zoomInButton;
        private readonly Button _zoomOutButton;
        private CanvasViewportWidget _targetViewport;
        private bool _isDragging;

        public event System.Action ZoomInRequested;
        public event System.Action ZoomOutRequested;
        public event System.Action<int, int> CenterRequested;

        public MiniMapWidget(PixelSplashCanvas canvas, PixelSplashPalette palette, CanvasViewportSettings settings)
            : base(Orientation.Vertical, 4)
        {
            _canvas = canvas;
            _palette = palette;
            _settings = settings ?? new CanvasViewportSettings();

            Box header = new Box(Orientation.Horizontal, 4)
            {
                Visible = true
            };
            Label title = new Label("Mini Map")
            {
                Visible = true,
                Xalign = 0
            };
            _zoomOutButton = new Button("-")
            {
                Visible = true,
                CanFocus = false,
                TooltipText = "Zoom out"
            };
            _zoomInButton = new Button("+")
            {
                Visible = true,
                CanFocus = false,
                TooltipText = "Zoom in"
            };

            header.PackStart(title, true, true, 0);
            header.PackEnd(_zoomInButton, false, false, 0);
            header.PackEnd(_zoomOutButton, false, false, 0);

            _mapArea = new DrawingArea
            {
                Visible = true,
                CanFocus = false
            };
            _mapArea.SetSizeRequest(MinMapSize, MinMapSize);
            _mapArea.AddEvents((int)(EventMask.ButtonPressMask | EventMask.ButtonReleaseMask | EventMask.PointerMotionMask));
            _mapArea.Drawn += MapArea_Drawn;
            _mapArea.ButtonPressEvent += MapArea_ButtonPressEvent;
            _mapArea.ButtonReleaseEvent += MapArea_ButtonReleaseEvent;
            _mapArea.MotionNotifyEvent += MapArea_MotionNotifyEvent;

            PackStart(header, false, false, 0);
            PackStart(_mapArea, false, false, 0);

            _zoomOutButton.Clicked += (_, __) => ZoomOutRequested?.Invoke();
            _zoomInButton.Clicked += (_, __) => ZoomInRequested?.Invoke();
        }

        public void SetTargetViewport(CanvasViewportWidget viewport)
        {
            _targetViewport = viewport;
            Refresh();
        }

        public void Refresh()
        {
            _mapArea.QueueDraw();
        }

        private void MapArea_Drawn(object sender, DrawnArgs args)
        {
            DrawMiniMap(args.Cr);
        }

        private void MapArea_ButtonPressEvent(object o, ButtonPressEventArgs args)
        {
            if (args.Event.Button != 1)
            {
                return;
            }

            _isDragging = true;
            if (TryScreenToWorld(args.Event.X, args.Event.Y, out int worldX, out int worldY))
            {
                CenterRequested?.Invoke(worldX, worldY);
            }
        }

        private void MapArea_ButtonReleaseEvent(object o, ButtonReleaseEventArgs args)
        {
            if (args.Event.Button == 1)
            {
                _isDragging = false;
            }
        }

        private void MapArea_MotionNotifyEvent(object o, MotionNotifyEventArgs args)
        {
            if (!_isDragging)
            {
                return;
            }

            if ((args.Event.State & ModifierType.Button1Mask) == 0)
            {
                _isDragging = false;
                return;
            }

            if (TryScreenToWorld(args.Event.X, args.Event.Y, out int worldX, out int worldY))
            {
                CenterRequested?.Invoke(worldX, worldY);
            }
        }

        private void DrawMiniMap(Context context)
        {
            if (context == null || _mapArea == null)
            {
                return;
            }

            int width = _mapArea.AllocatedWidth;
            int height = _mapArea.AllocatedHeight;
            if (width <= 0 || height <= 0)
            {
                return;
            }

            context.Save();
            context.Antialias = Antialias.None;
            SetSourceColor(context, _settings.BackgroundR, _settings.BackgroundG, _settings.BackgroundB, _settings.BackgroundA);
            context.Rectangle(0, 0, width, height);
            context.Fill();
            context.Restore();

            if (!TryGetMapTransform(width, height, out double minX, out double minY, out double maxX, out double maxY, out double scale, out double offsetX, out double offsetY))
            {
                return;
            }

            DrawCanvas(context, minX, minY, maxX, maxY, scale, offsetX, offsetY);
            DrawReferenceOverlay(context, minX, minY, maxX, maxY, scale, offsetX, offsetY);
            DrawViewportIndicator(context, minX, minY, maxX, maxY, scale, offsetX, offsetY);

            context.Save();
            context.SetSourceRGBA(0, 0, 0, 0.25);
            context.LineWidth = 1.0;
            context.Rectangle(0.5, 0.5, Math.Max(0, width - 1), Math.Max(0, height - 1));
            context.Stroke();
            context.Restore();
        }

        private void DrawCanvas(Context context, double minX, double minY, double maxX, double maxY, double scale, double offsetX, double offsetY)
        {
            if (_canvas == null || _palette?.Palette == null || _palette.Palette.Count == 0)
            {
                return;
            }

            context.Save();
            context.Antialias = Antialias.None;

            foreach (var entry in _canvas.Chunks)
            {
                PixelSplashCanvasChunk chunk = entry.Value;
                if (chunk == null)
                {
                    continue;
                }

                int chunkMinX = chunk.X;
                int chunkMinY = chunk.Y;
                int chunkMaxX = chunk.X + PixelSplashCanvasChunk.ChunkWidth - 1;
                int chunkMaxY = chunk.Y + PixelSplashCanvasChunk.ChunkHeight - 1;

                if (chunkMaxX < minX || chunkMinX > maxX || chunkMaxY < minY || chunkMinY > maxY)
                {
                    continue;
                }

                for (int py = 0; py < PixelSplashCanvasChunk.ChunkHeight; py++)
                {
                    int worldY = chunk.Y + py;
                    if (worldY < minY || worldY > maxY)
                    {
                        continue;
                    }

                    for (int px = 0; px < PixelSplashCanvasChunk.ChunkWidth; px++)
                    {
                        int worldX = chunk.X + px;
                        if (worldX < minX || worldX > maxX)
                        {
                            continue;
                        }

                        byte colorIndex = chunk.Data[py * PixelSplashCanvasChunk.ChunkWidth + px];
                        if (colorIndex >= _palette.Palette.Count)
                        {
                            continue;
                        }

                        var color = _palette.Palette[colorIndex];
                        context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, color.Item4 / 255.0);

                        double screenX = offsetX + ((worldX - minX) * scale);
                        double screenY = offsetY + ((worldY - minY) * scale);
                        context.Rectangle(screenX, screenY, scale, scale);
                        context.Fill();
                    }
                }
            }

            context.Restore();
        }

        private void DrawReferenceOverlay(Context context, double minX, double minY, double maxX, double maxY, double scale, double offsetX, double offsetY)
        {
            var references = _canvas?.References?.Objects;
            if (references == null || references.Count == 0)
            {
                return;
            }

            context.Save();
            context.LineWidth = 1.0;
            context.SetSourceRGBA(1, 1, 1, 0.18);
            bool hasRectangles = false;

            foreach (var reference in references)
            {
                if (reference == null || reference.Width == 0 || reference.Height == 0)
                {
                    continue;
                }

                double refMinX = Math.Min(reference.X, reference.X + reference.Width);
                double refMaxX = Math.Max(reference.X, reference.X + reference.Width);
                double refMinY = Math.Min(reference.Y, reference.Y + reference.Height);
                double refMaxY = Math.Max(reference.Y, reference.Y + reference.Height);

                if (refMaxX < minX || refMinX > maxX || refMaxY < minY || refMinY > maxY)
                {
                    continue;
                }

                double screenX = offsetX + ((refMinX - minX) * scale);
                double screenY = offsetY + ((refMinY - minY) * scale);
                double screenW = (refMaxX - refMinX) * scale;
                double screenH = (refMaxY - refMinY) * scale;

                if (screenW <= 0 || screenH <= 0)
                {
                    continue;
                }

                context.Rectangle(screenX, screenY, screenW, screenH);
                hasRectangles = true;
            }

            if (hasRectangles)
            {
                context.FillPreserve();
                context.SetSourceRGBA(1, 1, 1, 0.5);
                context.Stroke();
            }

            context.Restore();
        }

        private void DrawViewportIndicator(Context context, double minX, double minY, double maxX, double maxY, double scale, double offsetX, double offsetY)
        {
            if (_targetViewport?.Viewport == null)
            {
                return;
            }

            int viewWidth = _targetViewport.AllocatedWidth;
            int viewHeight = _targetViewport.AllocatedHeight;
            if (viewWidth <= 0 || viewHeight <= 0)
            {
                return;
            }

            _targetViewport.Viewport.GetViewportBounds(viewWidth, viewHeight, out int startX, out int startY, out int endX, out int endY);

            if (endX < minX || startX > maxX || endY < minY || startY > maxY)
            {
                return;
            }

            double screenX = offsetX + ((startX - minX) * scale);
            double screenY = offsetY + ((startY - minY) * scale);
            double screenW = (endX - startX + 1) * scale;
            double screenH = (endY - startY + 1) * scale;

            screenW = Math.Max(1.0, screenW);
            screenH = Math.Max(1.0, screenH);

            context.Save();
            context.SetSourceRGBA(0.92, 0.2, 0.12, 0.2);
            context.Rectangle(screenX, screenY, screenW, screenH);
            context.FillPreserve();
            context.SetSourceRGBA(0.92, 0.2, 0.12, 0.9);
            context.LineWidth = 1.0;
            context.Stroke();
            context.Restore();
        }

        private bool TryScreenToWorld(double screenX, double screenY, out int worldX, out int worldY)
        {
            worldX = 0;
            worldY = 0;

            if (_mapArea == null)
            {
                return false;
            }

            int width = _mapArea.AllocatedWidth;
            int height = _mapArea.AllocatedHeight;
            if (!TryGetMapTransform(width, height, out double minX, out double minY, out double maxX, out double maxY, out double scale, out double offsetX, out double offsetY))
            {
                return false;
            }

            double rawX = minX + ((screenX - offsetX) / scale);
            double rawY = minY + ((screenY - offsetY) / scale);

            rawX = Math.Max(minX, Math.Min(maxX, rawX));
            rawY = Math.Max(minY, Math.Min(maxY, rawY));

            worldX = (int)Math.Round(rawX);
            worldY = (int)Math.Round(rawY);
            return true;
        }

        private bool TryGetMapTransform(int width, int height, out double minX, out double minY, out double maxX, out double maxY, out double scale, out double offsetX, out double offsetY)
        {
            minX = 0;
            minY = 0;
            maxX = 0;
            maxY = 0;
            scale = 0;
            offsetX = 0;
            offsetY = 0;

            if (width <= 0 || height <= 0)
            {
                return false;
            }

            TryGetWorldBounds(out minX, out minY, out maxX, out maxY);

            double worldWidth = Math.Max(1.0, maxX - minX + 1.0);
            double worldHeight = Math.Max(1.0, maxY - minY + 1.0);

            double availableWidth = width - (MapPadding * 2.0);
            double availableHeight = height - (MapPadding * 2.0);
            if (availableWidth <= 0 || availableHeight <= 0)
            {
                return false;
            }

            scale = Math.Min(availableWidth / worldWidth, availableHeight / worldHeight);
            if (scale <= 0)
            {
                return false;
            }

            double contentWidth = worldWidth * scale;
            double contentHeight = worldHeight * scale;
            offsetX = MapPadding + ((availableWidth - contentWidth) / 2.0);
            offsetY = MapPadding + ((availableHeight - contentHeight) / 2.0);
            return true;
        }

        private bool TryGetWorldBounds(out double minX, out double minY, out double maxX, out double maxY)
        {
            bool hasBounds = false;
            minX = 0;
            minY = 0;
            maxX = 0;
            maxY = 0;

            if (_canvas?.Chunks != null)
            {
                foreach (var entry in _canvas.Chunks)
                {
                    PixelSplashCanvasChunk chunk = entry.Value;
                    if (chunk == null)
                    {
                        continue;
                    }

                    double chunkMinX = chunk.X;
                    double chunkMinY = chunk.Y;
                    double chunkMaxX = chunk.X + PixelSplashCanvasChunk.ChunkWidth - 1;
                    double chunkMaxY = chunk.Y + PixelSplashCanvasChunk.ChunkHeight - 1;
                    ExpandBounds(ref minX, ref minY, ref maxX, ref maxY, chunkMinX, chunkMinY, chunkMaxX, chunkMaxY, ref hasBounds);
                }
            }

            var references = _canvas?.References?.Objects;
            if (references != null)
            {
                foreach (var reference in references)
                {
                    if (reference == null || reference.Width == 0 || reference.Height == 0)
                    {
                        continue;
                    }

                    double refMinX = Math.Min(reference.X, reference.X + reference.Width);
                    double refMaxX = Math.Max(reference.X, reference.X + reference.Width);
                    double refMinY = Math.Min(reference.Y, reference.Y + reference.Height);
                    double refMaxY = Math.Max(reference.Y, reference.Y + reference.Height);
                    ExpandBounds(ref minX, ref minY, ref maxX, ref maxY, refMinX, refMinY, refMaxX, refMaxY, ref hasBounds);
                }
            }

            if (_targetViewport?.Viewport != null)
            {
                int viewWidth = _targetViewport.AllocatedWidth;
                int viewHeight = _targetViewport.AllocatedHeight;
                if (viewWidth > 0 && viewHeight > 0)
                {
                    _targetViewport.Viewport.GetViewportBounds(viewWidth, viewHeight, out int startX, out int startY, out int endX, out int endY);
                    ExpandBounds(ref minX, ref minY, ref maxX, ref maxY, startX, startY, endX, endY, ref hasBounds);
                }
            }

            if (!hasBounds)
            {
                minX = -(DefaultWorldSize / 2.0);
                minY = -(DefaultWorldSize / 2.0);
                maxX = minX + DefaultWorldSize - 1;
                maxY = minY + DefaultWorldSize - 1;
                return false;
            }

            const double margin = 2.0;
            minX -= margin;
            minY -= margin;
            maxX += margin;
            maxY += margin;
            return true;
        }

        private static void ExpandBounds(ref double minX, ref double minY, ref double maxX, ref double maxY, double itemMinX, double itemMinY, double itemMaxX, double itemMaxY, ref bool hasBounds)
        {
            if (!hasBounds)
            {
                minX = itemMinX;
                minY = itemMinY;
                maxX = itemMaxX;
                maxY = itemMaxY;
                hasBounds = true;
                return;
            }

            minX = Math.Min(minX, itemMinX);
            minY = Math.Min(minY, itemMinY);
            maxX = Math.Max(maxX, itemMaxX);
            maxY = Math.Max(maxY, itemMaxY);
        }

        private static void SetSourceColor(Context context, byte r, byte g, byte b, byte a)
        {
            context.SetSourceRGBA(r / 255.0, g / 255.0, b / 255.0, a / 255.0);
        }
    }
}
