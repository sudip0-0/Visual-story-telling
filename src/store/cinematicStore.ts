import { create } from "zustand";
import type { SceneId } from "@/data/scenes";

type CinematicState = {
  activeSceneId: SceneId;
  scrollProgress: number;
  setActiveSceneId: (sceneId: SceneId) => void;
  setScrollProgress: (progress: number) => void;
};

export const useCinematicStore = create<CinematicState>((set) => ({
  activeSceneId: "signal",
  scrollProgress: 0,
  setActiveSceneId: (sceneId) => set({ activeSceneId: sceneId }),
  setScrollProgress: (progress) =>
    set({ scrollProgress: Math.min(1, Math.max(0, progress)) }),
}));
