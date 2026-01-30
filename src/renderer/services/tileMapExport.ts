import { hexToRgb } from '@/core/colorUtils';
import { usePaletteStore } from '@/state/paletteStore';
import { useTileMapStore } from '@/state/tileMapStore';

type TileBounds = {
  minTileX: number;
  maxTileX: number;
  minTileY: number;
  maxTileY: number;
};

const ATLAS_EXTRUDE_PX = 1;

const buildTileAtlas = async (
  tileSet: { tileWidth: number; tileHeight: number; tiles: Array<{ pixels: number[] }> },
  palette: string[],
  tileIndices: number[]
) => {
  const columns = Math.min(16, Math.max(1, tileIndices.length));
  const rows = Math.max(1, Math.ceil(tileIndices.length / columns));
  const extrude = ATLAS_EXTRUDE_PX;
  const margin = extrude;
  const spacing = extrude * 2;
  const width = columns * (tileSet.tileWidth + spacing);
  const height = rows * (tileSet.tileHeight + spacing);
  const rgba = new Uint8ClampedArray(width * height * 4);
  const paletteRgb = palette.map((color) => hexToRgb(color) ?? { r: 0, g: 0, b: 0 });

  const setRgba = (x: number, y: number, color: { r: number; g: number; b: number }) => {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      return;
    }
    const dest = (y * width + x) * 4;
    rgba[dest] = color.r;
    rgba[dest + 1] = color.g;
    rgba[dest + 2] = color.b;
    rgba[dest + 3] = 255;
  };

  tileIndices.forEach((tileIndex, index) => {
    const tile = tileSet.tiles[tileIndex];
    if (!tile) {
      return;
    }
    const baseX = (index % columns) * (tileSet.tileWidth + spacing);
    const baseY = Math.floor(index / columns) * (tileSet.tileHeight + spacing);
    for (let y = 0; y < tileSet.tileHeight; y += 1) {
      for (let x = 0; x < tileSet.tileWidth; x += 1) {
        const paletteIndex = tile.pixels[y * tileSet.tileWidth + x] ?? 0;
        if (paletteIndex === 0) {
          continue;
        }
        const color = paletteRgb[paletteIndex] ?? paletteRgb[0] ?? { r: 0, g: 0, b: 0 };
        const destX = baseX + margin + x;
        const destY = baseY + margin + y;
        setRgba(destX, destY, color);

        // Extrude edge pixels into the surrounding border to avoid visible seams when
        // tiles are rendered with filtering.
        if (extrude > 0) {
          if (x === 0) setRgba(destX - 1, destY, color);
          if (x === tileSet.tileWidth - 1) setRgba(destX + 1, destY, color);
          if (y === 0) setRgba(destX, destY - 1, color);
          if (y === tileSet.tileHeight - 1) setRgba(destX, destY + 1, color);

          if (x === 0 && y === 0) setRgba(destX - 1, destY - 1, color);
          if (x === 0 && y === tileSet.tileHeight - 1) setRgba(destX - 1, destY + 1, color);
          if (x === tileSet.tileWidth - 1 && y === 0) setRgba(destX + 1, destY - 1, color);
          if (x === tileSet.tileWidth - 1 && y === tileSet.tileHeight - 1)
            setRgba(destX + 1, destY + 1, color);
        }
      }
    }
  });

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Unable to export tile atlas.');
  }
  const imageData = new ImageData(rgba, width, height);
  context.putImageData(imageData, 0, 0);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((result) => resolve(result), 'image/png')
  );
  if (!blob) {
    throw new Error('Unable to export tile atlas.');
  }
  const buffer = new Uint8Array(await blob.arrayBuffer());
  return { buffer, columns, rows, width, height, margin, spacing };
};

