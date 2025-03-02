'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, PenTool, Users, Award } from 'lucide-react';
import colors from '@/components/colors';
import { useTheme } from '@/context/ThemeContext';

export default function AboutPortfolioPage() {
  const { theme } = useTheme();
  
  // Theme-dependent colors
  const bgColor = theme === 'dark' ? colors.darkMode.background : colors.light.cream;
  const headingColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + 'CC' : colors.dark;
  const cardBgColor = theme === 'dark' ? colors.darkMode.cardBg : 'white';
  const sectionBgColor = theme === 'dark' ? colors.darkMode.cardBg + '30' : colors.light.sage + '30';
  const heroSectionBg = theme === 'dark' ? colors.darkMode.primary : colors.primary;
  const lightText = theme === 'dark' ? colors.darkMode.text : 'white';
  const subtleText = theme === 'dark' ? colors.light.parchment : colors.light.parchment;
  const tagBgColor = theme === 'dark' ? colors.darkMode.cardBg + '80' : colors.light.mint;
  
  // Portfolio projects - replace with your actual projects
  const portfolioProjects = [
    {
      id: 'project1',
      title: 'Fantasy Novel Series',
      description: 'A five-book epic fantasy series exploring themes of power, identity, and redemption.',
      image: '/images/portfolio-fantasy.jpg',
      tags: ['Fantasy', 'Series', 'Published Work']
    },
    {
      id: 'project2',
      title: 'Character Development Workshop',
      description: 'Online workshop series helping writers create complex, memorable characters.',
      image: '/images/portfolio-workshop.jpg',
      tags: ['Teaching', 'Character Development', 'Online']
    },
    {
      id: 'project3',
      title: 'Literary Magazine',
      description: 'Founded and edited a quarterly literary magazine showcasing emerging writers.',
      image: '/images/portfolio-magazine.jpg',
      tags: ['Editing', 'Publishing', 'Community']
    }
  ];

  const aboutText = {
    intro: "Hello! I'm Brianna, a passionate writer, educator, and the creator behind Literary Haven. With over 15 years of experience in creative writing and teaching, I've dedicated my career to helping writers discover their unique voice and craft compelling stories.",
    
    journey: "My journey began with a deep love for storytelling that eventually led me to earn my B.A. (Hons.) in Creative Writing & English. Since then, I've guided dozens of aspiring authors, worked as VP of my university's creative writing club, and developed a collection of writing resources that have helped thousands of aspiring authors.",
    
    mission: "I founded Literary Haven with a simple mission: to create accessible, practical, and inspiring resources that empower writers at every stage of their journey. Whether you're drafting your first novel or polishing your tenth, my guides are designed to help you navigate the challenges of storytelling with confidence and creativity."
  };

  const philosophyText = {
    paragraph1: "I believe that storytelling is both an art and a craft. While creativity fuels our imagination, it's the structured approach to character, plot, and world-building that transforms ideas into compelling narratives. My teaching philosophy centers on balancing these elements to help writers express their unique vision.",
    
    paragraph2: "Every writer's journey is different, which is why I create resources that can be adapted to various writing styles and processes. Whether you're a meticulous planner or an intuitive discovery writer, my guides provide flexible frameworks that enhance your natural approach rather than forcing you into a rigid system.",
    
    paragraph3: "Above all, I believe that great writing comes from authenticity, practice, and community. Through Literary Haven, I aim to provide not just techniques and templates, but also encouragement and inspiration to help you persist through challenges and celebrate your growth as a storyteller."
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      {/* Hero Section */}
      <div className="relative py-20 transition-colors duration-300" style={{ backgroundColor: heroSectionBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl mb-6 transition-colors duration-300" style={{
              fontFamily: '"Playfair Display", serif',
              color: lightText
            }}>
              About Literary Haven
            </h1>
            <p className="text-lg max-w-3xl mx-auto transition-colors duration-300" style={{
              fontFamily: '"Lora", serif',
              color: subtleText
            }}>
              Empowering writers with resources, guides, and community
            </p>
          </div>
        </div>
      </div>

      {/* Author Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-center gap-12">
            <div className="lg:w-2/5 mb-8 lg:mb-0">
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="/images/bri.png" 
                  alt="Literary Haven Creator"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <div className="lg:w-3/5">
              <h2 className="text-3xl mb-6 transition-colors duration-300" style={{
                fontFamily: '"Playfair Display", serif',
                color: headingColor
              }}>
                The Story Behind Literary Haven
              </h2>
              
              <div className="prose max-w-none transition-colors duration-300" style={{
                fontFamily: '"Lora", serif',
                color: textColor
              }}>
                <p className="mb-4">{aboutText.intro}</p>
                <p className="mb-4">{aboutText.journey}</p>
                <p className="mb-6">{aboutText.mission}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300" 
                      style={{ 
                        backgroundColor: theme === 'dark' ? `${colors.accent1}15` : `${colors.accent1}20`, 
                        color: theme === 'dark' ? colors.light.parchment : colors.accent1 
                      }}>
                      <PenTool size={20} />
                    </div>
                    <span className="transition-colors duration-300" style={{ color: theme === 'dark' ? colors.darkMode.text : 'inherit' }}>
                      Content Creator
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300" 
                      style={{ 
                        backgroundColor: theme === 'dark' ? `${colors.accent2}15` : `${colors.accent2}20`, 
                        color: theme === 'dark' ? colors.light.parchment : colors.accent2 
                      }}>
                      <BookOpen size={20} />
                    </div>
                    <span className="transition-colors duration-300" style={{ color: theme === 'dark' ? colors.darkMode.text : 'inherit' }}>
                      Writing Educator
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300" 
                      style={{ 
                        backgroundColor: theme === 'dark' ? `${colors.accent3}15` : `${colors.accent3}20`, 
                        color: theme === 'dark' ? colors.light.parchment : colors.accent3 
                      }}>
                      <Users size={20} />
                    </div>
                    <span className="transition-colors duration-300" style={{ color: theme === 'dark' ? colors.darkMode.text : 'inherit' }}>
                      Workshop Facilitator
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300" 
                      style={{ 
                        backgroundColor: theme === 'dark' ? `${colors.secondary}15` : `${colors.secondary}20`, 
                        color: theme === 'dark' ? colors.light.parchment : colors.secondary 
                      }}>
                      <Award size={20} />
                    </div>
                    <span className="transition-colors duration-300" style={{ color: theme === 'dark' ? colors.darkMode.text : 'inherit' }}>
                      Creative Development Specialist
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Portfolio Section */}
      <section className="py-16 transition-colors duration-300" style={{ backgroundColor: sectionBgColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4 transition-colors duration-300" style={{
              fontFamily: '"Playfair Display", serif',
              color: headingColor
            }}>
              Writing Portfolio
            </h2>
            <p className="text-lg max-w-2xl mx-auto transition-colors duration-300" style={{
              fontFamily: '"Lora", serif',
              color: textColor
            }}>
              Selected works and projects from my writing journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg overflow-hidden shadow-sm transition-colors duration-300"
                style={{ backgroundColor: cardBgColor }}
              >
                <div className="relative h-48 w-full">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl mb-3 transition-colors duration-300" style={{
                    fontFamily: '"Playfair Display", serif',
                    color: headingColor
                  }}>
                    {project.title}
                  </h3>
                  
                  <p className="mb-4 transition-colors duration-300" style={{
                    fontFamily: '"Lora", serif',
                    color: textColor
                  }}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 rounded transition-colors duration-300"
                        style={{ 
                          backgroundColor: tagBgColor, 
                          color: theme === 'dark' ? colors.light.parchment + 'CC' : colors.dark 
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Philosophy Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-lg shadow-sm transition-colors duration-300" 
               style={{ backgroundColor: cardBgColor }}>
            <h2 className="text-3xl mb-6 text-center transition-colors duration-300" style={{
              fontFamily: '"Playfair Display", serif',
              color: headingColor
            }}>
              My Writing Philosophy
            </h2>
            
            <div className="prose max-w-none transition-colors duration-300" style={{
              fontFamily: '"Lora", serif',
              color: textColor
            }}>
              <p className="mb-4">{philosophyText.paragraph1}</p>
              <p className="mb-4">{philosophyText.paragraph2}</p>
              <p>{philosophyText.paragraph3}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 transition-colors duration-300" style={{ backgroundColor: heroSectionBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4 transition-colors duration-300" style={{
            fontFamily: '"Playfair Display", serif',
            color: lightText
          }}>
            Ready to Enhance Your Writing Journey?
          </h2>
          
          <p className="text-lg mb-8 max-w-2xl mx-auto transition-colors duration-300" style={{
            fontFamily: '"Lora", serif',
            color: subtleText
          }}>
            Explore my collection of writing guides and resources designed to help you craft compelling stories.
          </p>
          
          <Link href="/products" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent rounded-none border-2 transition-all duration-300 flex items-center"
              style={{ 
                borderColor: theme === 'dark' ? colors.light.parchment : colors.accent1,
                color: lightText 
              }}
            >
              Explore Resources
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}