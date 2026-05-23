import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Kill ScrollTriggers to avoid duplicates during HMR or re-init. */
export function killScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  if (typeof ScrollTrigger.clearScrollMemory === "function") {
    ScrollTrigger.clearScrollMemory();
  }
}
