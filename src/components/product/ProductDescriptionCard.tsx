// src/components/product/ProductDescriptionCard.tsx
'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';
import { CheckCircle, Star, Package, AlertCircle } from 'lucide-react';

interface ProductDescriptionCardProps {
  description: string;
}

interface Section {
  title: string;
  content: string[];
  icon?: React.ReactNode;
}

export default function ProductDescriptionCard({ description }: ProductDescriptionCardProps) {
  const { theme } = useTheme();

  // Theme-dependent colors
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const accentColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  const sectionBgColor = theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  // Parse description into sections
  const parseDescription = (desc: string): { intro: string; sections: Section[] } => {
    const lines = desc.split('\n').map(line => line.trim()).filter(Boolean);
    const sections: Section[] = [];
    let intro = '';
    let currentSection: Section | null = null;

    for (const line of lines) {
      // Check if line is a section header (ends with ':' or is all caps)
      const isHeader = line.endsWith(':') || (line === line.toUpperCase() && line.length > 3 && !line.startsWith('-'));

      if (isHeader) {
        if (currentSection) sections.push(currentSection);
        const title = line.replace(':', '').replace(/[✨🎯📚]/g, '').trim();
        currentSection = {
          title,
          content: [],
          icon: getIconForSection(title)
        };
      } else if (line.startsWith('-') || line.startsWith('•')) {
        if (currentSection) {
          currentSection.content.push(line.replace(/^[-•]\s*/, ''));
        }
      } else if (!currentSection && !intro) {
        intro = line;
      } else if (!currentSection) {
        intro += ' ' + line;
      }
    }

    if (currentSection) sections.push(currentSection);
    return { intro, sections };
  };

  const getIconForSection = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('included') || lowerTitle.includes('features')) {
      return <Package className="w-5 h-5" />;
    }
    if (lowerTitle.includes('perfect') || lowerTitle.includes('ideal')) {
      return <Star className="w-5 h-5" />;
    }
    if (lowerTitle.includes('note') || lowerTitle.includes('important')) {
      return <AlertCircle className="w-5 h-5" />;
    }
    return <CheckCircle className="w-5 h-5" />;
  };

  const { intro, sections } = parseDescription(description);

  return (
    <div className="mt-12">
      {/* Intro Section */}
      {intro && (
        <div className="p-8 rounded-lg shadow-sm mb-6 transition-colors duration-300" style={{ backgroundColor: cardBgColor }}>
          <p className="text-lg leading-relaxed transition-colors duration-300" style={{
            fontFamily: '"Lora", serif',
            color: textColor
          }}>
            {intro}
          </p>
        </div>
      )}

      {/* Sectioned Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
            style={{
              backgroundColor: cardBgColor,
              borderLeft: `4px solid ${accentColor}`
            }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <div style={{ color: accentColor }}>
                {section.icon}
              </div>
              <h3 className="text-lg font-semibold transition-colors duration-300" style={{
                fontFamily: '"Playfair Display", serif',
                color: headingColor
              }}>
                {section.title}
              </h3>
            </div>

            {/* Section Content */}
            <ul className="space-y-2">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <CheckCircle
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: accentColor }}
                  />
                  <span className="text-sm transition-colors duration-300" style={{
                    fontFamily: '"Lora", serif',
                    color: textColor,
                    lineHeight: '1.6'
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}