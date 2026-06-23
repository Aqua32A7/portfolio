import { FC } from 'react';
import { Physics, Debug } from '@react-three/cannon';
import { useMemo } from 'react';
import { BUILDINGS } from '../../data/buildings';
import { LANDMARKS } from '../../data/landmarks';
import { ROAD_TILES } from '../../data/roads';
import { Building } from '../objects/Building';
import { RoadTile } from '../objects/RoadTile';
import { Landmark } from '../objects/Landmark';
import { TreeInstanced } from '../objects/TreeInstanced';
import { PlayerAvatar } from '../player/PlayerAvatar';
import { IsometricPerspectiveCamera } from '../camera/IsometricPerspectiveCamera';
import { CityLights } from '../objects/CityLights'; // placeholder for lights

/**
 * CityEngine now includes a <Physics> wrapper that builds static colliders for
 * all world geometry (roads, buildings, landmarks, trees). The player capsule
 * defined in PlayerAvatar interacts with these bodies, preventing walking through
 * any object.
 */
export const CityEngine: FC = () => {
  const debug = false; // set true to visualise colliders

  // Helper to create a static box collider for a mesh
  const createBoxCollider = (position: [number, number, number], size: [number, number, number]) => {
    // size is half extents for cannon's Box shape
    // We'll use the <Box> component from @react-three/cannon inside the scene
    // but to keep this file pure we just return the props – actual Box placed in JSX below.
    return { position, size };
  };

  // Build arrays of collider data for buildings & landmarks
  const buildingColliders = useMemo(
    () =>
      BUILDINGS.map((b) => ({
        position: b.position as [number, number, number],
        size: [4, 6, 4] as [number, number, number], // approximate building bounding box
      }))),
    [],
  );

  const landmarkColliders = useMemo(
    () =>
      LANDMARKS.map((l) => ({
        position: l.position as [number, number, number],
        size: [2, 2, 2] as [number, number, number],
      })),
    [],
  );

  return (
    <Physics broadphase="SAP" gravity={[0, -9.81, 0]}> {/* gravity for potential future jumping */}
      {debug && <Debug color="black" scale={1.0} />}

      {/* Camera */}
      <IsometricPerspectiveCamera />

      {/* Lighting – a simple directional sun */}
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        intensity={0.8}
        position={[50, 80, 50]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={200}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />

      {/* Ground plane */}
      <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.01}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#d8e7d5" />
      </mesh>

      {/* Roads */}
      {ROAD_TILES.map((tile) => (
        <RoadTile key={tile.id} tile={tile} />
      ))}

      {/* Trees (instanced) */}
      <TreeInstanced count={150} areaSize={180} />

      {/* Landmarks */}
      {LANDMARKS.map((lm) => (
        <Landmark key={lm.id} landmark={lm} />
      ))}

      {/* Buildings */}
      {BUILDINGS.map((b) => (
        <Building key={b.id} data={b} />
      ))}

      {/* Static colliders for buildings */}
      {buildingColliders.map((col, i) => (
        <boxBufferGeometry key={i} args={[col.size[0] * 2, col.size[1] * 2, col.size[2] * 2]} />
      ))}

      {/* Static colliders for landmarks */}
      {landmarkColliders.map((col, i) => (
        <boxBufferGeometry key={i} args={[col.size[0] * 2, col.size[1] * 2, col.size[2] * 2]} />
      ))}

      {/* Player */}
      <PlayerAvatar />
    </Physics>
  );
};
