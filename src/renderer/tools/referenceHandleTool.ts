import { Tool, CursorState } from '@/core/tools';
import { PIXEL_SIZE, TILE_SIZE } from '@/core/grid';
import { useReferenceStore, type ReferenceImage } from '@/state/referenceStore';
import { usePreviewStore } from '@/state/previewStore';
import { useReferenceHandleStore, type ReferenceSnapMode } from '@/state/referenceHandleStore';
import {
  REFERENCE_CORNERS,
  getReferenceLocalCorners,
  getReferenceTransform,
  getReferenceWorldCorners,
  pointInReference,
  type ReferenceCorner,
} from '@/core/referenceTransforms';

type DragState =
  | {
      id: string;
      mode: 'move';
      offsetX: number;
      offsetY: number;
    }
  | {
      id: string;
      mode: 'scale';
      anchorWorldX: number;
      anchorWorldY: number;
      anchorLocal: { x: number; y: number };
      handleLocal: { x: number; y: number };
      baseWidth: number;
      baseHeight: number;
      rotationRad: number;
      flipX: number;
      flipY: number;
    };

const HANDLE_SIZE = PIXEL_SIZE * 0.6;
const HANDLE_HALF = HANDLE_SIZE / 2;
const MIN_SCALE = 0.25;
const MAX_SCALE = 5;
const snapValue = (value: number, step: number) => Math.round(value / step) * step;

const getSnapStep = (snap: ReferenceSnapMode) => (snap === 'tile' ? TILE_SIZE : 1);

const oppositeCorner: Record<ReferenceCorner, ReferenceCorner> = {
  nw: 'se',
  ne: 'sw',
  se: 'nw',
  sw: 'ne',
};

const getHandleAt = (reference: ReferenceImage, x: number, y: number) => {
  const corners = getReferenceWorldCorners(reference);
  for (const corner of REFERENCE_CORNERS) {
    const point = corners[corner];
    if (
      Math.abs(x - point.x) <= HANDLE_HALF &&
      Math.abs(y - point.y) <= HANDLE_HALF
    ) {
      return corner;
    }
  }
  return null;
};

const buildScaleDrag = (reference: ReferenceImage, handle: ReferenceCorner): DragState => {
  const local = getReferenceLocalCorners(reference);
  const world = getReferenceWorldCorners(reference);
  const anchorCorner = oppositeCorner[handle];
  const transform = getReferenceTransform(reference);
  return {
    id: reference.id,
    mode: 'scale',
    anchorWorldX: world[anchorCorner].x,
    anchorWorldY: world[anchorCorner].y,
    anchorLocal: local[anchorCorner],
    handleLocal: local[handle],
    baseWidth: transform.baseWidth,
    baseHeight: transform.baseHeight,
    rotationRad: transform.rotationRad,
    flipX: transform.flipX,
    flipY: transform.flipY,
  };
};

export class ReferenceHandleTool implements Tool {
  id = 'reference-handle';
  private drag: DragState | null = null;

  onHover = () => {
    if (!this.drag) {
      usePreviewStore.getState().clear();
    }
  };

  onBegin = (cursor: CursorState) => {
    usePreviewStore.getState().clear();
    const { items, selectedId, setSelected } = useReferenceStore.getState();
    const worldX = cursor.canvasX;
    const worldY = cursor.canvasY;

    const selectedRef = selectedId ? items.find((item) => item.id === selectedId) : null;
    if (selectedRef) {
      const handleHit = getHandleAt(selectedRef, worldX, worldY);
      if (handleHit) {
        this.drag = buildScaleDrag(selectedRef, handleHit);
        return;
      }
    }

    let hitReference: ReferenceImage | null = null;
    for (let i = items.length - 1; i >= 0; i -= 1) {
      const reference = items[i];
      if (pointInReference(reference, worldX, worldY)) {
        hitReference = reference;
        break;
      }
    }

    if (!hitReference) {
      setSelected(null);
      this.drag = null;
      return;
    }

    setSelected(hitReference.id);
    const handleHit = getHandleAt(hitReference, worldX, worldY);
    if (handleHit) {
      this.drag = buildScaleDrag(hitReference, handleHit);
      return;
    }

    const transform = getReferenceTransform(hitReference);
    this.drag = {
      id: hitReference.id,
      mode: 'move',
      offsetX: worldX - transform.centerX,
      offsetY: worldY - transform.centerY,
    };
  };

