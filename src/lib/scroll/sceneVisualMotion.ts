import type { SceneId } from "@/data/scenes";
import { lerpVisualState } from "@/lib/scroll/lerpVisualState";
import type { VisualState } from "@/store/cinematicStore";

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Smoothstep — slow in, slow out (camera pushes). */
function easeSlow(progress: number): number {
  const t = clamp01(progress);
  return t * t * (3 - 2 * t);
}

function lerpValue(from: number, to: number, progress: number): number {
  return from + (to - from) * clamp01(progress);
}

/**
 * Scene-specific remapping of scroll progress into 3D visual state.
 * One narrative motion idea per beat; deterministic from scrub progress only.
 */
export function resolveSceneVisualState(
  sceneId: SceneId,
  from: VisualState,
  to: VisualState,
  progress: number,
  isMobile: boolean,
): VisualState {
  const t = clamp01(progress);
  const base = lerpVisualState(from, to, t);

  switch (sceneId) {
    case "signal": {
      const push = easeSlow(t);
      return {
        ...base,
        cameraZ: lerpValue(from.cameraZ, to.cameraZ, push),
        particleDrift: lerpValue(from.particleDrift, to.particleDrift, push * 0.8),
        emissiveIntensity: lerpValue(
          from.emissiveIntensity,
          to.emissiveIntensity,
          t * 0.65,
        ),
        objectScale: lerpValue(from.objectScale, to.objectScale, push * 0.9),
      };
    }

    case "spark": {
      const orbitAmount = isMobile ? 0.1 : 0.22;
      const orbit = Math.sin(t * Math.PI * 2) * orbitAmount;
      const pulseAmount = isMobile ? 0.02 : 0.055;
      const pulse = 1 + Math.sin(t * Math.PI * 3) * pulseAmount;

      return {
        ...base,
        cameraX: base.cameraX + orbit,
        cameraY: base.cameraY + orbit * 0.4,
        cameraZ: lerpValue(from.cameraZ, to.cameraZ, easeSlow(t)),
        objectScale: base.objectScale * pulse,
        emissiveIntensity: lerpValue(
          from.emissiveIntensity,
          to.emissiveIntensity,
          Math.min(1, t * 1.15),
        ),
        particleDrift: lerpValue(from.particleDrift, to.particleDrift, t * 1.1),
      };
    }

    case "chaos": {
      const spreadPeak = Math.sin(t * Math.PI);
      const depth = isMobile ? 0.15 : 0.35;
      const cameraDip = Math.sin(t * Math.PI) * depth;

      return {
        ...base,
        fragmentSpread: lerpValue(
          from.fragmentSpread,
          to.fragmentSpread,
          spreadPeak,
        ),
        cameraZ: lerpValue(from.cameraZ, to.cameraZ, t) - cameraDip,
        cameraX: base.cameraX + (isMobile ? 0 : Math.sin(t * Math.PI * 2) * 0.12),
        particleDrift: lerpValue(
          from.particleDrift,
          to.particleDrift,
          Math.min(1, t * 1.25),
        ),
        objectRotationY:
          base.objectRotationY + (isMobile ? 0 : Math.sin(t * Math.PI) * 0.35),
      };
    }

    case "structure": {
      const settle = easeSlow(t);
      return {
        ...base,
        fragmentSpread: lerpValue(from.fragmentSpread, to.fragmentSpread, settle),
        objectRotationX: lerpValue(from.objectRotationX, to.objectRotationX, settle),
        objectRotationY: lerpValue(from.objectRotationY, to.objectRotationY, settle),
        objectRotationZ: lerpValue(from.objectRotationZ, to.objectRotationZ, settle),
        cameraZ: lerpValue(from.cameraZ, to.cameraZ, settle),
        objectX: lerpValue(from.objectX, to.objectX, settle),
        objectY: lerpValue(from.objectY, to.objectY, settle),
        particleDrift: lerpValue(from.particleDrift, to.particleDrift, settle * 0.85),
      };
    }

    case "system": {
      const polish = t < 0.35 ? t / 0.35 : 0.35 + ((t - 0.35) / 0.65) * 0.65;
      const torusRamp = t < 0.45 ? 0 : (t - 0.45) / 0.55;

      return {
        ...base,
        objectX: lerpValue(from.objectX, to.objectX, easeSlow(t)),
        objectScale: lerpValue(from.objectScale, to.objectScale, polish),
        cameraX: lerpValue(from.cameraX, to.cameraX, easeSlow(t)),
        torusVisible: lerpValue(from.torusVisible, to.torusVisible, torusRamp),
        objectRotationY: lerpValue(from.objectRotationY, to.objectRotationY, polish),
        particleDrift: lerpValue(from.particleDrift, to.particleDrift, t * 0.75),
      };
    }

    case "launch": {
      const pull = t < 0.4 ? t * 0.35 : 0.14 + ((t - 0.4) / 0.6) * 0.86;
      const calm = easeSlow(t);

      return {
        ...base,
        cameraZ: lerpValue(from.cameraZ, to.cameraZ, pull),
        cameraY: lerpValue(from.cameraY, to.cameraY, calm),
        objectScale: lerpValue(from.objectScale, to.objectScale, calm),
        particleDrift: lerpValue(from.particleDrift, to.particleDrift, t * 0.6),
        torusVisible: lerpValue(from.torusVisible, to.torusVisible, calm),
        emissiveIntensity: lerpValue(
          from.emissiveIntensity,
          to.emissiveIntensity,
          calm,
        ),
      };
    }

    default:
      return base;
  }
}
