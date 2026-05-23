import { Color } from "three";

const VIOLET = new Color("#7c5cff");
const CYAN = new Color("#00d5ff");
const WARM = new Color("#ff7a3d");

const MIX_A = new Color();

/** Maps scroll visual accentMix (0–1) to a single accent for materials. */
export function resolveAccentColor(accentMix: number, target: Color): Color {
  const t = Math.min(1, Math.max(0, accentMix));

  if (t <= 0.5) {
    return target.copy(VIOLET).lerp(WARM, t / 0.5);
  }

  return target.copy(WARM).lerp(CYAN, (t - 0.5) / 0.5);
}

export function resolveSecondaryAccent(accentMix: number, target: Color): Color {
  resolveAccentColor(accentMix, MIX_A);
  return target.copy(MIX_A).lerp(CYAN, Math.min(1, accentMix * 1.1));
}
