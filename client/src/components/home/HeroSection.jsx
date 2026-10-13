import React, { useState, useCallback } from 'react';
import { 
  Plane, Building2, Home, Palmtree, TrainFront, Bus, Car, 
  Compass, Stamp, Shield, ChevronDown, Briefcase 
} from 'lucide-react';
import FlightSearchForm from './FlightSearchForm';
import { 
  HotelSearchForm, 
  BusSearchForm, 
  FamilyPackageSearchForm, 
  OfficePackageSearchForm, 
  TrainSearchForm 
} from './OtherServicesForms';
import FeatureLinksStrip from './FeatureLinksStrip';
import MyraChatbotWidget from './MyraChatbotWidget';

export const HERO_SERVICE_TABS = [
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'rooms', label: 'Rooms & Hotels', icon: Building2 },
  { id: 'buses', label: 'Buses', icon: Bus },
  { id: 'family_packages', label: 'Family Packages', icon: Palmtree },
  { id: 'office_packages', label: 'Office Packages', icon: Briefcase },
  { id: 'trains', label: 'Trains', icon: TrainFront },
  { id: 'homestays', label: 'Villas & Homestays', icon: Home },
  { id: 'cabs', label: 'Cabs', icon: Car },
  { id: 'tours', label: 'Tours & Attractions', icon: Compass },
  { id: 'visa', label: 'Visa', icon: Stamp },
  { id: 'insurance', label: 'Travel Insurance', icon: Shield },
];

const HeroSection = React.memo(() => {
  const [activeTab, setActiveTab] = useState('flights');

  const handleTabSelect = useCallback((id) => {
    setActiveTab(id);
  }, []);

  return (
    <div className="relative w-full">
      {/* Background Hero Banner with Majestic Mountains */}
      <div 
        className="relative bg-cover bg-center min-h-[560px] md:min-h-[600px] pt-24 md:pt-28 pb-20 md:pb-24 px-3 sm:px-4 transition-all"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.75) 0%, rgba(19, 78, 74, 0.35) 45%, rgba(15, 23, 42, 0.88) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')`,
          backgroundPosition: 'center 35%'
        }}
      >
        <div className="max-w-[1240px] mx-auto">
          {/* 1. Sticky Service Navigation Tabs Strip (Navbar Area) */}
          <div className="bg-white rounded-2xl shadow-xl px-2 sm:px-6 py-2 border border-slate-100 sticky top-[var(--header-h,72px)] z-20 overflow-x-auto hide-scrollbar">
            <nav className="flex items-center justify-between min-w-[850px] md:min-w-0" aria-label="Hero Navigation">
              {HERO_SERVICE_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabSelect(tab.id)}
                    className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all relative flex-1 text-center group cursor-pointer ${
                      isActive 
                        ? 'text-[#0D9488] font-black' 
                        : 'text-gray-600 hover:text-[#0F172A] hover:bg-slate-50 font-bold'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-[#0D9488]' : 'text-gray-500'}`} />
                    <span className="text-[11px] whitespace-nowrap leading-tight tracking-tight">
                      {tab.label}
                    </span>

                    {/* Active Underline Indicator */}
                    {isActive && (
                      <div className="absolute -bottom-2 left-3 right-3 h-[3px] bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] rounded-full shadow-sm" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 2. Main Search Card */}
          <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-5 sm:p-7 md:p-8 relative z-10 -mt-2.5 border border-slate-100">
            {activeTab === 'flights' && <FlightSearchForm />}
            {activeTab === 'rooms' && <HotelSearchForm />}
            {activeTab === 'buses' && <BusSearchForm />}
            {activeTab === 'family_packages' && <FamilyPackageSearchForm />}
            {activeTab === 'office_packages' && <OfficePackageSearchForm />}
            {activeTab === 'trains' && <TrainSearchForm />}
            {activeTab === 'homestays' && <HotelSearchForm />}
            {activeTab === 'cabs' && <BusSearchForm />}
            {['tours', 'visa', 'insurance'].includes(activeTab) && <FamilyPackageSearchForm />}
          </div>

          {/* 3. Explore More Link Below Search Card */}
          <div className="text-center mt-10">
            <button
              onClick={() => {
                const el = document.getElementById('explore-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white font-bold text-xs uppercase tracking-widest drop-shadow hover:scale-105 transition-all cursor-pointer"
            >
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              <span>Explore More</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mini Feature Links Strip */}
      <div id="explore-section">
        <FeatureLinksStrip />
      </div>

      {/* 5. Floating AI Assistant (Myra) */}
      <MyraChatbotWidget />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
