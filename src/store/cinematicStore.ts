import { create } from "zustand";
import type { SceneId } from "@/data/scenes";
import { INITIAL_VISUAL_STATE } from "@/lib/scroll/storyVisualKeyframes";

export type VisualState = {
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
};

type CinematicState = {
  activeSceneId: SceneId;
  scrollProgress: number;
  smoothScrollEnabled: boolean;
  visualState: VisualState;
  setActiveSceneId: (sceneId: SceneId) => void;
  setScrollProgress: (progress: number) => void;
  setSmoothScrollEnabled: (enabled: boolean) => void;
  setVisualState: (visualState: VisualState) => void;
};

export const useCinematicStore = create<CinematicState>((set) => ({
  activeSceneId: "signal",
  scrollProgress: 0,
  smoothScrollEnabled: false,
  visualState: INITIAL_VISUAL_STATE,
  setActiveSceneId: (sceneId) => set({ activeSceneId: sceneId }),
  setScrollProgress: (progress) =>
    set({ scrollProgress: Math.min(1, Math.max(0, progress)) }),
  setSmoothScrollEnabled: (enabled) => set({ smoothScrollEnabled: enabled }),
  setVisualState: (visualState) => set({ visualState }),
}));
