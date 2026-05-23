"use client";

import { useEffect } from "react";
import { useCinematicStore } from "@/store/cinematicStore";

export function ScrollProgress() {
  const scrollProgress = useCinematicStore((state) => state.scrollProgress);
  const setScrollProgress = useCinematicStore((state) => state.setScrollProgress);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      setScrollProgress(window.scrollY / scrollHeight);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [setScrollProgress]);

  const percent = Math.round(scrollProgress * 100);

  return (
    <>
      <div
        className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 sm:right-6 md:block"
        data-component="scroll-progress"
        aria-hidden
      >
        <div className="h-28 w-px bg-border">
          <div
            className="w-full origin-top bg-accent"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      <div
        className="fixed bottom-6 left-1/2 z-20 w-[min(12rem,40vw)] -translate-x-1/2 md:hidden"
        aria-hidden
      >
        <div className="h-px w-full bg-border">
          <div
            className="h-full origin-left bg-accent"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Scroll progress {percent} percent
      </p>
    </>
  );
}
