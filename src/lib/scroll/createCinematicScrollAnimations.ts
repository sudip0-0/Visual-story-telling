import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES } from "@/data/scenes";
import { registerGsap } from "@/lib/gsap/registerGsap";
import {
  getTotalSceneHeightVh,
  INITIAL_VISUAL_STATE,
  SCENE_VISUAL_KEYFRAMES,
} from "@/lib/scroll/storyVisualKeyframes";
import { useCinematicStore } from "@/store/cinematicStore";

export type CinematicScrollAnimationsOptions = {
  scope: Element;
  prefersReducedMotion: boolean;
};

export type CinematicScrollAnimations = {
  destroy: () => void;
  refresh: () => void;
};

function setContentVisible(scope: Element): void {
  const contents = scope.querySelectorAll<HTMLElement>("[data-scene-content]");
  contents.forEach((content) => {
    gsap.set(content, { opacity: 1, y: 0, clearProps: "transform,opacity" });
  });

  const headlines = scope.querySelectorAll<HTMLElement>("[data-scene-headline]");
  headlines.forEach((headline) => {
    gsap.set(headline, { yPercent: 0, opacity: 1, clearProps: "transform,opacity" });
  });

  const bodies = scope.querySelectorAll<HTMLElement>("[data-scene-body]");
  bodies.forEach((body) => {
    gsap.set(body, { opacity: 1, y: 0, clearProps: "transform,opacity" });
  });
}

export function createCinematicScrollAnimations(
  options: CinematicScrollAnimationsOptions,
): CinematicScrollAnimations {
  registerGsap();

  const { scope, prefersReducedMotion } = options;
  const setVisualState = useCinematicStore.getState().setVisualState;

  if (prefersReducedMotion) {
    const context = gsap.context(() => {
      setContentVisible(scope);
      setVisualState(SCENE_VISUAL_KEYFRAMES.system);
    }, scope);

    return {
      destroy: () => context.revert(),
      refresh: () => ScrollTrigger.refresh(),
    };
  }

  const visual = { ...INITIAL_VISUAL_STATE };
  const totalHeight = getTotalSceneHeightVh();

  const context = gsap.context(() => {
    const storyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: () => {
          setVisualState({ ...visual });
        },
      },
    });

    let position = 0;
    SCENES.forEach((scene) => {
      const duration = scene.minHeightVh / totalHeight;
      storyTimeline.to(
        visual,
        {
          ...SCENE_VISUAL_KEYFRAMES[scene.id],
          duration,
          ease: "none",
        },
        position,
      );
      position += duration;
    });

    SCENES.forEach((scene) => {
      const section = scope.querySelector<HTMLElement>(
        `[data-scene="${scene.id}"]`,
      );
      if (!section) {
        return;
      }

      const content = section.querySelector<HTMLElement>("[data-scene-content]");
      const headline = section.querySelector<HTMLElement>(
        "[data-scene-headline]",
      );
      const body = section.querySelector<HTMLElement>("[data-scene-body]");

      if (content) {
        const contentTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        contentTimeline
          .fromTo(
            content,
            { y: 48, opacity: 0 },
            { y: 0, opacity: 1, ease: "none", duration: 0.35 },
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

      if (headline) {
        gsap.fromTo(
          headline,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "top 52%",
              scrub: 1,
            },
          },
        );
      }

      if (body) {
        gsap.fromTo(
          body,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "top 48%",
              scrub: 1,
            },
          },
        );
      }

      const cta = section.querySelector<HTMLElement>("[data-scene-cta]");
      if (cta) {
        gsap.fromTo(
          cta,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "top 45%",
              scrub: 1,
            },
          },
        );
      }
    });

    const chaosSection = scope.querySelector<HTMLElement>(
      '[data-scene="chaos"]',
    );
    if (chaosSection) {
      ScrollTrigger.create({
        trigger: chaosSection,
        start: "top top",
        end: "+=70%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
    }
  }, scope);

  setVisualState(INITIAL_VISUAL_STATE);

  return {
    destroy: () => {
      context.revert();
      setVisualState(INITIAL_VISUAL_STATE);
    },
    refresh: () => ScrollTrigger.refresh(),
  };
}
