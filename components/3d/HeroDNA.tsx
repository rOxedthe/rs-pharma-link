"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Preload } from "@react-three/drei";
import * as THREE from "three";

// --- Atom node ---
function Atom({ position, color, size = 0.12 }: { position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  );
}

// --- Bond cylinder between two points ---
function Bond({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const dir = end.clone().sub(start);
  const len = dir.length();
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());

  return (
    <mesh position={mid} quaternion={quaternion}>
      <cylinderGeometry args={[0.018, 0.018, len, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.4}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

// --- DNA Double Helix ---
function DNAHelix({ mouseX, mouseY }: { mouseX: React.RefObject<number>; mouseY: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const steps = 28;
  const radius = 0.9;
  const heightStep = 0.22;
  const twist = 0.38;

  const { atoms1, atoms2, bonds } = useMemo(() => {
    const a1: [number, number, number][] = [];
    const a2: [number, number, number][] = [];
    const b: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];

    for (let i = 0; i < steps; i++) {
      const angle = i * twist;
      const y = (i - steps / 2) * heightStep;
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      a1.push([x1, y, z1]);
      a2.push([x2, y, z2]);

      // Cross bonds (rungs)
      if (i % 2 === 0) {
        b.push({
          start: new THREE.Vector3(x1, y, z1),
          end: new THREE.Vector3(x2, y, z2),
        });
      }
      // Backbone bonds
      if (i > 0) {
        const [px1, py1, pz1] = a1[i - 1];
        const [px2, py2, pz2] = a2[i - 1];
        b.push({ start: new THREE.Vector3(px1, py1, pz1), end: new THREE.Vector3(x1, y, z1) });
        b.push({ start: new THREE.Vector3(px2, py2, pz2), end: new THREE.Vector3(x2, y, z2) });
      }
    }
    return { atoms1: a1, atoms2: a2, bonds: b };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    // Mouse parallax
    const targetX = (mouseY.current ?? 0) * 0.18;
    const targetZ = (mouseX.current ?? 0) * 0.18;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {atoms1.map((pos, i) => (
        <Atom key={`a1-${i}`} position={pos} color="#2EC4B6" size={0.1} />
      ))}
      {atoms2.map((pos, i) => (
        <Atom key={`a2-${i}`} position={pos} color="#E8C97A" size={0.1} />
      ))}
      {bonds.map((b, i) => (
        <Bond key={`b-${i}`} start={b.start} end={b.end} color="#0D3D3A" />
      ))}
    </group>
  );
}

// --- Floating ambient pills & hexagons ---
function AmbientParticles() {
  const points = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 120;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial color="#2EC4B6" size={0.04} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

// --- Scene wrapper ---
function Scene({ mouseX, mouseY }: { mouseX: React.RefObject<number>; mouseY: React.RefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#2EC4B6" />
      <pointLight position={[-4, -2, -4]} intensity={0.8} color="#E8C97A" />
      <DNAHelix mouseX={mouseX} mouseY={mouseY} />
      <AmbientParticles />
    </>
  );
}

// --- Exported Canvas wrapper ---
export default function HeroDNA() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene mouseX={mouseX} mouseY={mouseY} />
      <Preload all />
    </Canvas>
  );
}
