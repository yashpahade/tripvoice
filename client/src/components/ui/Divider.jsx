import React from 'react';

const Divider = ({
  orientation = 'horizontal',
  label,
  className = ''
}) => {
  if (orientation === 'vertical') {
    return (
      <div className={`h-full border-l border-gray-200 ${className}`} role="separator" aria-orientation="vertical" />
    );
  }

  if (label) {
    return (
      <div className={`flex items-center w-full ${className}`} role="separator">
        <div className="flex-grow border-t border-gray-200" />
        <span className="flex-shrink-0 px-4 text-sm text-gray-500 font-bold bg-white">
          {label}
        </span>
        <div className="flex-grow border-t border-gray-200" />
      </div>
    );
  }

  return (
    <hr className={`w-full border-t border-gray-200 ${className}`} role="separator" />
  );
};

export default Divider;
