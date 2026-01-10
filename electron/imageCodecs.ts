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

const readUint16BE = (buffer: Uint8Array, offset: number) =>
  (buffer[offset] << 8) | buffer[offset + 1];

const readUint32BE = (buffer: Uint8Array, offset: number) =>
  (buffer[offset] << 24) |
  (buffer[offset + 1] << 16) |
  (buffer[offset + 2] << 8) |
  buffer[offset + 3];

const decodeByteRun1 = (input: Uint8Array, expectedLength: number) => {
  const output = new Uint8Array(expectedLength);
  let inOffset = 0;
  let outOffset = 0;
  while (inOffset < input.length && outOffset < expectedLength) {
    const control = (input[inOffset] << 24) >> 24;
    inOffset += 1;
    if (control >= 0) {
      const count = control + 1;
      const end = Math.min(input.length, inOffset + count);
      output.set(input.subarray(inOffset, end), outOffset);
      outOffset += end - inOffset;
      inOffset = end;
    } else if (control >= -127) {
      const count = -control + 1;
      const value = input[inOffset];
      inOffset += 1;
      output.fill(value, outOffset, Math.min(expectedLength, outOffset + count));
      outOffset += count;
    }
  }
  return output;
};

const decodeIff = (buffer: Buffer): DecodedImage => {
  const bytes = new Uint8Array(buffer);
  if (bytes.length < 12) {
    throw new Error('IFF file is too small.');
  }
  const header = buffer.subarray(0, 4).toString('ascii');
  if (header !== 'FORM') {
    throw new Error('Invalid IFF header.');
  }
  const formType = buffer.subarray(8, 12).toString('ascii');
  if (formType !== 'ILBM' && formType !== 'PBM ') {
    throw new Error('Unsupported IFF form type.');
  }

  let width = 0;
  let height = 0;
  let planes = 0;
  let masking = 0;
  let compression = 0;
  let transparentIndex: number | undefined;
  let palette: Array<[number, number, number]> | undefined;
  let body: Uint8Array | null = null;

  let offset = 12;
  while (offset + 8 <= bytes.length) {
    const chunkId = buffer.subarray(offset, offset + 4).toString('ascii');
    const chunkSize = readUint32BE(bytes, offset + 4);
    const dataStart = offset + 8;
    const dataEnd = dataStart + chunkSize;
    if (dataEnd > bytes.length) {
      break;
    }
    if (chunkId === 'BMHD' && chunkSize >= 20) {
      width = readUint16BE(bytes, dataStart);
      height = readUint16BE(bytes, dataStart + 2);
      planes = bytes[dataStart + 8];
      masking = bytes[dataStart + 9];
      compression = bytes[dataStart + 10];
      const transparent = readUint16BE(bytes, dataStart + 12);
      if (masking === 2) {
        transparentIndex = transparent;
      }
    } else if (chunkId === 'CMAP') {
      const colors: Array<[number, number, number]> = [];
      for (let i = 0; i + 2 < chunkSize; i += 3) {
        colors.push([
          bytes[dataStart + i],
          bytes[dataStart + i + 1],
          bytes[dataStart + i + 2],
        ]);
      }
      palette = colors;
    } else if (chunkId === 'BODY') {
      body = bytes.subarray(dataStart, dataEnd);
    }
    offset = dataEnd + (chunkSize % 2);
  }

  if (!body || width <= 0 || height <= 0) {
    throw new Error('IFF image data is missing.');
  }

  if (formType === 'PBM ') {
    const expected = width * height;
    const decoded =
      compression === 1 ? decodeByteRun1(body, expected) : body.subarray(0, expected);
    return {
      format: 'iff',
      width,
      height,
      colorType: 'indexed',
      pixels: decoded,
      palette,
      transparentIndex,
    };
  }

  const rowBytes = ((width + 15) >> 4) << 1;
  const planesToRead = planes + (masking === 1 ? 1 : 0);
  const expectedLength = rowBytes * height * planesToRead;
  const decoded =
    compression === 1 ? decodeByteRun1(body, expectedLength) : body.subarray(0, expectedLength);
  const pixels = new Uint8Array(width * height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let value = 0;
      const bit = 7 - (x & 7);
      const byteIndex = x >> 3;
      for (let plane = 0; plane < planes; plane += 1) {
        const planeOffset = (y * planesToRead + plane) * rowBytes;
        const byte = decoded[planeOffset + byteIndex];
        if (byte & (1 << bit)) {
          value |= 1 << plane;
        }
      }
      pixels[y * width + x] = value;
    }
  }

  return {
    format: 'iff',
    width,
    height,
    colorType: 'indexed',
    pixels,
    palette,
    transparentIndex,
  };
};

const NES_GRAYSCALE_PALETTE: Array<[number, number, number]> = [
  [0, 0, 0],
  [85, 85, 85],
  [170, 170, 170],
  [255, 255, 255],
];

const decodeNesTiles = (chrData: Uint8Array) => {
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

  return { width, height, pixels };
};

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
  const { width, height, pixels } = decodeNesTiles(chrData);

  return {
    format: 'nes',
    width,
    height,
    colorType: 'indexed',
    pixels,
    palette: NES_GRAYSCALE_PALETTE,
  };
};

const decodeChr = (buffer: Buffer): DecodedImage => {
  if (buffer.length < 16) {
    throw new Error('CHR file has no tile data.');
  }
  if (buffer.length % 16 !== 0) {
    throw new Error('CHR data size must be a multiple of 16 bytes.');
  }

  const chrData = new Uint8Array(buffer);
  const { width, height, pixels } = decodeNesTiles(chrData);
  return {
    format: 'chr',
    width,
    height,
    colorType: 'indexed',
    pixels,
    palette: NES_GRAYSCALE_PALETTE,
  };
};

const decodeGbRom = (buffer: Buffer): DecodedImage => {
  if (buffer.length < 16) {
    throw new Error('ROM file has no tile data.');
  }
  const romData = new Uint8Array(buffer);
  const { width, height, pixels } = decodeNesTiles(romData);
  return {
    format: 'gb',
    width,
    height,
    colorType: 'indexed',
    pixels,
    palette: GAME_BOY_PALETTE,
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
    case 'iff':
    case 'ilbm':
    case 'lbm':
    case 'bbm':
      return decodeIff(buffer);
    case 'nes':
      return decodeNes(buffer);
    case 'chr':
      return decodeChr(buffer);
    case 'gb':
    case 'gbc':
      return decodeGbRom(buffer);
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
