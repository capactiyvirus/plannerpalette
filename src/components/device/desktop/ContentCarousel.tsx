import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, color } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';
import { ChevronLeft, ChevronRight, Play, PauseCircle, ThumbsUp, Star, Youtube } from 'lucide-react';

// Define the types of content we can showcase
type ContentType = 'features' | 'videos' | 'reviews';

const CONTENT_TYPES: Record<string, ContentType> = {
  FEATURES: 'features',
  VIDEOS: 'videos',
  REVIEWS: 'reviews'
};

// Define types for each content item
interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface VideoItem {
  id: number;
  title: string;
  videoId: string;
  description: string;
}

interface ReviewItem {
  id: number;
  name: string;
  rating: number;
  text: string;
  product: string;
}

// Define the type for the entire carousel content object
interface CarouselContent {
  features: FeatureItem[];
  videos: VideoItem[];
  reviews: ReviewItem[];
}

// Sample content data
const carouselContent: CarouselContent = {
  features: [
    {
      title: "Expertly Crafted",
      description: "Created by a storyteller with 15+ years of experience and a B.A. in Creative Writing, our guides transform scattered ideas into cohesive narratives with proven frameworks that bypass common writing pitfalls.",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Comprehensive Resources",
      description: "Beyond surface level advice, our workbooks address the psychological barriers of writing from impostor syndrome to perfectionism with practical exercises that build both skill and confidence.",
      icon: <ThumbsUp className="w-6 h-6" />
    },
    {
      title: "Writer Approved",
      description: "Developed alongside emerging authors who faced the same challenges you're experiencing now, our guides have helped countless writers transform their creative vision into structured, publishable stories.",
      icon: <Star className="w-6 h-6" />
    }
  ],
  videos: [
    {
      id: 1,
      title: "Character Building Workshop",
      videoId: "dQw4w9WgXcQ",
      description: "Learn how to craft characters your readers will remember long after they finish your book."
    },
    {
      id: 2,
      title: "Writing Compelling Dialogue",
      videoId: "dQw4w9WgXcQ",
      description: "Master the art of creating natural dialogue that reveals character and advances your plot."
    },
    {
      id: 3,
      title: "World Building Basics",
      videoId: "dQw4w9WgXcQ",
      description: "Discover the foundations of creating immersive worlds that captivate your readers."
    }
  ],
  reviews: [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      text: "This workbook completely transformed my writing process. I finally have structure without feeling constrained. Worth every penny!",
      product: "Fantasy World-Building Workbook"
    },
    {
      id: 2,
      name: "Michael T.",
      rating: 5,
      text: "The character development section alone is worth the price. My protagonists are so much more three-dimensional now!",
      product: "Character Development Workbook"
    },
    {
      id: 3,
      name: "Jennifer L.",
      rating: 5,
      text: "As someone who struggled with romance scenes, this guide was exactly what I needed. My beta readers have noticed a huge improvement!",
      product: "Spicy Romance Scene Workbook"
    }
  ]
};

