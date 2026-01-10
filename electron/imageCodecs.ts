import { extname } from 'path';
import { readFile } from 'fs/promises';
import bmp from 'bmp-js';
import { parseGIF, decompressFrames } from 'gifuct-js';
import PCX from 'pcx-js';
import TGA from 'tga';
import GIFEncoder from 'gif-encoder-2';
import { PCX as ElmaPCX, writePCX } from 'elma-pcx';

export type DecodedImage = {
  format: string;
  width: number;
  height: number;
  colorType: 'indexed' | 'rgba';
  pixels: Uint8Array;
  palette?: Array<[number, number, number]>;
  transparentIndex?: number;
};

export type ExportImagePayload =
  | {
      kind: 'rgba';
      width: number;
      height: number;
      data: Uint8Array;
    }
  | {
      kind: 'indexed';
      width: number;
      height: number;
      data: Uint8Array;
      palette: Uint8Array;
    };

const toArrayBuffer = (buffer: Buffer) =>
  buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

const abgrToRgba = (data: Uint8Array) => {
  const rgba = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i += 4) {
    rgba[i] = data[i + 3];
    rgba[i + 1] = data[i + 2];
    rgba[i + 2] = data[i + 1];
    rgba[i + 3] = data[i];
  }
  return rgba;
};

const rgbaToAbgr = (data: Uint8Array) => {
  const abgr = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i += 4) {
    abgr[i] = data[i + 3];
    abgr[i + 1] = data[i + 2];
    abgr[i + 2] = data[i + 1];
    abgr[i + 3] = data[i];
  }
  return abgr;
};

const buildPaletteFromBytes = (palette: Uint8Array) => {
  const colors: Array<[number, number, number]> = [];
  for (let i = 0; i < palette.length; i += 3) {
    colors.push([palette[i], palette[i + 1], palette[i + 2]]);
  }
  return colors;
};

const decodeBmp = (buffer: Buffer): DecodedImage => {
  const decoded = bmp.decode(buffer);
  return {
    format: 'bmp',
    width: decoded.width,
    height: decoded.height,
    colorType: 'rgba',
    pixels: abgrToRgba(decoded.data),
  };
};

const decodeGif = (buffer: Buffer): DecodedImage => {
  const gif = parseGIF(toArrayBuffer(buffer));
  const frames = decompressFrames(gif, true);
  if (!frames.length) {
    throw new Error('GIF contained no frames');
  }
  const frame = frames[0];
  const width = gif.lsd.width;
  const height = gif.lsd.height;
  const palette = Array.isArray(frame.colorTable)
    ? frame.colorTable.map((color: number[]) => [color[0], color[1], color[2]])
    : undefined;

  if (
    palette &&
    frame.pixels &&
    frame.dims?.left === 0 &&
    frame.dims?.top === 0 &&
    frame.dims?.width === width &&
    frame.dims?.height === height
  ) {
    return {
      format: 'gif',
      width,
      height,
      colorType: 'indexed',
      pixels: Uint8Array.from(frame.pixels),
      palette,
      transparentIndex: frame.transparentIndex,
    };
  }

  const rgba = new Uint8Array(width * height * 4);
  if (frame.patch) {
    const patchWidth = frame.dims?.width ?? width;
    const patchHeight = frame.dims?.height ?? height;
    const offsetX = frame.dims?.left ?? 0;
    const offsetY = frame.dims?.top ?? 0;
    for (let y = 0; y < patchHeight; y += 1) {
      for (let x = 0; x < patchWidth; x += 1) {
        const srcIndex = (y * patchWidth + x) * 4;
        const destX = offsetX + x;
        const destY = offsetY + y;
        if (destX < 0 || destX >= width || destY < 0 || destY >= height) {
          continue;
        }
        const destIndex = (destY * width + destX) * 4;
        rgba[destIndex] = frame.patch[srcIndex];
        rgba[destIndex + 1] = frame.patch[srcIndex + 1];
        rgba[destIndex + 2] = frame.patch[srcIndex + 2];
        rgba[destIndex + 3] = frame.patch[srcIndex + 3];
      }
    }
  }

  return {
    format: 'gif',
    width,
    height,
    colorType: 'rgba',
    pixels: rgba,
  };
};

