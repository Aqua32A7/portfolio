import { create } from 'zustand';
export const usePlayerStore = create<any>((set) => ({
  position: [0, 0, 0],
  velocity: [0, 0, 0],
  speed: 5,
  updatePosition: () => {},
  setVelocity: () => {},
}));
