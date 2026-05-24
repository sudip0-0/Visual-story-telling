"use client";

import { useEffect, useRef } from "react";
import { useCinematicStore } from "@/store/cinematicStore";
import { getVisualState } from "@/lib/three/visualStateRef";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

/**
 * Chaos-only scroll velocity → DOM blur driver.
 *
 *   • Active only while the chaos scene is the active scene.
 *   • Writes `--canvas-blur` on the body (capped to 4px).
 *   • Fully suspends under prefers-reduced-motion.
 *   • Other scenes get `--canvas-blur: 0px`, so the filter is inert.
 */
export function ChaosVelocityDriver() {
  const activeSceneId = useCinematicStore((s) => s.activeSceneId);
  const prefersReducedMotion = useReducedMotionPreference();
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      document.body.style.setProperty("--canvas-blur", "0px");
      return;
    }

    if (activeSceneId !== "chaos") {
      document.body.style.setProperty("--canvas-blur", "0px");
      return;
    }

    const chaosBody = document.querySelector<HTMLElement>(
      '[data-scene="chaos"] [data-velocity-parallax]',
    );

    const tick = () => {
      const { scrollVelocity } = getVisualState();
      const blur = Math.min(4, Math.abs(scrollVelocity) * 1.4);
      document.body.style.setProperty("--canvas-blur", `${blur.toFixed(2)}px`);

      if (chaosBody) {
        const t = Math.max(-1, Math.min(1, scrollVelocity / 1.5));
        const translate = t * 12;
        chaosBody.style.setProperty("--vel-y", `${translate.toFixed(2)}px`);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      document.body.style.setProperty("--canvas-blur", "0px");
      if (chaosBody) {
        chaosBody.style.setProperty("--vel-y", "0px");
      }
    };
  }, [activeSceneId, prefersReducedMotion]);

  return null;
}
