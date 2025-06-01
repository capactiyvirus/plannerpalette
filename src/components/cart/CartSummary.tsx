// src/components/cart/CartSummary.tsx
'use client';

import React, { useState } from 'react';
import { useCart } from '@/components/cart/cartcontext';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';
import { ArrowRight, AlertCircle } from 'lucide-react';

const CartSummary: React.FC = () => {
  const { totalItems, totalPrice } = useCart();
  const { theme } = useTheme();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  
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
    try {
      // Create the payment intent by calling your API
      const response = await fetch('http://localhost:8080/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 2000000, // Amount in cents
          currency: 'usd',
          description: 'Payment for order #1234',
          metadata: {
            customer_id: 'cust_123',
            order_id: 'order_456'
          }
        })
      });
  
      if (!response.ok) {
        throw new Error('Payment intent creation failed');
      }
  
      const data = await response.json();
      
      // Assuming your API returns the client_secret needed for Stripe
      const { clientSecret } = data;
      
      // If you're using Stripe, you would typically redirect to a checkout page
      // or use Stripe Elements to collect payment details
      
      // Option 1: If using Stripe Checkout
      // window.location.href = `https://your-checkout-page?client_secret=${clientSecret}`;
      
      // Option 2: If using Stripe Elements in your app, store the client secret
      // in state and show the payment form
      // setClientSecret(clientSecret);
      // setShowPaymentForm(true);
      
      console.log('Payment intent created successfully', data);
      
      // For demo purposes, we'll just redirect to a success page
      // Replace with your actual checkout flow
      window.location.href = `/checkout/payment?client_secret=${clientSecret}`;
      
    } catch (error) {
      console.error('Error creating payment intent:', error);
      alert('There was an error processing your payment. Please try again.');
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
            className="w-full py-3 rounded-md flex items-center justify-center text-white transition-colors duration-300"
            style={{ backgroundColor: buttonBgColor }}
          >
            Proceed to Checkout
            <ArrowRight size={16} className="ml-2" />
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