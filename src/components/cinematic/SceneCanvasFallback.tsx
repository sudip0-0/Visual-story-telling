export function SceneCanvasFallback() {
  return (
    <div
      className="absolute inset-0 bg-background"
      data-layer="canvas-fallback"
      aria-hidden
    >
      <div className="absolute inset-0 bg-background-soft opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,92,255,0.12)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_100%,rgba(0,213,255,0.06)_0%,transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_10%_60%,rgba(255,122,61,0.04)_0%,transparent_40%)]" />
    </div>
  );
}
