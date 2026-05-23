export const ATMOSPHERE_VERTEX_SHADER = /* glsl */ `
varying vec3 vWorldPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const ATMOSPHERE_FRAGMENT_SHADER = /* glsl */ `
uniform float uTime;
uniform vec3 uAccent;
uniform vec3 uAccent2;
uniform float uAnimate;

varying vec3 vWorldPosition;

void main() {
  vec3 dir = normalize(vWorldPosition);
  float height = dir.y * 0.5 + 0.5;
  float drift = sin(uTime * 0.12 + dir.x * 2.0) * 0.02 * uAnimate;

  vec3 voidColor = vec3(0.012, 0.012, 0.02);
  vec3 topGlow = uAccent * (0.1 + height * 0.14 + drift);
  vec3 bottomGlow = uAccent2 * (0.06 * (1.0 - height) + drift * 0.5);

  vec3 color = voidColor + topGlow + bottomGlow;
  gl_FragColor = vec4(color, 1.0);
}
`;
