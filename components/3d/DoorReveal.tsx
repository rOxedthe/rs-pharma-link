"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

const DOOR_W = 1.46;   // each door panel width
const DOOR_H = 3.0;
const DOOR_D = 0.07;
const HALF_W  = DOOR_W / 2;   // 0.73

/**
 * Correct pivot setup:
 *   Left  door hinge at x = -HALF_W  (left edge of left panel)
 *   Right door hinge at x = +HALF_W  (right edge of right panel)
 *
 * Each panel mesh is offset +HALF_W (left) or -HALF_W (right) from its pivot,
 * so the panel center sits at ±HALF_W in world space.
 *
 * When we rotate the pivot group:
 *   Left  pivot rotates -PI/2 → door swings backward-left  ✓
 *   Right pivot rotates +PI/2 → door swings backward-right ✓
 */
function Door({ side, triggered }: { side: "left" | "right"; triggered: boolean }) {
  const pivotRef = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const target = side === "left" ? -Math.PI / 2 : Math.PI / 2;

  useFrame((_, delta) => {
    if (!pivotRef.current) return;
    // Open on hover, close when hover ends
    const goalProgress = triggered ? 1 : 0;
    const speed = triggered ? 1.4 : 2.0; // close slightly faster than open
    progress.current = THREE.MathUtils.lerp(progress.current, goalProgress, delta * speed);
    pivotRef.current.rotation.y = target * progress.current;
  });

  // Hinge sits at the outer edge of each door
  const pivotX = side === "left" ? -HALF_W : HALF_W;
  // Panel centre is HALF_W inward from the hinge
  const meshOffsetX = side === "left" ? HALF_W : -HALF_W;
  // Handle sits on the inner edge
  const handleX = side === "left" ? HALF_W - 0.14 : -(HALF_W - 0.14);

  return (
    <group ref={pivotRef} position={[pivotX, 0, 0]}>
      {/* Door body */}
      <mesh position={[meshOffsetX, 0, 0]} castShadow>
        <boxGeometry args={[DOOR_W, DOOR_H, DOOR_D]} />
        <meshStandardMaterial color="#EDE8DF" roughness={0.18} metalness={0.0} />
      </mesh>

      {/* Top inset panel */}
      <mesh position={[meshOffsetX, 0.7, DOOR_D / 2 + 0.008]} castShadow>
        <boxGeometry args={[DOOR_W - 0.28, 0.72, 0.012]} />
        <meshStandardMaterial color="#E2DDD4" roughness={0.3} />
      </mesh>

      {/* Frosted glass centre pane */}
      <mesh position={[meshOffsetX, 0.0, DOOR_D / 2 + 0.008]}>
        <boxGeometry args={[DOOR_W - 0.28, 0.68, 0.01]} />
        <meshStandardMaterial
          color="#B8DDD8"
          roughness={0.05}
          transparent
          opacity={0.38}
        />
      </mesh>

      {/* Bottom inset panel */}
      <mesh position={[meshOffsetX, -0.72, DOOR_D / 2 + 0.008]} castShadow>
        <boxGeometry args={[DOOR_W - 0.28, 0.58, 0.012]} />
        <meshStandardMaterial color="#E2DDD4" roughness={0.3} />
      </mesh>

      {/* Thin teal stripe along hinge edge */}
      <mesh position={[side === "left" ? meshOffsetX - HALF_W + 0.02 : meshOffsetX + HALF_W - 0.02, 0, 0]}>
        <boxGeometry args={[0.04, DOOR_H, DOOR_D + 0.01]} />
        <meshStandardMaterial color="#0D3D3A" roughness={0.4} />
      </mesh>

      {/* Gold handle */}
      <mesh position={[handleX, 0.04, DOOR_D / 2 + 0.044]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.026, 0.026, 0.26, 16]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.1} metalness={0.88} />
      </mesh>

      {/* Handle backplate */}
      <mesh position={[handleX, 0.04, DOOR_D / 2 + 0.032]}>
        <boxGeometry args={[0.064, 0.2, 0.008]} />
        <meshStandardMaterial color="#A8872E" roughness={0.2} metalness={0.75} />
      </mesh>
    </group>
  );
}

function Scene({ triggered }: { triggered: boolean }) {
  return (
    <>
      <ambientLight intensity={1.6} color="#FFF8F2" />
      <directionalLight position={[3, 6, 5]} intensity={2.0} color="#FFFFFF" castShadow />
      <pointLight position={[-3, 2, 3]} intensity={1.2} color="#F4F1EB" />
      <pointLight position={[3, 1, 3]}  intensity={0.8} color="#E8C97A" />
      {/* Warm glow behind doors — brightens when open */}
      <pointLight position={[0, 0, -1.8]} intensity={triggered ? 2.8 : 0.15} color="#E8C97A" distance={5} />
      <pointLight position={[0, -2, 1]}   intensity={0.5} color="#2EC4B6" />

      {/* Door frame */}
      <mesh position={[0, 0, -0.05]} receiveShadow>
        <boxGeometry args={[3.2, DOOR_H + 0.32, 0.08]} />
        <meshStandardMaterial color="#0D3D3A" roughness={0.45} />
      </mesh>

      {/* Frame inner cutout colour */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[2.98, DOOR_H + 0.12, 0.05]} />
        <meshStandardMaterial color="#092E2B" roughness={0.6} />
      </mesh>

      {/* Warm interior plane — glows on open */}
      <mesh position={[0, 0, -1.0]}>
        <planeGeometry args={[3, DOOR_H]} />
        <meshStandardMaterial
          color="#E8C97A"
          emissive="#E8C97A"
          emissiveIntensity={triggered ? 0.28 : 0.02}
          roughness={1}
        />
      </mesh>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -DOOR_H / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#E8E3D9" roughness={1} />
      </mesh>

      <Door side="left"  triggered={triggered} />
      <Door side="right" triggered={triggered} />
    </>
  );
}

export default function DoorReveal({ triggered = false }: { triggered?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.2], fov: 46 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: false }}
      shadows
      dpr={[1, 1.5]}
      onCreated={({ gl }) => gl.setClearColor("#F4F1EB")}
    >
      <Scene triggered={triggered} />
      <Preload all />
    </Canvas>
  );
}
