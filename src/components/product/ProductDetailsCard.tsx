// src/components/product/ProductDetailsCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Download } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';

interface ProductDetailsCardProps {
  product: {
    title: string;
    description: string;
    fileType: string;
    etsyUrl: string;
  };
  formattedPrice: string;
}

export default function ProductDetailsCard({ product, formattedPrice }: ProductDetailsCardProps) {
  const { theme } = useTheme();
  
  // Theme-dependent colors
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const priceColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  const buttonBgColor = theme === 'dark' ? colors.accent1 + 'DD' : colors.accent1;
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  
  // Get first paragraph of description for summary
  const descriptionSummary = product.description.split('\n')[0];
  
  return (
    <div className="p-6 rounded-lg shadow-sm transition-colors duration-300" style={{ backgroundColor: cardBgColor }}>
      <h1 
        className="text-2xl md:text-3xl font-bold transition-colors duration-300" 
        style={{ 
          fontFamily: '"Playfair Display", serif',
          color: headingColor
        }}
      >
        {product.title}
      </h1>

      <div className="flex items-center mt-4">
        <span 
          className="text-2xl font-medium transition-colors duration-300" 
          style={{ color: priceColor }}
        >
          {formattedPrice}
        </span>
        <div 
          className="ml-4 flex items-center gap-1 px-3 py-1 rounded-full transition-colors duration-300"
          style={{ 
            backgroundColor: theme === 'dark' ? colors.accent1 + '30' : colors.light.mint,
            color: theme === 'dark' ? colors.light.parchment : colors.accent1
          }}
        >
          <FileText size={14} />
          <span className="text-xs font-medium">{product.fileType}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <p 
          className="text-lg transition-colors duration-300" 
          style={{ 
            fontFamily: '"Lora", serif',
            color: textColor 
          }}
        >
          {descriptionSummary}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <a 
          href={product.etsyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 rounded-md shadow-sm text-base font-medium text-white hover:opacity-90 transition-all"
          style={{ backgroundColor: buttonBgColor }}
        >
          <Download size={18} className="mr-2" />
          Purchase on Etsy
        </a>
        
        <Link 
          href="/products"
          className="inline-flex items-center justify-center px-6 py-3 border rounded-md text-base font-medium transition-colors hover:bg-opacity-10"
          style={{ 
            borderColor: theme === 'dark' ? colors.darkMode.text + '40' : colors.accent2,
            color: theme === 'dark' ? colors.darkMode.text : colors.accent2,
            backgroundColor: 'transparent',
          }}
        >
          View all guides
        </Link>
      </div>
    </div>
  );
}