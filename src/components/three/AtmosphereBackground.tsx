"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide, Color, type ShaderMaterial } from "three";
import {
  ATMOSPHERE_FRAGMENT_SHADER,
  ATMOSPHERE_VERTEX_SHADER,
} from "@/lib/three/shaders/atmosphereShader";

type AtmosphereBackgroundProps = {
  animate: boolean;
  lowDetail?: boolean;
};

export function AtmosphereBackground({
  animate,
  lowDetail = false,
}: AtmosphereBackgroundProps) {
  const sphereSegments = lowDetail ? 16 : 24;
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material || !animate) {
      return;
    }

    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh scale={28} renderOrder={-2}>
      <sphereGeometry args={[1, sphereSegments, sphereSegments]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={ATMOSPHERE_VERTEX_SHADER}
        fragmentShader={ATMOSPHERE_FRAGMENT_SHADER}
        uniforms={{
          uTime: { value: 0 },
          // Warm red palette derived from globals.css `--accent` /
          // `--accent-warm`. Top: deep crimson breath; bottom: ember
          // glow against near-black `--background`.
          uAccent: { value: new Color("#3a0a10") },
          uAccent2: { value: new Color("#5a1408") },
          uAnimate: { value: animate ? 1 : 0 },
        }}
        side={BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}
