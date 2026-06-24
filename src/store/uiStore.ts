// UI state store using Zustand
import create from "zustand";
import { devtools } from "zustand/middleware";

export interface UIState {
  showPrompt: boolean;
  activeBuildingId: string | null;
  showInterior: boolean;
  isTransitioning: boolean;
  setPrompt: (show: boolean, id?: string | null) => void;
  setInterior: (show: boolean) => void;
  setTransitioning: (transitioning: boolean) => void;
}

export const useUIStore = create<UIState>()(
  devtools((set) => ({
    showPrompt: false,
    activeBuildingId: null,
    showInterior: false,
    isTransitioning: false,
    setPrompt: (show, id = null) => set({ showPrompt: show, activeBuildingId: id, showInterior: false }),
    setInterior: (show) => set({ showInterior: show, showPrompt: false }),
    setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  }))
);
