using System.Collections.Generic;

public class SelectionLayer
{
    private readonly List<SelectionShape> _shapes = new List<SelectionShape>();

    public bool HasSelection => _shapes.Count > 0;

    public void Clear()
    {
        _shapes.Clear();
    }

    public void AddRectangle(int x, int y, int width, int height)
    {
        _shapes.Add(new SelectionShape(x, y, width, height, true, SelectionShapeType.Rectangle));
    }

    public void SubtractRectangle(int x, int y, int width, int height)
    {
        _shapes.Add(new SelectionShape(x, y, width, height, false, SelectionShapeType.Rectangle));
    }

    public void AddEllipse(int x, int y, int width, int height)
    {
        _shapes.Add(new SelectionShape(x, y, width, height, true, SelectionShapeType.Ellipse));
    }

    public void SubtractEllipse(int x, int y, int width, int height)
    {
        _shapes.Add(new SelectionShape(x, y, width, height, false, SelectionShapeType.Ellipse));
    }

    public bool TryGetBounds(out int minX, out int minY, out int maxX, out int maxY)
    {
        minX = 0;
        minY = 0;
        maxX = 0;
        maxY = 0;

        bool hasAny = false;
        foreach (SelectionShape shape in _shapes)
        {
            if (!shape.IsAdd)
            {
                continue;
            }

            int rectMaxX = shape.X + shape.Width - 1;
            int rectMaxY = shape.Y + shape.Height - 1;
            if (!hasAny)
            {
                minX = shape.X;
                minY = shape.Y;
                maxX = rectMaxX;
                maxY = rectMaxY;
                hasAny = true;
            }
            else
            {
                if (shape.X < minX) minX = shape.X;
                if (shape.Y < minY) minY = shape.Y;
                if (rectMaxX > maxX) maxX = rectMaxX;
                if (rectMaxY > maxY) maxY = rectMaxY;
            }
        }

        return hasAny;
    }

    public bool IsSelected(int x, int y)
    {
        bool selected = false;
        for (int i = 0; i < _shapes.Count; i++)
        {
            SelectionShape shape = _shapes[i];
            if (!shape.Contains(x, y))
            {
                continue;
            }

            selected = shape.IsAdd;
        }

        return selected;
    }

    private enum SelectionShapeType
    {
        Rectangle,
        Ellipse
    }

    private struct SelectionShape
    {
        public int X { get; }
        public int Y { get; }
        public int Width { get; }
        public int Height { get; }
        public bool IsAdd { get; }
        public SelectionShapeType ShapeType { get; }

        public SelectionShape(int x, int y, int width, int height, bool isAdd, SelectionShapeType shapeType)
        {
            X = x;
            Y = y;
            Width = width;
            Height = height;
            IsAdd = isAdd;
            ShapeType = shapeType;
        }

        public bool Contains(int x, int y)
        {
            if (x < X || y < Y || x >= X + Width || y >= Y + Height)
            {
                return false;
            }

            if (ShapeType == SelectionShapeType.Rectangle)
            {
                return true;
            }

            double rx = Width / 2.0;
            double ry = Height / 2.0;
            if (rx <= 0 || ry <= 0)
            {
                return false;
            }

            double centerX = X + rx;
            double centerY = Y + ry;
            double dx = (x + 0.5) - centerX;
            double dy = (y + 0.5) - centerY;
            double nx = (dx * dx) / (rx * rx);
            double ny = (dy * dy) / (ry * ry);
            return (nx + ny) <= 1.0;
        }
    }
}
