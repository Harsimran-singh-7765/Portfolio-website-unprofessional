import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/personal';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = `${personalInfo.name} - ${personalInfo.title}`;
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid-background"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Bounty Poster Frame */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: 'spring' }}
          className="bounty-poster mx-auto mb-8 max-w-[250px] md:max-w-[300px]"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-lg blur-lg"></div>
            <div className="relative bg-black/80 border-2 border-red-400 rounded-lg p-4 md:p-8 backdrop-blur-sm">
              <div className="text-red-400 font-pixel text-xs md:text-sm mb-4">WANTED</div>
              
              {/* Avatar */}
              <motion.div
                className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-full h-full border-2 border-red-400 rounded-full overflow-hidden">
                  <img 
                    src='public/wanted-poster (1).png' 
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-pixel">★</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Typewriter Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-orbitron font-bold mb-4 px-4">
            <span className="text-white">{text}</span>
            {isTyping && <span className="text-red-400 animate-pulse">|</span>}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-vt323 px-4">
            {personalInfo.subtitle}
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="anime-button bg-gradient-to-r from-red-500 to-purple-500 text-white px-8 py-4 rounded-lg font-orbitron font-bold text-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
        >
          Enter Digital World
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;