using System;
using System.Collections.Generic;

namespace PixelSplashStudio
{
    public sealed class PaletteLibraryService
    {
        private readonly PixelSplashPalette _palette;

        public PaletteLibraryData Library { get; private set; }

        public PaletteLibraryService(PixelSplashPalette palette)
        {
            _palette = palette ?? throw new ArgumentNullException(nameof(palette));
        }

        public void LoadLibrary()
        {
            Library = PaletteStorage.LoadLibrary(_palette);
            ApplyPalette(Library?.SelectedName);
        }

        public IReadOnlyList<string> GetPaletteNames()
        {
            List<string> names = new List<string>();
            if (Library?.Palettes == null)
            {
                return names;
            }

            foreach (PaletteEntryData entry in Library.Palettes)
            {
                if (!string.IsNullOrWhiteSpace(entry?.Name))
                {
                    names.Add(entry.Name);
                }
            }

            return names;
        }

        public PaletteEntryData FindPalette(string name)
        {
            if (Library?.Palettes == null || string.IsNullOrWhiteSpace(name))
            {
                return null;
            }

            foreach (PaletteEntryData entry in Library.Palettes)
            {
                if (entry != null && entry.Name == name)
                {
                    return entry;
                }
            }

            return null;
        }

        public bool ApplyPalette(string name)
        {
            if (Library == null)
            {
                return false;
            }

            PaletteEntryData entry = FindPalette(name);
            if (entry == null)
            {
                return false;
            }

            _palette.SetPaletteColors(PaletteStorage.ToTupleColors(entry.Colors));
            Library.SelectedName = entry.Name;
            return true;
        }

        public PaletteEntryData AddPalette(string name, List<PaletteColorData> colors, bool select = true)
        {
            if (Library == null)
            {
                Library = new PaletteLibraryData();
            }

            List<PaletteColorData> normalized = PaletteStorage.NormalizeColors(colors);
            PaletteEntryData existing = FindPaletteByColors(normalized);
            if (existing != null)
            {
                if (select)
                {
                    Library.SelectedName = existing.Name;
                    ApplyPalette(existing.Name);
                }

                PaletteStorage.SaveLibrary(Library);
                return existing;
            }

            PaletteEntryData entry = new PaletteEntryData
            {
                Name = EnsureUniqueName(name),
                Colors = normalized
            };
            Library.Palettes.Add(entry);

            if (select)
            {
                Library.SelectedName = entry.Name;
                ApplyPalette(entry.Name);
            }

            PaletteStorage.SaveLibrary(Library);
            return entry;
        }

        public PaletteEntryData AddPaletteFromCurrent(string name)
        {
            return AddPalette(name, PaletteStorage.ToColorData(_palette.Palette));
        }

        public PaletteEntryData SaveCurrentPalette(string name)
        {
            if (Library == null)
            {
                Library = new PaletteLibraryData();
            }

            PaletteEntryData entry = FindPalette(name);
            List<PaletteColorData> colors = PaletteStorage.NormalizeColors(PaletteStorage.ToColorData(_palette.Palette));

            if (entry == null)
            {
                entry = new PaletteEntryData
                {
                    Name = EnsureUniqueName(name),
                    Colors = colors
                };
                Library.Palettes.Add(entry);
            }
            else
            {
                entry.Colors = colors;
            }

            Library.SelectedName = entry.Name;
            PaletteStorage.SaveLibrary(Library);
            return entry;
        }

        public bool UpdateSelectedFromCurrent()
        {
            if (Library == null)
            {
                return false;
            }

            PaletteEntryData entry = FindPalette(Library.SelectedName);
            if (entry == null)
            {
                return false;
            }

            entry.Colors = PaletteStorage.NormalizeColors(PaletteStorage.ToColorData(_palette.Palette));
            PaletteStorage.SaveLibrary(Library);
            return true;
        }

        public string EnsureUniqueName(string baseName)
        {
            string name = string.IsNullOrWhiteSpace(baseName) ? "Palette" : baseName.Trim();
            if (Library?.Palettes == null)
            {
                return name;
            }

            string candidate = name;
            int counter = 1;
            while (Library.Palettes.Exists(entry => entry != null && entry.Name == candidate))
            {
                counter++;
                candidate = $"{name} ({counter})";
            }

            return candidate;
        }

        public PaletteFileData LoadPaletteFile(string path)
        {
            return PaletteStorage.LoadPaletteFile(path);
        }

        private PaletteEntryData FindPaletteByColors(List<PaletteColorData> colors)
        {
            if (Library?.Palettes == null || colors == null)
            {
                return null;
            }

            int targetHash = GetPaletteHash(colors);
            for (int i = 0; i < Library.Palettes.Count; i++)
            {
                PaletteEntryData entry = Library.Palettes[i];
                if (entry?.Colors == null)
                {
                    continue;
                }

                if (GetPaletteHash(entry.Colors) != targetHash)
                {
                    continue;
                }

                if (AreColorsEqual(entry.Colors, colors))
                {
                    return entry;
                }
            }

            return null;
        }

        private static bool AreColorsEqual(IReadOnlyList<PaletteColorData> left, IReadOnlyList<PaletteColorData> right)
        {
            if (left == null || right == null || left.Count != right.Count)
            {
                return false;
            }

            for (int i = 0; i < left.Count; i++)
            {
                PaletteColorData a = left[i];
                PaletteColorData b = right[i];
                if (a.R != b.R || a.G != b.G || a.B != b.B || a.A != b.A)
                {
                    return false;
                }
            }

            return true;
        }

        private static int GetPaletteHash(IReadOnlyList<PaletteColorData> colors)
        {
            if (colors == null)
            {
                return 0;
            }

            unchecked
            {
                int hash = 17;
                hash = (hash * 31) + colors.Count;
                for (int i = 0; i < colors.Count; i++)
                {
                    PaletteColorData color = colors[i];
                    hash = (hash * 31) + color.R;
                    hash = (hash * 31) + color.G;
                    hash = (hash * 31) + color.B;
                    hash = (hash * 31) + color.A;
                }

                return hash;
            }
        }

        public void SaveLibrary()
        {
            if (Library == null)
            {
                return;
            }

            PaletteStorage.SaveLibrary(Library);
        }

        public void SavePaletteFile(string path, PaletteFileData data)
        {
            PaletteStorage.SavePaletteFile(path, data);
        }
    }
}
