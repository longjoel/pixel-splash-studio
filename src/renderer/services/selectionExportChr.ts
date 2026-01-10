import { usePaletteStore } from '@/state/paletteStore';
import { collectSelectionPixels } from './selectionData';
import {
  buildSelectionRgb,
  buildTileBytes,
  ditherToPalette,
  padToTiles,
  pickFourColorPalette,
} from './selectionExportTiles';

export const exportSelectionAsChr = async () => {
  if (!window.projectApi?.exportChr) {
    window.alert('CHR export is unavailable. Restart the app to load the latest export support.');
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

  const { data: tileData } = buildTileBytes(indices, padWidth, padHeight);
  const suggestedName = `pixel-splash-selection-${padWidth}x${padHeight}.chr`;
  return window.projectApi.exportChr(tileData, suggestedName);
};
