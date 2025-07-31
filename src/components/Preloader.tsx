import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const fireTextRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300);
      }
    });

    // Initial setup
    gsap.set([welcomeRef.current, fireTextRef.current], {
      opacity: 0,
      scale: 0.5,
      y: 50
    });

    // Animation sequence with smoother transitions
    tl.to(welcomeRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: "back.out(1.7)"
    })
    .to(fireTextRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.6")
    .to([welcomeRef.current, fireTextRef.current], {
      scale: 1.1,
      duration: 0.6,
      ease: "power2.inOut"
    }, "+=0.4")
    .to([welcomeRef.current, fireTextRef.current], {
      scale: 25,
      opacity: 0,
      duration: 1.5,
      ease: "power2.in"
    }, "+=0.2")
    .to(preloaderRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "-=0.8");

    // Particle animation with city sunset colors
    const particles = particlesRef.current?.children;
    if (particles) {
      Array.from(particles).forEach((particle, i) => {
        gsap.to(particle, {
          x: `random(-300, 300)`,
          y: `random(-300, 300)`,
          rotation: `random(0, 360)`,
          scale: `random(0.3, 1.2)`,
          duration: `random(3, 6)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.15
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}

  className="fixed inset-0 z-50 bg-gradient-to-br from-black via-[#0a0a0a] to-[#050505] matrix-bg flex items-center justify-center overflow-hidden"


    >
      {/* Animated Background with matching colors */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="matrix-grid"></div>
        </div>
      </div>

      {/* Floating Particles with city sunset palette */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const colors = ['#00ff41', '#8b00ff', '#00cc33', '#6600cc'];
          const color = colors[i % colors.length];
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle, ${color}, ${color}88)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 10px ${color}`,
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Welcome Text with matching gradient */}
        <div
          ref={welcomeRef}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-death-note font-bold text-green-400 mb-4 glow-green">
            INITIALIZING
          </h1>
          <div className="w-32 h-1 bg-green-400 mx-auto shadow-lg shadow-green-400/50"></div>
        </div>

        {/* Fire Text Effect with consistent colors */}
        <div
          ref={fireTextRef}
          className="relative"
        >
          <div className="text-2xl md:text-4xl font-gothic text-purple-400 glow-purple uppercase">
            MATRIX PROTOCOL
          </div>
          
          {/* Fire particles with matching colors */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => {
              const colors = ['#00ff41', '#8b00ff'];
              const color = colors[i % colors.length];
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full animate-pulse"
                  style={{
                    backgroundColor: color,
                    left: `${15 + i * 6}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.15}s`,
                    boxShadow: `0 0 8px ${color}`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Loading indicator with matching theme */}
        <div className="mt-12">
          <div className="w-64 h-2 bg-gray-900/50 mx-auto overflow-hidden border-2 border-green-400/30">
            <div className="h-full bg-green-400 animate-pulse loading-bar shadow-lg shadow-green-400/30"></div>
          </div>
          <p className="text-green-400 font-clean mt-4 text-lg animate-pulse glow-green uppercase font-bold">
            LOADING DIGITAL MATRIX...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;