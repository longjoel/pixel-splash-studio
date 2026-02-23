import { writeFile } from 'fs/promises';
import { parentPort, workerData } from 'worker_threads';
import { writeProjectZip, type ProjectPayload } from './projectFile';

type WorkerPayload = {
  payload: ProjectPayload;
  filePath: string;
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
