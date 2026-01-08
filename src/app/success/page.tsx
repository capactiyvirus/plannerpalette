// src/app/success/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PurchasedProduct {
  title: string;
  downloadUrl: string;
}

function SuccessPageContent() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [products, setProducts] = useState<PurchasedProduct[]>([]);

  // Theme-dependent colors
  const bgColor = theme === 'dark' ? colors.darkMode.background : colors.light.cream;
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const accentColor = theme === 'dark' ? colors.light.parchment : colors.accent1;
  const successColor = '#22c55e';

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found');
      setLoading(false);
      return;
    }

    // Fetch session details
    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/checkout/session?session_id=${sessionId}`);

        if (!response.ok) {
          throw new Error('Failed to verify purchase');
        }

        const data = await response.json();
        setCustomerEmail(data.customerEmail);
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching session:', err);
        setError(err instanceof Error ? err.message : 'Failed to verify your purchase');
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: bgColor }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: accentColor }}></div>
          <p className="text-lg transition-colors duration-300" style={{ color: textColor }}>
            Verifying your purchase...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: bgColor }}>
        <div className="max-w-md w-full mx-4">
          <div className="p-8 rounded-lg shadow-lg transition-colors duration-300" style={{ backgroundColor: cardBgColor }}>
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold mb-4 transition-colors duration-300" style={{
                fontFamily: '"Playfair Display", serif',
                color: headingColor
              }}>
                Something Went Wrong
              </h1>
              <p className="mb-6 transition-colors duration-300" style={{ color: textColor }}>
                {error}
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-md font-medium transition-colors duration-200"
                style={{
                  backgroundColor: accentColor,
                  color: 'white'
                }}
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300 py-12 px-4" style={{ backgroundColor: bgColor }}>
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full mb-4" style={{ backgroundColor: successColor + '20' }}>
            <CheckCircle className="w-16 h-16" style={{ color: successColor }} />
          </div>
          <h1 className="text-4xl font-bold mb-2 transition-colors duration-300" style={{
            fontFamily: '"Playfair Display", serif',
            color: headingColor
          }}>
            Payment Successful!
          </h1>
          <p className="text-lg transition-colors duration-300" style={{ color: textColor }}>
            Thank you for your purchase
          </p>
        </div>

        {/* Email Notification */}
        <div className="p-6 rounded-lg shadow-sm mb-6 transition-colors duration-300" style={{
          backgroundColor: cardBgColor,
          borderLeft: `4px solid ${accentColor}`
        }}>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 mt-1" style={{ color: accentColor }} />
            <div>
              <h3 className="font-semibold mb-1 transition-colors duration-300" style={{ color: headingColor }}>
                Check Your Email
              </h3>
              <p className="text-sm transition-colors duration-300" style={{ color: textColor }}>
                We&apos;ve sent a confirmation email to <strong>{customerEmail}</strong> with your download link(s).
                If you don&apos;t see it, check your spam folder.
              </p>
            </div>
          </div>
        </div>

        {/* Download Products */}
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
              style={{ backgroundColor: cardBgColor }}
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2 transition-colors duration-300" style={{
                    fontFamily: '"Playfair Display", serif',
                    color: headingColor
                  }}>
                    {product.title}
                  </h2>
                  <p className="text-sm transition-colors duration-300" style={{ color: textColor }}>
                    Your digital product is ready to download
                  </p>
                </div>
                <a
                  href={product.downloadUrl}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: accentColor,
                    color: 'white'
                  }}
                >
                  <Download className="w-5 h-5" />
                  Download Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 rounded-lg shadow-sm transition-colors duration-300" style={{
          backgroundColor: cardBgColor
        }}>
          <h3 className="font-semibold mb-3 transition-colors duration-300" style={{ color: headingColor }}>
            What&apos;s Next?
          </h3>
          <ul className="space-y-2 text-sm transition-colors duration-300" style={{ color: textColor }}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
              <span>Download your product(s) using the button(s) above</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
              <span>Save the email we sent you for future access to your downloads</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
              <span>If you have any issues, please contact us at plannerpalette@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors duration-200"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(110, 114, 90, 0.2)' : 'rgba(110, 114, 90, 0.1)',
              color: accentColor
            }}
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-lg">Loading...</p>
      </div>
    </div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
