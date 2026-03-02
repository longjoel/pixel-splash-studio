import { collectSelectionPixels } from './selectionData';
import { buildSelectionImageData } from './selectionExportData';
import { platform } from '@/platform/api';

export const exportSelectionAsPng = async () => {
  const selection = collectSelectionPixels();
  if (!selection) {
    platform.alert('Select a region to export.');
    return null;
  }

  const { data, width, height } = buildSelectionImageData(selection);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) {
    platform.alert('Unable to export selection.');
    return null;
  }
  const imageData = new ImageData(data, width, height);
  context.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((result) => resolve(result), 'image/png')
  );
  if (!blob) {
    platform.alert('Unable to export selection.');
    return null;
  }

  const projectApi = platform.project();
  if (!projectApi?.exportPng) {
    platform.alert('PNG export is unavailable in this host.');
    return null;
  }
  const buffer = new Uint8Array(await blob.arrayBuffer());
  const suggestedName = `pixel-splash-selection-${width}x${height}.png`;
  return projectApi.exportPng(buffer, suggestedName);
};
