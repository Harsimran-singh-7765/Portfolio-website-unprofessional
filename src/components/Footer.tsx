import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-purple-500/30 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          
          <div className="text-purple-400 font-vt323 text-sm">
            "Transforming data into intelligent solutions"
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;