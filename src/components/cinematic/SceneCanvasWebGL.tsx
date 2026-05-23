"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { WorldScene } from "@/components/three/WorldScene";
import { useScenePerformanceProfile } from "@/lib/three/useScenePerformanceProfile";
import { useWebGLCapability } from "@/lib/three/useWebGLCapability";

export function SceneCanvasWebGL() {
  const hasWebGL = useWebGLCapability();
  const profile = useScenePerformanceProfile();
  const [hasError, setHasError] = useState(false);

  if (!hasWebGL || hasError) {
    return null;
  }

  return (
    <Canvas
      className="pointer-events-none absolute inset-0 z-[1]"
      dpr={[1, profile.maxDpr]}
      camera={{ position: [0, 0.15, 5.4], fov: 42, near: 0.1, far: 100 }}
      frameloop={profile.animate ? "always" : "demand"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            setHasError(true);
          },
          { once: true },
        );
      }}
      onError={() => {
        setHasError(true);
      }}
    >
      <WorldScene profile={profile} />
    </Canvas>
  );
}
