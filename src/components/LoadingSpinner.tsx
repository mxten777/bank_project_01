import React from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  fullScreen = false,
  text = '로딩 중...'
}) => {
  const { config } = useWhiteLabel();
  
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
    xl: 'w-24 h-24 border-4',
  };
  
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* 외부 원 */}
        <div 
          className={`${sizeClasses[size]} rounded-full animate-spin`}
          style={{ 
            borderColor: `${config.colorTheme.primary}20`,
            borderTopColor: config.colorTheme.primary 
          }}
        />
        {/* 내부 펄스 효과 */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            size === 'sm' ? 'w-3 h-3' : 
            size === 'md' ? 'w-5 h-5' : 
            size === 'lg' ? 'w-8 h-8' : 'w-12 h-12'
          } rounded-full animate-pulse`}
          style={{ backgroundColor: config.colorTheme.primary, opacity: 0.3 }}
        />
      </div>
      {text && (
        <p 
          className={`font-semibold ${
            size === 'sm' ? 'text-sm' : 
            size === 'md' ? 'text-base' : 
            size === 'lg' ? 'text-lg' : 'text-xl'
          }`}
          style={{ color: config.colorTheme.primary }}
        >
          {text}
        </p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner;
