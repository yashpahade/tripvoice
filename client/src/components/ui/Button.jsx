import React, { forwardRef } from 'react';

const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  children,
  isLoading,
  disabled,
  leftIcon,
  rightIcon,
  fullWidth,
  className = '',
  type = 'button',
  onClick,
  ...rest
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white rounded-full shadow hover:shadow-lg hover:scale-[1.02]',
    secondary: 'border-2 border-[#008CFF] text-[#008CFF] rounded-full bg-transparent hover:bg-[#008CFF]/5',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 rounded-lg',
    danger: 'bg-[#EB2026] text-white rounded-full hover:bg-red-700',
    link: 'text-[#008CFF] hover:underline p-0 m-0'
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };

  const linkSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const appliedVariant = variants[variant] || variants.primary;
  const appliedSize = variant === 'link' ? linkSizes[size] : (sizes[size] || sizes.md);
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = (disabled || isLoading) ? 'opacity-50 pointer-events-none' : '';

  return (
    <button
      ref={ref}
      type={type}
      className={`${baseStyles} ${appliedVariant} ${appliedSize} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {leftIcon && <span className="mr-2 flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2 flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
