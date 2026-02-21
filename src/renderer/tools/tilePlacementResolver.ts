import type { TilePayload, TilePlacementMode } from '@/state/tileMapStore';

type TilePixels = Pick<TilePayload, 'pixels'>;

const hasTransparentPixels = (pixels: number[]) => pixels.some((value) => value === 0);
const isFullyTransparent = (pixels: number[]) => pixels.every((value) => value === 0);

export class TilePlacementResolver {
  private readonly tiles: number[][];
  private readonly tileIndexBySignature = new Map<string, number>();
  private readonly pendingTiles: Array<Omit<TilePayload, 'id'>> = [];

  constructor(tileSetTiles: TilePixels[]) {
    this.tiles = tileSetTiles.map((tile) => tile.pixels.slice());
    this.tiles.forEach((pixels, index) => {
      this.tileIndexBySignature.set(pixels.join(','), index);
    });
  }

  resolve(
    mode: TilePlacementMode,
    sourceTileIndex: number,
    destinationTileIndex: number
  ): number {
    if (sourceTileIndex < 0) {
      return sourceTileIndex;
    }
    const sourcePixels = this.tiles[sourceTileIndex];
    if (!sourcePixels) {
      return destinationTileIndex;
    }
    if (mode === 'hard' || !hasTransparentPixels(sourcePixels)) {
      return sourceTileIndex;
    }

    const destinationPixels =
      destinationTileIndex >= 0 ? this.tiles[destinationTileIndex] : undefined;
    const blended = sourcePixels.map((value, index) =>
      value === 0 ? destinationPixels?.[index] ?? 0 : value
    );

    if (isFullyTransparent(blended)) {
      return -1;
    }

    const signature = blended.join(',');
    const existingIndex = this.tileIndexBySignature.get(signature);
    if (existingIndex !== undefined) {
      return existingIndex;
    }

    const nextIndex = this.tiles.length;
    this.tiles.push(blended);
    this.tileIndexBySignature.set(signature, nextIndex);
    this.pendingTiles.push({ pixels: blended });
    return nextIndex;
  }

  getTilePixels(index: number): number[] | null {
    if (index < 0 || index >= this.tiles.length) {
      return null;
    }
    return this.tiles[index] ?? null;
  }

  getPendingTiles(): Array<Omit<TilePayload, 'id'>> {
    return this.pendingTiles.slice();
  }
}
