import React, { useEffect, useRef } from 'react';
import { useUIStore } from '../../store/uiStore';
import { BUILDINGS } from '../../data/buildings';
import gsap from 'gsap';

export const InteriorView = () => {
  const { showInterior, activeBuildingId, setInterior, setTransitioning } = useUIStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showInterior && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [showInterior]);

  if (!showInterior || !activeBuildingId) return null;

  const building = BUILDINGS.find((b) => b.id === activeBuildingId);
  if (!building) return null;

  const handleExit = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setInterior(false);
          // Wait for a brief moment before releasing the transitioning flag
          // to prevent immediate re-triggering of 'E'
          setTimeout(() => {
            setTransitioning(false);
          }, 200);
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm pointer-events-auto">
      <div 
        ref={overlayRef}
        className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 text-white"
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-white/20 pb-4">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: building.color || '#fff' }}>
            {building.title}
          </h1>
          <button 
            onClick={handleExit}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/30 text-sm uppercase tracking-wider font-semibold"
          >
            Return to City
          </button>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none">
          {building.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="text-lg leading-relaxed text-gray-200 mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
