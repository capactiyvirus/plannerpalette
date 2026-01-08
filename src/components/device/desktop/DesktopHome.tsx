'use client';
import React from 'react';
import { products } from '@/data/products';
import FeaturedGuides from '@/components/device/desktop/FeatureGuide';
import colors from '@/components/colors';
import MobileTypewriterEffect from '@/components/TypeWriterEffect';
import BannerGuide from '@/components/device/desktop/BannerGuides';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  
  // Theme-dependent colors
  const bgColor = theme === 'dark' ? colors.darkMode.background : colors.light.cream;
  const heroSectionBg = theme === 'dark' ? colors.darkMode.primary : colors.primary;
  const headingColor = theme === 'dark' ? colors.darkMode.text : 'white';
  const subheadingColor = theme === 'dark' ? colors.darkMode.text : colors.light.parchment;
  const typewriterColor = theme === 'dark' ? colors.light.parchment : "#798274";

  
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      {/* Hero Section */}
      <section className="relative py-20 transition-colors duration-300" style={{ backgroundColor: heroSectionBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-6 transition-colors duration-300" style={{
              //fontFamily: '"Playfair Display", serif',
              color: headingColor
            }}>
              Make Your Novel a Masterpiece
            </h1>
            <p className="text-x2 mb-8 max-w-2xl mx-auto transition-colors duration-300" style={{
              // fontFamily: '"Lora", serif',
              color: subheadingColor
            }}>
              Struggling with plot holes, flat characters, or writer&apos;s block? My specialized workbooks guide you through all the core elements (and finer details) of your story so that you can craft a book readers can&apos;t put down. No more staring at blank pages wondering where to begin.
            </p>
            <div className="flex justify-center w-full">
              <MobileTypewriterEffect 
                quotes={[
                  "Once upon a time... Words became stories, and stories became adventures.",
                  "In the realm of imagination, every word holds infinite possibilities.",
                  "Through the ink of inspiration flows the magic of creation.",
                  "Stories weave threads of imagination into tapestries of wonder.",
                  "Every blank page is a canvas awaiting your creative touch.",
                  "Words are the bridges between reality and dreams.",
                  "In the quiet moments, stories whisper their secrets.",
                  "Where imagination roams, stories find their way home.",
                ]}
                textColor={typewriterColor}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customized usage */}
      <FeaturedGuides 
        products={products}
        title="Writing Resources"
        limit={3}
        backgroundColor={theme === 'dark' ? colors.darkMode.background + '80' : colors.light.parchment + '40'}
      />

      <BannerGuide />
      
      {/* Newsletter
      <section className="py-10 transition-colors duration-300" style={{ backgroundColor: newsletterBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl mb-4 transition-colors duration-300" style={{
              fontFamily: '"Playfair Display", serif',
              color: headingColor
            }}>
              Join Our Writing Community
            </h2>
            <p 
              className="mb-8 transition-colors duration-300"
              style={{
                fontFamily: '"Lora", serif',
                color: subheadingColor
              }}
            >
              Subscribe to receive writing tips, exclusive offers, and updates on new guides
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-none border-2 focus:outline-none transition-colors duration-300"
                style={{
                  fontFamily: '"Lora", serif',
                  backgroundColor: inputBgColor,
                  color: inputTextColor,
                  borderColor: theme === 'dark' ? colors.darkMode.cardBg : 'transparent'
                }}
              />
              <button 
                className="px-6 py-3 text-white transition-all duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: buttonBgColor,
                  fontFamily: '"Lora", serif'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}