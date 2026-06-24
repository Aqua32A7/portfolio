import { useFrame, useThree } from '@react-three/fiber';
import { usePlayerStore } from '../../store/playerStore';
import { useUIStore } from '../../store/uiStore';
import { BUILDINGS } from '../../data/buildings';
import { INTERACTION_RADIUS, CAMERA_ZOOM_DISTANCE, CAMERA_LAG_DURATION } from '../../config/interactionConfig';
import { openDoor } from '../objects/Door';
import gsap from 'gsap';
import { useEffect, useState } from 'react';

export const BuildingInteraction = () => {
  const { position } = usePlayerStore();
  const { setPrompt, showPrompt, activeBuildingId, setInterior, isTransitioning, setTransitioning } = useUIStore();
  const { camera } = useThree();

  useFrame(() => {
    if (isTransitioning) return;

    // Check distance to all buildings
    const px = position[0];
    const pz = position[2];

    let nearestBuildingId: string | null = null;
    let minDistance = Infinity;

    for (const b of BUILDINGS) {
      const dx = b.position[0] - px;
      const dz = b.position[2] - pz;
      const dist = Math.hypot(dx, dz);

      if (dist < INTERACTION_RADIUS && dist < minDistance) {
        minDistance = dist;
        nearestBuildingId = b.id;
      }
    }

    if (nearestBuildingId !== activeBuildingId) {
      setPrompt(!!nearestBuildingId, nearestBuildingId);
    }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyE' && showPrompt && activeBuildingId && !isTransitioning) {
        setTransitioning(true);
        setPrompt(false, activeBuildingId); // Hide prompt

        // 1. Open the door
        openDoor(activeBuildingId);

        // 2. Find the building to zoom to
        const b = BUILDINGS.find(x => x.id === activeBuildingId);
        if (b) {
          // Zoom camera towards the building
          gsap.to(camera.position, {
            x: b.position[0],
            y: 5,
            z: b.position[2] + CAMERA_ZOOM_DISTANCE,
            duration: CAMERA_LAG_DURATION,
            ease: 'power2.inOut',
            onComplete: () => {
              // 3. Trigger interior view
              setInterior(true);
            }
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPrompt, activeBuildingId, isTransitioning, camera, setPrompt, setInterior, setTransitioning]);

  return null;
};
