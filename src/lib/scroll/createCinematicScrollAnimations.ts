import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES } from "@/data/scenes";
import { registerGsap } from "@/lib/gsap/registerGsap";
import { lerpVisualState } from "@/lib/scroll/lerpVisualState";
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

function setContentVisible(scope: Element): void {
  const contents = scope.querySelectorAll<HTMLElement>("[data-scene-content]");
  contents.forEach((content) => {
    gsap.set(content, { opacity: 1, y: 0, clearProps: "transform,opacity" });
  });

  const headlines = scope.querySelectorAll<HTMLElement>("[data-scene-headline]");
  headlines.forEach((headline) => {
    gsap.set(headline, { clearProps: "transform,opacity" });
  });

  const bodies = scope.querySelectorAll<HTMLElement>("[data-scene-body]");
  bodies.forEach((body) => {
    gsap.set(body, { opacity: 1, y: 0, clearProps: "transform,opacity" });
  });

  const words = scope.querySelectorAll<HTMLElement>(".animated-text-word-inner");
  words.forEach((word) => {
    gsap.set(word, { yPercent: 0, opacity: 1, clearProps: "transform,opacity" });
  });
}

function createSceneVisualTriggers(scope: Element): void {
  SCENES.forEach((scene, index) => {
    const section = scope.querySelector<HTMLElement>(
      `[data-scene="${scene.id}"]`,
    );

    if (!section) {
      return;
    }

    const fromState =
      index === 0
        ? INITIAL_VISUAL_STATE
        : SCENE_VISUAL_KEYFRAMES[SCENES[index - 1].id];
    const toState = SCENE_VISUAL_KEYFRAMES[scene.id];

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        setVisualStateRef(lerpVisualState(fromState, toState, self.progress));
      },
    });
  });
}

export function createCinematicScrollAnimations(
  options: CinematicScrollAnimationsOptions,
): CinematicScrollAnimations {
  registerGsap();

  const { scope, prefersReducedMotion } = options;

  if (prefersReducedMotion) {
    const context = gsap.context(() => {
      setContentVisible(scope);
      setVisualStateRef(SCENE_VISUAL_KEYFRAMES.system);
    }, scope);

    return {
      destroy: () => {
        context.revert();
        resetVisualStateRef();
      },
      refresh: () => ScrollTrigger.refresh(),
    };
  }

  const context = gsap.context(() => {
    createSceneVisualTriggers(scope);

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
        const words = headline.querySelectorAll<HTMLElement>(
          ".animated-text-word-inner",
        );

        if (words.length > 0) {
          gsap.fromTo(
            words,
            { yPercent: 115, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              ease: "none",
              stagger: 0.06,
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                end: "top 48%",
                scrub: 1,
              },
            },
          );
        } else {
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
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;

    if (chaosSection && !isMobile) {
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

  setVisualStateRef(INITIAL_VISUAL_STATE);

  return {
    destroy: () => {
      context.revert();
      resetVisualStateRef();
    },
    refresh: () => ScrollTrigger.refresh(),
  };
}
