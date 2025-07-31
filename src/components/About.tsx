import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Heart, Target } from 'lucide-react';
import { personalInfo, stats } from '../data/personal';

import AboutTerminal from '../components/About_terminal';

const About: React.FC = () => {
  const iconMap = { Code, Zap, Heart, Target };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-[#1a0d1a] via-[#0a0a0a] to-black transition-all duration-1000">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            About <span className="text-[#ee5d6c] glow-coral">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#fb9062] to-[#6a0d83] mx-auto rounded-full shadow-lg shadow-[#fb9062]/50"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
        <motion.div>
          <AboutTerminal  />

        </motion.div>


          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {stats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 5, boxShadow: "0 0 25px rgba(251, 144, 98, 0.3)" }}
                  className="stat-card bg-black/40 border border-[#6a0d83]/30 rounded-lg p-3 md:p-6 text-center hover:border-[#fb9062] transition-all duration-500 backdrop-blur-sm shadow-lg shadow-black/20"
                >
<IconComponent className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-4 ${stat.color}`} />
<h3 className="text-white font-orbitron font-bold mb-2 text-sm md:text-base">{stat.label}</h3>
<div className="relative">
  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${Math.min(stat.value, 100)}%` }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className={`h-2 rounded-full ${
        stat.value > 100
          ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-[0_0_12px_#facc15] animate-pulse'
          : stat.color.includes('cyan')
            ? 'bg-gradient-to-r from-cyan-400 to-blue-400'
            : stat.color.includes('red')
              ? 'bg-gradient-to-r from-red-400 to-pink-400'
              : stat.color.includes('purple')
                ? 'bg-gradient-to-r from-purple-400 to-indigo-400'
                : 'bg-gradient-to-r from-green-400 to-emerald-400'
      }`}
    />
  </div>

  <span className={`font-pixel text-xs md:text-sm ${
    stat.value > 100 ? 'text-yellow-400 font-bold animate-pulse' : stat.color
  }`}>
    {stat.value}%
  </span>
</div>


                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
