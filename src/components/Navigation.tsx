'use client';
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Navbar from '@/components/Navbar'; // Your existing Navbar component
import colors from '@/components/colors';
import Link from 'next/link';

interface NavigationProps {
  title?: string;
  bgColor?: string;
  textColor?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  title = "Literary Haven",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      <header className="fixed top-0 w-full bg-white z-40 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <Link href="/">
            <h1 className="text-xl font-serif" 
            style={{ 
                color: colors.primary,
                height: '32px' // Match this to your header height
                
                }}>
              {title}
            </h1>
          </Link>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
      <Navbar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {/* Add padding to content to account for fixed header */}
      <div className="pt-16">
        {/* Content will be rendered as children */}
      </div>
    </>
  );
};

export default Navigation;