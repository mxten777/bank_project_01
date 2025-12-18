import React from 'react';

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
  // Base styles - 프리미엄 스타일
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-premium active:shadow-lg will-change-transform';

  // Variant styles with 프리미엄 효과
  const variants = {
    primary: `bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 text-white hover:from-primary-700 hover:via-primary-600 hover:to-secondary-700 hover:scale-[1.02] active:scale-[0.98] focus:ring-primary-200 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700`,
    secondary: `bg-white text-primary-700 hover:bg-primary-50 border-2 border-primary-200 hover:border-primary-300 hover:scale-[1.02] active:scale-[0.98] focus:ring-primary-100 hover:shadow-glow-primary`,
    outline: `bg-transparent text-primary-600 border-2 border-primary-500 hover:bg-primary-50 hover:border-primary-600 hover:scale-[1.02] active:scale-[0.98] focus:ring-primary-100`,
    ghost: `bg-transparent text-primary-600 hover:bg-primary-50 hover:scale-[1.02] active:scale-[0.98] focus:ring-primary-100 shadow-none hover:shadow-sm`,
    danger: 'bg-gradient-to-r from-error-500 to-error-600 text-white hover:from-error-600 hover:to-error-700 hover:scale-[1.02] active:scale-[0.98] focus:ring-error-200',
  };

  // Size styles - text-base for default
  const sizes = {
    xs: 'px-3 py-1.5 text-sm gap-1.5',
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-base gap-3',
    xl: 'px-10 py-5 text-lg gap-3',
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
