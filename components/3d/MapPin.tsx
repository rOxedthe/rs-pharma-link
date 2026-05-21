"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(8, 8, 24, 24);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 0.5) * 0.3 +
        Math.cos(y * 0.6) * 0.25 +
        Math.sin((x + y) * 0.4) * 0.2 +
        (Math.random() - 0.5) * 0.1;
      pos.setZ(i, z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
      <meshStandardMaterial
        color="#0D3D3A"
        roughness={0.8}
        metalness={0.0}
        wireframe={false}
      />
    </mesh>
  );
}

function Pin() {
  const ringRef = useRef<THREE.Mesh>(null);
  const scale = useRef(1);
  const growing = useRef(true);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    if (growing.current) {
      scale.current += delta * 0.8;
      if (scale.current > 2.5) growing.current = false;
    } else {
      scale.current -= delta * 1.0;
      if (scale.current < 1.0) {
        scale.current = 1.0;
        growing.current = true;
      }
    }
    ringRef.current.scale.setScalar(scale.current);
    (ringRef.current.material as THREE.MeshStandardMaterial).opacity =
      Math.max(0, 0.6 * (1 - (scale.current - 1) / 1.5));
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Pin body */}
      <mesh position={[0, 0.6, 0]}>
        <capsuleGeometry args={[0.12, 0.4, 8, 16]} />
        <meshStandardMaterial color="#E8C97A" emissive="#E8C97A" emissiveIntensity={0.6} roughness={0.2} />
      </mesh>
      {/* Pin tip */}
      <mesh position={[0, 0.12, 0]}>
        <coneGeometry args={[0.12, 0.28, 8]} />
        <meshStandardMaterial color="#E8C97A" emissive="#E8C97A" emissiveIntensity={0.5} />
      </mesh>
      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <ringGeometry args={[0.18, 0.24, 32]} />
        <meshStandardMaterial color="#2EC4B6" emissive="#2EC4B6" emissiveIntensity={0.8} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Floating envelope
function Envelope({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[0.3, 0.2, 0.04]} />
        <meshStandardMaterial color="#2EC4B6" emissive="#2EC4B6" emissiveIntensity={0.4} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export default function MapPin() {
  return (
    <Canvas camera={{ position: [0, 2.5, 5], fov: 50 }} style={{ width: "100%", height: "100%" }} gl={{ antialias: true, alpha: true }} shadows dpr={[1, 1.5]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 4, 3]} intensity={1.5} color="#2EC4B6" castShadow />
      <pointLight position={[-2, 1, -2]} intensity={0.6} color="#E8C97A" />
      <Terrain />
      <Pin />
      <Envelope position={[1.5, 0.4, 0.5]} />
      <Envelope position={[-1.8, 0.6, -0.3]} />
      <Preload all />
    </Canvas>
  );
}
