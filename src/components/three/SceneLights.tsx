"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { PointLight } from "three";
import { expLerpFactor } from "@/lib/three/expLerp";
import { resolveAccentColor, resolveSecondaryAccent } from "@/lib/three/resolveAccentColor";
import { getVisualState } from "@/lib/three/visualStateRef";

export function SceneLights() {
  const keyAccentRef = useRef<PointLight>(null);
  const rimAccentRef = useRef<PointLight>(null);

  useFrame((_, delta) => {
    const visual = getVisualState();
    const lerpFactor = expLerpFactor(delta, 4);

    const key = keyAccentRef.current;
    const rim = rimAccentRef.current;

    if (key) {
      const targetIntensity = 9 + visual.emissiveIntensity * 7;
      key.intensity += (targetIntensity - key.intensity) * lerpFactor;
      resolveAccentColor(visual.accentMix, key.color);
    }

    if (rim) {
      const targetIntensity = 4 + visual.particleDrift * 3;
      rim.intensity += (targetIntensity - rim.intensity) * lerpFactor;
      resolveSecondaryAccent(visual.accentMix, rim.color);
    }
  });

  return (
    <>
      <ambientLight intensity={0.22} color="#9ba3af" />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.1}
        color="#f4f7fb"
      />
      <pointLight
        ref={keyAccentRef}
        position={[-3, -1, 4]}
        intensity={12}
        color="#7c5cff"
        distance={18}
        decay={2}
      />
      <pointLight
        ref={rimAccentRef}
        position={[3, 2, -2]}
        intensity={6}
        color="#00d5ff"
        distance={14}
        decay={2}
      />
    </>
  );
}
