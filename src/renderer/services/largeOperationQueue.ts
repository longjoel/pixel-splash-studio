import { BLOCK_SIZE } from '@/core/canvasStore';
import { useHistoryStore, type PixelChange } from '@/state/historyStore';
import { usePixelStore } from '@/state/pixelStore';

type LargeOperation = {
  id: string;
  label: string;
  layerId: string;
  changes: PixelChange[];
  index: number;
  chunkSize: number;
  timeBudgetMs: number;
};

type EnqueueOptions = {
  label?: string;
  chunkSize?: number;
  timeBudgetMs?: number;
};

const DEFAULT_CHUNK_SIZE = 2_000;
const DEFAULT_TIME_BUDGET_MS = 6;

const queue: LargeOperation[] = [];
const inProgressBlockCounts = new Map<string, number>();

let running = false;
let nextOperationId = 1;
type FrameHandle = number | ReturnType<typeof setTimeout>;
let scheduledFrame: FrameHandle | null = null;

const getNow = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

const requestFrame = (handler: (timestamp: number) => void): FrameHandle => {
  if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
    return window.requestAnimationFrame(handler);
  }
  return setTimeout(() => handler(getNow()), 0);
};

const cancelFrame = (id: FrameHandle) => {
  if (typeof window !== 'undefined' && typeof window.cancelAnimationFrame === 'function') {
    window.cancelAnimationFrame(id as number);
    return;
  }
  clearTimeout(id as ReturnType<typeof setTimeout>);
};

const blockKeyForPixel = (x: number, y: number) => {
  const row = Math.floor(y / BLOCK_SIZE);
  const col = Math.floor(x / BLOCK_SIZE);
  return `${row}:${col}`;
};

const incBlock = (key: string, count: number) => {
  if (count <= 0) {
    return;
  }
  inProgressBlockCounts.set(key, (inProgressBlockCounts.get(key) ?? 0) + count);
};

const decBlock = (key: string) => {
  const next = (inProgressBlockCounts.get(key) ?? 0) - 1;
  if (next > 0) {
    inProgressBlockCounts.set(key, next);
  } else {
    inProgressBlockCounts.delete(key);
  }
};

const processFrame = () => {
  const operation = queue[0];
  if (!operation) {
    useHistoryStore.getState().setLocked(false);
    running = false;
    scheduledFrame = null;
    return;
  }

  const start = getNow();
  const chunkSize = operation.chunkSize;
  const timeBudgetMs = operation.timeBudgetMs;
  const pixelStore = usePixelStore.getState();

  while (queue[0] === operation && operation.index < operation.changes.length) {
    const pixels: Array<{ x: number; y: number; paletteIndex: number }> = [];

    while (operation.index < operation.changes.length && pixels.length < chunkSize) {
      const change = operation.changes[operation.index];
      operation.index += 1;
      pixels.push({ x: change.x, y: change.y, paletteIndex: change.next });
      decBlock(blockKeyForPixel(change.x, change.y));
      if (getNow() - start > timeBudgetMs) {
        break;
      }
    }

    if (pixels.length > 0) {
      pixelStore.setPixelsInLayer(operation.layerId, pixels);
    }

    if (operation.index >= operation.changes.length) {
      useHistoryStore.getState().pushBatch({ layerId: operation.layerId, changes: operation.changes });
      queue.shift();
      if (queue.length === 0) {
        useHistoryStore.getState().setLocked(false);
      }
      break;
    }

    if (getNow() - start > timeBudgetMs) {
      break;
    }
  }

  scheduledFrame = requestFrame(processFrame);
};

const ensureRunning = () => {
  if (running) {
    return;
  }
  running = true;
  scheduledFrame = requestFrame(processFrame);
};

export const enqueuePixelChanges = (changes: PixelChange[], options: EnqueueOptions = {}) => {
  if (changes.length === 0) {
    return;
  }
  if (queue.length === 0) {
    useHistoryStore.getState().setLocked(true);
  }
  const id = String(nextOperationId);
  nextOperationId += 1;

  const label = options.label?.trim() ? options.label.trim() : 'Operation';
  const layerId = usePixelStore.getState().activeLayerId;
  const chunkSize =
    typeof options.chunkSize === 'number' && options.chunkSize > 0
      ? Math.floor(options.chunkSize)
      : DEFAULT_CHUNK_SIZE;
  const timeBudgetMs =
    typeof options.timeBudgetMs === 'number' && options.timeBudgetMs > 0
      ? options.timeBudgetMs
      : DEFAULT_TIME_BUDGET_MS;
  queue.push({ id, label, layerId, changes, index: 0, chunkSize, timeBudgetMs });

  const opBlockCounts = new Map<string, number>();
  for (const change of changes) {
    const key = blockKeyForPixel(change.x, change.y);
    opBlockCounts.set(key, (opBlockCounts.get(key) ?? 0) + 1);
  }
  for (const [key, count] of opBlockCounts.entries()) {
    incBlock(key, count);
  }

  ensureRunning();
};

export const getBlocksUnderConstruction = () =>
  Array.from(inProgressBlockCounts.keys()).map((key) => {
    const [rowText, colText] = key.split(':');
    return { row: Number(rowText), col: Number(colText) };
  });

export const clearLargeOperationQueue = () => {
  queue.length = 0;
  inProgressBlockCounts.clear();
  useHistoryStore.getState().setLocked(false);
  running = false;
  if (scheduledFrame !== null) {
    cancelFrame(scheduledFrame);
    scheduledFrame = null;
  }
};
