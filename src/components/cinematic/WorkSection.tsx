"use client";

import { useEffect, useRef } from "react";
import { PROJECTS } from "@/data/projects";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

export function WorkSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  // Work headline lives outside the per-scene ScrollTrigger pipeline,
  // so we trigger its `--reveal` 0..1 via an IntersectionObserver.
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const inner = el.querySelector<HTMLElement>(".headline-line-inner");
    if (!inner) return;

    if (prefersReducedMotion) {
      inner.style.setProperty("--reveal", "1");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const start = performance.now();
            const duration = 800;
            let rafId: number | null = null;
            const tick = () => {
              const t = Math.min(1, (performance.now() - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              inner.style.setProperty("--reveal", eased.toFixed(3));
              if (t < 1) rafId = requestAnimationFrame(tick);
            };
            rafId = requestAnimationFrame(tick);
            observer.disconnect();
            return () => {
              if (rafId !== null) cancelAnimationFrame(rafId);
            };
          }
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      id="work"
      data-scroll-section=""
      aria-labelledby="work-heading"
      className="scene-section relative z-[2] border-t border-border px-6 py-24 sm:px-10 sm:py-28 md:px-16 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionLabel>Case Files</SectionLabel>
          <div ref={headlineRef} className="scene-headline-mask mt-6">
            <AnimatedText
              as="h2"
              id="work-heading"
              className="scene-headline scene-headline-sm"
            >
              The system, in pieces.
            </AnimatedText>
          </div>
          <p className="scene-body mt-6 max-w-xl">
            Interfaces, immersive spaces, and tools built with the same
            signal-to-structure discipline. Each case below is one shape the
            system has taken.
          </p>
        </div>

        <div className="case-stack mt-16 sm:mt-20 md:mt-24">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              align={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
