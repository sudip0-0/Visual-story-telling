"use client";

import { useSyncExternalStore } from "react";
import type Lenis from "lenis";
import {
  getLenisInstance,
  subscribeLenisInstance,
} from "@/lib/scroll/lenisInstance";

export function useLenis(): Lenis | null {
  return useSyncExternalStore(
    subscribeLenisInstance,
    getLenisInstance,
    () => null,
  );
}
