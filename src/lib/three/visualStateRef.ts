import { INITIAL_VISUAL_STATE } from "@/lib/scroll/storyVisualKeyframes";
import type { VisualState } from "@/store/cinematicStore";

let visualState: VisualState = { ...INITIAL_VISUAL_STATE };

export function getVisualState(): VisualState {
  return visualState;
}

export function setVisualStateRef(next: VisualState): void {
  visualState = next;
}

/** Updates global scroll progress without disturbing scene-scrubbed fields. */
export function setStoryScrollProgress(progress: number): void {
  visualState = {
    ...visualState,
    storyProgress: Math.min(1, Math.max(0, progress)),
  };
}

/**
 * Smoothed scroll velocity in normalised units per second.
 * Clamped to [-3, 3]; consumers should treat the magnitude as
 * a 0..1-ish intensity for blur/parallax/particle drift bursts.
 */
export function setScrollVelocity(velocity: number): void {
  const clamped = Math.max(-3, Math.min(3, velocity));
  visualState = {
    ...visualState,
    scrollVelocity: clamped,
  };
}

export function resetVisualStateRef(): void {
  visualState = { ...INITIAL_VISUAL_STATE };
}
