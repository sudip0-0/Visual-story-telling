import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES, type SceneId } from "@/data/scenes";

/**
 * Discrete scene index for UI store — aligned to each section's scroll span.
 * Uses onToggle so only one handler fires per crossing (no duplicate onEnter storms).
 */
export function createSceneActiveTriggers(
  scope: Element,
  onSceneChange: (sceneId: SceneId) => void,
): ScrollTrigger[] {
  const triggers: ScrollTrigger[] = [];

  SCENES.forEach((scene, index) => {
    const element = scope.querySelector<HTMLElement>(
      `[data-scene="${scene.id}"]`,
    );

    if (!element) {
      return;
    }

    const trigger = ScrollTrigger.create({
      id: `scene-active-${scene.id}`,
      trigger: element,
      start: "top 55%",
      end: "bottom 45%",
      refreshPriority: index,
      onToggle: (self) => {
        if (self.isActive) {
          onSceneChange(scene.id);
        }
      },
    });

    triggers.push(trigger);
  });

  return triggers;
}
