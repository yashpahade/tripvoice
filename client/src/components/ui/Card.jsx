import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  onClick,
  as: Component = 'div',
  ...rest
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7'
  };

  const baseStyles = 'bg-white rounded-xl border border-[#E7E7E7] shadow-sm';
  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200' : '';
  const clickStyles = onClick ? 'cursor-pointer' : '';

  return (
    <Component
      className={`${baseStyles} ${paddings[padding]} ${hoverStyles} ${clickStyles} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Card;
