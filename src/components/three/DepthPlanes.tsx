"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, MathUtils, type Mesh } from "three";

type DepthPlanesProps = {
  animate: boolean;
};

const PLANES = [
  {
    position: [0, 0.2, -7.5] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: [14, 10, 1] as [number, number, number],
    color: "#7c5cff",
    opacity: 0.045,
  },
  {
    position: [-1.2, -0.4, -10] as [number, number, number],
    rotation: [0, 0.2, 0.05] as [number, number, number],
    scale: [16, 12, 1] as [number, number, number],
    color: "#00d5ff",
    opacity: 0.035,
  },
] as const;

export function DepthPlanes({ animate }: DepthPlanesProps) {
  const planeRefs = useRef<Mesh[]>([]);

  useFrame((state, delta) => {
    if (!animate) {
      return;
    }

    planeRefs.current.forEach((plane, index) => {
      if (!plane) {
        return;
      }

      plane.position.z += Math.sin(state.clock.elapsedTime * 0.15 + index) * delta * 0.02;
      plane.rotation.z = MathUtils.lerp(
        plane.rotation.z,
        0.05 * Math.sin(state.clock.elapsedTime * 0.1 + index),
        0.02,
      );
    });
  });

  return (
    <group renderOrder={-1}>
      {PLANES.map((plane, index) => (
        <mesh
          key={plane.color}
          ref={(mesh) => {
            if (mesh) {
              planeRefs.current[index] = mesh;
            }
          }}
          position={plane.position}
          rotation={plane.rotation}
          scale={plane.scale}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={plane.color}
            transparent
            opacity={plane.opacity}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
