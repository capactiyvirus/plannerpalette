'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Pen, BookOpen, Heart} from 'lucide-react';
import colors from '@/components/colors';
import MobileTypewriterEffect from '@/components/TypeWriterEffect';
import FeatureGuides from '@/components/device/mobile/FeatureGuide';
import { useTheme } from '@/context/ThemeContext';

const MobileHome = () => {
  const { theme } = useTheme();
  
  // Set theme-based colors
  const bgColor = theme === 'dark' ? colors.darkMode.background : 'white';
  const borderColor = theme === 'dark' ? colors.darkMode.primary + '33' : 'border-gray-300';
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const heroSectionBg = theme === 'dark' ? colors.darkMode.primary : colors.primary;
  const heroTextColor = theme === 'dark' ? colors.light.parchment : 'text-white';
  const heroSubtextColor = theme === 'dark' ? colors.light.parchment + 'CC' : 'text-gray-200';
  
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      {/* Mobile Header */}
      {/* Mobile Hero Section */}
      <section className="py-5 transition-colors duration-300" style={{ backgroundColor: heroSectionBg }}>
        <div className="px-4 py-12 text-center">
          <h2 className={`text-5xl mb-4 font-serif transition-colors duration-300 ${heroTextColor}`}>
            Craft Your Story
          </h2>
          <p className={`mb-4 transition-colors duration-300 ${heroSubtextColor}`}>
            Discover the art of storytelling through our curated resources.
          </p>
          <div className="flex justify-center w-full">
            <MobileTypewriterEffect 
              quotes={[
                "Once upon a time... Words became stories, and stories became adventures.",
                "In the realm of imagination, every word holds infinite possibilities.",
                "Through the ink of inspiration flows the magic of creation.",
                "Stories weave threads of imagination into tapestries of wonder.",
                "Every blank page is a canvas awaiting your creative touch.",
                "Words are the bridges between reality and dreams.",
                "In the quiet moments, stories whisper their secrets.",
                "Where imagination roams, stories find their way home.",
              ]}
              textColor={theme === 'dark' ? colors.light.parchment : "#798274"}
              //height="h-14"
            />
          </div>
        </div>
      </section>

      {/* Mobile Resources Grid */}
      <section className="px-4 py-12">
        <FeatureGuides/>
        
        <div className={`border-b my-4 transition-colors duration-300`} 
          style={{ borderColor: borderColor }}></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              icon: <Heart />,
              title: "Approved by Writers Globally",
              description: "Purchased and loved by 250+ writers around the world looking to add depth and finer details to their characters, worldbuilding, romances, plot, and then weave them into their overall story in a way that makes sense."
            },
            {
              icon: <BookOpen />,
              title: "Academically-Backed Designs",
              description: "Created by a writer backed by a B.A. (Hons.) in Creative Writing & English and 15+ years of experience writing fiction narratives and and learning to craft immersive stories."
            },
            {
              icon: <Pen />,
              title: "Writer-Led Guidance",
              description: "These workbooks are filled with dynamic prompts, charts, tables, questions, and more – offering the structure needed to develop compelling novels without compromising on the freedom to tailor each section to your needs."
            }
          ].map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 shadow-sm rounded-lg transition-colors duration-300"
              style={{ backgroundColor: cardBgColor }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                style={{ 
                  backgroundColor: theme === 'dark' ? colors.accent1 + '33' : colors.accent1, 
                  color: theme === 'dark' ? colors.light.parchment : 'white' 
                }}
              >
                {resource.icon}
              </div>
              <h4 
                className="text-lg mb-2 transition-colors duration-300" 
                style={{ color: headingColor }}
              >
                {resource.title}
              </h4>
              <p 
                className="text-sm transition-colors duration-300" 
                style={{ color: textColor }}
              >
                {resource.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MobileHome;