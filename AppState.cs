using System;
using pixel_splash_studio;

namespace pixel_splash_studio
{
    /// <summary>
    /// Centralized application state for coordinating between UI components.
    /// Children signal UP via events, parents call DOWN via methods.
    /// </summary>
    public class AppState
    {
        // ========== TOOL STATE ==========
        public ToolMode ActiveTool { get; private set; } = ToolMode.GrabZoom;
        public event Action<ToolMode> ActiveToolChanged;

        public void SetActiveTool(ToolMode tool)
        {
            if (ActiveTool != tool)
            {
                ActiveTool = tool;
                ActiveToolChanged?.Invoke(tool);
            }
        }

        // ========== RECTANGLE OPTIONS ==========
        public bool RectangleFillEnabled { get; private set; }
        public event Action<bool> RectangleFillEnabledChanged;

        public void SetRectangleFill(bool enabled)
        {
            if (RectangleFillEnabled != enabled)
            {
                RectangleFillEnabled = enabled;
                RectangleFillEnabledChanged?.Invoke(enabled);
            }
        }

        // ========== SELECTION OPTIONS ==========
        public SelectionMode SelectionMode { get; private set; } = SelectionMode.Add;
        public event Action<SelectionMode> SelectionModeChanged;

        public void SetSelectionMode(SelectionMode mode)
        {
            if (SelectionMode != mode)
            {
                SelectionMode = mode;
                SelectionModeChanged?.Invoke(mode);
            }
        }

        public SelectionSnapMode SelectionSnapMode { get; private set; } = SelectionSnapMode.Pixel;
        public event Action<SelectionSnapMode> SelectionSnapModeChanged;

        public void SetSelectionSnapMode(SelectionSnapMode snapMode)
        {
            if (SelectionSnapMode != snapMode)
            {
                SelectionSnapMode = snapMode;
                SelectionSnapModeChanged?.Invoke(snapMode);
            }
        }

        // ========== TRANSPARENCY/OVERWRITE OPTIONS ==========
        public bool TransparentOverwriteEnabled { get; private set; }
        public event Action<bool> TransparentOverwriteEnabledChanged;

        public void SetTransparentOverwrite(bool enabled)
        {
            if (TransparentOverwriteEnabled != enabled)
            {
                TransparentOverwriteEnabled = enabled;
                TransparentOverwriteEnabledChanged?.Invoke(enabled);
            }
        }

        public bool StampOverwriteEnabled { get; private set; }
        public event Action<bool> StampOverwriteEnabledChanged;

        public void SetStampOverwrite(bool enabled)
        {
            if (StampOverwriteEnabled != enabled)
            {
                StampOverwriteEnabled = enabled;
                StampOverwriteEnabledChanged?.Invoke(enabled);
            }
        }

        // ========== STAMP OPTIONS ==========
        public StampRotation StampRotation { get; private set; } = StampRotation.Deg0;
        public event Action<StampRotation> StampRotationChanged;

        public void SetStampRotation(StampRotation rotation)
        {
            if (StampRotation != rotation)
            {
                StampRotation = rotation;
                StampRotationChanged?.Invoke(rotation);
            }
        }

        public bool StampFlipX { get; private set; }
        public event Action<bool> StampFlipXChanged;

        public void SetStampFlipX(bool flipX)
        {
            if (StampFlipX != flipX)
            {
                StampFlipX = flipX;
                StampFlipXChanged?.Invoke(flipX);
            }
        }

        public bool StampFlipY { get; private set; }
        public event Action<bool> StampFlipYChanged;

        public void SetStampFlipY(bool flipY)
        {
            if (StampFlipY != flipY)
            {
                StampFlipY = flipY;
                StampFlipYChanged?.Invoke(flipY);
            }
        }

        public int StampScale { get; private set; } = 1;
        public event Action<int> StampScaleChanged;

        public void SetStampScale(int scale)
        {
            if (StampScale != scale)
            {
                StampScale = scale;
                StampScaleChanged?.Invoke(scale);
            }
        }

        public SelectionSnapMode StampSnapMode { get; private set; } = SelectionSnapMode.Pixel;
        public event Action<SelectionSnapMode> StampSnapModeChanged;

        public void SetStampSnapMode(SelectionSnapMode snapMode)
        {
            if (StampSnapMode != snapMode)
            {
                StampSnapMode = snapMode;
                StampSnapModeChanged?.Invoke(snapMode);
            }
        }
    }
}
