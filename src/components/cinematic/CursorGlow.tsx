"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/lib/motion/useFinePointer";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

export function CursorGlow() {
  const hasFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotionPreference();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      setIsVisible(true);

      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = requestAnimationFrame(function updateGlow() {
        setPosition((current) => {
          const nextX = current.x + (targetRef.current.x - current.x) * 0.12;
          const nextY = current.y + (targetRef.current.y - current.y) * 0.12;
          return { x: nextX, y: nextY };
        });
        frameRef.current = requestAnimationFrame(updateGlow);
      });
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
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
