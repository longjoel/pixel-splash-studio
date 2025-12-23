using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;

public class AppConfig
{
    public int WindowDefaultWidth { get; set; } = 1024;
    public int WindowDefaultHeight { get; set; } = 768;
    public int WindowMinWidth { get; set; } = 1024;
    public int WindowMinHeight { get; set; } = 768;
    public int PixelGridMinSize { get; set; } = 10;
    public int TileGridSize { get; set; } = 8;
    public double ZoomDragStepPixels { get; set; } = 8.0;

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
