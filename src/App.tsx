import React from "react";
import { Canvas } from "@react-three/fiber";
import { CityEngine } from "./three/engine/CityEngine";
import { InteractionPrompt } from "./components/interaction/InteractionPrompt";
import { UIProvider } from "./store/uiStore";

export default function App() {
  return (
    <UIProvider>
      <Canvas shadows camera={{ position: [0, 10, 20], fov: 35 }}>
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
        <CityEngine />
      </Canvas>
      <InteractionPrompt />
    </UIProvider>
  );
}
