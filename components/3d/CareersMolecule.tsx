"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

function SparseMolecules() {
  const groupRef = useRef<THREE.Group>(null);

  const molecules = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      size: 0.05 + Math.random() * 0.12,
      color: i % 3 === 0 ? "#E8C97A" : i % 3 === 1 ? "#2EC4B6" : "#0D3D3A",
      speed: 0.2 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const m = molecules[i];
      child.position.y =
        m.pos[1] + Math.sin(state.clock.elapsedTime * m.speed + m.offset) * 0.25;
      child.rotation.y = state.clock.elapsedTime * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {molecules.map((m, i) => (
        <mesh key={i} position={m.pos}>
          <octahedronGeometry args={[m.size, 0]} />
          <meshStandardMaterial
            color={m.color}
            emissive={m.color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.35}
            wireframe={i % 4 === 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function Connections() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 6; i++) {
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3
      ));
    }
    // Connect pairs
    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      linePoints.push(pts[i], pts[i + 1]);
    }
    return linePoints;
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints(points);
    return g;
  }, [points]);

  const lineObj = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: "#2EC4B6", transparent: true, opacity: 0.12 });
    return new THREE.Line(geo, mat);
  }, [geo]);

  return <primitive object={lineObj} />;
}

export default function CareersMolecule() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 55 }} style={{ width: "100%", height: "100%" }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={1.0} color="#2EC4B6" />
      <SparseMolecules />
      <Connections />
      <Preload all />
    </Canvas>
  );
}
