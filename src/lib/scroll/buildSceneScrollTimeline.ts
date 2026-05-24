import gsap from "gsap";
import { SCENES, type SceneDefinition } from "@/data/scenes";
import {
  appendSceneDomMotion,
  querySceneDomElements,
} from "@/lib/scroll/sceneDomTimelines";
import { resolveSceneVisualState } from "@/lib/scroll/sceneVisualMotion";
import {
  INITIAL_VISUAL_STATE,
  SCENE_VISUAL_KEYFRAMES,
} from "@/lib/scroll/storyVisualKeyframes";
import type { VisualState } from "@/store/cinematicStore";
import {
  getVisualState,
  setVisualStateRef,
} from "@/lib/three/visualStateRef";

const SCRUB_SMOOTHING = 1;

export type SceneScrollTimelineOptions = {
  section: HTMLElement;
  scene: SceneDefinition;
  sceneIndex: number;
  refreshPriority: number;
  isMobile: boolean;
};

function getVisualKeyframePair(sceneIndex: number): {
  fromState: VisualState;
  toState: VisualState;
} {
  const scene = SCENES[sceneIndex];
  const fromState =
    sceneIndex === 0
      ? INITIAL_VISUAL_STATE
      : SCENE_VISUAL_KEYFRAMES[SCENES[sceneIndex - 1].id];

  return {
    fromState,
    toState: SCENE_VISUAL_KEYFRAMES[scene.id],
  };
}

/**
 * One scrubbed timeline + ScrollTrigger per story section (3D narrative + copy).
 */
export function buildSceneScrollTimeline({
  section,
  scene,
  sceneIndex,
  refreshPriority,
  isMobile,
}: SceneScrollTimelineOptions): gsap.core.Timeline {
  const { fromState, toState } = getVisualKeyframePair(sceneIndex);
  const dom = querySceneDomElements(section);

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: `scene-${scene.id}`,
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: isMobile ? 0.85 : SCRUB_SMOOTHING,
      refreshPriority,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const { storyProgress, scrollVelocity } = getVisualState();
        setVisualStateRef({
          ...resolveSceneVisualState(
            scene.id,
            fromState,
            toState,
            self.progress,
            isMobile,
          ),
          storyProgress,
          // Preserve live scroll velocity — it's pushed by the engine,
          // not the per-scene scrub.
          scrollVelocity,
        });
      },
    },
  });

  appendSceneDomMotion(timeline, scene, dom, isMobile);

  return timeline;
}
