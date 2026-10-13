import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Dropdown = ({
  trigger,
  items,
  align = 'right',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        setIsOpen(false);
        if (containerRef.current) containerRef.current.focus();
      }
      
      // Basic keyboard nav could be expanded
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const alignmentClass = align === 'left' ? 'left-0' : 'right-0';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      <div onClick={toggleDropdown} className="cursor-pointer inline-flex">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${alignmentClass} mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}
            role="menu"
            aria-orientation="vertical"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              {items.map((item, index) => {
                if (item.divider) {
                  return <div key={`divider-${index}`} className="my-1 border-t border-gray-100" />;
                }

                return (
                  <button
                    key={index}
                    disabled={item.disabled}
                    onClick={() => {
                      if (!item.disabled) {
                        if (item.onClick) item.onClick();
                        setIsOpen(false);
                      }
                    }}
                    className={`
                      ${item.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                      group flex w-full items-center px-4 py-2 text-sm
                    `}
                    role="menuitem"
                  >
                    {item.icon && (
                      <span className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
