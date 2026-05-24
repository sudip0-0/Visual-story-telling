"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

/**
 * 600–900ms intro overlay — Slice: Signal.
 *
 * Black void → faint signal pulse → fades out and removes itself.
 * No spinner, no copy. Locks scroll for the duration of the beat or
 * until the user attempts to scroll, whichever is first.
 *
 * Skipped entirely under prefers-reduced-motion (returns null directly,
 * so React never schedules the mount-then-dismiss cascade that the
 * `react-hooks/set-state-in-effect` rule guards against).
 */
export function IntroBeat() {
  const prefersReducedMotion = useReducedMotionPreference();
  const [dismissed, setDismissed] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    let removeListeners: (() => void) | null = null;
    const finalise = () => {
      html.style.overflow = previousOverflow;
      // Wait for the CSS opacity transition (driven by the keyframes)
      // to complete before dismissing, so the body never flashes through.
      window.setTimeout(() => setDismissed(true), 200);
      removeListeners?.();
      removeListeners = null;
    };

    // Total animation duration ≈ 720ms pulse + 800ms overlay-out + 520ms delay.
    const completionTimeout = window.setTimeout(finalise, 1400);

    // Honour user attempts to scroll/touch — exit early.
    const earlyExit = () => {
      window.clearTimeout(completionTimeout);
      finalise();
    };

    const events: Array<keyof WindowEventMap> = [
      "wheel",
      "touchstart",
      "keydown",
    ];
    events.forEach((evt) => {
      window.addEventListener(evt, earlyExit, {
        passive: true,
        once: true,
      } as AddEventListenerOptions);
    });

    removeListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, earlyExit);
      });
    };

    return () => {
      window.clearTimeout(completionTimeout);
      removeListeners?.();
      html.style.overflow = previousOverflow;
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || dismissed) {
    return null;
  }

  return <div ref={overlayRef} aria-hidden className="intro-overlay" />;
}
