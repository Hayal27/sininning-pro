import { useEffect, useState } from 'react';
import type { FC } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

const MagicalBackground: FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create initial particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: ['#667eea', '#764ba2', '#f093fb', '#4facfe'][Math.floor(Math.random() * 4)],
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    setParticles(initialParticles);

    // Animation loop
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        const newX = particle.x + particle.speedX;
        const newY = particle.y + particle.speedY;

        return {
          ...particle,
          // Wrap around screen
          x: newX > window.innerWidth ? 0 : newX < 0 ? window.innerWidth : newX,
          y: newY > window.innerHeight ? 0 : newY < 0 ? window.innerHeight : newY,
        };
      }));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 animate-pulse"></div>
      
      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-200/20 dark:border-blue-800/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-purple-200/20 dark:border-purple-800/20 rounded-lg animate-bounce" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-gradient-to-r from-pink-200/10 to-blue-200/10 dark:from-pink-800/10 dark:to-blue-800/10 rounded-full animate-pulse"></div>

      {/* Paint Brush Strokes */}
      <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-10" viewBox="0 0 1000 1000">
        <path
          d="M100,200 Q300,100 500,200 T900,200"
          stroke="url(#gradient1)"
          strokeWidth="3"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M200,400 Q400,300 600,400 T1000,400"
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <path
          d="M50,600 Q250,500 450,600 T850,600"
          stroke="url(#gradient3)"
          strokeWidth="4"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#667eea" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#764ba2" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f093fb" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f5576c" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4facfe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default MagicalBackground;
