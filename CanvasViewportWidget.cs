using System;
using System.Collections.Generic;
using Cairo;
using Gdk;
using Gtk;

public class CanvasViewportWidget : DrawingArea
{
    private CanvasViewport _viewport;
    private ToolManager _toolManager;
    private ITool _activeTool;
    private bool _historyPending;

    public event Action<CanvasViewportWidget> DetachRequested;
    public event Action<CanvasViewportWidget> ReattachRequested;
    public event Action<CanvasViewportWidget> ToolUseStarted;
    public event Action<CanvasViewportWidget> ToolUseCompleted;
    public event Action<CanvasViewportWidget, bool> RectangleFillToggled;
    public event Action<CanvasViewportWidget, bool> TransparentOverwriteToggled;
    public event Action<CanvasViewportWidget> ClearSelectionRequested;

    public CanvasViewport Viewport => _viewport;

    public CanvasViewportWidget(PixelSplashCanvas canvas, PixelSplashPalette palette, CanvasViewportSettings settings = null)
    {
        Bind(canvas, palette, settings);
        ConfigureInput();
        Drawn += CanvasViewportWidget_Drawn;
    }

    public CanvasViewportWidget()
    {
        ConfigureInput();
        Drawn += CanvasViewportWidget_Drawn;
    }

    public void Bind(PixelSplashCanvas canvas, PixelSplashPalette palette, CanvasViewportSettings settings = null)
    {
        if (canvas == null || palette == null)
        {
            _viewport = null;
            _toolManager = null;
            _activeTool = null;
            QueueDraw();
            return;
        }

        _viewport = new CanvasViewport(canvas, palette, settings ?? new CanvasViewportSettings());
        _toolManager = new ToolManager(new GrabAndZoomTool(_viewport));
        SetActiveTool(_toolManager.ActiveTool);
        QueueDraw();
    }

    public void SetActiveTool(ITool tool)
    {
        if (_activeTool != null)
        {
            _activeTool.PreviewChanged -= HandleToolPreviewChanged;
            _activeTool = null;
        }

        _toolManager?.SetActiveTool(tool);

        if (tool != null)
        {
            _activeTool = tool;
            _activeTool.PreviewChanged += HandleToolPreviewChanged;
        }
    }

    private void CanvasViewportWidget_Drawn(object sender, DrawnArgs args)
    {
        _viewport?.RenderViewport(args.Cr);
        DrawToolOverlay(args.Cr);
    }

    private void ConfigureInput()
    {
        CanFocus = true;
        AddEvents((int)(EventMask.ButtonPressMask | EventMask.ButtonReleaseMask | EventMask.PointerMotionMask | EventMask.ScrollMask));
        ButtonPressEvent += CanvasViewportWidget_ButtonPressEvent;
        ButtonReleaseEvent += CanvasViewportWidget_ButtonReleaseEvent;
        MotionNotifyEvent += CanvasViewportWidget_MotionNotifyEvent;
        ScrollEvent += CanvasViewportWidget_ScrollEvent;
    }

    private void CanvasViewportWidget_ButtonPressEvent(object o, ButtonPressEventArgs args)
    {
        if (args.Event.Button == 3 && (args.Event.State & ModifierType.ControlMask) != 0)
        {
            ShowDetachMenu(args.Event);
            return;
        }

        if (_toolManager == null || (args.Event.Button != 1 && args.Event.Button != 3))
        {
            return;
        }

        if (ShouldRecordHistory())
        {
            _historyPending = true;
            ToolUseStarted?.Invoke(this);
        }

        GrabFocus();
        GetToolCoordinates((int)args.Event.X, (int)args.Event.Y, out int toolX, out int toolY);
        bool primary = args.Event.Button == 1;
        _toolManager.BeginUseTool(primary, toolX, toolY);
    }

