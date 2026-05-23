"use client";

import { useCinematicStore } from "@/store/cinematicStore";

export function ScrollProgress() {
  const scrollProgress = useCinematicStore((state) => state.scrollProgress);
  const percent = Math.round(scrollProgress * 100);

  return (
    <div
      className="pointer-events-none fixed z-20"
      role="progressbar"
      aria-label="Story scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      data-component="scroll-progress"
    >
      <div
        aria-hidden
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 sm:right-6 md:block"
      >
        <div className="h-28 w-px bg-border">
          <div
            className="w-full origin-top bg-accent transition-[height] duration-150 motion-reduce:transition-none"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 w-[min(12rem,40vw)] -translate-x-1/2 md:hidden"
      >
        <div className="h-px w-full bg-border">
          <div
            className="h-full origin-left bg-accent transition-[width] duration-150 motion-reduce:transition-none"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
