import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plane } from 'lucide-react';
import { motion } from 'framer-motion';
import brand from '@/config/brand';

const NotFound = React.memo(() => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <Helmet>
        <title>404 - Page Not Found | {brand.name}</title>
      </Helmet>

      <motion.div 
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8"
      >
        <Plane className="w-24 h-24 text-[#0D9488] opacity-80" />
      </motion.div>

      <h1 className="text-8xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#0D9488] to-[#0F766E] mb-4">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
        Page not found
      </h2>
      
      <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="px-8 py-3 bg-gradient-to-r from-[#0D9488] to-[#0F766E] text-white font-bold rounded-full shadow-lg shadow-teal-100 hover:shadow-xl transition-all"
        >
          Go Home
        </Link>
        <Link 
          to="/contact-us" 
          className="px-8 py-3 bg-white text-[#0D9488] border-2 border-[#0D9488] font-bold rounded-full hover:bg-teal-50 transition-all"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;
