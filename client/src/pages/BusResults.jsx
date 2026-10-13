import React, { useState, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Bus, Filter, ArrowUpDown, Star } from 'lucide-react';
import BusSeatMap from '@/components/seats/BusSeatMap';
import { MOCK_BUSES } from '@/data/buses';

const BusResults = React.memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fromCity = searchParams.get('from') || 'Bengaluru';
  const toCity = searchParams.get('to') || 'Hyderabad';

  const [selectedSeatBus, setSelectedSeatBus] = useState(null);

  const handleBookSeats = useCallback(({ selectedSeats, selectedBoarding, selectedDropping, totalFare }) => {
    if (!selectedSeatBus) return;
    const seatsStr = selectedSeats.map((s) => s.no).join(',');
    navigate(
      `/bus-tickets/passenger-details?operator=${encodeURIComponent(selectedSeatBus.operator)}&busType=${encodeURIComponent(selectedSeatBus.busType)}&seats=${seatsStr}&fare=${totalFare}&bp=${encodeURIComponent(selectedBoarding.name)}&bpTime=${encodeURIComponent(selectedBoarding.time)}&dp=${encodeURIComponent(selectedDropping.name)}&dpTime=${encodeURIComponent(selectedDropping.time)}&from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}`
    );
  }, [selectedSeatBus, navigate, fromCity, toCity]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16">
      {/* Top Search Modify Bar */}
      <div className="bg-[#D84E55] text-white py-4 px-4 sticky top-16 z-30 shadow-md">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-red-200">BUS ROUTE:</span>
            <div className="flex items-center gap-2 text-lg font-black tracking-tight">
              <span>{fromCity}</span>
              <span>→</span>
              <span>{toCity}</span>
            </div>
            <span className="text-red-300">|</span>
            <span className="text-xs font-semibold text-red-100">Today / Tomorrow</span>
          </div>

          <Link 
            to="/" 
            className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-xs font-bold text-white transition-colors"
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
              <span>Filters</span>
              <Filter className="w-4 h-4 text-gray-400" />
            </h3>

            {/* Bus Type */}
            <div className="space-y-2 mb-4">
              <label className="text-xs font-bold text-gray-500 uppercase block">Bus Type</label>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <input type="checkbox" defaultChecked className="rounded text-[#D84E55] focus:ring-[#D84E55]" /> AC Sleeper
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <input type="checkbox" defaultChecked className="rounded text-[#D84E55] focus:ring-[#D84E55]" /> Semi Sleeper
              </label>
            </div>

            {/* Departure Time */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-gray-500 uppercase block">Departure Time</label>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <input type="checkbox" defaultChecked className="rounded text-[#D84E55] focus:ring-[#D84E55]" /> Night (6 PM - 12 AM)
              </label>
            </div>
          </div>
        </div>

        {/* Right Bus Cards List */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-xs font-bold text-gray-600">
            <span>Showing {MOCK_BUSES.length} buses from {fromCity} to {toCity}</span>
            <div className="flex items-center gap-1 cursor-pointer text-[#D84E55]">
              <span>Sort By: Rating</span>
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {MOCK_BUSES.map((bus) => (
            <div 
              key={bus.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Operator Details */}
                <div className="md:col-span-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-black text-base text-[#0F172A]">{bus.operator}</h4>
                    <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" /> {bus.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-1">{bus.busType}</p>
                  <p className="text-[10px] text-gray-400">{bus.reviews} ratings</p>
                </div>

                {/* Timing */}
                <div className="md:col-span-5 flex items-center justify-between text-center px-2">
                  <div className="text-left">
                    <p className="text-lg font-black text-[#0F172A]">{bus.depTime}</p>
                    <p className="text-xs text-gray-500 font-semibold">{bus.depCity}</p>
                  </div>

                  <div className="flex flex-col items-center px-4">
                    <span className="text-[10px] font-bold text-gray-400 mb-1">{bus.duration}</span>
                    <div className="w-20 h-0.5 bg-gray-300 relative flex items-center justify-center">
                      <Bus className="w-3 h-3 text-[#D84E55] absolute -top-1.5" />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-black text-[#0F172A]">{bus.arrTime}</p>
                    <p className="text-xs text-gray-500 font-semibold">{bus.arrCity}</p>
                  </div>
                </div>

                {/* Price & View Seats Button */}
                <div className="md:col-span-3 flex flex-col md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
                  <div className="text-right mb-2">
                    <span className="text-xs text-gray-400 font-bold block">STARTING FROM</span>
                    <div className="text-2xl font-black text-[#0F172A]">
                      ₹{bus.fare.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSeatBus(bus)}
                    className="w-full md:w-auto px-5 py-2.5 bg-[#D84E55] hover:bg-[#b93a40] text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-95 uppercase tracking-wider"
                  >
                    Select Seats
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Selection Modal */}
      {selectedSeatBus && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="my-auto w-full max-w-4xl">
            <BusSeatMap
              bus={selectedSeatBus}
              onBookSeats={handleBookSeats}
              onClose={() => setSelectedSeatBus(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
});

BusResults.displayName = 'BusResults';

export default BusResults;
