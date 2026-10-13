import React, { useState, useCallback, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  Plane, Filter, ArrowUpDown, Armchair 
} from 'lucide-react';
import FlightSeatMap from '@/components/seats/FlightSeatMap';
import { MOCK_FLIGHTS } from '@/data/flights';

const FlightResults = React.memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fromCity = searchParams.get('from') || 'DEL';
  const toCity = searchParams.get('to') || 'BLR';
  const departureDate = searchParams.get('departure') || '13 Oct 2026';

  const [selectedAirlineFilter, setSelectedAirlineFilter] = useState('ALL');
  const [selectedSeatFlight, setSelectedSeatFlight] = useState(null);
  const [selectedSeatsData, setSelectedSeatsData] = useState({});

  const filteredFlights = useMemo(() => {
    return MOCK_FLIGHTS.filter((f) => {
      if (selectedAirlineFilter === 'ALL') return true;
      return f.airline === selectedAirlineFilter;
    });
  }, [selectedAirlineFilter]);

  const handleSeatConfirm = useCallback((seats) => {
    if (!selectedSeatFlight) return;
    setSelectedSeatsData((prev) => ({
      ...prev,
      [selectedSeatFlight.id]: seats,
    }));
    setSelectedSeatFlight(null);
  }, [selectedSeatFlight]);

  const handleCloseSeatModal = useCallback(() => {
    setSelectedSeatFlight(null);
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16">
      {/* Top Search Modify Bar */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#134E4A] to-[#0D9488] text-white py-4 px-4 sticky top-16 z-30 shadow-md">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-teal-200">TRIP:</span>
            <div className="flex items-center gap-2 text-lg font-black tracking-tight">
              <span>{fromCity}</span>
              <span>✈</span>
              <span>{toCity}</span>
            </div>
            <span className="text-teal-300">|</span>
            <span className="text-xs font-semibold text-gray-200">{departureDate}</span>
            <span className="text-teal-300">|</span>
            <span className="text-xs font-semibold text-gray-200">1 Adult, Economy</span>
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
              <span>Popular Filters</span>
              <Filter className="w-4 h-4 text-gray-400" />
            </h3>

            {/* Airlines filter */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-gray-500 uppercase block">Airlines</label>
              {['ALL', 'IndiGo', 'Air India', 'Vistara', 'Akasa Air'].map((airline) => (
                <label 
                  key={airline} 
                  className="flex items-center gap-2.5 text-xs font-bold text-gray-700 cursor-pointer py-1"
                >
                  <input
                    type="radio"
                    name="airline"
                    checked={selectedAirlineFilter === airline}
                    onChange={() => setSelectedAirlineFilter(airline)}
                    className="w-4 h-4 text-[#0D9488] focus:ring-[#0D9488]"
                  />
                  <span>{airline === 'ALL' ? 'All Airlines' : airline}</span>
                </label>
              ))}
            </div>

            {/* Stops */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-gray-500 uppercase block">Stops</label>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <input type="checkbox" defaultChecked className="rounded text-[#0D9488]" /> Non Stop Only
              </label>
            </div>
          </div>
        </div>

        {/* Right Flight Cards List */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-xs font-bold text-gray-600">
            <span>Showing {filteredFlights.length} flights for {fromCity} to {toCity}</span>
            <div className="flex items-center gap-1 cursor-pointer text-[#0D9488]">
              <span>Sort By: Cheapest</span>
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {filteredFlights.map((flight) => {
            const hasSeats = selectedSeatsData[flight.id];
            return (
              <div 
                key={flight.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:border-teal-200 hover:shadow-md transition-all relative overflow-hidden"
              >
                {/* Seats left warning badge */}
                {flight.seatsLeft <= 3 && (
                  <div className="absolute top-0 right-0 bg-orange-50 text-orange-600 text-[10px] font-black px-3 py-1 rounded-bl-xl border-l border-b border-orange-200">
                    Only {flight.seatsLeft} seats left at this price!
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Airline Info */}
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center font-black text-xs text-[#0D9488] border border-teal-100">
                      {flight.airline.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-[#0F172A] leading-tight">{flight.airline}</h4>
                      <p className="text-[11px] text-gray-500">{flight.flightNo} • {flight.aircraft}</p>
                    </div>
                  </div>

                  {/* Timing & Duration */}
                  <div className="md:col-span-5 flex items-center justify-between text-center px-2">
                    <div className="text-left">
                      <p className="text-xl font-black text-[#0F172A]">{flight.depTime}</p>
                      <p className="text-xs text-gray-500 font-semibold">{flight.depAirport}</p>
                    </div>

                    <div className="flex flex-col items-center px-4">
                      <span className="text-[10px] font-bold text-gray-400 mb-1">{flight.duration}</span>
                      <div className="w-24 h-0.5 bg-gray-300 relative flex items-center justify-center">
                        <Plane className="w-3 h-3 text-[#0D9488] absolute -top-1.5" />
                      </div>
                      <span className="text-[10px] font-bold text-teal-600 mt-1">{flight.stops}</span>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-black text-[#0F172A]">{flight.arrTime}</p>
                      <p className="text-xs text-gray-500 font-semibold">{flight.arrAirport}</p>
                    </div>
                  </div>

                  {/* Pricing & Seat Action */}
                  <div className="md:col-span-4 flex flex-col md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
                    <div className="text-right mb-2">
                      <div className="text-2xl font-black text-[#0F172A]">
                        ₹{flight.price.toLocaleString('en-IN')}
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">per adult • includes taxes</p>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => setSelectedSeatFlight(flight)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all ${
                          hasSeats
                            ? 'bg-teal-50 text-[#0D9488] border-[#0D9488]'
                            : 'bg-gray-50 hover:bg-teal-50 text-gray-700 border-gray-300'
                        }`}
                        title="Interactive A320 seat layout"
                      >
                        <Armchair className="w-3.5 h-3.5 text-[#0D9488]" />
                        <span>{hasSeats ? `Seat ${hasSeats.map(s => s.code).join(',')}` : 'Select Seat'}</span>
                      </button>

                      <button
                        onClick={() => {
                          const seatQuery = hasSeats ? `&seats=${hasSeats.map(s => s.code).join(',')}` : '';
                          navigate(`/flights/review?flightId=${flight.id}${seatQuery}`);
                        }}
                        className="flex-1 md:flex-initial px-5 py-2 bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-95"
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Seat Map Modal */}
      {selectedSeatFlight && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="my-auto w-full max-w-4xl">
            <FlightSeatMap
              flight={selectedSeatFlight}
              passengerCount={1}
              onConfirmSeats={handleSeatConfirm}
              onClose={handleCloseSeatModal}
            />
          </div>
        </div>
      )}
    </div>
  );
});

FlightResults.displayName = 'FlightResults';

export default FlightResults;
