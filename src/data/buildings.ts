// src/data/buildings.ts
export interface BuildingData {
  id: string;
  position: [number, number, number];
  color?: string;
}

export const BUILDINGS: BuildingData[] = [
  { id: "apartment", position: [0, 0, -20], color: "#ffd166" },
  { id: "university", position: [20, 0, 0], color: "#06d6a0" },
  { id: "tech-tower", position: [-20, 0, 0], color: "#ef476f" },
];
