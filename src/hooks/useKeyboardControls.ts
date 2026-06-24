import { useState, useEffect } from 'react';
export const useKeyboardControls = () => {
  const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false });
  return { keys };
};
