"use client";

import { useEffect } from "react";
import { useFinePointer } from "@/lib/motion/useFinePointer";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

const TARGET = { x: 0, y: 0 };
const CURRENT = { x: 0, y: 0 };

/**
 * Body-scoped pointer parallax driver.
 *
 * Maintains a smoothed -1..1 target on `document.body` via the CSS custom
 * properties `--pointer-x` and `--pointer-y`. The CameraRig and CursorGlow
 * read these to keep the 3D world and the cursor halo in lockstep.
 *
 * Disabled on coarse pointers and under prefers-reduced-motion.
 */
export function usePointerParallax(): void {
  const hasFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion) {
      // Reset and bail — no listeners.
      document.body.style.setProperty("--pointer-x", "0");
      document.body.style.setProperty("--pointer-y", "0");
      return;
    }

    let rafId: number | null = null;

    const handleMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      TARGET.x = Math.max(-1, Math.min(1, x));
      TARGET.y = Math.max(-1, Math.min(1, y));
    };

    const tick = () => {
      // Spring-like smoothing — ~stiffness 160, damping 22 feel.
      CURRENT.x += (TARGET.x - CURRENT.x) * 0.12;
      CURRENT.y += (TARGET.y - CURRENT.y) * 0.12;

      const style = document.body.style;
      style.setProperty("--pointer-x", CURRENT.x.toFixed(3));
      style.setProperty("--pointer-y", CURRENT.y.toFixed(3));

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      // Restore quietly.
      document.body.style.setProperty("--pointer-x", "0");
      document.body.style.setProperty("--pointer-y", "0");
    };
  }, [hasFinePointer, prefersReducedMotion]);
}
