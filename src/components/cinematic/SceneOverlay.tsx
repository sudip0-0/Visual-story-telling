export function SceneOverlay() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,3,5,0.55)_0%,transparent_22%,transparent_78%,rgba(3,3,5,0.65)_100%)]"
        data-layer="overlay"
      />
      <div
        aria-hidden
        className="film-grain pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        data-layer="grain"
      />
    </>
  );
}
