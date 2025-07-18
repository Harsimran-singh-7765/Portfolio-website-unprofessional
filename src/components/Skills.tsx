import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';

interface Skill {
  name: string;
  level: number;
  description: string;
  experience: string;
}

interface SkillNode {
  id: string;
  name: string;
  level: number;
  description: string;
  experience: string;
  x: number;
  y: number;
  category: string;
}

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);


  // Generate skill nodes with positions
  const generateSkillNodes = (): SkillNode[] => {
    const nodes: SkillNode[] = [];
    
    Object.entries(skillCategories).forEach(([category, data]) => {
      const { centerX, centerY, skills } = data;
      const radius = 80;
      const angleStep = (2 * Math.PI) / skills.length;
      
      skills.forEach((skill, index) => {
        const angle = index * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        nodes.push({
          id: `${category}-${skill.name}`,
          name: skill.name,
          level: skill.level,
          description: skill.description,
          experience: skill.experience,
          x,
          y,
          category
        });
      });
    });
    
    return nodes;
  };

  const skillNodes = generateSkillNodes();

  // Generate connections between related skills
  const generateConnections = () => {
    const connections = [];
    
    // Connect category centers
    const categoryPositions = Object.entries(skillCategories).map(([name, data]) => ({
      name,
      x: data.centerX,
      y: data.centerY
    }));
    
    // Connect skills within categories to center
    Object.entries(skillCategories).forEach(([category, data]) => {
      const { centerX, centerY, skills } = data;
      const radius = 80;
      const angleStep = (2 * Math.PI) / skills.length;
      
      skills.forEach((skill, index) => {
        const angle = index * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        connections.push({
          x1: centerX,
          y1: centerY,
          x2: x,
          y2: y,
          category
        });
      });
    });
    
    return connections;
  };

  const connections = generateConnections();

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Skill <span className="text-purple-400">Tree</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300 font-vt323 text-lg">Hover over nodes to explore my expertise</p>
        </motion.div>

        <div className="relative bg-black/40 border border-purple-400 rounded-lg p-8 backdrop-blur-sm overflow-hidden">
          <svg
            ref={svgRef}
            width="800"
            height="500"
            viewBox="0 0 800 500"
            className="w-full h-auto"
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(128, 0, 255, 0.1)" strokeWidth="1"/>
              </pattern>
              
              {/* Glow filters */}
              <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Connections */}
            {connections.map((connection, index) => (
              <motion.line
                key={index}
                x1={connection.x1}
                y1={connection.y1}
                x2={connection.x2}
                y2={connection.y2}
                stroke={skillCategories[connection.category as keyof typeof skillCategories].color}
                strokeWidth="2"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.05 }}
                className="skill-connection"
              />
            ))}
            
            {/* Category centers */}
            {Object.entries(skillCategories).map(([category, data]) => (
              <g key={category}>
                <motion.circle
                  cx={data.centerX}
                  cy={data.centerY}
                  r="25"
                  fill="rgba(0, 0, 0, 0.8)"
                  stroke={data.color}
                  strokeWidth="3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  filter={`url(#glow-${data.color === '#00ffff' ? 'cyan' : data.color === '#e63946' ? 'red' : 'purple'})`}
                />
                <text
                  x={data.centerX}
                  y={data.centerY + 5}
                  textAnchor="middle"
                  fill={data.color}
                  fontSize="10"
                  fontFamily="VT323"
                  className="pointer-events-none"
                >
                  {category.split(' ')[0]}
                </text>
              </g>
            ))}
            
            {/* Skill nodes */}
            {skillNodes.map((node, index) => {
              const categoryData = skillCategories[node.category as keyof typeof skillCategories];
              const isHovered = hoveredSkill === node.id;
              
              return (
                <g key={node.id}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="20"
                    fill="rgba(0, 0, 0, 0.9)"
                    stroke={categoryData.color}
                    strokeWidth={isHovered ? "3" : "2"}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredSkill(node.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="cursor-pointer"
                    filter={isHovered ? `url(#glow-${categoryData.color === '#00ffff' ? 'cyan' : categoryData.color === '#e63946' ? 'red' : 'purple'})` : undefined}
                  />
                  
                  {/* Skill level indicator */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="15"
                    fill="none"
                    stroke={categoryData.color}
                    strokeWidth="2"
                    strokeDasharray={`${(node.level / 100) * 94.2} 94.2`}
                    strokeDashoffset="0"
                    initial={{ strokeDasharray: "0 94.2" }}
                    whileInView={{ strokeDasharray: `${(node.level / 100) * 94.2} 94.2` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    transform={`rotate(-90 ${node.x} ${node.y})`}
                  />
                  
                  <text
                    x={node.x}
                    y={node.y + 3}
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                    fontFamily="VT323"
                    className="pointer-events-none"
                  >
                    {node.name.length > 8 ? node.name.substring(0, 6) + '..' : node.name}
                  </text>
                  
                  <text
                    x={node.x}
                    y={node.y - 8}
                    textAnchor="middle"
                    fill={categoryData.color}
                    fontSize="6"
                    fontFamily="Press Start 2P"
                    className="pointer-events-none"
                  >
                    {node.level}%
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* Tooltip */}
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-4 bg-black/90 border border-cyan-400 rounded-lg p-4 backdrop-blur-sm max-w-xs"
            >
              {(() => {
                const skill = skillNodes.find(s => s.id === hoveredSkill);
                if (!skill) return null;
                
                return (
                  <>
                    <h4 className="text-cyan-400 font-orbitron font-bold mb-2">{skill.name}</h4>
                    <p className="text-white font-vt323 text-sm mb-2">{skill.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-400 font-pixel text-xs">{skill.experience}</span>
                      <span className="text-green-400 font-pixel text-xs">{skill.level}% Mastery</span>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </div>
        
        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {Object.entries(skillCategories).map(([category, data]) => (
            <div key={category} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full border-2"
                style={{ borderColor: data.color, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
              />
              <span className="text-gray-300 font-vt323 text-sm">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;