"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, ShaderMaterial } from "three";
import { Color, MathUtils } from "three";
import { expLerpFactor } from "@/lib/three/expLerp";
import { getVisualState } from "@/lib/three/visualStateRef";
import { resolveAccentColor } from "@/lib/three/resolveAccentColor";
import {
  ORB_FRAGMENT_SHADER,
  ORB_VERTEX_SHADER,
} from "@/lib/three/shaders/orbShader";

type MainObjectProps = {
  animate: boolean;
  useShaderMaterial: boolean;
  enhancedGlow: boolean;
  lowGeometryDetail: boolean;
};

const FRAGMENT_OFFSETS: [number, number, number][] = [
  [0.85, 0.35, 0.2],
  [-0.7, 0.5, -0.15],
  [0.4, -0.65, 0.35],
  [-0.55, -0.4, -0.3],
  [0.15, 0.75, -0.45],
  [-0.2, -0.15, 0.6],
];

const ACCENT_COLOR = new Color();

export function MainObject({
  animate,
  useShaderMaterial,
  enhancedGlow,
  lowGeometryDetail,
}: MainObjectProps) {
  const coreDetail = lowGeometryDetail ? 0 : 1;
  const torusSegments = lowGeometryDetail ? [8, 32] : [12, 48];
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const signalPointRef = useRef<Mesh>(null);
  const structureRingRef = useRef<Mesh>(null);
  const torusRef = useRef<Mesh>(null);
  const glowMaterialRef = useRef<MeshBasicMaterial>(null);
  const standardMaterialRef = useRef<MeshStandardMaterial>(null);
  const shaderMaterialRef = useRef<ShaderMaterial>(null);
  const torusMaterialRef = useRef<MeshStandardMaterial>(null);
  const fragmentRefs = useRef<Mesh[]>([]);

  const fragmentOffsets = useMemo(() => FRAGMENT_OFFSETS, []);
  const shaderColors = useMemo(
    () => ({
      uColor: new Color("#7c5cff"),
      uAccent: new Color("#00d5ff"),
    }),
    [],
  );

  useFrame((state, delta) => {
    const visualState = getVisualState();
    const group = groupRef.current;
    const core = coreRef.current;
    const glow = glowRef.current;
    const signalPoint = signalPointRef.current;
    const structureRing = structureRingRef.current;
    const torus = torusRef.current;
    const glowMaterial = glowMaterialRef.current;
    const standardMaterial = standardMaterialRef.current;
    const shaderMaterial = shaderMaterialRef.current;
    const torusMaterial = torusMaterialRef.current;

    if (!group || !core || !glow) {
      return;
    }

    const lerpFactor = expLerpFactor(delta, 5);
    const targetScale = visualState.objectScale;
    const warp = visualState.coreWarp;

    group.position.set(
      MathUtils.lerp(group.position.x, visualState.objectX, lerpFactor),
      MathUtils.lerp(group.position.y, visualState.objectY, lerpFactor),
      MathUtils.lerp(group.position.z, visualState.objectZ, lerpFactor),
    );

    const scaleX = targetScale * (1 + warp * 0.2);
    const scaleY = targetScale * (1 - warp * 0.16);
    const scaleZ = targetScale * (1 + warp * 0.12);

    group.scale.set(
      MathUtils.lerp(group.scale.x, scaleX, lerpFactor),
      MathUtils.lerp(group.scale.y, scaleY, lerpFactor),
      MathUtils.lerp(group.scale.z, scaleZ, lerpFactor),
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
    const glowOpacityTarget =
      visualState.glowOpacity * (enhancedGlow ? 1.15 : 1);

    if (glowMaterial) {
      glowMaterial.opacity = MathUtils.lerp(
        glowMaterial.opacity,
        glowOpacityTarget,
        lerpFactor,
      );
    }

    if (shaderMaterial) {
      shaderMaterial.uniforms.uEmissive.value = MathUtils.lerp(
        shaderMaterial.uniforms.uEmissive.value,
        emissiveTarget,
        lerpFactor,
      );

      resolveAccentColor(visualState.accentMix, ACCENT_COLOR);
      shaderMaterial.uniforms.uAccent.value.copy(ACCENT_COLOR);
      shaderMaterial.uniforms.uColor.value.copy(ACCENT_COLOR);

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
      resolveAccentColor(visualState.accentMix, ACCENT_COLOR);
      standardMaterial.color.copy(ACCENT_COLOR);
      standardMaterial.emissive.copy(ACCENT_COLOR);
    }

    if (signalPoint) {
      const isSignalPoint = targetScale < 0.22;
      signalPoint.visible = isSignalPoint;
      if (isSignalPoint) {
        const pointScale = 1.4 + (0.22 - targetScale) * 4.5;
        signalPoint.scale.setScalar(
          MathUtils.lerp(signalPoint.scale.x, pointScale, lerpFactor),
        );
      }
    }

    if (structureRing) {
      const ringScale = visualState.structureRing * targetScale * 1.85;
      structureRing.scale.setScalar(
        MathUtils.lerp(structureRing.scale.x, ringScale, lerpFactor),
      );
      structureRing.visible = visualState.structureRing > 0.02;
    }

    if (torus) {
      const torusScale =
        targetScale * 1.32 * visualState.torusVisible;
      torus.scale.setScalar(
        MathUtils.lerp(torus.scale.x, torusScale, lerpFactor),
      );
      torus.rotation.y += delta * 0.1 * visualState.torusVisible;

      if (torusMaterial) {
        torusMaterial.opacity = MathUtils.lerp(
          torusMaterial.opacity,
          0.85 * visualState.torusVisible,
          lerpFactor,
        );
      }
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

      if (animate && spread > 0.05) {
        fragment.rotation.x += delta * 0.3 * spread;
        fragment.rotation.y += delta * 0.22 * spread;
      }

      fragment.visible = spread > 0.02;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh ref={signalPointRef} visible={false}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshBasicMaterial
          color="#f4f7fb"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={glowRef} scale={enhancedGlow ? 1.55 : 1.45}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial
          ref={glowMaterialRef}
          color={enhancedGlow ? "#9b7cff" : "#7c5cff"}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, coreDetail]} />
        {useShaderMaterial ? (
          <shaderMaterial
            ref={shaderMaterialRef}
            vertexShader={ORB_VERTEX_SHADER}
            fragmentShader={ORB_FRAGMENT_SHADER}
            uniforms={{
              uTime: { value: 0 },
              uEmissive: { value: 0.35 },
              uColor: { value: shaderColors.uColor },
              uAccent: { value: shaderColors.uAccent },
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

      <mesh
        ref={structureRingRef}
        rotation={[Math.PI / 2, 0, 0]}
        visible={false}
      >
        <torusGeometry args={[0.92, 0.014, 8, 48]} />
        <meshBasicMaterial
          color="#00d5ff"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={torusRef} rotation={[Math.PI / 2.2, 0, 0]} scale={0}>
        <torusGeometry
          args={[0.72, 0.03, torusSegments[0], torusSegments[1]]}
        />
        <meshStandardMaterial
          ref={torusMaterialRef}
          color="#00d5ff"
          emissive="#00d5ff"
          emissiveIntensity={0.55}
          metalness={0.4}
          roughness={0.25}
          transparent
          opacity={0}
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
