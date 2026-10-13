import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Mobile view: Compact stepper */}
      <div className="md:hidden flex flex-col items-center mb-4">
        <span className="text-sm font-bold text-gray-500 mb-1">
          Step {currentStep + 1} of {steps.length}
        </span>
        <h3 className="text-lg font-bold text-[#031021]">
          {steps[currentStep]?.label}
        </h3>
        <div className="flex w-full mt-3 gap-1">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 flex-1 rounded-full ${idx <= currentStep ? 'bg-[#008CFF]' : 'bg-gray-200'}`} 
            />
          ))}
        </div>
      </div>

      {/* Desktop view: Full horizontal stepper */}
      <div className="hidden md:flex items-start justify-between relative w-full">
        {/* Background line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-10" />
        
        {/* Active line */}
        <div 
          className="absolute top-5 left-0 h-0.5 bg-[#008CFF] -z-10 transition-all duration-300" 
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center relative z-10 w-32 -ml-16 first:ml-0 last:-mr-16 first:w-16 last:w-16">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-white transition-colors
                  ${isCompleted ? 'bg-[#008CFF] border-2 border-[#008CFF] text-white' : ''}
                  ${isCurrent ? 'border-2 border-[#008CFF] text-[#008CFF] ring-4 ring-[#008CFF]/10' : ''}
                  ${!isCompleted && !isCurrent ? 'border-2 border-gray-200 text-gray-400 bg-gray-50' : ''}
                `}
              >
                {isCompleted ? <Check className="w-5 h-5 text-white" /> : (index + 1)}
              </div>
              
              <div className={`mt-3 text-center ${index === 0 ? 'items-start text-left' : index === steps.length - 1 ? 'items-end text-right' : ''}`}>
                <div className={`text-sm font-bold ${isCurrent ? 'text-[#031021]' : isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                  {step.label}
                </div>
                {step.description && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
