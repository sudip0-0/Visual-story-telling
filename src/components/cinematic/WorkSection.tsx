import { SectionLabel } from "@/components/ui/SectionLabel";

export function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative z-[2] border-t border-border px-6 py-20 sm:px-10 md:px-16"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <SectionLabel>Work</SectionLabel>
        <h2
          id="work-heading"
          className="mt-5 text-2xl font-medium tracking-tight text-foreground md:text-3xl"
        >
          Explore the work
        </h2>
        <p className="scene-body mt-4">
          Project case files land here in a later phase — Agentic dashboards, 3D
          galleries, and more.
        </p>
      </div>
    </section>
  );
}
