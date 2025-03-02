// src/components/product/ProductImageSection.tsx
import React from 'react';
import Image from 'next/image';

interface ProductImageSectionProps {
  imageUrl: string;
  title: string;
}

export default function ProductImageSection({ imageUrl, title }: ProductImageSectionProps) {
  return (
    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
      <Image 
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}