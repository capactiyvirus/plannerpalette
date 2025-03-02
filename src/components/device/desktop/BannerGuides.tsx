'use client';
import React, { ReactNode } from 'react';
import colors from '@/components/colors';
import { Calendar, Shield, Heart } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  const { theme } = useTheme();
  
  // Determine the background, text, and icon colors based on theme
  const bgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const titleColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + '99' : colors.dark; // Slightly transparent for paragraph text
  
  // For the icon background, keep the same color but adjust opacity and use theme-appropriate icon color
  const iconBgColor = theme === 'dark' ? `${color}15` : `${color}20`; // Slightly lower opacity in dark mode
  const iconColor = theme === 'dark' ? color : color; // You could adjust this for dark mode if needed
  
  return (
    <div 
      className="p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
      style={{ backgroundColor: bgColor }}
    >
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
        style={{ backgroundColor: iconBgColor, color: iconColor }}
      >
        {icon}
      </div>
      <h3 
        className="text-xl mb-2 transition-colors duration-300"
        style={{ 
          fontFamily: '"Playfair Display", serif',
          color: titleColor 
        }}
      >
        {title}
      </h3>
      <p 
        className="transition-colors duration-300"
        style={{ 
          fontFamily: '"Lora", serif',
          color: textColor 
        }}
      >
        {description}
      </p>
    </div>
  );
};

const BannerGuide = () => {
  const { theme } = useTheme();
  
  // Section background and title colors based on theme
  const sectionBgColor = theme === 'dark' 
    ? colors.darkMode.background  // Semi-transparent dark background
    : `${colors.secondary}20`;
  
  const titleColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  
  return (
    <section 
      className="py-20 transition-colors duration-300" 
      style={{ backgroundColor: sectionBgColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-3xl text-center mb-16 transition-colors duration-300" 
          style={{ 
            fontFamily: '"Playfair Display", serif',
            color: titleColor 
          }}
        >
          Why Choose Our Guides?
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <FeatureCard 
            icon={<Calendar />}
            title="Expertly Crafted"
            description="Created by a storyteller with 15+ years of experience and a B.A. in Creative Writing, our guides transform scattered ideas into cohesive narratives with proven frameworks that bypass common writing pitfalls."
            color={colors.accent2}
          />
          <FeatureCard 
            icon={<Shield />}
            title="Comprehensive Resources"
            description="Beyond surface level advice, our workbooks address the psychological barriers of writing from impostor syndrome to perfectionism with practical exercises that build both skill and confidence."
            color={colors.accent1}
          />
          <FeatureCard 
            icon={<Heart />}
            title="Writer Approved"
            description="Developed alongside emerging authors who faced the same challenges you're experiencing now, our guides have helped countless writers transform their creative vision into structured, publishable stories."
            color={colors.accent3}
          />
        </div>
      </div>
    </section>
  );
};

export default BannerGuide;