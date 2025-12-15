import React from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const { config } = useWhiteLabel();
  const brandColor = config.institutionType === 'nonghyup' ? 'nonghyup' : 'shinhyup';

  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variants = {
    primary: `bg-${brandColor}-500 text-white hover:bg-${brandColor}-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:ring-${brandColor}-200`,
    secondary: `bg-${brandColor}-50 text-${brandColor}-700 hover:bg-${brandColor}-100 border-2 border-${brandColor}-200 hover:border-${brandColor}-300 focus:ring-${brandColor}-100`,
    outline: `bg-transparent text-${brandColor}-600 border-2 border-${brandColor}-500 hover:bg-${brandColor}-50 focus:ring-${brandColor}-100`,
    ghost: `bg-transparent text-${brandColor}-600 hover:bg-${brandColor}-50 focus:ring-${brandColor}-100`,
    danger: 'bg-error-500 text-white hover:bg-error-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:ring-error-200',
  };

  // Size styles
  const sizes = {
    xs: 'px-3 py-1.5 text-xs gap-1.5',
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
    xl: 'px-10 py-5 text-xl gap-3',
  };

  // Loading spinner
  const spinnerSizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className={`animate-spin ${spinnerSizes[size]}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>처리중...</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
