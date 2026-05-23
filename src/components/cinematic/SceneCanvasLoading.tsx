export function SceneCanvasLoading() {
  return (
    <div
      className="canvas-loading pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
      aria-hidden
      data-layer="canvas-loading"
    >
      <div className="canvas-loading-pulse h-2 w-2 rounded-full bg-accent/60" />
    </div>
  );
}
