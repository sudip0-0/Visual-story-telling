"use client";

import { useLayoutEffect, useRef } from "react";
import { createCinematicScrollAnimations } from "@/lib/scroll/createCinematicScrollAnimations";
import { createScrollEngine } from "@/lib/scroll/createScrollEngine";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";
import { useCinematicStore } from "@/store/cinematicStore";
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

    setSmoothScrollEnabled(!prefersReducedMotion);

    const scrollEngine = createScrollEngine({
      prefersReducedMotion,
      scope,
      onProgress: setScrollProgress,
      onSceneChange: setActiveSceneId,
    });

    const scrollAnimations = createCinematicScrollAnimations({
      prefersReducedMotion,
      scope,
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
    <div ref={scopeRef} className="contents" data-scroll-engine="">
      {children}
    </div>
  );
}
