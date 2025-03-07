'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import colors from '@/components/colors';
import { products } from '@/data/products';
import { useTheme } from '@/context/ThemeContext';

// Define the props interface
interface FeaturedGuidesProps {
  products: Array<typeof products[0]>; 
  title?: string;
  viewAllLink?: string;
  limit?: number;
  backgroundColor?: string;
} 

const FeaturedGuides: React.FC<FeaturedGuidesProps> = ({
  products,
  title = "Featured Guides",
  viewAllLink = "/products",
  limit = 3,
  backgroundColor = colors.light.sage + '33'
}) => {
  const { theme } = useTheme();
  
  // Determine colors based on theme
  const bgColor = theme === 'dark' 
    ? colors.darkMode.cardBg // Use dark mode background with same transparency
    : backgroundColor;
    
  const textColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const linkColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  
  return (
    <section className="py-16 transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl transition-colors duration-300" style={{ 
            fontFamily: '"Playfair Display", serif',
            color: textColor
          }}>
            {title}
          </h2>
          <Link 
            href={viewAllLink} 
            className="flex items-center transition-colors duration-300 hover:opacity-80"
            style={{ 
              color: linkColor,
              fontFamily: '"Lora", serif'
            }}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, limit).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGuides;