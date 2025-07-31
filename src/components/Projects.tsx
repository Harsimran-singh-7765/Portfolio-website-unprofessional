import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-400 border-green-400';
      case 'In Progress': return 'text-yellow-400 border-yellow-400';
      case 'Prototype': return 'text-purple-400 border-purple-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-[#1a0d1a] via-[#0a0a0a] to-black transition-all duration-1000">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Mission <span className="text-[#fb9062] glow-orange">Logs</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#fb9062] to-[#6a0d83] mx-auto mb-4 rounded-full shadow-lg shadow-[#fb9062]/50"></div>
          <p className="text-gray-300 font-vt323 text-lg">Completed quests and ongoing adventures</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence>
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 80 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="project-card bg-black/60 border border-gray-700 rounded-lg overflow-hidden backdrop-blur-sm hover:border-cyan-400 transition-all duration-500 group"
              >
                <div className="relative overflow-hidden h-40 md:h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                  <div className={`absolute top-2 left-2 md:top-4 md:left-4 px-2 md:px-3 py-1 rounded-full border ${getStatusColor(project.status)} bg-black/60 backdrop-blur-sm`}>
                    <span className="font-pixel text-xs">{project.status}</span>
                  </div>

                  <div className="absolute top-2 right-2 md:top-4 md:right-4 flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < project.difficulty ? 'text-yellow-400 fill-current' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg md:text-xl font-orbitron font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-purple-400 font-pixel text-xs">{project.role}</span>
                  </div>

                  <p className="text-gray-300 font-vt323 text-xs md:text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-purple-300 font-pixel text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2 md:space-x-4">
                    <motion.a
                      href={project.demoUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 md:space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 md:px-4 py-2 rounded-lg font-vt323 text-xs md:text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                    >
                      <ExternalLink size={14} />
                      <span>Demo</span>
                    </motion.a>

                    <motion.a
                      href={project.githubUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 md:space-x-2 bg-gray-700 text-white px-3 md:px-4 py-2 rounded-lg font-vt323 text-xs md:text-sm hover:bg-gray-600 transition-all duration-300"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {projects.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="relative px-8 py-3 text-white font-bold text-lg font-orbitron group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{showAll ? 'View Less Logs 🔒' : 'View More Logs 🔥'}</span>
              <motion.div
                layoutId="fire-bar"
                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 rounded-full blur-sm group-hover:blur-md animate-pulse"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
                style={{ transformOrigin: 'left' }}
              ></motion.div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
