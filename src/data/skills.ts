export interface Skill {
  name: string;
  level: number;
  description: string;
  experience: string;
  icon?: string; // CDN URL or local path
}

export interface SkillCategory {
  name: string;
  color: string;
  centerX: number;
  centerY: number;
  skills: Skill[];
}

// Helper function to get skill icon URL from simple-icons CDN
export const getSkillIcon = (skillName: string): string => {
  const iconMap: Record<string, string> = {
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
    'Matplotlib': 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg',
    'LangChain': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgi4GSMx_NiBIy4zTgJ6ILRjV64TyXBdgQpg&s',
    'Gemini API / LLM': 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
    'CrewAI': 'https://yt3.googleusercontent.com/ZjHTUCoM7Hj2VCwrg8FEulFlzJEoRLKf6li0wrVVOzR7N2NJnPLKRK6E-MtopMiX9-0Qb9IBXw=s900-c-k-c0x00ffffff-no-rj',
    'Streamlit': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg',
    'Vector DBs / FIAAS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'FastAPI and Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'C/C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
  };
  
  return iconMap[skillName] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg';
};
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
        experience: ' 2+ years',
        icon: getSkillIcon('Python')
      },
      { 
        name: 'Scikit-learn', 
        level: 70, 
        description: 'Classical ML algorithms', 
        experience: 'less than a year',
        icon: getSkillIcon('Scikit-learn')
      },
      { 
        name: 'Pandas', 
        level: 92, 
        description: 'Data manipulation and analysis', 
        experience: '2+ years',
        icon: getSkillIcon('Pandas')
      },
      { 
        name: 'NumPy', 
        level: 88, 
        description: 'Numerical computing', 
        experience: '2+ years',
        icon: getSkillIcon('NumPy')
      },
      { 
        name: 'Matplotlib', 
        level: 85, 
        description: 'Data visualization', 
        experience: '2+ years',
        icon: getSkillIcon('Matplotlib')
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
        experience: '1+ years',
        icon: getSkillIcon('LangChain')
      },
      { 
        name: 'Gemini API / LLM', 
        level: 88, 
        description: 'GPT integration', 
        experience: '1+ years',
        icon: getSkillIcon('Gemini API / LLM')
      },
      { 
        name: 'CrewAI', 
        level: 75, 
        description: 'Multi-agent AI systems', 
        experience: '1+ years',
        icon: getSkillIcon('CrewAI')
      },
      { 
        name: 'Streamlit', 
        level: 80, 
        description: 'AI app deployment', 
        experience: '2+ years',
        icon: getSkillIcon('Streamlit')
      },
      { 
        name: 'Vector DBs / FIAAS', 
        level: 78, 
        description: 'Embeddings and retrieval', 
        experience: '1+ years',
        icon: getSkillIcon('Vector DBs / FIAAS')
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
        experience: '4+ years',
        icon: getSkillIcon('SQL')
      },

      { 
        name: 'Docker', 
        level: 42, 
        description: 'Containerization', 
        experience: 'less than a year',
        icon: getSkillIcon('Docker')
      },

      { 
        name: 'FastAPI and Flask', 
        level: 85, 
        description: 'API development', 
        experience: '2+ years',
        icon: getSkillIcon('FastAPI and Flask')
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
        experience: '1+ years',
        icon: getSkillIcon('React')
      },
      { 
        name: 'Node.js', 
        level: 82, 
        description: 'Backend development', 
        experience: '1+ years',
        icon: getSkillIcon('Node.js')
      },
      { 
        name: 'TypeScript', 
        level: 85, 
        description: 'Type-safe JavaScript', 
        experience: '1+ years',
        icon: getSkillIcon('TypeScript')
      },
      { 
        name: 'MongoDB', 
        level: 80, 
        description: 'NoSQL database', 
        experience: 'less than a year',
        icon: getSkillIcon('MongoDB')
      },
      { 
        name: 'Git', 
        level: 92, 
        description: 'Version control', 
        experience: '1+ years',
        icon: getSkillIcon('Git')
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
        experience: '2+ years',
        icon: getSkillIcon('Python')
      },
      {
        name: 'C/C++',
        level: 75,
        description: 'DSA, systems programming, competitive',
        experience: '2+ years',
        icon: getSkillIcon('C/C++')
      },
      {
        name: 'Java',
        level: 60,
        description: 'OOP & backend basics',
        experience: 'less than a year',
        icon: getSkillIcon('Java')
      },
      {
        name: 'JavaScript',
        level: 85,
        description: 'Dynamic web scripting',
        experience: '2+ years',
        icon: getSkillIcon('JavaScript')
      },
      {
        name: 'HTML',
        level: 90,
        description: 'Core structure of the web',
        experience: '2+ years',
        icon: getSkillIcon('HTML')
      },
      {
        name: 'CSS',
        level: 80,
        description: 'Styling and layouts',
        experience: '2+ years',
        icon: getSkillIcon('CSS')
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