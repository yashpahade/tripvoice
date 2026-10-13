import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({
  content,
  children,
  position = 'top',
  delay = 200,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom': return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left': return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right': return 'left-full top-1/2 -translate-y-1/2 ml-2';
      case 'top':
      default: return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'bottom': return 'bottom-full left-1/2 -translate-x-1/2 border-b-[#22262A] border-t-transparent border-l-transparent border-r-transparent';
      case 'left': return 'left-full top-1/2 -translate-y-1/2 border-l-[#22262A] border-t-transparent border-b-transparent border-r-transparent';
      case 'right': return 'right-full top-1/2 -translate-y-1/2 border-r-[#22262A] border-t-transparent border-b-transparent border-l-transparent';
      case 'top':
      default: return 'top-full left-1/2 -translate-x-1/2 border-t-[#22262A] border-b-transparent border-l-transparent border-r-transparent';
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 px-2.5 py-1.5 bg-[#22262A] text-white text-sm rounded shadow-lg whitespace-nowrap pointer-events-none ${getPositionClasses()} ${className}`}
            role="tooltip"
          >
            {content}
            <div className={`absolute border-[5px] ${getArrowClasses()}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
