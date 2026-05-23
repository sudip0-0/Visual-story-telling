"use client";

import { useLayoutEffect, useRef } from "react";
import type { SceneId } from "@/data/scenes";
import { createCinematicScrollAnimations } from "@/lib/scroll/createCinematicScrollAnimations";
import { createScrollEngine } from "@/lib/scroll/createScrollEngine";
import { SCENE_VISUAL_KEYFRAMES } from "@/lib/scroll/storyVisualKeyframes";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";
import { useCinematicStore } from "@/store/cinematicStore";
import { setVisualStateRef } from "@/lib/three/visualStateRef";
import "lenis/dist/lenis.css";

type ScrollEngineProps = {
  children: React.ReactNode;
};

export function ScrollEngine({ children }: ScrollEngineProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const setScrollProgress = useCinematicStore((state) => state.setScrollProgress);
  const setActiveSceneId = useCinematicStore((state) => state.setActiveSceneId);
  const setSmoothScrollEnabled = useCinematicStore(
    (state) => state.setSmoothScrollEnabled,
  );

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) {
      return;
    }

    const storyRoot =
      scope.querySelector<HTMLElement>("#story") ?? scope;

    setSmoothScrollEnabled(!prefersReducedMotion);

    const handleSceneChange = (sceneId: SceneId) => {
      setActiveSceneId(sceneId);

      if (prefersReducedMotion) {
        setVisualStateRef(SCENE_VISUAL_KEYFRAMES[sceneId]);
      }
    };

    const scrollEngine = createScrollEngine({
      prefersReducedMotion,
      scope,
      onProgress: setScrollProgress,
      onSceneChange: handleSceneChange,
    });

    const scrollAnimations = createCinematicScrollAnimations({
      prefersReducedMotion,
      scope: storyRoot,
    });

    scrollEngine.refresh();
    scrollAnimations.refresh();

    return () => {
      scrollAnimations.destroy();
      scrollEngine.destroy();
    };
  }, [
    prefersReducedMotion,
    setActiveSceneId,
    setScrollProgress,
    setSmoothScrollEnabled,
  ]);

  return (
    <div ref={scopeRef} className="relative w-full" data-scroll-engine="">
      {children}
    </div>
  );
}
