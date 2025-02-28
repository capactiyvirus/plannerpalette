// src/components/desktop/TextEffect.tsx
'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
//import { animationState, instances } from 'framer-motion/types';

// Color definitions
const colors = {
  // Your color definitions here...
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

// Define the structure of each text instance
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

// Define the structure for our animation state tracking
interface AnimationState {
  currentText: string;
  isTyping: boolean;
  // Use NodeJS.Timeout type for the timer
  timer: NodeJS.Timeout | null;
}

const TypewriterEffect = () => {
  // State to track all text instances
  const [instances, setInstances] = useState<TextInstance[]>([]);
  // State to track vertical scroll position
  const [scrollY, setScrollY] = useState(0);
  
  // Array of quotes to display in the animation
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

  // Keep track of animation states without triggering re-renders
  // This is a new addition to prevent blinking
  const animationStates = useRef<AnimationState[]>(
    Array(30).fill(null).map(() => ({
      currentText: '',
      isTyping: true,
      timer: null
    }))
  ).current;

  // Generate random position for text, taking scroll position into account
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

  // Get random quote index, avoiding repeats if possible
  const getRandomText = useCallback((previousIndex: number) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * writingQuotes.length);
    } while (newIndex === previousIndex && writingQuotes.length > 1);
    return newIndex;
  }, [writingQuotes]);

  // Track scroll position to adjust text positions
  useEffect(() => {
    // Function to update scrollY state when user scrolls
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize instances and set up animations
  useEffect(() => {
    // Clear all existing timers when component updates
    animationStates.forEach(state => {
      if (state.timer) clearTimeout(state.timer);
    });

    // Create initial instances
    const initialInstances = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      text: '',
      position: generatePosition(),
      isMoving: false,
      selectedTextIndex: getRandomText(-1)
    }));
    
    // Set initial state
    setInstances(initialInstances);

    // Function to batch updates to prevent flickering
    const batchUpdateInstances = () => {
      // Create a copy of the current instances
      const updatedInstances = [...instances.length ? instances : initialInstances];
      
      // Apply all pending text updates at once
      animationStates.forEach((state, idx) => {
        if (idx < updatedInstances.length) {
          updatedInstances[idx] = {
            ...updatedInstances[idx],
            text: state.currentText
          };
        }
      });
      
      // Update state once with all changes
      setInstances(updatedInstances);
    };

    // Set up animation for each instance
    initialInstances.forEach((instance, index) => {
      // Initialize animation state for this instance
      animationStates[index] = {
        currentText: '',
        isTyping: true,
        timer: null
      };

      // Animation function
      const animate = () => {
        // Get the current state of this instance
        const currentInstance = instances[index] || initialInstances[index];
        const fullText = writingQuotes[currentInstance.selectedTextIndex];
        const animState = animationStates[index];

        if (animState.isTyping) {
          if (animState.currentText.length < fullText.length) {
            // Update the text in our local state
            animState.currentText = fullText.slice(0, animState.currentText.length + 1);
            
            // Schedule the next animation step
            animState.timer = setTimeout(() => {
              // Update the React state occasionally (not on every character)
              if (animState.currentText.length % 3 === 0 || animState.currentText.length === fullText.length) {
                batchUpdateInstances();
              }
              animate();
            }, 100);
          } else {
            // Pause at the end of typing
            animState.timer = setTimeout(() => {
              animState.isTyping = false;
              animate();
            }, 2000);
          }
        } else {
          if (animState.currentText.length > 0) {
            // Erase the text
            animState.currentText = animState.currentText.slice(0, -1);
            
            // Schedule the next animation step
            animState.timer = setTimeout(() => {
              // Update the React state occasionally (not on every character)
              if (animState.currentText.length % 3 === 0 || animState.currentText.length === 0) {
                batchUpdateInstances();
              }
              animate();
            }, 50);
          } else {
            // Prepare for a new position and text
            animState.isTyping = true;
            
            // Update position in the React state
            setInstances(prevState => {
              const updatedState = [...prevState];
              updatedState[index] = {
                ...updatedState[index],
                isMoving: true,
                selectedTextIndex: getRandomText(currentInstance.selectedTextIndex)
              };
              return updatedState;
            });
            
            // Move to new position after a delay
            animState.timer = setTimeout(() => {
              setInstances(prevState => {
                const updatedState = [...prevState];
                updatedState[index] = {
                  ...updatedState[index],
                  position: generatePosition(),
                  isMoving: false
                };
                return updatedState;
              });
              
              // Reset text and continue animation
              animState.currentText = '';
              animate();
            }, 1000);
          }
        }
      };

      // Start animation with a staggered delay
      animationStates[index].timer = setTimeout(() => animate(), index * 1000);
    });

    // Clean up timers on unmount
    return () => {
      animationStates.forEach(state => {
        if (state.timer) clearTimeout(state.timer);
      });
    };
  }, [generatePosition, getRandomText, writingQuotes, instances.length, instances, animationStates]);

  return (
    // Add -z-10 to move text behind other elements
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" >
      <div className="relative w-full h-full">
        <AnimatePresence>
          {instances.map((instance) => (
            <motion.div
              key={instance.id}
              className="absolute"
              // Use Framer Motion for smoother transitions
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: instance.isMoving ? 0 : 0.7,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
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
                pointerEvents: 'none',
                // Add CSS transition for smoother movement
                transition: 'top 0.5s ease-in-out, left 0.5s ease-in-out'
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