using System;
using System.IO;
using System.Text.Json;
using Gdk;

namespace PixelSplashStudio
{
    public sealed class CanvasFileService
    {
        private readonly PixelSplashCanvas _canvas;
        private readonly PixelSplashPalette _palette;

        public CanvasFileService(PixelSplashCanvas canvas, PixelSplashPalette palette)
        {
            _canvas = canvas ?? throw new ArgumentNullException(nameof(canvas));
            _palette = palette ?? throw new ArgumentNullException(nameof(palette));
        }

        public CanvasFileData Load(string path)
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

        public void Save(string path, string paletteName)
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
