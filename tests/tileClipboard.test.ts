import { beforeEach, describe, expect, it } from 'vitest';
import { useClipboardStore } from '@/state/clipboardStore';
import { useHistoryStore } from '@/state/historyStore';
import { useSelectionStore } from '@/state/selectionStore';
import { useTileMapStore } from '@/state/tileMapStore';
import { copyTilesToClipboard, cutTilesToClipboard, pasteTilesFromClipboard } from '@/services/tileClipboard';
import { useViewportStore } from '@/state/viewportStore';
import { useToolStore } from '@/state/toolStore';

const makeTile = (value: number) => ({ pixels: new Array(64).fill(value) });

const selectMapCells = (
  map: { originX: number; originY: number; columns: number; rows: number },
  tileSize: { width: number; height: number },
  cells: Array<{ col: number; row: number }>
) => {
  const pixels: Array<{ x: number; y: number; selected: boolean }> = [];
  for (const cell of cells) {
    if (cell.col < 0 || cell.row < 0 || cell.col >= map.columns || cell.row >= map.rows) {
      continue;
    }
    const baseX = map.originX + cell.col * tileSize.width;
    const baseY = map.originY + cell.row * tileSize.height;
    for (let y = 0; y < tileSize.height; y += 1) {
      for (let x = 0; x < tileSize.width; x += 1) {
        pixels.push({ x: baseX + x, y: baseY + y, selected: true });
      }
    }
  }
  useSelectionStore.getState().setSelections(pixels);
};

