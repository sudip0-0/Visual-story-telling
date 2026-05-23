import { PROJECTS } from "@/data/projects";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function WorkSection() {
  return (
    <section
      id="work"
      data-scroll-section=""
      aria-labelledby="work-heading"
      className="scene-section relative z-[2] border-t border-border px-6 py-24 sm:px-10 sm:py-28 md:px-16 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
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
          <p className="scene-body mt-6 max-w-xl">
            Case files from the system — interfaces, immersive spaces, and tools
            built with the same signal-to-structure discipline.
          </p>
        </div>

        <ul
          className="project-grid mt-14 list-none p-0 sm:mt-16 md:mt-20"
          role="list"
        >
          {PROJECTS.map((project) => (
            <li key={project.id} className="min-w-0">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
