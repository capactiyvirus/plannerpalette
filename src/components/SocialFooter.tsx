import React from 'react';
import { 
  FaYoutube, 
  FaInstagram, 
  FaEtsy,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa6";
import { 
  SiThreads,  // Threads icon
} from "react-icons/si";


const SocialFooter = () => {
  const socialLinks = [
    { icon: <FaYoutube size={24} />, url: 'https://www.youtube.com/@PlannerPalette', label: 'YouTube' },
    { icon: <FaInstagram  size={24} />, url: 'https://www.instagram.com/plannerpaletteco/', label: 'Instagram' },
    { icon: <FaEtsy  size={24} />, url: 'https://www.etsy.com/ca/shop/PlannerPaletteCo', label: 'Etsy Store' },
    { icon: <SiThreads  size={24}/>, url: 'https://www.threads.net/@plannerpaletteco', label: 'Twitter' },
    { icon: <FaPinterest  size={24}/>, url: 'https://ca.pinterest.com/plannerpaletteco/', label: 'Twitter' },
    { icon: <FaTiktok  size={24}/>, url: 'https://www.tiktok.com/@plannerpaletteco', label: 'Twitter' },
  ];


  return (
    <footer className="w-full py-12 mt-auto" style={{ backgroundColor: '#2c3b3a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
          
          {/* Copyright and Links */}
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-6">
              {/* <a href="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a> */}
              <a href="/terms" className="text-gray-300 hover:text-white text-sm">Terms of Service</a>
              <a href="/contact" className="text-gray-300 hover:text-white text-sm">Contact</a>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} PlannerPalette. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;