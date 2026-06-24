import React from 'react';
import { useUIStore } from '../../store/uiStore';

export const InteractionPrompt = () => {
  const { showPrompt, activeBuildingId } = useUIStore();

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white rounded-md px-4 py-2 shadow-lg backdrop-blur-sm">
      Press <span className="font-bold">E</span> to Enter {activeBuildingId ? `(${activeBuildingId})` : ''}
    </div>
  );
};
