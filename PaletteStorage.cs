using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text.Json;

namespace pixel_splash_studio
{
    public static class PaletteStorage
    {
        private const int PaletteSize = 256;

        public static string GetLibraryPath()
        {
            string configPath = AppConfig.GetConfigPath();
            string directory = Path.GetDirectoryName(configPath);
            if (string.IsNullOrEmpty(directory))
            {
                directory = Environment.CurrentDirectory;
            }

            return Path.Combine(directory, "palettes.json");
        }

        public static PaletteLibraryData LoadLibrary(PixelSplashPalette defaultPalette)
        {
            string path = GetLibraryPath();
            string directory = Path.GetDirectoryName(path);
            if (!string.IsNullOrEmpty(directory))
            {
                Directory.CreateDirectory(directory);
            }

            if (!File.Exists(path))
            {
                PaletteLibraryData created = CreateDefaultLibrary(defaultPalette);
                SaveLibrary(created);
                return created;
            }

            try
            {
                string json = File.ReadAllText(path);
                PaletteLibraryData library = JsonSerializer.Deserialize<PaletteLibraryData>(json) ?? new PaletteLibraryData();
                NormalizeLibrary(library, defaultPalette);
                return library;
            }
            catch
            {
                PaletteLibraryData fallback = CreateDefaultLibrary(defaultPalette);
                SaveLibrary(fallback);
                return fallback;
            }
        }

        public static void SaveLibrary(PaletteLibraryData library)
        {
            string json = JsonSerializer.Serialize(library, new JsonSerializerOptions
            {
                WriteIndented = true
            });
            File.WriteAllText(GetLibraryPath(), json);
        }

        public static PaletteFileData LoadPaletteFile(string path)
        {
            string extension = Path.GetExtension(path)?.ToLowerInvariant();
            if (extension == ".pspal")
            {
                string json = File.ReadAllText(path);
                PaletteFileData data = JsonSerializer.Deserialize<PaletteFileData>(json) ?? new PaletteFileData();
                data.Colors = NormalizeColors(data.Colors);
                return data;
            }

            if (extension == ".gpl")
            {
                return new PaletteFileData
                {
                    Name = Path.GetFileNameWithoutExtension(path),
                    Colors = NormalizeColors(ParseGimpPalette(path))
                };
            }

            if (extension == ".pal")
            {
                return new PaletteFileData
                {
                    Name = Path.GetFileNameWithoutExtension(path),
                    Colors = NormalizeColors(ParseJascPalette(path))
                };
            }

            throw new InvalidOperationException("Unsupported palette format.");
        }

