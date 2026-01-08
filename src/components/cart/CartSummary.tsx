// src/components/cart/CartSummary.tsx
'use client';

import React, { useState } from 'react';
import { useCart } from '@/components/cart/cartcontext';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';
import { ArrowRight, AlertCircle } from 'lucide-react';



const CartSummary: React.FC = () => {
  const { totalItems, totalPrice, items } = useCart(); // Added 'items' to get cart items
  const { theme } = useTheme();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  
  // Theme-dependent colors
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const accentColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  const inputBgColor = theme === 'dark' ? colors.darkMode.background : 'white';
  const inputBorderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const buttonBgColor = theme === 'dark' ? colors.accent1 + 'DD' : colors.accent1;
  
  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Example promo code validation
    if (promoCode.toLowerCase() === 'writer10') {
      setPromoError('Promo code applied successfully!');
      // In a real app, you would apply the discount here
    } else {
      setPromoError('Invalid promo code');
    }
  };
  
  const handleCheckout = async () => {
    if (totalItems === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsLoading(true);

    try {
      // Map cart items to Stripe format
      // You'll need to add stripePriceId to your product data
      const lineItems = items.map(item => ({
        priceId: item.product.priceId, // Make sure your product objects have this
        quantity: item.quantity
      }));

      // Create Stripe Checkout Session
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          items: lineItems,
          promoCode: promoCode || null // Pass promo code if applied
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
      
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('There was an error processing your checkout. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Calculate tax (example: 5% tax)
  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + tax;
  
  return (
    <div className="rounded-lg shadow-sm transition-colors duration-300" style={{ backgroundColor: cardBgColor }}>
      <div className="p-6">
        <h2 className="text-xl mb-6 transition-colors duration-300" style={{
          fontFamily: '"Playfair Display", serif',
          color: headingColor
        }}>
          Order Summary
        </h2>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span style={{ color: textColor }}>Items ({totalItems})</span>
            <span style={{ color: headingColor }}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'CAD'
              }).format(totalPrice)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span style={{ color: textColor }}>Tax (5%)</span>
            <span style={{ color: headingColor }}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'CAD'
              }).format(tax)}
            </span>
          </div>
          
          <div className="pt-4 mt-4 border-t" style={{ borderColor: inputBorderColor }}>
            <div className="flex justify-between font-medium">
              <span style={{ color: headingColor }}>Total</span>
              <span style={{ color: accentColor }}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'CAD'
                }).format(grandTotal)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Promo Code Form */}
        <div className="mt-6">
          <form onSubmit={handlePromoSubmit}>
            <label 
              htmlFor="promoCode" 
              className="block text-sm mb-2"
              style={{ color: textColor }}
            >
              Promo Code
            </label>
            
            <div className="flex">
              <input
                type="text"
                id="promoCode"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 rounded-l border focus:outline-none transition-colors duration-300"
                style={{ 
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: headingColor
                }}
                placeholder="WRITER10"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r text-white transition-colors duration-300"
                style={{ backgroundColor: buttonBgColor }}
              >
                Apply
              </button>
            </div>
            
            {promoError && (
              <div className="flex items-center mt-2 text-sm" style={{ 
                color: promoError.includes('successfully') 
                  ? 'green' 
                  : (theme === 'dark' ? 'salmon' : 'red') 
              }}>
                <AlertCircle size={14} className="mr-1" />
                {promoError}
              </div>
            )}
          </form>
        </div>
        
        {/* Checkout Button */}
        <div className="mt-8">
          <button
            onClick={handleCheckout}
            disabled={isLoading || totalItems === 0}
            className="w-full py-3 rounded-md flex items-center justify-center text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: buttonBgColor }}
          >
            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
            {!isLoading && <ArrowRight size={16} className="ml-2" />}
          </button>
          
          <p className="text-xs mt-4 text-center" style={{ color: textColor }}>
            By proceeding, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;