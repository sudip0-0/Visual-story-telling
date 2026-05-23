"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

type MainObjectProps = {
  animate: boolean;
};

export function MainObject({ animate }: MainObjectProps) {
  const meshRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!animate) {
      return;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.18;
      meshRef.current.rotation.x += delta * 0.06;
    }

    if (glowRef.current) {
      glowRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={glowRef} scale={1.35}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial
          color="#7c5cff"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial
          color="#7c5cff"
          emissive="#7c5cff"
          emissiveIntensity={0.9}
          metalness={0.25}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