        public static void SavePaletteFile(string path, PaletteFileData data)
        {
            string json = JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                WriteIndented = true
            });
            File.WriteAllText(path, json);
        }

        public static List<PaletteColorData> ToColorData(List<Tuple<byte, byte, byte, byte>> colors)
        {
            List<PaletteColorData> result = new List<PaletteColorData>();
            if (colors == null)
            {
                return result;
            }

            for (int i = 0; i < colors.Count; i++)
            {
                var color = colors[i];
                result.Add(new PaletteColorData
                {
                    R = color.Item1,
                    G = color.Item2,
                    B = color.Item3,
                    A = color.Item4
                });
            }

            return result;
        }

        public static List<Tuple<byte, byte, byte, byte>> ToTupleColors(List<PaletteColorData> colors)
        {
            List<Tuple<byte, byte, byte, byte>> result = new List<Tuple<byte, byte, byte, byte>>();
            if (colors == null)
            {
                return result;
            }

            for (int i = 0; i < colors.Count; i++)
            {
                PaletteColorData color = colors[i];
                result.Add(new Tuple<byte, byte, byte, byte>(color.R, color.G, color.B, color.A));
            }

            return result;
        }

        public static List<PaletteColorData> NormalizeColors(List<PaletteColorData> colors)
        {
            List<PaletteColorData> normalized = new List<PaletteColorData>();
            if (colors != null)
            {
                normalized.AddRange(colors);
            }

            if (normalized.Count == 0)
            {
                normalized.Add(new PaletteColorData { R = 0, G = 0, B = 0, A = 0 });
            }

            if (normalized.Count > PaletteSize)
            {
                normalized.RemoveRange(PaletteSize, normalized.Count - PaletteSize);
            }

            while (normalized.Count < PaletteSize)
            {
                normalized.Add(new PaletteColorData { R = 0, G = 0, B = 0, A = 0 });
            }

            return normalized;
        }

        private static void NormalizeLibrary(PaletteLibraryData library, PixelSplashPalette defaultPalette)
        {
            if (library.Palettes == null)
            {
                library.Palettes = new List<PaletteEntryData>();
            }

            for (int i = 0; i < library.Palettes.Count; i++)
            {
                PaletteEntryData entry = library.Palettes[i];
                if (entry == null)
                {
                    continue;
                }

                entry.Colors = NormalizeColors(entry.Colors);
                if (string.IsNullOrWhiteSpace(entry.Name))
                {
                    entry.Name = $"Palette {i + 1}";
                }
            }

            if (library.Palettes.Count == 0)
            {
                PaletteLibraryData created = CreateDefaultLibrary(defaultPalette);
                library.Palettes = created.Palettes;
                library.SelectedName = created.SelectedName;
            }

            bool hasSelected = !string.IsNullOrWhiteSpace(library.SelectedName)
                && library.Palettes.Exists(p => p.Name == library.SelectedName);
            if (!hasSelected)
            {
                library.SelectedName = library.Palettes[0].Name;
            }
        }

        private static PaletteLibraryData CreateDefaultLibrary(PixelSplashPalette defaultPalette)
        {
            PaletteLibraryData library = new PaletteLibraryData();
            PaletteEntryData nesEntry = new PaletteEntryData
            {
                Name = "NES",
                Colors = NormalizeColors(ToColorData(defaultPalette?.Palette))
            };
            library.Palettes.Add(nesEntry);
            library.Palettes.Add(new PaletteEntryData
            {
                Name = "SNES",
                Colors = NormalizeColors(ToColorData(BuildPalette(SnesPalette)))
            });
            library.Palettes.Add(new PaletteEntryData
            {
                Name = "Genesis",
                Colors = NormalizeColors(ToColorData(BuildPalette(GenesisPalette)))
            });
            library.Palettes.Add(new PaletteEntryData
            {
                Name = "Commodore 64",
                Colors = NormalizeColors(ToColorData(BuildPalette(C64Palette)))
            });
            library.Palettes.Add(new PaletteEntryData
            {
                Name = "VIC-20",
                Colors = NormalizeColors(ToColorData(BuildPalette(Vic20Palette)))
            });
            library.Palettes.Add(new PaletteEntryData
            {
                Name = "DOS 16",
                Colors = NormalizeColors(ToColorData(BuildPalette(Dos16Palette)))
            });
            library.SelectedName = nesEntry.Name;
            return library;
        }

        private static List<Tuple<byte, byte, byte, byte>> BuildPalette(byte[] colors)
        {
            List<Tuple<byte, byte, byte, byte>> result = new List<Tuple<byte, byte, byte, byte>>();
            if (colors == null || colors.Length == 0)
            {
                return result;
            }

            for (int i = 0; i + 2 < colors.Length; i += 3)
            {
                result.Add(new Tuple<byte, byte, byte, byte>(colors[i], colors[i + 1], colors[i + 2], 255));
            }

            return result;
        }

        private static readonly byte[] Dos16Palette = new byte[]
        {
            0, 0, 0,
            0, 0, 170,
            0, 170, 0,
            0, 170, 170,
            170, 0, 0,
            170, 0, 170,
            170, 85, 0,
            170, 170, 170,
            85, 85, 85,
            85, 85, 255,
            85, 255, 85,
            85, 255, 255,
            255, 85, 85,
            255, 85, 255,
            255, 255, 85,
            255, 255, 255
        };

        private static readonly byte[] C64Palette = new byte[]
        {
            0, 0, 0,
            255, 255, 255,
            136, 0, 0,
            170, 255, 238,
            204, 68, 204,
            0, 204, 85,
            0, 0, 170,
            238, 238, 119,
            221, 136, 85,
            102, 68, 0,
            255, 119, 119,
            51, 51, 51,
            119, 119, 119,
            170, 255, 102,
            0, 136, 255,
            187, 187, 187
        };

        private static readonly byte[] Vic20Palette = new byte[]
        {
            0, 0, 0,
            255, 255, 255,
            120, 41, 42,
            139, 190, 184,
            121, 44, 135,
            80, 127, 57,
            63, 46, 141,
            191, 206, 114,
            121, 72, 32,
            84, 51, 0,
            188, 105, 98,
            75, 75, 75,
            112, 112, 112,
            154, 215, 106,
            108, 94, 181,
            159, 159, 159
        };

        private static readonly byte[] GenesisPalette = new byte[]
        {
            0, 0, 0,
            36, 36, 36,
            109, 36, 36,
            36, 73, 36,
            36, 36, 109,
            109, 109, 36,
            109, 36, 109,
            36, 109, 109,
            182, 109, 36,
            109, 182, 36,
            36, 109, 182,
            109, 36, 182,
            182, 182, 182,
            255, 109, 109,
            109, 255, 109,
            109, 109, 255
        };

        private static readonly byte[] SnesPalette = new byte[]
        {
            0, 0, 0,
            248, 248, 248,
            248, 120, 120,
            120, 248, 120,
            120, 120, 248,
            248, 248, 120,
            248, 120, 248,
            120, 248, 248,
            176, 88, 0,
            176, 176, 0,
            0, 176, 0,
            0, 88, 176,
            176, 0, 176,
            88, 0, 176,
            248, 176, 88,
            176, 176, 176
        };

        private static List<PaletteColorData> ParseGimpPalette(string path)
        {
            List<PaletteColorData> colors = new List<PaletteColorData>();
            foreach (string rawLine in File.ReadAllLines(path))
            {
                string line = rawLine.Trim();
                if (line.Length == 0 || line.StartsWith("#") || line.StartsWith("GIMP"))
                {
                    continue;
                }
                if (line.StartsWith("Name:", StringComparison.OrdinalIgnoreCase) ||
                    line.StartsWith("Columns:", StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                string[] parts = line.Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length < 3)
                {
                    continue;
                }

                if (byte.TryParse(parts[0], NumberStyles.Integer, CultureInfo.InvariantCulture, out byte r) &&
                    byte.TryParse(parts[1], NumberStyles.Integer, CultureInfo.InvariantCulture, out byte g) &&
                    byte.TryParse(parts[2], NumberStyles.Integer, CultureInfo.InvariantCulture, out byte b))
                {
                    colors.Add(new PaletteColorData { R = r, G = g, B = b, A = 255 });
                }
            }

            return colors;
        }

        private static List<PaletteColorData> ParseJascPalette(string path)
        {
            string[] lines = File.ReadAllLines(path);
            List<PaletteColorData> colors = new List<PaletteColorData>();
            if (lines.Length < 3 || !lines[0].StartsWith("JASC-PAL", StringComparison.OrdinalIgnoreCase))
            {
                return colors;
            }

            int count;
            if (!int.TryParse(lines[2].Trim(), NumberStyles.Integer, CultureInfo.InvariantCulture, out count))
            {
                return colors;
            }

            for (int i = 3; i < lines.Length && colors.Count < count; i++)
            {
                string line = lines[i].Trim();
                if (line.Length == 0)
                {
                    continue;
                }

                string[] parts = line.Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length < 3)
                {
                    continue;
                }

                if (byte.TryParse(parts[0], NumberStyles.Integer, CultureInfo.InvariantCulture, out byte r) &&
                    byte.TryParse(parts[1], NumberStyles.Integer, CultureInfo.InvariantCulture, out byte g) &&
                    byte.TryParse(parts[2], NumberStyles.Integer, CultureInfo.InvariantCulture, out byte b))
                {
                    colors.Add(new PaletteColorData { R = r, G = g, B = b, A = 255 });
                }
            }

            return colors;
        }
    }
}
