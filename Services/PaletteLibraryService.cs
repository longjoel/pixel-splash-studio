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

            PaletteEntryData entry = new PaletteEntryData
            {
                Name = EnsureUniqueName(name),
                Colors = PaletteStorage.NormalizeColors(colors)
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
