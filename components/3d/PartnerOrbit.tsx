"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";
import * as THREE from "three";

const PARTNERS = [
  "Sun Pharma", "Cipla Nepal", "Nimbus Health", "AlphaRx", "ZenMed", "PharmaCo"
];

function OrbitCard({
  index,
  total,
  label,
  groupRotation,
}: {
  index: number;
  total: number;
  label: string;
  groupRotation: React.RefObject<number>;
}) {
  const angle = (index / total) * Math.PI * 2;
  const radius = 2.4;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    // Always face the camera
    ref.current.rotation.y = -(groupRotation.current ?? 0);
  });

  return (
    <group position={[x, 0, z]}>
      <mesh ref={ref}>
        <planeGeometry args={[0.9, 0.45]} />
        <meshStandardMaterial
          color="#0D3D3A"
          roughness={0.3}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Html center distanceFactor={5} style={{ pointerEvents: "none" }}>
        <div style={{
          background: "rgba(10,26,25,0.9)",
          border: "1px solid rgba(232,201,122,0.25)",
          borderRadius: 8,
          padding: "6px 14px",
          color: "#E8C97A",
          fontFamily: "var(--font-body, sans-serif)",
          fontSize: 11,
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const rotY = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const { gl } = useThree();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!isDragging.current) {
      rotY.current += delta * 0.25;
    }
    groupRef.current.rotation.y = rotY.current;
  });

  // Drag handlers
  const onPointerDown = (e: THREE.Event) => {
    isDragging.current = true;
    lastX.current = (e as unknown as PointerEvent).clientX;
  };
  const onPointerUp = () => { isDragging.current = false; };
  const onPointerMove = (e: THREE.Event) => {
    if (!isDragging.current) return;
    const dx = (e as unknown as PointerEvent).clientX - lastX.current;
    rotY.current += dx * 0.008;
    lastX.current = (e as unknown as PointerEvent).clientX;
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    >
      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color="#0D3D3A" emissive="#2EC4B6" emissiveIntensity={0.4} roughness={0.2} />
      </mesh>
      {/* Central glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.015, 8, 64]} />
        <meshStandardMaterial color="#E8C97A" emissive="#E8C97A" emissiveIntensity={0.8} />
      </mesh>
      {/* Orbit ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.008, 8, 80]} />
        <meshStandardMaterial color="#2EC4B6" transparent opacity={0.25} />
      </mesh>

      {PARTNERS.map((p, i) => (
        <OrbitCard key={p} index={i} total={PARTNERS.length} label={p} groupRotation={rotY} />
      ))}
    </group>
  );
}

export default function PartnerOrbit() {
  return (
    <Canvas camera={{ position: [0, 2.5, 6], fov: 50 }} style={{ width: "100%", height: "100%" }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 4, 4]} intensity={1.5} color="#2EC4B6" />
      <pointLight position={[0, -3, -3]} intensity={0.8} color="#E8C97A" />
      <Scene />
      <Preload all />
    </Canvas>
  );
}