    private void CanvasViewportWidget_ButtonReleaseEvent(object o, ButtonReleaseEventArgs args)
    {
        if (args.Event.Button == 1 || args.Event.Button == 3)
        {
            GetToolCoordinates((int)args.Event.X, (int)args.Event.Y, out int toolX, out int toolY);
            bool primary = args.Event.Button == 1;
            _toolManager?.EndUseTool(primary, toolX, toolY);
            if (_historyPending)
            {
                _historyPending = false;
                ToolUseCompleted?.Invoke(this);
            }
        }
    }

    private void CanvasViewportWidget_MotionNotifyEvent(object o, MotionNotifyEventArgs args)
    {
        if (_toolManager == null || !HasFocus)
        {
            return;
        }

        if ((_toolManager.ActiveTool is PenTool || _toolManager.ActiveTool is LineTool || _toolManager.ActiveTool is RectangleTool || _toolManager.ActiveTool is OvalTool) &&
            (args.Event.State & ModifierType.Button1Mask) == 0)
        {
            return;
        }

        GetToolCoordinates((int)args.Event.X, (int)args.Event.Y, out int toolX, out int toolY);
        _toolManager.UseTool(toolX, toolY);
        QueueDraw();
    }

    private void CanvasViewportWidget_ScrollEvent(object o, ScrollEventArgs args)
    {
        if (_toolManager == null || !HasFocus)
        {
            return;
        }

        int delta = 0;
        if (args.Event.Direction == ScrollDirection.Up)
        {
            delta = 1;
        }
        else if (args.Event.Direction == ScrollDirection.Down)
        {
            delta = -1;
        }
        else if (args.Event.Direction == ScrollDirection.Smooth)
        {
            delta = args.Event.DeltaY < 0 ? 1 : -1;
        }

        if (delta == 0)
        {
            return;
        }

        _toolManager.ZoomAt((int)args.Event.X, (int)args.Event.Y, delta, AllocatedWidth, AllocatedHeight);
        QueueDraw();
    }

    private void DrawToolOverlay(Context context)
    {
        if (_viewport == null || _viewport.PixelSize <= 0 || AllocatedWidth <= 0 || AllocatedHeight <= 0)
        {
            return;
        }

        if (_activeTool is PenTool penTool)
        {
            IReadOnlyList<(int, int)> points = penTool.PreviewPoints;
            if (points.Count == 0)
            {
                return;
            }

            Tuple<byte, byte, byte, byte> color = penTool.PreviewColor;
            double alpha = (color.Item4 / 255.0) * 0.4;
            context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, alpha);
            context.LineWidth = _viewport.PixelSize;
            context.LineCap = LineCap.Square;
            context.LineJoin = LineJoin.Miter;

            if (points.Count == 1)
            {
                WorldToScreen(points[0].Item1, points[0].Item2, out double screenX, out double screenY);
                context.Rectangle(screenX, screenY, _viewport.PixelSize, _viewport.PixelSize);
                context.Fill();
                return;
            }

            WorldToScreen(points[0].Item1, points[0].Item2, out double startX, out double startY);
            context.MoveTo(startX + (_viewport.PixelSize / 2.0), startY + (_viewport.PixelSize / 2.0));

            for (int i = 1; i < points.Count; i++)
            {
                WorldToScreen(points[i].Item1, points[i].Item2, out double nextX, out double nextY);
                context.LineTo(nextX + (_viewport.PixelSize / 2.0), nextY + (_viewport.PixelSize / 2.0));
            }

            context.Stroke();
        }
        else if (_activeTool is LineTool lineTool && lineTool.HasPreview)
        {
            lineTool.GetPreviewLine(out int startX, out int startY, out int endX, out int endY);
            Tuple<byte, byte, byte, byte> color = lineTool.PreviewColor;
            double alpha = (color.Item4 / 255.0) * 0.4;
            context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, alpha);
            context.LineWidth = _viewport.PixelSize;
            context.LineCap = LineCap.Square;
            context.LineJoin = LineJoin.Miter;

