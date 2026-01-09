import { extname } from 'path';
import { readFile } from 'fs/promises';
import bmp from 'bmp-js';
import { parseGIF, decompressFrames } from 'gifuct-js';
import PCX from 'pcx-js';
import TGA from 'tga';
import GIFEncoder from 'gif-encoder-2';
import { PCX as ElmaPCX, writePCX } from 'elma-pcx';

export type DecodedImage = {
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
    width: tga.width,
    height: tga.height,
    colorType: 'rgba',
    pixels: new Uint8Array(tga.pixels),
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
