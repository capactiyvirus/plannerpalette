// src/components/product/ProductReviews.tsx
'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';
import { Star, StarHalf, MessageCircle } from 'lucide-react';
import { Review } from '@/data/products';

interface ProductReviewsProps {
  reviews: Review[];
  etsyUrl?: string;
}

export default function ProductReviews({ reviews, etsyUrl }: ProductReviewsProps) {
  const { theme } = useTheme();

  // Theme-dependent colors
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const accentColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  const mutedTextColor = theme === 'dark' ? colors.darkMode.text + '80' : '#6b7280';

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-current"
          style={{ color: '#fbbf24' }}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-4 h-4 fill-current"
          style={{ color: '#fbbf24' }}
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-4 h-4"
          style={{ color: theme === 'dark' ? '#4b5563' : '#d1d5db' }}
        />
      );
    }

    return stars;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!reviews || reviews.length === 0) {
    return null; // Don't show section if no reviews
  }

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const count = reviews.length;

  return (
    <div className="mt-12">
      {/* Reviews Header */}
      <div className="p-6 rounded-lg shadow-sm mb-6 transition-colors duration-300" style={{ backgroundColor: cardBgColor }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold transition-colors duration-300" style={{
            fontFamily: '"Playfair Display", serif',
            color: headingColor
          }}>
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(averageRating)}
            </div>
            <span className="text-lg font-semibold transition-colors duration-300" style={{ color: accentColor }}>
              {averageRating.toFixed(1)}
            </span>
            <span className="text-sm transition-colors duration-300" style={{ color: mutedTextColor }}>
              ({count} {count === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.slice(0, 6).map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
            style={{
              backgroundColor: cardBgColor,
              borderLeft: `4px solid ${accentColor}`
            }}
          >
            {/* Review Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {renderStars(review.rating)}
              </div>
              <span className="text-xs transition-colors duration-300" style={{ color: mutedTextColor }}>
                {formatDate(review.date)}
              </span>
            </div>

            {/* Review Text */}
            {review.review && (
              <p className="text-sm leading-relaxed transition-colors duration-300 mb-3" style={{
                fontFamily: '"Lora", serif',
                color: textColor
              }}>
                &quot;{review.review}&quot;
              </p>
            )}

            {/* Buyer Name */}
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3 h-3" style={{ color: accentColor }} />
              <span className="text-xs font-medium transition-colors duration-300" style={{ color: mutedTextColor }}>
                {review.buyerName}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View All on Etsy Link */}
      {etsyUrl && (
        <div className="mt-6 text-center">
          <a
            href={etsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(110, 114, 90, 0.2)' : 'rgba(110, 114, 90, 0.1)',
              color: accentColor,
            }}
          >
            View all reviews on Etsy →
          </a>
        </div>
      )}
    </div>
  );
}
