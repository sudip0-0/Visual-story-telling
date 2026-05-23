export const ORB_VERTEX_SHADER = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vViewPosition = cameraPosition - worldPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const ORB_FRAGMENT_SHADER = /* glsl */ `
uniform float uTime;
uniform float uEmissive;
uniform vec3 uColor;
uniform vec3 uAccent;

varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.4);
  float pulse = 0.94 + 0.06 * sin(uTime * 1.15);
  vec3 core = uColor * (0.28 + fresnel * 0.55);
  vec3 rim = mix(uColor, uAccent, fresnel * 0.45) * uEmissive * pulse;
  gl_FragColor = vec4(core + rim, 1.0);
}
`;
