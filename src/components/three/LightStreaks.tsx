"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, type Group } from "three";

type LightStreaksProps = {
  animate: boolean;
};

const STREAKS = [
  {
    position: [-2.2, 0.6, -3.5] as [number, number, number],
    rotation: [0.1, 0.45, -0.35] as [number, number, number],
    scale: [3.8, 0.04, 1] as [number, number, number],
    color: "#1dade1",
    opacity: 0.16,
  },
  {
    position: [2.4, -0.3, -4.2] as [number, number, number],
    rotation: [-0.15, -0.55, 0.25] as [number, number, number],
    scale: [4.6, 0.035, 1] as [number, number, number],
    color: "#0c0605",
    opacity: 0.12,
  },
  {
    position: [0.3, 1.1, -5] as [number, number, number],
    rotation: [0.55, 0.1, 0.4] as [number, number, number],
    scale: [2.8, 0.03, 1] as [number, number, number],
    color: "#fff5f2",
    opacity: 0.06,
  },
] as const;

export function LightStreaks({ animate }: LightStreaksProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group || !animate) {
      return;
    }

    group.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
    group.rotation.z = Math.cos(state.clock.elapsedTime * 0.06) * 0.03;
  });

  return (
    <group ref={groupRef}>
      {STREAKS.map((streak) => (
        <mesh
          key={streak.color}
          position={streak.position}
          rotation={streak.rotation}
          scale={streak.scale}
        >
          <boxGeometry args={[1, 1, 0.02]} />
          <meshBasicMaterial
            color={streak.color}
            transparent
            opacity={streak.opacity}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
