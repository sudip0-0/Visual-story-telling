"use client";

import { usePointerParallax } from "@/lib/motion/usePointerParallax";

/** Mounts the body-level pointer parallax loop. Renders nothing. */
export function PointerParallaxDriver() {
  usePointerParallax();
  return null;
}
