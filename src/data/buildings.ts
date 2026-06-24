export interface BuildingData {
  id: string;
  position: [number, number, number];
  color?: string;
  title: string;
  type: 'about' | 'projects' | 'contact';
  content: string;
}

export const BUILDINGS: BuildingData[] = [
  { 
    id: "apartment", 
    position: [0, 0, -20], 
    color: "#ffd166",
    title: "About Me",
    type: "about",
    content: "Hi! I'm Sumanth. I'm a passionate developer who loves creating interactive and engaging web experiences. This portfolio city is a reflection of my drive to blend engineering with gamified design."
  },
  { 
    id: "university", 
    position: [20, 0, 0], 
    color: "#06d6a0",
    title: "My Projects",
    type: "projects",
    content: "1. **Civic Pulse**: A platform for tracking civic issues.\n2. **StudyOS**: A gamified student management dashboard.\n3. **Ghost ID**: An intelligence pipeline demonstration."
  },
  { 
    id: "tech-tower", 
    position: [-20, 0, 0], 
    color: "#ef476f",
    title: "Contact",
    type: "contact",
    content: "Feel free to reach out to me via email or LinkedIn! I'm always open to discussing new opportunities or collaborations in the tech space."
  },
];
