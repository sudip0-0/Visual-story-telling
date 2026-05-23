import { SCENES } from "@/data/scenes";
import { StoryScene } from "@/components/cinematic/StoryScene";

export function ScrollScenes() {
  return (
    <div className="relative" data-component="scroll-scenes">
      {SCENES.map((scene) => (
        <StoryScene key={scene.id} scene={scene} />
      ))}
      <div
        id="work"
        className="sr-only"
        aria-hidden
        tabIndex={-1}
      />
    </div>
  );
}
