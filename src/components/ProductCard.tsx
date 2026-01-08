// src/components/ProductCard.tsx (Updated import path)
'use client';

import Link from 'next/link';
import { Product } from '@/data/products';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/components/cart/cartcontext'; // Updated path
import { ArrowRight, ShoppingCart, CheckCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import colors from '@/components/colors';

export default function ProductCard({ product }: { product: Product }) {
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const { theme } = useTheme();
  const { addItem } = useCart();
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const response = await fetch(`/api/products/price?id=${product.priceId}`);
      const data = await response.json();
      setLivePrice(data.price);
    };
    fetchPrice();
  }, [product.priceId]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && product.videoUrl) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && product.videoUrl) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const formattedPrice = livePrice !== null ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD'
  }).format(livePrice) : 'Loading...';
  
  const bgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const titleColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + '99' : colors.dark;
  const linkColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  const fileTypeBgColor = theme === 'dark' ? colors.accent1 + '40' : '#e6ede8';
  const fileTypeTextColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product);
    setShowAddedMessage(true);
    
    // Hide message after 2 seconds
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };
  
  return (
    <div
      className="flex flex-col relative group rounded-lg shadow-md transition-all duration-300 hover:shadow-lg h-[520px] overflow-hidden"
      style={{ backgroundColor: bgColor }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/products/${product.id}`} className="flex-grow">
        <div className="relative h-64 w-full">
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
        
        <div className="p-6 flex-grow">
          <div className="h-12 mb-2">
            <h3 className="text-xl transition-colors duration-300" style={{ 
              fontFamily: '"Playfair Display", serif',
              color: titleColor
            }}>
              {product.title}
            </h3>
          </div>
          <div className="h-12 mb-2">
            <p className="text-sm transition-colors duration-300 line-clamp-4" style={{ 
              fontFamily: '"Lora", serif',
              color: textColor
            }}>
              {product.description}
            </p>
          </div>
        </div>
      </Link>
      
      <div className="mt-auto p-3 pt-3">
        <div className="flex items-center justify-between mb-4">
          <span className="text-1xl font-bold" style={{ color: linkColor }}>
            {formattedPrice}
          </span>
          <span className="text-1xl font-bold" style={{ color: linkColor }}>
          {/* <button 
            onClick={handleAddToCart}
            className="w-full inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 group"
            style={{ 
              backgroundColor: theme === 'dark' ? colors.accent1 + '80' : colors.accent1,
              color: 'white',
            }}
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            Add to Cart
          </button> */}
          </span>
          <span 
            className="inline-flex items-center px-2 py-1 rounded-full text-xs transition-colors duration-300"
            style={{
              backgroundColor: fileTypeBgColor,
              color: fileTypeTextColor
            }}
          >
            {product.fileType}
          </span>
        </div>
        
        <div className="w-full">
          <button
            onClick={handleAddToCart}
            disabled={showAddedMessage}
            className="w-full inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group"
            style={{
              backgroundColor: showAddedMessage
                ? (theme === 'dark' ? '#22c55e' : '#16a34a')
                : (theme === 'dark' ? colors.accent1 + '80' : colors.accent1),
              color: 'white',
              opacity: showAddedMessage ? 1 : 1,
            }}
          >
            {showAddedMessage ? (
              <>
                <CheckCircle className="mr-1 h-4 w-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="mr-1 h-4 w-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}