const decodePcx = (buffer: Buffer): DecodedImage => {
  if (buffer[0] !== 0x0a) {
    throw new Error('Not a PCX file.');
  }
  try {
    const pcx = new ElmaPCX(buffer);
    const paletteBytes = pcx.getPalette();
    return {
      format: 'pcx',
      width: pcx.width,
      height: pcx.height,
      colorType: 'indexed',
      pixels: pcx.getPixels(),
      palette: buildPaletteFromBytes(paletteBytes),
    };
  } catch (error) {
    const pcx = new PCX(buffer);
    const decoded = pcx.decode();
    const palette = decoded.palette ? buildPaletteFromBytes(decoded.palette) : undefined;
    return {
      format: 'pcx',
      width: decoded.width,
      height: decoded.height,
      colorType: 'rgba',
      pixels: new Uint8Array(decoded.pixelArray),
      palette,
    };
  }
};

const decodeTga = (buffer: Buffer): DecodedImage => {
  const tga = new TGA(buffer);
  return {
    format: 'tga',
    width: tga.width,
    height: tga.height,
    colorType: 'rgba',
    pixels: new Uint8Array(tga.pixels),
  };
};

const GAME_BOY_PALETTE: Array<[number, number, number]> = [
  [224, 248, 208],
  [136, 192, 112],
  [52, 104, 86],
  [8, 24, 32],
];

const decodeGbr = (buffer: Buffer): DecodedImage => {
  const view = new DataView(
    buffer.buffer,
    buffer.byteOffset,
    buffer.byteLength
  );
  const signature = buffer.subarray(0, 4).toString('ascii');
  if (signature !== 'GBO0') {
    throw new Error('Unsupported GBR signature.');
  }

  const readWord = (offset: number, little: boolean) =>
    view.getUint16(offset, little);
  const readLong = (offset: number, little: boolean) =>
    view.getUint32(offset, little);

  const expectedLength = buffer.byteLength - 12;
  let littleEndian = true;
  if (readLong(8, true) !== expectedLength && readLong(8, false) === expectedLength) {
    littleEndian = false;
  }

  let cursor = 12;
  cursor += 30; // name
  const tileWidth = readWord(cursor, littleEndian);
  cursor += 2;
  const tileHeight = readWord(cursor, littleEndian);
  cursor += 2;
  let tileCount = readWord(cursor, littleEndian);
  cursor += 2;
  const colorSet = [
    view.getUint8(cursor),
    view.getUint8(cursor + 1),
    view.getUint8(cursor + 2),
    view.getUint8(cursor + 3),
  ];
  cursor += 4;

  const bytesPerTile = Math.ceil((tileWidth * tileHeight) / 4);
  const remaining = buffer.byteLength - cursor;
  const inferredTiles = bytesPerTile > 0 ? Math.floor(remaining / bytesPerTile) : 0;
  if (!tileCount && inferredTiles > 0) {
    tileCount = inferredTiles;
  } else if (tileCount > inferredTiles) {
    tileCount = inferredTiles;
  }

  const tilesAcross = tileCount > 0 ? Math.min(16, tileCount) : 1;
  const tilesDown = tileCount > 0 ? Math.ceil(tileCount / tilesAcross) : 1;
  const width = tilesAcross * tileWidth;
  const height = tilesDown * tileHeight;
  const pixels = new Uint8Array(width * height);

  for (let tile = 0; tile < tileCount; tile += 1) {
    const tileX = tile % tilesAcross;
    const tileY = Math.floor(tile / tilesAcross);
    for (let y = 0; y < tileHeight; y += 1) {
      const low = view.getUint8(cursor);
      const high = view.getUint8(cursor + 1);
      cursor += 2;
      for (let x = 0; x < tileWidth; x += 1) {
        const bit = 7 - x;
        const value = ((high >> bit) & 0x01) << 1 | ((low >> bit) & 0x01);
        const mapped = colorSet[value] ?? value;
        const px = tileX * tileWidth + x;
        const py = tileY * tileHeight + y;
        pixels[py * width + px] = mapped;
      }
    }
  }

  return {
    format: 'gbr',
    width,
    height,
    colorType: 'indexed',
    pixels,
    palette: GAME_BOY_PALETTE,
  };
};

