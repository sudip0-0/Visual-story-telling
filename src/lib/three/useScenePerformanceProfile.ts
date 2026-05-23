"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

const MOBILE_QUERY = "(max-width: 767px)";

export type EffectsLevel = "full" | "reduced" | "minimal";

export type ScenePerformanceProfile = {
  particleCount: number;
  maxDpr: number;
  animate: boolean;
  antialias: boolean;
  lowGeometryDetail: boolean;
  effectsLevel: EffectsLevel;
  /**
   * Material emissive shell on the orb (not postprocessing bloom).
   * Phase 6 intentionally avoids full-screen bloom passes for performance
   * and text readability per AGENTS.md / DESIGN.md.
   */
  enableEnhancedGlow: boolean;
  enableShaderOrb: boolean;
  enableStreaks: boolean;
  enableDepthPlanes: boolean;
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

function getLowPowerSnapshot(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }

  const deviceMemory = (
    navigator as Navigator & { deviceMemory?: number }
  ).deviceMemory;

  if (deviceMemory !== undefined && deviceMemory < 4) {
    return true;
  }

  const cores = navigator.hardwareConcurrency;
  return cores > 0 && cores <= 4;
}

function getLowPowerServerSnapshot(): boolean {
  return false;
}

function subscribeLowPower(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

const MINIMAL_PROFILE: ScenePerformanceProfile = {
  particleCount: 44,
  maxDpr: 1,
  animate: false,
  antialias: false,
  lowGeometryDetail: true,
  effectsLevel: "minimal",
  enableEnhancedGlow: false,
  enableShaderOrb: false,
  enableStreaks: false,
  enableDepthPlanes: false,
};

const REDUCED_PROFILE: ScenePerformanceProfile = {
  particleCount: 84,
  maxDpr: 1.15,
  animate: true,
  antialias: false,
  lowGeometryDetail: true,
  effectsLevel: "reduced",
  enableEnhancedGlow: false,
  enableShaderOrb: true,
  enableStreaks: false,
  enableDepthPlanes: false,
};

const FULL_PROFILE: ScenePerformanceProfile = {
  particleCount: 198,
  maxDpr: 1.35,
  animate: true,
  antialias: true,
  lowGeometryDetail: false,
  effectsLevel: "full",
  enableEnhancedGlow: true,
  enableShaderOrb: true,
  enableStreaks: true,
  enableDepthPlanes: true,
};

export function useScenePerformanceProfile(): ScenePerformanceProfile {
  const prefersReducedMotion = useReducedMotionPreference();
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getMobileServerSnapshot,
  );
  const isLowPower = useSyncExternalStore(
    subscribeLowPower,
    getLowPowerSnapshot,
    getLowPowerServerSnapshot,
  );

  if (prefersReducedMotion) {
    return MINIMAL_PROFILE;
  }

  if (isMobile) {
    return REDUCED_PROFILE;
  }

  if (isLowPower) {
    return {
      ...FULL_PROFILE,
      particleCount: 128,
      maxDpr: 1.15,
      antialias: false,
      lowGeometryDetail: true,
      effectsLevel: "reduced",
      enableEnhancedGlow: false,
      enableStreaks: false,
      enableDepthPlanes: false,
    };
  }

  return FULL_PROFILE;
}
