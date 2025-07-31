import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-[#1a0d1a] to-black border-t border-[#6a0d83]/30 py-8 transition-all duration-1000">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-gray-400 font-vt323">Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
            <span className="text-gray-400 font-vt323">in the digital realm</span>
          </div>
          
          <div className="text-gray-500 font-pixel text-xs mb-2">
            © 2025 Harsimran Singh. All rights reserved.
          </div>
          
          <div className="text-[#ce4993] font-vt323 text-sm glow-rose">
            "Transforming data into intelligent solutions"
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;