// components/mobile/MobileTypewriterEffect.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MobileTypewriterEffectProps {
  quotes?: string[];
  textColor?: string;
  height?: string;
}

const MobileTypewriterEffect: React.FC<MobileTypewriterEffectProps> = ({ 
  quotes = [
    "Once upon a time...",
    "Through the ink of inspiration...",
    "Where imagination roams..."
  ],
  textColor = '#F5E6D3',
  height = 'h-12'
}) => {
  const [text, setText] = useState('');

  // Find the longest quote to set minimum width
  const maxLength = Math.max(...quotes.map(quote => quote.length));

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
  }, [quotes]);

  return (
    <div 
      className={`flex items-center justify-center ${height} px-2 mb-2`} 
      style={{ 
        color: textColor,
        minWidth: `${maxLength}ch`
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-base italic min-h-[1.5em] flex items-center justify-center"
      >
        {text || '\u00A0'} {/* Use non-breaking space if text is empty */}
      </motion.p>
    </div>
  );
};

export default MobileTypewriterEffect;