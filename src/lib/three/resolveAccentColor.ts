import { Color } from "three";

const DEEP_RED = new Color("#8b0d18");
const CRIMSON = new Color("#e11d2e");
const EMBER = new Color("#ff4d2e");

const MIX_A = new Color();

/** Maps scroll visual accentMix (0-1) to a single accent for materials. */
export function resolveAccentColor(accentMix: number, target: Color): Color {
  const t = Math.min(1, Math.max(0, accentMix));

  if (t <= 0.5) {
    return target.copy(DEEP_RED).lerp(CRIMSON, t / 0.5);
  }

  return target.copy(CRIMSON).lerp(EMBER, (t - 0.5) / 0.5);
}

export function resolveSecondaryAccent(accentMix: number, target: Color): Color {
  resolveAccentColor(accentMix, MIX_A);
  return target.copy(MIX_A).lerp(EMBER, Math.min(1, accentMix * 1.1));
}
