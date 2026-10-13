import React from 'react';

const Container = ({ children, className = '', size = 'lg' }) => {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div className={`mx-auto px-4 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
