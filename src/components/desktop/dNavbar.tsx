'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import ConstructionBanner from "@/components/construction";

const colors = {
  primary: '#2c3b3a',    
  secondary: '#a2a282',  
  accent1: '#6e725a',    
  accent2: '#798274',    
  accent3: '#7c8c76',    
  dark: '#414138',       
  darkTeal: '#2b3b38',   
  light: {
    parchment: '#F5E6D3',
    sage: '#E8E6D9',
    mint: '#E6EDE8',
    cream: '#F9F6F0',
    stone: '#E8E6E1'
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Store', href: '/store' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="w-full fixed top-0 z-50 shadow-sm" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <ConstructionBanner></ConstructionBanner>
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center">
          
            <span className="text-xl font-serif text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
              
              Literary Haven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-200 hover:text-white transition-colors duration-200 font-serif"
                style={{ fontFamily: '"Lora", serif' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
        style={{ backgroundColor: colors.darkTeal }}
      >
        <div className="px-4 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block py-2 text-gray-200 hover:text-white transition-colors duration-200 font-serif"
              style={{ fontFamily: '"Lora", serif' }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
              
        
      </motion.div>
    </nav>
  );
};

export default Navbar;