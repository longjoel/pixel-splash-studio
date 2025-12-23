using System;
using Gtk;

namespace pixel_splash_studio
{
    class Program
    {
        [STAThread]
        public static void Main(string[] args)
        {
            Application.Init();

            var app = new Application("org.pixel_splash_studio.pixel_splash_studio", GLib.ApplicationFlags.None);
            app.Register(GLib.Cancellable.Current);

            AppConfig config = AppConfig.Load();
            var win = new MainWindow(config);
            app.AddWindow(win);

            win.Show();
            Application.Run();
        }
    }
}
