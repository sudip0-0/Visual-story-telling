"use client";

import { useEffect, useRef } from "react";
import { useFinePointer } from "@/lib/motion/useFinePointer";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

/**
 * Desktop-only cursor halo.
 *
 *   • 320px soft radial in the warm red palette.
 *   • mix-blend-mode: screen so the glow sits *with* the canvas, not on it.
 *   • Spring-smoothed follow (stiffness ~160, damping ~22 feel).
 *   • Hidden on coarse pointers and prefers-reduced-motion.
 */
export function CursorGlow() {
  const hasFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotionPreference();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let rafId: number | null = null;
    let visible = false;

    const handleMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        visible = true;
        if (ref.current) {
          ref.current.style.opacity = "0.18";
        }
      }
    };

    const handleLeave = () => {
      visible = false;
      if (ref.current) {
        ref.current.style.opacity = "0";
      }
    };

    const tick = () => {
      // Spring-ish smoothing.
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.x - 160}px, ${current.y - 160}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [hasFinePointer, prefersReducedMotion]);

  if (!hasFinePointer || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[320px] w-[320px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
      style={{
        mixBlendMode: "screen",
        background:
          "radial-gradient(circle, rgba(225,29,46,0.18) 0%, rgba(255,77,46,0.10) 38%, transparent 70%)",
        filter: "blur(8px)",
      }}
    />
  );
}