            WorldToScreen(startX, startY, out double screenStartX, out double screenStartY);
            WorldToScreen(endX, endY, out double screenEndX, out double screenEndY);
            context.MoveTo(screenStartX + (_viewport.PixelSize / 2.0), screenStartY + (_viewport.PixelSize / 2.0));
            context.LineTo(screenEndX + (_viewport.PixelSize / 2.0), screenEndY + (_viewport.PixelSize / 2.0));
            context.Stroke();
        }
        else if (_activeTool is RectangleTool rectangleTool && rectangleTool.HasPreview)
        {
            rectangleTool.GetPreviewRect(out int startX, out int startY, out int endX, out int endY, out bool fill);
            Tuple<byte, byte, byte, byte> outlineColor = rectangleTool.OutlinePreviewColor;
            Tuple<byte, byte, byte, byte> fillColor = rectangleTool.FillPreviewColor;

            int minX = Math.Min(startX, endX);
            int maxX = Math.Max(startX, endX);
            int minY = Math.Min(startY, endY);
            int maxY = Math.Max(startY, endY);

            if (fill)
            {
                double fillAlpha = (fillColor.Item4 / 255.0) * 0.4;
                context.SetSourceRGBA(fillColor.Item1 / 255.0, fillColor.Item2 / 255.0, fillColor.Item3 / 255.0, fillAlpha);
                WorldToScreen(minX, minY, out double screenX, out double screenY);
                double width = (maxX - minX + 1) * _viewport.PixelSize;
                double height = (maxY - minY + 1) * _viewport.PixelSize;
                context.Rectangle(screenX, screenY, width, height);
                context.Fill();
            }

            double outlineAlpha = (outlineColor.Item4 / 255.0) * 0.4;
            context.SetSourceRGBA(outlineColor.Item1 / 255.0, outlineColor.Item2 / 255.0, outlineColor.Item3 / 255.0, outlineAlpha);

            for (int x = minX; x <= maxX; x++)
            {
                DrawPreviewPixel(context, x, minY);
                DrawPreviewPixel(context, x, maxY);
            }

            for (int y = minY + 1; y <= maxY - 1; y++)
            {
                DrawPreviewPixel(context, minX, y);
                DrawPreviewPixel(context, maxX, y);
            }
        }
        else if (_activeTool is OvalTool ovalTool && ovalTool.HasPreview)
        {
            ovalTool.GetPreviewRect(out int startX, out int startY, out int endX, out int endY, out bool fill);
            Tuple<byte, byte, byte, byte> outlineColor = ovalTool.OutlinePreviewColor;
            Tuple<byte, byte, byte, byte> fillColor = ovalTool.FillPreviewColor;

            int minX = Math.Min(startX, endX);
            int maxX = Math.Max(startX, endX);
            int minY = Math.Min(startY, endY);
            int maxY = Math.Max(startY, endY);

            GetEllipseMetrics(minX, maxX, minY, maxY, out double centerX, out double centerY, out double rx, out double ry);

            if (fill)
            {
                double fillAlpha = (fillColor.Item4 / 255.0) * 0.4;
                context.SetSourceRGBA(fillColor.Item1 / 255.0, fillColor.Item2 / 255.0, fillColor.Item3 / 255.0, fillAlpha);

                for (int y = minY; y <= maxY; y++)
                {
                    for (int x = minX; x <= maxX; x++)
                    {
                        if (IsInsideEllipse(x, y, centerX, centerY, rx, ry))
                        {
                            DrawPreviewPixel(context, x, y);
                        }
                    }
                }
            }

            double outlineAlpha = (outlineColor.Item4 / 255.0) * 0.4;
            context.SetSourceRGBA(outlineColor.Item1 / 255.0, outlineColor.Item2 / 255.0, outlineColor.Item3 / 255.0, outlineAlpha);

            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    if (!IsInsideEllipse(x, y, centerX, centerY, rx, ry))
                    {
                        continue;
                    }

                    if (!IsInsideEllipse(x + 1, y, centerX, centerY, rx, ry) ||
                        !IsInsideEllipse(x - 1, y, centerX, centerY, rx, ry) ||
                        !IsInsideEllipse(x, y + 1, centerX, centerY, rx, ry) ||
                        !IsInsideEllipse(x, y - 1, centerX, centerY, rx, ry))
                    {
                        DrawPreviewPixel(context, x, y);
                    }
                }
            }
        }
        else if (_activeTool is SelectionRectangleTool selectionTool && selectionTool.HasPreview)
        {
            selectionTool.GetPreviewRect(out int startX, out int startY, out int endX, out int endY, out bool isAdd);

            int minX = Math.Min(startX, endX);
            int maxX = Math.Max(startX, endX);
            int minY = Math.Min(startY, endY);
            int maxY = Math.Max(startY, endY);

            WorldToScreen(minX, minY, out double screenX, out double screenY);
            double width = (maxX - minX + 1) * _viewport.PixelSize;
            double height = (maxY - minY + 1) * _viewport.PixelSize;

            double dashOffset = GetMarchingAntsOffset();
            context.LineWidth = 1.0;

            context.SetSourceRGBA(0, 0, 0, 1);
            context.SetDash(new double[] { 4, 4 }, dashOffset);
            context.Rectangle(screenX + 0.5, screenY + 0.5, width, height);
            context.Stroke();

            context.SetSourceRGBA(1, 1, 1, 1);
            context.SetDash(new double[] { 4, 4 }, dashOffset + 4);
            context.Rectangle(screenX + 0.5, screenY + 0.5, width, height);
            context.Stroke();
        }
        else if (_activeTool is SelectionOvalTool selectionOvalTool && selectionOvalTool.HasPreview)
        {
            selectionOvalTool.GetPreviewRect(out int startX, out int startY, out int endX, out int endY, out bool isAdd);

            int minX = Math.Min(startX, endX);
            int maxX = Math.Max(startX, endX);
            int minY = Math.Min(startY, endY);
            int maxY = Math.Max(startY, endY);

            GetEllipseMetrics(minX, maxX, minY, maxY, out double centerX, out double centerY, out double rx, out double ry);

            double alpha = isAdd ? 0.4 : 0.45;
            if (isAdd)
            {
                context.SetSourceRGBA(0.9, 0.9, 0.9, alpha);
            }
            else
            {
                context.SetSourceRGBA(0.9, 0.6, 0.6, alpha);
            }

            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    if (IsInsideEllipse(x, y, centerX, centerY, rx, ry))
                    {
                        DrawPreviewPixel(context, x, y);
                    }
                }
            }
        }
    }

    private bool ShouldRecordHistory()
    {
        return _toolManager?.ActiveTool is PenTool ||
               _toolManager?.ActiveTool is LineTool ||
               _toolManager?.ActiveTool is RectangleTool ||
               _toolManager?.ActiveTool is OvalTool ||
               _toolManager?.ActiveTool is FloodFillTool;
    }

    private void HandleToolPreviewChanged()
    {
        QueueDraw();
    }

    private void DrawPreviewPixel(Context context, int worldX, int worldY)
    {
        WorldToScreen(worldX, worldY, out double screenX, out double screenY);
        context.Rectangle(screenX, screenY, _viewport.PixelSize, _viewport.PixelSize);
        context.Fill();
    }

    private static void GetEllipseMetrics(int minX, int maxX, int minY, int maxY, out double centerX, out double centerY, out double rx, out double ry)
    {
        double width = maxX - minX + 1;
        double height = maxY - minY + 1;
        rx = width / 2.0;
        ry = height / 2.0;
        centerX = minX + rx;
        centerY = minY + ry;
    }

    private static bool IsInsideEllipse(int x, int y, double centerX, double centerY, double rx, double ry)
    {
        double dx = (x + 0.5) - centerX;
        double dy = (y + 0.5) - centerY;
        double nx = (dx * dx) / (rx * rx);
        double ny = (dy * dy) / (ry * ry);
        return (nx + ny) <= 1.0;
    }

    private static double GetMarchingAntsOffset()
    {
        double ms = DateTime.UtcNow.TimeOfDay.TotalMilliseconds;
        return (ms / 100.0) % 8.0;
    }

    private void ShowDetachMenu(EventButton evt)
    {
        Menu menu = new Menu();
        if (Parent is Gtk.Window)
        {
            MenuItem reattachItem = new MenuItem("Reattach Viewport");
            reattachItem.Activated += (sender, args) => ReattachRequested?.Invoke(this);
            menu.Append(reattachItem);
        }
        else
        {
            MenuItem detachItem = new MenuItem("Detach Viewport");
            detachItem.Activated += (sender, args) => DetachRequested?.Invoke(this);
            menu.Append(detachItem);
        }

        if (_activeTool is RectangleTool rectangleTool)
        {
            menu.Append(new SeparatorMenuItem());
            AppendShapeOptions(menu, rectangleTool.Fill, rectangleTool.OverwriteTransparent);
        }
        else if (_activeTool is OvalTool ovalTool)
        {
            menu.Append(new SeparatorMenuItem());
            AppendShapeOptions(menu, ovalTool.Fill, ovalTool.OverwriteTransparent);
        }
        else if (_activeTool is SelectionRectangleTool || _activeTool is SelectionOvalTool || (_viewport?.Selection?.HasSelection ?? false))
        {
            menu.Append(new SeparatorMenuItem());
            MenuItem clearSelection = new MenuItem("Clear Selection");
            clearSelection.Activated += (_, __) => ClearSelectionRequested?.Invoke(this);
            menu.Append(clearSelection);
        }

        menu.ShowAll();
        menu.PopupAtPointer(evt);
    }

    private void AppendShapeOptions(Menu menu, bool isFilled, bool overwriteTransparent)
    {
        CheckMenuItem fillItem = new CheckMenuItem("Fill Shape")
        {
            Active = isFilled
        };
        fillItem.Toggled += (_, __) => RectangleFillToggled?.Invoke(this, fillItem.Active);

        CheckMenuItem overwriteItem = new CheckMenuItem("Overwrite Transparent Pixels")
        {
            Active = overwriteTransparent
        };
        overwriteItem.Toggled += (_, __) => TransparentOverwriteToggled?.Invoke(this, overwriteItem.Active);

        menu.Append(fillItem);
        menu.Append(overwriteItem);
    }

    private void GetToolCoordinates(int screenX, int screenY, out int toolX, out int toolY)
    {
        if (_toolManager?.ActiveTool is GrabAndZoomTool)
        {
            toolX = screenX;
            toolY = screenY;
            return;
        }

        ScreenToWorld(screenX, screenY, out toolX, out toolY);
    }

    private void ScreenToWorld(int screenX, int screenY, out int worldX, out int worldY)
    {
        worldX = 0;
        worldY = 0;

        if (_viewport == null || _viewport.PixelSize <= 0 || AllocatedWidth <= 0 || AllocatedHeight <= 0)
        {
            return;
        }

        double viewWidth = AllocatedWidth;
        double viewHeight = AllocatedHeight;

        double worldXDouble = _viewport.CameraPixelX - (viewWidth / (2.0 * _viewport.PixelSize)) + (screenX / (double)_viewport.PixelSize);
        double worldYDouble = _viewport.CameraPixelY - (viewHeight / (2.0 * _viewport.PixelSize)) + (screenY / (double)_viewport.PixelSize);

        worldX = (int)Math.Floor(worldXDouble);
        worldY = (int)Math.Floor(worldYDouble);
    }

    private void WorldToScreen(int worldX, int worldY, out double screenX, out double screenY)
    {
        screenX = 0;
        screenY = 0;

        if (_viewport == null || _viewport.PixelSize <= 0 || AllocatedWidth <= 0 || AllocatedHeight <= 0)
        {
            return;
        }

        double viewWidth = AllocatedWidth;
        double viewHeight = AllocatedHeight;

        screenX = ((worldX - _viewport.CameraPixelX) * _viewport.PixelSize) + (viewWidth / 2.0);
        screenY = ((worldY - _viewport.CameraPixelY) * _viewport.PixelSize) + (viewHeight / 2.0);
    }
}
