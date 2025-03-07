'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';
import { Mail, MessageSquare, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const { theme } = useTheme();
//   const [formState, setFormState] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
  //const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  
  // Theme-dependent colors
  const bgColor = theme === 'dark' ? colors.darkMode.background : colors.light.cream;
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const heroSectionBg = theme === 'dark' ? colors.darkMode.primary : colors.primary;
  const lightText = theme === 'dark' ? colors.darkMode.text : 'white';
 // const inputBgColor = theme === 'dark' ? colors.darkMode.background : 'white';
  //const inputBorderColor = theme === 'dark' ? colors.darkMode.cardBg : colors.accent3 + '40';
  //const inputTextColor = theme === 'dark' ? colors.darkMode.text : 'inherit';
 // const buttonBgColor = theme === 'dark' ? colors.accent1 + 'CC' : colors.accent1;
  
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormState(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Here you would normally send the form data to your backend
//     // For now, we'll just simulate a successful submission
    
//     // Show success message and reset form
//     // setTimeout(() => {
//     //   setSubmitStatus('success');
//     //   setFormState({
//     //     name: '',
//     //     email: '',
//     //     subject: '',
//     //     message: ''
//     //   });
      
//       // Reset status after 5 seconds
//       setTimeout(() => {
//         setSubmitStatus(null);
//       }, 5000);
//     }, 1000);
//   };
  
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      {/* Hero Section */}
      <div className="relative py-20 transition-colors duration-300" style={{ backgroundColor: heroSectionBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-6 transition-colors duration-300" style={{
              fontFamily: '"Playfair Display", serif',
              color: lightText
            }}>
              Get in Touch
            </h1>
            <p className="text-lg max-w-3xl mx-auto transition-colors duration-300" style={{
              fontFamily: '"Lora", serif',
              color: theme === 'dark' ? colors.darkMode.text : colors.light.parchment
            }}>
              We&apos;d love to hear from you with any questions or feedback
            </p>
          </div>
        </div>
      </div>

      {/* Contact Page Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-start gap-12">
            {/* Contact Info Column */}
            <div className="lg:w-1/3 mb-10 lg:mb-0">
              <div className="p-8 rounded-lg shadow-sm transition-colors duration-300" 
                style={{ backgroundColor: cardBgColor }}>
                <h2 className="text-3xl mb-6 transition-colors duration-300" style={{
                  fontFamily: '"Playfair Display", serif',
                  color: headingColor
                }}>
                  Connect With Us
                </h2>
                
                <div className="space-y-6" style={{ color: textColor }}>
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      <Mail size={20} style={{ color: theme === 'dark' ? colors.light.parchment : colors.accent1 }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                      <p className="mb-2 font-medium">General Inquiries:</p>
                      <a 
                        href="mailto:plannerpalette@gmail.com" 
                        className="transition-colors duration-200 hover:underline"
                        style={{ color: theme === 'dark' ? colors.light.parchment : colors.accent1 }}
                      >
                        plannerpalette@gmail.com
                      </a>
                      
                      <p className="mt-4 mb-2 font-medium">Support:</p>
                      <a 
                        href="mailto:plannerpalette@gmail.com" 
                        className="transition-colors duration-200 hover:underline"
                        style={{ color: theme === 'dark' ? colors.light.parchment : colors.accent1 }}
                      >
                        plannerpalette@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      <MessageSquare size={20} style={{ color: theme === 'dark' ? colors.light.parchment : colors.accent2 }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Social Media</h3>
                      <p>Connect with us on social media for updates, writing tips, and more.</p>
                      <div className="mt-3 flex space-x-4">
                        <Link 
                          href="https://www.instagram.com/plannerpaletteco/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-200 hover:opacity-80"
                          style={{ color: theme === 'dark' ? colors.light.parchment : colors.accent2 }}
                        >
                          Instagram
                        </Link>
                        <Link 
                          href="https://www.etsy.com/ca/shop/PlannerPaletteCo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-200 hover:opacity-80"
                          style={{ color: theme === 'dark' ? colors.light.parchment : colors.accent2 }}
                        >
                          Etsy
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      <AlertCircle size={20} style={{ color: theme === 'dark' ? colors.light.parchment : colors.accent3 }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Response Time</h3>
                      <p>We aim to respond to all inquiries within 1-2 business days. For urgent matters, please indicate in the subject line.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form Column */}
            <div className="lg:w-2/3">
              <div className="p-8 rounded-lg shadow-sm transition-colors duration-300" 
                style={{ backgroundColor: cardBgColor }}>
                <h2 className="text-3xl mb-6 transition-colors duration-300" style={{
                  fontFamily: '"Playfair Display", serif',
                  color: headingColor
                }}>
                  Send Us a Message
                </h2>
                
                {/* <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name Field *
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block mb-2 transition-colors duration-300"
                        style={{ color: textColor }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 transition-colors duration-300"
                        style={{ 
                          backgroundColor: inputBgColor,
                          borderColor: inputBorderColor,
                          color: inputTextColor,
                          fontFamily: '"Lora", serif'
                        }}
                      />
                    </div>
                    
                    {/* Email Field *
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block mb-2 transition-colors duration-300"
                        style={{ color: textColor }}
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 transition-colors duration-300"
                        style={{ 
                          backgroundColor: inputBgColor,
                          borderColor: inputBorderColor,
                          color: inputTextColor,
                          fontFamily: '"Lora", serif'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Subject Field *
                  <div className="mb-6">
                    <label 
                      htmlFor="subject" 
                      className="block mb-2 transition-colors duration-300"
                      style={{ color: textColor }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 transition-colors duration-300"
                      style={{ 
                        backgroundColor: inputBgColor,
                        borderColor: inputBorderColor,
                        color: inputTextColor,
                        fontFamily: '"Lora", serif'
                      }}
                    />
                  </div>
                  
                  {/* Message Field *
                  <div className="mb-6">
                    <label 
                      htmlFor="message" 
                      className="block mb-2 transition-colors duration-300"
                      style={{ color: textColor }}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 resize-none transition-colors duration-300"
                      style={{ 
                        backgroundColor: inputBgColor,
                        borderColor: inputBorderColor,
                        color: inputTextColor,
                        fontFamily: '"Lora", serif'
                      }}
                    />
                  </div>
                  
                  {/* Submit Button *
                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="inline-flex items-center px-6 py-3 rounded text-white transition-colors duration-300"
                      style={{ backgroundColor: buttonBgColor }}
                    >
                      <Send size={18} className="mr-2" />
                      Send Message
                    </motion.button>
                    
                    {/* Status Messages *
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center text-green-600"
                      >
                        <CheckCircle size={18} className="mr-2" />
                        <span>Message sent successfully!</span>
                      </motion.div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center text-red-600"
                      >
                        <AlertCircle size={18} className="mr-2" />
                        <span>Error sending message. Please try again.</span>
                      </motion.div>
                    )}
                  </div>
                </form> */}
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-16">
            <div className="p-8 rounded-lg shadow-sm transition-colors duration-300" 
              style={{ backgroundColor: cardBgColor }}>
              <h2 className="text-4xl mb-8 text-center transition-colors duration-300" style={{
                fontFamily: '"Playfair Display", serif',
                color: headingColor
              }}>
                Frequently Asked Questions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ color: textColor }}>
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: headingColor }}>How quickly will I receive my purchase?</h3>
                  <p className="mb-6">All our writing guides and workbooks are digital downloads that are available immediately after purchase through our Etsy store. You&apos;ll receive an email with download instructions.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: headingColor }}>Do you offer refunds?</h3>
                  <p className="mb-6">Due to the digital nature of our products, we cannot offer refunds once a purchase has been downloaded. Please review product descriptions carefully before buying.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: headingColor }}>Can I print your digital workbooks?</h3>
                  <p className="mb-6">Yes! All our digital workbooks are designed to be both used digitally and printed at home. They&apos;re formatted for standard letter paper.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: headingColor }}>Do you ship physical products?</h3>
                  <p className="mb-6">Currently, we only offer digital products. However, we&apos;re exploring options for physical products in the future. Sign up for our newsletter to stay updated!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}