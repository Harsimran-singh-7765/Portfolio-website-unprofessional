import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Heart, Target } from 'lucide-react';
import { personalInfo, stats } from '../data/personal';

import AboutTerminal from '../components/About_terminal';

const About: React.FC = () => {
  const iconMap = { Code, Zap, Heart, Target };

  return (
    <section id="about" className="py-20 matrix-bg transition-all duration-1000">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-death-note font-bold text-white mb-4">
            ABOUT <span className="text-green-400 glow-green">ME</span>
          </h2>
          <div className="w-24 h-1 bg-green-400 mx-auto shadow-lg shadow-green-400/50"></div>
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
                  whileHover={{ scale: 1.05, rotateY: 5, boxShadow: "0 0 25px rgba(139, 92, 246, 0.3)" }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className={`p-3 md:p-6 text-center transition-all duration-500 ${
                    index % 2 === 0 ? 'card-gothic-green' : 'card-gothic-purple'
                  }`}
                >
<IconComponent className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-4 ${
  index % 2 === 0 ? 'text-green-400' : 'text-purple-400'
}`} />
<h3 className="text-white font-gothic font-bold mb-2 text-sm md:text-base uppercase">{stat.label}</h3>
<div className="relative">
  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${Math.min(stat.value, 100)}%` }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className={`h-2 rounded-full transition-all duration-300 ${
        stat.value > 100
          ? 'bg-green-400 shadow-[0_0_12px_#00ff41] animate-pulse'
          : index % 2 === 0
            ? 'bg-green-400'
            : 'bg-purple-400'
      }`}
    />
  </div>

  <span className={`font-clean font-bold text-xs md:text-sm ${
    stat.value > 100 
      ? 'text-green-400 animate-pulse glow-green' 
      : index % 2 === 0 
        ? 'text-green-400' 
        : 'text-purple-400'
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
