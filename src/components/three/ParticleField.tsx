"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";

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
  const positions = useMemo(
    () => createParticlePositions(count),
    [count],
  );

  useFrame((_, delta) => {
    if (!animate || !pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
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
