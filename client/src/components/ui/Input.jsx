import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  required,
  disabled,
  multiline,
  ...rest
}, ref) => {
  const Component = multiline ? 'textarea' : 'input';
  
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-bold text-[#22262A]">
          {label} {required && <span className="text-[#EB2026]">*</span>}
        </label>
      )}
      
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-gray-500 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <Component
          ref={ref}
          id={name}
          name={name}
          type={multiline ? undefined : type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-3 py-2 border rounded-lg outline-none transition-all duration-200
            text-[#031021] bg-white
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error 
              ? 'border-[#EB2026] focus:ring-1 focus:ring-[#EB2026]' 
              : 'border-gray-300 focus:border-[#008CFF] focus:ring-1 focus:ring-[#008CFF]'
            }
            ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-75' : ''}
            ${multiline ? 'min-h-[100px] resize-y' : ''}
          `}
          {...rest}
        />
        
        {rightIcon && (
          <div className="absolute right-3 text-gray-500 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <span className={`text-xs ${error ? 'text-[#EB2026]' : 'text-gray-500'}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
