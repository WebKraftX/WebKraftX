import React, { createContext, useContext, useState } from 'react';

interface CursorContextType {
  cursorText: string;
  isHovered: boolean;
  setCursor: (text: string, hovered?: boolean) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorText: '',
  isHovered: false,
  setCursor: () => {},
  resetCursor: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const setCursor = (text: string, hovered = true) => {
    setCursorText(text);
    setIsHovered(hovered);
  };

  const resetCursor = () => {
    setCursorText('');
    setIsHovered(false);
  };

  return (
    <CursorContext.Provider value={{ cursorText, isHovered, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);

