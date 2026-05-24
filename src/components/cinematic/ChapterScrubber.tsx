"use client";

import { useCallback } from "react";
import { SCENES } from "@/data/scenes";
import { useCinematicStore } from "@/store/cinematicStore";
import { getLenisInstance } from "@/lib/scroll/lenisInstance";

/**
 * Vertical chapter scrubber — replaces ScrollProgress on md+ viewports.
 *
 *   • Six labelled ticks: SIGNAL → LAUNCH.
 *   • Active chapter glows with `--accent`.
 *   • Click / Enter / Space jumps to the section (Lenis if available,
 *     else native scrollIntoView). Anchor links work under reduced motion.
 *   • Hidden on small screens via the `.chapter-scrubber` media query.
 */
export function ChapterScrubber() {
  const activeSceneId = useCinematicStore((state) => state.activeSceneId);
  const scrollProgress = useCinematicStore((state) => state.scrollProgress);

  const handleJump = useCallback((sceneId: string) => {
    const target = document.getElementById(sceneId);
    if (!target) return;

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.6 });
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <nav
      aria-label="Story chapters"
      className="chapter-scrubber"
      role="navigation"
    >
      <span className="chapter-scrubber-rail" aria-hidden />
      <span
        className="chapter-scrubber-progress"
        style={{ height: `${scrollProgress * 100}%` }}
        aria-hidden
      />

      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {SCENES.map((scene) => {
          const isActive = scene.id === activeSceneId;
          const labelText = scene.label.split("/")[1]?.trim() ?? scene.label;
          return (
            <li key={scene.id}>
              <button
                type="button"
                onClick={() => handleJump(scene.id)}
                data-active={isActive ? "true" : "false"}
                aria-current={isActive ? "true" : undefined}
                className="chapter-tick"
              >
                <span className="chapter-tick-label">{labelText}</span>
                <span className="chapter-tick-dot" aria-hidden />
                <span className="sr-only">Go to {labelText}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
