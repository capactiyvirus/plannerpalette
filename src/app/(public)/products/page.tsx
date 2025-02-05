import React, { ReactNode } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Calendar, Shield, Heart, ArrowRight } from 'lucide-react';
import InteractiveButton from '@/components/InteractiveButton';

const colors = {
  primary: '#2c3b3a',    // Deep teal
  secondary: '#a2a282',  // Sage
  accent1: '#6e725a',    // Olive
  accent2: '#798274',    // Muted green
  accent3: '#7c8c76',    // Forest green
  dark: '#414138',       // Deep olive
  darkTeal: '#2b3b38'    // Dark teal
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
    <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
      {title}
    </h3>
    <p style={{ color: colors.dark }}>
      {description}
    </p>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9f7]">
      {/* Hero Section */}
      <section className="relative py-20" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Organize Your Life in Style
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Discover our collection of beautifully crafted planners designed to enhance your daily productivity
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-semibold" style={{ color: colors.primary }}>
              Featured Planners
            </h2>
            <Link 
            href="/products" 
            className="flex items-center transition-colors duration-200 hover:opacity-80"
            style={{ color: colors.accent1 }}
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
          <h2 className="text-3xl font-semibold text-center mb-16" style={{ color: colors.primary }}>
            Why Choose Our Planners?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <FeatureCard 
              icon={<Calendar />}
              title="Thoughtful Design"
              description="Carefully crafted layouts that adapt to your planning style"
              color={colors.accent2}
            />
            <FeatureCard 
              icon={<Shield />}
              title="Premium Quality"
              description="Made with high-quality materials for durability and style"
              color={colors.accent1}
            />
            <FeatureCard 
              icon={<Heart />}
              title="Customer Loved"
              description="Trusted and appreciated by thousands of happy customers"
              color={colors.accent3}
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16" style={{ backgroundColor: colors.darkTeal }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-8">
              Subscribe to get special offers and updates on new products
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-transparent focus:outline-none focus:border-gray-300"
              />
              <button 
                className="px-6 py-3 rounded-lg text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: colors.accent1 }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}