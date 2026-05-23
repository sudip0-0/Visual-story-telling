"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";
import { MathUtils } from "three";
import { useCinematicStore } from "@/store/cinematicStore";

type ParticleFieldProps = {
  count: number;
  animate: boolean;
};

function createParticlePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const radius = 4 + Math.random() * 9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.65;
    positions[index * 3 + 2] = radius * Math.cos(phi) - 2;
  }

  return positions;
}

export function ParticleField({ count, animate }: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null);
  const visualState = useCinematicStore((state) => state.visualState);
  const positions = useMemo(
    () => createParticlePositions(count),
    [count],
  );

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) {
      return;
    }

    const targetZ = visualState.particleDrift * 0.35;
    points.position.z = MathUtils.lerp(points.position.z, targetZ, 1 - Math.exp(-3 * delta));

    if (animate) {
      points.rotation.y += delta * (0.015 + visualState.particleDrift * 0.01);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#9ba3af"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
