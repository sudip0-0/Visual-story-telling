import gsap from "gsap";

/** Reset scene copy to a readable static state (reduced motion / teardown). */
export function setContentVisible(scope: Element): void {
  const contents = scope.querySelectorAll<HTMLElement>("[data-scene-content]");
  contents.forEach((content) => {
    gsap.set(content, { y: 0, clearProps: "transform" });
  });

  const headlines = scope.querySelectorAll<HTMLElement>("[data-scene-headline]");
  headlines.forEach((headline) => {
    gsap.set(headline, { ["--reveal" as never]: 1, clearProps: "transform" });
  });

  const bodies = scope.querySelectorAll<HTMLElement>("[data-scene-body]");
  bodies.forEach((body) => {
    gsap.set(body, { opacity: 1, y: 0, clearProps: "transform,opacity" });
  });

  const words = scope.querySelectorAll<HTMLElement>(".animated-text-word-inner");
  words.forEach((word) => {
    gsap.set(word, { ["--reveal" as never]: 1, clearProps: "transform,opacity" });
  });

  const ctas = scope.querySelectorAll<HTMLElement>("[data-scene-cta]");
  ctas.forEach((cta) => {
    gsap.set(cta, { opacity: 1, y: 0, clearProps: "transform,opacity" });
  });

  scope.querySelectorAll<HTMLElement>(".scene-grid-decoration").forEach((grid) => {
    gsap.set(grid, { opacity: 0.5, clearProps: "opacity" });
  });

  scope.querySelectorAll<HTMLElement>(".scene-chaos-fragments span").forEach((span) => {
    gsap.set(span, { clearProps: "transform,opacity" });
  });
}

function setSectionCopyVisible(section: HTMLElement): void {
  const headline = section.querySelector<HTMLElement>("[data-scene-headline]");
  const words = headline?.querySelectorAll<HTMLElement>(
    ".animated-text-word-inner",
  );

  if (words && words.length > 0) {
    gsap.set(words, { ["--reveal" as never]: 1 });
  } else if (headline) {
    gsap.set(headline, { ["--reveal" as never]: 1 });
  }

  const body = section.querySelector<HTMLElement>("[data-scene-body]");
  if (body) {
    gsap.set(body, { y: 0, opacity: 1 });
  }

  const cta = section.querySelector<HTMLElement>("[data-scene-cta]");
  if (cta) {
    gsap.set(cta, { y: 0, opacity: 1 });
  }
}

/** Keep in-view text readable before scroll-driven reveal windows activate. */
export function syncPreTriggerTextVisible(scope: Element): void {
  const revealLine = window.innerHeight * 0.82;

  scope.querySelectorAll<HTMLElement>("[data-scene]").forEach((section) => {
    const { top, bottom } = section.getBoundingClientRect();

    if (bottom <= 0 || top >= window.innerHeight) {
      return;
    }

    if (top > revealLine) {
      return;
    }

    setSectionCopyVisible(section);
  });

  const firstScene = scope.querySelector<HTMLElement>('[data-scene="signal"]');
  if (firstScene) {
    const { top, bottom } = firstScene.getBoundingClientRect();
    if (bottom > 0 && top < window.innerHeight * 0.5) {
      setSectionCopyVisible(firstScene);
    }
  }
}
