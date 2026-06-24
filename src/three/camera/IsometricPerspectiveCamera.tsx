import React from 'react';
import { PerspectiveCamera } from '@react-three/drei';
export const IsometricPerspectiveCamera = () => {
  return <PerspectiveCamera makeDefault position={[0, 10, 20]} fov={35} />;
};
