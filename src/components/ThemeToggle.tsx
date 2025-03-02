// src/components/ThemeToggle.tsx
'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import colors from '@/components/colors';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors"
      style={{ 
        backgroundColor: theme === 'dark' ? colors.primary : colors.light.parchment,
        color: theme === 'dark' ? colors.light.parchment : colors.primary
      }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}