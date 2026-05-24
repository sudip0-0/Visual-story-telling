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
  /** Structure scribe-line container (driven by --scribe). */
  structureScribes: HTMLElement | null;
  /** Spark accent rim sweep (driven by --rim). */
  sparkRim: HTMLElement | null;
  /** System reflective sweep (driven by --sweep). */
  systemSweep: HTMLElement | null;
  /** Launch CTA wrapper that hosts the underglow (driven by --underglow). */
  launchUnderglow: HTMLElement | null;
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
    structureScribes: section.querySelector<HTMLElement>(
      "[data-scene-structure-scribes]",
    ),
    sparkRim: section.querySelector<HTMLElement>("[data-scene-spark-rim]"),
    systemSweep: section.querySelector<HTMLElement>("[data-scene-system-sweep]"),
    launchUnderglow: section.querySelector<HTMLElement>(
      "[data-scene-launch-underglow]",
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
  // New pattern (Slice 2): per-line mask reveal driven by `--reveal`
  // 0..1 with translateY+blur+opacity handled in globals.css.
  // GSAP can scrub CSS custom properties directly.
  if (elements.words.length > 0) {
    timeline.fromTo(
      elements.words,
      { ["--reveal" as never]: 0 },
      {
        ["--reveal" as never]: 1,
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
      { ["--reveal" as never]: 0 },
      {
        ["--reveal" as never]: 1,
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

/**
 * Deterministic copy motion — one narrative idea per scene.
 *
 * Reveal/settle rule: each scene's headline + body finish their reveal
 * by ~70% of the scrub (`HERO_LAND`), giving the user 30% of pure
 * settled time at the bottom of each section. This avoids the
 * "things still moving while I read" failure mode.
 *
 * Per scene the choreography is documented as:
 *   • Hero — the dominant motion idea (camera, object, or copy).
 *   • Support — a secondary, scrub-driven flourish.
 *   • Ambient — a continuous mood layer (DOM CSS or CSS keyframes).
 */
const HERO_LAND = 0.7;

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
      // Hero: slow camera dolly (visualState).
      // Support: headline mask reveal + body fade-up at 120ms offset.
      // Ambient: signal-drift particle (CSS keyframe), vignette breath.
      if (content) {
        timeline
          .fromTo(
            content,
            { y: isMobile ? 28 : 40 },
            {
              y: 0,
              ease: "none",
              duration: 0.36,
              immediateRender: false,
            },
            0,
          )
          .to(
            content,
            {
              y: isMobile ? -6 : -10,
              ease: "none",
              duration: 0.34,
              immediateRender: false,
            },
            HERO_LAND,
          );
      }

      appendHeadlineReveal(timeline, elements, 0.1, 0.32, motion.headlineStagger);
      if (body) {
        appendBodyReveal(timeline, body, 0.26, 0.28);
      }
      break;
    }

    case "spark": {
      // Hero: orb accretion (visualState scale + emissive ramp).
      // Support: accent rim sweep (--rim 0..1 across the right edge).
      // Ambient: lower-left atmosphere glow (already in CSS).
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
              duration: 0.36,
              immediateRender: false,
            },
            0,
          );

        if (!isMobile) {
          timeline.to(
            content,
            {
              y: -10,
              ease: "none",
              duration: 0.3,
              immediateRender: false,
            },
            HERO_LAND,
          );
        }
      }

      if (elements.sparkRim) {
        timeline.fromTo(
          elements.sparkRim,
          { ["--rim" as never]: 0 },
          {
            ["--rim" as never]: 1,
            ease: "none",
            duration: HERO_LAND,
            immediateRender: false,
          },
          0,
        );
      }

      appendHeadlineReveal(timeline, elements, 0.06, 0.28, motion.headlineStagger);
      if (body) {
        appendBodyReveal(timeline, body, 0.18, 0.24);
      }
      break;
    }

    case "chaos": {
      // Hero: shards explode outward (visualState fragmentSpread + coreWarp).
      // Support: DOM fragment drift + body parallax via scroll velocity.
      // Ambient: animated grain / scene atmosphere overlay.
      if (content) {
        appendContentDrift(
          timeline,
          content,
          isMobile ? 32 : 44,
          isMobile ? -24 : -44,
          0.34,
          0.66,
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
            duration: 0.32,
            immediateRender: false,
          },
          0.18,
        );
        timeline.to(
          elements.chaosFragments,
          {
            y: isMobile ? -12 : -24,
            opacity: 0.35,
            ease: "none",
            duration: 0.4,
            immediateRender: false,
          },
          HERO_LAND - 0.08,
        );
      }

      appendHeadlineReveal(timeline, elements, 0.06, 0.24, motion.headlineStagger);
      if (body) {
        appendBodyReveal(timeline, body, 0.14, 0.22);
      }
      break;
    }

    case "structure": {
      // Hero: fragments snap onto a grid (visualState fragmentSpread → 0).
      // Support: scribe lines draw across (--scribe 0..1) +
      //          structure ring (3D) materialises.
      // Ambient: scene-grid-decoration brightens to ~0.18.
      if (elements.grid) {
        timeline.fromTo(
          elements.grid,
          { opacity: 0 },
          {
            opacity: isMobile ? 0.35 : 0.55,
            ease: "none",
            duration: 0.4,
            immediateRender: false,
          },
          0.05,
        );
      }

      if (elements.structureScribes) {
        timeline.fromTo(
          elements.structureScribes,
          { ["--scribe" as never]: 0 },
          {
            ["--scribe" as never]: 1,
            ease: "none",
            duration: HERO_LAND,
            immediateRender: false,
          },
          0.04,
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
          );
      }

      appendHeadlineReveal(
        timeline,
        elements,
        0.08,
        0.22,
        motion.headlineStagger * 0.85,
      );
      if (body) {
        appendBodyReveal(timeline, body, 0.16, 0.2);
      }
      break;
    }

    case "system": {
      // Hero: object becomes composed (visualState polish + torus reveal).
      // Support: reflective sweep across the section (--sweep 0..1).
      // Ambient: scene-atmosphere-system radial glow.
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
              duration: 0.3,
              immediateRender: false,
            },
            HERO_LAND,
          );
      }

      if (elements.systemSweep) {
        timeline.fromTo(
          elements.systemSweep,
          { ["--sweep" as never]: 0 },
          {
            ["--sweep" as never]: 1,
            ease: "none",
            duration: HERO_LAND,
            immediateRender: false,
          },
          0.05,
        );
      }

      appendHeadlineReveal(timeline, elements, 0.1, 0.28, motion.headlineStagger);
      if (body) {
        appendBodyReveal(timeline, body, 0.2, 0.24);
      }
      break;
    }

    case "launch": {
      // Hero: camera pulls back (visualState).
      // Support: CTA underglow line draws beneath the button (--underglow).
      // Ambient: particles still then drift slow (visualState particleDrift).
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
        appendBodyReveal(timeline, body, 0.14, 0.22);
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
          isMobile ? 0.32 : 0.44,
        );
      }
      if (elements.launchUnderglow) {
        timeline.fromTo(
          elements.launchUnderglow,
          { ["--underglow" as never]: 0 },
          {
            ["--underglow" as never]: 1,
            ease: "none",
            duration: 0.32,
            immediateRender: false,
          },
          isMobile ? 0.4 : 0.55,
        );
      }
      break;
    }

    default:
      break;
  }
}
