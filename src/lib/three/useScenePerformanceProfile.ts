"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

const MOBILE_QUERY = "(max-width: 767px)";

export type ScenePerformanceProfile = {
  particleCount: number;
  maxDpr: number;
  animate: boolean;
};

function getMobileSnapshot(): boolean {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getMobileServerSnapshot(): boolean {
  return false;
}

function subscribeMobile(callback: () => void): () => void {
  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

export function useScenePerformanceProfile(): ScenePerformanceProfile {
  const prefersReducedMotion = useReducedMotionPreference();
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getMobileServerSnapshot,
  );

  if (prefersReducedMotion) {
    return {
      particleCount: 72,
      maxDpr: 1,
      animate: false,
    };
  }

  if (isMobile) {
    return {
      particleCount: 140,
      maxDpr: 1.25,
      animate: true,
    };
  }

  return {
    particleCount: 320,
    maxDpr: 1.5,
    animate: true,
  };
}
