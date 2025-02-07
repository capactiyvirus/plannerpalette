// src/app/(public)/products/1/page.tsx, products/2/page.tsx, etc.
'use client';

import { useEffect } from 'react';
import { products } from '@/data/products';

export default function ProductPage() {
  useEffect(() => {
    const product = products.find(p => p.id === '2'); // Change per page
    if (product) {
      window.location.href = product.etsyUrl;
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" 
         style={{ backgroundColor: '#F9F6F0' }}>
      <div className="text-center">
        <p className="text-2xl" style={{ 
          fontFamily: '"Playfair Display", serif',
          color: '#2c3b3a' 
        }}>
          Redirecting to product...
        </p>
      </div>
    </div>
  );
}