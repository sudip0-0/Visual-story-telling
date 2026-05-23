"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points, PointsMaterial } from "three";
import { MathUtils } from "three";
import { expLerpFactor } from "@/lib/three/expLerp";
import { getVisualState } from "@/lib/three/visualStateRef";

type ParticleFieldProps = {
  count: number;
  animate: boolean;
};

function createParticlePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const radius = 4.5 + Math.random() * 8.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
    positions[index * 3 + 2] = radius * Math.cos(phi) - 2.5;
  }

  return positions;
}

export function ParticleField({ count, animate }: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const positions = useMemo(
    () => createParticlePositions(count),
    [count],
  );

  useFrame((_, delta) => {
    const points = pointsRef.current;
    const material = materialRef.current;
    if (!points || !material) {
      return;
    }

    const visualState = getVisualState();
    const lerpFactor = expLerpFactor(delta, 3);

    const targetZ = visualState.particleDrift * 0.32;
    points.position.z = MathUtils.lerp(points.position.z, targetZ, lerpFactor);

    const targetOpacity = Math.min(
      0.52,
      visualState.particleOpacity * (0.88 + visualState.storyProgress * 0.08),
    );
    material.opacity = MathUtils.lerp(material.opacity, targetOpacity, lerpFactor);

    const targetSize = 0.026 + visualState.particleDrift * 0.006;
    material.size = MathUtils.lerp(material.size, targetSize, lerpFactor);

    if (animate && visualState.particleDrift > 0.08) {
      points.rotation.y +=
        delta * (0.012 + visualState.particleDrift * 0.008);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.028}
        color="#9ba3af"
        transparent
        opacity={0.38}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
