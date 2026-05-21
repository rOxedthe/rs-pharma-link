"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

const BARS = [
  { label: "Years",     value: 0.5,  height: 1.5,  color: "#2EC4B6" },
  { label: "Partners",  value: 0.85, height: 2.55, color: "#0D3D3A" },
  { label: "Products",  value: 1.0,  height: 3.0,  color: "#E8C97A" },
  { label: "Districts", value: 0.65, height: 1.95, color: "#2EC4B6" },
  { label: "Orders",    value: 0.9,  height: 2.7,  color: "#0D3D3A" },
];

function Bar({
  index,
  targetHeight,
  color,
  triggered,
}: {
  index: number;
  targetHeight: number;
  color: string;
  triggered: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const currentH = useRef(0);
  const delay = index * 0.18;
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (!triggered || elapsed.current < delay) return;
    if (!ref.current) return;

    currentH.current = THREE.MathUtils.lerp(
      currentH.current,
      targetHeight,
      delta * 2.8
    );

    ref.current.scale.y = currentH.current / targetHeight;
    ref.current.position.y = (currentH.current / 2) - 1.5;
  });

  const x = (index - (BARS.length - 1) / 2) * 0.9;

  return (
    <group position={[x, 0, 0]}>
      <mesh ref={ref} scale={[1, 0.001, 1]} position={[0, -1.5, 0]}>
        <boxGeometry args={[0.55, targetHeight, 0.55]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          roughness={0.15}
          metalness={0.05}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Base plate */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
    </group>
  );
}

// Floating medical cross symbols
function MedCross({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[0.06, 0.22, 0.04]} />
        <meshStandardMaterial color="#2EC4B6" emissive="#2EC4B6" emissiveIntensity={0.5} transparent opacity={0.4} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.22, 0.06, 0.04]} />
        <meshStandardMaterial color="#2EC4B6" emissive="#2EC4B6" emissiveIntensity={0.5} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Scene({ triggered }: { triggered: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 5, 3]} intensity={1.5} color="#2EC4B6" />
      <pointLight position={[-3, 2, -2]} intensity={0.8} color="#E8C97A" />
      {/* Grid floor */}
      <gridHelper args={[8, 16, "#0D3D3A", "#0D3D3A"]} position={[0, -1.52, 0]} />
      {BARS.map((bar, i) => (
        <Bar key={i} index={i} targetHeight={bar.height} color={bar.color} triggered={triggered} />
      ))}
      <MedCross position={[-3.5, 0.5, -1]} />
      <MedCross position={[3.5, 1.0, -0.5]} />
      <MedCross position={[0, 2.2, -1.5]} />
    </>
  );
}

export default function StatsChart({ triggered = false }: { triggered?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 2, 7], fov: 45 }} style={{ width: "100%", height: "100%" }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
      <Scene triggered={triggered} />
      <Preload all />
    </Canvas>
  );
}
