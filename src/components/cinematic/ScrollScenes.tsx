import { SCENES } from "@/data/scenes";
import { StoryScene } from "@/components/cinematic/StoryScene";
import { WorkSection } from "@/components/cinematic/WorkSection";

export function ScrollScenes() {
  return (
    <div className="relative z-[2]" data-component="scroll-scenes">
      {SCENES.map((scene) => (
        <StoryScene key={scene.id} scene={scene} />
      ))}
      <WorkSection />
    </div>
  );
}
