"use client";

import { useEffect, useState } from "react";
import { useFinePointer } from "@/lib/motion/useFinePointer";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

export function CursorGlow() {
  const hasFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotionPreference();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [hasFinePointer, prefersReducedMotion]);

  if (!hasFinePointer || prefersReducedMotion) {
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
      <div className="h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.14)_0%,rgba(0,213,255,0.06)_45%,transparent_70%)] blur-2xl" />
    </div>
  );
}
