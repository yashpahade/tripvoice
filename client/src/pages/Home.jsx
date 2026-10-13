import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, BadgePercent, ArrowRight, 
  Copy, Check, MapPin, Smartphone, ShieldCheck 
} from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import HeroScrollScene from '@/components/home/HeroScrollScene';
import { OFFERS, DESTINATIONS } from '@/data/holidays';

const Home = React.memo(() => {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = useCallback((code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }, []);

  return (
    <div className="w-full bg-[#F8FAFC]">
      <Helmet>
        <title>TripNest - Smart Travel Booking for Flights, Hotels, Buses & Packages</title>
        <meta name="description" content="Book cheap flights, luxury hotels, express buses, and customized holiday packages on TripNest." />
      </Helmet>

      {/* 1. SCROLL-DRIVEN CABIN WINDOW HERO SCENE */}
      <HeroScrollScene />

      {/* 2. BOOKING SEARCH HERO SECTION (Shifted to next section) */}
      <div id="booking-search-section">
        <HeroSection />
      </div>

      {/* 2. OFFERS SECTION */}
      <section className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Offers For You</h2>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">Explore deals, discounts and bank offers across all travel bookings</p>
            </div>
            <Link to="/offers" className="text-xs font-bold text-[#0D9488] hover:underline flex items-center gap-1">
              VIEW ALL OFFERS <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OFFERS.map((offer) => (
              <div 
                key={offer.id}
                className="border border-slate-200 rounded-xl overflow-hidden hover:border-teal-200 hover:shadow-md transition-all group flex flex-col justify-between bg-white"
              >
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={offer.imageUrl} 
                    alt={offer.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-[#0F172A]/80 backdrop-blur-sm text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {offer.category}
                  </div>
                  <div className="absolute top-2 right-2 bg-[#F97316] text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                    {offer.discount}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-xs font-black text-[#0F172A] line-clamp-2 mb-2 group-hover:text-[#0D9488] transition-colors">
                    {offer.title}
                  </h3>

                  <div>
                    <p className="text-[10px] text-gray-400 font-medium mb-3">{offer.validity}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-gray-700 bg-slate-50 border border-dashed border-gray-300 px-2 py-1 rounded">
                        {offer.code}
                      </div>
                      <button
                        onClick={() => handleCopyCode(offer.code)}
                        className="text-xs font-bold text-[#0D9488] flex items-center gap-1 hover:text-teal-700 cursor-pointer"
                      >
                        {copiedCode === offer.code ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-teal-600" />
                            <span className="text-teal-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TOP DESTINATIONS GRID */}
      <section className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Popular Destinations</h2>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">Handpicked vacation spots trending among travellers right now</p>
            </div>
            <Link to="/holidays" className="text-xs font-bold text-[#0D9488] hover:underline flex items-center gap-1">
              EXPLORE ALL <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {DESTINATIONS.map((dest) => (
              <Link 
                key={dest.name} 
                to={`/hotels/search?city=${encodeURIComponent(dest.name)}`}
                className="group relative rounded-xl overflow-hidden aspect-4/5 block shadow-sm"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3 text-white">
                  <div className="flex items-center gap-1 text-[10px] text-amber-300 font-bold mb-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{dest.tag}</span>
                  </div>
                  <h3 className="text-base font-black leading-tight drop-shadow">{dest.name}</h3>
                  <p className="text-[10px] text-teal-200 font-semibold mt-0.5">Starts at {dest.starting}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY TRIPNEST */}
      <section className="max-w-[1200px] mx-auto px-4 py-8">
        <h2 className="text-2xl font-black text-center text-[#0F172A] mb-8 tracking-tight">Why Book With TripNest?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-50 flex items-center justify-center mb-4 text-[#0D9488]">
              <BadgePercent className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-[#0F172A] mb-2">Best Deals & Special Fares</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Enjoy exclusive student discounts, armed forces fares, senior citizen concessions, and instant bank card offers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-50 flex items-center justify-center mb-4 text-[#0D9488]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-[#0F172A] mb-2">Price Drop & Zero Cancellation</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Lock fares with confidence. If flight prices fall, we refund the difference automatically, with instant wallet refunds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-50 flex items-center justify-center mb-4 text-[#0D9488]">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-[#0F172A] mb-2">24x7 Myra AI & Human Support</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              From web check-in to reschedule and refunds, our smart AI assistant Myra and dedicated team are always here to assist.
            </p>
          </div>
        </div>
      </section>

      {/* 5. APP DOWNLOAD BANNER */}
      <section className="max-w-[1200px] mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-[#0F172A] via-[#134E4A] to-[#0D9488] rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <Smartphone className="w-8 h-8 text-teal-300" />
            </div>
            <div>
              <h3 className="text-xl font-black mb-1">Download TripNest Mobile App</h3>
              <p className="text-xs text-teal-100 max-w-md">
                Get real-time flight alerts, exclusive app-only coupons, offline ticket access, and fast UPI 1-click checkout.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 border border-white/20 px-4 py-2.5 rounded-xl hover:bg-white/20 cursor-pointer text-left transition-colors">
              <p className="text-[9px] uppercase tracking-wider text-gray-300 font-bold">GET IT ON</p>
              <p className="text-sm font-black">Google Play</p>
            </div>
            <div className="bg-white/10 border border-white/20 px-4 py-2.5 rounded-xl hover:bg-white/20 cursor-pointer text-left transition-colors">
              <p className="text-[9px] uppercase tracking-wider text-gray-300 font-bold">Download on the</p>
              <p className="text-sm font-black">App Store</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
