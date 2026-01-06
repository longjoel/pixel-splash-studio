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
  zip.file('data.json', JSON.stringify(payload.data, null, 2));
  for (const block of payload.blocks) {
    zip.file(`pixels/${block.row}-${block.col}.bin`, block.data);
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
