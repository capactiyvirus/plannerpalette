// src/components/cart/CartIcon.tsx (Updated import path)
'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/cart/cartcontext'; // Make sure this path is correct
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';
import Link from 'next/link';

const CartIcon: React.FC = () => {
  const { totalItems } = useCart();
  const { theme } = useTheme();
  
  const iconColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const badgeColor = theme === 'dark' ? colors.accent1 : colors.accent1;
  
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="h-5 w-5" style={{ color: iconColor }} />
      
      {totalItems > 0 && (
        <span 
          className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs rounded-full text-white"
          style={{ backgroundColor: badgeColor }}
        >
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;