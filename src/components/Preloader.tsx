import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const fireTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 100);
        setTimeout(onComplete, 200);
      }
    });

    // Initial setup
    gsap.set([welcomeRef.current, fireTextRef.current], {
      opacity: 0,
      scale: 0.8,
      y: 30
    });

    // Animation sequence
    tl.to(welcomeRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
      .to(fireTextRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to([welcomeRef.current, fireTextRef.current], {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.inOut"
      }, "+=0.2")
      .to([welcomeRef.current, fireTextRef.current], {
        scale: 15,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in"
      }, "+=0.1")
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, "-=0.4");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-black via-[#0a0a0a] to-[#050505] flex items-center justify-center overflow-hidden"
      style={{ willChange: 'opacity' }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 0, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const colors = ['#00ff41', '#8b00ff'];
          const color = colors[i % colors.length];
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-40"
              style={{
                background: color,
                left: `${20 + i * 10}%`,
                top: `${20 + (i % 3) * 20}%`,
                animation: `float-${i % 2} ${3 + i * 0.5}s ease-in-out infinite`,
                willChange: 'transform'
              }}
            />
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <div
          ref={welcomeRef}
          className="mb-8"
          style={{ willChange: 'transform, opacity' }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-death-note font-bold text-green-400 mb-4">
            INITIALIZING
          </h1>
          <div className="w-32 h-1 bg-green-400 mx-auto"></div>
        </div>

        <div
          ref={fireTextRef}
          className="relative"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="text-2xl md:text-4xl font-gothic text-purple-400 uppercase">
            MATRIX PROTOCOL
          </div>
        </div>

        <div className="mt-12">
          <div className="w-64 h-2 bg-gray-900/50 mx-auto overflow-hidden border border-green-400/30">
            <div
              className="h-full bg-green-400"
              style={{
                animation: 'loading-pulse 1.5s ease-in-out infinite'
              }}
            />
          </div>
          <p className="text-green-400 font-clean mt-4 text-lg uppercase font-bold">
            LOADING DIGITAL MATRIX...
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        @keyframes loading-pulse {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
