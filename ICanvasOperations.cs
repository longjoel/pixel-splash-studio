public interface ICanvasOperations
{
    void DrawPixel(int x, int y, byte colorIndex);
    void DrawLine(int x1, int y1, int x2, int y2, byte colorIndex);
    void DrawRectangle(int x, int y, int width, int height, byte colorIndex);
    void FillRectangle(int x, int y, int width, int height, byte colorIndex);
    void DrawCircle(int x, int y, int radius, byte colorIndex);
    void FillCircle(int x, int y, int radius, byte colorIndex);
    void ClearCanvas();
}
