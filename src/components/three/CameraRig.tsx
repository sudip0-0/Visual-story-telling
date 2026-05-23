"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { expLerpFactor } from "@/lib/three/expLerp";
import { getVisualState } from "@/lib/three/visualStateRef";

const TARGET_POSITION = new Vector3();
const LOOK_AT = new Vector3();

export function CameraRig() {
  const camera = useThree((state) => state.camera);

  useFrame((_, delta) => {
    const visualState = getVisualState();
    const lerpFactor = expLerpFactor(delta, 4);

    TARGET_POSITION.set(
      visualState.cameraX,
      visualState.cameraY,
      visualState.cameraZ,
    );

    camera.position.lerp(TARGET_POSITION, lerpFactor);

    LOOK_AT.set(
      visualState.objectX * 0.35,
      visualState.objectY * 0.35,
      visualState.objectZ * 0.2,
    );
    camera.lookAt(LOOK_AT);
  });

  return null;
}
