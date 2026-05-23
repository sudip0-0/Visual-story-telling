"use client";

import dynamic from "next/dynamic";

const CursorGlow = dynamic(
  () =>
    import("@/components/cinematic/CursorGlow").then(
      (module) => module.CursorGlow,
    ),
  { ssr: false },
);

export function CursorGlowLazy() {
  return <CursorGlow />;
}
