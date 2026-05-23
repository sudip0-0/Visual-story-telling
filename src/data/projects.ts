export type ProjectDefinition = {
  id: string;
  index: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  status: string;
  /** Placeholder or external URL; defaults to `#${id}` in ProjectCard. */
  href?: string;
};

export const PROJECTS: ProjectDefinition[] = [
  {
    id: "agentic-dashboard",
    index: 1,
    title: "Agentic Coding Dashboard",
    category: "AI Product Interface",
    description:
      "A live command surface for agent workflows, traces, and human-in-the-loop review.",
    tags: ["Next.js", "TypeScript", "Realtime UI", "Agents"],
    status: "2025 · Concept",
  },
  {
    id: "gallery-3d",
    index: 2,
    title: "3D Gallery Experience",
    category: "Immersive Web",
    description:
      "Scroll-driven exhibition space where art pieces float, breathe, and respond to the viewer.",
    tags: ["R3F", "GSAP", "WebGL", "Shaders"],
    status: "2025 · Prototype",
  },
  {
    id: "trustdoko",
    index: 3,
    title: "TrustDoko Review Platform",
    category: "Trust & Reviews",
    description:
      "Structured review flows and reputation signals designed for clarity, not noise.",
    tags: ["React", "Node", "Postgres", "Design System"],
    status: "2024 · Shipped",
  },
  {
    id: "git-graph",
    index: 4,
    title: "Visual Git Commit Graph",
    category: "Developer Tools",
    description:
      "A cinematic timeline of branches and commits that makes repository history legible at a glance.",
    tags: ["D3", "TypeScript", "Canvas", "Git"],
    status: "2024 · Open Source",
  },
];
