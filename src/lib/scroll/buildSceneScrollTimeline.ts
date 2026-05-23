import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES, type SceneDefinition } from "@/data/scenes";
import { lerpVisualState } from "@/lib/scroll/lerpVisualState";
import {
  INITIAL_VISUAL_STATE,
  SCENE_VISUAL_KEYFRAMES,
} from "@/lib/scroll/storyVisualKeyframes";
import type { VisualState } from "@/store/cinematicStore";
import { setVisualStateRef } from "@/lib/three/visualStateRef";

const SCRUB_SMOOTHING = 1;

type SceneScrollTimelineOptions = {
  section: HTMLElement;
  scene: SceneDefinition;
  sceneIndex: number;
  refreshPriority: number;
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
 * One scrubbed timeline + ScrollTrigger per story section (visual + copy motion).
 */
export function buildSceneScrollTimeline({
  section,
  scene,
  sceneIndex,
  refreshPriority,
}: SceneScrollTimelineOptions): gsap.core.Timeline {
  const { fromState, toState } = getVisualKeyframePair(sceneIndex);

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: `scene-${scene.id}`,
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: SCRUB_SMOOTHING,
      refreshPriority,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setVisualStateRef(lerpVisualState(fromState, toState, self.progress));
      },
    },
  });

  const content = section.querySelector<HTMLElement>("[data-scene-content]");
  if (content) {
    timeline
      .fromTo(
        content,
        { y: 48 },
        { y: 0, ease: "none", duration: 0.35, immediateRender: false },
        0,
      )
      .to(
        content,
        {
          y: scene.id === "chaos" ? -40 : -20,
          ease: "none",
          duration: 0.65,
        },
        0.35,
      );
  }

  const headline = section.querySelector<HTMLElement>("[data-scene-headline]");
  if (headline) {
    const words = headline.querySelectorAll<HTMLElement>(
      ".animated-text-word-inner",
    );

    if (words.length > 0) {
      timeline.fromTo(
        words,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          stagger: 0.06,
          duration: 0.28,
          immediateRender: false,
        },
        0.1,
      );
    } else {
      timeline.fromTo(
        headline,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          duration: 0.28,
          immediateRender: false,
        },
        0.1,
      );
    }
  }

  const body = section.querySelector<HTMLElement>("[data-scene-body]");
  if (body) {
    timeline.fromTo(
      body,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        duration: 0.24,
        immediateRender: false,
      },
      0.16,
    );
  }

  const cta = section.querySelector<HTMLElement>("[data-scene-cta]");
  if (cta) {
    timeline.fromTo(
      cta,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        duration: 0.2,
        immediateRender: false,
      },
      0.22,
    );
  }

  return timeline;
}

type ChaosPinOptions = {
  section: HTMLElement;
  refreshPriority: number;
};

/** Desktop-only pin for the chaos beat (separate trigger; different scroll range than scene scrub). */
export function buildChaosPinScrollTrigger({
  section,
  refreshPriority,
}: ChaosPinOptions) {
  return ScrollTrigger.create({
    id: "scene-chaos-pin",
    trigger: section,
    start: "top top",
    end: "+=70%",
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    refreshPriority,
  });
}
