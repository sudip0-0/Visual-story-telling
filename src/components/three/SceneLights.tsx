"use client";

export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.22} color="#9ba3af" />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.1}
        color="#f4f7fb"
      />
      <pointLight
        position={[-3, -1, 4]}
        intensity={12}
        color="#7c5cff"
        distance={18}
        decay={2}
      />
      <pointLight
        position={[3, 2, -2]}
        intensity={6}
        color="#00d5ff"
        distance={14}
        decay={2}
      />
    </>
  );
}
