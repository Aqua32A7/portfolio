// src/three/player/PlayerAvatar.tsx
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { useSmoothMovement } from '../../hooks/useSmoothMovement';
import { usePlayerStore } from '../../store/playerStore';
import { useUIStore } from '../../store/uiStore';
import { CITY_CONFIG } from '../../config/cityConfig';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Character avatar with optional GLTF model and walking/idle animations.
 * If the GLTF file is missing, falls back to a simple capsule.
 */
export const PlayerAvatar = () => {
  const { camera } = useThree();
  const { keys } = useKeyboardControls();
  const { position, setVelocity, updatePosition, speed } = usePlayerStore();

  // ---------- Smooth movement ----------
  const { velocity, targetDirection } = useSmoothMovement({
    keys,
    maxSpeed: speed,
    acceleration: 20, // units per second^2
    deceleration: 30,
  });

  // Apply velocity to Zustand store each frame for other systems (camera, UI)
  useFrame((_state, delta) => {
    // Update logical position store
    updatePosition(delta);
    // Sync store position with calculated velocity
    const [x, y, z] = position;
    // setVelocity is handled inside useSmoothMovement via side‑effects, so we just move the mesh
    // Update mesh transform
    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
    }

    // Read UI store state directly without subscribing the whole component to useFrame loops
    const { showInterior, isTransitioning } = useUIStore.getState();

    if (!showInterior && !isTransitioning) {
      // Camera follow (lerp)
      const targetCam = new THREE.Vector3(
        x,
        CITY_CONFIG.cameraHeight,
        z + CITY_CONFIG.cameraDistance
      );
      camera.position.lerp(targetCam, CITY_CONFIG.cameraLerpSpeed);
      camera.lookAt(x, 0, z);
    }
  });

  // ---------- Load character model ----------
  // Temporarily disabled to prevent 404 error during build/runtime
  // const gltf = useGLTF('/models/character.glb');
  // const { actions } = useAnimations(gltf?.animations, gltf?.scene);

  // Switch between idle/walk based on speed magnitude
  // useEffect(() => {
  //   const speedMag = Math.hypot(velocity[0], velocity[2]);
  //   if (speedMag > 0.1) {
  //     actions?.walk?.reset().fadeIn(0.2).play();
  //     actions?.idle?.fadeOut(0.2);
  //   } else {
  //     actions?.idle?.reset().fadeIn(0.2).play();
  //     actions?.walk?.fadeOut(0.2);
  //   }
  // }, [velocity, actions]);

  // Rotate model to face movement direction (if moving)
  const meshRef = useRef<THREE.Object3D>(null);
  useFrame(() => {
    if (!meshRef.current) return;
    const dir = targetDirection;
    if (dir[0] !== 0 || dir[2] !== 0) {
      const targetAngle = Math.atan2(dir[0], dir[2]); // Y‑axis rotation
      const currentQuat = meshRef.current.quaternion;
      const targetQuat = new THREE.Quaternion();
      targetQuat.setFromEuler(new THREE.Euler(0, targetAngle, 0));
      currentQuat.slerp(targetQuat, 0.15);
    }
  });

  // ---------- Render ----------
  const fallback = (
    <mesh ref={meshRef} castShadow>
      <capsuleGeometry args={[0.7, 1.5, 8, 16]} />
      <meshStandardMaterial color="#ff8c61" />
    </mesh>
  );

  return fallback;
};
