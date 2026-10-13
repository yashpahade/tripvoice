import React from 'react';

const TripNestLogo = React.memo(({ isDark = false, className = '', size = 'md' }) => {
  const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-9 h-9' : 'w-7 h-7';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-2 select-none group ${className}`}>
      {/* Brand Icon: Stylized Nest + Compass Wing */}
      <div className={`relative ${iconSize} rounded-xl bg-gradient-to-br from-[#0D9488] to-[#0F766E] p-1.5 shadow-md flex items-center justify-center text-white transition-transform group-hover:scale-105`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer Nest / Horizon arc */}
          <path d="M3 14c2-5 7-8 12-8 3 0 5 1 6 3" stroke="#2DD4BF" strokeWidth="2" />
          {/* Compass / Wing swoop */}
          <path d="M7 17c3-3 8-6 14-6-1 4-4 8-9 8-2 0-4-.7-5-2z" fill="#0D9488" stroke="#FFFFFF" />
          {/* Nest foundation */}
          <path d="M4 18c3 2 9 3 14 0" stroke="#F97316" strokeWidth="2.5" />
        </svg>
        {/* Accent spark dot */}
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#F97316] ring-2 ring-white" />
      </div>

      {/* Brand Wordmark */}
      <div className="flex items-baseline font-black tracking-tight leading-none">
        <span className={`${textSize} ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
          Trip
        </span>
        <span className={`${textSize} bg-gradient-to-r from-[#0D9488] to-[#F97316] bg-clip-text text-transparent ml-0.5`}>
          Nest
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] ml-1 self-end mb-1" />
      </div>
    </div>
  );
});

TripNestLogo.displayName = 'TripNestLogo';

export default TripNestLogo;

