using Gtk;

namespace pixel_splash_studio
{
    class FloatingPaletteWidget : Gtk.Window
    {
        public FloatingPaletteWidget(PalettePanelWidget palettePanel) : base(WindowType.Toplevel)
        {
            Title = "Palette";
            SetDefaultSize(360, 360);
            ThemeHelper.ApplyWindowBackground(this);
            Add(palettePanel);
        }
    }
}
