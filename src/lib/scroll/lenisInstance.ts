import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;
const listeners = new Set<() => void>();

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

export function setLenisInstance(instance: Lenis | null): void {
  lenisInstance = instance;
  listeners.forEach((listener) => listener());
}

export function subscribeLenisInstance(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
