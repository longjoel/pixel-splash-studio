using System;
using System.Collections.Generic;
using Cairo;
using Gdk;

namespace PixelSplashStudio
{
    public class ReferenceLayer
    {
        private readonly List<ReferenceObject> _objects = new List<ReferenceObject>();

        public IReadOnlyList<ReferenceObject> Objects => _objects;
        public ReferenceObject Selected { get; private set; }
        public event Action Changed;

        public ReferenceTextObject AddText(string text, double x, double y, double fontSize, string fontFamily)
        {
            var obj = new ReferenceTextObject(text, fontFamily, fontSize)
            {
                X = x,
                Y = y
            };
            if (obj.Width <= 0 || obj.Height <= 0)
            {
                obj.Width = Math.Max(1.0, obj.NaturalWidth);
                obj.Height = Math.Max(1.0, obj.NaturalHeight);
            }

            _objects.Add(obj);
            Select(obj);
            Changed?.Invoke();
            return obj;
        }

        public ReferenceImageObject AddImage(Pixbuf pixbuf, string sourcePath, double x, double y, double width, double height)
        {
            if (pixbuf == null)
            {
                return null;
            }

            var obj = new ReferenceImageObject(pixbuf, sourcePath)
            {
                X = x,
                Y = y,
                Width = Math.Max(1.0, width),
                Height = Math.Max(1.0, height)
            };
            _objects.Add(obj);
            Select(obj);
            Changed?.Invoke();
            return obj;
        }

        public bool RemoveSelected()
        {
            if (Selected == null)
            {
                return false;
            }

            bool removed = _objects.Remove(Selected);
            Selected = null;
            if (removed)
            {
                Changed?.Invoke();
            }
            return removed;
        }

        public void Clear()
        {
            _objects.Clear();
            Selected = null;
            Changed?.Invoke();
        }

        public void ClearSelection()
        {
            if (Selected != null)
            {
                Selected = null;
                Changed?.Invoke();
            }
        }

        public void Select(ReferenceObject obj)
        {
            if (obj == null)
            {
                if (Selected != null)
                {
                    Selected = null;
                    Changed?.Invoke();
                }
                return;
            }

            if (Selected != obj)
            {
                Selected = obj;
                Changed?.Invoke();
            }
            else
            {
                Selected = obj;
            }
            int index = _objects.IndexOf(obj);
            if (index >= 0 && index < _objects.Count - 1)
            {
                _objects.RemoveAt(index);
                _objects.Add(obj);
            }
        }

        public ReferenceObject HitTest(double worldX, double worldY)
        {
            for (int i = _objects.Count - 1; i >= 0; i--)
            {
                ReferenceObject obj = _objects[i];
                if (obj != null && obj.Contains(worldX, worldY))
                {
                    return obj;
                }
            }

            return null;
        }
    }

    public abstract class ReferenceObject
    {
        public double X { get; set; }
        public double Y { get; set; }
        public double Width { get; set; } = 1.0;
        public double Height { get; set; } = 1.0;
        public double Opacity { get; set; } = 1.0;

        public virtual bool Contains(double worldX, double worldY)
        {
            double minX = Math.Min(X, X + Width);
            double maxX = Math.Max(X, X + Width);
            double minY = Math.Min(Y, Y + Height);
            double maxY = Math.Max(Y, Y + Height);
            return worldX >= minX && worldX <= maxX && worldY >= minY && worldY <= maxY;
        }

        public abstract void Draw(Context context, CanvasViewport viewport, double screenX, double screenY, double screenWidth, double screenHeight);
    }

    public class ReferenceTextObject : ReferenceObject
    {
        public string Text { get; set; }
        public string FontFamily { get; set; }
        public double FontSize { get; set; }
        public double NaturalWidth { get; private set; }
        public double NaturalHeight { get; private set; }
        public double NaturalXBearing { get; private set; }
        public double NaturalYBearing { get; private set; }

        public ReferenceTextObject(string text, string fontFamily, double fontSize)
        {
            Text = text ?? string.Empty;
            FontFamily = string.IsNullOrWhiteSpace(fontFamily) ? "Sans" : fontFamily;
            FontSize = fontSize <= 0 ? 12 : fontSize;
            Measure();
        }

        public void Measure()
        {
            using (var surface = new ImageSurface(Format.Argb32, 1, 1))
            using (var ctx = new Context(surface))
            {
                ctx.SelectFontFace(FontFamily, FontSlant.Normal, FontWeight.Normal);
                ctx.SetFontSize(FontSize);
                TextExtents extents = ctx.TextExtents(Text ?? string.Empty);
                NaturalWidth = Math.Max(1.0, extents.Width);
                NaturalHeight = Math.Max(1.0, extents.Height);
                NaturalXBearing = extents.XBearing;
                NaturalYBearing = extents.YBearing;
                if (Width <= 0 || Height <= 0)
                {
                    Width = NaturalWidth;
                    Height = NaturalHeight;
                }
            }
        }

        public override void Draw(Context context, CanvasViewport viewport, double screenX, double screenY, double screenWidth, double screenHeight)
        {
            if (context == null || viewport == null || string.IsNullOrEmpty(Text))
            {
                return;
            }

            if (NaturalWidth <= 0 || NaturalHeight <= 0)
            {
                return;
            }

            double scaleX = screenWidth / (NaturalWidth * viewport.PixelSize);
            double scaleY = screenHeight / (NaturalHeight * viewport.PixelSize);

            context.Save();
            context.Translate(screenX, screenY);
            context.Scale(scaleX, scaleY);
            context.SelectFontFace(FontFamily, FontSlant.Normal, FontWeight.Normal);
            context.SetFontSize(FontSize * viewport.PixelSize);
            context.SetSourceRGBA(1, 1, 1, Math.Max(0, Math.Min(1, Opacity)));
            context.MoveTo(-NaturalXBearing * viewport.PixelSize, -NaturalYBearing * viewport.PixelSize);
            context.ShowText(Text);
            context.Restore();
        }
    }

    public class ReferenceImageObject : ReferenceObject
    {
        public Pixbuf Image { get; private set; }
        public string SourcePath { get; set; }

        public ReferenceImageObject(Pixbuf pixbuf, string sourcePath)
        {
            Image = pixbuf;
            SourcePath = sourcePath;
        }

        public override void Draw(Context context, CanvasViewport viewport, double screenX, double screenY, double screenWidth, double screenHeight)
        {
            if (context == null || Image == null || screenWidth <= 0 || screenHeight <= 0)
            {
                return;
            }

            context.Save();
            context.Translate(screenX, screenY);
            context.Scale(screenWidth / Image.Width, screenHeight / Image.Height);
            Gdk.CairoHelper.SetSourcePixbuf(context, Image, 0, 0);
            double alpha = Math.Max(0, Math.Min(1, Opacity));
            context.PaintWithAlpha(alpha);
            context.Restore();
        }
    }
}
