using System;
using Gtk;

namespace pixel_splash_studio
{
    class Program
    {
        private static CssProvider _appCssProvider;

        [STAThread]
        public static void Main(string[] args)
        {
            Application.Init();
            ApplyDarkTheme();

            var app = new Application("org.pixel_splash_studio.pixel_splash_studio", GLib.ApplicationFlags.None);
            app.Register(GLib.Cancellable.Current);

            AppConfig config = AppConfig.Load();
            var win = new MainWindow(config);
            app.AddWindow(win);

            win.Show();
            Application.Run();
        }

        private static void ApplyDarkTheme()
        {
            try
            {
                var settings = Gtk.Settings.Default;
                if (settings != null)
                {
                    settings.SetProperty("gtk-application-prefer-dark-theme", new GLib.Value(true));
                }

                var screen = Gdk.Screen.Default;
                if (screen == null)
                {
                    return;
                }

                _appCssProvider = new CssProvider();
                _appCssProvider.LoadFromData(@"
                    window,
                    GtkWindow,
                    .background,
                    .view {
                        background-color: #15171b;
                        color: #f2f2f2;
                    }

                    drawingarea {
                        background-color: #15171b;
                    }

                    label {
                        color: #e2e5ec;
                        padding: 2px 4px;
                        margin: 2px 0;
                    }

                    button,
                    togglebutton,
                    checkbutton,
                    radiobutton {
                        padding: 6px 10px;
                        margin: 4px 0;
                        border-radius: 6px;
                        border: 1px solid #2b2f38;
                        background-color: #1f222a;
                        color: #f2f2f2;
                    }

                    button:hover,
                    togglebutton:hover,
                    checkbutton:hover,
                    radiobutton:hover {
                        background-color: #272b35;
                    }

                    button:focus,
                    togglebutton:focus,
                    checkbutton:focus,
                    radiobutton:focus {
                        box-shadow: 0 0 0 1px #5ab0ff;
                    }

                    .tool-button {
                        text-align: left;
                    }

                    .tool-button-active {
                        background-color: #305b8a;
                        border-color: #5ab0ff;
                        box-shadow: inset 0 0 0 1px rgba(90, 176, 255, 0.45);
                    }
                ");

                StyleContext.AddProviderForScreen(screen, _appCssProvider, (uint)StyleProviderPriority.Application);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Failed to apply dark theme: {ex.Message}");
            }
        }
    }
}
