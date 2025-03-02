// src/components/product/ProductHighlightsCard.tsx
'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';

interface ProductHighlightsCardProps {
  description: string;
}

export default function ProductHighlightsCard({ description }: ProductHighlightsCardProps) {
  const { theme } = useTheme();
  
  // Theme-dependent colors
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  
  // Extract bullet points from description
  const bulletPoints = description.split('\n')
    .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
    .slice(0, 4)
    .map(line => line.replace(/^[-•]\s*/, ''));
  
  // Don't render if no bullet points
  if (bulletPoints.length === 0) return null;
  
  return (
    <div className="mt-8 p-6 rounded-lg shadow-sm transition-colors duration-300" style={{ backgroundColor: cardBgColor }}>
      <h2 className="text-xl font-bold mb-4 transition-colors duration-300" style={{ 
        fontFamily: '"Playfair Display", serif',
        color: headingColor
      }}>
        What&apos;s Included
      </h2>
      
      <ul className="space-y-3">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 mt-1 text-sm" style={{ color: theme === 'dark' ? colors.light.parchment : colors.accent1 }}>•</span>
            <span style={{ color: textColor }}>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}