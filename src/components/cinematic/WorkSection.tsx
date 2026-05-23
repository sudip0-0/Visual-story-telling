import { AnimatedText } from "@/components/ui/AnimatedText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function WorkSection() {
  return (
    <section
      id="work"
      data-scroll-section=""
      aria-labelledby="work-heading"
      className="scene-section relative z-[2] border-t border-border px-6 py-24 sm:px-10 sm:py-28 md:px-16"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <SectionLabel>Work</SectionLabel>
        <div data-scene-headline className="scene-headline-mask mt-6">
          <AnimatedText
            as="h2"
            id="work-heading"
            className="scene-headline scene-headline-sm"
            splitWords={false}
          >
            Explore the work
          </AnimatedText>
        </div>
        <p className="scene-body mt-6">
          Project case files land here in a later phase — Agentic dashboards, 3D
          galleries, and more.
        </p>
      </div>
    </section>
  );
}
