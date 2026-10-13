import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const HotelSearchForm = React.memo(() => {
  const navigate = useNavigate();
  const [city] = useState('Goa');
  const [checkIn] = useState('2026-10-14');
  const [checkOut] = useState('2026-10-16');

  const handleSearch = useCallback(() => {
    navigate(`/hotels/search?city=${encodeURIComponent(city)}&checkIn=${checkIn}&checkOut=${checkOut}`);
  }, [navigate, city, checkIn, checkOut]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-sm font-bold text-[#0F172A]">Book Rooms, Luxury Hotels & Homestays</p>
      </div>

      <div className="border border-slate-300 rounded-xl bg-white grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-300 shadow-sm">
        <div className="col-span-1 md:col-span-4 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">CITY, AREA OR PROPERTY</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">{city}</h3>
          <p className="text-xs text-gray-500 font-medium">India</p>
        </div>

        <div className="col-span-1 md:col-span-3 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">CHECK-IN</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">14 Oct'26</h3>
          <p className="text-xs text-gray-500 font-medium">Wednesday</p>
        </div>

        <div className="col-span-1 md:col-span-3 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">CHECK-OUT</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">16 Oct'26</h3>
          <p className="text-xs text-gray-500 font-medium">Friday</p>
        </div>

        <div className="col-span-1 md:col-span-2 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer rounded-b-xl md:rounded-r-xl md:rounded-bl-none">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">ROOMS & GUESTS</span>
          <h3 className="text-lg font-black text-[#0F172A] leading-none mb-1">2 Adults</h3>
          <p className="text-xs text-gray-500 font-medium">1 Room</p>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4 pt-1">
        <span className="text-xs font-bold text-gray-500">Popular Filters:</span>
        <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
          <input type="checkbox" defaultChecked className="rounded text-[#0D9488] focus:ring-[#0D9488]" /> Free Cancellation
        </label>
        <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
          <input type="checkbox" defaultChecked className="rounded text-[#0D9488] focus:ring-[#0D9488]" /> Swimming Pool
        </label>
        <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
          <input type="checkbox" className="rounded text-[#0D9488] focus:ring-[#0D9488]" /> Free Breakfast
        </label>
      </div>

      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-gradient-to-r from-[#2DD4BF] via-[#0D9488] to-[#0F766E] hover:from-[#0D9488] hover:to-[#115E59] text-white font-black text-2xl tracking-widest px-16 sm:px-24 py-3 sm:py-3.5 rounded-full shadow-[0_10px_25px_rgba(13,148,136,0.4)] hover:scale-105 active:scale-95 transition-all uppercase cursor-pointer"
        >
          SEARCH ROOMS
        </button>
      </div>
    </div>
  );
});

HotelSearchForm.displayName = 'HotelSearchForm';

export const BusSearchForm = React.memo(() => {
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    navigate('/bus-tickets/search?from=Bengaluru&to=Hyderabad');
  }, [navigate]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-sm font-bold text-[#0F172A]">Online Bus Ticket Booking with Live Seat Selection</p>
      </div>

      <div className="border border-slate-300 rounded-xl bg-white grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-300 shadow-sm">
        <div className="col-span-1 md:col-span-5 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">FROM</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">Bengaluru</h3>
          <p className="text-xs text-gray-500 font-medium">Karnataka</p>
        </div>

        <div className="col-span-1 md:col-span-5 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">TO</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">Hyderabad</h3>
          <p className="text-xs text-gray-500 font-medium">Telangana</p>
        </div>

        <div className="col-span-1 md:col-span-2 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer rounded-b-xl md:rounded-r-xl md:rounded-bl-none">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">TRAVEL DATE</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">14 Oct'26</h3>
          <p className="text-xs text-gray-500 font-medium">Wednesday</p>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4 pt-1">
        <span className="text-xs font-bold text-gray-500">Quick Filters:</span>
        <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
          <input type="checkbox" defaultChecked className="rounded text-[#D84E55] focus:ring-[#D84E55]" /> AC Sleeper (2+1)
        </label>
        <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
          <input type="checkbox" className="rounded text-[#D84E55] focus:ring-[#D84E55]" /> Top Rated (4.5★+)
        </label>
      </div>

      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-gradient-to-r from-[#D84E55] to-[#B93A40] text-white font-black text-2xl tracking-widest px-16 sm:px-24 py-3 sm:py-3.5 rounded-full shadow-[0_10px_25px_rgba(216,78,85,0.4)] hover:scale-105 active:scale-95 transition-all uppercase cursor-pointer"
        >
          SEARCH BUSES
        </button>
      </div>
    </div>
  );
});

BusSearchForm.displayName = 'BusSearchForm';

export const FamilyPackageSearchForm = React.memo(() => {
  const navigate = useNavigate();
  const [destination] = useState('Kashmir');

  const handleSearch = useCallback(() => {
    navigate(`/holidays?dest=${encodeURIComponent(destination)}`);
  }, [navigate, destination]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-sm font-bold text-[#0F172A]">Family Holiday Packages with Flights, Hotels & Sightseeing</p>
      </div>

      <div className="border border-slate-300 rounded-xl bg-white grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-300 shadow-sm">
        <div className="col-span-1 md:col-span-4 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">FAMILY DESTINATION</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">{destination}</h3>
          <p className="text-xs text-gray-500 font-medium">Srinagar, Gulmarg, Pahalgam</p>
        </div>

        <div className="col-span-1 md:col-span-3 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">DURATION</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">5D / 4N</h3>
          <p className="text-xs text-gray-500 font-medium">Customizable Itinerary</p>
        </div>

        <div className="col-span-1 md:col-span-3 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">FAMILY MEMBERS</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">2 Adults, 2 Kids</h3>
          <p className="text-xs text-gray-500 font-medium">Family Suite Included</p>
        </div>

        <div className="col-span-1 md:col-span-2 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer rounded-b-xl md:rounded-r-xl md:rounded-bl-none">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">STARTING BUDGET</span>
          <h3 className="text-lg font-black text-[#0F172A] leading-none mb-1">₹14,999</h3>
          <p className="text-xs text-emerald-600 font-bold">per person</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 pt-1">
        <span className="text-xs font-bold text-gray-500">Popular Family Themes:</span>
        <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-[#0D9488] text-xs font-bold">Snow & Mountains</span>
        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">Houseboat & Backwaters</span>
        <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold">Theme Parks & Beach</span>
      </div>

      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-gradient-to-r from-[#2DD4BF] via-[#0D9488] to-[#0F766E] hover:from-[#0D9488] hover:to-[#115E59] text-white font-black text-2xl tracking-widest px-16 sm:px-24 py-3 sm:py-3.5 rounded-full shadow-[0_10px_25px_rgba(13,148,136,0.4)] hover:scale-105 active:scale-95 transition-all uppercase cursor-pointer"
        >
          EXPLORE PACKAGES
        </button>
      </div>
    </div>
  );
});

FamilyPackageSearchForm.displayName = 'FamilyPackageSearchForm';

export const OfficePackageSearchForm = React.memo(() => {
  const navigate = useNavigate();
  const [city] = useState('Goa');
  const [employees] = useState('30 - 50 Employees');

  const handleSearch = useCallback(() => {
    navigate(`/corporate-travel?city=${encodeURIComponent(city)}`);
  }, [navigate, city]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-sm font-bold text-[#0F172A]">Corporate & Office Packages • MICE, Offsites & Team Outings</p>
      </div>

      <div className="border border-slate-300 rounded-xl bg-white grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-300 shadow-sm">
        <div className="col-span-1 md:col-span-4 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">OFFSITE DESTINATION</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">{city}</h3>
          <p className="text-xs text-gray-500 font-medium">Beach Resort with Conference Hall</p>
        </div>

        <div className="col-span-1 md:col-span-3 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">GROUP SIZE</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">{employees}</h3>
          <p className="text-xs text-gray-500 font-medium">Custom Corporate Billing</p>
        </div>

        <div className="col-span-1 md:col-span-3 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">EVENT TYPE</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">Annual Offsite</h3>
          <p className="text-xs text-gray-500 font-medium">Team Building + Gala Dinner</p>
        </div>

        <div className="col-span-1 md:col-span-2 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer rounded-b-xl md:rounded-r-xl md:rounded-bl-none">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">GST SAVINGS</span>
          <h3 className="text-lg font-black text-emerald-600 leading-none mb-1">Upto 18%</h3>
          <p className="text-xs text-gray-500 font-medium">Input Tax Credit</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 pt-1">
        <span className="text-xs font-bold text-gray-500">Corporate Inclusions:</span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold">Conference Hall & AV</span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold">Flight Group Booking</span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold">Gala Dinner & DJ Night</span>
      </div>

      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-gradient-to-r from-[#2DD4BF] via-[#0D9488] to-[#0F766E] hover:from-[#0D9488] hover:to-[#115E59] text-white font-black text-2xl tracking-widest px-16 sm:px-24 py-3 sm:py-3.5 rounded-full shadow-[0_10px_25px_rgba(13,148,136,0.4)] hover:scale-105 active:scale-95 transition-all uppercase cursor-pointer"
        >
          GET CORPORATE QUOTE
        </button>
      </div>
    </div>
  );
});

OfficePackageSearchForm.displayName = 'OfficePackageSearchForm';

export const TrainSearchForm = React.memo(() => {
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    navigate('/railways/search?from=NDLS&to=BSB');
  }, [navigate]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-sm font-bold text-[#0F172A]">Train Ticket Booking with Zero Convenience Fee</p>
      </div>

      <div className="border border-slate-300 rounded-xl bg-white grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-300 shadow-sm">
        <div className="col-span-1 md:col-span-4 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">FROM STATION</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">New Delhi (NDLS)</h3>
          <p className="text-xs text-gray-500 font-medium">Delhi</p>
        </div>

        <div className="col-span-1 md:col-span-4 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">TO STATION</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">Varanasi (BSB)</h3>
          <p className="text-xs text-gray-500 font-medium">Uttar Pradesh</p>
        </div>

        <div className="col-span-1 md:col-span-2 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">TRAVEL DATE</span>
          <h3 className="text-2xl font-black text-[#0F172A] leading-none mb-1">15 Oct'26</h3>
          <p className="text-xs text-gray-500 font-medium">Thursday</p>
        </div>

        <div className="col-span-1 md:col-span-2 p-3.5 hover:bg-[#F0FDFA]/60 cursor-pointer rounded-b-xl md:rounded-r-xl md:rounded-bl-none">
          <span className="text-xs font-bold text-gray-500 block mb-0.5">CLASS</span>
          <h3 className="text-lg font-black text-[#0F172A] leading-none mb-1">All Classes</h3>
          <p className="text-xs text-gray-500 font-medium">General / Tatkal</p>
        </div>
      </div>

      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-gradient-to-r from-[#2DD4BF] via-[#0D9488] to-[#0F766E] hover:from-[#0D9488] hover:to-[#115E59] text-white font-black text-2xl tracking-widest px-16 sm:px-24 py-3 sm:py-3.5 rounded-full shadow-[0_10px_25px_rgba(13,148,136,0.4)] hover:scale-105 active:scale-95 transition-all uppercase cursor-pointer"
        >
          SEARCH TRAINS
        </button>
      </div>
    </div>
  );
});

TrainSearchForm.displayName = 'TrainSearchForm';
