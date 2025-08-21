import { useState, useEffect } from 'react';
import type { FC } from 'react';

const CustomCursor: FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener('mousemove', updatePosition);
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        className={`cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x - 10}px`,
          top: `${position.y - 10}px`,
        }}
      />
      <div
        className={`cursor-ring ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x - 20}px`,
          top: `${position.y - 20}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;
