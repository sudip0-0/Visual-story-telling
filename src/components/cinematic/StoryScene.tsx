import type { SceneDefinition } from "@/data/scenes";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

type StorySceneProps = {
  scene: SceneDefinition;
};

const LAYOUT_WRAPPER: Record<SceneDefinition["layout"], string> = {
  center: "items-center justify-center text-center",
  "lower-left": "items-end justify-end pb-16 md:pb-24 text-left",
  split: "items-center justify-center",
  "upper-left": "items-start justify-start pt-16 md:pt-24 text-left",
  "center-right":
    "items-center justify-center text-center md:items-center md:justify-end md:text-right",
};

const LAYOUT_INNER: Record<SceneDefinition["layout"], string> = {
  center: "mx-auto flex max-w-4xl flex-col items-center",
  "lower-left": "flex w-full max-w-4xl flex-col",
  split: "grid w-full max-w-6xl gap-10 md:grid-cols-2 md:gap-16 md:items-end",
  "upper-left": "flex w-full max-w-4xl flex-col",
  "center-right": "flex w-full max-w-4xl flex-col md:ml-auto md:items-end",
};

const SCENE_ATMOSPHERE: Record<SceneDefinition["id"], string> = {
  signal: "scene-atmosphere-signal",
  spark: "scene-atmosphere-spark",
  chaos: "scene-atmosphere-chaos",
  structure: "scene-atmosphere-structure",
  system: "scene-atmosphere-system",
  launch: "scene-atmosphere-launch",
};

export function StoryScene({ scene }: StorySceneProps) {
  const isSplit = scene.layout === "split";
  const isLaunch = scene.id === "launch";

  const headline = (
    <h2
      id={`scene-title-${scene.id}`}
      className="scene-headline mt-5 md:mt-6"
    >
      {scene.title}
    </h2>
  );

  return (
    <section
      id={scene.id}
      data-scene={scene.id}
      data-scene-index={scene.index}
      aria-labelledby={`scene-title-${scene.id}`}
      className={`scene-section relative flex px-6 py-20 sm:px-10 md:px-16 ${LAYOUT_WRAPPER[scene.layout]} ${SCENE_ATMOSPHERE[scene.id]}`}
      style={{ minHeight: `${scene.minHeightVh}vh` }}
    >
      {scene.id === "structure" && (
        <div aria-hidden className="scene-grid-decoration pointer-events-none" />
      )}

      {scene.id === "chaos" && (
        <div aria-hidden className="scene-chaos-fragments pointer-events-none">
          <span />
          <span />
          <span />
        </div>
      )}

      <div className={`relative z-[1] w-full ${LAYOUT_INNER[scene.layout]}`}>
        {isSplit ? (
          <>
            <div className="flex flex-col text-left">
              <SectionLabel>{scene.label}</SectionLabel>
              {headline}
            </div>
            <div className="flex flex-col md:justify-end md:text-left">
              <p className="scene-body">{scene.body}</p>
            </div>
          </>
        ) : (
          <>
            <SectionLabel>{scene.label}</SectionLabel>
            {headline}
            <p
              className={`scene-body mt-6 md:mt-8 ${isLaunch ? "max-w-md" : ""}`}
            >
              {scene.body}
            </p>
            {scene.cta && (
              <div className="mt-10 md:mt-12">
                <MagneticButton href="#work">{scene.cta}</MagneticButton>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
