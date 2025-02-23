import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pen, BookOpen, ScrollText, Menu, X } from 'lucide-react';

const colors = {
  primary: '#2c3b3a',    // Deep teal
  secondary: '#a2a282',  // Sage
  accent1: '#6e725a',    // Olive
  accent2: '#798274',    // Muted green
  accent3: '#7c8c76',    // Forest green
  dark: '#414138',       // Deep olive
  darkTeal: '#2b3b38',   // Dark teal
  light: {
    parchment: '#F5E6D3',
    sage: '#E8E6D9',
    mint: '#E6EDE8',
    cream: '#F9F6F0',
    stone: '#E8E6E1'
  }
};

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
    }

// Mobile navigation menu component
const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => (
  <motion.div
    initial={{ x: '100%' }}
    animate={{ x: isOpen ? 0 : '100%' }}
    transition={{ type: 'tween' }}
    className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50"
  >
    <div className="p-4">
      <button onClick={onClose} className="mb-8">
        <X className="h-6 w-6" />
      </button>
      <nav className="space-y-4">
        <a href="#" className="block py-2 text-lg" style={{ color: colors.primary }}>Home</a>
        <a href="#" className="block py-2 text-lg" style={{ color: colors.primary }}>Resources</a>
        <a href="#" className="block py-2 text-lg" style={{ color: colors.primary }}>Products</a>
        <a href="#" className="block py-2 text-lg" style={{ color: colors.primary }}>Contact</a>
      </nav>
    </div>
  </motion.div>
);

// Mobile-optimized TypewriterEffect
const MobileTypewriterEffect = () => {
  const [text, setText] = useState('');
  const quotes = [
    "Once upon a time...",
    "Through the ink of inspiration...",
    "Where imagination roams..."
  ];

  useEffect(() => {
    let currentQuoteIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentQuote = quotes[currentQuoteIndex];

      if (!isDeleting && currentCharIndex < currentQuote.length) {
        setText(currentQuote.slice(0, currentCharIndex + 1));
        currentCharIndex++;
      } else if (isDeleting && currentCharIndex > 0) {
        setText(currentQuote.slice(0, currentCharIndex - 1));
        currentCharIndex--;
      } else if (currentCharIndex === 0) {
        isDeleting = false;
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      } else {
        isDeleting = true;
      }
    };

    const timer = setInterval(type, isDeleting ? 50 : 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center py-4 px-2" style={{ color: colors.accent2 }}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg italic"
      >
        {text}
      </motion.p>
    </div>
  );
};

const MobileHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="fixed top-0 w-full bg-white z-40 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-serif" style={{ color: colors.primary }}>
            Literary Haven
          </h1>
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Mobile Hero Section */}
      <section className="pt-20" style={{ backgroundColor: colors.primary }}>
        <div className="px-4 py-12 text-center">
          <h2 className="text-3xl text-white mb-4 font-serif">
            Craft Your Story
          </h2>
          <p className="text-gray-200 mb-6">
            Discover the art of storytelling through our curated resources.
          </p>
          <MobileTypewriterEffect />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 text-white rounded-none border-2 mt-4"
            style={{ borderColor: colors.accent1 }}
          >
            Begin Your Journey
          </motion.button>
        </div>
      </section>

      {/* Mobile Resources Grid */}
      <section className="px-4 py-12">
        <h3 className="text-2xl text-center mb-8 font-serif" style={{ color: colors.primary }}>
          Writing Resources
        </h3>
        <div className="space-y-6">
          {[
            {
              icon: <Pen />,
              title: "Character Creation",
              description: "Master the art of crafting memorable characters."
            },
            {
              icon: <BookOpen />,
              title: "World Building",
              description: "Create immersive worlds for your stories."
            },
            {
              icon: <ScrollText />,
              title: "Plot Development",
              description: "Structure your narrative effectively."
            }
          ].map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 bg-white shadow-sm rounded-lg"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: colors.accent1, color: 'white' }}
              >
                {resource.icon}
              </div>
              <h4 className="text-lg mb-2" style={{ color: colors.primary }}>
                {resource.title}
              </h4>
              <p className="text-sm" style={{ color: colors.dark }}>
                {resource.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MobileHome;