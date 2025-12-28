namespace PixelSplashStudio
{
    public class ToolManager
    {
        private ITool _activeTool;

        public ITool ActiveTool => _activeTool;

        public ToolManager(ITool activeTool)
        {
            _activeTool = activeTool;
        }

        public void SetActiveTool(ITool tool)
        {
            _activeTool = tool;
        }

        public void BeginUseTool(bool primary, int x, int y)
        {
            _activeTool?.BeginUseTool(primary, x, y);
        }

        public void UseTool(int x, int y)
        {
            _activeTool?.UseTool(x, y);
        }

        public void EndUseTool(bool primary, int x, int y)
        {
            _activeTool?.EndUseTool(primary, x, y);
        }

        public void ZoomAt(int screenX, int screenY, int deltaPixelSize, int viewWidth, int viewHeight)
        {
            if (_activeTool is GrabAndZoomTool grabAndZoomTool)
            {
                grabAndZoomTool.ZoomAt(screenX, screenY, deltaPixelSize, viewWidth, viewHeight);
            }
        }
    }
}
