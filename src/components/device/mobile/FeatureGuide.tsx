'use client';
import React from 'react';
import ProductCard from '@/components/ProductCard';
import colors from '@/components/colors';
import { products } from '@/data/products';
import { useTheme } from '@/context/ThemeContext';


const FeatureGuide = () => {
  const { theme } = useTheme();
  
  // Set the title color based on theme
  const titleColor = theme === 'dark' ? colors.darkMode.text : colors.primary;

  return (
    <div>
      <h3 
        className="text-2xl text-center mb-8 transition-colors duration-300" 
        style={{ color: titleColor }}
      >
        Top Workbooks
      </h3>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        { products.slice(0,3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeatureGuide;