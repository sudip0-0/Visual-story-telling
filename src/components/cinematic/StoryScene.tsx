import type { SceneDefinition } from "@/data/scenes";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

type StorySceneProps = {
  scene: SceneDefinition;
};

const LAYOUT_WRAPPER: Record<SceneDefinition["layout"], string> = {
  center: "items-center justify-center text-center",
  "lower-left": "items-end justify-end pb-20 md:pb-28 text-left",
  split: "items-center justify-center",
  "upper-left": "items-start justify-start pt-20 md:pt-28 text-left",
  "center-right":
    "items-center justify-center text-center md:items-center md:justify-end md:text-right",
};

const LAYOUT_INNER: Record<SceneDefinition["layout"], string> = {
  center: "mx-auto flex max-w-4xl flex-col items-center",
  "lower-left": "flex w-full max-w-4xl flex-col",
  split: "grid w-full max-w-6xl gap-12 md:grid-cols-2 md:gap-20 md:items-end",
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

function getSceneLabelName(label: string): string {
  const parts = label.split("/").map((part) => part.trim());
  return parts[1] ?? label;
}

export function StoryScene({ scene }: StorySceneProps) {
  const isSplit = scene.layout === "split";
  const isLaunch = scene.id === "launch";
  const sceneLabelName = getSceneLabelName(scene.label);

  const headline = (
    <div data-scene-headline className="scene-headline-mask">
      <AnimatedText
        as="h2"
        id={`scene-title-${scene.id}`}
        className="scene-headline mt-6 md:mt-8"
      >
        {scene.title}
      </AnimatedText>
    </div>
  );

  return (
    <section
      id={scene.id}
      data-scene={scene.id}
      data-scene-index={scene.index}
      data-scroll-section=""
      aria-labelledby={`scene-title-${scene.id}`}
      className={`scene-section relative flex px-6 py-24 sm:px-10 sm:py-28 md:px-16 md:py-32 ${LAYOUT_WRAPPER[scene.layout]} ${SCENE_ATMOSPHERE[scene.id]}`}
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

      <div
        data-scene-content
        className={`scene-content relative z-[1] w-full ${LAYOUT_INNER[scene.layout]}`}
      >
        {isSplit ? (
          <>
            <div className="flex flex-col text-left">
              <SectionLabel sceneIndex={scene.index}>{sceneLabelName}</SectionLabel>
              {headline}
            </div>
            <div className="flex flex-col md:justify-end md:text-left">
              <p data-scene-body className="scene-body">
                {scene.body}
              </p>
            </div>
          </>
        ) : (
          <>
            {scene.id === "signal" && (
              <h1 className="scene-site-title">Signal to System</h1>
            )}
            <SectionLabel sceneIndex={scene.index}>{sceneLabelName}</SectionLabel>
            {headline}
            <p
              data-scene-body
              className={`scene-body mt-7 md:mt-9 ${isLaunch ? "max-w-md" : ""}`}
            >
              {scene.body}
            </p>
            {scene.cta && (
              <div className="mt-12 md:mt-14" data-scene-cta>
                <MagneticButton href="#work">{scene.cta}</MagneticButton>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
