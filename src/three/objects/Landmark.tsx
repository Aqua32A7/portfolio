import React from 'react';
export const Landmark = ({ landmark }: any) => {
  return (
    <mesh position={landmark.position} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#a8dadc" />
    </mesh>
  );
};