const NES_GRAYSCALE_PALETTE: Array<[number, number, number]> = [
  [0, 0, 0],
  [85, 85, 85],
  [170, 170, 170],
  [255, 255, 255],
];

const decodeNes = (buffer: Buffer): DecodedImage => {
  if (buffer.subarray(0, 4).toString('ascii') !== 'NES\x1a') {
    throw new Error('Invalid NES file header.');
  }
  const prgBanks = buffer[4];
  const chrBanks = buffer[5];
  const hasTrainer = (buffer[6] & 0x04) !== 0;
  if (chrBanks === 0) {
    throw new Error('NES file uses CHR RAM; no tile data to import.');
  }

  const headerSize = 16;
  const trainerSize = hasTrainer ? 512 : 0;
  const prgSize = prgBanks * 16384;
  const chrSize = chrBanks * 8192;
  const chrStart = headerSize + trainerSize + prgSize;
  const chrEnd = chrStart + chrSize;
  if (chrEnd > buffer.length) {
    throw new Error('NES file is truncated.');
  }

  const chrData = buffer.subarray(chrStart, chrEnd);
  const tileCount = Math.floor(chrData.length / 16);
  const tilesAcross = Math.min(16, Math.max(1, tileCount));
  const tilesDown = Math.ceil(tileCount / tilesAcross);
  const width = tilesAcross * 8;
  const height = tilesDown * 8;
  const pixels = new Uint8Array(width * height);

  for (let tile = 0; tile < tileCount; tile += 1) {
    const tileOffset = tile * 16;
    const tileX = tile % tilesAcross;
    const tileY = Math.floor(tile / tilesAcross);
    for (let y = 0; y < 8; y += 1) {
      const low = chrData[tileOffset + y];
      const high = chrData[tileOffset + y + 8];
      for (let x = 0; x < 8; x += 1) {
        const bit = 7 - x;
        const value = (((high >> bit) & 0x01) << 1) | ((low >> bit) & 0x01);
        const px = tileX * 8 + x;
        const py = tileY * 8 + y;
        pixels[py * width + px] = value;
      }
    }
  }

  return {
    format: 'nes',
    width,
    height,
    colorType: 'indexed',
    pixels,
    palette: NES_GRAYSCALE_PALETTE,
  };
};

export const decodeImageFile = async (filePath: string): Promise<DecodedImage> => {
  const buffer = await readFile(filePath);
  const extension = extname(filePath).toLowerCase().replace('.', '');
  switch (extension) {
    case 'bmp':
      return decodeBmp(buffer);
    case 'gif':
      return decodeGif(buffer);
    case 'pcx':
      return decodePcx(buffer);
    case 'tga':
      return decodeTga(buffer);
    case 'gbr':
      return decodeGbr(buffer);
    case 'nes':
      return decodeNes(buffer);
    default:
      throw new Error(`Unsupported import format: .${extension}`);
  }
};

export const encodeImageBuffer = async (
  format: string,
  payload: ExportImagePayload
): Promise<Uint8Array> => {
  switch (format) {
    case 'bmp': {
      if (payload.kind !== 'rgba') {
        throw new Error('BMP export requires RGBA data');
      }
      const abgr = rgbaToAbgr(payload.data);
      const encoded = bmp.encode({
        data: Buffer.from(abgr),
        width: payload.width,
        height: payload.height,
      });
      return new Uint8Array(encoded.data);
    }
    case 'gif': {
      if (payload.kind !== 'rgba') {
        throw new Error('GIF export requires RGBA data');
      }
      const encoder = new GIFEncoder(payload.width, payload.height);
      encoder.start();
      encoder.addFrame(payload.data);
      encoder.finish();
      return new Uint8Array(encoder.out.getData());
    }
    case 'pcx': {
      if (payload.kind !== 'indexed') {
        throw new Error('PCX export requires indexed data');
      }
      const encoded = writePCX(payload.data, payload.width, payload.height, payload.palette);
      return new Uint8Array(encoded);
    }
    case 'tga': {
      if (payload.kind !== 'rgba') {
        throw new Error('TGA export requires RGBA data');
      }
      const encoded = TGA.createTgaBuffer(payload.width, payload.height, payload.data);
      return new Uint8Array(encoded);
    }
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
};
