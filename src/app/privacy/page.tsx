'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-lg max-w-3xl mx-auto transition-colors duration-300" style={{
              fontFamily: '"Lora", serif',
              color: theme === 'dark' ? colors.darkMode.text : colors.light.parchment
            }}>
              How we collect, use, and protect your information
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
              
              <h2 className="text-3xl mt-10 mb-4" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>Introduction</h2>
              <p className="mb-4">
                PlannerPalette (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our digital products.
              </p>
              <p className="mb-8">
                Please read this Privacy Policy carefully. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
              
              <h2 className="text-3xl mt-10 mb-4" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>Information We Collect</h2>
              <p className="mb-4">We may collect the following types of information:</p>
              
              <h3 className="text-2xl mt-6 mb-3" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>Personal Information</h3>
              <p className="mb-4">
                When you purchase our digital products, subscribe to our newsletter, or contact us, we may collect personal information, such as:
              </p>
              <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">Name</li>
                <li className="mb-2">Email address</li>
                <li className="mb-2">Billing information (processed securely through our payment processors)</li>
              </ul>
              
              <h3 className="text-2xl mt-6 mb-3" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>Usage Information</h3>
              <p className="mb-4">
                We may automatically collect certain information about how you interact with our website, including:
              </p>
              <ul className="list-disc pl-8 mb-8">
                <li className="mb-2">IP address</li>
                <li className="mb-2">Browser type</li>
                <li className="mb-2">Device type</li>
                <li className="mb-2">Pages visited</li>
                <li className="mb-2">Time and date of visits</li>
                <li className="mb-2">Referring website or application</li>
              </ul>
              
              <h2 className="text-3xl mt-10 mb-4" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>How We Use Your Information</h2>
              <p className="mb-4">We may use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-8 mb-8">
                <li className="mb-2">Process and deliver your digital product purchases</li>
                <li className="mb-2">Send you our newsletter (if you&apos;ve subscribed)</li>
                <li className="mb-2">Respond to your inquiries and provide customer support</li>
                <li className="mb-2">Improve our website and products</li>
                <li className="mb-2">Monitor and analyze usage patterns</li>
                <li className="mb-2">Protect against fraudulent or unauthorized transactions</li>
                <li className="mb-2">Comply with legal obligations</li>
              </ul>
              
              <h2 className="text-3xl mt-10 mb-4" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>How We Share Your Information</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described below:
              </p>
              <ul className="list-disc pl-8 mb-8">
                <li className="mb-2"><strong>Service Providers:</strong> We may share your information with third-party service providers who help us operate our business (e.g., payment processors, email service providers).</li>
                <li className="mb-2"><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid legal processes.</li>
                <li className="mb-2"><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
              </ul>
              
              <h2 className="text-3xl mt-10 mb-4" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>Cookies and Similar Technologies</h2>
              <p className="mb-8">
                We use cookies and similar tracking technologies to collect information about your browsing activities. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our website may not function properly.
              </p>
              
              <h2 className="text-3xl mt-10 mb-4" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>Third-Party Links</h2>
              <p className="mb-8">
                Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites. We encourage you to review the privacy policies of any websites you visit.
              </p>
              
              <h2 className="text-3xl mt-10 mb-4" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>Data Security</h2>
              <p className="mb-8">
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
              
              <h2 className="text-3xl mt-10 mb-4" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-8 mb-4">
                <li className="mb-2">The right to access your personal information</li>
                <li className="mb-2">The right to correct inaccurate information</li>
                <li className="mb-2">The right to request deletion of your information</li>
                <li className="mb-2">The right to opt-out of marketing communications</li>
              </ul>
              <p className="mb-8">
                To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section below.
              </p>
              
              <h2 className="text-3xl mt-10 mb-4" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>Children&apos;s Privacy</h2>
              <p className="mb-8">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
              </p>
              
              <h2 className="text-3xl mt-10 mb-4" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>Changes to this Privacy Policy</h2>
              <p className="mb-8">
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated &quot;Last Updated&quot; date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
              
              <h2 className="text-3xl mt-10 mb-4" style={{ color: headingColor, fontFamily: '"Playfair Display", serif' }}>Contact Us</h2>
              <p className="mb-2">
                If you have any questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p className="mb-8"><strong>Email:</strong> privacy@plannerpalette.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}