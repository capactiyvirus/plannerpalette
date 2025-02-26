import React, { ReactNode } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Calendar, Shield, Heart, ArrowRight } from 'lucide-react';
import InteractiveButton from '@/components/InteractiveButton';
import ConstructionBanner from '@/components/construction';
// Update colors to match home page
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

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => (
  <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
    <div 
      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
      style={{ backgroundColor: `${color}20`, color: color }}
    >
      {icon}
    </div>
    <h3 className="text-xl mb-2" style={{ 
      fontFamily: '"Playfair Display", serif',
      color: colors.primary 
    }}>
      {title}
    </h3>
    <p style={{ 
      fontFamily: '"Lora", serif',
      color: colors.dark 
    }}>
      {description}
    </p>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.light.cream }}>
      {/* Hero Section */}
      
      <ConstructionBanner></ConstructionBanner>
      <section className="relative py-20" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-6" style={{
              fontFamily: '"Playfair Display", serif',
              color: 'white'
            }}>
              Writing Resources & Guides
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto" style={{
              fontFamily: '"Lora", serif',
              color: colors.light.parchment
            }}>
              Discover our collection of beautifully crafted writing guides designed to enhance your storytelling journey
            </p>
            <InteractiveButton 
              baseColor={colors.accent1}
              hoverColor={colors.accent2}
            >
              Explore Collection
            </InteractiveButton>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16" style={{ backgroundColor: colors.light.sage + '33' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl" style={{ 
              fontFamily: '"Playfair Display", serif',
              color: colors.primary 
            }}>
              Featured Guides
            </h2>
            <Link 
              href="/products" 
              className="flex items-center transition-colors duration-200 hover:opacity-80"
              style={{ 
                color: colors.accent1,
                fontFamily: '"Lora", serif'
              }}
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ backgroundColor: `${colors.secondary}20` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-16" style={{ 
            fontFamily: '"Playfair Display", serif',
            color: colors.primary 
          }}>
            Why Choose Our Guides?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <FeatureCard 
              icon={<Calendar />}
              title="Expertly Crafted"
              description="Each guide is thoughtfully designed to enhance your writing journey"
              color={colors.accent2}
            />
            <FeatureCard 
              icon={<Shield />}
              title="Comprehensive Resources"
              description="In-depth materials to support every aspect of your storytelling"
              color={colors.accent1}
            />
            <FeatureCard 
              icon={<Heart />}
              title="Writer Approved"
              description="Tested and loved by our community of storytellers"
              color={colors.accent3}
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-10" style={{ backgroundColor: colors.darkTeal }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl mb-4" style={{
              fontFamily: '"Playfair Display", serif',
              color: 'white'
            }}>
              Join Our Writing Community
            </h2>
            <p style={{
              fontFamily: '"Lora", serif',
              color: colors.light.parchment
            }} className="mb-8">
              Subscribe to receive writing tips, exclusive offers, and updates on new guides
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-none border-2 border-transparent focus:outline-none focus:border-gray-300"
                style={{
                  fontFamily: '"Lora", serif',
                  backgroundColor: colors.light.parchment,
                  color: colors.dark
                }}
              />
              <button 
                className="px-6 py-3 text-white transition-all duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: colors.accent1,
                  fontFamily: '"Lora", serif'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};