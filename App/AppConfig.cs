using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;

namespace PixelSplashStudio
{
    public class AppConfig
    {
        // Default shortcut map written to config.ini on first run.
        private static readonly (string action, string shortcut)[] DefaultShortcuts =
        {
            ("file.new", "Ctrl+N"),
            ("file.open", "Ctrl+O"),
            ("file.save", "Ctrl+S"),
            ("file.save_as", "Ctrl+Shift+S"),
            ("edit.undo", "Ctrl+Z"),
            ("edit.redo", "Ctrl+Y"),
            ("edit.copy", "Ctrl+C"),
            ("edit.cut", "Ctrl+X"),
            ("edit.paste", "Ctrl+V"),
            ("view.new_viewport", "Ctrl+Shift+N"),
            ("view.toggle_tools", "Ctrl+Shift+T"),
            ("view.toggle_palette", "Ctrl+Shift+P"),
            ("tool.grab_zoom", "G"),
            ("tool.pen", "P"),
            ("tool.line", "L"),
            ("tool.rectangle", "R"),
            ("tool.oval", "O"),
            ("tool.selection", "S"),
            ("tool.selection_wand", "W"),
            ("tool.selection_oval", "Shift+S"),
            ("tool.flood_fill", "F"),
            ("tool.stamp", "T"),
            ("tool.erase", "E"),
            ("tool.reference", "Q"),
            ("selection.mode_add", "A"),
            ("selection.mode_subtract", "D"),
            ("selection.snap_pixel", "1"),
            ("selection.snap_tile", "2"),
            ("selection.copy", "Ctrl+Shift+C"),
            ("selection.export", "Ctrl+Shift+E"),
            ("selection.clear", "Ctrl+K"),
            ("selection.erase", "Ctrl+E"),
            ("shape.fill", "Shift+F"),
            ("shape.overwrite_transparent", "Shift+T"),
            ("shape.fill_secondary", "Shift+U"),
            ("stamp.overwrite", "Shift+O"),
            ("stamp.snap_pixel", "Shift+1"),
            ("stamp.snap_tile", "Shift+2"),
            ("stamp.scale_1", "1"),
            ("stamp.scale_2", "2"),
            ("stamp.scale_4", "4"),
            ("stamp.rotate_0", "0"),
            ("stamp.rotate_90", "9"),
            ("stamp.rotate_180", "8"),
            ("stamp.rotate_270", "7"),
            ("stamp.flip_x", "X"),
            ("stamp.flip_y", "Y"),
            ("erase.size_4", "Shift+1"),
            ("erase.size_8", "Shift+2"),
            ("erase.size_16", "Shift+3"),
            ("erase.shape_square", "Shift+["),
            ("erase.shape_round", "Shift+]"),
            ("reference.snap_free", "Shift+1"),
            ("reference.snap_pixel", "Shift+2"),
            ("reference.snap_tile", "Shift+3"),
            ("reference.bake", "Shift+B"),
            ("reference.delete", "Delete")
        };

        public int WindowDefaultWidth { get; set; } = 1024;
        public int WindowDefaultHeight { get; set; } = 768;
        public int WindowMinWidth { get; set; } = 1024;
        public int WindowMinHeight { get; set; } = 768;
        public int PixelGridMinSize { get; set; } = 10;
        public int TileGridSize { get; set; } = 8;
        public double ZoomDragStepPixels { get; set; } = 8.0;
        public Dictionary<string, string> Shortcuts { get; } = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        public AppConfig()
        {
            foreach (var (action, shortcut) in DefaultShortcuts)
            {
                Shortcuts[action] = shortcut;
            }
        }

        public static AppConfig Load()
        {
            AppConfig config = new AppConfig();
            string path = GetConfigPath();
            string directory = Path.GetDirectoryName(path);
            if (!string.IsNullOrEmpty(directory))
            {
                Directory.CreateDirectory(directory);
            }

            if (!File.Exists(path))
            {
                File.WriteAllText(path, config.ToIni());
                return config;
            }

            foreach (string rawLine in File.ReadAllLines(path))
            {
                string line = rawLine.Trim();
                if (line.Length == 0 || line.StartsWith("#") || line.StartsWith(";"))
                {
                    continue;
                }

                int equals = line.IndexOf('=');
                if (equals <= 0 || equals == line.Length - 1)
                {
                    continue;
                }

                string key = line.Substring(0, equals).Trim();
                string value = line.Substring(equals + 1).Trim();

                switch (key)
                {
                    case "window.default_width":
                        if (TryParseInt(value, out int defaultWidth)) config.WindowDefaultWidth = defaultWidth;
                        break;
                    case "window.default_height":
                        if (TryParseInt(value, out int defaultHeight)) config.WindowDefaultHeight = defaultHeight;
                        break;
                    case "window.min_width":
                        if (TryParseInt(value, out int minWidth)) config.WindowMinWidth = minWidth;
                        break;
                    case "window.min_height":
                        if (TryParseInt(value, out int minHeight)) config.WindowMinHeight = minHeight;
                        break;
                    case "grid.pixel_min_size":
                        if (TryParseInt(value, out int pixelMinSize)) config.PixelGridMinSize = pixelMinSize;
                        break;
                    case "grid.tile_size":
                        if (TryParseInt(value, out int tileSize)) config.TileGridSize = tileSize;
                        break;
                    case "zoom.drag_step_pixels":
                        if (TryParseDouble(value, out double zoomStep)) config.ZoomDragStepPixels = zoomStep;
                        break;
                    default:
                        if (key.StartsWith("shortcut.", StringComparison.OrdinalIgnoreCase))
                        {
                            string action = key.Substring("shortcut.".Length).Trim();
                            if (string.IsNullOrWhiteSpace(action))
                            {
                                break;
                            }

                            if (string.IsNullOrWhiteSpace(value))
                            {
                                config.Shortcuts.Remove(action);
                            }
                            else
                            {
                                config.Shortcuts[action] = value;
                            }
                        }
                        break;
                }
            }

            return config;
        }

        public string ToIni()
        {
            StringBuilder builder = new StringBuilder();
            builder.AppendLine("# Pixel Splash Studio configuration");
            builder.AppendLine("window.default_width=1024");
            builder.AppendLine("window.default_height=768");
            builder.AppendLine("window.min_width=1024");
            builder.AppendLine("window.min_height=768");
            builder.AppendLine("grid.pixel_min_size=10");
            builder.AppendLine("grid.tile_size=8");
            builder.AppendLine("zoom.drag_step_pixels=8");
            builder.AppendLine();
            builder.AppendLine("# Shortcuts");
            foreach (var (action, shortcut) in DefaultShortcuts)
            {
                builder.AppendLine($"shortcut.{action}={shortcut}");
            }
            return builder.ToString();
        }

        private static bool TryParseInt(string value, out int parsed)
        {
            return int.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out parsed);
        }

        private static bool TryParseDouble(string value, out double parsed)
        {
            return double.TryParse(value, NumberStyles.Float, CultureInfo.InvariantCulture, out parsed);
        }

        public static string GetConfigPath()
        {
            string baseDir = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
            return Path.Combine(baseDir, "pixel-splash-studio", "config.ini");
        }
    }
}
