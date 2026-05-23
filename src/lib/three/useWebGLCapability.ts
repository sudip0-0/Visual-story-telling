"use client";

import { useSyncExternalStore } from "react";
import { detectWebGL } from "@/lib/three/detectWebGL";

function subscribe(callback: () => void): () => void {
  window.addEventListener("load", callback);
  return () => window.removeEventListener("load", callback);
}

function getSnapshot(): boolean {
  return detectWebGL();
}

function getServerSnapshot(): boolean {
  return false;
}

export function useWebGLCapability(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
