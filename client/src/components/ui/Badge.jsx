import React from 'react';

const Badge = ({
  variant = 'neutral',
  size = 'md',
  children,
  className = '',
  icon
}) => {
  const variants = {
    success: 'bg-[#1A7971]/10 text-[#1A7971]',
    warning: 'bg-[#FF7F3F]/10 text-[#FF7F3F]',
    danger: 'bg-[#EB2026]/10 text-[#EB2026]',
    info: 'bg-[#008CFF]/10 text-[#008CFF]',
    neutral: 'bg-gray-100 text-gray-600',
    offer: 'bg-[#EB2026] text-white'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  };

  return (
    <span className={`inline-flex items-center justify-center font-bold rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon && <span className="mr-1.5 flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
