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
        setTimeout(onComplete, 500);
      }
    });

    // Initial setup
    gsap.set([welcomeRef.current, fireTextRef.current], {
      opacity: 0,
      scale: 0.5,
      y: 50
    });

    // Animation sequence
    tl.to(welcomeRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .to(fireTextRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to([welcomeRef.current, fireTextRef.current], {
      scale: 1.2,
      duration: 0.5,
      ease: "power2.inOut"
    }, "+=0.5")
    .to([welcomeRef.current, fireTextRef.current], {
      scale: 20,
      opacity: 0,
      duration: 1.2,
      ease: "power2.in"
    }, "+=0.3")
    .to(preloaderRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.5");

    // Particle animation
    const particles = particlesRef.current?.children;
    if (particles) {
      Array.from(particles).forEach((particle, i) => {
        gsap.to(particle, {
          x: `random(-200, 200)`,
          y: `random(-200, 200)`,
          rotation: `random(0, 360)`,
          scale: `random(0.5, 1.5)`,
          duration: `random(2, 4)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1
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
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black">
        <div className="absolute inset-0 opacity-30">
          <div className="grid-background"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Welcome Text */}
        <div
          ref={welcomeRef}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 mb-4">
            WELCOME
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto"></div>
        </div>

        {/* Fire Text Effect */}
        <div
          ref={fireTextRef}
          className="relative"
        >
          <div className="text-2xl md:text-4xl font-vt323 text-orange-300 fire-text">
            TO THE DIGITAL REALM
          </div>
          
          {/* Fire particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulse"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading indicator */}
        <div className="mt-12">
          <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse loading-bar"></div>
          </div>
          <p className="text-orange-300 font-vt323 mt-4 text-lg animate-pulse">
            Initializing...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;