'use client'
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface InteractiveButtonProps {
  baseColor: string;
  hoverColor: string;
  children: React.ReactNode;
}

const InteractiveButton = ({ baseColor, hoverColor, children }: InteractiveButtonProps) => {
  return (
    <button 
      className="inline-flex items-center px-8 py-3 rounded-lg text-white transition-all duration-200 hover:shadow-lg"
      style={{ backgroundColor: baseColor }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = hoverColor}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = baseColor}
    >
      {children}
      <ArrowRight className="ml-2 h-5 w-5" />
    </button>
  );
};

export default InteractiveButton;