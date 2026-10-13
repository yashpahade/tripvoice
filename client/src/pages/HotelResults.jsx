import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, MapPin, Check, Filter, ArrowUpDown 
} from 'lucide-react';
import { MOCK_HOTELS } from '@/data/hotels';

const HotelResults = React.memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const city = searchParams.get('city') || 'Goa';
  const checkIn = searchParams.get('checkIn') || '14 Oct 2026';
  const checkOut = searchParams.get('checkOut') || '16 Oct 2026';

  const [selectedStar, setSelectedStar] = useState('ALL');
  const [freeCancelOnly, setFreeCancelOnly] = useState(false);

  const filteredHotels = useMemo(() => {
    return MOCK_HOTELS.filter((h) => {
      if (selectedStar !== 'ALL' && h.stars !== Number(selectedStar)) return false;
      if (freeCancelOnly && !h.freeCancellation) return false;
      return true;
    });
  }, [selectedStar, freeCancelOnly]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16">
      {/* Top Search Modify Bar */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#134E4A] to-[#0D9488] text-white py-4 px-4 sticky top-16 z-30 shadow-md">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-teal-200">DESTINATION:</span>
            <div className="flex items-center gap-2 text-lg font-black tracking-tight">
              <MapPin className="w-4 h-4 text-teal-300" />
              <span>{city}</span>
            </div>
            <span className="text-teal-300">|</span>
            <span className="text-xs font-semibold text-gray-200">{checkIn} - {checkOut} (2 Nights)</span>
            <span className="text-teal-300">|</span>
            <span className="text-xs font-semibold text-gray-200">1 Room, 2 Guests</span>
          </div>

          <Link 
            to="/" 
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
          >
            MODIFY SEARCH
          </Link>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Filters */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <h3 className="font-black text-sm text-[#0F172A] mb-4 flex items-center justify-between">
              <span>Filter By</span>
              <Filter className="w-4 h-4 text-gray-400" />
            </h3>

            {/* Star Rating */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-gray-500 uppercase block">Star Category</label>
              {['ALL', '5', '4', '3'].map((star) => (
                <label key={star} className="flex items-center gap-2.5 text-xs font-bold text-gray-700 cursor-pointer py-1">
                  <input
                    type="radio"
                    name="stars"
                    checked={selectedStar === star}
                    onChange={() => setSelectedStar(star)}
                    className="w-4 h-4 text-[#0D9488] focus:ring-[#0D9488]"
                  />
                  <span>{star === 'ALL' ? 'All Star Ratings' : `${star} Star Hotels`}</span>
                </label>
              ))}
            </div>

            {/* Cancellation */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-gray-500 uppercase block">Booking Policy</label>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={freeCancelOnly}
                  onChange={(e) => setFreeCancelOnly(e.target.checked)}
                  className="rounded text-[#0D9488] focus:ring-[#0D9488]"
                />
                <span>Free Cancellation Available</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Hotel Cards List */}
        <div className="lg:col-span-9 space-y-5">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-xs font-bold text-gray-600">
            <span>Showing {filteredHotels.length} hotels in {city}</span>
            <div className="flex items-center gap-1 cursor-pointer text-[#0D9488]">
              <span>Sort By: Popularity</span>
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {filteredHotels.map((hotel) => (
            <div 
              key={hotel.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-teal-200 hover:shadow-lg transition-all overflow-hidden grid grid-cols-1 md:grid-cols-12 group"
            >
              {/* Hotel Image Gallery Preview */}
              <div className="md:col-span-4 relative h-60 md:h-auto overflow-hidden">
                <img 
                  src={hotel.images[0]} 
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {hotel.tag}
                </div>
              </div>

              {/* Middle Hotel Details */}
              <div className="md:col-span-5 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-[10px] text-gray-500 font-bold ml-1">{hotel.stars} Star</span>
                  </div>

                  <h3 className="text-lg font-black text-[#0F172A] leading-tight group-hover:text-[#0D9488] transition-colors">
                    {hotel.name}
                  </h3>

                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{hotel.locality}</span>
                  </p>

                  <p className="text-[11px] text-teal-600 font-semibold mt-0.5">{hotel.distance}</p>

                  {/* Amenity Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {hotel.amenities.map((am) => (
                      <span key={am} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>

                {hotel.freeCancellation && (
                  <p className="text-xs font-bold text-teal-600 flex items-center gap-1 mt-3">
                    <Check className="w-3.5 h-3.5" /> Free Cancellation Available
                  </p>
                )}
              </div>

              {/* Right Pricing & CTA */}
              <div className="md:col-span-3 p-5 bg-slate-50/70 border-t md:border-t-0 md:border-l border-slate-200 flex flex-col justify-between items-end text-right">
                <div>
                  {/* Rating Badge */}
                  <div className="flex items-center gap-2 justify-end mb-3">
                    <div>
                      <p className="text-xs font-black text-[#0F172A] leading-none">{hotel.ratingText}</p>
                      <p className="text-[10px] text-gray-500">{hotel.reviews} reviews</p>
                    </div>
                    <span className="bg-[#0D9488] text-white text-xs font-black px-2 py-1 rounded-lg shadow-sm">
                      ★ {hotel.rating}
                    </span>
                  </div>

                  {/* Urgency tag */}
                  {hotel.roomsLeft <= 3 && (
                    <span className="text-[10px] font-black text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded block mb-2">
                      Only {hotel.roomsLeft} rooms left!
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <div className="mb-3">
                    <span className="text-xs text-gray-400 line-through">₹{hotel.originalPrice.toLocaleString('en-IN')}</span>
                    <div className="text-2xl font-black text-[#0F172A]">
                      ₹{hotel.price.toLocaleString('en-IN')}
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium">+ ₹{Math.round(hotel.price * 0.12)} taxes & charges per night</p>
                  </div>

                  <button
                    onClick={() => navigate(`/hotels/${hotel.id}`)}
                    className="w-full py-2.5 bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-95 uppercase tracking-wider"
                  >
                    VIEW ROOMS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

HotelResults.displayName = 'HotelResults';

export default HotelResults;
