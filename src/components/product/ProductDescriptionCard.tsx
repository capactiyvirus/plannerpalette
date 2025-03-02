// src/components/product/ProductDescriptionCard.tsx
'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';

interface ProductDescriptionCardProps {
  description: string;
}

export default function ProductDescriptionCard({ description }: ProductDescriptionCardProps) {
  const { theme } = useTheme();
  
  // Theme-dependent colors
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  
  // Filter out bullet points to get only paragraphs
  const paragraphs = description.split('\n')
    .filter(paragraph => paragraph.trim() && !paragraph.trim().startsWith('-') && !paragraph.trim().startsWith('•'));
  
  return (
    <div className="mt-12 p-6 rounded-lg shadow-sm transition-colors duration-300" style={{ backgroundColor: cardBgColor }}>
      <h2 className="text-2xl font-bold mb-6 transition-colors duration-300" style={{ 
        fontFamily: '"Playfair Display", serif',
        color: headingColor
      }}>
        Product Description
      </h2>
      
      <div className="prose max-w-none transition-colors duration-300" style={{ 
        fontFamily: '"Lora", serif',
        color: textColor
      }}>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}