export function SceneOverlay() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(3,3,5,0.55)_0%,transparent_22%,transparent_78%,rgba(3,3,5,0.65)_100%)]"
        data-layer="overlay"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
        data-layer="grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </>
  );
}
