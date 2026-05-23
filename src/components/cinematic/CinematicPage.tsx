import { SceneCanvas } from "@/components/cinematic/SceneCanvas";
import { SceneOverlay } from "@/components/cinematic/SceneOverlay";
import { ScrollProgress } from "@/components/cinematic/ScrollProgress";
import { ScrollScenes } from "@/components/cinematic/ScrollScenes";

export function CinematicPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SceneCanvas />
      <ScrollProgress />
      <main className="relative z-10" id="story">
        <SceneOverlay />
        <ScrollScenes />
      </main>
    </div>
  );
}
