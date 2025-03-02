'use client';

import React, { useState } from 'react';
import { products } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import colors from '@/components/colors';
import { useTheme } from '@/context/ThemeContext';

export default function ProductsPage() {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');

  // Theme-dependent colors
  const bgColor = theme === 'dark' ? colors.darkMode.background : colors.light.cream;
  const heroBgColor = theme === 'dark' ? colors.darkMode.primary : colors.primary;
  const heroTextColor = theme === 'dark' ? colors.darkMode.text : 'white';
  const heroSubtextColor = theme === 'dark' ? colors.darkMode.text : colors.light.parchment;
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : 'text-gray-600';
  const inactiveFilterTextColor = theme === 'dark' ? colors.darkMode.text + '99' : 'text-gray-700';
  const newsletterBgColor = theme === 'dark' ? colors.darkMode.cardBg + '40' : colors.light.sage + '40';
  const priceTagBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const priceTagTextColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  const fileTypeBgColor = theme === 'dark' ? colors.accent1 + '40' : 'bg-blue-100';
  const fileTypeTextColor = theme === 'dark' ? colors.light.parchment : 'text-blue-800';
  const linkColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  const inputBgColor = theme === 'dark' ? colors.darkMode.background : 'white';
  const inputBorderColor = theme === 'dark' ? colors.darkMode.cardBg : colors.accent3;
  const inputTextColor = theme === 'dark' ? colors.darkMode.text : 'inherit';
  const buttonBgColor = theme === 'dark' ? colors.accent1 + 'CC' : colors.accent1;
  const noResultsTextColor = theme === 'dark' ? colors.darkMode.text + '99' : 'text-gray-500';

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
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      {/* Hero Banner */}
      <div 
        className="relative py-20 transition-colors duration-300" 
        style={{ backgroundColor: heroBgColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6 transition-colors duration-300" style={{
            fontFamily: '"Playfair Display", serif',
            color: heroTextColor
          }}>
            Writing Guides & Resources
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 transition-colors duration-300" style={{
            fontFamily: '"Lora", serif',
            color: heroSubtextColor
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
              className={`px-4 py-2 rounded-lg transition-colors duration-200`}
              style={{
                backgroundColor: activeFilter === filter.id 
                  ? colors.accent1 
                  : 'transparent',
                color: activeFilter === filter.id 
                  ? 'white' 
                  : inactiveFilterTextColor,
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
              className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              style={{ backgroundColor: cardBgColor }}
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
                <div className="absolute top-4 right-4 p-2 rounded-full shadow-sm transition-colors duration-300"
                     style={{ backgroundColor: priceTagBgColor }}>
                  <span className="text-sm font-medium" 
                        style={{ color: priceTagTextColor }}>
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl mb-2 transition-colors duration-300" style={{ 
                    fontFamily: '"Playfair Display", serif',
                    color: headingColor
                  }}>
                    {product.title}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs transition-colors duration-300"
                        style={{
                          backgroundColor: fileTypeBgColor,
                          color: fileTypeTextColor
                        }}>
                    {product.fileType}
                  </span>
                </div>
                
                <p className="mb-4 line-clamp-3 transition-colors duration-300" style={{ 
                  fontFamily: '"Lora", serif',
                  color: textColor
                }}>
                  {product.description.split('\n')[0]}
                </p>
                
                <Link 
                  href={`/products/${product.id}`} 
                  className="inline-flex items-center text-sm font-medium transition-colors duration-200 hover:underline"
                  style={{ color: linkColor }}
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
            <p className="text-lg transition-colors duration-300" 
               style={{ color: noResultsTextColor }}>
              No products found matching your filter.
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <section className="py-12 px-4 transition-colors duration-300" 
               style={{ backgroundColor: newsletterBgColor }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl mb-4 transition-colors duration-300" style={{ 
            fontFamily: '"Playfair Display", serif',
            color: headingColor
          }}>
            Get Writing Tips & Special Offers
          </h2>
          <p className="mb-6 transition-colors duration-300" style={{ 
            fontFamily: '"Lora", serif',
            color: textColor
          }}>
            Join our writing community to receive exclusive tips, early access to new guides, and special discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded border focus:outline-none focus:ring-2 transition-colors duration-300"
              style={{ 
                backgroundColor: inputBgColor,
                borderColor: inputBorderColor,
                color: inputTextColor,
                fontFamily: '"Lora", serif'
              }}
            />
            <button
              className="px-6 py-3 text-white rounded transition-colors duration-200 hover:opacity-90"
              style={{ 
                backgroundColor: buttonBgColor,
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