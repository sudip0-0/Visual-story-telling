"use client";

import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";

export function CameraRig() {
  const camera = useThree((state) => state.camera);

  useLayoutEffect(() => {
    camera.position.set(0, 0.15, 5.4);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}
