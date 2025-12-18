import React from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  hover?: boolean;
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  hover = false,
  interactive = false,
  padding = 'md',
  children,
  className = '',
  onClick,
}) => {
  const { config } = useWhiteLabel();
  const brandColor = config.institutionType === 'nonghyup' ? 'nonghyup' : 'shinhyup';

  // Base styles - rounded-xl, transition-all duration-300
  const baseStyles = 'rounded-xl transition-all duration-300';

  // Variant styles with shadow-lg
  const variants = {
    default: 'bg-white border border-gray-200 shadow-lg',
    elevated: 'bg-white shadow-xl',
    outlined: `bg-white border-2 border-${brandColor}-200 shadow-md`,
    filled: `bg-${brandColor}-50 border border-${brandColor}-100 shadow-md`,
  };

  // Padding styles - p-6 default
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Hover effects with scale-105
  const hoverStyles = hover || interactive
    ? 'hover:shadow-premium hover:scale-105 cursor-pointer'
    : '';

  // Interactive (glow effect)
  const interactiveStyles = interactive
    ? `hover:border-${brandColor}-300 hover:ring-4 hover:ring-${brandColor}-100`
    : '';

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverStyles}
        ${interactiveStyles}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
