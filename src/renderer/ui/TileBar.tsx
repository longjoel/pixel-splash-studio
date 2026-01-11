import React, { useEffect, useMemo, useRef } from 'react';
import { usePaletteStore } from '@/state/paletteStore';
import { useTileMapStore } from '@/state/tileMapStore';

const TILE_PAGE_SIZE = 32;
const TILE_BAR_PIXEL_SIZE = 6;

type TileCanvasProps = {
  pixels: number[];
  tileWidth: number;
  tileHeight: number;
  palette: string[];
};

const TileCanvas = ({ pixels, tileWidth, tileHeight, palette }: TileCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const width = tileWidth * TILE_BAR_PIXEL_SIZE;
    const height = tileHeight * TILE_BAR_PIXEL_SIZE;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, width, height);
    for (let y = 0; y < tileHeight; y += 1) {
      for (let x = 0; x < tileWidth; x += 1) {
        const paletteIndex = pixels[y * tileWidth + x] ?? 0;
        if (paletteIndex === 0) {
          continue;
        }
        context.fillStyle = palette[paletteIndex] ?? palette[0] ?? '#000000';
        context.fillRect(
          x * TILE_BAR_PIXEL_SIZE,
          y * TILE_BAR_PIXEL_SIZE,
          TILE_BAR_PIXEL_SIZE,
          TILE_BAR_PIXEL_SIZE
        );
      }
    }
  }, [pixels, tileWidth, tileHeight, palette]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
};

const TileBar = () => {
  const tileSets = useTileMapStore((state) => state.tileSets);
  const activeTileSetId = useTileMapStore((state) => state.activeTileSetId);
  const selectedTileIndex = useTileMapStore((state) => state.selectedTileIndex);
  const tilePage = useTileMapStore((state) => state.tilePage);
  const setTilePage = useTileMapStore((state) => state.setTilePage);
  const setSelectedTileIndex = useTileMapStore((state) => state.setSelectedTileIndex);
  const setActiveTileSet = useTileMapStore((state) => state.setActiveTileSet);
  const palette = usePaletteStore((state) => state.colors);

  const activeTileSet = useMemo(() => {
    return tileSets.find((set) => set.id === activeTileSetId) ?? tileSets[0];
  }, [tileSets, activeTileSetId]);

  useEffect(() => {
    if (!activeTileSet && tileSets.length > 0) {
      setActiveTileSet(tileSets[0].id);
    }
  }, [activeTileSet, tileSets, setActiveTileSet]);

  const totalTiles = activeTileSet?.tiles.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalTiles / TILE_PAGE_SIZE));
  const clampedPage = Math.min(tilePage, totalPages - 1);
  const pageStart = clampedPage * TILE_PAGE_SIZE;
  const pageTiles = activeTileSet?.tiles.slice(pageStart, pageStart + TILE_PAGE_SIZE) ?? [];

  const tileSwatchSize = activeTileSet
    ? Math.max(24, activeTileSet.tileWidth * TILE_BAR_PIXEL_SIZE)
    : 24;

  useEffect(() => {
    const desiredPage = Math.min(
      Math.floor(selectedTileIndex / TILE_PAGE_SIZE),
      totalPages - 1
    );
    if (Number.isFinite(desiredPage) && desiredPage !== clampedPage) {
      setTilePage(desiredPage);
    }
  }, [selectedTileIndex, clampedPage, totalPages, setTilePage]);

  return (
    <div className="tilebar">
      <div className="tilebar__header">
        {activeTileSet ? (
          <>
            <div className="tilebar__select">
              <label className="panel__label" htmlFor="tile-set-select">
                Tile Set
              </label>
              <select
                id="tile-set-select"
                className="panel__select"
                value={activeTileSet.id}
                onChange={(event) => setActiveTileSet(event.target.value)}
              >
                {tileSets.map((set) => (
                  <option key={set.id} value={set.id}>
                    {set.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="tilebar__pages">
              <button
                type="button"
                className="panel__item"
                onClick={() => setTilePage(Math.max(0, clampedPage - 1))}
                disabled={clampedPage === 0}
              >
                Prev
              </button>
              <span className="tilebar__page-label">
                Page {clampedPage + 1} / {totalPages}
              </span>
              <button
                type="button"
                className="panel__item"
                onClick={() => setTilePage(Math.min(totalPages - 1, clampedPage + 1))}
                disabled={clampedPage >= totalPages - 1}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <span className="panel__label">Tiles</span>
        )}
      </div>
      {!activeTileSet ? (
        <div className="tilebar__empty">No tiles yet. Use Tile Sampler to capture some.</div>
      ) : totalTiles === 0 ? (
        <div className="tilebar__empty">No tiles in this set yet.</div>
      ) : (
        <div
          className="tilebar__grid"
          style={{ '--tile-swatch-size': `${tileSwatchSize}px` } as React.CSSProperties}
        >
          {pageTiles.map((tile, index) => {
            const tileIndex = pageStart + index;
            return (
              <button
                key={tile.id}
                type="button"
                className="tilebar__tile"
                data-active={tileIndex === selectedTileIndex}
                onClick={() => setSelectedTileIndex(tileIndex)}
                aria-label={`Tile ${tileIndex + 1}`}
              >
                <TileCanvas
                  pixels={tile.pixels}
                  tileWidth={activeTileSet.tileWidth}
                  tileHeight={activeTileSet.tileHeight}
                  palette={palette}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TileBar;
