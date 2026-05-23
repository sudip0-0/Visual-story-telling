import gsap from "gsap";
import type { SceneDefinition } from "@/data/scenes";

export type SceneDomElements = {
  content: HTMLElement | null;
  headline: HTMLElement | null;
  words: HTMLElement[];
  body: HTMLElement | null;
  cta: HTMLElement | null;
  grid: HTMLElement | null;
  chaosFragments: HTMLElement[];
};

export function querySceneDomElements(section: HTMLElement): SceneDomElements {
  const headline = section.querySelector<HTMLElement>("[data-scene-headline]");

  return {
    content: section.querySelector<HTMLElement>("[data-scene-content]"),
    headline,
    words: headline
      ? Array.from(
          headline.querySelectorAll<HTMLElement>(".animated-text-word-inner"),
        )
      : [],
    body: section.querySelector<HTMLElement>("[data-scene-body]"),
    cta: section.querySelector<HTMLElement>("[data-scene-cta]"),
    grid: section.querySelector<HTMLElement>(".scene-grid-decoration"),
    chaosFragments: Array.from(
      section.querySelectorAll<HTMLElement>(".scene-chaos-fragments span"),
    ),
  };
}

type MotionScale = {
  yEnter: number;
  yExit: number;
  headlineStagger: number;
};

const MOBILE_MOTION: MotionScale = {
  yEnter: 24,
  yExit: -10,
  headlineStagger: 0.04,
};

const DESKTOP_MOTION: MotionScale = {
  yEnter: 48,
  yExit: -20,
  headlineStagger: 0.06,
};

function getMotionScale(isMobile: boolean): MotionScale {
  return isMobile ? MOBILE_MOTION : DESKTOP_MOTION;
}

function appendHeadlineReveal(
  timeline: gsap.core.Timeline,
  elements: SceneDomElements,
  at: number,
  duration: number,
  stagger: number,
): void {
  if (elements.words.length > 0) {
    timeline.fromTo(
      elements.words,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "none",
        stagger,
        duration,
        immediateRender: false,
      },
      at,
    );
    return;
  }

  if (elements.headline) {
    timeline.fromTo(
      elements.headline,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "none",
        duration,
        immediateRender: false,
      },
      at,
    );
  }
}

function appendBodyReveal(
  timeline: gsap.core.Timeline,
  body: HTMLElement,
  at: number,
  duration: number,
): void {
  timeline.fromTo(
    body,
    { y: 18, opacity: 0 },
    { y: 0, opacity: 1, ease: "none", duration, immediateRender: false },
    at,
  );
}

function appendContentDrift(
  timeline: gsap.core.Timeline,
  content: HTMLElement,
  yEnter: number,
  yExit: number,
  enterDuration: number,
  exitDuration: number,
): void {
  timeline
    .fromTo(
      content,
      { y: yEnter },
      { y: 0, ease: "none", duration: enterDuration, immediateRender: false },
      0,
    )
    .to(
      content,
      { y: yExit, ease: "none", duration: exitDuration, immediateRender: false },
      enterDuration,
    );
}

