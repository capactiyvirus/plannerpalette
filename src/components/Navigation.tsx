// src/components/Navigation.tsx (Updated)
'use client';
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/ThemeToggle';
import CartIcon from '@/components/cart/carticon';
import colors from '@/components/colors';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

const Navigation = ({ title = "Literary Haven" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  
  return (
    <>
      <header className="fixed top-0 w-full z-40 shadow-sm transition-colors" 
        style={{ 
          backgroundColor: theme === 'dark' ? colors.darkMode.background : 'white',
          color: theme === 'dark' ? colors.darkMode.text : colors.primary
        }}>
        <div className="flex justify-between items-center p-2">
          <Link href="/">
            <h1 className="text-lg font-serif" 
            style={{ 
                color: theme === 'dark' ? colors.darkMode.text : colors.primary,
                height: '24px'
            }}>
              {title}
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <CartIcon />
            <ThemeToggle />
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <Navbar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className="pt-10">
        {/* Content will be rendered as children */}
      </div>
    </>
  );
};

export default Navigation;