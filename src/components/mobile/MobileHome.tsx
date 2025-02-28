import React from 'react';
import { motion } from 'framer-motion';
import { Pen, BookOpen, ScrollText} from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import colors from '@/components/colors';
import MobileTypewriterEffect from '@/components/mobile/TypeWriterEffect';

 
const MobileHome = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      {/* Mobile Hero Section */}
      <section className="pt-20" style={{ backgroundColor: colors.primary }}>
        <div className="px-4 py-12 text-center">
          
          <h2 className="text-3xl text-white mb-4 font-serif">
            Craft Your Story
          </h2>
          <p className="text-gray-200 mb-6">
            Discover the art of storytelling through our curated resources.
          </p>
          
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
                textColor="#798274" // Using your accent2 color
                height="h-16" // Optional height adjustment
              />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 text-white rounded-none border-2 mt-4"
            style={{ borderColor: colors.accent1 }}
          >
            Begin Your Journey
          </motion.button>
        </div>
      </section>

      {/* Mobile Resources Grid */}
      <section className="px-4 py-12">
        <h3 className="text-2xl text-center mb-8 font-serif" style={{ color: colors.primary }}>
          Top Workbooks
        </h3>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  <div className="border-b border-gray-300 my-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              icon: <Pen />,
              title: "Character Creation",
              description: "Master the art of crafting memorable characters."
            },
            {
              icon: <BookOpen />,
              title: "World Building",
              description: "Create immersive worlds for your stories."
            },
            {
              icon: <ScrollText />,
              title: "Plot Development",
              description: "Structure your narrative effectively."
            }
          ].map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 bg-white shadow-sm rounded-lg"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: colors.accent1, color: 'white' }}
              >
                {resource.icon}
              </div>
              <h4 className="text-lg mb-2" style={{ color: colors.primary }}>
                {resource.title}
              </h4>
              <p className="text-sm" style={{ color: colors.dark }}>
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