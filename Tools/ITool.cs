using System;

public interface ITool
{
    event Action PreviewChanged;

    void BeginUseTool(bool primary, int x, int y);
    void EndUseTool(bool primary, int x, int y);

    void UseTool(int x, int y);
    void DrawPreview(Cairo.Context context, CanvasViewport viewport);
}
