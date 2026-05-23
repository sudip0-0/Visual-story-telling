import { create } from "zustand";
import type { SceneId } from "@/data/scenes";

export type VisualState = {
  /** Global page scroll 0–1 (ambient drift; does not replace per-scene scrub). */
  storyProgress: number;
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  objectScale: number;
  objectX: number;
  objectY: number;
  objectZ: number;
  objectRotationX: number;
  objectRotationY: number;
  objectRotationZ: number;
  emissiveIntensity: number;
  fragmentSpread: number;
  particleDrift: number;
  torusVisible: number;
  /** Outer shell opacity — signal point vs spark orb. */
  glowOpacity: number;
  /** Non-uniform core scale (chaos fracture). */
  coreWarp: number;
  /** 0 violet → 0.5 warm chaos → 1 cyan structure/system. */
  accentMix: number;
  particleOpacity: number;
  /** Aligning ring around core (structure beat). */
  structureRing: number;
};

type CinematicState = {
  activeSceneId: SceneId;
  scrollProgress: number;
  smoothScrollEnabled: boolean;
  setActiveSceneId: (sceneId: SceneId) => void;
  setScrollProgress: (progress: number) => void;
  setSmoothScrollEnabled: (enabled: boolean) => void;
};

export const useCinematicStore = create<CinematicState>((set) => ({
  activeSceneId: "signal",
  scrollProgress: 0,
  smoothScrollEnabled: false,
  setActiveSceneId: (sceneId) => set({ activeSceneId: sceneId }),
  setScrollProgress: (progress) =>
    set({ scrollProgress: Math.min(1, Math.max(0, progress)) }),
  setSmoothScrollEnabled: (enabled) => set({ smoothScrollEnabled: enabled }),
}));
