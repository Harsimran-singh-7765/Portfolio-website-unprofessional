export interface Skill {
  name: string;
  level: number;
  description: string;
  experience: string;
}

export interface SkillCategory {
  name: string;
  color: string;
  centerX: number;
  centerY: number;
  skills: Skill[];
}

export const skillCategories: Record<string, SkillCategory> = {
  'ML': {
    name: 'ML',
    color: '#00ffff',
    centerX: 200,
    centerY: 150,
    skills: [
      { 
        name: 'Python', 
        level: 85, 
        description: 'Primary programming language for ML', 
        experience: ' 2+ years' 
      },
      { 
        name: 'Scikit-learn', 
        level: 70, 
        description: 'Classical ML algorithms', 
        experience: 'less than a year' 
      },
      { 
        name: 'Pandas', 
        level: 92, 
        description: 'Data manipulation and analysis', 
        experience: '2+ years' 
      },
      { 
        name: 'NumPy', 
        level: 88, 
        description: 'Numerical computing', 
        experience: '2+ years' 
      },
      { 
        name: 'Matplotlib', 
        level: 85, 
        description: 'Data visualization', 
        experience: '2+ years' 
      },
    ]
  },

  'GenAI': {
    name: 'GenAI',
    color: '#8000ff',
    centerX: 200,
    centerY: 350,
    skills: [
      { 
        name: 'LangChain', 
        level: 85, 
        description: 'LLM application framework', 
        experience: '1+ years' 
      },
      { 
        name: 'Gemini API / LLM', 
        level: 88, 
        description: 'GPT integration', 
        experience: '1+ years' 
      },
      { 
        name: 'CrewAI', 
        level: 75, 
        description: 'Multi-agent AI systems', 
        experience: '1+ years' 
      },
      { 
        name: 'Streamlit', 
        level: 80, 
        description: 'AI app deployment', 
        experience: '2+ years' 
      },
      { 
        name: 'Vector DBs / FIAAS', 
        level: 78, 
        description: 'Embeddings and retrieval', 
        experience: '1+ years' 
      },
    ]
  },
  'Data': {
    name: 'Data Engineering',
    color: '#ff6b35',
    centerX: 600,
    centerY: 350,
    skills: [
      { 
        name: 'SQL', 
        level: 90, 
        description: 'Database querying', 
        experience: '4+ years' 
      },

      { 
        name: 'Docker', 
        level: 42, 
        description: 'Containerization', 
        experience: 'less than a year' 
      },

      { 
        name: 'FastAPI and Flask', 
        level: 85, 
        description: 'API development', 
        experience: '2+ years' 
      },
    ]
  },
  'Web Development': {
    name: 'Web Development',
    color: '#00ff88',
    centerX: 400,
    centerY: 250,
    skills: [
      { 
        name: 'React', 
        level: 88, 
        description: 'Frontend framework', 
        experience: '1+ years' 
      },
      { 
        name: 'Node.js', 
        level: 82, 
        description: 'Backend development', 
        experience: '1+ years' 
      },
      { 
        name: 'TypeScript', 
        level: 85, 
        description: 'Type-safe JavaScript', 
        experience: '1+ years' 
      },
      { 
        name: 'MongoDB', 
        level: 80, 
        description: 'NoSQL database', 
        experience: 'less than a year' 
      },
      { 
        name: 'Git', 
        level: 92, 
        description: 'Version control', 
        experience: '1+ years' 
      },
    ]
  },
  'Languages': {
    name: 'Languages',
    color: '#ff00aa', // bright magenta for pop!
    centerX: 600,
    centerY: 150,
    skills: [
      {
        name: 'Python',
        level: 90,
        description: 'Versatile scripting & ML language',
        experience: '2+ years'
      },
      {
        name: 'C/C++',
        level: 75,
        description: 'DSA, systems programming, competitive',
        experience: '2+ years'
      },
      {
        name: 'Java',
        level: 60,
        description: 'OOP & backend basics',
        experience: 'less than a year'
      },
      {
        name: 'JavaScript',
        level: 85,
        description: 'Dynamic web scripting',
        experience: '2+ years'
      },
      {
        name: 'HTML',
        level: 90,
        description: 'Core structure of the web',
        experience: '2+ years'
      },
      {
        name: 'CSS',
        level: 80,
        description: 'Styling and layouts',
        experience: '2+ years'
      }
    ]
  }

};

// Helper function to easily update skill levels
export const updateSkillLevel = (category: string, skillName: string, newLevel: number) => {
  const categoryData = skillCategories[category];
  if (categoryData) {
    const skill = categoryData.skills.find(s => s.name === skillName);
    if (skill) {
      skill.level = newLevel;
    }
  }
};

// Helper function to add new skills
export const addSkill = (category: string, skill: Skill) => {
  const categoryData = skillCategories[category];
  if (categoryData) {
    categoryData.skills.push(skill);
  }
};