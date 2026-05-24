type SceneCanvasFallbackProps = {
  showWebGLUnavailable?: boolean;
};

export function SceneCanvasFallback({
  showWebGLUnavailable = false,
}: SceneCanvasFallbackProps) {
  return (
    <div
      className="absolute inset-0 bg-background"
      data-layer="canvas-fallback"
      aria-hidden
    >
      <div className="absolute inset-0 bg-background-soft opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(225,29,46,0.14)_0%,transparent_52%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_85%_105%,rgba(255,77,46,0.10)_0%,transparent_48%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_35%_at_8%_58%,rgba(255,138,61,0.06)_0%,transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,1,1,0.2)_0%,transparent_35%,rgba(5,1,1,0.4)_100%)]" />
      {showWebGLUnavailable && (
        <p className="sr-only" role="status">
          WebGL is not available. A static atmospheric background is shown instead.
        </p>
      )}
    </div>
  );
}
