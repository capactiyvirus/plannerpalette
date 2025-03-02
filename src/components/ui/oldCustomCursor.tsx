// src/components/ui/CustomCursor.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  
  useEffect(() => {
    // Update cursor position
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    
    // Handle mouse enter/leave window
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);
    
    // Check if cursor is over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if element is clickable using multiple boolean checks
      const isButton = target.tagName === 'BUTTON';
      const isLink = target.tagName === 'A';
      const hasLinkParent = target.closest('a') !== null;
      const hasButtonParent = target.closest('button') !== null;
      const hasPointerCursor = target.style.cursor === 'pointer';
      const computedCursorIsPointer = window.getComputedStyle(target).cursor === 'pointer';
      
      // Combine all checks into a single boolean
      const isClickable = isButton || isLink || hasLinkParent || hasButtonParent || 
                          hasPointerCursor || computedCursorIsPointer;
      
      setIsHovering(isClickable);
    };
    
    // Add all event listeners
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    
    // Clean up all event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [visible]);
  
  // Don't render cursor on server-side
  if (typeof window === 'undefined') return null;
  
  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 1.5 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          mass: 0.1,
          stiffness: 800,
          damping: 30,
          opacity: { duration: 0.2 }
        }}
        style={{
          height: '12px',
          width: '12px',
          backgroundColor: 'white',
          marginLeft: '-6px',
          marginTop: '-6px',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Cursor outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border-2"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 1.2 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          mass: 0.4,
          stiffness: 400,
          damping: 25,
          opacity: { duration: 0.2 }
        }}
        style={{
          height: '40px',
          width: '40px',
          borderColor: 'white',
          marginLeft: '-20px',
          marginTop: '-20px',
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
}