// src/components/interaction/InteractionPrompt.tsx
import React from "react";
import { useUIStore } from "../../store/uiStore";

export const InteractionPrompt = () => {
  const { showPrompt, activeBuildingId } = useUIStore();
  if (!showPrompt) return null;
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-md shadow-lg">
      Press <span className="font-bold">E</span> to Enter {activeBuildingId && `(${activeBuildingId})`}
    </div>
  );
};
