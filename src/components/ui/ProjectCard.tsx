"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectDefinition } from "@/data/projects";
import { useFinePointer } from "@/lib/motion/useFinePointer";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

type ProjectCardProps = {
  project: ProjectDefinition;
  /** Alternates left/right alignment per card index. */
  align: "left" | "right";
};

/**
 * Case-file project card.
 *
 *   • Stacked, max ~720px wide; alternating left/right on md+.
 *   • Top rule line draw on scroll-in (driven by --enter via IntersectionObserver).
 *   • Scanline sweep on hover (CSS keyframe).
 *   • 3D tilt up to 6° driven by pointer position on fine pointers only.
 *   • Bracketed [ Tag ] tokens — quieter than pills.
 */
export function ProjectCard({ project, align }: ProjectCardProps) {
  const indexLabel = String(project.index).padStart(2, "0");
  const href = project.href ?? `#${project.id}`;
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLAnchorElement>(null);
  const hasFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotionPreference();
  const tiltEnabled = hasFinePointer && !prefersReducedMotion;
  const [hasEntered, setHasEntered] = useState(false);

  // Scroll-in line draw + content reveal.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (prefersReducedMotion) {
      el.style.setProperty("--enter", "1");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Animate --enter 0..1 over 700ms once hasEntered flips.
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !hasEntered) return;
    if (prefersReducedMotion) {
      el.style.setProperty("--enter", "1");
      return;
    }

    const start = performance.now();
    const duration = 700;
    let rafId: number | null = null;

    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      // Cubic ease-out.
      const eased = 1 - Math.pow(1 - t, 3);
      el.style.setProperty("--enter", eased.toFixed(3));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [hasEntered, prefersReducedMotion]);

  // 3D tilt on pointer move.
  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!tiltEnabled) return;
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    const rect = inner.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    card.style.setProperty("--tilt-x", x.toFixed(3));
    card.style.setProperty("--tilt-y", y.toFixed(3));
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0");
    card.style.setProperty("--tilt-y", "0");
  };

  return (
    <div
      className="case-row"
      data-align={align}
    >
      <article ref={cardRef} className="case-card">
        <a
          ref={innerRef}
          href={href}
          id={project.id}
          className="case-card-link"
          aria-labelledby={`project-title-${project.id}`}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onBlur={handlePointerLeave}
        >
          <div className="case-card-inner">
            <div className="case-card-content">
              <p className="case-card-meta">
                <span className="case-card-meta-dot" aria-hidden />
                <span>CASE {indexLabel}</span>
                <span className="case-card-meta-sep" aria-hidden>·</span>
                <span>{project.status}</span>
                <span className="case-card-meta-sep" aria-hidden>·</span>
                <span className="case-card-category">{project.category}</span>
              </p>

              <h3
                id={`project-title-${project.id}`}
                className="case-card-title"
              >
                {project.title}
              </h3>

              <p className="case-card-description">{project.description}</p>

              <ul className="case-card-tags" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <span className="case-card-tag">{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </a>
      </article>
    </div>
  );
}
