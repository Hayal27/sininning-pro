import type { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
}

const Card: FC<CardProps> = ({
  children, 
  className = '', 
  padding = 'md',
  shadow = 'md'
}) => {
  const paddingClasses = {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10'
  };

  const shadowClasses = {
    sm: 'shadow-soft hover:shadow-medium',
    md: 'shadow-medium hover:shadow-strong',
    lg: 'shadow-strong hover:shadow-colored',
    xl: 'shadow-colored hover:shadow-glow'
  };

  const classes = `card-premium transition-all duration-500 hover:-translate-y-2 group ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`;

  return (
    <div className={classes}>
      <div className="relative z-10">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default Card;
