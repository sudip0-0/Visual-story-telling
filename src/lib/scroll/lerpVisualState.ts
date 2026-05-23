import type { VisualState } from "@/store/cinematicStore";

function lerpValue(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

export function lerpVisualState(
  from: VisualState,
  to: VisualState,
  progress: number,
): VisualState {
  const t = Math.min(1, Math.max(0, progress));

  return {
    cameraX: lerpValue(from.cameraX, to.cameraX, t),
    cameraY: lerpValue(from.cameraY, to.cameraY, t),
    cameraZ: lerpValue(from.cameraZ, to.cameraZ, t),
    objectScale: lerpValue(from.objectScale, to.objectScale, t),
    objectX: lerpValue(from.objectX, to.objectX, t),
    objectY: lerpValue(from.objectY, to.objectY, t),
    objectZ: lerpValue(from.objectZ, to.objectZ, t),
    objectRotationX: lerpValue(from.objectRotationX, to.objectRotationX, t),
    objectRotationY: lerpValue(from.objectRotationY, to.objectRotationY, t),
    objectRotationZ: lerpValue(from.objectRotationZ, to.objectRotationZ, t),
    emissiveIntensity: lerpValue(
      from.emissiveIntensity,
      to.emissiveIntensity,
      t,
    ),
    fragmentSpread: lerpValue(from.fragmentSpread, to.fragmentSpread, t),
    particleDrift: lerpValue(from.particleDrift, to.particleDrift, t),
    torusVisible: lerpValue(from.torusVisible, to.torusVisible, t),
  };
}
