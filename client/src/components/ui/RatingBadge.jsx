import React from 'react';

const RatingBadge = ({
  rating,
  reviewCount,
  size = 'md',
  showCount = true,
  className = ''
}) => {
  if (rating === undefined || rating === null) return null;

  const numRating = Number(rating);
  
  // Determine color and text based on rating
  let colorClass = 'bg-[#1A7971]'; // Success green
  let text = 'Exceptional';
  
  if (numRating >= 4) {
    if (numRating < 4.5) {
      text = 'Very Good';
    }
  } else if (numRating >= 3.5) {
    colorClass = 'bg-[#008CFF]'; // Primary blue
    text = 'Good';
  } else if (numRating >= 3) {
    colorClass = 'bg-[#FF7F3F]'; // Warning orange
    text = 'Average';
  } else {
    colorClass = 'bg-[#EB2026]'; // Danger red
    text = 'Below Average';
  }

  const sizes = {
    sm: {
      badge: 'px-1.5 py-0.5 text-xs rounded',
      text: 'text-xs',
      count: 'text-xs'
    },
    md: {
      badge: 'px-2 py-1 text-sm rounded-md',
      text: 'text-sm font-bold',
      count: 'text-xs'
    },
    lg: {
      badge: 'px-2.5 py-1.5 text-base rounded-md',
      text: 'text-base font-bold',
      count: 'text-sm'
    }
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${colorClass} text-white font-bold ${currentSize.badge}`}>
        {numRating.toFixed(1)}
      </div>
      <div className="flex flex-col">
        <span className={`${currentSize.text} text-[#031021]`}>{text}</span>
        {showCount && reviewCount > 0 && (
          <span className={`${currentSize.count} text-gray-500`}>
            {reviewCount.toLocaleString()} reviews
          </span>
        )}
      </div>
    </div>
  );
};

export default RatingBadge;
