'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Pen, BookOpen, ScrollText } from 'lucide-react';

// Original color palette you provided
const colors = {
  // Your original colors
  primary: '#2c3b3a',    // Deep teal
  secondary: '#a2a282',  // Sage
  accent1: '#6e725a',    // Olive
  accent2: '#798274',    // Muted green
  accent3: '#7c8c76',    // Forest green
  dark: '#414138',       // Deep olive
  darkTeal: '#2b3b38',   // Dark teal

  // Adding lighter complementary colors
  light: {
    parchment: '#F5E6D3',  // Warm light background
    sage: '#E8E6D9',       // Light sage
    mint: '#E6EDE8',       // Light mint
    cream: '#F9F6F0',      // Cream
    stone: '#E8E6E1'       // Light stone
  }
};

// Let's create some additional complementary colors for the literary elements
// const literaryAccents = {
//   parchment: '#F5E6D3',  // Light background
//   goldLeaf: '#D4AF37',   // For decorative elements
//   inkSpots: '#2A2922'    // For contrast elements
// };


const EnhancedBackgroundEffect = () => {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      {/* Primary floating circle */}
      <motion.div
        className="absolute"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.accent3} 0%, transparent 70%)`,
          top: '5%',
          left: '10%',
          opacity: 0.15,
          filter: 'blur(40px)'
        }}
        animate={{
          y: [0, 100, 0],
          x: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Secondary floating circle */}
      <motion.div
        className="absolute"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
          bottom: '15%',
          right: '5%',
          opacity: 0.15,
          filter: 'blur(40px)'
        }}
        animate={{
          y: [0, -80, 0],
          x: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Accent floating circle */}
      <motion.div
        className="absolute"
        style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.accent1} 0%, transparent 70%)`,
          top: '40%',
          left: '30%',
          opacity: 0.12,
          filter: 'blur(40px)'
        }}
        animate={{
          y: [-50, 50, -50],
          x: [-30, 30, -30],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced writing lines */}
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute h-1"
          style={{
            left: 0,
            right: 0,
            top: `${15 + index * 10}%`,
            background: `linear-gradient(90deg, transparent 0%, ${colors.accent2} 50%, transparent 100%)`,
            opacity: 0.1
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 15 + index * 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const buttonVariants = {
  initial: {
    backgroundColor: colors.accent1,
    borderColor: colors.secondary,
  },
  hover: {
    backgroundColor: colors.accent2,
  }
};


export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: `${colors.secondary}` }}>
      {/* Hero Section with Decorative Elements */}
      <EnhancedBackgroundEffect  />
      <div className="relative z-10">
      <section className="relative py-24" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="font-serif text-5xl md:text-7xl text-white mb-6" style={{
                fontFamily: '"Playfair Display", serif'
              }}>
                Craft Your Story
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto font-serif" style={{
                fontFamily: '"Lora", serif'
              }}>
                Discover the art of storytelling through our carefully curated collection of writing guides and resources.
              </p>
            </motion.div>
              
            <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 text-white rounded-none border-2 transition-all duration-300 font-serif tracking-wide"
          >
            Begin Your Journey
          </motion.button>
          </div>
        </div>
      </section>
      
      {/* Featured Writing Resources */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif" style={{
              fontFamily: '"Playfair Display", serif',
              color: colors.primary
            }}>
              Writing Resources
            </h2>
            <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: colors.accent1 }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Pen />,
                title: "Character Creation",
                description: "Master the art of crafting memorable characters with depth and authenticity."
              },
              {
                icon: <BookOpen />,
                title: "World Building",
                description: "Create immersive worlds that capture your readers' imagination."
              },
              {
                icon: <ScrollText />,
                title: "Plot Development",
                description: "Structure your narrative with professional plotting techniques."
              }
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-8 hover:shadow-lg transition-all duration-300 bg-white bg-opacity-90"
                style={{ borderColor: colors.accent3 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: colors.accent1, color: 'white' }}>
                  {resource.icon}
                </div>
                <h3 className="text-xl font-serif mb-4" style={{
                  fontFamily: '"Playfair Display", serif',
                  color: colors.primary
                }}>
                  {resource.title}
                </h3>
                <p style={{ color: colors.dark }}>
                  {resource.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </div>
  );
}