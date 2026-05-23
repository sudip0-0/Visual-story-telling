"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsap } from "@/lib/gsap/registerGsap";

type GsapScope = gsap.Context;

export function useGsapContext(): React.RefObject<HTMLDivElement | null> {
  const scopeRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<GsapScope | null>(null);

  useEffect(() => {
    registerGsap();

    if (!scopeRef.current) {
      return;
    }

    contextRef.current = gsap.context(() => {}, scopeRef);

    return () => {
      contextRef.current?.revert();
      contextRef.current = null;
    };
  }, []);

  return scopeRef;
}
