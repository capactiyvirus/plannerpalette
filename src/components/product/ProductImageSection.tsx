// src/components/product/ProductImageSection.tsx
'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ProductImageSectionProps {
  imageUrl: string;
  title: string;
  videoUrl?: string;
}

export default function ProductImageSection({ imageUrl, title, videoUrl }: ProductImageSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && videoUrl) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && videoUrl) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        priority
        style={{ opacity: isHovered && videoUrl ? 0 : 1, transition: 'opacity 0.3s' }}
      />
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
        />
      )}
    </div>
  );
}