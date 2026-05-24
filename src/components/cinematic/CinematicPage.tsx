import { ChapterScrubber } from "@/components/cinematic/ChapterScrubber";
import { ChaosVelocityDriver } from "@/components/cinematic/ChaosVelocityDriver";
import { CursorGlowLazy } from "@/components/cinematic/CursorGlowLazy";
import { IntroBeat } from "@/components/cinematic/IntroBeat";
import { PointerParallaxDriver } from "@/components/cinematic/PointerParallaxDriver";
import { SceneCanvas } from "@/components/cinematic/SceneCanvas";
import { SceneOverlay } from "@/components/cinematic/SceneOverlay";
import { SceneVignette } from "@/components/cinematic/SceneVignette";
import { ScrollEngine } from "@/components/cinematic/ScrollEngine";
import { ScrollScenes } from "@/components/cinematic/ScrollScenes";

export function CinematicPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 z-0" aria-hidden>
        <SceneCanvas />
        <SceneOverlay />
      </div>

      <SceneVignette />
      <PointerParallaxDriver />
      <ChaosVelocityDriver />
      <CursorGlowLazy />
      <ChapterScrubber />

      <ScrollEngine>
        <main
          className="relative z-10"
          id="story"
          aria-label="Signal to System cinematic story"
        >
          <ScrollScenes />
        </main>
      </ScrollEngine>

      <IntroBeat />
    </div>
  );
}
