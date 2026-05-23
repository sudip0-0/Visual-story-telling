"use client";

import dynamic from "next/dynamic";
import { SceneCanvasFallback } from "@/components/cinematic/SceneCanvasFallback";

const SceneCanvasWebGL = dynamic(
  () =>
    import("@/components/cinematic/SceneCanvasWebGL").then(
      (module) => module.SceneCanvasWebGL,
    ),
  {
    ssr: false,
    loading: () => null,
  },
);

export function SceneCanvas() {
  return (
    <div className="absolute inset-0" data-layer="canvas">
      <SceneCanvasFallback />
      <SceneCanvasWebGL />
      <p className="sr-only">
        Decorative 3D background. Story content remains available when WebGL is
        disabled.
      </p>
    </div>
  );
}
