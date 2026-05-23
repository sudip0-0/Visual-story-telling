"use client";

import { useRef, useState } from "react";
import { useFinePointer } from "@/lib/motion/useFinePointer";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotionPreference";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export function MagneticButton({
  children,
  href = "#",
  className = "",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const hasFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotionPreference();
  const magneticEnabled = hasFinePointer && !prefersReducedMotion;

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magneticEnabled || !buttonRef.current) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setOffset({
      x: (event.clientX - centerX) * 0.18,
      y: (event.clientY - centerY) * 0.18,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
      style={
        magneticEnabled
          ? { transform: `translate(${offset.x}px, ${offset.y}px)` }
          : undefined
      }
      className={`magnetic-button group relative inline-flex min-h-11 min-w-[11rem] items-center justify-center overflow-hidden rounded-full border border-border bg-surface/40 px-8 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-[border-color,color,box-shadow,transform] duration-300 ease-out outline-none hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`.trim()}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(124,92,255,0.2)_0%,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden
      />
      <span className="relative z-[1]">{children}</span>
    </a>
  );
}
