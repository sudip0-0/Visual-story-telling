"use client";

import dynamic from "next/dynamic";
import { SceneCanvasFallback } from "@/components/cinematic/SceneCanvasFallback";
import { SceneCanvasLoading } from "@/components/cinematic/SceneCanvasLoading";
import { useWebGLCapability } from "@/lib/three/useWebGLCapability";

const SceneCanvasWebGL = dynamic(
  () =>
    import("@/components/cinematic/SceneCanvasWebGL").then(
      (module) => module.SceneCanvasWebGL,
    ),
  {
    ssr: false,
    loading: () => <SceneCanvasLoading />,
  },
);

export function SceneCanvas() {
  const hasWebGL = useWebGLCapability();

  return (
    <div className="absolute inset-0" data-layer="canvas">
      <SceneCanvasFallback showWebGLUnavailable={!hasWebGL} />
      {hasWebGL ? <SceneCanvasWebGL /> : null}
      <p className="sr-only">
        {hasWebGL
          ? "Decorative 3D background. Story content remains available when WebGL is disabled."
          : "Static background in use because WebGL is unavailable."}
      </p>
    </div>
  );
}
