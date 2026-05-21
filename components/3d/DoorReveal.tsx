"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

// Single door panel with its own pivot group
function Door({
  side,
  triggered,
}: {
  side: "left" | "right";
  triggered: boolean;
}) {
  const pivotRef = useRef<THREE.Group>(null);
  const opened = useRef(false);
  const angle = useRef(0);
  const targetAngle = side === "left" ? -Math.PI / 2 : Math.PI / 2;

  useFrame((_, delta) => {
    if (!pivotRef.current) return;
    if (triggered && !opened.current) {
      angle.current = THREE.MathUtils.lerp(angle.current, targetAngle, delta * 1.6);
      pivotRef.current.rotation.y = angle.current;
      if (Math.abs(angle.current - targetAngle) < 0.005) opened.current = true;
    }
  });

  // Door panel offset so it pivots on its hinge edge
  const panelX = side === "left" ? 0.74 : -0.74;

  return (
    // Pivot point sits at the hinge edge
    <group ref={pivotRef} position={[side === "left" ? -0.76 : 0.76, 0, 0]}>
      <group position={[panelX, 0, 0]}>

        {/* Main door body — warm cream/frosted white */}
        <mesh castShadow>
          <boxGeometry args={[1.48, 3.0, 0.07]} />
          <meshStandardMaterial
            color="#EDE8DF"
            roughness={0.18}
            metalness={0.0}
          />
        </mesh>

        {/* Inset panel top */}
        <mesh position={[0, 0.65, 0.04]} castShadow>
          <boxGeometry args={[0.88, 0.8, 0.015]} />
          <meshStandardMaterial color="#E0DAD0" roughness={0.25} metalness={0.0} />
        </mesh>

        {/* Inset panel bottom */}
        <mesh position={[0, -0.55, 0.04]} castShadow>
          <boxGeometry args={[0.88, 0.6, 0.015]} />
          <meshStandardMaterial color="#E0DAD0" roughness={0.25} metalness={0.0} />
        </mesh>

        {/* Frosted glass centre */}
        <mesh position={[0, 0.1, 0.04]}>
          <boxGeometry args={[0.88, 0.72, 0.012]} />
          <meshStandardMaterial
            color="#B8DDD8"
            roughness={0.05}
            metalness={0.0}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Teal border stripe along inner edge */}
        <mesh position={[side === "left" ? 0.7 : -0.7, 0, 0]}>
          <boxGeometry args={[0.04, 3.0, 0.09]} />
          <meshStandardMaterial color="#0D3D3A" roughness={0.3} />
        </mesh>

        {/* Gold door handle */}
        <mesh
          position={[side === "left" ? 0.52 : -0.52, 0.05, 0.07]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.028, 0.028, 0.28, 16]} />
          <meshStandardMaterial color="#C9A84C" roughness={0.12} metalness={0.85} />
        </mesh>

        {/* Handle backplate */}
        <mesh position={[side === "left" ? 0.52 : -0.52, 0.05, 0.055]}>
          <boxGeometry args={[0.07, 0.22, 0.01]} />
          <meshStandardMaterial color="#B8963E" roughness={0.2} metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ triggered }: { triggered: boolean }) {
  return (
    <>
      {/* Strong ambient — makes everything visible */}
      <ambientLight intensity={1.4} color="#FFF8F0" />

      {/* Key light from front-top */}
      <directionalLight
        position={[2, 5, 4]}
        intensity={1.8}
        color="#FFFFFF"
        castShadow
      />

      {/* Fill light from left */}
      <pointLight position={[-3, 2, 2]} intensity={1.0} color="#F4F1EB" />

      {/* Warm accent from behind doors (glows stronger when open) */}
      <pointLight
        position={[0, 0, -2]}
        intensity={triggered ? 2.2 : 0.3}
        color="#E8C97A"
        distance={6}
      />

      {/* Teal rim from below */}
      <pointLight position={[0, -3, 1]} intensity={0.6} color="#2EC4B6" />

      {/* Door frame — deep teal */}
      <mesh position={[0, 0, -0.06]} receiveShadow>
        <boxGeometry args={[3.3, 3.4, 0.06]} />
        <meshStandardMaterial color="#0D3D3A" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Frame inner reveal */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[3.08, 3.18, 0.04]} />
        <meshStandardMaterial color="#0A2E2B" roughness={0.6} />
      </mesh>

      {/* Warm interior glow plane (only visible when doors open) */}
      <mesh position={[0, 0, -0.9]}>
        <planeGeometry args={[3, 3.2]} />
        <meshStandardMaterial
          color="#E8C97A"
          emissive="#E8C97A"
          emissiveIntensity={triggered ? 0.25 : 0.02}
          roughness={1}
        />
      </mesh>

      {/* Shadow receiving floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#E8E3D9" roughness={1} />
      </mesh>

      <Door side="left"  triggered={triggered} />
      <Door side="right" triggered={triggered} />
    </>
  );
}

interface DoorRevealProps {
  triggered?: boolean;
}

export default function DoorReveal({ triggered = false }: DoorRevealProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 5.5], fov: 44 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: false }}
      shadows
      dpr={[1, 1.5]}
      onCreated={({ gl }) => {
        gl.setClearColor("#F4F1EB");
      }}
    >
      <Scene triggered={triggered} />
      <Preload all />
    </Canvas>
  );
}
