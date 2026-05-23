"use client";

import { useSyncExternalStore } from "react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(callback: () => void): () => void {
  const mediaQuery = window.matchMedia(FINE_POINTER_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/** True when the device supports precise hover (typically desktop). */
export function usePointerDevice(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
