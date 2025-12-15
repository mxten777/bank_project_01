import React, { forwardRef, useId } from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      icon,
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const { config } = useWhiteLabel();
    const brandColor = config.institutionType === 'nonghyup' ? 'nonghyup' : 'shinhyup';
    const generatedId = useId();

    const inputId = props.id || `input-${generatedId}`;

    // Base styles
    const baseStyles = 'px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none';

    // State styles
    const stateStyles = error
      ? 'border-error-500 focus:border-error-500 focus:ring-4 focus:ring-error-100'
      : success
      ? 'border-success-500 focus:border-success-500 focus:ring-4 focus:ring-success-100'
      : `border-gray-300 focus:border-${brandColor}-500 focus:ring-4 focus:ring-${brandColor}-100`;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Icon */}
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={`
              ${baseStyles}
              ${stateStyles}
              ${icon ? 'pl-12' : ''}
              ${fullWidth ? 'w-full' : ''}
              ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
              ${className}
            `}
            {...props}
          />

          {/* Success/Error Icon */}
          {(error || success) && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {error && (
                <svg className="w-5 h-5 text-error-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {success && (
                <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          )}
        </div>

        {/* Helper/Error/Success Text */}
        {(error || success || helperText) && (
          <p
            className={`mt-2 text-sm ${
              error
                ? 'text-error-500'
                : success
                ? 'text-success-500'
                : 'text-gray-500'
            }`}
          >
            {error || success || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
