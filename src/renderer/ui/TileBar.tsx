import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePaletteStore } from '@/state/paletteStore';
import { useTileMapStore } from '@/state/tileMapStore';
import DropdownSelect from './DropdownSelect';

const MAX_TILE_PALETTE_COLUMNS = 64;
const TILE_BAR_PIXEL_SIZE = 6;
const TILE_GRID_GAP = 0;

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
  const selectedTileIndices = useTileMapStore((state) => state.selectedTileIndices);
  const tilePaletteColumns = useTileMapStore((state) => state.tilePaletteColumns);
  const tilePaletteOffset = useTileMapStore((state) => state.tilePaletteOffset);
  const tilePaletteRowsMin = useTileMapStore((state) => state.tilePaletteRowsMin);
  const setTileSelection = useTileMapStore((state) => state.setTileSelection);
  const setActiveTileSet = useTileMapStore((state) => state.setActiveTileSet);
  const setTilePaletteColumns = useTileMapStore((state) => state.setTilePaletteColumns);
  const setTilePaletteOffset = useTileMapStore((state) => state.setTilePaletteOffset);
  const setTilePaletteRowsMin = useTileMapStore((state) => state.setTilePaletteRowsMin);
  const deleteTilesFromSet = useTileMapStore((state) => state.deleteTilesFromSet);
  const consolidateTileSet = useTileMapStore((state) => state.consolidateTileSet);
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
  const tiles = activeTileSet?.tiles ?? [];
  const totalSlots = totalTiles + tilePaletteOffset;
  const [layoutRows, setLayoutRows] = useState(1);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const tileSwatchSize = activeTileSet
    ? Math.max(32, activeTileSet.tileWidth * TILE_BAR_PIXEL_SIZE)
    : 32;
  const selectingRef = useRef(false);
  const selectionAnchorRef = useRef<number | null>(null);
  const selectionSet = useMemo(
    () => new Set(selectedTileIndices.filter((index) => index >= 0)),
    [selectedTileIndices]
  );
  const selectedIndices = useMemo(() => {
    const unique = new Set(selectedTileIndices.filter((index) => index >= 0));
    return Array.from(unique).sort((a, b) => a - b);
  }, [selectedTileIndices]);

  const handleDeleteSelected = useCallback(() => {
    if (!activeTileSet || selectedIndices.length === 0) {
      return;
    }
    const label = selectedIndices.length === 1 ? 'tile' : 'tiles';
    const confirmed = window.confirm(
      `Delete ${selectedIndices.length} ${label} from ${activeTileSet.name}? This cannot be undone.`
    );
    if (!confirmed) {
      return;
    }
    deleteTilesFromSet(activeTileSet.id, selectedIndices);
  }, [activeTileSet, deleteTilesFromSet, selectedIndices]);

  const handleConsolidate = useCallback(() => {
    if (!activeTileSet) {
      return;
    }
    const confirmed = window.confirm(
      `Consolidate ${activeTileSet.name} to remove duplicate tiles? References will update.`
    );
    if (!confirmed) {
      return;
    }
    consolidateTileSet(activeTileSet.id);
  }, [activeTileSet, consolidateTileSet]);

  const getGridPosition = (index: number) => {
    const alignmentColumns = tilePaletteColumns;
    const alignmentOffset = tilePaletteOffset;
    const rows = Math.max(1, layoutRows);
    const blockSize = alignmentColumns * rows;
    const adjusted = index + alignmentOffset;
    const block = Math.floor(adjusted / blockSize);
    const within = adjusted % blockSize;
    return {
      row: Math.floor(within / alignmentColumns),
      col: (within % alignmentColumns) + block * alignmentColumns,
    };
  };

  const buildSelectionFromList = (indices: number[], anchorIndex: number) => {
    if (indices.length === 0) {
      setTileSelection([anchorIndex], 1, 1, anchorIndex);
      return;
    }
    const positions = indices.map((index) => ({
      index,
      ...getGridPosition(index),
    }));
    const minCol = Math.min(...positions.map((pos) => pos.col));
    const maxCol = Math.max(...positions.map((pos) => pos.col));
    const minRow = Math.min(...positions.map((pos) => pos.row));
    const maxRow = Math.max(...positions.map((pos) => pos.row));
    const cols = maxCol - minCol + 1;
    const rows = maxRow - minRow + 1;
    const grid = new Array(cols * rows).fill(-1);
    for (const pos of positions) {
      const col = pos.col - minCol;
      const row = pos.row - minRow;
      const offset = row * cols + col;
      grid[offset] = pos.index;
    }
    setTileSelection(grid, cols, rows, anchorIndex);
  };

  const setSelectionFromIndices = (startIndex: number, endIndex: number) => {
    const startPos = getGridPosition(startIndex);
    const endPos = getGridPosition(endIndex);
    const minCol = Math.min(startPos.col, endPos.col);
    const maxCol = Math.max(startPos.col, endPos.col);
    const minRow = Math.min(startPos.row, endPos.row);
    const maxRow = Math.max(startPos.row, endPos.row);
    const cols = maxCol - minCol + 1;
    const rows = maxRow - minRow + 1;
    const grid = new Array(cols * rows).fill(-1);
    const alignmentColumns = tilePaletteColumns;
    const alignmentOffset = tilePaletteOffset;
    const layout = Math.max(1, layoutRows);
    const blockSize = alignmentColumns * layout;
    for (let row = minRow; row <= maxRow; row += 1) {
      for (let col = minCol; col <= maxCol; col += 1) {
        const block = Math.floor(col / alignmentColumns);
        const withinCol = col % alignmentColumns;
        const index =
          block * blockSize + row * alignmentColumns + withinCol - alignmentOffset;
        if (index < 0 || index >= totalTiles) {
          continue;
        }
        const offset = (row - minRow) * cols + (col - minCol);
        grid[offset] = index;
      }
    }
    setTileSelection(grid, cols, rows, startIndex);
  };

  const handleTilePointerDown = (
    index: number,
    options?: { additive?: boolean; subtractive?: boolean }
  ) => {
    selectingRef.current = true;
    selectionAnchorRef.current = index;
    if (options?.additive) {
      const merged = new Set([
        ...selectedTileIndices.filter((value) => value >= 0),
        index,
      ]);
      buildSelectionFromList(Array.from(merged), index);
      return;
    }
    if (options?.subtractive) {
      const next = selectedTileIndices.filter((value) => value >= 0 && value !== index);
      const nextIndices = next.length > 0 ? next : [index];
      buildSelectionFromList(nextIndices, index);
      return;
    }
    setSelectionFromIndices(index, index);
  };

  const handleTilePointerEnter = (index: number) => {
    if (!selectingRef.current || selectionAnchorRef.current === null) {
      return;
    }
    setSelectionFromIndices(selectionAnchorRef.current, index);
  };

  const handlePointerUp = () => {
    selectingRef.current = false;
    selectionAnchorRef.current = null;
  };

  useEffect(() => {
    const onPointerUp = () => handlePointerUp();
    window.addEventListener('pointerup', onPointerUp);
    return () => window.removeEventListener('pointerup', onPointerUp);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Delete' && event.key !== 'Backspace') {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName;
        if (tagName === 'INPUT' || tagName === 'TEXTAREA' || target.isContentEditable) {
          return;
        }
      }
      if (!activeTileSet || selectedIndices.length === 0) {
        return;
      }
      event.preventDefault();
      handleDeleteSelected();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeTileSet, handleDeleteSelected, selectedIndices.length]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) {
      return undefined;
    }
    const updateRows = () => {
      const height = grid.clientHeight;
      const cell = tileSwatchSize;
      const rows = Math.max(
        tilePaletteRowsMin,
        1,
        Math.floor((height + TILE_GRID_GAP) / (cell + TILE_GRID_GAP))
      );
      setLayoutRows(rows);
    };
    updateRows();
    const observer = new ResizeObserver(updateRows);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [tileSwatchSize, tilePaletteRowsMin]);

  return (
    <div className="tilebar">
      <div className="tilebar__layout">
        <div className="tilebar__controls">
          {activeTileSet ? (
            <>
              <div className="tilebar__select">
                <label className="panel__label" htmlFor="tile-set-select">
                  Tile Set
                </label>
                <DropdownSelect
                  ariaLabel="Tile Set"
                  value={activeTileSet.id}
                  onChange={setActiveTileSet}
                  options={tileSets.map((set) => ({ value: set.id, label: set.name }))}
                />
              </div>
              <div className="tilebar__select">
                <label className="panel__label" htmlFor="tile-cols-input">
                  Columns
                </label>
                <input
                  id="tile-cols-input"
                  type="number"
                  className="panel__number"
                  min={1}
                  max={MAX_TILE_PALETTE_COLUMNS}
                  step={1}
                  value={tilePaletteColumns}
                  onChange={(event) => {
                    const next = event.currentTarget.valueAsNumber;
                    if (Number.isFinite(next)) {
                      setTilePaletteColumns(
                        Math.max(1, Math.min(MAX_TILE_PALETTE_COLUMNS, Math.round(next)))
                      );
                    }
                  }}
                />
              </div>
              <div className="tilebar__select">
                <label className="panel__label" htmlFor="tile-rows-input">
                  Rows
                </label>
                <input
                  id="tile-rows-input"
                  type="number"
                  className="panel__number"
                  min={1}
                  step={1}
                  value={tilePaletteRowsMin}
                  onChange={(event) => {
                    const next = event.currentTarget.valueAsNumber;
                    if (Number.isFinite(next)) {
                      setTilePaletteRowsMin(Math.max(1, Math.round(next)));
                    }
                  }}
                />
              </div>
              <div className="tilebar__select">
                <label className="panel__label" htmlFor="tile-offset-input">
                  Offset
                </label>
                <input
                  id="tile-offset-input"
                  type="number"
                  className="panel__number"
                  min={0}
                  step={1}
                  value={tilePaletteOffset}
                  onChange={(event) => {
                    const next = event.currentTarget.valueAsNumber;
                    if (Number.isFinite(next)) {
                      setTilePaletteOffset(Math.max(0, Math.round(next)));
                    }
                  }}
                />
              </div>
              <div className="tilebar__actions">
                <button
                  type="button"
                  className="panel__item"
                  onClick={handleConsolidate}
                  disabled={!activeTileSet || totalTiles === 0}
                >
                  Consolidate
                </button>
                <button
                  type="button"
                  className="panel__item"
                  onClick={handleDeleteSelected}
                  disabled={!activeTileSet || selectedIndices.length === 0}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <span className="panel__label">Tiles</span>
          )}
        </div>
        <div
          ref={gridRef}
          className="tilebar__grid"
          style={
            {
              '--tile-swatch-size': `${tileSwatchSize}px`,
              '--tile-cell-size': `${tileSwatchSize}px`,
              '--tile-grid-columns': Math.max(
                tilePaletteColumns,
                Math.ceil(
                  totalSlots /
                    (Math.max(1, layoutRows) * Math.max(1, tilePaletteColumns))
                ) * tilePaletteColumns
              ),
              '--tile-grid-rows': layoutRows,
            } as React.CSSProperties
          }
        >
          {!activeTileSet ? (
            <div className="tilebar__empty">No tiles yet. Use Tile Sampler to capture some.</div>
          ) : totalTiles === 0 ? (
            <div className="tilebar__empty">No tiles in this set yet.</div>
          ) : (
            Array.from({ length: totalSlots }, (_value, slotIndex) => {
              const alignmentColumns = tilePaletteColumns;
              const alignmentOffset = tilePaletteOffset;
              const rows = Math.max(1, layoutRows);
              const blockSize = alignmentColumns * rows;
              const adjusted = slotIndex;
              const block = Math.floor(adjusted / blockSize);
              const within = adjusted % blockSize;
              const row = Math.floor(within / alignmentColumns);
              const col = (within % alignmentColumns) + block * alignmentColumns;
              const tileIndex = slotIndex - alignmentOffset;
              const isPlaceholder = tileIndex < 0 || tileIndex >= totalTiles;
              const tile = !isPlaceholder ? tiles[tileIndex] : null;
              const isSelected = !isPlaceholder && selectionSet.has(tileIndex);
              return (
                <button
                  key={
                    isPlaceholder ? `placeholder-${slotIndex}` : tile?.id ?? `tile-${slotIndex}`
                  }
                  type="button"
                  className="tilebar__tile"
                  data-active={tileIndex === selectedTileIndex}
                  data-selected={isSelected}
                  data-placeholder={isPlaceholder}
                  style={{ gridColumn: col + 1, gridRow: row + 1 }}
                  onPointerDown={(event) => {
                    if (!isPlaceholder) {
                      handleTilePointerDown(tileIndex, {
                        additive: event.shiftKey,
                        subtractive: event.ctrlKey || event.metaKey,
                      });
                    }
                  }}
                  onPointerEnter={() => {
                    if (!isPlaceholder) {
                      handleTilePointerEnter(tileIndex);
                    }
                  }}
                  aria-label={`Tile ${tileIndex + 1}`}
                  disabled={isPlaceholder}
                >
                  {tile ? (
                    <TileCanvas
                      pixels={tile.pixels}
                      tileWidth={activeTileSet.tileWidth}
                      tileHeight={activeTileSet.tileHeight}
                      palette={palette}
                    />
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TileBar;
