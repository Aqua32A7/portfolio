import React, { useRef } from 'react';
import { useBox } from '@react-three/cannon';
import { MeshProps } from '@react-three/fiber';
import { BuildingHighlight } from '../../components/interaction/BuildingHighlight';
import { Door } from './Door';

// Simplified building model – a box with a door child
export const Building = ({ data }: { data: { id: string; position: [number, number, number]; } }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position: data.position,
    args: [4, 6, 4], // same as collider
  }));

  const buildingRef = useRef<THREE.Mesh>(null);

  return (
    <group ref={ref} position={data.position}>
      <BuildingHighlight id={data.id}>
        <mesh ref={buildingRef} castShadow receiveShadow>
          <boxGeometry args={[8, 12, 8]} />
          <meshStandardMaterial color="#c0c0c0" />
        </mesh>
      </BuildingHighlight>
      {/* Simple door positioned on front side */}
      <Door parentRef={buildingRef} />
    </group>
  );
};
