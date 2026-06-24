// src/components/interaction/BuildingHighlight.tsx
import React, { useEffect, useRef } from "react";
import { MeshStandardMaterial } from "three";
import { useThree } from "@react-three/fiber";
import { useUIStore } from "../../store/uiStore";

interface Props {
  active: boolean; // will be overridden by UI store lookup
  children: React.ReactNode;
}

export const BuildingHighlight: React.FC<Props> = ({ active, children }) => {
  const { activeBuildingId } = useUIStore();
  const groupRef = useRef<any>(null);
  const { scene } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;
    // find all meshStandardMaterial in the group and modify emissive if active
    groupRef.current.traverse((obj: any) => {
      if (obj.isMesh && obj.material instanceof MeshStandardMaterial) {
        const mat = obj.material as MeshStandardMaterial;
        const highlight = active && activeBuildingId === obj.userData.buildingId;
        mat.emissive.setHex(highlight ? 0xffd700 : 0x000000);
        mat.emissiveIntensity = highlight ? 0.6 : 0;
      }
    });
  }, [active, activeBuildingId]);

  return <group ref={groupRef}>{children}</group>;
};
