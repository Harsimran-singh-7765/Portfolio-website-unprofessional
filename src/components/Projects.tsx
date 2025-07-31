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
    <section id="projects" className="py-20 matrix-bg transition-all duration-1000">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-death-note font-bold text-white mb-4">
            MISSION <span className="text-green-400 glow-green">LOGS</span>
          </h2>
          <div className="w-24 h-1 bg-green-400 mx-auto mb-4 shadow-lg shadow-green-400/50"></div>
          <p className="text-gray-300 font-clean text-lg">COMPLETED QUESTS AND ONGOING ADVENTURES</p>
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
                className={`overflow-hidden transition-all duration-500 group ${
                  index % 2 === 0 ? 'card-gothic-green' : 'card-gothic-purple'
                }`}
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
                    <h3 className={`text-lg md:text-xl font-gothic font-bold text-white transition-colors uppercase ${
                      index % 2 === 0 ? 'group-hover:text-green-400' : 'group-hover:text-purple-400'
                    }`}>
                      {project.title}
                    </h3>
                    <span className={`font-clean text-xs ${
                      index % 2 === 0 ? 'text-green-400' : 'text-purple-400'
                    }`}>{project.role}</span>
                  </div>

                  <p className="text-gray-300 font-clean text-xs md:text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 border text-xs font-clean ${
                          index % 2 === 0 
                            ? 'bg-green-400/20 border-green-400/50 text-green-300' 
                            : 'bg-purple-400/20 border-purple-400/50 text-purple-300'
                        }`}
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
                      className="flex items-center space-x-1 md:space-x-2 btn-gothic-purple text-xs md:text-sm"
                    >
                      <ExternalLink size={14} />
                      <span>DEMO</span>
                    </motion.a>

                    <motion.a
                      href={project.githubUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 md:space-x-2 btn-gothic-green text-xs md:text-sm"
                    >
                      <Github size={14} />
                      <span>CODE</span>
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
              className="btn-gothic-green text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? 'HIDE CLASSIFIED LOGS' : 'SHOW ALL MISSIONS'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
