"use client";

import { useEffect } from "react";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

type ReducedMotionProviderProps = {
  children: React.ReactNode;
};

/** Syncs `data-reduced-motion` on `<html>` for global CSS hooks. */
export function ReducedMotionProvider({ children }: ReducedMotionProviderProps) {
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    document.documentElement.toggleAttribute(
      "data-reduced-motion",
      prefersReducedMotion,
    );

    return () => {
      document.documentElement.removeAttribute("data-reduced-motion");
    };
  }, [prefersReducedMotion]);

  return children;
}
