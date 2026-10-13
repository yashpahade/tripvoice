import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Rocket } from 'lucide-react';
import brand from '@/config/brand';

const ComingSoon = React.memo(() => {
  const location = useLocation();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <Helmet>
        <title>Coming Soon | {brand.name}</title>
      </Helmet>

      <div className="bg-teal-50 p-6 rounded-full mb-8">
        <Rocket className="w-16 h-16 text-[#0D9488]" />
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4">
        Coming Soon
      </h1>
      
      <p className="text-gray-500 max-w-md mx-auto mb-6 text-lg">
        We're working hard on bringing you this feature. Check back soon!
      </p>

      <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-gray-500 font-mono mb-10">
        Path: {location.pathname}
      </div>

      <Link 
        to="/" 
        className="px-8 py-3 bg-gradient-to-r from-[#0D9488] to-[#0F766E] text-white font-bold rounded-full shadow-lg shadow-teal-100 hover:shadow-xl transition-all"
      >
        Go Home
      </Link>
    </div>
  );
});

ComingSoon.displayName = 'ComingSoon';

export default ComingSoon;
