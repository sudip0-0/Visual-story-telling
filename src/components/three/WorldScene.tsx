"use client";

import type { ScenePerformanceProfile } from "@/lib/three/useScenePerformanceProfile";
import { CameraRig } from "@/components/three/CameraRig";
import { MainObject } from "@/components/three/MainObject";
import { ParticleField } from "@/components/three/ParticleField";
import { SceneLights } from "@/components/three/SceneLights";

type WorldSceneProps = {
  profile: ScenePerformanceProfile;
};

export function WorldScene({ profile }: WorldSceneProps) {
  return (
    <>
      <CameraRig />
      <SceneLights />
      <ParticleField
        count={profile.particleCount}
        animate={profile.animate}
      />
      <MainObject animate={profile.animate} />
    </>
  );
}
