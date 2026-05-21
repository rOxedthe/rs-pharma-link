"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";
import * as THREE from "three";

const NODES = [
  { id: "manufacturer", label: "Manufacturer", desc: "Raw material sourcing & production", pos: [-2.8, 1.2, 0] as [number, number, number], color: "#2EC4B6" },
  { id: "distributor",  label: "R.S. Pharma",  desc: "Quality distribution & logistics",  pos: [0,   0,   0] as [number, number, number], color: "#E8C97A" },
  { id: "pharmacy",     label: "Pharmacy",      desc: "Retail dispensing & patient care",   pos: [2.8, 1.2, 0] as [number, number, number], color: "#2EC4B6" },
  { id: "hospital",     label: "Hospital",      desc: "Institutional healthcare supply",    pos: [2.8,-1.2, 0] as [number, number, number], color: "#2EC4B6" },
  { id: "patient",      label: "Patient",       desc: "End-to-end care delivered",          pos: [-2.8,-1.2, 0] as [number, number, number], color: "#0D3D3A" },
];

const EDGES = [
  [0, 1], [1, 2], [1, 3], [1, 4],
];

// Animated data packet
function DataPacket({ start, end, speed = 1 }: { start: THREE.Vector3; end: THREE.Vector3; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const tRef = useRef(Math.random());

  useFrame((_, delta) => {
    tRef.current = (tRef.current + delta * speed * 0.35) % 1;
    if (ref.current) {
      ref.current.position.lerpVectors(start, end, tRef.current);
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.12, 0.12, 0.12]} />
      <meshStandardMaterial color="#E8C97A" emissive="#E8C97A" emissiveIntensity={0.8} />
    </mesh>
  );
}

function Node({ node, isHovered, onHover }: {
  node: typeof NODES[0];
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    if (isHovered) {
      ringRef.current.scale.setScalar(
        THREE.MathUtils.lerp(ringRef.current.scale.x, 2.2, delta * 4)
      );
      ringRef.current.material &&
        ((ringRef.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
          (ringRef.current.material as THREE.MeshStandardMaterial).opacity, 0, delta * 3
        ));
    } else {
      ringRef.current.scale.setScalar(1);
      (ringRef.current.material as THREE.MeshStandardMaterial).opacity = 0.4;
    }
  });

  return (
    <group position={node.pos}>
      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.34, 32]} />
        <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.6} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Node sphere */}
      <mesh
        ref={ref}
        onPointerEnter={() => onHover(node.id)}
        onPointerLeave={() => onHover(null)}
        scale={isHovered ? 1.35 : 1}
      >
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isHovered ? 0.8 : 0.35}
          roughness={0.2}
        />
      </mesh>
      {/* Label */}
      {isHovered && (
        <Html center distanceFactor={6} style={{ pointerEvents: "none" }}>
          <div style={{
            background: "rgba(10,26,25,0.92)",
            border: "1px solid rgba(232,201,122,0.3)",
            borderRadius: 8,
            padding: "8px 14px",
            color: "#F4F1EB",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: 11,
            whiteSpace: "nowrap",
            transform: "translateY(-48px)",
          }}>
            <div style={{ color: "#E8C97A", fontWeight: 600, fontSize: 12 }}>{node.label}</div>
            <div style={{ color: "rgba(244,241,235,0.6)", marginTop: 2 }}>{node.desc}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Edge({ from, to }: { from: typeof NODES[0]; to: typeof NODES[0] }) {
  const start = new THREE.Vector3(...from.pos);
  const end = new THREE.Vector3(...to.pos);
  const mid = start.clone().lerp(end, 0.5);
  mid.y += 0.2;

  const curve = useMemo(() => new THREE.QuadraticBezierCurve3(start, mid, end), []);
  const points = useMemo(() => curve.getPoints(30), [curve]);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints(points);
    return g;
  }, [points]);

  const lineObj = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: "#2EC4B6", transparent: true, opacity: 0.35 });
    return new THREE.Line(geo, mat);
  }, [geo]);

  return (
    <>
      <primitive object={lineObj} />
      <DataPacket start={start} end={end} speed={0.6 + Math.random() * 0.4} />
    </>
  );
}

function Scene() {
  const [hovered, setHovered] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 4, 4]} intensity={1.5} color="#2EC4B6" />
      <pointLight position={[0, -4, -2]} intensity={0.8} color="#E8C97A" />
      {EDGES.map(([i, j]) => (
        <Edge key={`${i}-${j}`} from={NODES[i]} to={NODES[j]} />
      ))}
      {NODES.map((node) => (
        <Node key={node.id} node={node} isHovered={hovered === node.id} onHover={setHovered} />
      ))}
    </group>
  );
}

export default function SupplyChain() {
  return (
    <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }} style={{ width: "100%", height: "100%" }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
      <Scene />
      <Preload all />
    </Canvas>
  );
}
