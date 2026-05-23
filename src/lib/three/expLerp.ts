/** Frame-rate independent exponential smoothing (use in useFrame only). */
export function expLerpFactor(delta: number, speed: number): number {
  return 1 - Math.exp(-speed * delta);
}
