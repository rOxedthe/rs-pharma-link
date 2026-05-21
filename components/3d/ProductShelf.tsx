"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";
import * as THREE from "three";

const PRODUCTS = [
  { id: "antibiotics",   label: "Antibiotics",      color: "#2EC4B6", desc: "Broad-spectrum antibacterial agents" },
  { id: "cardio",        label: "Cardiovascular",    color: "#E8C97A", desc: "Heart & blood pressure medications" },
  { id: "vitamins",      label: "Vitamins & Suppl.", color: "#0D3D3A", desc: "Essential health supplements" },
  { id: "analgesics",    label: "Analgesics",        color: "#2EC4B6", desc: "Pain relief & anti-inflammatory" },
  { id: "dermatology",   label: "Dermatology",       color: "#E8C97A", desc: "Skin care & topical treatments" },
];

function ShelfCard({
  index,
  total,
  product,
}: {
  index: number;
  total: number;
  product: typeof PRODUCTS[0];
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const x = (index - (total - 1) / 2) * 1.3;

  useFrame((_, delta) => {
    if (!ref.current) return;
    const targetY = hovered ? 0.35 : 0;
    const targetZ = hovered ? 0.4 : 0;
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, delta * 5);
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, delta * 5);
  });

  return (
    <group ref={ref} position={[x, -0.3, 0]}>
      {/* Card body */}
      <mesh
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[1.0, 1.4, 0.06]} />
        <meshStandardMaterial
          color={hovered ? product.color : "#0D3D3A"}
          emissive={product.color}
          emissiveIntensity={hovered ? 0.5 : 0.1}
          roughness={0.2}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* Top stripe */}
      <mesh position={[0, 0.6, 0.034]}>
        <boxGeometry args={[1.0, 0.2, 0.01]} />
        <meshStandardMaterial color={product.color} emissive={product.color} emissiveIntensity={0.6} />
      </mesh>
      {/* Label */}
      {hovered && (
        <Html center distanceFactor={4} style={{ pointerEvents: "none" }}>
          <div style={{
            background: "rgba(10,26,25,0.95)",
            border: `1px solid ${product.color}44`,
            borderRadius: 10,
            padding: "10px 16px",
            color: "#F4F1EB",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: 11,
            textAlign: "center",
            whiteSpace: "nowrap",
            transform: "translateY(-100px)",
            minWidth: 140,
          }}>
            <div style={{ color: product.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{product.label}</div>
            <div style={{ color: "rgba(244,241,235,0.6)" }}>{product.desc}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Shelf() {
  return (
    <>
      {/* Shelf plank */}
      <mesh position={[0, -1.0, -0.1]}>
        <boxGeometry args={[7.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#0A1A19" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Shelf back panel */}
      <mesh position={[0, 0, -0.45]}>
        <boxGeometry args={[7.5, 2.2, 0.04]} />
        <meshStandardMaterial color="#071210" roughness={0.6} transparent opacity={0.6} />
      </mesh>
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 4, 3]} intensity={1.8} color="#F4F1EB" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#2EC4B6" />
      <Shelf />
      {PRODUCTS.map((p, i) => (
        <ShelfCard key={p.id} index={i} total={PRODUCTS.length} product={p} />
      ))}
    </>
  );
}

export default function ProductShelf() {
  return (
    <Canvas camera={{ position: [0, 0.5, 5.5], fov: 50 }} style={{ width: "100%", height: "100%" }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
      <Scene />
      <Preload all />
    </Canvas>
  );
}
