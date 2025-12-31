using System;
using System.IO;
using System.IO.Compression;
using System.Text.Json;
using Gdk;

namespace PixelSplashStudio
{
    public sealed class CanvasFileService
    {
        private const string SplashExtension = ".splash";
        private const string MetaFileName = "meta.json";
        private const string ChunksFolder = "chunks";
        private const string ReferencesFolder = "references";
        private const string PalettesFolder = "palettes";
        private const string DefaultPaletteFile = "palettes/active.pspal";

        private readonly PixelSplashCanvas _canvas;
        private readonly PixelSplashPalette _palette;

        public CanvasFileService(PixelSplashCanvas canvas, PixelSplashPalette palette)
        {
            _canvas = canvas ?? throw new ArgumentNullException(nameof(canvas));
            _palette = palette ?? throw new ArgumentNullException(nameof(palette));
        }

        public CanvasFileData Load(string path)
        {
            if (IsSplashArchivePath(path))
            {
                return LoadArchive(path);
            }

            return LoadLegacyJson(path);
        }

        public void Save(string path, string paletteName)
        {
            if (IsSplashArchivePath(path))
            {
                SaveArchive(path, paletteName);
                return;
            }

            SaveLegacyJson(path, paletteName);
        }

        private static bool IsSplashArchivePath(string path)
        {
            if (string.IsNullOrWhiteSpace(path))
            {
                return false;
            }

            return string.Equals(Path.GetExtension(path), SplashExtension, StringComparison.OrdinalIgnoreCase);
        }

        private CanvasFileData LoadLegacyJson(string path)
        {
            string json = File.ReadAllText(path);
            CanvasFileData data = JsonSerializer.Deserialize<CanvasFileData>(json) ?? new CanvasFileData();

            _canvas.ClearCanvas();
            _canvas.References.Clear();

            if (data.Chunks != null)
            {
                foreach (CanvasChunkData chunkData in data.Chunks)
                {
                    int chunkX = chunkData.ChunkX;
                    int chunkY = chunkData.ChunkY;
                    var chunk = new PixelSplashCanvasChunk(
                        chunkX * PixelSplashCanvasChunk.ChunkWidth,
                        chunkY * PixelSplashCanvasChunk.ChunkHeight);
                    chunk.Data = chunkData.Data ?? new byte[PixelSplashCanvasChunk.ChunkWidth * PixelSplashCanvasChunk.ChunkHeight];
                    _canvas.Chunks[(chunkX, chunkY)] = chunk;
                }
            }

            if (data.References != null)
            {
                foreach (ReferenceItemData reference in data.References)
                {
                    if (reference == null)
                    {
                        continue;
                    }

                    if (reference.Type == "text")
                    {
                        ReferenceTextObject textObject = _canvas.References.AddText(
                            reference.Text ?? string.Empty,
                            reference.X,
                            reference.Y,
                            reference.FontSize <= 0 ? 12 : reference.FontSize,
                            string.IsNullOrWhiteSpace(reference.FontFamily) ? "Sans" : reference.FontFamily);
                        if (reference.Width > 0)
                        {
                            textObject.Width = reference.Width;
                        }
                        if (reference.Height > 0)
                        {
                            textObject.Height = reference.Height;
                        }
                        textObject.Opacity = reference.Opacity;
                    }
                    else if (reference.Type == "image")
                    {
                        try
                        {
                            Pixbuf pixbuf = LoadReferenceImage(reference);
                            if (pixbuf == null)
                            {
                                continue;
                            }

                            string sourcePath = reference.ImagePath;
                            if (string.IsNullOrWhiteSpace(sourcePath))
                            {
                                sourcePath = "embedded";
                            }
                            ReferenceImageObject imageObject = _canvas.References.AddImage(
                                pixbuf,
                                sourcePath,
                                reference.X,
                                reference.Y,
                                reference.Width > 0 ? reference.Width : pixbuf.Width,
                                reference.Height > 0 ? reference.Height : pixbuf.Height);
                            imageObject.Opacity = reference.Opacity;
                        }
                        catch
                        {
                            // Ignore reference images that fail to load.
                        }
                    }
                }
            }

            return data;
        }

