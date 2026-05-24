"use client";

import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";
import { expLerpFactor } from "@/lib/three/expLerp";
import { getVisualState } from "@/lib/three/visualStateRef";

const TARGET_POSITION = new Vector3();
const LOOK_AT = new Vector3();

const FOV_INTIMATE = 38; // Signal — close, claustrophobic.
const FOV_NEUTRAL = 42; // Spark / Structure / System / Launch.
const FOV_WIDE = 52; // Chaos — wide, debris-filled.

/**
 * Maps storyProgress (0..1) to a per-scene FOV breath.
 * Anchors:
 *   0.00 signal → 38°
 *   0.20 spark  → 42°
 *   0.45 chaos  → 52°
 *   0.62 structure → 44°
 *   0.80 system → 42°
 *   1.00 launch → 44°
 */
function resolveFov(storyProgress: number): number {
  const t = Math.min(1, Math.max(0, storyProgress));

  if (t <= 0.2) {
    return FOV_INTIMATE + (FOV_NEUTRAL - FOV_INTIMATE) * (t / 0.2);
  }
  if (t <= 0.45) {
    return FOV_NEUTRAL + (FOV_WIDE - FOV_NEUTRAL) * ((t - 0.2) / 0.25);
  }
  if (t <= 0.62) {
    return FOV_WIDE + (44 - FOV_WIDE) * ((t - 0.45) / 0.17);
  }
  if (t <= 0.8) {
    return 44 + (FOV_NEUTRAL - 44) * ((t - 0.62) / 0.18);
  }
  return FOV_NEUTRAL + (44 - FOV_NEUTRAL) * ((t - 0.8) / 0.2);
}

/**
 * Pointer parallax — body data attrs `--pointer-x` / `--pointer-y`
 * (-1..1). Reads from the document body, set by usePointerParallax
 * on fine pointers only.
 */
function readPointerParallax(): { x: number; y: number } {
  if (typeof document === "undefined") {
    return { x: 0, y: 0 };
  }
  const style = document.body.style;
  const x = parseFloat(style.getPropertyValue("--pointer-x")) || 0;
  const y = parseFloat(style.getPropertyValue("--pointer-y")) || 0;
  return { x, y };
}

export function CameraRig() {
  // Camera is read from the per-frame state argument so that mutations
  // are scoped to the R3F frame loop (React 19 lint compliance).
  useFrame((state, delta) => {
    const camera = state.camera;
    const visualState = getVisualState();
    const lerpFactor = expLerpFactor(delta, 4);

    // Position (dolly + truck) — already encoded in visual state per scene.
    TARGET_POSITION.set(
      visualState.cameraX,
      visualState.cameraY,
      visualState.cameraZ,
    );

    // Pointer parallax — clamp ±0.06 in world units.
    const pointer = readPointerParallax();
    TARGET_POSITION.x += pointer.x * 0.06;
    TARGET_POSITION.y += pointer.y * 0.04;

    camera.position.lerp(TARGET_POSITION, lerpFactor);

    // Camera gaze with subtle pointer offset.
    LOOK_AT.set(
      visualState.objectX * 0.35 + pointer.x * 0.18,
      visualState.objectY * 0.35 + pointer.y * 0.12,
      visualState.objectZ * 0.2,
    );
    camera.lookAt(LOOK_AT);

    // FOV breathing — only PerspectiveCamera supports `fov`.
    if (camera instanceof PerspectiveCamera) {
      const targetFov = resolveFov(visualState.storyProgress);
      const nextFov = camera.fov + (targetFov - camera.fov) * lerpFactor;
      if (Math.abs(nextFov - camera.fov) > 0.01) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}
