import type { ProjectDefinition } from "@/data/projects";

type ProjectCardProps = {
  project: ProjectDefinition;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const indexLabel = String(project.index).padStart(2, "0");
  const href = project.href ?? `#${project.id}`;

  return (
    <a
      href={href}
      id={project.id}
      className="project-card-link group relative block h-full no-underline outline-none"
      aria-labelledby={`project-title-${project.id}`}
    >
      <article className="project-card relative flex h-full flex-col">
        <div className="project-card-inner flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="project-card-index" aria-hidden>
                {indexLabel}
              </span>
              <span className="project-card-line" aria-hidden />
              <span className="project-card-category">{project.category}</span>
            </div>
            <span className="project-card-status">{project.status}</span>
          </div>

          <h3
            id={`project-title-${project.id}`}
            className="project-card-title mt-5"
          >
            {project.title}
          </h3>

          <p className="project-card-description mt-3">{project.description}</p>

          <ul
            className="project-card-tags mt-6 flex flex-wrap gap-2"
            aria-label="Technologies"
          >
            {project.tags.map((tag) => (
              <li key={tag}>
                <span className="project-card-tag">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </a>
  );
}
