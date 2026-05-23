import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES } from "@/data/scenes";
import { registerGsap } from "@/lib/gsap/registerGsap";
import { buildSceneScrollTimeline } from "@/lib/scroll/buildSceneScrollTimeline";
import {
  setContentVisible,
  syncPreTriggerTextVisible,
} from "@/lib/scroll/sceneContentVisibility";
import {
  INITIAL_VISUAL_STATE,
  SCENE_VISUAL_KEYFRAMES,
} from "@/lib/scroll/storyVisualKeyframes";
import {
  resetVisualStateRef,
  setVisualStateRef,
} from "@/lib/three/visualStateRef";

const MOBILE_QUERY = "(max-width: 767px)";

export type CinematicScrollAnimationsOptions = {
  scope: Element;
  prefersReducedMotion: boolean;
};

export type CinematicScrollAnimations = {
  destroy: () => void;
  refresh: () => void;
};

let activeAnimations: CinematicScrollAnimations | null = null;

export function destroyActiveCinematicScrollAnimations(): void {
  activeAnimations?.destroy();
}

function isMobileViewport(): boolean {
  return window.matchMedia(MOBILE_QUERY).matches;
}

export function createCinematicScrollAnimations(
  options: CinematicScrollAnimationsOptions,
): CinematicScrollAnimations {
  activeAnimations?.destroy();

  registerGsap();

  const { scope, prefersReducedMotion } = options;

  if (prefersReducedMotion) {
    const context = gsap.context(() => {
      setContentVisible(scope);
      setVisualStateRef(SCENE_VISUAL_KEYFRAMES[SCENES[0].id]);
    }, scope);

    const animations: CinematicScrollAnimations = {
      destroy: () => {
        if (activeAnimations !== animations) {
          return;
        }

        context.revert();
        resetVisualStateRef();
        activeAnimations = null;
      },
      refresh: () => undefined,
    };

    activeAnimations = animations;
    return animations;
  }

  const isMobile = isMobileViewport();

  const context = gsap.context(() => {
    SCENES.forEach((scene, index) => {
      const section = scope.querySelector<HTMLElement>(
        `[data-scene="${scene.id}"]`,
      );

      if (!section) {
        return;
      }

      buildSceneScrollTimeline({
        section,
        scene,
        sceneIndex: index,
        refreshPriority: index,
        isMobile,
      });
    });
  }, scope);

  setVisualStateRef(INITIAL_VISUAL_STATE);

  const animations: CinematicScrollAnimations = {
    destroy: () => {
      if (activeAnimations !== animations) {
        return;
      }

      context.revert();
      resetVisualStateRef();
      activeAnimations = null;
    },
    refresh: () => {
      ScrollTrigger.refresh();
      syncPreTriggerTextVisible(scope);
    },
  };

  ScrollTrigger.refresh();
  syncPreTriggerTextVisible(scope);

  activeAnimations = animations;
  return animations;
}
