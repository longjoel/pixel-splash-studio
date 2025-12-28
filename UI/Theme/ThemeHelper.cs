using System;
using Gdk;
using Gtk;

namespace PixelSplashStudio
{
    internal static class ThemeHelper
    {
        private static readonly RGBA DarkBackgroundColor = new RGBA
        {
            Red = 0.082f,
            Green = 0.090f,
            Blue = 0.106f,
            Alpha = 1f
        };

        public static void ApplyWindowBackground(Widget widget)
        {
            if (widget == null)
            {
                return;
            }

            try
            {
#pragma warning disable 0612
                widget.OverrideBackgroundColor(StateFlags.Normal, DarkBackgroundColor);
                widget.OverrideBackgroundColor(StateFlags.Active, DarkBackgroundColor);
                widget.OverrideBackgroundColor(StateFlags.Prelight, DarkBackgroundColor);
#pragma warning restore 0612
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Failed to apply background color: {ex.Message}");
            }
        }
    }
}
