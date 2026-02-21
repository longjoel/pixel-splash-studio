import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePaletteStore } from '@/state/paletteStore';
import { useTileMapStore } from '@/state/tileMapStore';

type TileCanvasProps = {
  pixels: number[];
  tileWidth: number;
  tileHeight: number;
  pixelSize: number;
  palette: string[];
};

const TileCanvas = ({ pixels, tileWidth, tileHeight, pixelSize, palette }: TileCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const width = tileWidth * pixelSize;
    const height = tileHeight * pixelSize;
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
        context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }, [pixels, tileWidth, tileHeight, pixelSize, palette]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
};

const TileBar = () => {
  const tileSets = useTileMapStore((state) => state.tileSets);
  const activeTileSetId = useTileMapStore((state) => state.activeTileSetId);
  const tilePage = useTileMapStore((state) => state.tilePage);
  const tilePageCount = useTileMapStore((state) => state.tilePageCount);
  const setTilePageCount = useTileMapStore((state) => state.setTilePageCount);
  const selectedTileIndex = useTileMapStore((state) => state.selectedTileIndex);
  const selectedTileIndices = useTileMapStore((state) => state.selectedTileIndices);
  const tilePickerZoom = useTileMapStore((state) => state.tilePickerZoom);
  const setTileSelection = useTileMapStore((state) => state.setTileSelection);
  const setActiveTileSet = useTileMapStore((state) => state.setActiveTileSet);
  const deleteTilesFromSet = useTileMapStore((state) => state.deleteTilesFromSet);
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
  const layoutColumns = Math.max(1, activeTileSet?.columns ?? 1);
  const layoutRows = Math.max(1, activeTileSet?.rows ?? 1);
  const blockSize = layoutColumns * layoutRows;
  const totalGroups = Math.max(1, Math.ceil(totalTiles / blockSize));

  const tileSwatchSize = activeTileSet
    ? Math.max(16, activeTileSet.tileWidth * tilePickerZoom)
    : 32;
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });
  const clusterWidth = layoutColumns * tileSwatchSize;
  const clusterHeight = layoutRows * tileSwatchSize;
  const groupsPerRow = useMemo(() => {
    if (gridSize.width <= 0) {
      return 1;
    }
    const fit = Math.floor((gridSize.width + 8) / Math.max(1, clusterWidth + 8));
    return Math.max(1, Math.min(totalGroups, fit));
  }, [clusterWidth, gridSize.width, totalGroups]);
  const visibleRows = useMemo(() => {
    if (gridSize.height <= 0) {
      return 1;
    }
    const fit = Math.floor((gridSize.height + 8) / Math.max(1, clusterHeight + 8));
    return Math.max(1, fit);
  }, [clusterHeight, gridSize.height]);
  const groupsPerPage = Math.max(1, groupsPerRow * visibleRows);
  const totalPages = Math.max(1, Math.ceil(totalGroups / groupsPerPage));
  const clampedPage = Math.min(tilePage, totalPages - 1);
  const pageStartGroup = clampedPage * groupsPerPage;
  const pageGroupCount = Math.max(0, Math.min(groupsPerPage, totalGroups - pageStartGroup));
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

  const syncGridMetrics = useCallback(() => {
    const node = gridRef.current;
    if (!node) {
      return;
    }
    const width = Math.floor(node.clientWidth || node.getBoundingClientRect().width || 0);
    const height = Math.floor(node.clientHeight || node.getBoundingClientRect().height || 0);
    setGridSize((prev) =>
      prev.width === width && prev.height === height ? prev : { width, height }
    );
  }, []);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) {
      return;
    }
    const updateMetrics = () => {
      syncGridMetrics();
    };
    updateMetrics();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateMetrics);
      return () => {
        window.removeEventListener('resize', updateMetrics);
      };
    }
    const observer = new ResizeObserver(() => updateMetrics());
    const container = node.parentElement;
    if (container) {
      observer.observe(container);
    }
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [syncGridMetrics]);

  useEffect(() => {
    if (tilePageCount !== totalPages) {
      setTilePageCount(totalPages);
    }
  }, [setTilePageCount, tilePageCount, totalPages]);

  useEffect(() => {
    syncGridMetrics();
    const raf = window.requestAnimationFrame(() => {
      syncGridMetrics();
    });
    return () => window.cancelAnimationFrame(raf);
  }, [syncGridMetrics, tileSwatchSize, totalGroups, totalPages, clampedPage]);

  const getGridPosition = (index: number) => {
    const block = Math.floor(index / blockSize);
    const within = index % blockSize;
    const withinCol = within % layoutColumns;
    const withinRow = Math.floor(within / layoutColumns);
    const groupCol = block % groupsPerRow;
    const groupRow = Math.floor(block / groupsPerRow);
    return {
      row: groupRow * layoutRows + withinRow,
      col: groupCol * layoutColumns + withinCol,
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
    for (let row = minRow; row <= maxRow; row += 1) {
      for (let col = minCol; col <= maxCol; col += 1) {
        const groupCol = Math.floor(col / layoutColumns);
        const groupRow = Math.floor(row / layoutRows);
        const withinCol = col % layoutColumns;
        const withinRow = row % layoutRows;
        const block = groupRow * groupsPerRow + groupCol;
        const index = block * blockSize + withinRow * layoutColumns + withinCol;
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

  const handleGridWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    const node = gridRef.current;
    if (!node) {
      return;
    }
    if (node.scrollHeight <= node.clientHeight) {
      return;
    }
    node.scrollTop += event.deltaY;
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <div className="tilebar">
      <div
        ref={gridRef}
        className="tilebar__grid"
        onWheel={handleGridWheel}
        style={
          {
            '--tile-cell-size': `${tileSwatchSize}px`,
            '--tile-cluster-columns': `${layoutColumns}`,
            '--tile-cluster-rows': `${layoutRows}`,
          } as React.CSSProperties
        }
      >
        {!activeTileSet ? (
          <div className="tilebar__empty">No tiles yet. Use Tile Sampler to capture some.</div>
        ) : totalTiles === 0 ? (
          <div className="tilebar__empty">No tiles in this set yet.</div>
        ) : (
          Array.from({ length: pageGroupCount }, (_value, groupOffset) => {
            const groupIndex = pageStartGroup + groupOffset;
            const startIndex = groupIndex * blockSize;
            return (
              <div key={`cluster-${groupIndex}`} className="tilebar__cluster">
                {Array.from({ length: blockSize }, (_cell, withinIndex) => {
                  const tileIndex = startIndex + withinIndex;
                  const isPlaceholder = tileIndex < 0 || tileIndex >= totalTiles;
                  const tile = !isPlaceholder ? tiles[tileIndex] : null;
                  const isSelected = !isPlaceholder && selectionSet.has(tileIndex);
                  return (
                    <button
                      key={
                        isPlaceholder
                          ? `placeholder-${tileIndex}`
                          : tile?.id ?? `tile-${tileIndex}`
                      }
                      type="button"
                      className="tilebar__tile"
                      data-active={tileIndex === selectedTileIndex}
                      data-selected={isSelected}
                      data-placeholder={isPlaceholder}
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
                          pixelSize={tilePickerZoom}
                          palette={palette}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TileBar;
