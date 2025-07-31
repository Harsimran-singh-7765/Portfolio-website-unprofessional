import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="matrix-bg border-t-2 border-green-400/50 py-8 transition-all duration-1000">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-gray-400 font-clean">MADE WITH</span>
            <Heart className="w-4 h-4 text-green-400 fill-current animate-pulse" />
            <span className="text-gray-400 font-clean">IN THE DIGITAL REALM</span>
          </div>
          
          <div className="text-gray-500 font-clean text-xs mb-2 uppercase">
            © 2025 HARSIMRAN SINGH. ALL RIGHTS RESERVED.
          </div>
          
          <div className="text-green-400 font-clean text-sm glow-green uppercase">
            "TRANSFORMING DATA INTO INTELLIGENT SOLUTIONS"
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;