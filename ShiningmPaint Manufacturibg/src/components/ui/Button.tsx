import type { FC, ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-1 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const variantClasses = {
    primary: 'bg-gradient-primary text-white hover:shadow-glow focus:ring-blue-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 focus:ring-blue-500 shadow-md hover:shadow-lg',
    outline: 'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 shadow-md hover:shadow-lg',
    ghost: 'text-gray-700 hover:bg-white/50 hover:text-blue-600 focus:ring-gray-500 backdrop-blur-sm'
  };

  const sizeClasses = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
};

export default Button;
