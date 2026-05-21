"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";

// --- Single door panel ---
function DoorPanel({
  side,
  openRef,
}: {
  side: "left" | "right";
  openRef: React.RefObject<THREE.Group | null>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const xOffset = side === "left" ? -0.75 : 0.75;
  const hingeX = side === "left" ? -1.5 : 1.5;

  useEffect(() => {
    if (openRef) (openRef as React.MutableRefObject<THREE.Group | null>).current = groupRef.current;
  }, [openRef]);

  return (
    <group ref={groupRef} position={[xOffset, 0, 0]}>
      {/* Door body */}
      <mesh>
        <boxGeometry args={[1.48, 3.2, 0.08]} />
        <meshStandardMaterial
          color="#1a3a38"
          roughness={0.25}
          metalness={0.05}
          transparent
          opacity={0.88}
        />
      </mesh>
      {/* Glass panel inset */}
      <mesh position={[0, 0.3, 0.045]}>
        <boxGeometry args={[0.9, 1.8, 0.01]} />
        <meshStandardMaterial
          color="#2EC4B6"
          roughness={0.1}
          metalness={0.0}
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Door handle */}
      <mesh position={[side === "left" ? 0.55 : -0.55, 0, 0.06]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 12]} />
        <meshStandardMaterial color="#E8C97A" roughness={0.15} metalness={0.6} />
      </mesh>
      {/* Frame edge */}
      <mesh position={[hingeX > 0 ? 0.74 : -0.74, 0, 0]}>
        <boxGeometry args={[0.04, 3.2, 0.12]} />
        <meshStandardMaterial color="#0D3D3A" roughness={0.3} />
      </mesh>
    </group>
  );
}

// --- Animated doors ---
function Doors({ triggered }: { triggered: boolean }) {
  const leftRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);
  const opened = useRef(false);

  useEffect(() => {
    if (triggered && !opened.current && leftRef.current && rightRef.current) {
      opened.current = true;
      gsap.to(leftRef.current.rotation, { y: -Math.PI / 2, duration: 1.2, ease: "power2.inOut" });
      gsap.to(rightRef.current.rotation, { y: Math.PI / 2, duration: 1.2, ease: "power2.inOut" });
    }
  }, [triggered]);

  return (
    <>
      {/* Left door — pivot at left edge */}
      <group position={[-0.75, 0, 0]}>
        <group ref={leftRef} position={[0.75, 0, 0]}>
          <DoorPanel side="left" openRef={leftRef} />
        </group>
      </group>

      {/* Right door — pivot at right edge */}
      <group position={[0.75, 0, 0]}>
        <group ref={rightRef} position={[-0.75, 0, 0]}>
          <DoorPanel side="right" openRef={rightRef} />
        </group>
      </group>

      {/* Door frame */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[3.2, 3.4, 0.06]} />
        <meshStandardMaterial color="#0D3D3A" roughness={0.4} />
      </mesh>

      {/* Warm light behind doors */}
      <pointLight
        position={[0, 0, -1.5]}
        intensity={triggered ? 2.5 : 0.1}
        color="#E8C97A"
        distance={5}
      />
      {/* Floor shadow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.65, 0]} receiveShadow>
        <planeGeometry args={[6, 4]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </>
  );
}

interface DoorRevealProps {
  triggered?: boolean;
}

export default function DoorReveal({ triggered = false }: DoorRevealProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      shadows
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 4, 4]} intensity={1.0} color="#2EC4B6" castShadow />
      <Doors triggered={triggered} />
      <Preload all />
    </Canvas>
  );
}
