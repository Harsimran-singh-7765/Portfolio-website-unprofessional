import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Heart, Target } from 'lucide-react';
import { personalInfo, stats } from '../data/personal';

const About: React.FC = () => {
  const iconMap = { Code, Zap, Heart, Target };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            About <span className="text-red-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Terminal Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="terminal-panel bg-black/50 border border-green-400 rounded-lg p-4 md:p-6 backdrop-blur-sm"
          >
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-2 md:ml-4 text-green-400 font-vt323 text-sm md:text-base">terminal@harsimran:~$</span>
            </div>
            
            <div className="font-vt323 text-green-400 text-sm md:text-lg leading-relaxed">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 2, delay: 0.5 }}
                className="overflow-hidden"
              >
                <p className="mb-4">
                  {'>'} who am i<br/>
                  <span className="text-cyan-400">{personalInfo.title} & Machine Learning Specialist</span>
                </p>
                <p className="mb-4">
                  {'>'} cat mission.txt<br/>
                  <span className="text-white">
                    {personalInfo.description}
                  </span>
                </p>
                <p>
                  {'>'} echo $MISSION<br/>
                  <span className="text-purple-400">
                    "{personalInfo.mission}"
                  </span>
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {stats.map((stat, index) => (
              (() => {
                const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
                return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                className="stat-card bg-black/40 border border-gray-700 rounded-lg p-3 md:p-6 text-center hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
              >
                <IconComponent className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-4 ${stat.color}`} />
                <h3 className="text-white font-orbitron font-bold mb-2 text-sm md:text-base">{stat.label}</h3>
                <div className="relative">
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value}%` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className={`h-2 rounded-full bg-gradient-to-r ${
                        stat.color.includes('cyan') ? 'from-cyan-400 to-blue-400' :
                        stat.color.includes('red') ? 'from-red-400 to-pink-400' :
                        stat.color.includes('purple') ? 'from-purple-400 to-indigo-400' :
                        'from-green-400 to-emerald-400'
                      }`}
                    />
                  </div>
                  <span className={`font-pixel text-xs md:text-sm ${stat.color}`}>{stat.value}%</span>
                </div>
              </motion.div>
                );
              })()
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;