describe('tile clipboard', () => {
  beforeEach(() => {
    useClipboardStore.getState().clear();
    useHistoryStore.getState().clear();
    useSelectionStore.getState().clear();
    useTileMapStore.getState().clear();
    useViewportStore.getState().setSize(0, 0);
    useViewportStore.getState().setCamera({ x: 0, y: 0, zoom: 1 });
    useToolStore.getState().setActiveTool('pen');
  });

  it('copies palette tile selection into tile clipboard', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Palette Set',
      tileWidth: 8,
      tileHeight: 8,
      columns: 2,
      rows: 2,
      tiles: Array.from({ length: 4 }, (_, index) => makeTile(index)),
    });
    tileStore.setActiveTileSet(tileSetId);
    tileStore.setTileSelection([0, 1, 2, 3], 2, 2, 0);

    const copied = copyTilesToClipboard();
    const buffer = useClipboardStore.getState().tileBuffer;

    expect(copied).toBe(true);
    expect(buffer?.tileSetId).toBe(tileSetId);
    expect(buffer?.source).toBe('palette');
    expect(buffer?.cols).toBe(2);
    expect(buffer?.rows).toBe(2);
    expect(buffer?.tiles).toEqual([0, 1, 2, 3]);
    expect(useToolStore.getState().activeTool).toBe('tile-stamp');
  });

  it('copies selected tile-map region into tile clipboard', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Map Set',
      tileWidth: 8,
      tileHeight: 8,
      columns: 2,
      rows: 2,
      tiles: Array.from({ length: 6 }, (_, index) => makeTile(index)),
    });
    tileStore.setActiveTileSet(tileSetId);
    const tileMapId = tileStore.addTileMap({
      name: 'Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 3,
      rows: 2,
      tiles: [0, 1, 2, 3, 4, 5],
    });
    tileStore.setActiveTileMap(tileMapId);

    const map = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);
    expect(map).toBeTruthy();
    selectMapCells(
      map!,
      { width: 8, height: 8 },
      [
        { col: 1, row: 1 },
        { col: 2, row: 1 },
      ]
    );

    const copied = copyTilesToClipboard();
    const buffer = useClipboardStore.getState().tileBuffer;

    expect(copied).toBe(true);
    expect(buffer?.source).toBe('map');
    expect(buffer?.cols).toBe(2);
    expect(buffer?.rows).toBe(1);
    expect(buffer?.tiles).toEqual([4, 5]);
    expect(useSelectionStore.getState().selectedCount).toBe(0);
    expect(useToolStore.getState().activeTool).toBe('tile-stamp');
  });

  it('pastes tile clipboard into tile map anchored to selected map cell', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Paste Set',
      tileWidth: 8,
      tileHeight: 8,
      columns: 2,
      rows: 2,
      tiles: Array.from({ length: 4 }, (_, index) => makeTile(index)),
    });
    tileStore.setActiveTileSet(tileSetId);
    const tileMapId = tileStore.addTileMap({
      name: 'Paste Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 2,
      rows: 2,
      tiles: [-1, -1, -1, -1],
    });
    tileStore.setActiveTileMap(tileMapId);
    useClipboardStore.getState().setTileBuffer({
      tileSetId,
      tiles: [0, 1, 2, 3],
      cols: 2,
      rows: 2,
      source: 'palette',
    });

    const map = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);
    expect(map).toBeTruthy();
    selectMapCells(map!, { width: 8, height: 8 }, [{ col: 1, row: 1 }]);

    const pasted = pasteTilesFromClipboard();
    const updatedMap = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);

    expect(pasted).toBe(true);
    expect(updatedMap?.columns).toBe(3);
    expect(updatedMap?.rows).toBe(3);
    expect(updatedMap?.tiles[1 * 3 + 1]).toBe(0);
    expect(updatedMap?.tiles[1 * 3 + 2]).toBe(1);
    expect(updatedMap?.tiles[2 * 3 + 1]).toBe(2);
    expect(updatedMap?.tiles[2 * 3 + 2]).toBe(3);
  });

  it('cuts selected map tiles and records undo history', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Cut Set',
      tileWidth: 8,
      tileHeight: 8,
      columns: 1,
      rows: 1,
      tiles: [makeTile(1)],
    });
    tileStore.setActiveTileSet(tileSetId);
    const tileMapId = tileStore.addTileMap({
      name: 'Cut Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 1,
      rows: 1,
      tiles: [0],
    });
    tileStore.setActiveTileMap(tileMapId);
    const map = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);
    expect(map).toBeTruthy();
    selectMapCells(map!, { width: 8, height: 8 }, [{ col: 0, row: 0 }]);

    const cut = cutTilesToClipboard();
    let updatedMap = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);

    expect(cut).toBe(true);
    expect(updatedMap?.tiles[0]).toBe(-1);
    expect(useHistoryStore.getState().undoStack.length).toBe(1);
    expect(useSelectionStore.getState().selectedCount).toBe(0);
    expect(useToolStore.getState().activeTool).toBe('tile-stamp');

    useHistoryStore.getState().undo();
    updatedMap = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);
    expect(updatedMap?.tiles[0]).toBe(0);
  });

  it('pastes to viewport center tile when no map selection exists', () => {
    const tileStore = useTileMapStore.getState();
    const tileSetId = tileStore.addTileSet({
      name: 'Center Paste Set',
      tileWidth: 8,
      tileHeight: 8,
      columns: 1,
      rows: 1,
      tiles: [makeTile(1)],
    });
    tileStore.setActiveTileSet(tileSetId);
    const tileMapId = tileStore.addTileMap({
      name: 'Center Paste Map',
      tileSetId,
      originX: 0,
      originY: 0,
      columns: 4,
      rows: 4,
      tiles: new Array(16).fill(-1),
    });
    tileStore.setActiveTileMap(tileMapId);
    useClipboardStore.getState().setTileBuffer({
      tileSetId,
      tiles: [0],
      cols: 1,
      rows: 1,
      source: 'palette',
    });
    useViewportStore.getState().setSize(240, 240);
    useViewportStore.getState().setCamera({ x: 72, y: -24, zoom: 1 });

    const pasted = pasteTilesFromClipboard();
    const updatedMap = useTileMapStore.getState().tileMaps.find((entry) => entry.id === tileMapId);

    expect(pasted).toBe(true);
    expect(updatedMap?.tiles[1 * 4 + 2]).toBe(0);
  });
});
