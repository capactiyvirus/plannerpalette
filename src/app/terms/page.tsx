'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';

export default function TermsOfServicePage() {
  const { theme } = useTheme();
  
  // Theme-dependent colors
  const bgColor = theme === 'dark' ? colors.darkMode.background : colors.light.cream;
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const sectionBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const heroSectionBg = theme === 'dark' ? colors.darkMode.primary : colors.primary;
  const lightText = theme === 'dark' ? colors.darkMode.text : 'white';
  
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      {/* Hero Section */}
      <div className="relative py-16 transition-colors duration-300" style={{ backgroundColor: heroSectionBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl mb-4 transition-colors duration-300" style={{
              fontFamily: '"Playfair Display", serif',
              color: lightText
            }}>
              Terms of Service
            </h1>
            <p className="text-lg max-w-3xl mx-auto transition-colors duration-300" style={{
              fontFamily: '"Lora", serif',
              color: theme === 'dark' ? colors.darkMode.text : colors.light.parchment
            }}>
              Please read these terms carefully before using our services
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg shadow-sm p-8 transition-colors duration-300" style={{ backgroundColor: sectionBgColor }}>
            <div className="prose max-w-none transition-colors duration-300" style={{
              fontFamily: '"Lora", serif',
              color: textColor
            }}>
              <p className="mb-6">Last Updated: March 1, 2025</p>
              
              <h2 style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>1. Acceptance of Terms</h2>
              <p>By accessing or using PlannerPalette&apos;s website, services, and products, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
              
              <h2 style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>2. Description of Service</h2>
              <p>Literary Haven provides digital writing resources, guides, and workbooks (&quot;Products&quot;) designed to assist writers with their creative processes. Our services include website access, digital product downloads, and related content.</p>
              
              <h2 style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>3. Digital Product Purchases</h2>
              <p>All purchases of digital Products are final. Due to the nature of digital downloads, we do not offer refunds once a Product has been purchased and downloaded.</p>
              <p>Products are delivered electronically immediately after purchase. You are responsible for downloading and saving your purchased Products.</p>
              
              <h2 style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>4. Intellectual Property Rights</h2>
              <p>All content on this website and in our Products, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Literary Haven and is protected by international copyright laws.</p>
              <p>When you purchase our Products, you are granted a personal, non-exclusive, non-transferable license to use the Products for your personal or professional writing development. You may not:</p>
              <ul>
                <li>Redistribute, share, or resell any Products</li>
                <li>Modify or create derivative works based on our Products</li>
                <li>Use our Products for commercial purposes without proper licensing</li>
                <li>Remove any copyright or other proprietary notices from our materials</li>
              </ul>
              
              <h2 style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>5. User Conduct</h2>
              <p>When using our website, you agree not to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Attempt to gain unauthorized access to our website, systems, or networks</li>
                <li>Engage in any activity that interferes with or disrupts our services</li>
                <li>Use our services for any unlawful purpose</li>
              </ul>
              
              <h2 style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>6. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites. These links are provided solely as a convenience and do not imply endorsement of the content on these sites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.</p>
              
              <h2 style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>7. Disclaimer of Warranties</h2>
              <p>Our Products and services are provided &quot;as is&quot; without any warranty of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, timely, secure, or error-free.</p>
              <p>We make no warranties about the accuracy, reliability, completeness, or timeliness of the content, services, software, text, graphics, links, or communications provided on or through our website.</p>
              
              <h2 style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>8. Limitation of Liability</h2>
              <p>In no event shall Literary Haven be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in any way connected with the use of our website, services, or Products.</p>
              
              <h2 style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>9. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting the updated terms on our website. Your continued use of our services following the posting of changes constitutes your acceptance of those changes.</p>
              
              <h2 style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>10. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of Canada, without regard to its conflict of law principles.</p>
              
              <h2 style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>11. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p>Email: plannerpalette@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}