        private void SaveLegacyJson(string path, string paletteName)
        {
            CanvasFileData data = new CanvasFileData();
            foreach (var entry in _canvas.Chunks)
            {
                data.Chunks.Add(new CanvasChunkData
                {
                    ChunkX = entry.Key.Item1,
                    ChunkY = entry.Key.Item2,
                    Data = (byte[])entry.Value.Data.Clone()
                });
            }

            data.PaletteName = paletteName;
            data.PaletteColors = PaletteStorage.NormalizeColors(PaletteStorage.ToColorData(_palette.Palette));

            foreach (ReferenceObject reference in _canvas.References.Objects)
            {
                if (reference is ReferenceTextObject textObject)
                {
                    data.References.Add(new ReferenceItemData
                    {
                        Type = "text",
                        X = textObject.X,
                        Y = textObject.Y,
                        Width = textObject.Width,
                        Height = textObject.Height,
                        Opacity = textObject.Opacity,
                        Text = textObject.Text,
                        FontFamily = textObject.FontFamily,
                        FontSize = textObject.FontSize
                    });
                }
                else if (reference is ReferenceImageObject imageObject)
                {
                    data.References.Add(new ReferenceItemData
                    {
                        Type = "image",
                        X = imageObject.X,
                        Y = imageObject.Y,
                        Width = imageObject.Width,
                        Height = imageObject.Height,
                        Opacity = imageObject.Opacity,
                        ImagePath = imageObject.SourcePath,
                        ImageData = EncodeReferenceImage(imageObject.Image)
                    });
                }
            }

            string json = JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                WriteIndented = true
            });
            File.WriteAllText(path, json);
        }

        private CanvasFileData LoadArchive(string path)
        {
            string tempDir = CreateTempDirectory("pixel-splash-load");
            try
            {
                ZipFile.ExtractToDirectory(path, tempDir);
                string metaPath = Path.Combine(tempDir, MetaFileName);
                if (!File.Exists(metaPath))
                {
                    throw new InvalidOperationException("Missing meta.json in splash file.");
                }

                string json = File.ReadAllText(metaPath);
                CanvasArchiveMeta meta = JsonSerializer.Deserialize<CanvasArchiveMeta>(json) ?? new CanvasArchiveMeta();

                _canvas.ClearCanvas();
                _canvas.References.Clear();

                LoadArchiveChunks(meta, tempDir);
                LoadArchiveReferences(meta, tempDir);

                CanvasFileData data = new CanvasFileData();
                ApplyArchivePalette(meta, tempDir, data);
                return data;
            }
            finally
            {
                CleanupTempDirectory(tempDir);
            }
        }

        private void SaveArchive(string path, string paletteName)
        {
            string tempDir = CreateTempDirectory("pixel-splash-save");
            try
            {
                Directory.CreateDirectory(Path.Combine(tempDir, ChunksFolder));
                Directory.CreateDirectory(Path.Combine(tempDir, ReferencesFolder));
                Directory.CreateDirectory(Path.Combine(tempDir, PalettesFolder));

                CanvasArchiveMeta meta = new CanvasArchiveMeta
                {
                    PaletteName = NormalizePaletteName(paletteName, path),
                    PaletteFile = DefaultPaletteFile
                };

                SaveArchivePalette(meta, tempDir);
                SaveArchiveChunks(meta, tempDir);
                SaveArchiveReferences(meta, tempDir);

                string metaPath = Path.Combine(tempDir, MetaFileName);
                string json = JsonSerializer.Serialize(meta, new JsonSerializerOptions
                {
                    WriteIndented = true
                });
                File.WriteAllText(metaPath, json);

                if (File.Exists(path))
                {
                    File.Delete(path);
                }
                ZipFile.CreateFromDirectory(tempDir, path, CompressionLevel.Optimal, false);
            }
            finally
            {
                CleanupTempDirectory(tempDir);
            }
        }

        private void LoadArchiveChunks(CanvasArchiveMeta meta, string rootDir)
        {
            if (meta?.Chunks == null)
            {
                return;
            }

            int expectedLength = PixelSplashCanvasChunk.ChunkWidth * PixelSplashCanvasChunk.ChunkHeight;
            foreach (CanvasChunkFileData chunkData in meta.Chunks)
            {
                if (chunkData == null || string.IsNullOrWhiteSpace(chunkData.File))
                {
                    continue;
                }

                string chunkPath = GetArchiveItemPath(rootDir, chunkData.File);
                if (!File.Exists(chunkPath))
                {
                    continue;
                }

                byte[] data = File.ReadAllBytes(chunkPath);
                byte[] chunkBytes = new byte[expectedLength];
                int length = Math.Min(data.Length, expectedLength);
                Array.Copy(data, chunkBytes, length);

                int chunkX = chunkData.ChunkX;
                int chunkY = chunkData.ChunkY;
                var chunk = new PixelSplashCanvasChunk(
                    chunkX * PixelSplashCanvasChunk.ChunkWidth,
                    chunkY * PixelSplashCanvasChunk.ChunkHeight)
                {
                    Data = chunkBytes
                };
                _canvas.Chunks[(chunkX, chunkY)] = chunk;
            }
        }

        private void LoadArchiveReferences(CanvasArchiveMeta meta, string rootDir)
        {
            if (meta?.References == null)
            {
                return;
            }

            foreach (ReferenceItemData reference in meta.References)
            {
                if (reference == null)
                {
                    continue;
                }

                if (reference.Type == "text")
                {
                    ReferenceTextObject textObject = _canvas.References.AddText(
                        reference.Text ?? string.Empty,
                        reference.X,
                        reference.Y,
                        reference.FontSize <= 0 ? 12 : reference.FontSize,
                        string.IsNullOrWhiteSpace(reference.FontFamily) ? "Sans" : reference.FontFamily);
                    if (reference.Width > 0)
                    {
                        textObject.Width = reference.Width;
                    }
                    if (reference.Height > 0)
                    {
                        textObject.Height = reference.Height;
                    }
                    textObject.Opacity = reference.Opacity;
                }
                else if (reference.Type == "image" && !string.IsNullOrWhiteSpace(reference.ImagePath))
                {
                    string imagePath = GetArchiveItemPath(rootDir, reference.ImagePath);
                    if (!File.Exists(imagePath))
                    {
                        continue;
                    }

                    try
                    {
                        Pixbuf pixbuf = new Pixbuf(imagePath);
                        ReferenceImageObject imageObject = _canvas.References.AddImage(
                            pixbuf,
                            reference.ImagePath,
                            reference.X,
                            reference.Y,
                            reference.Width > 0 ? reference.Width : pixbuf.Width,
                            reference.Height > 0 ? reference.Height : pixbuf.Height);
                        imageObject.Opacity = reference.Opacity;
                    }
                    catch
                    {
                        // Ignore reference images that fail to load.
                    }
                }
            }
        }

        private void SaveArchiveChunks(CanvasArchiveMeta meta, string rootDir)
        {
            if (meta == null)
            {
                return;
            }

            foreach (var entry in _canvas.Chunks)
            {
                string fileName = $"{entry.Key.Item1}_{entry.Key.Item2}.bin";
                string relative = $"{ChunksFolder}/{fileName}";
                string chunkPath = Path.Combine(rootDir, ChunksFolder, fileName);

                File.WriteAllBytes(chunkPath, entry.Value.Data ?? Array.Empty<byte>());

                meta.Chunks.Add(new CanvasChunkFileData
                {
                    ChunkX = entry.Key.Item1,
                    ChunkY = entry.Key.Item2,
                    File = relative
                });
            }
        }

        private void SaveArchiveReferences(CanvasArchiveMeta meta, string rootDir)
        {
            if (meta == null)
            {
                return;
            }

            int imageIndex = 0;
            foreach (ReferenceObject reference in _canvas.References.Objects)
            {
                if (reference is ReferenceTextObject textObject)
                {
                    meta.References.Add(new ReferenceItemData
                    {
                        Type = "text",
                        X = textObject.X,
                        Y = textObject.Y,
                        Width = textObject.Width,
                        Height = textObject.Height,
                        Opacity = textObject.Opacity,
                        Text = textObject.Text,
                        FontFamily = textObject.FontFamily,
                        FontSize = textObject.FontSize
                    });
                }
                else if (reference is ReferenceImageObject imageObject)
                {
                    if (imageObject.Image == null)
                    {
                        continue;
                    }

                    string fileName = $"ref_{imageIndex++}.png";
                    string relative = $"{ReferencesFolder}/{fileName}";
                    string imagePath = Path.Combine(rootDir, ReferencesFolder, fileName);

                    try
                    {
                        imageObject.Image.Save(imagePath, "png");
                    }
                    catch
                    {
                        continue;
                    }

                    meta.References.Add(new ReferenceItemData
                    {
                        Type = "image",
                        X = imageObject.X,
                        Y = imageObject.Y,
                        Width = imageObject.Width,
                        Height = imageObject.Height,
                        Opacity = imageObject.Opacity,
                        ImagePath = relative
                    });
                }
            }
        }

        private void SaveArchivePalette(CanvasArchiveMeta meta, string rootDir)
        {
            if (meta == null)
            {
                return;
            }

            if (string.IsNullOrWhiteSpace(meta.PaletteFile))
            {
                meta.PaletteFile = DefaultPaletteFile;
            }

            string palettePath = GetArchiveItemPath(rootDir, meta.PaletteFile);
            string paletteDir = Path.GetDirectoryName(palettePath);
            if (!string.IsNullOrWhiteSpace(paletteDir))
            {
                Directory.CreateDirectory(paletteDir);
            }

            PaletteFileData paletteData = new PaletteFileData
            {
                Name = meta.PaletteName,
                Colors = PaletteStorage.NormalizeColors(PaletteStorage.ToColorData(_palette.Palette))
            };

            PaletteStorage.SavePaletteFile(palettePath, paletteData);
        }

        private static void ApplyArchivePalette(CanvasArchiveMeta meta, string rootDir, CanvasFileData data)
        {
            if (meta == null || data == null)
            {
                return;
            }

            if (string.IsNullOrWhiteSpace(meta.PaletteFile))
            {
                data.PaletteName = meta.PaletteName;
                return;
            }

            string palettePath = GetArchiveItemPath(rootDir, meta.PaletteFile);
            if (!File.Exists(palettePath))
            {
                data.PaletteName = meta.PaletteName;
                return;
            }

            try
            {
                PaletteFileData paletteData = LoadPaletteData(palettePath);
                if (paletteData?.Colors == null || paletteData.Colors.Count == 0)
                {
                    data.PaletteName = meta.PaletteName;
                    return;
                }

                data.PaletteName = string.IsNullOrWhiteSpace(meta.PaletteName) ? paletteData.Name : meta.PaletteName;
                data.PaletteColors = paletteData.Colors;
            }
            catch
            {
                data.PaletteName = meta.PaletteName;
            }
        }

        private static PaletteFileData LoadPaletteData(string path)
        {
            string extension = Path.GetExtension(path);
            if (string.Equals(extension, ".pspal", StringComparison.OrdinalIgnoreCase))
            {
                return PaletteStorage.LoadPaletteFile(path);
            }

            string json = File.ReadAllText(path);
            PaletteFileData data = JsonSerializer.Deserialize<PaletteFileData>(json) ?? new PaletteFileData();
            data.Colors = PaletteStorage.NormalizeColors(data.Colors);
            if (string.IsNullOrWhiteSpace(data.Name))
            {
                data.Name = Path.GetFileNameWithoutExtension(path);
            }
            return data;
        }

        private static string NormalizePaletteName(string paletteName, string path)
        {
            if (!string.IsNullOrWhiteSpace(paletteName))
            {
                return paletteName;
            }

            string fromPath = Path.GetFileNameWithoutExtension(path);
            return string.IsNullOrWhiteSpace(fromPath) ? "Palette" : fromPath;
        }

        private static string CreateTempDirectory(string prefix)
        {
            string dir = Path.Combine(Path.GetTempPath(), $"{prefix}-{Guid.NewGuid():N}");
            Directory.CreateDirectory(dir);
            return dir;
        }

        private static void CleanupTempDirectory(string path)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(path) && Directory.Exists(path))
                {
                    Directory.Delete(path, true);
                }
            }
            catch
            {
                // Ignore temp cleanup failures.
            }
        }

        private static string GetArchiveItemPath(string root, string relativePath)
        {
            if (string.IsNullOrWhiteSpace(relativePath))
            {
                return null;
            }

            string normalized = relativePath.Replace('/', Path.DirectorySeparatorChar);
            return Path.Combine(root, normalized);
        }

        private static Pixbuf LoadReferenceImage(ReferenceItemData reference)
        {
            if (reference == null)
            {
                return null;
            }

            if (!string.IsNullOrWhiteSpace(reference.ImageData))
            {
                Pixbuf pixbuf = DecodeReferenceImage(reference.ImageData);
                if (pixbuf != null)
                {
                    return pixbuf;
                }
            }

            if (string.IsNullOrWhiteSpace(reference.ImagePath))
            {
                return null;
            }

            return new Pixbuf(reference.ImagePath);
        }

        private static string EncodeReferenceImage(Pixbuf pixbuf)
        {
            if (pixbuf == null)
            {
                return null;
            }

            try
            {
                byte[] bytes = SavePixbufToPngBytes(pixbuf);
                if (bytes == null || bytes.Length == 0)
                {
                    return null;
                }

                return Convert.ToBase64String(bytes);
            }
            catch
            {
                return null;
            }
        }

        private static Pixbuf DecodeReferenceImage(string base64)
        {
            if (string.IsNullOrWhiteSpace(base64))
            {
                return null;
            }

            string tempPath = Path.Combine(Path.GetTempPath(), $"pixel-splash-ref-load-{Guid.NewGuid():N}.png");
            try
            {
                byte[] bytes = Convert.FromBase64String(base64);
                File.WriteAllBytes(tempPath, bytes);
                return new Pixbuf(tempPath);
            }
            catch
            {
                return null;
            }
            finally
            {
                try
                {
                    if (File.Exists(tempPath))
                    {
                        File.Delete(tempPath);
                    }
                }
                catch
                {
                    // Ignore temp cleanup failures.
                }
            }
        }

        private static byte[] SavePixbufToPngBytes(Pixbuf pixbuf)
        {
            if (pixbuf == null)
            {
                return null;
            }

            string tempPath = Path.Combine(Path.GetTempPath(), $"pixel-splash-ref-{Guid.NewGuid():N}.png");
            try
            {
                pixbuf.Save(tempPath, "png");
                return File.ReadAllBytes(tempPath);
            }
            finally
            {
                try
                {
                    if (File.Exists(tempPath))
                    {
                        File.Delete(tempPath);
                    }
                }
                catch
                {
                    // Ignore temp cleanup failures.
                }
            }
        }
    }
}
