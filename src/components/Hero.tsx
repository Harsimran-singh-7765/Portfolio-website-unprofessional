'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { personalInfo } from '../data/personal';




const Hero: React.FC = () => {
const [imageSrc, setImageSrc] = useState('/Owner.png');
const [isGlitching, setIsGlitching] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setIsGlitching(true); // add glitch
    setImageSrc('/goofy.png');

    const revertTimer = setTimeout(() => {
      setImageSrc('/Owner.png');

      const stopGlitch = setTimeout(() => {
        setIsGlitching(false); // remove glitch
      }, 400); // glitch duration

      return () => clearTimeout(stopGlitch);
    }, 1000); // show goofy for 1 second

    return () => clearTimeout(revertTimer);
  }, 5000); // trigger after 5 seconds

  return () => clearTimeout(timer);
}, []);

  const fullText = `${personalInfo.name}\n${personalInfo.title}`;
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  const sectionRef = useRef(null);    // 👈 Full section
  const posterRef = useRef(null);     // 👈 Bounty Poster div

  // 🧠 Typewriter Effect
  useEffect(() => {
    let index = 0;
    let current = '';
    const lines: string[] = [];

    const timer = setInterval(() => {
      const char = fullText[index];
      if (char === '\n') {
        lines.push(current);
        current = '';
      } else {
        current += char;
      }

      if (index === fullText.length - 1) {
        lines.push(current);
        setDisplayLines(lines);
        setIsTyping(false);
        clearInterval(timer);
      } else {
        setDisplayLines([...lines, current]);
      }

      index++;
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // 💫 Hover Bubble Parallax
  useEffect(() => {
    const section = sectionRef.current;
    const poster = posterRef.current;

    if (!section || !poster) {
      console.log("❌ Refs not attached:", { section, poster });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      console.log("🎯 Mouse move", { x, y });

      gsap.to(poster, {
        x: x * 20,
        y: y * 20,
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      console.log("👋 Mouse left section");
      gsap.to(poster, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-black px-4 py-20 md:py-0"
    >
      {/* 🟣 Background Grid or Particles */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="grid-background"></div>
      </div>

      {/* 🔴 Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#fb9062] rounded-full hidden md:block"
            animate={{
              x: [0, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)],
              y: [0, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
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

      {/* 🔵 Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        {/* 🟠 Bounty Poster Frame */}
        <motion.div
          ref={posterRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: 'spring' }}
          className="bounty-poster mx-auto mb-6 md:mb-8 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              className="flex items-center justify-center relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            >
              <div
                className={`w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[550px] morph-bubble overflow-hidden shadow-xl rounded-[40%/30%] transition-all duration-300 ${
                  isGlitching ? 'glitch-box' : ''
                }`}
              >
                <img
                  src={imageSrc}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover scale-105 transition-transform duration-700 ease-in-out"
                  draggable={false}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 🔡 Typewriter Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 md:mb-8 px-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-orbitron font-bold mb-4 leading-tight text-white">
            {displayLines.map((line, i) => (
              <span
                key={i}
                className={`block ${
                  i === 1 ? 'text-[#ce4993]' : 'text-white'
                } transition-all duration-300`}
              >
                {line}
              </span>
            ))}
            {isTyping && <span className="text-[#eeaf61] animate-pulse">|</span>}
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-vt323 max-w-2xl mx-auto">
            {personalInfo.subtitle}
          </p>
        </motion.div>

        {/* 🟢 CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="anime-button bg-gradient-to-r from-[#ee5d6c] to-[#6a0d83] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-orbitron font-bold text-base md:text-lg hover:shadow-lg hover:shadow-[#ce4993]/50 transition-all duration-300"
        >
          Enter Digital World
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;

        </div>
      </motion.div>
    </div>
 
</motion.div>


        {/* 🔡 Typewriter Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-orbitron font-bold mb-4 px-4 leading-tight text-white">
            {displayLines.map((line, i) => (
              <span
                key={i}
                className={`block ${
                  i === 1 ? 'text-[#ce4993]' : 'text-white'
                } transition-all duration-300`}
              >
                {line}
              </span>
            ))}
            {isTyping && <span className="text-[#eeaf61] animate-pulse">|</span>}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-vt323 px-4">
            {personalInfo.subtitle}
          </p>
        </motion.div>

        {/* 🟢 CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="anime-button bg-gradient-to-r from-[#ee5d6c] to-[#6a0d83] text-white px-8 py-4 rounded-lg font-orbitron font-bold text-lg hover:shadow-lg hover:shadow-[#ce4993]/50 transition-all duration-300"
        >
          Enter Digital World
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
