'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
}

export const AnimatedResourceCard = ({ title, description, category }: ResourceCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full bg-[#6e725a] flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#2c3b3a] mb-2">{title}</h3>
          <p className="text-gray-600 mb-3">{description}</p>
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#a2a282] text-white">
            {category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const WritingTipAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const tips = [
    {
      title: "Character Development",
      content: "Focus on creating detailed backstories and clear motivations for your characters."
    },
    {
      title: "World Building",
      content: "Establish consistent rules and rich details for your story's setting."
    },
    {
      title: "Plot Structure",
      content: "Maintain a clear narrative arc with well-defined conflicts and resolutions."
    }
  ];

  return (
    <div className="space-y-4">
      {tips.map((tip, index) => (
        <motion.div
          key={index}
          initial={false}
          className="border rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left bg-white flex items-center justify-between"
          >
            <span className="font-semibold text-[#2c3b3a]">{tip.title}</span>
            <motion.div
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </motion.div>
          </button>
          <motion.div
            animate={{
              height: activeIndex === index ? 'auto' : 0,
              opacity: activeIndex === index ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-gray-50">
              <p className="text-gray-600">{tip.content}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export const ScrollRevealSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export const HoverEffectButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 bg-[#6e725a] text-white rounded-lg hover:bg-[#798274] transition-colors"
    >
      {children}
    </motion.button>
  );
};

export const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-[#6e725a]"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};