"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const COLORS = {
  primary: "#0D3D3A",
  accent: "#E8C97A",
  medical: "#2EC4B6",
  dark: "#0A1A19",
  bg: "#F4F1EB",
} as const;

/** Emissive material factory */
export function emissiveMaterial(
  color: string,
  emissiveIntensity = 0.4,
  roughness = 0.3,
  metalness = 0.1
) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity,
    roughness,
    metalness,
    transparent: true,
    opacity: 0.95,
  });
}

/** Glowing line material */
export function glowLineMaterial(color: string, opacity = 0.8) {
  return new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    linewidth: 1,
  });
}

/** Hook: gentle float animation */
export function useFloat(
  ref: React.RefObject<THREE.Object3D | null>,
  amplitude = 0.12,
  speed = 0.8,
  offset = 0
) {
  const timeRef = useRef(offset);
  useFrame((_, delta) => {
    if (!ref.current) return;
    timeRef.current += delta * speed;
    ref.current.position.y =
      Math.sin(timeRef.current) * amplitude;
  });
}

/** Hook: slow Y-axis rotation */
export function useSlowRotate(
  ref: React.RefObject<THREE.Object3D | null>,
  speed = 0.003
) {
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += speed;
  });
}

/** Create a glowing particle system */
export function createParticleSystem(
  count: number,
  spread: number,
  color: string
): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color,
    size: 0.03,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });
  return new THREE.Points(geo, mat);
}

/** Detect WebGL performance tier */
export function detectWebGLPerformance(): "high" | "low" | "none" {
  if (typeof window === "undefined") return "none";
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) return "none";
    return "high";
  } catch {
    return "none";
  }
}
