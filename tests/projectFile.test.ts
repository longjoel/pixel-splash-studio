import { describe, expect, test } from 'vitest';
import JSZip from 'jszip';
import { readProjectZip, writeProjectZip, type ProjectPayload } from '../electron/projectFile';

const createBasePayload = (): ProjectPayload => ({
  data: {
    palette: { colors: ['#000000', '#ffffff'] },
    camera: { x: 0, y: 0, zoom: 1 },
  },
});

describe('projectFile', () => {
  test('roundtrips layered project payloads', async () => {
    const payload: ProjectPayload = {
      ...createBasePayload(),
      layers: [
        {
          id: 'layer-1',
          name: 'Layer 1',
          visible: true,
          blocks: [{ row: -1, col: 2, data: Uint8Array.from([1, 2, 3]) }],
        },
      ],
      referenceFiles: [
        {
          filename: 'ref.webp',
          data: Uint8Array.from([9, 8, 7]),
          type: 'image/webp',
        },
      ],
    };

    const zipBuffer = await writeProjectZip(payload);
    const parsed = await readProjectZip(zipBuffer);

    expect(parsed.layers?.map((layer) => layer.id)).toEqual(['layer-1']);
    expect(parsed.layers?.[0]?.blocks[0]?.row).toBe(-1);
    expect(Array.from(parsed.layers?.[0]?.blocks[0]?.data ?? [])).toEqual([1, 2, 3]);
    expect(parsed.referenceFiles[0]?.type).toBe('image/webp');
    expect(Array.from(parsed.referenceFiles[0]?.data ?? [])).toEqual([9, 8, 7]);
  });

  test('reads legacy projects without pixelLayers into blocks', async () => {
    const payload: ProjectPayload = {
      ...createBasePayload(),
      blocks: [{ row: 4, col: -3, data: Uint8Array.from([5, 6]) }],
    };

    const zipBuffer = await writeProjectZip(payload);
    const parsed = await readProjectZip(zipBuffer);

    expect(parsed.layers).toBeUndefined();
    expect(parsed.blocks?.length).toBe(1);
    expect(parsed.blocks?.[0]?.row).toBe(4);
    expect(parsed.blocks?.[0]?.col).toBe(-3);
    expect(Array.from(parsed.blocks?.[0]?.data ?? [])).toEqual([5, 6]);
  });

  test('infers reference file type from extension when metadata is missing', async () => {
    const zip = new JSZip();
    zip.file(
      'data.json',
      JSON.stringify({
        palette: { colors: ['#000000'] },
        camera: { x: 0, y: 0, zoom: 1 },
      })
    );
    zip.file('references/icon.png', Uint8Array.from([1, 2, 3]));

    const buffer = await zip.generateAsync({ type: 'nodebuffer' });
    const parsed = await readProjectZip(buffer);

    expect(parsed.referenceFiles).toHaveLength(1);
    expect(parsed.referenceFiles[0]?.filename).toBe('icon.png');
    expect(parsed.referenceFiles[0]?.type).toBe('image/png');
  });
});
