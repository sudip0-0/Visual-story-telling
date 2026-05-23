export type SceneId =
  | "signal"
  | "spark"
  | "chaos"
  | "structure"
  | "system"
  | "launch";

export type SceneLayout =
  | "center"
  | "lower-left"
  | "split"
  | "upper-left"
  | "center-right";

export type SceneDefinition = {
  id: SceneId;
  index: number;
  label: string;
  title: string;
  body: string;
  minHeightVh: number;
  layout: SceneLayout;
  cta?: string;
};

export const SCENES: SceneDefinition[] = [
  {
    id: "signal",
    index: 1,
    label: "01 / SIGNAL",
    title: "Every product begins as a signal.",
    body: "A small pulse in the dark. A thought before form. A direction waiting to be discovered.",
    minHeightVh: 120,
    layout: "center",
  },
  {
    id: "spark",
    index: 2,
    label: "02 / SPARK",
    title: "The signal becomes a spark.",
    body: "Energy gathers around the idea. Motion begins. The invisible starts asking to be built.",
    minHeightVh: 140,
    layout: "lower-left",
  },
  {
    id: "chaos",
    index: 3,
    label: "03 / CHAOS",
    title: "Then comes the chaos.",
    body: "Notes, sketches, code, doubt, experiments, broken flows, and half-shaped systems collide.",
    minHeightVh: 220,
    layout: "split",
  },
  {
    id: "structure",
    index: 4,
    label: "04 / STRUCTURE",
    title: "Structure turns noise into product.",
    body: "Patterns appear. Pieces align. Decisions become interfaces. Motion becomes meaning.",
    minHeightVh: 180,
    layout: "upper-left",
  },
  {
    id: "system",
    index: 5,
    label: "05 / SYSTEM",
    title: "The product finds its shape.",
    body: "What began as a spark becomes a system people can see, use, and remember.",
    minHeightVh: 160,
    layout: "center-right",
  },
  {
    id: "launch",
    index: 6,
    label: "06 / LAUNCH",
    title: "Build what people remember.",
    body: "Start the next scene.",
    minHeightVh: 120,
    layout: "center",
    cta: "Explore the work",
  },
];
