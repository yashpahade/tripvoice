import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin, Calendar, Star, Check 
} from 'lucide-react';
import { FAMILY_PACKAGES } from '@/data/holidays';

const HolidayPackagesPage = React.memo(() => {
  const [searchParams] = useSearchParams();
  const destQuery = searchParams.get('dest') || '';
  const [selectedTheme, setSelectedTheme] = useState('ALL');
  const [inquiryModalPackage, setInquiryModalPackage] = useState(null);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');

  const filteredPackages = useMemo(() => {
    return FAMILY_PACKAGES.filter((p) => {
      if (destQuery && !p.destination.toLowerCase().includes(destQuery.toLowerCase()) && !p.title.toLowerCase().includes(destQuery.toLowerCase())) {
        return false;
      }
      if (selectedTheme === 'Hills' && !p.tag.includes('Snow') && !p.tag.includes('Family Tour')) return false;
      if (selectedTheme === 'Beach' && !p.tag.includes('Beach')) return false;
      if (selectedTheme === 'International' && !p.tag.includes('International')) return false;
      return true;
    });
  }, [destQuery, selectedTheme]);

  const handleInquirySubmit = useCallback((e) => {
    e.preventDefault();
    if (!inquiryModalPackage) return;
    alert(`Thank you ${formName}! Our dedicated Family Holiday Expert will call you at ${formPhone} within 15 minutes with customized quotes for ${inquiryModalPackage.title}.`);
    setInquiryModalPackage(null);
    setFormName('');
    setFormPhone('');
  }, [formName, formPhone, inquiryModalPackage]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#134E4A] to-[#0D9488] text-white py-12 px-4 shadow-md">
        <div className="max-w-[1240px] mx-auto text-center sm:text-left flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="text-xs font-black text-teal-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20">
              TripNest Family Holidays
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
              Best Family Holiday Packages
            </h1>
            <p className="text-sm text-gray-200 mt-1 max-w-xl">
              Handcrafted tours with flights, verified family-friendly 4★/5★ hotels, meals, private cabs, and 24x7 local on-ground support.
            </p>
          </div>

          <div className="flex gap-2">
            {['ALL', 'Hills', 'Beach', 'International'].map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTheme === theme
                    ? 'bg-[#0D9488] text-white shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Packages Listing */}
      <div className="max-w-[1240px] mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between text-xs font-bold text-gray-600 bg-white p-4 rounded-xl shadow-2xs border border-slate-200">
          <span>Showing {filteredPackages.length} Handcrafted Family Packages</span>
          <span className="text-[#0D9488]">All Packages Include Hotel + Sightseeing + Transfers</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-teal-200 hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Tag */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {pkg.tag}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-[#0F172A] text-xs font-black px-2.5 py-1 rounded-lg shadow flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate max-w-[180px]">{pkg.destination}</span>
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-2 py-0.5 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> {pkg.rating}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#0F172A] leading-snug group-hover:text-[#0D9488] transition-colors">
                    {pkg.title}
                  </h3>

                  {/* Inclusions */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {pkg.highlights.map((h, i) => (
                      <p key={i} className="text-xs text-gray-600 font-medium flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{h}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="p-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString('en-IN')}</span>
                  <div className="text-xl font-black text-[#0F172A]">
                    ₹{pkg.price.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">per person on twin sharing</span>
                </div>

                <button
                  onClick={() => setInquiryModalPackage(pkg)}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-95 uppercase tracking-wider"
                >
                  BOOK PACKAGE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry / Booking Modal */}
      {inquiryModalPackage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="font-black text-lg text-[#0F172A] mb-1">Book Family Holiday Package</h3>
            <p className="text-xs text-[#0D9488] font-bold mb-4">{inquiryModalPackage.title}</p>

            <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Omkar Sharma"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Mobile Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                />
              </div>

              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-gray-700 font-medium">
                <p>✓ Price: <strong>₹{inquiryModalPackage.price.toLocaleString('en-IN')}/person</strong></p>
                <p>✓ Duration: <strong>{inquiryModalPackage.duration}</strong></p>
                <p>✓ 100% Customizable for your family</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInquiryModalPackage(null)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-black rounded-xl shadow-md uppercase tracking-wider"
                >
                  Submit & Get Call
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

HolidayPackagesPage.displayName = 'HolidayPackagesPage';

export default HolidayPackagesPage;
