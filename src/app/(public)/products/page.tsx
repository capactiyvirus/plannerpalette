'use client';

import React, { useEffect, useState, useRef } from 'react';
import { products, Product } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import colors from '@/components/colors';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import MobileTypewriterEffect from '@/components/TypeWriterEffect';
import { useLoading } from '@/context/LoadingContext';







function ProductImageWithVideo({ product, isHovered, onMouseEnter, onMouseLeave }: {
  product: Product;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && product.videoUrl) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, product.videoUrl]);

  return (
    <div className="relative h-64 w-full" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Image
        src={product.imageUrl}
        alt={product.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover rounded-t-lg"
        priority={false}
        style={{ opacity: isHovered && product.videoUrl ? 0 : 1, transition: 'opacity 0.3s' }}
      />
      {product.videoUrl && (
        <video
          ref={videoRef}
          src={product.videoUrl}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
        />
      )}
    </div>
  );
}

export default function ProductsPage() {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Theme-dependent colors - ONLY THESE ARE MODIFIED
  const bgColor = theme === 'dark' ? colors.darkMode.background : colors.light.cream;
  const heroBgColor = theme === 'dark' ? colors.darkMode.primary : colors.primary;
  const heroTextColor = theme === 'dark' ? colors.darkMode.text : 'white'; // This is fine for dark hero background
  const heroSubtextColor = theme === 'dark' ? colors.darkMode.text : colors.light.parchment;
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary; // Changed from colors.dark for better contrast
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : '#414138'; // Changed from colors.primary for better readability
  const inactiveFilterTextColor = theme === 'dark' ? colors.darkMode.text + '99' : '#5a5a5a'; // Better contrast
  const priceTagTextColor = theme === 'dark' ? colors.light.parchment : colors.accent1; // Kept your original
  const fileTypeBgColor = theme === 'dark' ? colors.accent1 + '40' : '#e6ede8'; // Changed from bg-blue-100
  const fileTypeTextColor = theme === 'dark' ? colors.light.parchment : colors.accent1; // Changed from text-blue-800
  const linkColor = theme === 'dark' ? colors.light.parchment : colors.accent1; // Kept your original
  const noResultsTextColor = theme === 'dark' ? colors.darkMode.text + '99' : '#6e725a'; // Better visibility
  const typewriterColor = theme === 'dark' ? colors.light.parchment : "#798274";
  const { setLoading } = useLoading();
 
 
  // Filter function
  const getFilteredProducts = () => {
    if (activeFilter === 'all') {
      return products;
    }
    return products.filter(product => {
      const description = product.description.toLowerCase();
      if (activeFilter === 'fantasy') {
        return description.includes('fantasy') || description.includes('world-building');
      }
      if (activeFilter === 'romance') {
        return description.includes('romance') || description.includes('spicy');
      }
      if (activeFilter === 'character') {
        return description.includes('character');
      }
      return true;
    });
  };

  const filteredProducts = getFilteredProducts();

  const [livePrice, setLivePrice] = useState<{ [key: string]: number }>({});
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Show for 3 seconds
  }, [setLoading]);

  
  useEffect(() => {
    products.forEach(product => {
      fetch(`/api/products/price?id=${product.priceId}`)
          .then(res => res.json())
          .then(data => {
            setLivePrice(prev => ({
              ...prev,
              [product.id]: data.price
            }));
          });
        });
    }, []);



  // HTML starts here
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      {/* Hero Banner */}
      <div 
        className="relative py-20 transition-colors duration-300" 
        style={{ backgroundColor: heroBgColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6 transition-colors duration-300" style={{
            //fontFamily: '"Playfair Display", serif',
            color: heroTextColor
          }}>
            Writing Guides & Resources
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 transition-colors duration-300" style={{
            //fontFamily: '"Lora", serif',
            color: heroSubtextColor
          }}>
            Discover our collection of professionally crafted writing guides to enhance your storytelling journey
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'fantasy', label: 'Fantasy Writing' },
            { id: 'romance', label: 'Romance & Spicy' },
            { id: 'character', label: 'Character Development' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200`}
              style={{
                backgroundColor: activeFilter === filter.id 
                  ? colors.accent1 
                  : 'transparent',
                color: activeFilter === filter.id 
                  ? 'white' 
                  : inactiveFilterTextColor,
                //fontFamily: '"Lora", serif'
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.map(product => (
            <motion.div
            key={product.id}
            className="flex flex-col relative group rounded-lg shadow-md transition-all duration-300 hover:shadow-lg h-[520px] overflow-hidden"
            whileHover={{ y: -5 }}
            style={{ backgroundColor: cardBgColor }}
          >
              <Link href={`/products/${product.id}`} className="flex-grow">
              <ProductImageWithVideo
                product={product}
                isHovered={hoveredProduct === product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              />
              
              <div className="p-6 flex-grow">
                <div className="h-12 mb-2">
                  
                <h3 className="text-xl transition-colors duration-300" style={{ 
                    //fontFamily: '"Playfair Display", serif',
                    color: headingColor
                  }}>
                    {product.title}
                  </h3>
                </div>
                <div className="h-12 mb-2">
                <p className="text-sm transition-colors duration-300 line-clamp-4" style={{ 
                  //fontFamily: '"Lora", serif',
                  color: textColor
                }}>
                  {product.description}
                </p>
                </div>
                </div>
                </Link>

                
                <div className="mt-auto p-3 pt-3">
                <div className="flex items-center justify-between mb-4">
                <span className="text-1xl font-bold" style={{ color: priceTagTextColor }}>{livePrice[product.id]?.toFixed(2)}</span>
                
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs transition-colors duration-300"
                        style={{
                          backgroundColor: fileTypeBgColor,
                          color: fileTypeTextColor
                        }}>
                    
                    {product.fileType}
                  </span>
                </div>
                <div className="w-full">
                  
                <a 
                    href={product.etsyUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 group"
                    style={{ 
                      backgroundColor: theme === 'dark' ? 'rgba(110, 114, 90, 0.2)' : 'rgba(110, 114, 90, 0.1)',
                      color: linkColor,
                    }}
                  >
                    View on Etsy
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
                
                </div>
              
              </motion.div>
            
          ))}
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg transition-colors duration-300" 
               style={{ color: noResultsTextColor }}>
              No products found matching your filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}