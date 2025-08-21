import { useState, useEffect } from 'react';
import type { FC } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for fade out animation
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`preloader ${progress >= 100 ? 'hidden' : ''}`}>
      {/* Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="magic-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
        
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="paint-splash"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Paint Drop Animation */}
        <div className="paint-drop mb-8">
          <div className="absolute inset-0 paint-drop opacity-50 animate-pulse"></div>
        </div>

        {/* Company Name */}
        <h1 className="loading-text mb-4">
          ShinningPaint
        </h1>
        
        <p className="text-gray-300 text-lg mb-6 font-light">
          Manufacturing Excellence Since 1985
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <p className="text-gray-400 text-sm mb-6">
          {Math.round(progress)}% Complete
        </p>

        {/* Loading Dots */}
        <div className="loading-dots">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-500 text-sm mt-4 animate-pulse">
          Preparing your premium experience...
        </p>
      </div>

      {/* Floating Shapes */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="floating-shape"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        >
          <div 
            className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full"
            style={{
              animation: `morphShape ${3 + Math.random() * 4}s ease-in-out infinite`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Preloader;
