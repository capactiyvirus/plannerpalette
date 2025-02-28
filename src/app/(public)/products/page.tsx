'use client';

import React, { useState } from 'react';
import { products } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// Color palette from your design system
const colors = {
  primary: '#2c3b3a',    // Deep teal
  secondary: '#a2a282',  // Sage
  accent1: '#6e725a',    // Olive
  accent2: '#798274',    // Muted green
  accent3: '#7c8c76',    // Forest green
  dark: '#414138',       // Deep olive
  darkTeal: '#2b3b38',   // Dark teal
  light: {
    parchment: '#F5E6D3',  // Warm light background
    sage: '#E8E6D9',       // Light sage
    mint: '#E6EDE8',       // Light mint
    cream: '#F9F6F0',      // Cream
    stone: '#E8E6E1'       // Light stone
  }
};

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter function
  const getFilteredProducts = () => {
    if (activeFilter === 'all') {
      return products;
    }
    return products.filter(product => {
      const description = product.description.toLowerCase();
      if (activeFilter === 'fantasy') {
        return description.includes('fantasy') || description.includes('world-building');
      }
      if (activeFilter === 'romance') {
        return description.includes('romance') || description.includes('spicy');
      }
      if (activeFilter === 'character') {
        return description.includes('character');
      }
      return true;
    });
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.light.cream }}>
      {/* Hero Banner */}
      <div 
        className="relative py-20" 
        style={{ backgroundColor: colors.primary }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6" style={{
            fontFamily: '"Playfair Display", serif',
            color: 'white'
          }}>
            Writing Guides & Resources
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8" style={{
            fontFamily: '"Lora", serif',
            color: colors.light.parchment
          }}>
            Discover our collection of professionally crafted writing guides to enhance your storytelling journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'fantasy', label: 'Fantasy Writing' },
            { id: 'romance', label: 'Romance & Spicy' },
            { id: 'character', label: 'Character Development' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeFilter === filter.id 
                  ? 'text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={{
                backgroundColor: activeFilter === filter.id ? colors.accent1 : 'transparent',
                fontFamily: '"Lora", serif'
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative h-64 w-full">
                <Image 
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm">
                  <span className="text-sm font-medium" style={{ color: colors.accent1 }}>
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl mb-2" style={{ 
                    fontFamily: '"Playfair Display", serif',
                    color: colors.primary 
                  }}>
                    {product.title}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">
                    {product.fileType}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3" style={{ 
                  fontFamily: '"Lora", serif' 
                }}>
                  {product.description.split('\n')[0]}
                </p>
                
                <Link 
                  href={`/products/${product.id}`} 
                  className="inline-flex items-center text-sm font-medium transition-colors duration-200"
                  style={{ color: colors.accent1 }}
                >
                  View on Etsy
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No products found matching your filter.</p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <section className="py-12 px-4" style={{ backgroundColor: colors.light.sage + '40' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl mb-4" style={{ 
            fontFamily: '"Playfair Display", serif',
            color: colors.primary 
          }}>
            Get Writing Tips & Special Offers
          </h2>
          <p className="mb-6" style={{ 
            fontFamily: '"Lora", serif',
            color: colors.dark
          }}>
            Join our writing community to receive exclusive tips, early access to new guides, and special discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded border focus:outline-none focus:ring-2"
              style={{ 
                borderColor: colors.accent3,
                fontFamily: '"Lora", serif'
              }}
            />
            <button
              className="px-6 py-3 text-white rounded transition-colors duration-200"
              style={{ 
                backgroundColor: colors.accent1,
                fontFamily: '"Lora", serif'
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}