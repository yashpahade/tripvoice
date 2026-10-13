import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  fullWidth = false,
  className = ''
}) => {
  // If activeTab is not controlled, manage internally (though controlled is preferred)
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id);
  const currentTab = activeTab !== undefined ? activeTab : internalActiveTab;

  const handleTabClick = (id) => {
    if (onChange) onChange(id);
    else setInternalActiveTab(id);
  };

  const getTabStyles = (isActive) => {
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-[#008CFF] text-white rounded-full'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full';
      case 'contained':
        return isActive
          ? 'bg-white shadow text-[#008CFF] rounded-md'
          : 'text-gray-600 hover:text-gray-900 rounded-md';
      case 'underline':
      default:
        return isActive
          ? 'text-[#008CFF]'
          : 'text-gray-500 hover:text-gray-800';
    }
  };

  const containerStyles = {
    underline: 'border-b border-gray-200',
    pills: 'gap-2',
    contained: 'bg-gray-100 p-1 rounded-lg inline-flex gap-1'
  };

  return (
    <div className={`${containerStyles[variant] || ''} flex ${fullWidth ? 'w-full' : ''} ${className}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleTabClick(tab.id)}
            className={`
              relative flex items-center justify-center font-bold px-4 py-2.5 transition-colors focus:outline-none
              ${fullWidth ? 'flex-1' : ''}
              ${getTabStyles(isActive)}
            `}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            <span className="relative z-10">{tab.label}</span>
            
            {variant === 'underline' && isActive && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008CFF]"
                initial={false}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
