import React from 'react';

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
  // Base styles - 프리미엄 스타일
  const baseStyles = 'rounded-2xl transition-all duration-500 backdrop-blur-sm will-change-transform';

  // Variant styles with 프리미엄 효과
  const variants = {
    default: 'bg-white/95 border border-gray-100 shadow-lg hover:shadow-2xl',
    elevated: 'bg-white shadow-xl hover:shadow-2xl',
    outlined: `bg-white border-2 border-primary-200 shadow-lg hover:border-primary-300`,
    filled: `bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100 shadow-lg`,
  };

  // Padding styles
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Hover effects with 마이크로 인터랙션
  const hoverStyles = hover || interactive
    ? 'hover:shadow-premium hover:scale-[1.02] hover:-translate-y-1 cursor-pointer'
    : '';

  // Interactive (glow effect)
  const interactiveStyles = interactive
    ? `hover:border-primary-300 hover:ring-4 hover:ring-primary-100 hover:shadow-glow-primary`
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
