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

export function resetVisualStateRef(): void {
  visualState = { ...INITIAL_VISUAL_STATE };
}
