// src/components/product/ProductBreadcrumb.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';

interface ProductBreadcrumbProps {
  productTitle: string;
}

export default function ProductBreadcrumb({ productTitle }: ProductBreadcrumbProps) {
  const { theme } = useTheme();
  
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href="/"
            className="hover:underline transition-colors duration-300"
            style={{ color: theme === 'dark' ? colors.darkMode.text + '99' : colors.accent3 }}
          >
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-1" style={{ color: theme === 'dark' ? colors.darkMode.text + '80' : colors.accent3 }}>/</span>
          <Link 
            href="/products"
            className="hover:underline transition-colors duration-300"
            style={{ color: theme === 'dark' ? colors.darkMode.text + '99' : colors.accent3 }}
          >
            Products
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-1" style={{ color: theme === 'dark' ? colors.darkMode.text + '80' : colors.accent3 }}>/</span>
          <span style={{ color: theme === 'dark' ? colors.darkMode.text : colors.primary }}>
            {productTitle.length > 20 ? productTitle.substring(0, 20) + '...' : productTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}