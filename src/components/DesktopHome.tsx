'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pen, BookOpen, ScrollText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
  
  const writingQuotes = [
      "Once upon a time... Words became stories, and stories became adventures.",
      "In the realm of imagination, every word holds infinite possibilities.",
      "Through the ink of inspiration flows the magic of creation.",
      "Stories weave threads of imagination into tapestries of wonder.",
      "Every blank page is a canvas awaiting your creative touch.",
      "Words are the bridges between reality and dreams.",
      "In the quiet moments, stories whisper their secrets.",
      "Where imagination roams, stories find their way home.",
  ];

  // Modified to use pixel values instead of percentages
  const generatePosition = () => {
    const viewportHeight = window.innerHeight;
    const randomTop = Math.random() * (viewportHeight * 0.7) + (viewportHeight * 0.15);
    const random = Math.random() * 2 - 1;
    return {
      top: `${randomTop + scrollY}px`,
      left: `${random * 50 + 50}%`,
      rotation: Math.random() * 10 - 5
    };
  };

  const getRandomText = (previousIndex: number) => {
      let newIndex;
      do {
          newIndex = Math.floor(Math.random() * writingQuotes.length);
      } while (newIndex === previousIndex && writingQuotes.length > 1);
      return newIndex;
  };

  // Add scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
      const initialInstances = Array.from({ length: 30 }, (_, index) => ({
          id: index,
          text: '',
          position: generatePosition(),
          isMoving: false,
          selectedTextIndex: getRandomText(-1)
      }));
      setInstances(initialInstances);

      initialInstances.forEach((instance, index) => {
          let currentText = '';
          let isTyping = true;

          const animate = () => {
              const currentInstance = instances[index] || initialInstances[index];
              const fullText = writingQuotes[currentInstance.selectedTextIndex];

              if (isTyping) {
                  if (currentText.length < fullText.length) {
                      currentText = fullText.slice(0, currentText.length + 1);
                      setInstances(prev => 
                          prev.map(inst => 
                              inst.id === index ? { ...inst, text: currentText } : inst
                          )
                      );
                      setTimeout(animate, 100);
                  } else {
                      setTimeout(() => {
                          isTyping = false;
                          animate();
                      }, 2000);
                  }
              } else {
                  if (currentText.length > 0) {
                      currentText = currentText.slice(0, -1);
                      setInstances(prev => 
                          prev.map(inst => 
                              inst.id === index ? { ...inst, text: currentText } : inst
                          )
                      );
                      setTimeout(animate, 50);
                  } else {
                      isTyping = true;
                      setInstances(prev => {
                          const prevInstance = prev.find(i => i.id === index);
                          return prev.map(inst => 
                              inst.id === index ? {
                                  ...inst,
                                  isMoving: true,
                                  selectedTextIndex: getRandomText(prevInstance?.selectedTextIndex || 0)
                              } : inst
                          );
                      });
                      
                      setTimeout(() => {
                          setInstances(prev => 
                              prev.map(inst => 
                                  inst.id === index ? {
                                      ...inst,
                                      position: generatePosition(),
                                      isMoving: false
                                  } : inst
                              )
                          );
                          currentText = '';
                          animate();
                      }, 1000);
                  }
              }
          };

          setTimeout(() => animate(), index * 1000);
      });
  }, []);

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

  return;
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
      <TypewriterEffect  />
      <div className='relative'>
      
      <div className="relative z-10">
      <section className="relative py-24" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-36 relative flex">
        <Image
                src="/logo.png"
                alt="Literary Writing Resources Logo"
                width={150}
                height={150}
                className="w-auto h-auto"
                priority
              />
          <div className="text-center  md:items-center  lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
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
              
             <Link href="/products" className="inline-block">
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 text-white rounded-none border-2 transition-all duration-300 font-serif tracking-wide"
              >
                Begin Your Journey
              </motion.button>
            </Link>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
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
              },
              
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

          <section className="py-20" 
          style={{ 
            backgroundColor: `${colors.light.sage}33`,

            }}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-serif" style={{
        fontFamily: '"Playfair Display", serif',
        color: colors.primary
      }}>
        Specialized Writing Guides
      </h2>
      <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: colors.accent1 }} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Crafting Chemistry",
          mainText: "Turn up the heat in your romance scenes without burning the manuscript. From subtle tension to steamy encounters, learn the art of writing relationships that make readers fan themselves while maintaining literary elegance.",
          features: [
            "Tension-building techniques",
            "Emotional depth guides",
            "Tasteful scene construction"
          ]
        },
        {
          title: "Enchanted Realms & Epic Tales",
          mainText: "Whether your dragons prefer tea parties or treasure hoards, master the art of weaving magic into your narrative. Create fantasy worlds that feel real enough to vacation in (travel insurance recommended for realms with active dark lords).",
          features: [
            "Magic system blueprints",
            "Mythical creature guides",
            "Quest-plotting tools"
          ]
        },
        {
          title: "Writer's Toolkit",
          mainText: "Transform your chaotic creative process into a well-oiled writing machine. Our worksheets are like GPS for your plot - except this one actually knows where it's going and won't lead your story into a creative cul-de-sac.",
          features: [
            "Scene structuring templates",
            "Character motivation maps",
            "Plot hole detection tools"
          ]
        }
      ].map((box, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          style={{ borderLeft: `4px solid ${colors.accent1}` }}
        >
          <h3 className="text-2xl font-serif mb-4" style={{
            fontFamily: '"Playfair Display", serif',
            color: colors.primary
          }}>
            {box.title}
          </h3>
          <p className="mb-6" style={{ color: colors.dark }}>
            {box.mainText}
          </p>
          <ul className="space-y-3">
            {box.features.map((feature, featureIndex) => (
              <li 
                key={featureIndex}
                className="flex items-center"
                style={{ color: colors.accent1 }}
              >
                <span className="mr-2">•</span>
                <span style={{ color: colors.dark }}>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </div>
</section>
        </div>
      </section>
    </div>
    </div>
  </div>
  );
}