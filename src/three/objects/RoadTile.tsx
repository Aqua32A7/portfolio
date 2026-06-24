import React from 'react';
export const RoadTile = ({ tile }: any) => {
  return (
    <mesh position={tile.position} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial color="#555555" />
    </mesh>
  );
};