const ContentCarousel = () => {
  const { theme } = useTheme();
  const [contentType, setContentType] = useState<ContentType>(CONTENT_TYPES.FEATURES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const rotationTimer = useRef<NodeJS.Timeout | null>(null);
  const rotationDelay = 6000; // 6 seconds per item

  // Colors based on theme
  const bgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const accentColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  const buttonBgColor = theme === 'dark' ? colors.darkMode.primary : colors.accent2;
  const buttonTextColor = theme === 'dark' ? colors.light.parchment : 'white';
  const iconBgColor = theme === 'dark' ? `${colors.accent1}30` : `${colors.accent1}20`;
  const iconColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  const navButtonColor = theme === 'dark' ? colors.darkMode.text : colors.accent1;
  const navButtonBgColor = theme === 'dark' ? colors.darkMode.primary + '33' : colors.light.parchment;
  const tabBgActive = theme === 'dark' ? colors.darkMode.primary : colors.accent1;
  const tabTextActive = 'white';
  const tabBgInactive = theme === 'dark' ? colors.darkMode.background + '40' : 'transparent';
  const tabTextInactive = theme === 'dark' ? colors.darkMode.text + '80' : colors.accent2;
  const tabBorderColor = theme === 'dark' ? colors.darkMode.primary : colors.accent1;
  const titleColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const sectionBgColor = theme === 'dark' ? colors.darkMode.background : `${colors.secondary}20`;
  // Get current content array based on type
  const getCurrentContent = () => {
    return carouselContent[contentType];
  };

  // Function to handle rotation
  const rotate = () => {
    if (isPlaying) {
      const content = getCurrentContent();
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    }
  };

  // Set up the rotation timer
  useEffect(() => {
    if (isPlaying) {
      // Clear any existing timer
      if (rotationTimer.current) {
        clearInterval(rotationTimer.current);
      }
      // Set a new timer
      rotationTimer.current = setInterval(rotate, rotationDelay);
    }
    // Clear timer on component unmount or when paused
    return () => {
      if (rotationTimer.current) {
        clearInterval(rotationTimer.current);
      }
    };
  }, [isPlaying, contentType, currentIndex]);

  // When content type changes, reset the index
  useEffect(() => {
    setCurrentIndex(0);
  }, [contentType]);

  // Handle manual navigation
  // const goToNext = () => {
  //   const content = getCurrentContent();
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
  //   // Reset the timer when manually navigating
  //   if (isPlaying && rotationTimer.current) {
  //     clearInterval(rotationTimer.current);
  //     rotationTimer.current = setInterval(rotate, rotationDelay);
  //   }
  // };

  // const goToPrevious = () => {
  //   const content = getCurrentContent();
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + content.length) % content.length);
  //   // Reset the timer when manually navigating
  //   if (isPlaying && rotationTimer.current) {
  //     clearInterval(rotationTimer.current);
  //     rotationTimer.current = setInterval(rotate, rotationDelay);
  //   }
  // };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Render different content based on type
  const renderContent = () => {
    const content = getCurrentContent();
    
    switch (contentType) {
      case CONTENT_TYPES.FEATURES: {
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carouselContent.features.map((feature, index) => (
              <div 
              key={`feature-${index}`}
              className="p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{ backgroundColor: bgColor }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ backgroundColor: iconBgColor, color: colors.accent2 }}
              >
                {feature.icon}
              </div>
              <h3 
                className="text-xl mb-2 transition-colors duration-300"
                style={{ 
                  fontFamily: '"Playfair Display", serif',
                  color: titleColor 
                }}
              >
                {feature.title}
              </h3>
              <p 
                className="transition-colors duration-300"
                style={{ 
                  fontFamily: '"Lora", serif',
                  color: colors.accent3 
                }}
              >
                {feature.description}
              </p>
            </div>
            ))}
          </div>
        );
      }
      
      case CONTENT_TYPES.VIDEOS: {
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {carouselContent.videos.map((feature, index) => (
          // <AnimatePresence initial={false}>
          // <motion.div 
          //   key={`video-${index}`}
          //   initial={{ opacity: 0, y: 20 }}
          //   animate={{ opacity: 1, y: 0 }}
          //   exit={{ opacity: 0, y: -20 }}
          //   transition={{ duration: 0.5 }}
          //   className="p-8 rounded-lg shadow-sm"
          //   style={{ backgroundColor: bgColor }}
          // >
            <div
            key={`review-${index}`} 
            className="flex flex-col items-center">
              <h3 
                className="text-2xl mb-4 text-center transition-colors duration-300"
                style={{ 
                  fontFamily: '"Playfair Display", serif',
                  color: headingColor 
                }}
              >
                {feature.title}
              </h3>
              <div className="w-full max-w-2xl mb-4 relative aspect-video" style={{ maxHeight: '50%', maxWidth: '50%' }}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${feature.videoId}?rel=0`}
                  title={feature.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
              <p 
                className="transition-colors duration-300 text-center max-w-2xl"
                style={{ 
                  fontFamily: '"Lora", serif',
                  color: textColor 
                }}
              >
                {feature.description}
              </p>
              <button 
                className="mt-6 px-6 py-2 rounded-md flex items-center transition-colors duration-300"
                style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                onClick={() => window.open(`https://www.youtube.com/watch?v=${feature.videoId}`, '_blank')}
              >
                <Youtube className="mr-2 h-4 w-4" />
                Watch on YouTube
              </button>
            </div>
          // </motion.div>
          // </AnimatePresence>
          ))}
          </div>
          
        );
      }
      
      case CONTENT_TYPES.REVIEWS: {
        const currentItem = content[currentIndex] as ReviewItem;
        return (
          <AnimatePresence initial={false}>
          <motion.div 
            key={`review-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full"
            style={{ backgroundColor: bgColor }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-6 h-6 mx-1" 
                    fill={i < currentItem.rating ? accentColor : 'transparent'} 
                    color={accentColor}
                  />
                ))}
              </div>
              <p 
                className="text-xl mb-6 transition-colors duration-300 italic max-w-2xl"
                style={{ 
                  fontFamily: '"Lora", serif',
                  color: textColor 
                }}
              >
                "{currentItem.text}"
              </p>
              <div className="flex flex-col items-center">
                <h4 
                  className="text-lg font-semibold transition-colors duration-300"
                  style={{ color: headingColor }}
                >
                  {currentItem.name}
                </h4>
                <p 
                  className="text-sm transition-colors duration-300"
                  style={{ color: textColor }}
                >
                  on {currentItem.product}
                </p>
              </div>
              <a 
                href="https://www.etsy.com/ca/shop/PlannerPaletteCo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 px-6 py-2 rounded-md inline-block transition-colors duration-300"
                style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              >
                See More Reviews on Etsy
              </a>
            </div>
          </motion.div>
          </AnimatePresence>
        );
      }
      
      default:
        return null;
    }
  };


  // This is the JSX below
  return (
    <div className="py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md p-1" style={{ border: `1px solid ${tabBorderColor}` }}>
            {Object.values(CONTENT_TYPES).map((type) => (
              
              
              <button
                key={type}
                onClick={() => setContentType(type)}
                className={`px-4 py-2 rounded-md transition-colors duration-300 ${contentType === type ? 'font-medium' : ''}`}
                style={{ 
                  backgroundColor: contentType === type ? tabBgActive : tabBgInactive,
                  color: contentType === type ? tabTextActive : tabTextInactive,
                  fontFamily: '"Lora", serif'
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
              
              
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={contentType}
            initial={{ 
              opacity: 0, 
              x: 50,
              scale: 0.95
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: 1,
              transition: { 
                opacity: { duration: 0.4 }, 
                x: { duration: 0.3, ease: "easeOut" },
                scale: { duration: 0.4, ease: "easeOut" }
              }
            }}
            exit={{ 
              opacity: 0, 
              x: -50,
              scale: 0.95,
              transition: { 
                opacity: { duration: 0.3 }, 
                x: { duration: 0.3, ease: "easeIn" },
                scale: { duration: 0.3, ease: "easeIn" }
              }
            }}
            className="absolute inset-0 w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

          {/* Navigation controls */}
          <div className="absolute -bottom-12 left-0 right-0 flex justify-center items-center space-x-4 mt-6">
            {/* <button 
              onClick={goToPrevious}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              style={{ backgroundColor: navButtonBgColor, color: navButtonColor }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
             */}
            {/* <button 
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              style={{ backgroundColor: navButtonBgColor, color: navButtonColor }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <PauseCircle className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button> */}
            
            {/* <button 
              onClick={goToNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              style={{ backgroundColor: navButtonBgColor, color: navButtonColor }}
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button> */}
          </div>

          {/* Pagination indicators */}
          {/* <div className="my-4 -bottom-4 left-0 right-0 flex justify-center space-x-2">
            {getCurrentContent().map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: index === currentIndex ? accentColor : (theme === 'dark' ? colors.darkMode.text + '40' : colors.accent2 + '40'),
                  transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
      </div>
    
  );
};

export default ContentCarousel;