"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh, MeshStandardMaterial, ShaderMaterial } from "three";
import { Color, MathUtils } from "three";
import { getVisualState } from "@/lib/three/visualStateRef";
import {
  ORB_FRAGMENT_SHADER,
  ORB_VERTEX_SHADER,
} from "@/lib/three/shaders/orbShader";
import { useCinematicStore } from "@/store/cinematicStore";

type MainObjectProps = {
  animate: boolean;
  useShaderMaterial: boolean;
  enhancedGlow: boolean;
};

const FRAGMENT_OFFSETS: [number, number, number][] = [
  [0.85, 0.35, 0.2],
  [-0.7, 0.5, -0.15],
  [0.4, -0.65, 0.35],
  [-0.55, -0.4, -0.3],
  [0.15, 0.75, -0.45],
  [-0.2, -0.15, 0.6],
];

export function MainObject({
  animate,
  useShaderMaterial,
  enhancedGlow,
}: MainObjectProps) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const torusRef = useRef<Mesh>(null);
  const standardMaterialRef = useRef<MeshStandardMaterial>(null);
  const shaderMaterialRef = useRef<ShaderMaterial>(null);
  const fragmentRefs = useRef<Mesh[]>([]);
  const activeSceneId = useCinematicStore((state) => state.activeSceneId);

  const fragmentOffsets = useMemo(() => FRAGMENT_OFFSETS, []);

  useFrame((state, delta) => {
    const visualState = getVisualState();
    const group = groupRef.current;
    const core = coreRef.current;
    const glow = glowRef.current;
    const torus = torusRef.current;
    const standardMaterial = standardMaterialRef.current;
    const shaderMaterial = shaderMaterialRef.current;

    if (!group || !core || !glow) {
      return;
    }

    const lerpFactor = 1 - Math.exp(-5 * delta);

    group.position.set(
      MathUtils.lerp(group.position.x, visualState.objectX, lerpFactor),
      MathUtils.lerp(group.position.y, visualState.objectY, lerpFactor),
      MathUtils.lerp(group.position.z, visualState.objectZ, lerpFactor),
    );

    let targetScale = visualState.objectScale;
    if (animate && activeSceneId === "spark") {
      targetScale *= 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.04;
    }

    group.scale.setScalar(
      MathUtils.lerp(group.scale.x, targetScale, lerpFactor),
    );

    core.rotation.x = MathUtils.lerp(
      core.rotation.x,
      visualState.objectRotationX,
      lerpFactor,
    );
    core.rotation.y = MathUtils.lerp(
      core.rotation.y,
      visualState.objectRotationY,
      lerpFactor,
    );
    core.rotation.z = MathUtils.lerp(
      core.rotation.z,
      visualState.objectRotationZ,
      lerpFactor,
    );

    glow.rotation.copy(core.rotation);

    const emissiveTarget = visualState.emissiveIntensity;

    if (shaderMaterial) {
      shaderMaterial.uniforms.uEmissive.value = MathUtils.lerp(
        shaderMaterial.uniforms.uEmissive.value,
        emissiveTarget,
        lerpFactor,
      );

      if (animate) {
        shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      }
    }

    if (standardMaterial) {
      standardMaterial.emissiveIntensity = MathUtils.lerp(
        standardMaterial.emissiveIntensity,
        emissiveTarget,
        lerpFactor,
      );
    }

    if (torus) {
      const torusScale =
        visualState.objectScale * 1.35 * visualState.torusVisible;
      torus.scale.setScalar(
        MathUtils.lerp(torus.scale.x, torusScale, lerpFactor),
      );
      torus.rotation.y += delta * 0.12;
    }

    const spread = visualState.fragmentSpread;
    fragmentRefs.current.forEach((fragment, index) => {
      const offset = fragmentOffsets[index];
      if (!fragment || !offset) {
        return;
      }

      fragment.position.set(
        offset[0] * spread,
        offset[1] * spread,
        offset[2] * spread,
      );
      fragment.rotation.x += delta * 0.35 * spread;
      fragment.rotation.y += delta * 0.25 * spread;
      fragment.visible = spread > 0.02;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh ref={glowRef} scale={enhancedGlow ? 1.55 : 1.45}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial
          color={enhancedGlow ? "#9b7cff" : "#7c5cff"}
          transparent
          opacity={
            enhancedGlow ? 0.18 : useShaderMaterial ? 0.12 : 0.1
          }
          depthWrite={false}
        />
      </mesh>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        {useShaderMaterial ? (
          <shaderMaterial
            ref={shaderMaterialRef}
            vertexShader={ORB_VERTEX_SHADER}
            fragmentShader={ORB_FRAGMENT_SHADER}
            uniforms={{
              uTime: { value: 0 },
              uEmissive: { value: 0.35 },
              uColor: { value: new Color("#7c5cff") },
              uAccent: { value: new Color("#00d5ff") },
            }}
          />
        ) : (
          <meshStandardMaterial
            ref={standardMaterialRef}
            color="#7c5cff"
            emissive="#7c5cff"
            emissiveIntensity={0.35}
            metalness={0.25}
            roughness={0.3}
          />
        )}
      </mesh>
      <mesh ref={torusRef} rotation={[Math.PI / 2.2, 0, 0]} scale={0}>
        <torusGeometry args={[0.72, 0.03, 12, 48]} />
        <meshStandardMaterial
          color="#00d5ff"
          emissive="#00d5ff"
          emissiveIntensity={0.55}
          metalness={0.4}
          roughness={0.25}
          transparent
          opacity={0.85}
        />
      </mesh>
      {fragmentOffsets.map((offset, index) => (
        <mesh
          key={offset.join("-")}
          ref={(mesh) => {
            if (mesh) {
              fragmentRefs.current[index] = mesh;
            }
          }}
          visible={false}
        >
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial
            color="#ff7a3d"
            emissive="#ff355e"
            emissiveIntensity={0.35}
            metalness={0.15}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
