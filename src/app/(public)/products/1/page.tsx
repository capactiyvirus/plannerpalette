// src/app/(public)/products/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { useTheme } from '@/context/ThemeContext';
import ProductBreadcrumb from '@/components/product/ProductBreadcrumb';
import ProductImageSection from '@/components/product/ProductImageSection';
import ProductDetailsCard from '@/components/product/ProductDetailsCard';
import ProductHighlightsCard from '@/components/product/ProductHighlightsCard';
import ProductDescriptionCard from '@/components/product/ProductDescriptionCard';
import ProductReviews from '@/components/product/ProductReviews';
import colors from '@/components/colors';

export default function ProductPage() {
  const { theme } = useTheme();
  const product = products.find(p => p.id === '1');
  
  if (!product) notFound();
  
  // Get background color based on theme
  const bgColor = theme === 'dark' ? colors.darkMode.background : colors.light.cream;
  const [livePrice, setLivePrice] = useState<number | null>(null);
  useEffect(() => {
    const fetchPrice = async () => {
      const response = await fetch(`/api/products/price?id=${product.priceId}`);
      const data = await response.json();
      setLivePrice(data.price);
    };
    fetchPrice();
  }, [product.priceId]);


  
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
            <ProductImageSection imageUrl={product.imageUrl} title={product.title} videoUrl={product.videoUrl} />
          </div>
          
          {/* Product Details */}
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <ProductDetailsCard
              product={product}
              formattedPrice={livePrice !== null ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'CAD'
              }).format(livePrice) : 'Loading...'}
            />
            
            <ProductHighlightsCard description={product.description} />
          </div>
        </div>
        
        {/* Description section */}
        <ProductDescriptionCard description={product.description} />

        {/* Reviews section */}
        {product.reviews && product.reviews.length > 0 && (
          <ProductReviews reviews={product.reviews} etsyUrl={product.etsyUrl} />
        )}
      </div>
    </div>
  );
}