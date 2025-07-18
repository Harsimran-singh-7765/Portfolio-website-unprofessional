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
  'Machine Learning': {
    name: 'Machine Learning',
    color: '#00ffff',
    centerX: 200,
    centerY: 150,
    skills: [
      { 
        name: 'Python', 
        level: 95, 
        description: 'Primary programming language for ML', 
        experience: '4+ years' 
      },
      { 
        name: 'Scikit-learn', 
        level: 90, 
        description: 'Classical ML algorithms', 
        experience: '3+ years' 
      },
      { 
        name: 'Pandas', 
        level: 92, 
        description: 'Data manipulation and analysis', 
        experience: '4+ years' 
      },
      { 
        name: 'NumPy', 
        level: 88, 
        description: 'Numerical computing', 
        experience: '4+ years' 
      },
      { 
        name: 'Matplotlib', 
        level: 85, 
        description: 'Data visualization', 
        experience: '3+ years' 
      },
    ]
  },
  'Deep Learning': {
    name: 'Deep Learning',
    color: '#e63946',
    centerX: 600,
    centerY: 150,
    skills: [
      { 
        name: 'TensorFlow', 
        level: 88, 
        description: 'Deep learning framework', 
        experience: '3+ years' 
      },
      { 
        name: 'PyTorch', 
        level: 85, 
        description: 'Neural network development', 
        experience: '2+ years' 
      },
      { 
        name: 'Keras', 
        level: 90, 
        description: 'High-level neural networks API', 
        experience: '3+ years' 
      },
      { 
        name: 'OpenCV', 
        level: 80, 
        description: 'Computer vision', 
        experience: '2+ years' 
      },
      { 
        name: 'Hugging Face', 
        level: 82, 
        description: 'Transformer models', 
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
        name: 'OpenAI API', 
        level: 88, 
        description: 'GPT integration', 
        experience: '2+ years' 
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
        name: 'Vector DBs', 
        level: 78, 
        description: 'Embeddings and retrieval', 
        experience: '1+ years' 
      },
    ]
  },
  'Data Engineering': {
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
        name: 'Apache Spark', 
        level: 75, 
        description: 'Big data processing', 
        experience: '2+ years' 
      },
      { 
        name: 'Docker', 
        level: 82, 
        description: 'Containerization', 
        experience: '3+ years' 
      },
      { 
        name: 'AWS', 
        level: 78, 
        description: 'Cloud infrastructure', 
        experience: '2+ years' 
      },
      { 
        name: 'FastAPI', 
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
        experience: '3+ years' 
      },
      { 
        name: 'Node.js', 
        level: 82, 
        description: 'Backend development', 
        experience: '3+ years' 
      },
      { 
        name: 'TypeScript', 
        level: 85, 
        description: 'Type-safe JavaScript', 
        experience: '2+ years' 
      },
      { 
        name: 'MongoDB', 
        level: 80, 
        description: 'NoSQL database', 
        experience: '2+ years' 
      },
      { 
        name: 'Git', 
        level: 92, 
        description: 'Version control', 
        experience: '4+ years' 
      },
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