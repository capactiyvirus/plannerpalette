'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const colors = {
  primary: '#2c3b3a',    // Deep teal
  secondary: '#a2a282',  // Sage
  accent1: '#6e725a',    // Olive
  accent2: '#798274',    // Muted green
  accent3: '#7c8c76',    // Forest green
  dark: '#414138',       // Deep olive
  darkTeal: '#2b3b38',   // Dark teal

  light: {
    parchment: '#F5E6D3',  // Warm light background
    sage: '#E8E6D9',       // Light sage
    mint: '#E6EDE8',       // Light mint
    cream: '#F9F6F0',      // Cream
    stone: '#E8E6E1'       // Light stone
  }
};

interface TextInstance {
  id: number;
  text: string;
  position: {
      top: string;
      left: string;
      rotation: number;
  };
  isMoving: boolean;
  selectedTextIndex: number;
}

const TypewriterEffect = () => {
  const [instances, setInstances] = useState<TextInstance[]>([]);
  const [scrollY, setScrollY] = useState(0);
  
  const writingQuotes = React.useMemo(() => [
    "Once upon a time... Words became stories, and stories became adventures.",
    "In the realm of imagination, every word holds infinite possibilities.",
    "Through the ink of inspiration flows the magic of creation.",
    "Stories weave threads of imagination into tapestries of wonder.",
    "Every blank page is a canvas awaiting your creative touch.",
    "Words are the bridges between reality and dreams.",
    "In the quiet moments, stories whisper their secrets.",
    "Where imagination roams, stories find their way home.",
  ], []);

  // Use useCallback to memoize these functions
  const generatePosition = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const randomTop = Math.random() * (viewportHeight * 0.7) + (viewportHeight * 0.15);
    const random = Math.random() * 2 - 1;
    return {
      top: `${randomTop + scrollY}px`,
      left: `${random * 50 + 50}%`,
      rotation: Math.random() * 10 - 5
    };
  }, [scrollY]);

  const getRandomText = useCallback((previousIndex: number) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * writingQuotes.length);
    } while (newIndex === previousIndex && writingQuotes.length > 1);
    return newIndex;
  }, [writingQuotes]);

  // Add scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize instances
  useEffect(() => {
    const initialInstances = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      text: '',
      position: generatePosition(),
      isMoving: false,
      selectedTextIndex: getRandomText(-1)
    }));
    setInstances(initialInstances);

    // Create animation controllers for each instance
    const animationTimers: NodeJS.Timeout[] = [];

    initialInstances.forEach((instance, index) => {
      let currentText = '';
      let isTyping = true;

      const animate = () => {
        // Get the current state of this instance
        setInstances(prev => {
          const currentPrev = [...prev];
          const currentInstance = currentPrev[index];
          const fullText = writingQuotes[currentInstance.selectedTextIndex];

          if (isTyping) {
            if (currentText.length < fullText.length) {
              currentText = fullText.slice(0, currentText.length + 1);
              currentPrev[index] = { 
                ...currentInstance, 
                text: currentText 
              };
              
              animationTimers.push(setTimeout(animate, 100));
            } else {
              animationTimers.push(setTimeout(() => {
                isTyping = false;
                animate();
              }, 2000));
            }
          } else {
            if (currentText.length > 0) {
              currentText = currentText.slice(0, -1);
              currentPrev[index] = { 
                ...currentInstance, 
                text: currentText 
              };
              
              animationTimers.push(setTimeout(animate, 50));
            } else {
              isTyping = true;
              const newSelectedTextIndex = getRandomText(currentInstance.selectedTextIndex);
              
              currentPrev[index] = {
                ...currentInstance,
                isMoving: true,
                selectedTextIndex: newSelectedTextIndex
              };
              
              animationTimers.push(setTimeout(() => {
                setInstances(prevState => {
                  const updatedPrev = [...prevState];
                  updatedPrev[index] = {
                    ...updatedPrev[index],
                    position: generatePosition(),
                    isMoving: false
                  };
                  return updatedPrev;
                });
                
                currentText = '';
                animate();
              }, 1000));
            }
          }
          
          return currentPrev;
        });
      };

      animationTimers.push(setTimeout(() => animate(), index * 1000));
    });

    // Cleanup all timers on unmount
    return () => {
      animationTimers.forEach(timer => clearTimeout(timer));
    };
  }, [generatePosition, getRandomText, writingQuotes]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      <div className="relative w-full h-full">
        <AnimatePresence>
          {instances.map((instance) => (
            <motion.div
              key={instance.id}
              className="absolute"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: `${colors.accent2}`,
                top: instance.position.top,
                left: instance.position.left,
                transform: `rotate(${instance.position.rotation}deg)`,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                fontSize: '1.5rem',
                lineHeight: '1.5',
                maxWidth: 'none',
                opacity: instance.isMoving ? 0 : 0.7,
                pointerEvents: 'none'
              }}
            >
              {instance.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TypewriterEffect;