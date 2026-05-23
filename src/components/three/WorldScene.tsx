"use client";

import type { ScenePerformanceProfile } from "@/lib/three/useScenePerformanceProfile";
import { AtmosphereBackground } from "@/components/three/AtmosphereBackground";
import { CameraRig } from "@/components/three/CameraRig";
import { DepthPlanes } from "@/components/three/DepthPlanes";
import { LightStreaks } from "@/components/three/LightStreaks";
import { MainObject } from "@/components/three/MainObject";
import { ParticleField } from "@/components/three/ParticleField";
import { SceneLights } from "@/components/three/SceneLights";

type WorldSceneProps = {
  profile: ScenePerformanceProfile;
};

export function WorldScene({ profile }: WorldSceneProps) {
  return (
    <>
      <color attach="background" args={["#030305"]} />
      <AtmosphereBackground animate={profile.animate} />
      {profile.enableDepthPlanes && (
        <DepthPlanes animate={profile.animate} />
      )}
      {profile.enableStreaks && (
        <LightStreaks animate={profile.animate} />
      )}
      <CameraRig />
      <SceneLights />
      <ParticleField
        count={profile.particleCount}
        animate={profile.animate}
      />
      <MainObject
        animate={profile.animate}
        useShaderMaterial={profile.enableShaderOrb}
        enhancedGlow={profile.enableEnhancedGlow}
      />
    </>
  );
}