  onMove = (cursor: CursorState) => {
    if (!this.drag) {
      return;
    }
    const store = useReferenceStore.getState();
    const snapMode = useReferenceHandleStore.getState().snap;
    const target = store.items.find((item) => item.id === this.drag?.id);
    if (!target) {
      this.drag = null;
      return;
    }
    const worldX = cursor.canvasX;
    const worldY = cursor.canvasY;

    if (this.drag.mode === 'move') {
      const transform = getReferenceTransform(target);
      const width = transform.baseWidth * transform.scale;
      const height = transform.baseHeight * transform.scale;
      const centerX = worldX - this.drag.offsetX;
      const centerY = worldY - this.drag.offsetY;
      const snapStep = getSnapStep(snapMode);
      const rawX = (centerX - width / 2) / PIXEL_SIZE;
      const rawY = (centerY - height / 2) / PIXEL_SIZE;
      const nextX = snapValue(rawX, snapStep);
      const nextY = snapValue(rawY, snapStep);
      store.updateReference(target.id, { x: nextX, y: nextY });
      return;
    }

    const dx = worldX - this.drag.anchorWorldX;
    const dy = worldY - this.drag.anchorWorldY;
    const cos = Math.cos(this.drag.rotationRad);
    const sin = Math.sin(this.drag.rotationRad);
    const rotatedX = dx * cos + dy * sin;
    const rotatedY = -dx * sin + dy * cos;
    const localX = rotatedX * this.drag.flipX;
    const localY = rotatedY * this.drag.flipY;
    const diagX = this.drag.handleLocal.x - this.drag.anchorLocal.x;
    const diagY = this.drag.handleLocal.y - this.drag.anchorLocal.y;
    const scaleX = diagX !== 0 ? Math.abs(localX / diagX) : 0;
    const scaleY = diagY !== 0 ? Math.abs(localY / diagY) : 0;
    const rawScale = Math.max(scaleX, scaleY);
    const safeScale = Number.isFinite(rawScale) && rawScale > 0 ? rawScale : MIN_SCALE;
    const snapStepWorld = getSnapStep(snapMode) * PIXEL_SIZE;
    const snappedWidth = Math.max(
      snapStepWorld,
      snapValue(this.drag.baseWidth * safeScale, snapStepWorld)
    );
    const snappedHeight = Math.max(
      snapStepWorld,
      snapValue(this.drag.baseHeight * safeScale, snapStepWorld)
    );
    let nextScale = Math.max(
      MIN_SCALE,
      Math.max(snappedWidth / this.drag.baseWidth, snappedHeight / this.drag.baseHeight)
    );
    nextScale = Math.min(nextScale, MAX_SCALE);
    const width = this.drag.baseWidth * nextScale;
    const height = this.drag.baseHeight * nextScale;
    const scaledAnchorX = this.drag.anchorLocal.x * nextScale * this.drag.flipX;
    const scaledAnchorY = this.drag.anchorLocal.y * nextScale * this.drag.flipY;
    const anchorOffsetX = scaledAnchorX * cos - scaledAnchorY * sin;
    const anchorOffsetY = scaledAnchorX * sin + scaledAnchorY * cos;
    const centerX = this.drag.anchorWorldX - anchorOffsetX;
    const centerY = this.drag.anchorWorldY - anchorOffsetY;
    const nextX = (centerX - width / 2) / PIXEL_SIZE;
    const nextY = (centerY - height / 2) / PIXEL_SIZE;
    store.updateReference(target.id, { x: nextX, y: nextY, scale: nextScale });
  };

  onEnd = () => {
    this.drag = null;
  };

  onCancel = () => {
    this.drag = null;
  };
}
