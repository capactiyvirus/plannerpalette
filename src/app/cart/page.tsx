// src/app/cart/page.tsx
'use client';

import React from 'react';
import { useCart } from '@/components/cart/cartcontext';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import CartSummary from '@/components/cart/CartSummary';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, prices } = useCart();
  const { theme } = useTheme();
  
  // Theme-dependent colors
  const bgColor = theme === 'dark' ? colors.darkMode.background : colors.light.cream;
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const heroSectionBg = theme === 'dark' ? colors.darkMode.primary : colors.primary;
  const lightText = theme === 'dark' ? colors.darkMode.text : 'white';
  
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      {/* Hero Section */}
      <div className="relative py-12 transition-colors duration-300" style={{ backgroundColor: heroSectionBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl mb-4 transition-colors duration-300" style={{
              fontFamily: '"Playfair Display", serif',
              color: lightText
            }}>
              Your Shopping Cart
            </h1>
            <p className="text-lg max-w-3xl mx-auto transition-colors duration-300" style={{
              fontFamily: '"Lora", serif',
              color: theme === 'dark' ? colors.darkMode.text : colors.light.parchment
            }}>
              {totalItems > 0 
                ? `You have ${totalItems} item${totalItems > 1 ? 's' : ''} in your cart` 
                : 'Your cart is empty'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length > 0 ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="rounded-lg shadow-sm mb-8 lg:mb-0 transition-colors duration-300" style={{ backgroundColor: cardBgColor }}>
                <div className="p-6">
                  <h2 className="text-xl mb-6 transition-colors duration-300" style={{
                    fontFamily: '"Playfair Display", serif',
                    color: headingColor
                  }}>
                    Cart Items
                  </h2>
                  
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div 
                        key={item.product.id} 
                        className="flex flex-col sm:flex-row items-start sm:items-center py-4"
                        style={{ borderBottom: `1px solid ${borderColor}` }}
                      >
                        {/* Product Image */}
                        <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                          <Image 
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="sm:ml-6 flex-1">
                          <h3 
                            className="text-lg font-medium mb-1 transition-colors duration-300" 
                            style={{ color: headingColor }}
                          >
                            {item.product.title}
                          </h3>
                          <p 
                            className="text-sm mb-3 transition-colors duration-300" 
                            style={{ color: textColor }}
                          >
                            {item.product.fileType}
                          </p>
                          
                          {/* Price and Actions */}
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <span
                              className="font-medium transition-colors duration-300"
                              style={{ color: theme === 'dark' ? colors.light.parchment : colors.accent1 }}
                            >
                              {prices[item.product.id] ? new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'CAD'
                              }).format(prices[item.product.id]) : 'Loading...'}
                            </span>
                            
                            <div className="flex items-center space-x-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center border rounded overflow-hidden" 
                                style={{ borderColor }}
                              >
                                <button 
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="px-2 py-1 transition-colors"
                                  style={{ 
                                    color: item.quantity <= 1 
                                      ? 'gray' 
                                      : (theme === 'dark' ? colors.darkMode.text : colors.primary)
                                  }}
                                >
                                  <Minus size={14} />
                                </button>
                                
                                <span 
                                  className="w-8 text-center transition-colors duration-300" 
                                  style={{ color: textColor }}
                                >
                                  {item.quantity}
                                </span>
                                
                                <button 
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2 py-1 transition-colors"
                                  style={{ color: theme === 'dark' ? colors.darkMode.text : colors.primary }}
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              
                              {/* Remove Button */}
                              <button 
                                onClick={() => removeItem(item.product.id)}
                                className="p-1 rounded-full hover:bg-opacity-10 transition-colors"
                                style={{ 
                                  color: theme === 'dark' ? colors.light.parchment : colors.accent1,
                                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'transparent'
                                }}
                                aria-label="Remove item"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Link 
                      href="/products"
                      className="inline-flex items-center text-sm transition-colors duration-300"
                      style={{ color: theme === 'dark' ? colors.light.parchment : colors.accent1 }}
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-colors duration-300"
              style={{ 
                backgroundColor: theme === 'dark' ? colors.darkMode.cardBg : colors.light.mint,
                color: theme === 'dark' ? colors.light.parchment : colors.accent1 
              }}
            >
              <ShoppingBag size={32} />
            </div>
            
            <h2 
              className="text-2xl mb-4 transition-colors duration-300" 
              style={{ 
                fontFamily: '"Playfair Display", serif',
                color: headingColor 
              }}
            >
              Your cart is empty
            </h2>
            
            <p 
              className="max-w-md mx-auto mb-8 transition-colors duration-300" 
              style={{ 
                fontFamily: '"Lora", serif',
                color: textColor 
              }}
            >
              Looks like you haven&apos;t added any writing resources to your cart yet. 
              Explore our collection to find guides that will help you on your writing journey.
            </p>
            
            <Link 
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md text-white transition-colors duration-300"
              style={{ backgroundColor: theme === 'dark' ? colors.accent1 + 'DD' : colors.accent1 }}
            >
              Explore Writing Resources
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}