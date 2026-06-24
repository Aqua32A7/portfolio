// UI state store using Zustand
import create from "zustand";
import { devtools } from "zustand/middleware";

export interface UIState {
  showPrompt: boolean;
  activeBuildingId: string | null;
  setPrompt: (show: boolean, id?: string | null) => void;
}

export const useUIStore = create<UIState>()(
  devtools((set) => ({
    showPrompt: false,
    activeBuildingId: null,
    setPrompt: (show, id = null) => set({ showPrompt: show, activeBuildingId: id }),
  }))
);
