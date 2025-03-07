'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Info, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import colors from '@/components/colors';

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'About', path: '/about', icon: <Info className="h-4 w-4" /> },
    { name: 'Products', path: '/products', icon: <ShoppingBag className="h-4 w-4" /> },
    //{ name: 'Contact', path: '/contact', icon: <Mail className="h-4 w-4" /> }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-auto max-h-[300px] w-64 shadow-lg z-50 rounded-bl-lg"
            style={{ backgroundColor: colors.light.parchment }}
          >
            <div className="p-3 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-serif" style={{ 
                  color: colors.primary,
                  fontFamily: '"Playfair Display", serif'
                }}>
                  Menu
                </h3>
                <button 
                  onClick={onClose} 
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  style={{ color: colors.accent1 }}
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <nav className="space-y-0.5">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link 
                      href={link.path}
                      className="flex items-center py-2 px-2 rounded-md hover:bg-white transition-colors"
                      style={{ 
                        color: colors.primary,
                        fontFamily: '"Playfair Display", serif',
                        borderBottom: `1px solid ${colors.secondary}20`
                      }}
                      onClick={onClose}
                    >
                      <span className="mr-3" style={{ color: colors.accent1 }}>
                        {link.icon}
                      </span>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="pt-3 text-center">
                <p className="text-xs italic" style={{ 
                  color: colors.accent2,
                  fontFamily: '"Lora", serif' 
                }}>
                  Every word holds infinite possibilities.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Navbar;