/** Deterministic copy motion — one narrative idea per scene. */
export function appendSceneDomMotion(
  timeline: gsap.core.Timeline,
  scene: SceneDefinition,
  elements: SceneDomElements,
  isMobile: boolean,
): void {
  const motion = getMotionScale(isMobile);
  const { content, body, cta } = elements;

  switch (scene.id) {
    case "signal": {
      if (content) {
        timeline
          .fromTo(
            content,
            { y: isMobile ? 28 : 40 },
            {
              y: 0,
              ease: "none",
              duration: 0.48,
              immediateRender: false,
            },
            0,
          )
          .to(
            content,
            {
              y: isMobile ? -6 : -10,
              ease: "none",
              duration: 0.52,
              immediateRender: false,
            },
            0.48,
          );
      }

      appendHeadlineReveal(timeline, elements, 0.14, 0.32, motion.headlineStagger);
      if (body) {
        appendBodyReveal(timeline, body, 0.3, 0.26);
      }
      break;
    }

    case "spark": {
      if (content) {
        timeline
          .fromTo(
            content,
            {
              x: isMobile ? -8 : -18,
              y: isMobile ? 28 : 36,
              scale: isMobile ? 1 : 0.97,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              ease: "none",
              duration: 0.38,
              immediateRender: false,
            },
            0,
          );

        if (!isMobile) {
          timeline.to(
            content,
            {
              scale: 1.02,
              ease: "none",
              duration: 0.28,
              immediateRender: false,
            },
            0.38,
          );
          timeline.to(
            content,
            {
              scale: 1,
              y: -12,
              ease: "none",
              duration: 0.34,
              immediateRender: false,
            },
            0.66,
          );
        } else {
          timeline.to(
            content,
            { y: -8, ease: "none", duration: 0.62, immediateRender: false },
            0.38,
          );
        }
      }

      appendHeadlineReveal(timeline, elements, 0.08, 0.26, motion.headlineStagger);
      if (body) {
        appendBodyReveal(timeline, body, 0.16, 0.22);
      }
      break;
    }

    case "chaos": {
      if (content) {
        appendContentDrift(
          timeline,
          content,
          isMobile ? 32 : 44,
          isMobile ? -24 : -44,
          0.32,
          0.68,
        );
      }

      if (!isMobile && elements.chaosFragments.length > 0) {
        timeline.fromTo(
          elements.chaosFragments,
          { y: 28, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 0.55,
            scale: 1,
            ease: "none",
            stagger: 0.08,
            duration: 0.35,
            immediateRender: false,
          },
          0.2,
        );
        timeline.to(
          elements.chaosFragments,
          {
            y: isMobile ? -12 : -24,
            opacity: 0.35,
            ease: "none",
            duration: 0.45,
            immediateRender: false,
          },
          0.55,
        );
      }

      appendHeadlineReveal(timeline, elements, 0.06, 0.22, motion.headlineStagger);
      if (body) {
        appendBodyReveal(timeline, body, 0.12, 0.2);
      }
      break;
    }

    case "structure": {
      if (elements.grid) {
        timeline.fromTo(
          elements.grid,
          { opacity: 0 },
          { opacity: isMobile ? 0.35 : 0.55, ease: "none", duration: 0.4, immediateRender: false },
          0.05,
        );
      }

      if (content) {
        timeline
          .fromTo(
            content,
            { y: isMobile ? 20 : 28, x: isMobile ? 0 : 10 },
            {
              y: 0,
              x: 0,
              ease: "none",
              duration: 0.36,
              immediateRender: false,
            },
            0,
          )
          .to(
            content,
            { y: 0, ease: "none", duration: 0.64, immediateRender: false },
            0.36,
          );
      }

      appendHeadlineReveal(timeline, elements, 0.08, 0.2, motion.headlineStagger * 0.85);
      if (body) {
        appendBodyReveal(timeline, body, 0.14, 0.18);
      }
      break;
    }

    case "system": {
      if (content) {
        timeline
          .fromTo(
            content,
            {
              x: isMobile ? 0 : 16,
              y: isMobile ? 22 : 30,
              scale: isMobile ? 1 : 0.94,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              ease: "none",
              duration: 0.42,
              immediateRender: false,
            },
            0,
          )
          .to(
            content,
            {
              y: isMobile ? -6 : -8,
              ease: "none",
              duration: 0.58,
              immediateRender: false,
            },
            0.42,
          );
      }

      appendHeadlineReveal(timeline, elements, 0.1, 0.28, motion.headlineStagger);
      if (body) {
        appendBodyReveal(timeline, body, 0.18, 0.22);
      }
      break;
    }

    case "launch": {
      if (content) {
        timeline.fromTo(
          content,
          { y: isMobile ? 16 : 22 },
          { y: 0, ease: "none", duration: 0.4, immediateRender: false },
          0,
        );
      }

      appendHeadlineReveal(timeline, elements, 0.06, 0.24, motion.headlineStagger);
      if (body) {
        appendBodyReveal(timeline, body, 0.12, 0.2);
      }
      if (cta) {
        timeline.fromTo(
          cta,
          { y: isMobile ? 12 : 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            duration: isMobile ? 0.22 : 0.26,
            immediateRender: false,
          },
          isMobile ? 0.38 : 0.52,
        );
      }
      break;
    }

    default:
      break;
  }
}
