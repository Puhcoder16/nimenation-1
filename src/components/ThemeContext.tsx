// src/components/ThemeContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { currentTheme } from './theme';

type ThemeType = typeof currentTheme;

const ThemeContext = createContext<ThemeType>(currentTheme);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};