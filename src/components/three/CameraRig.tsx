"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { getVisualState } from "@/lib/three/visualStateRef";

const TARGET_POSITION = new Vector3();
const LOOK_AT = new Vector3();

export function CameraRig() {
  const camera = useThree((state) => state.camera);

  useFrame((_, delta) => {
    const visualState = getVisualState();

    TARGET_POSITION.set(
      visualState.cameraX,
      visualState.cameraY,
      visualState.cameraZ,
    );

    const lerpFactor = 1 - Math.exp(-4 * delta);
    camera.position.lerp(TARGET_POSITION, lerpFactor);

    LOOK_AT.set(0, 0, 0);
    camera.lookAt(LOOK_AT);
  });

  return null;
}
