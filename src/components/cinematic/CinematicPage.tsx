import { CursorGlow } from "@/components/cinematic/CursorGlow";
import { SceneCanvas } from "@/components/cinematic/SceneCanvas";
import { SceneOverlay } from "@/components/cinematic/SceneOverlay";
import { ScrollEngine } from "@/components/cinematic/ScrollEngine";
import { ScrollProgress } from "@/components/cinematic/ScrollProgress";
import { ScrollScenes } from "@/components/cinematic/ScrollScenes";

export function CinematicPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 z-0" aria-hidden>
        <SceneCanvas />
        <SceneOverlay />
      </div>

      <CursorGlow />
      <ScrollProgress />

      <ScrollEngine>
        <main className="relative z-10" id="story">
          <ScrollScenes />
        </main>
      </ScrollEngine>
    </div>
  );
}
