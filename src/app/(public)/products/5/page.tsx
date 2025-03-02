// src/app/(public)/products/[id]/page.tsx
'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { useTheme } from '@/context/ThemeContext';
import ProductBreadcrumb from '@/components/product/ProductBreadcrumb';
import ProductImageSection from '@/components/product/ProductImageSection';
import ProductDetailsCard from '@/components/product/ProductDetailsCard';
import ProductHighlightsCard from '@/components/product/ProductHighlightsCard';
import ProductDescriptionCard from '@/components/product/ProductDescriptionCard';
import colors from '@/components/colors';

export default function ProductPage() {
  const { theme } = useTheme();
  const product = products.find(p => p.id === '5');
  
  if (!product) notFound();
  
  // Get background color based on theme
  const bgColor = theme === 'dark' ? colors.darkMode.background : colors.light.cream;
  
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      {/* Breadcrumb navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <ProductBreadcrumb productTitle={product.title} />
      </div>

      {/* Product display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:items-start lg:gap-12">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <ProductImageSection imageUrl={product.imageUrl} title={product.title} />
          </div>
          
          {/* Product Details */}
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <ProductDetailsCard 
              product={product} 
              formattedPrice={new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'CAD'
              }).format(product.price)}
            />
            
            <ProductHighlightsCard description={product.description} />
          </div>
        </div>
        
        {/* Description section */}
        <ProductDescriptionCard description={product.description} />
      </div>
    </div>
  );
}