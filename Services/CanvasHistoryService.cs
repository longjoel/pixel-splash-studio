using System;
using System.Collections.Generic;

namespace PixelSplashStudio
{
    public sealed class CanvasHistoryService
    {
        private readonly PixelSplashCanvas _canvas;
        private readonly Stack<PixelSplashCanvasSnapshot> _undoStack = new Stack<PixelSplashCanvasSnapshot>();
        private readonly Stack<PixelSplashCanvasSnapshot> _redoStack = new Stack<PixelSplashCanvasSnapshot>();
        private PixelSplashCanvasSnapshot _pendingSnapshot;

        public bool CanUndo => _undoStack.Count > 0;
        public bool CanRedo => _redoStack.Count > 0;

        public CanvasHistoryService(PixelSplashCanvas canvas)
        {
            _canvas = canvas ?? throw new ArgumentNullException(nameof(canvas));
        }

        public void BeginSnapshot()
        {
            _pendingSnapshot = _canvas.CreateSnapshot();
        }

        public void CommitSnapshot()
        {
            if (_pendingSnapshot == null)
            {
                return;
            }

            _undoStack.Push(_pendingSnapshot);
            _pendingSnapshot = null;
            _redoStack.Clear();
        }

        public bool Undo()
        {
            if (_undoStack.Count == 0)
            {
                return false;
            }

            _redoStack.Push(_canvas.CreateSnapshot());
            _canvas.RestoreSnapshot(_undoStack.Pop());
            return true;
        }

        public bool Redo()
        {
            if (_redoStack.Count == 0)
            {
                return false;
            }

            _undoStack.Push(_canvas.CreateSnapshot());
            _canvas.RestoreSnapshot(_redoStack.Pop());
            return true;
        }

        public void Clear()
        {
            _undoStack.Clear();
            _redoStack.Clear();
            _pendingSnapshot = null;
        }
    }
}
