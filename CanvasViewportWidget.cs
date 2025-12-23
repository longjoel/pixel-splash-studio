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
    private bool _cursorVisible;
    private int _cursorWorldX;
    private int _cursorWorldY;
    private Cursor _crosshairCursor;
    private bool _middlePanning;
    private double _middlePanLastX;
    private double _middlePanLastY;

    public event Action<CanvasViewportWidget> DetachRequested;
    public event Action<CanvasViewportWidget> ReattachRequested;
    public event Action<CanvasViewportWidget> ToolUseStarted;
    public event Action<CanvasViewportWidget> ToolUseCompleted;
    public event Action<CanvasViewportWidget> SelectionChanged;
    public event Action<CanvasViewportWidget, bool> RectangleFillToggled;
    public event Action<CanvasViewportWidget, bool> TransparentOverwriteToggled;
    public event Action<CanvasViewportWidget, bool> StampOverwriteToggled;
    public event Action<CanvasViewportWidget> ClearSelectionRequested;
    public event Action<CanvasViewportWidget, SelectionMode> SelectionModeChanged;
    public event Action<CanvasViewportWidget, SelectionSnapMode> SelectionSnapModeChanged;
    public event Action<CanvasViewportWidget, StampRotation> StampRotationChanged;
    public event Action<CanvasViewportWidget, bool> StampFlipXToggled;
    public event Action<CanvasViewportWidget, bool> StampFlipYToggled;
    public event Action<CanvasViewportWidget> SelectionCopyRequested;
    public event Action<CanvasViewportWidget, int> StampScaleChanged;
    public event Action<CanvasViewportWidget, SelectionSnapMode> StampSnapModeChanged;

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

    /// <summary>
    /// CALL DOWN: Parent calls this to update viewport state without triggering events.
    /// </summary>
    public void SetRectangleFill(bool enabled)
    {
        if (_activeTool is RectangleTool rectTool)
        {
            rectTool.Fill = enabled;
        }
        else if (_activeTool is OvalTool ovalTool)
        {
            ovalTool.Fill = enabled;
        }
    }

    /// <summary>
    /// CALL DOWN: Parent calls this to update viewport state without triggering events.
    /// </summary>
    public void SetTransparentOverwrite(bool enabled)
    {
        if (_activeTool is RectangleTool rectTool)
        {
            rectTool.OverwriteTransparent = enabled;
        }
        else if (_activeTool is OvalTool ovalTool)
        {
            ovalTool.OverwriteTransparent = enabled;
        }
    }

    /// <summary>
    /// CALL DOWN: Parent calls this to update viewport state without triggering events.
    /// </summary>
    public void SetSelectionMode(SelectionMode mode)
    {
        if (_activeTool is SelectionRectangleTool rectSelTool)
        {
            rectSelTool.Mode = mode;
        }
        else if (_activeTool is SelectionOvalTool ovalSelTool)
        {
            ovalSelTool.Mode = mode;
        }
    }

    /// <summary>
    /// CALL DOWN: Parent calls this to update viewport state without triggering events.
    /// </summary>
    public void SetSelectionSnapMode(SelectionSnapMode snapMode)
    {
        if (_activeTool is SelectionRectangleTool rectSelTool)
        {
            rectSelTool.SnapMode = snapMode;
        }
        else if (_activeTool is SelectionOvalTool ovalSelTool)
        {
            ovalSelTool.SnapMode = snapMode;
        }
    }

    /// <summary>
    /// CALL DOWN: Parent calls this to update viewport state without triggering events.
    /// </summary>
    public void SetStampOverwrite(bool enabled)
    {
        if (_activeTool is StampTool stampTool)
        {
            stampTool.OverwriteDestination = enabled;
        }
    }

    /// <summary>
    /// CALL DOWN: Parent calls this to update viewport state without triggering events.
    /// </summary>
    public void SetStampRotation(StampRotation rotation)
    {
        if (_activeTool is StampTool stampTool)
        {
            stampTool.Rotation = rotation;
        }
    }

    /// <summary>
    /// CALL DOWN: Parent calls this to update viewport state without triggering events.
    /// </summary>
    public void SetStampFlip(bool flipX, bool flipY)
    {
        if (_activeTool is StampTool stampTool)
        {
            stampTool.FlipX = flipX;
            stampTool.FlipY = flipY;
        }
    }

    /// <summary>
    /// CALL DOWN: Parent calls this to update viewport state without triggering events.
    /// </summary>
    public void SetStampScale(int scale)
    {
        if (_activeTool is StampTool stampTool)
        {
            stampTool.Scale = scale;
        }
    }

    /// <summary>
    /// CALL DOWN: Parent calls this to update viewport state without triggering events.
    /// </summary>
    public void SetStampSnapMode(SelectionSnapMode snapMode)
    {
        if (_activeTool is StampTool stampTool)
        {
            stampTool.SnapMode = snapMode;
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
        AddEvents((int)(EventMask.ButtonPressMask | EventMask.ButtonReleaseMask | EventMask.PointerMotionMask | EventMask.ScrollMask | EventMask.EnterNotifyMask | EventMask.LeaveNotifyMask));
        ButtonPressEvent += CanvasViewportWidget_ButtonPressEvent;
        ButtonReleaseEvent += CanvasViewportWidget_ButtonReleaseEvent;
        MotionNotifyEvent += CanvasViewportWidget_MotionNotifyEvent;
        ScrollEvent += CanvasViewportWidget_ScrollEvent;
        EnterNotifyEvent += CanvasViewportWidget_EnterNotifyEvent;
        LeaveNotifyEvent += CanvasViewportWidget_LeaveNotifyEvent;
    }

    private void CanvasViewportWidget_ButtonPressEvent(object o, ButtonPressEventArgs args)
    {
        if (args.Event.Button == 3 && (args.Event.State & ModifierType.ControlMask) != 0)
        {
            ShowDetachMenu(args.Event);
            return;
        }

        if (args.Event.Button == 2)
        {
            _middlePanning = true;
            _middlePanLastX = args.Event.X;
            _middlePanLastY = args.Event.Y;
            GrabFocus();
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
        UpdateGrabToolViewSize();
        GetToolCoordinates((int)args.Event.X, (int)args.Event.Y, out int toolX, out int toolY);
        UpdateCursorPosition((int)args.Event.X, (int)args.Event.Y);
        bool primary = args.Event.Button == 1;
        _toolManager.BeginUseTool(primary, toolX, toolY);
    }

    private void CanvasViewportWidget_ButtonReleaseEvent(object o, ButtonReleaseEventArgs args)
    {
        if (args.Event.Button == 2)
        {
            _middlePanning = false;
            return;
        }

        if (args.Event.Button == 1 || args.Event.Button == 3)
        {
            GetToolCoordinates((int)args.Event.X, (int)args.Event.Y, out int toolX, out int toolY);
            UpdateCursorPosition((int)args.Event.X, (int)args.Event.Y);
            bool primary = args.Event.Button == 1;
            _toolManager?.EndUseTool(primary, toolX, toolY);
            if (_historyPending)
            {
                _historyPending = false;
                ToolUseCompleted?.Invoke(this);
            }

            if (_toolManager?.ActiveTool is SelectionRectangleTool || _toolManager?.ActiveTool is SelectionOvalTool)
            {
                SelectionChanged?.Invoke(this);
            }
        }
    }

    private void CanvasViewportWidget_MotionNotifyEvent(object o, MotionNotifyEventArgs args)
    {
        UpdateCursorPosition((int)args.Event.X, (int)args.Event.Y);

        if (_toolManager == null || !HasFocus)
        {
            return;
        }

        if (_middlePanning)
        {
            PanViewportByScreenDelta(args.Event.X, args.Event.Y);
            return;
        }

        if ((_toolManager.ActiveTool is PenTool || _toolManager.ActiveTool is LineTool || _toolManager.ActiveTool is RectangleTool || _toolManager.ActiveTool is OvalTool) &&
            (args.Event.State & ModifierType.Button1Mask) == 0)
        {
            return;
        }

        UpdateGrabToolViewSize();
        GetToolCoordinates((int)args.Event.X, (int)args.Event.Y, out int toolX, out int toolY);
        _toolManager.UseTool(toolX, toolY);
        QueueDraw();
    }

    private void CanvasViewportWidget_EnterNotifyEvent(object o, EnterNotifyEventArgs args)
    {
        _cursorVisible = true;
        EnsureCrosshairCursor();
        UpdateCursorPosition((int)args.Event.X, (int)args.Event.Y);
    }

    private void CanvasViewportWidget_LeaveNotifyEvent(object o, LeaveNotifyEventArgs args)
    {
        _cursorVisible = false;
        if (Window != null)
        {
            Window.Cursor = null;
        }
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

        ZoomViewportAt((int)args.Event.X, (int)args.Event.Y, delta);
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
            if (points.Count > 0)
            {
                Tuple<byte, byte, byte, byte> color = penTool.PreviewColor;
                double alpha = (color.Item4 / 255.0) * 0.4;
                context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, alpha);

                if (points.Count == 1)
                {
                    DrawPreviewPixel(context, points[0].Item1, points[0].Item2);
                }
                else
                {
                    for (int i = 1; i < points.Count; i++)
                    {
                        (int startX, int startY) = points[i - 1];
                        (int endX, int endY) = points[i];
                        foreach ((int px, int py) in LineRasterizer.Rasterize(startX, startY, endX, endY))
                        {
                            DrawPreviewPixel(context, px, py);
                        }
                    }
                }
            }
        }
        else if (_activeTool is LineTool lineTool && lineTool.HasPreview)
        {
            lineTool.GetPreviewLine(out int startX, out int startY, out int endX, out int endY);
            Tuple<byte, byte, byte, byte> color = lineTool.PreviewColor;
            double alpha = (color.Item4 / 255.0) * 0.4;
            context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, alpha);
            foreach ((int px, int py) in LineRasterizer.Rasterize(startX, startY, endX, endY))
            {
                DrawPreviewPixel(context, px, py);
            }
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
        else if (_activeTool is StampTool stampTool && stampTool.HasPreview)
        {
            if (_viewport?.Palette == null)
            {
                return;
            }

            if (!stampTool.TryGetPreviewPixels(out List<(int x, int y, byte colorIndex)> pixels))
            {
                return;
            }

            HashSet<(int, int)> previewPixels = new HashSet<(int, int)>();
            for (int i = 0; i < pixels.Count; i++)
            {
                (int worldX, int worldY, byte colorIndex) = pixels[i];
                if (_viewport.Selection?.HasSelection == true && !_viewport.Selection.IsSelected(worldX, worldY))
                {
                    continue;
                }
                int paletteIndex = colorIndex;
                if (paletteIndex < 0 || paletteIndex >= _viewport.Palette.Palette.Count)
                {
                    continue;
                }

                Tuple<byte, byte, byte, byte> color = _viewport.Palette.Palette[paletteIndex];
                double alpha = (color.Item4 / 255.0) * 0.4;
                context.SetSourceRGBA(color.Item1 / 255.0, color.Item2 / 255.0, color.Item3 / 255.0, alpha);
                DrawPreviewPixel(context, worldX, worldY);
                previewPixels.Add((worldX, worldY));
            }

            if (previewPixels.Count == 0)
            {
                return;
            }

            double dashOffset = GetMarchingAntsOffset();
            context.LineWidth = 1.0;

            context.SetSourceRGBA(0, 0, 0, 1);
            context.SetDash(new double[] { 4, 4 }, dashOffset);
            DrawStampOutline(context, previewPixels);
            context.Stroke();

            context.SetSourceRGBA(1, 1, 1, 1);
            context.SetDash(new double[] { 4, 4 }, dashOffset + 4);
            DrawStampOutline(context, previewPixels);
            context.Stroke();
        }

        DrawVirtualCursor(context);
    }

    private void DrawStampOutline(Context context, HashSet<(int, int)> pixels)
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

            WorldToScreen(x, y, out double screenX, out double screenY);
            double x0 = screenX + 0.5;
            double y0 = screenY + 0.5;
            double x1 = screenX + _viewport.PixelSize + 0.5;
            double y1 = screenY + _viewport.PixelSize + 0.5;

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

    private bool ShouldRecordHistory()
    {
        return _toolManager?.ActiveTool is PenTool ||
               _toolManager?.ActiveTool is LineTool ||
               _toolManager?.ActiveTool is RectangleTool ||
               _toolManager?.ActiveTool is OvalTool ||
               _toolManager?.ActiveTool is FloodFillTool ||
               (_toolManager?.ActiveTool is StampTool stampTool && stampTool.CanStamp);
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

    private void DrawVirtualCursor(Context context)
    {
        if (!_cursorVisible || _viewport == null)
        {
            return;
        }

        WorldToScreen(_cursorWorldX, _cursorWorldY, out double screenX, out double screenY);
        double x0 = screenX + 0.5;
        double y0 = screenY + 0.5;
        double size = _viewport.PixelSize;

        context.LineWidth = 1.0;
        context.SetSourceRGBA(0, 0, 0, 1);
        context.Rectangle(x0, y0, size, size);
        context.Stroke();

        context.SetSourceRGBA(1, 1, 1, 1);
        context.Rectangle(x0 + 1, y0 + 1, Math.Max(0, size - 2), Math.Max(0, size - 2));
        context.Stroke();
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

        bool addedOptions = false;
        if (_activeTool is RectangleTool rectangleTool)
        {
            menu.Append(new SeparatorMenuItem());
            AppendShapeOptions(menu, rectangleTool.Fill, rectangleTool.OverwriteTransparent);
            addedOptions = true;
        }
        else if (_activeTool is OvalTool ovalTool)
        {
            menu.Append(new SeparatorMenuItem());
            AppendShapeOptions(menu, ovalTool.Fill, ovalTool.OverwriteTransparent);
            addedOptions = true;
        }
        else if (_activeTool is StampTool stampTool)
        {
            menu.Append(new SeparatorMenuItem());
            AppendStampOptions(menu, stampTool);
            addedOptions = true;
        }
        else if (_activeTool is SelectionRectangleTool selectionTool)
        {
            menu.Append(new SeparatorMenuItem());
            AppendSelectionOptions(menu, selectionTool.Mode, selectionTool.SnapMode);
            addedOptions = true;
        }
        else if (_activeTool is SelectionOvalTool selectionOvalTool)
        {
            menu.Append(new SeparatorMenuItem());
            AppendSelectionOptions(menu, selectionOvalTool.Mode, selectionOvalTool.SnapMode);
            addedOptions = true;
        }

        if (_viewport?.Selection?.HasSelection ?? false)
        {
            if (!addedOptions)
            {
                menu.Append(new SeparatorMenuItem());
            }

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

    private void AppendSelectionOptions(Menu menu, SelectionMode mode, SelectionSnapMode snapMode)
    {
        MenuItem copyItem = new MenuItem("Copy Selection");
        copyItem.Activated += (_, __) => SelectionCopyRequested?.Invoke(this);
        menu.Append(copyItem);
        menu.Append(new SeparatorMenuItem());

        RadioMenuItem addItem = new RadioMenuItem("Add to Selection")
        {
            Active = mode == SelectionMode.Add
        };
        RadioMenuItem subtractItem = new RadioMenuItem(addItem, "Subtract from Selection")
        {
            Active = mode == SelectionMode.Subtract
        };

        addItem.Toggled += (_, __) =>
        {
            if (addItem.Active)
            {
                SelectionModeChanged?.Invoke(this, SelectionMode.Add);
            }
        };
        subtractItem.Toggled += (_, __) =>
        {
            if (subtractItem.Active)
            {
                SelectionModeChanged?.Invoke(this, SelectionMode.Subtract);
            }
        };

        menu.Append(addItem);
        menu.Append(subtractItem);

        menu.Append(new SeparatorMenuItem());

        RadioMenuItem snapPixelItem = new RadioMenuItem("Snap to Pixels")
        {
            Active = snapMode == SelectionSnapMode.Pixel
        };
        RadioMenuItem snapTileItem = new RadioMenuItem(snapPixelItem, "Snap to Tiles")
        {
            Active = snapMode == SelectionSnapMode.Tile
        };

        snapPixelItem.Toggled += (_, __) =>
        {
            if (snapPixelItem.Active)
            {
                SelectionSnapModeChanged?.Invoke(this, SelectionSnapMode.Pixel);
            }
        };
        snapTileItem.Toggled += (_, __) =>
        {
            if (snapTileItem.Active)
            {
                SelectionSnapModeChanged?.Invoke(this, SelectionSnapMode.Tile);
            }
        };

        menu.Append(snapPixelItem);
        menu.Append(snapTileItem);
    }

    private void AppendStampOptions(Menu menu, StampTool stampTool)
    {
        CheckMenuItem overwriteItem = new CheckMenuItem("Overwrite Destination")
        {
            Active = stampTool.OverwriteDestination
        };
        overwriteItem.Toggled += (_, __) => StampOverwriteToggled?.Invoke(this, overwriteItem.Active);
        menu.Append(overwriteItem);

        menu.Append(new SeparatorMenuItem());

        RadioMenuItem snapPixelItem = new RadioMenuItem("Snap to Pixels")
        {
            Active = stampTool.SnapMode == SelectionSnapMode.Pixel
        };
        RadioMenuItem snapTileItem = new RadioMenuItem(snapPixelItem, "Snap to Tiles")
        {
            Active = stampTool.SnapMode == SelectionSnapMode.Tile
        };
        snapPixelItem.Toggled += (_, __) =>
        {
            if (snapPixelItem.Active)
            {
                StampSnapModeChanged?.Invoke(this, SelectionSnapMode.Pixel);
            }
        };
        snapTileItem.Toggled += (_, __) =>
        {
            if (snapTileItem.Active)
            {
                StampSnapModeChanged?.Invoke(this, SelectionSnapMode.Tile);
            }
        };
        menu.Append(snapPixelItem);
        menu.Append(snapTileItem);

        menu.Append(new SeparatorMenuItem());

        RadioMenuItem scale1Item = new RadioMenuItem("Scale 1x")
        {
            Active = stampTool.Scale <= 1
        };
        RadioMenuItem scale2Item = new RadioMenuItem(scale1Item, "Scale 2x")
        {
            Active = stampTool.Scale == 2
        };
        RadioMenuItem scale4Item = new RadioMenuItem(scale1Item, "Scale 4x")
        {
            Active = stampTool.Scale == 4
        };

        scale1Item.Toggled += (_, __) =>
        {
            if (scale1Item.Active)
            {
                StampScaleChanged?.Invoke(this, 1);
            }
        };
        scale2Item.Toggled += (_, __) =>
        {
            if (scale2Item.Active)
            {
                StampScaleChanged?.Invoke(this, 2);
            }
        };
        scale4Item.Toggled += (_, __) =>
        {
            if (scale4Item.Active)
            {
                StampScaleChanged?.Invoke(this, 4);
            }
        };

        menu.Append(scale1Item);
        menu.Append(scale2Item);
        menu.Append(scale4Item);

        menu.Append(new SeparatorMenuItem());

        RadioMenuItem rotate0Item = new RadioMenuItem("Rotate 0°")
        {
            Active = stampTool.Rotation == StampRotation.Deg0
        };
        RadioMenuItem rotate90Item = new RadioMenuItem(rotate0Item, "Rotate 90°")
        {
            Active = stampTool.Rotation == StampRotation.Deg90
        };
        RadioMenuItem rotate180Item = new RadioMenuItem(rotate0Item, "Rotate 180°")
        {
            Active = stampTool.Rotation == StampRotation.Deg180
        };
        RadioMenuItem rotate270Item = new RadioMenuItem(rotate0Item, "Rotate 270°")
        {
            Active = stampTool.Rotation == StampRotation.Deg270
        };

        rotate0Item.Toggled += (_, __) =>
        {
            if (rotate0Item.Active)
            {
                StampRotationChanged?.Invoke(this, StampRotation.Deg0);
            }
        };
        rotate90Item.Toggled += (_, __) =>
        {
            if (rotate90Item.Active)
            {
                StampRotationChanged?.Invoke(this, StampRotation.Deg90);
            }
        };
        rotate180Item.Toggled += (_, __) =>
        {
            if (rotate180Item.Active)
            {
                StampRotationChanged?.Invoke(this, StampRotation.Deg180);
            }
        };
        rotate270Item.Toggled += (_, __) =>
        {
            if (rotate270Item.Active)
            {
                StampRotationChanged?.Invoke(this, StampRotation.Deg270);
            }
        };

        menu.Append(rotate0Item);
        menu.Append(rotate90Item);
        menu.Append(rotate180Item);
        menu.Append(rotate270Item);

        menu.Append(new SeparatorMenuItem());

        CheckMenuItem flipXItem = new CheckMenuItem("Flip X")
        {
            Active = stampTool.FlipX
        };
        CheckMenuItem flipYItem = new CheckMenuItem("Flip Y")
        {
            Active = stampTool.FlipY
        };
        flipXItem.Toggled += (_, __) => StampFlipXToggled?.Invoke(this, flipXItem.Active);
        flipYItem.Toggled += (_, __) => StampFlipYToggled?.Invoke(this, flipYItem.Active);

        menu.Append(flipXItem);
        menu.Append(flipYItem);
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

        GetViewportBounds(out int startX, out int startY, out _, out _);
        worldX = startX + (int)Math.Floor(screenX / (double)_viewport.PixelSize);
        worldY = startY + (int)Math.Floor(screenY / (double)_viewport.PixelSize);
    }

    private void UpdateCursorPosition(int screenX, int screenY)
    {
        if (_viewport == null)
        {
            return;
        }

        ScreenToWorld(screenX, screenY, out int worldX, out int worldY);
        if (worldX == _cursorWorldX && worldY == _cursorWorldY && _cursorVisible)
        {
            return;
        }

        _cursorWorldX = worldX;
        _cursorWorldY = worldY;
        _cursorVisible = true;
        QueueDraw();
    }

    private void EnsureCrosshairCursor()
    {
        if (Window == null)
        {
            return;
        }

        if (_crosshairCursor == null)
        {
            Display display = Window?.Display ?? Display.Default;
            _crosshairCursor = new Cursor(display, CursorType.Crosshair);
        }

        Window.Cursor = _crosshairCursor;
    }

    private void WorldToScreen(int worldX, int worldY, out double screenX, out double screenY)
    {
        screenX = 0;
        screenY = 0;

        if (_viewport == null || _viewport.PixelSize <= 0 || AllocatedWidth <= 0 || AllocatedHeight <= 0)
        {
            return;
        }

        GetViewportBounds(out int startX, out int startY, out _, out _);
        screenX = (worldX - startX) * _viewport.PixelSize;
        screenY = (worldY - startY) * _viewport.PixelSize;
    }

    private void GetViewportBounds(out int startX, out int startY, out int endX, out int endY)
    {
        startX = 0;
        startY = 0;
        endX = 0;
        endY = 0;

        if (_viewport == null || _viewport.PixelSize <= 0 || AllocatedWidth <= 0 || AllocatedHeight <= 0)
        {
            return;
        }

        double viewWidth = AllocatedWidth;
        double viewHeight = AllocatedHeight;
        int viewportPixelWidth = (int)Math.Ceiling(viewWidth / _viewport.PixelSize);
        int viewportPixelHeight = (int)Math.Ceiling(viewHeight / _viewport.PixelSize);

        startX = _viewport.CameraPixelX - (viewportPixelWidth / 2);
        startY = _viewport.CameraPixelY - (viewportPixelHeight / 2);
        endX = startX + viewportPixelWidth - 1;
        endY = startY + viewportPixelHeight - 1;
    }

    private void UpdateGrabToolViewSize()
    {
        if (_activeTool is GrabAndZoomTool grabTool && AllocatedWidth > 0 && AllocatedHeight > 0)
        {
            grabTool.SetViewSize(AllocatedWidth, AllocatedHeight);
        }
    }

    private void PanViewportByScreenDelta(double screenX, double screenY)
    {
        if (_viewport == null || _viewport.PixelSize <= 0)
        {
            return;
        }

        double deltaX = screenX - _middlePanLastX;
        double deltaY = screenY - _middlePanLastY;
        _middlePanLastX = screenX;
        _middlePanLastY = screenY;

        int worldDeltaX = (int)Math.Round(deltaX / _viewport.PixelSize);
        int worldDeltaY = (int)Math.Round(deltaY / _viewport.PixelSize);

        if (worldDeltaX != 0 || worldDeltaY != 0)
        {
            _viewport.Pan(-worldDeltaX, -worldDeltaY);
            QueueDraw();
        }
    }

    private void ZoomViewportAt(int screenX, int screenY, int deltaPixelSize)
    {
        if (_viewport == null || AllocatedWidth <= 0 || AllocatedHeight <= 0)
        {
            return;
        }

        int oldSize = _viewport.PixelSize;
        int nextSize = oldSize + deltaPixelSize;
        if (nextSize < 1)
        {
            nextSize = 1;
        }

        if (nextSize == oldSize)
        {
            return;
        }

        double worldX = _viewport.CameraPixelX - (AllocatedWidth / (2.0 * oldSize)) + (screenX / (double)oldSize);
        double worldY = _viewport.CameraPixelY - (AllocatedHeight / (2.0 * oldSize)) + (screenY / (double)oldSize);

        double newCameraX = worldX + (AllocatedWidth / (2.0 * nextSize)) - (screenX / (double)nextSize);
        double newCameraY = worldY + (AllocatedHeight / (2.0 * nextSize)) - (screenY / (double)nextSize);

        _viewport.SetPixelSize(nextSize);
        _viewport.SetCamera((int)Math.Round(newCameraX), (int)Math.Round(newCameraY));
    }
}
