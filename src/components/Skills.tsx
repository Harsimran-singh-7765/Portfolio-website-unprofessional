import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

interface DragState {
  isDragging: boolean;
  draggedCategory: string | null;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}
const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [categoryPositions, setCategoryPositions] = useState<Record<string, { x: number; y: number }>>(
    Object.fromEntries(
      Object.entries(skillCategories).map(([name, data]) => [
        name,
        { x: data.centerX, y: data.centerY }
      ])
    )
  );
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedCategory: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent, category: string) => {
    if (isMobile) return; // Disable dragging on mobile
    
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (!svgRect) return;
    
    const svgX = (e.clientX - svgRect.left) * (800 / svgRect.width);
    const svgY = (e.clientY - svgRect.top) * (500 / svgRect.height);
    
    setDragState({
      isDragging: true,
      draggedCategory: category,
      startX: svgX,
      startY: svgY,
      currentX: svgX,
      currentY: svgY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedCategory || isMobile) return;
    
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (!svgRect) return;
    
    const svgX = (e.clientX - svgRect.left) * (800 / svgRect.width);
    const svgY = (e.clientY - svgRect.top) * (500 / svgRect.height);
    
    // Constrain to SVG bounds
    const constrainedX = Math.max(50, Math.min(750, svgX));
    const constrainedY = Math.max(50, Math.min(450, svgY));
    
    setDragState(prev => ({
      ...prev,
      currentX: constrainedX,
      currentY: constrainedY
    }));
    
    // Update category position
    setCategoryPositions(prev => ({
      ...prev,
      [dragState.draggedCategory!]: {
        x: constrainedX,
        y: constrainedY
      }
    }));
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      draggedCategory: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    });
  };

  // Reset positions to default
  const resetPositions = () => {
    setCategoryPositions(
      Object.fromEntries(
        Object.entries(skillCategories).map(([name, data]) => [
          name,
          { x: data.centerX, y: data.centerY }
        ])
      )
    );
  };
  // Generate skill nodes with positions
  const generateSkillNodes = (mobile: boolean = false): SkillNode[] => {
    const nodes: SkillNode[] = [];
    
    if (mobile) {
      // Mobile layout: single category view
      const categories = Object.entries(skillCategories);
      const [category, data] = categories[currentCategory];
      const { skills } = data;
      
      const centerX = 200;
      const centerY = 150;
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
      
      return nodes;
    }
    
    Object.entries(skillCategories).forEach(([category, data]) => {
      const centerPos = categoryPositions[category] || { x: data.centerX, y: data.centerY };
      const { skills } = data;
      const radius = 80;
      const angleStep = (2 * Math.PI) / skills.length;
      
      skills.forEach((skill, index) => {
        const angle = index * angleStep;
        const x = centerPos.x + radius * Math.cos(angle);
        const y = centerPos.y + radius * Math.sin(angle);
        
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

  const skillNodes = generateSkillNodes(isMobile);

  // Generate connections between related skills
  const generateConnections = (mobile: boolean = false) => {
    const connections = [];
    
    if (mobile) {
      // Mobile: connect skills to center only
      const categories = Object.entries(skillCategories);
      const [category, data] = categories[currentCategory];
      const { skills } = data;
      
      const centerX = 200;
      const centerY = 150;
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
      
      return connections;
    }
    
    // Connect skills within categories to center
    Object.entries(skillCategories).forEach(([category, data]) => {
      const centerPos = categoryPositions[category] || { x: data.centerX, y: data.centerY };
      const { skills } = data;
      const radius = 80;
      const angleStep = (2 * Math.PI) / skills.length;
      
      skills.forEach((skill, index) => {
        const angle = index * angleStep;
        const x = centerPos.x + radius * Math.cos(angle);
        const y = centerPos.y + radius * Math.sin(angle);
        
        connections.push({
          x1: centerPos.x,
          y1: centerPos.y,
          x2: x,
          y2: y,
          category
        });
      });
    });
    
    return connections;
  };

  const connections = generateConnections(isMobile);

  const categories = Object.entries(skillCategories);
  const currentCategoryData = categories[currentCategory];

  return (
    <section id="skills" className="py-20 matrix-bg transition-all duration-1000">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-death-note font-bold text-white mb-4">
            SKILL <span className="text-purple-400 glow-purple">MATRIX</span>
          </h2>
          <div className="w-24 h-1 bg-purple-400 mx-auto mb-4 shadow-lg shadow-purple-400/50"></div>
          <p className="text-gray-300 font-clean text-lg">
            {isMobile ? 'Tap nodes to explore my expertise' : 'Hover over nodes to explore • Drag center nodes to rearrange'}
          </p>
        </motion.div>

        {/* Mobile Category Navigation */}
        {isMobile && (
          <div className="flex items-center justify-between mb-6 card-gothic-purple p-4">
            <button
              onClick={() => setCurrentCategory(Math.max(0, currentCategory - 1))}
              disabled={currentCategory === 0}
              className="btn-gothic-purple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-purple-400" />
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-gothic font-bold text-white uppercase">
                {currentCategoryData[0]}
              </h3>
              <p className="text-purple-400 font-clean text-sm">
                {currentCategory + 1} of {categories.length}
              </p>
            </div>
            
            <button
              onClick={() => setCurrentCategory(Math.min(categories.length - 1, currentCategory + 1))}
              disabled={currentCategory === categories.length - 1}
              className="btn-gothic-purple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-purple-400" />
            </button>
          </div>
        )}

        {/* Desktop Controls */}
        {!isMobile && (
          <div className="flex justify-center mb-6">
            <button
              onClick={resetPositions}
              className="btn-gothic-purple"
            >
              RESET MATRIX
            </button>
          </div>
        )}
        <div className="relative card-gothic-green p-4 md:p-8 overflow-hidden">
          <svg
            ref={svgRef}
            width={isMobile ? "400" : "800"}
            height={isMobile ? "300" : "500"}
            viewBox={isMobile ? "0 0 400 300" : "0 0 800 500"}
            className="w-full h-auto min-h-[300px]"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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
            {(!isMobile ? Object.entries(skillCategories) : [currentCategoryData]).map(([category, data]) => {
              const centerPos = isMobile 
                ? { x: 200, y: 150 }
                : categoryPositions[category] || { x: data.centerX, y: data.centerY };
              const isDragging = dragState.draggedCategory === category;
              
              return (
                <g key={category}>
                <motion.circle
                  cx={centerPos.x}
                  cy={centerPos.y}
                  r="25"
                  fill="rgba(0, 0, 0, 0.8)"
                  stroke={data.color}
                  strokeWidth="3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  filter={`url(#glow-${data.color === '#00ffff' ? 'cyan' : data.color === '#e63946' ? 'red' : 'purple'})`}
                  className={!isMobile ? "cursor-grab active:cursor-grabbing" : ""}
                  onMouseDown={(e) => handleMouseDown(e, category)}
                  style={{
                    cursor: isDragging ? 'grabbing' : (!isMobile ? 'grab' : 'default')
                  }}
                />
                <text
                  x={centerPos.x}
                  y={centerPos.y + 5}
                  textAnchor="middle"
                  fill={data.color}
                  fontSize={isMobile ? "12" : "10"}
                  fontFamily="VT323"
                  className="pointer-events-none"
                >
                  {isMobile ? category : category.split(' ')[0]}
                </text>
              </g>
              );
            })}
            
            {/* Skill nodes */}
            {skillNodes.map((node, index) => {
              const categoryData = isMobile ? currentCategoryData[1] : skillCategories[node.category as keyof typeof skillCategories];
              const isHovered = hoveredSkill === node.id;
              
              return (
                <g key={node.id}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={isMobile ? "25" : "20"}
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
                    r={isMobile ? "20" : "15"}
                    fill="none"
                    stroke={categoryData.color}
                    strokeWidth="2"
                    strokeWidth="2"
                    whileInView={{ strokeDasharray: `${(node.level / 100) * (isMobile ? 125.6 : 94.2)} ${isMobile ? 125.6 : 94.2}` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    transform={`rotate(-90 ${node.x} ${node.y})`}
                  />
                  
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize={isMobile ? "9" : "7"}
                    fontFamily="Inter"
                    className="pointer-events-none"
                  >
                    {node.name.length > 8 ? node.name.substring(0, 6) + '..' : node.name}
                  </text>
                  
                  <text
                    x={node.x}
                    y={node.y - 8}
                    textAnchor="middle"
                    fill={categoryData.color}
                    fontSize={isMobile ? "7" : "5"}
                    fontFamily="Inter"
                    fontWeight="bold"
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
              className="absolute bottom-4 left-4 card-gothic-green p-4 max-w-xs z-10"
            >
              {(() => {
                const skill = skillNodes.find(s => s.id === hoveredSkill);
                if (!skill) return null;
                
                return (
                  <>
                    <h4 className="text-green-400 font-gothic font-bold mb-2 uppercase">{skill.name}</h4>
                    <p className="text-white font-clean text-sm mb-2">{skill.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-400 font-clean text-xs">{skill.experience}</span>
                      <span className="text-green-400 font-clean text-xs font-bold">{skill.level}% MASTERY</span>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </div>
        
        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-4">
          {Object.entries(skillCategories).map(([category, data]) => (
            <div key={category} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full border-2"
                style={{ borderColor: data.color, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
              />
              <span className="text-gray-300 font-clean text-xs md:text-sm">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;