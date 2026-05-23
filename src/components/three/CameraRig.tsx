"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useCinematicStore } from "@/store/cinematicStore";

const TARGET_POSITION = new Vector3();
const LOOK_AT = new Vector3();

export function CameraRig() {
  const camera = useThree((state) => state.camera);
  const visualState = useCinematicStore((state) => state.visualState);

  useFrame((_, delta) => {
    TARGET_POSITION.set(
      visualState.cameraX,
      visualState.cameraY,
      visualState.cameraZ,
    );

    const lerpFactor = 1 - Math.exp(-4 * delta);
    camera.position.lerp(TARGET_POSITION, lerpFactor);

    LOOK_AT.set(0, 0, 0);
    camera.lookAt(LOOK_AT);
    camera.updateProjectionMatrix();
  });

  return null;
}
