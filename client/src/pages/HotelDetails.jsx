import React, { useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, MapPin, Check, ChevronRight, Bed, Eye, Maximize2 
} from 'lucide-react';
import { HOTEL_DATA } from '@/data/hotels';

const HotelDetails = React.memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotel = HOTEL_DATA[id] || HOTEL_DATA['h1'];
  const [selectedImage, setSelectedImage] = useState(0);

  const handleBookRoom = useCallback((room, plan) => {
    const query = new URLSearchParams({
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomName: room.name,
      planName: plan.name,
      price: String(plan.price)
    });
    navigate(`/hotels/review?${query.toString()}`);
  }, [hotel, navigate]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4">
      <div className="max-w-[1240px] mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <Link to="/" className="hover:text-[#0D9488]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/hotels/search?city=Goa" className="hover:text-[#0D9488]">Hotels in Goa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0D9488] truncate max-w-[200px] sm:max-w-none">{hotel.name}</span>
        </div>

        {/* Hotel Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              {[...Array(hotel.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
              <span className="text-xs text-gray-500 font-bold ml-1">{hotel.stars} Star Luxury Property</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-tight">
              {hotel.name}
            </h1>

            <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-[#0D9488]" />
              <span>{hotel.locality}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-black text-[#0F172A]">{hotel.ratingText}</p>
              <p className="text-xs text-gray-500">{hotel.reviews} Verified Reviews</p>
            </div>
            <div className="bg-[#0D9488] text-white text-base font-black px-3 py-2 rounded-xl shadow-md">
              ★ {hotel.rating}
            </div>
          </div>
        </div>

        {/* PHOTO GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[420px] rounded-2xl overflow-hidden shadow-sm">
          {/* Main Large Hero Photo */}
          <div className="md:col-span-8 h-full relative group overflow-hidden">
            <img 
              src={hotel.images[selectedImage]} 
              alt={hotel.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
          </div>

          {/* 4 Smaller Thumbnails */}
          <div className="md:col-span-4 grid grid-cols-2 gap-3 h-full">
            {hotel.images.slice(1, 5).map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedImage(idx + 1)}
                className="relative overflow-hidden rounded-xl cursor-pointer group"
              >
                <img 
                  src={img} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Sub-nav Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-3 flex gap-6 text-xs font-black text-gray-600 sticky top-16 z-30 overflow-x-auto">
          <a href="#overview" className="text-[#0D9488] hover:underline">OVERVIEW</a>
          <a href="#rooms" className="hover:text-[#0D9488]">SELECT ROOMS</a>
          <a href="#amenities" className="hover:text-[#0D9488]">AMENITIES</a>
          <a href="#reviews" className="hover:text-[#0D9488]">GUEST REVIEWS</a>
          <a href="#rules" className="hover:text-[#0D9488]">HOUSE RULES</a>
        </div>

        {/* ROOM SELECTION SECTION */}
        <div id="rooms" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-black text-[#0F172A]">Choose Your Room</h2>
              <p className="text-xs text-gray-500 font-medium">Select from standard rooms to sea view luxury suites</p>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Free Cancellation Available
            </span>
          </div>

          <div className="space-y-6">
            {hotel.rooms.map((room) => (
              <div 
                key={room.id}
                className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Room Left: Photo & Spec */}
                <div className="lg:col-span-4 p-5 bg-slate-50/70 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-base text-[#0F172A] mb-2">{room.name}</h3>
                    <img src={room.image} alt={room.name} className="w-full h-44 object-cover rounded-xl mb-3 shadow-2xs" />
                    
                    <div className="space-y-1.5 text-xs text-gray-600 font-medium">
                      <div className="flex items-center gap-2">
                        <Bed className="w-3.5 h-3.5 text-gray-400" />
                        <span>{room.bed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                        <span>{room.view}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Room Right: Rate Plans */}
                <div className="lg:col-span-8 p-5 divide-y divide-slate-100">
                  {room.plans.map((plan) => (
                    <div key={plan.id} className="py-4 first:pt-0 last:pb-0 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h4 className="font-black text-sm text-[#0F172A] mb-1">{plan.name}</h4>
                        <div className="space-y-1">
                          {plan.benefits.map((b, i) => (
                            <p key={i} className="text-xs text-teal-700 font-bold flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-teal-600" /> {b}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-black text-[#0F172A]">
                          ₹{plan.price.toLocaleString('en-IN')}
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium mb-3">+ ₹{Math.round(plan.price * 0.12)} taxes per night</p>

                        <button
                          onClick={() => handleBookRoom(room, plan)}
                          className="px-6 py-2.5 bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-95 uppercase tracking-wider"
                        >
                          BOOK THIS NOW
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities Grid */}
        <div id="amenities" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-black text-[#0F172A] mb-4">Hotel Amenities & Facilities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {hotel.amenities.map((am) => (
              <div key={am} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs font-bold text-slate-700">
                <Check className="w-4 h-4 text-[#0D9488]" />
                <span>{am}</span>
              </div>
            ))}
          </div>
        </div>

        {/* House Rules */}
        <div id="rules" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-black text-[#0F172A] mb-4">Property Policies & House Rules</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-gray-400 font-bold uppercase block mb-1">CHECK-IN</span>
              <p className="text-base font-black text-[#0F172A]">2:00 PM</p>
              <p className="text-gray-500 mt-1">Government ID required</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-gray-400 font-bold uppercase block mb-1">CHECK-OUT</span>
              <p className="text-base font-black text-[#0F172A]">11:00 AM</p>
              <p className="text-gray-500 mt-1">Late check-out on request</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-gray-400 font-bold uppercase block mb-1">COUPLE FRIENDLY</span>
              <p className="text-base font-black text-teal-600">Yes, Welcome</p>
              <p className="text-gray-500 mt-1">Local IDs accepted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

HotelDetails.displayName = 'HotelDetails';

export default HotelDetails;
