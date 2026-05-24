"use client";

import { useEffect, useRef } from "react";
import { useCinematicStore } from "@/store/cinematicStore";
import type { SceneId } from "@/data/scenes";

/**
 * Scene-modulated vignette overlay.
 *
 * Stronger on Signal/Launch (intimate, edge-darkened framing), lighter on
 * Chaos (breathing room for debris). Reads the active scene from the
 * cinematic store and writes a `--vignette-strength` var to itself.
 */
const VIGNETTE_BY_SCENE: Record<SceneId, number> = {
  signal: 0.7,
  spark: 0.55,
  chaos: 0.42,
  structure: 0.5,
  system: 0.55,
  launch: 0.72,
};

export function SceneVignette() {
  const activeSceneId = useCinematicStore((state) => state.activeSceneId);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.setProperty(
      "--vignette-strength",
      String(VIGNETTE_BY_SCENE[activeSceneId]),
    );
  }, [activeSceneId]);

  return <div ref={ref} aria-hidden className="scene-vignette" />;
}
