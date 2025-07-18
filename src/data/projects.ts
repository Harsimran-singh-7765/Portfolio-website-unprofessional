export interface Project {
  title: string;
  role: string;
  description: string;
  image: string;
  tech: string[];
  difficulty: number; // 1-5 stars
  status: 'Completed' | 'In Progress' | 'Prototype';
  demoUrl: string;
  githubUrl: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: 'AI Chatbot Platform',
    role: 'AI Engineer',
    description: 'Intelligent conversational AI using LangChain and OpenAI',
    image: '/images/project-1.jpg',
    tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI'],
    difficulty: 4,
    status: 'Completed',
    demoUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    title: 'Computer Vision System',
    role: 'ML Engineer',
    description: 'Real-time object detection and classification system',
    image: '/images/project-2.jpg',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'YOLO'],
    difficulty: 5,
    status: 'In Progress',
    demoUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    title: 'Data Analytics Dashboard',
    role: 'Data Scientist',
    description: 'Interactive dashboard for business intelligence and insights',
    image: '/images/project-3.jpg',
    tech: ['Python', 'Pandas', 'Streamlit', 'Plotly'],
    difficulty: 3,
    status: 'Completed',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'ML Model Deployment',
    role: 'MLOps Engineer',
    description: 'Scalable machine learning model deployment pipeline',
    image: '/images/project-4.jpg',
    tech: ['Docker', 'AWS', 'FastAPI', 'MLflow'],
    difficulty: 5,
    status: 'Prototype',
    demoUrl: '#',
    githubUrl: '#'
  }
];

// Helper functions for easy project management
export const addProject = (project: Project) => {
  projects.push(project);
};

export const updateProject = (index: number, updates: Partial<Project>) => {
  if (projects[index]) {
    projects[index] = { ...projects[index], ...updates };
  }
};

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getProjectsByStatus = (status: Project['status']) => {
  return projects.filter(project => project.status === status);
};