using System;

public interface ITool
{
    event Action PreviewChanged;

    void BeginUseTool(int x, int y);
    void EndUseTool();

    void UseTool(int x, int y);
}
