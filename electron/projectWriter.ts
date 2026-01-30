import { writeFile } from 'fs/promises';
import JSZip from 'jszip';
import { parentPort, workerData } from 'worker_threads';
import type { ProjectPayload } from './main';

type WorkerPayload = {
  payload: ProjectPayload;
  filePath: string;
};

const writeProjectZip = async (payload: ProjectPayload) => {
  const zip = new JSZip();
  const data = { ...payload.data };
  if (!data.pixelLayers && payload.layers && payload.layers.length > 0) {
    const fallbackActiveLayerId =
      (typeof payload.data?.pixelLayers?.activeLayerId === 'string'
        ? payload.data.pixelLayers.activeLayerId
        : undefined) ?? payload.layers[0]?.id;
    data.pixelLayers = {
      layers: payload.layers.map((layer) => ({
        id: layer.id,
        name: layer.name,
        visible: layer.visible,
      })),
      activeLayerId: fallbackActiveLayerId,
    };
  }
  zip.file('data.json', JSON.stringify(data, null, 2));

  if (payload.layers && payload.layers.length > 0) {
    for (const layer of payload.layers) {
      for (const block of layer.blocks) {
        zip.file(`pixels/${layer.id}/${block.row}-${block.col}.bin`, block.data);
      }
    }
  } else if (payload.blocks) {
    for (const block of payload.blocks) {
      zip.file(`pixels/${block.row}-${block.col}.bin`, block.data);
    }
  }
  for (const reference of payload.referenceFiles ?? []) {
    zip.file(`references/${reference.filename}`, reference.data);
  }
  return zip.generateAsync({ type: 'nodebuffer' });
};

const run = async () => {
  try {
    const { payload, filePath } = workerData as WorkerPayload;
    const buffer = await writeProjectZip(payload);
    await writeFile(filePath, buffer);
    parentPort?.postMessage({ ok: true });
  } catch (error) {
    const err = error as Error;
    parentPort?.postMessage({
      ok: false,
      error: { message: err.message, stack: err.stack },
    });
  }
};

void run();