export const exportTileMapRegion = async (bounds: TileBounds) => {
  if (!window.projectApi?.exportTileMap) {
    window.alert('Tile export is unavailable. Restart the app to load the latest export support.');
    return null;
  }

  const tileStore = useTileMapStore.getState();
  const tileSet = tileStore.tileSets.find((set) => set.id === tileStore.activeTileSetId);
  if (!tileSet) {
    window.alert('No tile set available.');
    return null;
  }

  const activeMap =
    tileStore.tileMaps.find(
      (map) => map.id === tileStore.activeTileMapId && map.tileSetId === tileSet.id
    ) ?? tileStore.tileMaps.find((map) => map.tileSetId === tileSet.id);
  if (!activeMap) {
    window.alert('No tile map available.');
    return null;
  }

  const originTileX = Math.round(activeMap.originX / tileSet.tileWidth);
  const originTileY = Math.round(activeMap.originY / tileSet.tileHeight);
  const mapWidth = bounds.maxTileX - bounds.minTileX + 1;
  const mapHeight = bounds.maxTileY - bounds.minTileY + 1;
  const selectionTiles: number[] = [];
  const usedTiles = new Set<number>();

  for (let row = 0; row < mapHeight; row += 1) {
    for (let col = 0; col < mapWidth; col += 1) {
      const worldTileX = bounds.minTileX + col;
      const worldTileY = bounds.minTileY + row;
      const mapX = worldTileX - originTileX;
      const mapY = worldTileY - originTileY;
      let tileIndex = -1;
      if (
        mapX >= 0 &&
        mapX < activeMap.columns &&
        mapY >= 0 &&
        mapY < activeMap.rows
      ) {
        tileIndex = activeMap.tiles[mapY * activeMap.columns + mapX] ?? -1;
      }
      selectionTiles.push(tileIndex);
      if (tileIndex >= 0 && tileIndex < tileSet.tiles.length) {
        usedTiles.add(tileIndex);
      }
    }
  }

  if (usedTiles.size === 0) {
    window.alert('No tiles in the selected region.');
    return null;
  }

  const usedTileIndices = Array.from(usedTiles).sort((a, b) => a - b);
  const tileIndexMap = new Map<number, number>();
  usedTileIndices.forEach((index, order) => tileIndexMap.set(index, order));
  const gids = selectionTiles.map((tileIndex) => {
    if (tileIndex < 0) {
      return 0;
    }
    const mapped = tileIndexMap.get(tileIndex);
    return mapped === undefined ? 0 : mapped + 1;
  });

  const palette = usePaletteStore.getState().colors;
  const atlas = await buildTileAtlas(tileSet, palette, usedTileIndices);
  const dataRows: string[] = [];
  for (let row = 0; row < mapHeight; row += 1) {
    const start = row * mapWidth;
    const rowValues = gids.slice(start, start + mapWidth).join(',');
    // Tiled's CSV parser expects comma-separated values; a newline alone is not a delimiter.
    // Add a comma between each row so "...,<newline>..." doesn't become a corrupt token.
    dataRows.push(row === mapHeight - 1 ? rowValues : `${rowValues},`);
  }

  const tmx = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.0" orientation="orthogonal" renderorder="right-down" width="${mapWidth}" height="${mapHeight}" tilewidth="${tileSet.tileWidth}" tileheight="${tileSet.tileHeight}" infinite="0" nextlayerid="2" nextobjectid="1">
  <tileset firstgid="1" name="tiles" tilewidth="${tileSet.tileWidth}" tileheight="${tileSet.tileHeight}" tilecount="${usedTileIndices.length}" columns="${atlas.columns}" spacing="${atlas.spacing}" margin="${atlas.margin}">
    <image source="tiles.png" width="${atlas.width}" height="${atlas.height}"/>
  </tileset>
  <layer id="1" name="Tile Layer 1" width="${mapWidth}" height="${mapHeight}">
    <data encoding="csv">
${dataRows.join('\n')}
    </data>
  </layer>
</map>
`;

  return window.projectApi.exportTileMap({
    png: atlas.buffer,
    tmx,
  });
};
