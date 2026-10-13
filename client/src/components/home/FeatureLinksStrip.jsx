import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Route, CreditCard, Users, Gift } from 'lucide-react';

const FeatureLinksStrip = React.memo(() => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-12 mb-6">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 py-3.5 px-6 flex flex-wrap items-center justify-between gap-4">
        {/* 1. Where2Go */}
        <Link 
          to="/holidays" 
          className="flex items-center gap-2.5 text-[#0F172A] hover:text-[#0D9488] transition-colors py-1 group"
        >
          <div className="w-8 h-8 rounded-full bg-teal-50 text-[#0D9488] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-sm font-black tracking-tight">Where2Go</span>
        </Link>

        <div className="hidden lg:block w-px h-8 bg-slate-200" />

        {/* 2. How2Go (with 'new' badge) */}
        <Link 
          to="/cabs" 
          className="flex items-center gap-2.5 text-[#0F172A] hover:text-[#0D9488] transition-colors py-1 group"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Route className="w-4 h-4" />
          </div>
          <div className="text-left leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black tracking-tight">How2Go</span>
              <span className="px-1 py-0.2 bg-[#F97316] text-white text-[8px] font-black rounded-sm uppercase tracking-tighter">
                new
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-semibold">Find routes to anywhere</p>
          </div>
        </Link>

        <div className="hidden lg:block w-px h-8 bg-slate-200" />

        {/* 3. TripNest Card */}
        <Link 
          to="/offers" 
          className="flex items-center gap-2.5 text-[#0F172A] hover:text-[#0D9488] transition-colors py-1 group"
        >
          <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CreditCard className="w-4 h-4" />
          </div>
          <div className="text-left leading-tight">
            <span className="text-sm font-black tracking-tight block">TripNest Travel Rewards</span>
            <p className="text-[10px] text-gray-500 font-semibold">Never-expiring rewards & big benefits</p>
          </div>
        </Link>

        <div className="hidden lg:block w-px h-8 bg-slate-200" />

        {/* 4. MICE */}
        <Link 
          to="/corporate-travel" 
          className="flex items-center gap-2.5 text-[#0F172A] hover:text-[#0D9488] transition-colors py-1 group"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-left leading-tight">
            <span className="text-sm font-black tracking-tight block">MICE</span>
            <p className="text-[10px] text-gray-500 font-semibold">Offsites, Events & Meetings</p>
          </div>
        </Link>

        <div className="hidden lg:block w-px h-8 bg-slate-200" />

        {/* 5. Gift Cards */}
        <Link 
          to="/gift-cards" 
          className="flex items-center gap-2.5 text-[#0F172A] hover:text-[#0D9488] transition-colors py-1 group"
        >
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Gift className="w-4 h-4" />
          </div>
          <span className="text-sm font-black tracking-tight">Gift Cards</span>
        </Link>
      </div>
    </div>
  );
});

FeatureLinksStrip.displayName = 'FeatureLinksStrip';

export default FeatureLinksStrip;
