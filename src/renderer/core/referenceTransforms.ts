import { PIXEL_SIZE } from '@/core/grid';
import { REFERENCE_CORNERS } from '../../constants';
import type { ReferenceImage } from '@/state/referenceStore';

export type ReferenceCorner = (typeof REFERENCE_CORNERS)[number];

export { REFERENCE_CORNERS };

export type ReferenceTransform = {
  centerX: number;
  centerY: number;
  baseWidth: number;
  baseHeight: number;
  scale: number;
  rotationRad: number;
  flipX: number;
  flipY: number;
};

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export const getReferenceTransform = (reference: ReferenceImage): ReferenceTransform => {
  const baseWidth = reference.width * PIXEL_SIZE;
  const baseHeight = reference.height * PIXEL_SIZE;
  const scale = reference.scale;
  const rotation = Number.isFinite(reference.rotation) ? reference.rotation : 0;
  const width = baseWidth * scale;
  const height = baseHeight * scale;
  return {
    centerX: reference.x * PIXEL_SIZE + width / 2,
    centerY: reference.y * PIXEL_SIZE + height / 2,
    baseWidth,
    baseHeight,
    scale,
    rotationRad: toRadians(rotation),
    flipX: reference.flipX ? -1 : 1,
    flipY: reference.flipY ? -1 : 1,
  };
};

export const localToWorld = (
  reference: ReferenceImage,
  localX: number,
  localY: number
) => {
  const transform = getReferenceTransform(reference);
  const scaledX = localX * transform.scale * transform.flipX;
  const scaledY = localY * transform.scale * transform.flipY;
  const cos = Math.cos(transform.rotationRad);
  const sin = Math.sin(transform.rotationRad);
  return {
    x: transform.centerX + scaledX * cos - scaledY * sin,
    y: transform.centerY + scaledX * sin + scaledY * cos,
  };
};

export const worldToLocal = (
  reference: ReferenceImage,
  worldX: number,
  worldY: number
) => {
  const transform = getReferenceTransform(reference);
  const dx = worldX - transform.centerX;
  const dy = worldY - transform.centerY;
  const cos = Math.cos(transform.rotationRad);
  const sin = Math.sin(transform.rotationRad);
  const rotatedX = dx * cos + dy * sin;
  const rotatedY = -dx * sin + dy * cos;
  return {
    x: (rotatedX * transform.flipX) / transform.scale,
    y: (rotatedY * transform.flipY) / transform.scale,
  };
};

export const getReferenceLocalCorners = (reference: ReferenceImage) => {
  const { baseWidth, baseHeight } = getReferenceTransform(reference);
  const halfWidth = baseWidth / 2;
  const halfHeight = baseHeight / 2;
  return {
    nw: { x: -halfWidth, y: -halfHeight },
    ne: { x: halfWidth, y: -halfHeight },
    se: { x: halfWidth, y: halfHeight },
    sw: { x: -halfWidth, y: halfHeight },
  } satisfies Record<ReferenceCorner, { x: number; y: number }>;
};

export const getReferenceWorldCorners = (reference: ReferenceImage) => {
  const local = getReferenceLocalCorners(reference);
  return {
    nw: localToWorld(reference, local.nw.x, local.nw.y),
    ne: localToWorld(reference, local.ne.x, local.ne.y),
    se: localToWorld(reference, local.se.x, local.se.y),
    sw: localToWorld(reference, local.sw.x, local.sw.y),
  } satisfies Record<ReferenceCorner, { x: number; y: number }>;
};

export const getReferenceBounds = (reference: ReferenceImage) => {
  const corners = getReferenceWorldCorners(reference);
  const points = Object.values(corners);
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
};

export const pointInReference = (
  reference: ReferenceImage,
  worldX: number,
  worldY: number
) => {
  const local = worldToLocal(reference, worldX, worldY);
  const { baseWidth, baseHeight } = getReferenceTransform(reference);
  return (
    Math.abs(local.x) <= baseWidth / 2 && Math.abs(local.y) <= baseHeight / 2
  );
};
