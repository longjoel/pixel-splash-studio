namespace PixelSplashStudio
{
    public class PixelSplashCanvasChunk
    {
        private byte[] _data;
        bool _isDirty;

        public int X { get; } // the x coordinate of the chunk relative to world space in pixels
        public int Y { get; } // the y coordinate of the chunk relative to world space in pixels

        public byte[] Data
        {
            get { return _data; }
            set
            {
                if (value.GetHashCode() != _data?.GetHashCode()) _isDirty = true; _data = value;
            }
        } // the pixel data of the chunk stored as an array of palette indices
        public bool IsDirty { get { return _isDirty; } } // whether the chunk has been modified and needs to be redrawn
        public const int ChunkWidth = 8;
        public const int ChunkHeight = 8;

        public PixelSplashCanvasChunk(int x, int y)
        {
            X = x;
            Y = y;
            _data = new byte[ChunkWidth * ChunkHeight];
        }

        public void MarkAsClean()
        {
            _isDirty = false;
        }
    }
}
