// src/three/objects/Door.tsx
import React, { useEffect, useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useUIStore } from "../../store/uiStore";

// Simple global registry for door meshes
const doorRegistry: Record<string, Mesh> = {};

export const registerDoor = (id: string, mesh: Mesh) => {
  doorRegistry[id] = mesh;
};
export const openDoor = (id: string) => {
  const mesh = doorRegistry[id];
  if (mesh) {
    // rotate around Y axis to open like a hinge on left side
    gsap.to(mesh.rotation, { y: Math.PI / 2, duration: 0.8, ease: "power2.out" });
  }
};

interface Props {
  position: [number, number, number];
  buildingId: string;
}

export const Door = ({ position, buildingId }: Props) => {
  const meshRef = useRef<Mesh>(null!);
  // Register on mount
  useEffect(() => {
    if (meshRef.current) {
      registerDoor(buildingId, meshRef.current);
    }
    // cleanup
    return () => {
      delete doorRegistry[buildingId];
    };
  }, []);

  // Simple placeholder door geometry
  return (
    <mesh ref={meshRef} position={position as any} castShadow>
      <boxGeometry args={[0.2, 3, 2]} />
      <meshStandardMaterial color="#8b5e3c" />
    </mesh>
  );
};
