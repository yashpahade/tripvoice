import React from 'react';

export const SkeletonText = ({ height = 'h-4', width = 'w-full', lines = 1, gap = 'gap-2' }) => {
  return (
    <div className={`flex flex-col ${gap}`}>
      {Array.from({ length: lines }).map((_, i) => {
        // Vary widths slightly for natural look, last line shorter if multiple lines
        let w = width;
        if (lines > 1) {
          if (i === lines - 1) w = 'w-2/3';
          else if (i % 2 === 1) w = 'w-11/12';
        }
        return (
          <div key={i} className={`${w} ${height} animate-pulse bg-gray-200 rounded`} />
        );
      })}
    </div>
  );
};

export const SkeletonCircle = ({ size = 10 }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded-full flex-shrink-0`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

export const SkeletonRect = ({ width = 'w-full', height = 'h-32', rounded = 'rounded-lg', className = '' }) => {
  return (
    <div className={`${width} ${height} ${rounded} animate-pulse bg-gray-200 ${className}`} />
  );
};

export const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`p-4 border border-[#E7E7E7] rounded-xl bg-white w-full flex flex-col gap-4 ${className}`}>
      <SkeletonRect height="h-40" />
      <SkeletonText lines={2} gap="gap-3" />
      <div className="flex justify-between items-center mt-2">
        <SkeletonText width="w-20" />
        <SkeletonText width="w-16" />
      </div>
    </div>
  );
};

const Skeleton = ({ className = '' }) => {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
};

export default Skeleton;
