'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { personalInfo } from '../data/personal';




const Hero: React.FC = () => {
const [imageSrc, setImageSrc] = useState('/wolf.png');
const [isGlitching, setIsGlitching] = useState(false);

// useEffect(() => {
//   const timer = setTimeout(() => {
//     setIsGlitching(true); // add glitch
//     setImageSrc('/goofy.png');

//     const revertTimer = setTimeout(() => {
//       setImageSrc('/Owner.png');

//       const stopGlitch = setTimeout(() => {
//         setIsGlitching(false); // remove glitch
//       }, 400); // glitch duration

//       return () => clearTimeout(stopGlitch);
//     }, 1000); // show goofy for 1 second

//     return () => clearTimeout(revertTimer);
//   }, 5000); // trigger after 5 seconds

//   return () => clearTimeout(timer);
// }, []);

  const fullText = `${personalInfo.name}\n${personalInfo.title}`;
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  const sectionRef = useRef(null);    
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
        x: x * 10,
        y: y * 10,
        scale: 1.01,
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
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a0d1a] px-4 py-20 md:py-0 transition-all duration-1000 ease-out"
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden matrix-bg px-4 py-20 md:py-0 transition-all duration-1000 ease-out"
    >
      {/* 🟣 Background Grid or Particles */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="matrix-grid"></div>
      </div>

      {/* 🔴 Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#8b5cf6] rounded-full hidden md:block opacity-60"
            className="absolute w-1 h-1 rounded-full hidden md:block opacity-60"
            style={{
              background: i % 2 === 0 ? '#00ff41' : '#8b00ff',
              boxShadow: `0 0 8px ${i % 2 === 0 ? '#00ff41' : '#8b00ff'}`,
            }}
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
        {/* 🖼️ Image Container with Glitch Ring */}
{/* 🖼️ Image Container with Subtle Glitch */}
<motion.div
  className="flex items-center justify-center relative z-10 mb-10"
>
  <div
    ref={posterRef}
    className="relative w-[280px] h-[250px] sm:w-[320px] sm:h-[400px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[350px] overflow-hidden rounded-[40%/30%] glitch-frame"
  >
    <img
      src={imageSrc}
      alt={personalInfo.name}
      className="w-full h-full object-cover scale-105"
      draggable={false}
    />
    <div className="absolute inset-0 w-full h-full bg-transparent glitch-overlay pointer-events-none"></div>
  </div>
</motion.div>



        {/* 🔡 Typewriter Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          className="mb-6 md:mb-8 px-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-death-note font-bold mb-4 leading-tight text-white transition-all duration-500">
            {displayLines.map((line, i) => (
              <span
                key={i}
                className={`block ${
                  i === 1 ? 'text-green-400 glow-green' : 'text-white glow-white'
                } transition-all duration-500`}
              >
                {line}
              </span>
            ))}
            {isTyping && <span className="text-green-400 animate-pulse glow-green">|</span>}
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-clean max-w-2xl mx-auto transition-all duration-500">
            {personalInfo.subtitle}
          </p>
        </motion.div>

        {/* 🟢 CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-gothic-green text-base md:text-lg"
        >
          ENTER THE MATRIX
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
