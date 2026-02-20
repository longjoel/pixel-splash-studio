import { collectSelectionPixels } from '@/services/selectionData';
import { buildSelectionImageData } from '@/services/selectionExportData';

export const buildSelectionPngBase64 = async (): Promise<string | null> => {
  const selection = collectSelectionPixels();
  if (!selection) {
    return null;
  }

  const { data, width, height } = buildSelectionImageData(selection);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }
  const imageData = new ImageData(data, width, height);
  context.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((result) => resolve(result), 'image/png')
  );
  if (!blob) {
    return null;
  }
  const buffer = new Uint8Array(await blob.arrayBuffer());
  let binary = '';
  for (const byte of buffer) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
};

