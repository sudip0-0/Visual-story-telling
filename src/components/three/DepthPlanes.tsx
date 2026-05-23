"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, type Mesh } from "three";

type DepthPlanesProps = {
  animate: boolean;
};

const PLANES = [
  {
    position: [0, 0.2, -7.5] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: [14, 10, 1] as [number, number, number],
    color: "#0b0826",
    opacity: 0.07,
    zDrift: 0.12,
  },
  {
    position: [-1.2, -0.4, -10] as [number, number, number],
    rotation: [0, 0.2, 0.05] as [number, number, number],
    scale: [16, 12, 1] as [number, number, number],
    color: "#e11d2e",
    opacity: 0.045,
    zDrift: 0.1,
  },
] as const;

export function DepthPlanes({ animate }: DepthPlanesProps) {
  const planeRefs = useRef<Mesh[]>([]);

  useFrame((state) => {
    if (!animate) {
      return;
    }

    const elapsed = state.clock.elapsedTime;

    planeRefs.current.forEach((plane, index) => {
      const config = PLANES[index];
      if (!plane || !config) {
        return;
      }

      const [baseX, baseY, baseZ] = config.position;
      const [rotX, rotY, rotZ] = config.rotation;

      plane.position.set(
        baseX,
        baseY,
        baseZ + Math.sin(elapsed * 0.15 + index) * config.zDrift,
      );
      plane.rotation.set(
        rotX,
        rotY,
        rotZ + Math.sin(elapsed * 0.1 + index) * 0.05,
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
