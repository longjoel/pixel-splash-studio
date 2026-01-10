import { usePaletteStore } from '@/state/paletteStore';
import { collectSelectionPixels } from './selectionData';
import {
  TILE_SIZE,
  buildSelectionRgb,
  buildTileBytes,
  ditherToPalette,
  padToTiles,
  pickFourColorPalette,
} from './selectionExportTiles';

const writeWord = (view: DataView, offset: number, value: number) => {
  view.setUint16(offset, value, true);
};

const writeLong = (view: DataView, offset: number, value: number) => {
  view.setUint32(offset, value, true);
};

const writeString = (view: DataView, offset: number, value: string, maxLength: number) => {
  const bytes = new TextEncoder().encode(value);
  const length = Math.min(bytes.length, maxLength - 1);
  for (let i = 0; i < length; i += 1) {
    view.setUint8(offset + i, bytes[i]);
  }
  view.setUint8(offset + length, 0);
  for (let i = length + 1; i < maxLength; i += 1) {
    view.setUint8(offset + i, 0);
  }
};

const buildGbrFile = (
  tileData: Uint8Array,
  tileCount: number,
  colorSet: number[]
) => {
  const nameLength = 30;
  const objectDataLength =
    nameLength + 2 + 2 + 2 + 4 + tileData.length;
  const fileLength = 4 + 8 + objectDataLength;

  const buffer = new ArrayBuffer(fileLength);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  bytes.set([0x47, 0x42, 0x4f, 0x30], 0);

  writeWord(view, 4, 0x0002);
  writeWord(view, 6, 0x0001);
  writeLong(view, 8, objectDataLength);

  let cursor = 12;
  writeString(view, cursor, 'Pixel Splash Studio', nameLength);
  cursor += nameLength;
  writeWord(view, cursor, TILE_SIZE);
  cursor += 2;
  writeWord(view, cursor, TILE_SIZE);
  cursor += 2;
  writeWord(view, cursor, tileCount);
  cursor += 2;
  for (let i = 0; i < 4; i += 1) {
    bytes[cursor + i] = colorSet[i] ?? i;
  }
  cursor += 4;
  bytes.set(tileData, cursor);

  return new Uint8Array(buffer);
};

export const exportSelectionAsGbr = async () => {
  if (!window.projectApi?.exportGbr) {
    window.alert('Game Boy export is unavailable. Restart the app to load the latest export support.');
    return null;
  }

  const selection = collectSelectionPixels();
  if (!selection) {
    window.alert('Select a region to export.');
    return null;
  }

  const paletteState = usePaletteStore.getState();
  const { paletteIndices, paletteRgb } = pickFourColorPalette(selection, paletteState.colors);
  if (paletteIndices.length < 4) {
    window.alert('Palette needs at least 4 colors to export.');
    return null;
  }

  const padWidth = padToTiles(selection.maxX - selection.minX + 1);
  const padHeight = padToTiles(selection.maxY - selection.minY + 1);
  const mappedPalette = paletteIndices.map((idx) => paletteRgb[idx]);

  const { data } = buildSelectionRgb(selection, paletteRgb, padWidth, padHeight);
  const indices = ditherToPalette(data, padWidth, padHeight, mappedPalette);

  const { data: tileData, tileCount } = buildTileBytes(indices, padWidth, padHeight);
  const gbr = buildGbrFile(tileData, tileCount, [0, 1, 2, 3]);

  const suggestedName = `pixel-splash-selection-${padWidth}x${padHeight}.gbr`;
  return window.projectApi.exportGbr(gbr, suggestedName);
};
