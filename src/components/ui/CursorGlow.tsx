"use client";

import { useEffect, useState } from "react";
import { usePointerDevice } from "@/lib/motion/usePointerDevice";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

export function CursorGlow() {
  const canUseCursorGlow = usePointerDevice();
  const prefersReducedMotion = useReducedMotionPreference();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const isEnabled = canUseCursorGlow && !prefersReducedMotion;

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[5] mix-blend-screen transition-opacity duration-500"
      style={{
        left: position.x,
        top: position.y,
        opacity: isVisible ? 1 : 0,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.2)_0%,rgba(0,213,255,0.06)_40%,transparent_72%)] blur-2xl" />
    </div>
  );
}
