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
    title: 'AIML Hub Website',
    role: 'Web Developer',
    description: 'Official website for AIML Hub built collaboratively with Agnibha Nanda and Aarnaya Jain. Features a dynamic React frontend with TypeScript.',
    image: '/AIML_website.jpeg',
    tech: ['React', 'TypeScript'],
    difficulty: 4,
    status: 'Completed',
    demoUrl: 'https://ai-ml-hub.vercel.app',
    githubUrl: 'https://github.com/agnibhananda/ai-ml-hub-website',
    featured: true
  },
  {
    title: 'IEEE SB JIIT Website',
    role: 'Web Developer',
    description: 'Website for IEEE Student Branch JIIT built with the official IEEE web team. Focused on elegant UI and smooth experience.',
    image: '/IEEE_website.png',
    tech: ['React', 'JavaScript', 'JSX','Three.js','Blender'],
    difficulty: 4,
    status: 'Completed',
    demoUrl: 'https://www.ieeesbjiit.xyz/',
    githubUrl: 'https://github.com/ieeesbjiit/ieeesbjiit-official25',
    featured: true
  },
  {
    title: 'AIMI - AIML Hub Chatbot',
    role: 'AI Developer',
    description: 'A Retrieval-Augmented Generation (RAG) based chatbot that helps users query AIML Hub data with precision and speed.',
    image: '/AIML_chatbot.jpeg',
    tech: ['FastAPI', 'Render', 'LangChain', 'FAISS', 'Gemini'],
    difficulty: 4,
    status: 'Completed',
    demoUrl: 'https://ai-ml-hub.vercel.app',
    githubUrl: 'https://github.com/Harsimran-singh-7765/aimlhub-chatbot',
  },
  {
    title: 'JIIT Mess Schedule',
    role: 'Web Developer',
    description: 'An OCR-based app that reads and displays weekly mess menus in an organized interface.',
    image: '/JIIT_MESS.png',
    tech: ['React', 'TypeScript','OCR'],
    difficulty: 3,
    status: 'Completed',
    demoUrl: 'mess-schedule.vercel.app',
    githubUrl: 'https://github.com/Harsimran-singh-7765/JIIT-MESS-SCHEDULE'
  },
  {
    title: 'Chat Twin',
    role: 'AI Creator',
    description: 'Transforms your WhatsApp chat history into a conversational AI clone of you using cutting-edge RAG and Gemini APIs.',
    image: '/Chat_twin.png',
    tech: ['Gemini', 'RAG', 'FAISS', 'LangChain', 'Streamlit'],
    difficulty: 4,
    status: 'Completed',
    demoUrl: 'https://chat-twin.streamlit.app/',
    githubUrl: 'https://github.com/Harsimran-singh-7765/chat-twin-ai'
  },
  {
    title: 'AI Debate Adjudicator',
    role: 'AI Engineer',
    description: 'Analyzes traditional APD debate recordings by transcribing and evaluating them to provide fair adjudications.',
    image: '/Ai_adj.jpeg',
    tech: ['Gemini', 'Whisper', 'LangChain', 'Streamlit'],
    difficulty: 5,
    status: 'Completed',
    demoUrl: 'https://github.com/Harsimran-singh-7765/APD-AI-DEBATE-ANALYZER',
    githubUrl: 'https://github.com/Harsimran-singh-7765/APD-AI-DEBATE-ANALYZER'
  },
  {
    title: 'Food Sensei',
    role: 'Hackathon Participant',
    description: 'Hackathon project for TesserX by JIIT Optica. Recognizes food from images, suggests healthy alternatives, and debunks food myths via chatbot.',
    image: '/Food_sensei.jpeg',
    tech: ['CrewAI', 'Flask', 'HTML', 'CSS', 'JavaScript'],
    difficulty: 4,
    status: 'Completed',
    demoUrl: 'https://devfolio.co/projects/foodsensei-2df8',
    githubUrl: 'https://github.com/Harsimran-singh-7765/FOOD-SENSEI?tab=readme-ov-file'
  },
  {
    title: 'OpenSource Buddy',
    role: 'AI Builder',
    description: 'Helps users discover beginner-friendly open-source GitHub projects using Gemini and the GitHub API.',
    image: 'opensource_buddy.jpeg',
    tech: ['CrewAI', 'Gemini', 'HTML', 'CSS', 'JavaScript'],
    difficulty: 4,
    status: 'Completed',
    demoUrl: '',
    githubUrl: 'https://github.com/Harsimran-singh-7765/OpenSource-Buddy'
  },
  {
    title: 'The Project Builder',
    role: 'AI Engineer',
    description: 'Automatically generates a complete project setup—including synopsis, documentation, codebase, and chatbot support—based on idea input.',
    image: '/project-Builder.jpeg',
    tech: ['Gemini', 'CrewAI', 'HTML', 'Flask', 'CSS'],
    difficulty: 5,
    status: 'Completed',
    demoUrl: '',
    githubUrl: 'https://github.com/Harsimran-singh-7765/Project-Builder'
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
