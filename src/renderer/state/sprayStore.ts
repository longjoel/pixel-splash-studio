import { create } from 'zustand';

export type SprayMode = 'single-color' | 'dither';

type SprayState = {
  radius: number;
  density: number;
  falloff: number;
  mode: SprayMode;
  deterministic: boolean;
  seed: number;
  setRadius: (radius: number) => void;
  setDensity: (density: number) => void;
  setFalloff: (falloff: number) => void;
  setMode: (mode: SprayMode) => void;
  setDeterministic: (deterministic: boolean) => void;
  setSeed: (seed: number) => void;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const useSprayStore = create<SprayState>((set) => ({
  radius: 6,
  density: 250,
  falloff: 0.25,
  mode: 'single-color',
  deterministic: false,
  seed: 1,
  setRadius: (radius) => set({ radius: clamp(Math.round(radius), 1, 64) }),
  setDensity: (density) => set({ density: clamp(Math.round(density), 1, 20_000) }),
  setFalloff: (falloff) => set({ falloff: clamp(falloff, 0, 1) }),
  setMode: (mode) => set({ mode }),
  setDeterministic: (deterministic) => set({ deterministic }),
  setSeed: (seed) => set({ seed: Math.max(0, Math.round(seed)) }),
}));

