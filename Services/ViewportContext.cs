using System;

namespace PixelSplashStudio
{
    public sealed class ViewportContext
    {
        public CanvasViewportWidget Widget { get; }
        public GrabAndZoomTool GrabTool { get; }
        public ReferenceTransformTool ReferenceTool { get; }

        public ViewportContext(CanvasViewportWidget widget, GrabAndZoomTool grabTool, ReferenceTransformTool referenceTool)
        {
            Widget = widget ?? throw new ArgumentNullException(nameof(widget));
            GrabTool = grabTool ?? throw new ArgumentNullException(nameof(grabTool));
            ReferenceTool = referenceTool ?? throw new ArgumentNullException(nameof(referenceTool));
        }
    }
}
