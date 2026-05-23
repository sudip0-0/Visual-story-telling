import { create } from "zustand";
import type { SceneId } from "@/data/scenes";

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
