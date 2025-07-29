import React from 'react';
import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;