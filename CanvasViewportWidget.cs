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
    private double _middlePanRemainderX;
    private double _middlePanRemainderY;

    public event Action<CanvasViewportWidget> DetachRequested;
    public event Action<CanvasViewportWidget> ReattachRequested;
    public event Action<CanvasViewportWidget> ToolUseStarted;
    public event Action<CanvasViewportWidget> ToolUseCompleted;
    public event Action<CanvasViewportWidget> SelectionChanged;
    public event Action<CanvasViewportWidget, bool> RectangleFillToggled;
    public event Action<CanvasViewportWidget, bool> TransparentOverwriteToggled;
    public event Action<CanvasViewportWidget, bool> FillSecondaryToggled;
    public event Action<CanvasViewportWidget> SelectionEraseRequested;
    public event Action<CanvasViewportWidget, bool> StampOverwriteToggled;
    public event Action<CanvasViewportWidget> ClearSelectionRequested;
    public event Action<CanvasViewportWidget, SelectionMode> SelectionModeChanged;
    public event Action<CanvasViewportWidget, SelectionSnapMode> SelectionSnapModeChanged;
    public event Action<CanvasViewportWidget, StampRotation> StampRotationChanged;
    public event Action<CanvasViewportWidget, bool> StampFlipXToggled;
    public event Action<CanvasViewportWidget, bool> StampFlipYToggled;
    public event Action<CanvasViewportWidget> SelectionCopyRequested;
    public event Action<CanvasViewportWidget> SelectionExportRequested;
    public event Action<CanvasViewportWidget, int> StampScaleChanged;
    public event Action<CanvasViewportWidget, SelectionSnapMode> StampSnapModeChanged;
    public event Action<CanvasViewportWidget, int, int> ReferenceAddTextRequested;
    public event Action<CanvasViewportWidget, int, int> ReferenceAddImageRequested;
    public event Action<CanvasViewportWidget> ReferenceDeleteRequested;

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
    public void SetFillUsesSecondary(bool enabled)
    {
        if (_activeTool is RectangleTool rectTool)
        {
            rectTool.FillUsesSecondary = enabled;
        }
        else if (_activeTool is OvalTool ovalTool)
        {
            ovalTool.FillUsesSecondary = enabled;
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
        else if (_activeTool is SelectionWandTool wandTool)
        {
            wandTool.Mode = mode;
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
        else if (_activeTool is SelectionWandTool wandTool)
        {
            wandTool.SnapMode = snapMode;
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

    /// <summary>
    /// CALL DOWN: Parent calls this to update viewport state without triggering events.
    /// </summary>
    public void SetEraseSize(int size)
    {
        if (_activeTool is EraseTool eraseTool)
        {
            eraseTool.Size = size;
        }
    }

    /// <summary>
    /// CALL DOWN: Parent calls this to update viewport state without triggering events.
    /// </summary>
    public void SetEraseShape(EraseBrushShape shape)
    {
        if (_activeTool is EraseTool eraseTool)
        {
            eraseTool.Shape = shape;
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
        AddEvents((int)(EventMask.ButtonPressMask | EventMask.ButtonReleaseMask | EventMask.PointerMotionMask | EventMask.ScrollMask | EventMask.EnterNotifyMask | EventMask.LeaveNotifyMask | EventMask.KeyPressMask));
        ButtonPressEvent += CanvasViewportWidget_ButtonPressEvent;
        ButtonReleaseEvent += CanvasViewportWidget_ButtonReleaseEvent;
        MotionNotifyEvent += CanvasViewportWidget_MotionNotifyEvent;
        ScrollEvent += CanvasViewportWidget_ScrollEvent;
        EnterNotifyEvent += CanvasViewportWidget_EnterNotifyEvent;
        LeaveNotifyEvent += CanvasViewportWidget_LeaveNotifyEvent;
        KeyPressEvent += CanvasViewportWidget_KeyPressEvent;
    }

    private void CanvasViewportWidget_ButtonPressEvent(object o, ButtonPressEventArgs args)
    {
        bool hasSelection = _viewport?.Selection?.HasSelection ?? false;
        bool ctrlDown = (args.Event.State & ModifierType.ControlMask) != 0;

        if (args.Event.Button == 3)
        {
            ShowDetachMenu(args.Event);
            return;
        }

        if (args.Event.Button == 2)
        {
            _middlePanning = true;
            _middlePanLastX = args.Event.X;
            _middlePanLastY = args.Event.Y;
            _middlePanRemainderX = 0;
            _middlePanRemainderY = 0;
            GrabFocus();
            return;
        }

        if (_toolManager == null || args.Event.Button != 1)
        {
            return;
        }

        bool primary = !(hasSelection && ctrlDown);

        if (ShouldRecordHistory())
        {
            _historyPending = true;
            ToolUseStarted?.Invoke(this);
        }

        GrabFocus();
        UpdateGrabToolViewSize();
        GetToolCoordinates((int)args.Event.X, (int)args.Event.Y, out int toolX, out int toolY);
        UpdateCursorPosition((int)args.Event.X, (int)args.Event.Y);
        _toolManager.BeginUseTool(primary, toolX, toolY);
    }

    private void CanvasViewportWidget_ButtonReleaseEvent(object o, ButtonReleaseEventArgs args)
    {
        if (args.Event.Button == 2)
        {
            _middlePanning = false;
            return;
        }

        bool hasSelection = _viewport?.Selection?.HasSelection ?? false;
        bool ctrlDown = (args.Event.State & ModifierType.ControlMask) != 0;

        if (args.Event.Button == 1)
        {
            GetToolCoordinates((int)args.Event.X, (int)args.Event.Y, out int toolX, out int toolY);
            UpdateCursorPosition((int)args.Event.X, (int)args.Event.Y);
            bool primary = !(hasSelection && ctrlDown);
            _toolManager?.EndUseTool(primary, toolX, toolY);
            if (_historyPending)
            {
                _historyPending = false;
                ToolUseCompleted?.Invoke(this);
            }

            if (_toolManager?.ActiveTool is SelectionRectangleTool ||
                _toolManager?.ActiveTool is SelectionOvalTool ||
                _toolManager?.ActiveTool is SelectionWandTool)
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

        if (_toolManager.ActiveTool is EraseTool eraseTool && (args.Event.State & ModifierType.Button1Mask) == 0)
        {
            GetToolCoordinates((int)args.Event.X, (int)args.Event.Y, out int previewX, out int previewY);
            eraseTool.UpdatePreview(previewX, previewY);
            QueueDraw();
            return;
        }

        UpdateGrabToolViewSize();
        GetToolCoordinates((int)args.Event.X, (int)args.Event.Y, out int toolX, out int toolY);
        _toolManager.UseTool(toolX, toolY);
        QueueDraw();
    }

    private void CanvasViewportWidget_KeyPressEvent(object o, KeyPressEventArgs args)
    {
        if ((args.Event.State & ModifierType.ControlMask) == 0)
        {
            return;
        }

        if (args.Event.Key == Gdk.Key.c || args.Event.Key == Gdk.Key.C)
        {
            if (_viewport?.Selection?.HasSelection ?? false)
            {
                SelectionCopyRequested?.Invoke(this);
                args.RetVal = true;
            }
        }
    }

    private void CanvasViewportWidget_EnterNotifyEvent(object o, EnterNotifyEventArgs args)
    {
        _cursorVisible = true;
        if (_activeTool is ReferenceTransformTool)
        {
            if (Window != null)
            {
                Window.Cursor = null;
            }
        }
        else
        {
            EnsureCrosshairCursor();
        }
        if (_activeTool is EraseTool eraseTool)
        {
            GetToolCoordinates((int)args.Event.X, (int)args.Event.Y, out int previewX, out int previewY);
            eraseTool.UpdatePreview(previewX, previewY);
        }
        UpdateCursorPosition((int)args.Event.X, (int)args.Event.Y);
    }

    private void CanvasViewportWidget_LeaveNotifyEvent(object o, LeaveNotifyEventArgs args)
    {
        _cursorVisible = false;
        if (Window != null)
        {
            Window.Cursor = null;
        }
        if (_activeTool is EraseTool eraseTool)
        {
            eraseTool.ClearPreview();
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

        if (_activeTool != null)
        {
            context.Save();
            _activeTool.DrawPreview(context, _viewport);
            context.Restore();
        }

        if (!(_activeTool is ReferenceTransformTool))
        {
            DrawVirtualCursor(context);
        }
    }

    private bool ShouldRecordHistory()
    {
        return _toolManager?.ActiveTool is PenTool ||
               _toolManager?.ActiveTool is LineTool ||
               _toolManager?.ActiveTool is RectangleTool ||
               _toolManager?.ActiveTool is OvalTool ||
               _toolManager?.ActiveTool is FloodFillTool ||
               _toolManager?.ActiveTool is EraseTool ||
               (_toolManager?.ActiveTool is StampTool stampTool && stampTool.CanStamp);
    }

    private void HandleToolPreviewChanged()
    {
        QueueDraw();
    }

    private void DrawVirtualCursor(Context context)
    {
        if (!_cursorVisible || _viewport == null)
        {
            return;
        }

        _viewport.WorldToScreen(_cursorWorldX, _cursorWorldY, AllocatedWidth, AllocatedHeight, out double screenX, out double screenY);
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

    private void ShowDetachMenu(EventButton evt)
    {
        Menu menu = new Menu();
        ScreenToWorld((int)evt.X, (int)evt.Y, out int worldX, out int worldY);
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

        menu.Append(new SeparatorMenuItem());
        MenuItem addReferenceText = new MenuItem("Add Reference Text...");
        addReferenceText.Activated += (_, __) => ReferenceAddTextRequested?.Invoke(this, worldX, worldY);
        menu.Append(addReferenceText);

        MenuItem addReferenceImage = new MenuItem("Add Reference Image...");
        addReferenceImage.Activated += (_, __) => ReferenceAddImageRequested?.Invoke(this, worldX, worldY);
        menu.Append(addReferenceImage);

        bool hasReferenceSelection = _viewport?.References?.Selected != null;
        if (hasReferenceSelection)
        {
            menu.Append(new SeparatorMenuItem());
            MenuItem deleteReference = new MenuItem("Delete Reference");
            deleteReference.Activated += (_, __) => ReferenceDeleteRequested?.Invoke(this);
            menu.Append(deleteReference);
        }

        bool hasSelection = _viewport?.Selection?.HasSelection ?? false;
        if (hasSelection)
        {
            menu.Append(new SeparatorMenuItem());
            MenuItem clearSelection = new MenuItem("Clear Selection");
            clearSelection.Activated += (_, __) => ClearSelectionRequested?.Invoke(this);
            menu.Append(clearSelection);
            MenuItem eraseSelection = new MenuItem("Erase Selection");
            eraseSelection.Activated += (_, __) => SelectionEraseRequested?.Invoke(this);
            menu.Append(eraseSelection);
        }

        bool addedOptions = false;
        if (_activeTool is RectangleTool rectangleTool)
        {
            menu.Append(new SeparatorMenuItem());
            AppendShapeOptions(menu, rectangleTool.Fill, rectangleTool.OverwriteTransparent, rectangleTool.FillUsesSecondary);
            addedOptions = true;
        }
        else if (_activeTool is OvalTool ovalTool)
        {
            menu.Append(new SeparatorMenuItem());
            AppendShapeOptions(menu, ovalTool.Fill, ovalTool.OverwriteTransparent, ovalTool.FillUsesSecondary);
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
        else if (_activeTool is SelectionWandTool selectionWandTool)
        {
            menu.Append(new SeparatorMenuItem());
            AppendSelectionOptions(menu, selectionWandTool.Mode, selectionWandTool.SnapMode);
            addedOptions = true;
        }
        else if (_activeTool is SelectionOvalTool selectionOvalTool)
        {
            menu.Append(new SeparatorMenuItem());
            AppendSelectionOptions(menu, selectionOvalTool.Mode, selectionOvalTool.SnapMode);
            addedOptions = true;
        }

        menu.ShowAll();
        menu.PopupAtPointer(evt);
    }

    private void AppendShapeOptions(Menu menu, bool isFilled, bool overwriteTransparent, bool fillSecondary)
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

        CheckMenuItem fillSecondaryItem = new CheckMenuItem("Use Secondary Fill")
        {
            Active = fillSecondary
        };
        fillSecondaryItem.Toggled += (_, __) => FillSecondaryToggled?.Invoke(this, fillSecondaryItem.Active);

        menu.Append(fillItem);
        menu.Append(overwriteItem);
        menu.Append(fillSecondaryItem);
    }

    private void AppendSelectionOptions(Menu menu, SelectionMode mode, SelectionSnapMode snapMode)
    {
        MenuItem copyItem = new MenuItem("Copy Selection");
        copyItem.Activated += (_, __) => SelectionCopyRequested?.Invoke(this);
        menu.Append(copyItem);

        MenuItem exportItem = new MenuItem("Export Selection");
        exportItem.Activated += (_, __) => SelectionExportRequested?.Invoke(this);
        menu.Append(exportItem);

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

        _viewport.GetViewportBounds(AllocatedWidth, AllocatedHeight, out int startX, out int startY, out _, out _);
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

        if (_activeTool is ReferenceTransformTool)
        {
            Window.Cursor = null;
            return;
        }

        if (_crosshairCursor == null)
        {
            Display display = Window?.Display ?? Display.Default;
            _crosshairCursor = new Cursor(display, CursorType.Crosshair);
        }

        Window.Cursor = _crosshairCursor;
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

        _middlePanRemainderX += deltaX / _viewport.PixelSize;
        _middlePanRemainderY += deltaY / _viewport.PixelSize;
        int worldDeltaX = (int)Math.Truncate(_middlePanRemainderX);
        int worldDeltaY = (int)Math.Truncate(_middlePanRemainderY);
        _middlePanRemainderX -= worldDeltaX;
        _middlePanRemainderY -= worldDeltaY;

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
