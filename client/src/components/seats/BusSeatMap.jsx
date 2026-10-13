import React, { useState, useCallback } from 'react';
import { Bus, X } from 'lucide-react';
import { LOWER_DECK_SEATS, UPPER_DECK_SEATS, BOARDING_POINTS, DROPPING_POINTS } from '@/data/buses';

const BusSeatMap = React.memo(({ 
  bus = { 
    operator: 'IntrCity SmartBus', 
    busType: 'Volvo 9600 Multi-Axle AC Sleeper (2+1)', 
    rating: 4.8, 
    from: 'Bengaluru', 
    to: 'Hyderabad',
    fare: 950 
  },
  onBookSeats,
  onClose 
}) => {
  const [activeDeck, setActiveDeck] = useState('lower');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedBoarding, setSelectedBoarding] = useState(BOARDING_POINTS[0]);
  const [selectedDropping, setSelectedDropping] = useState(DROPPING_POINTS[0]);

  const handleSeatClick = useCallback((seat) => {
    if (seat.isBooked) return;

    setSelectedSeats((prev) => {
      if (prev.some((s) => s.id === seat.id)) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        if (prev.length >= 6) {
          alert('You can select a maximum of 6 seats at once.');
          return prev;
        }
        return [...prev, seat];
      }
    });
  }, []);

  const totalFare = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-4xl w-full mx-auto animate-in fade-in zoom-in-95">
      {/* Bus Header */}
      <div className="bg-[#D84E55] text-white p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg">{bus.operator}</span>
              <span className="bg-white/20 text-xs px-2 py-0.5 rounded font-bold">★ {bus.rating}</span>
            </div>
            <p className="text-xs text-red-100 font-medium">
              {bus.busType} • {bus.from} → {bus.to}
            </p>
          </div>
        </div>

        {onClose && (
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Seat Layout Grid */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-200 pb-4 lg:pb-0 lg:pr-6">
          {/* Deck Switcher Tabs */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setActiveDeck('lower')}
              className={`flex-1 py-2 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                activeDeck === 'lower'
                  ? 'bg-[#D84E55] text-white border-[#D84E55] shadow-sm'
                  : 'bg-slate-50 text-gray-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              LOWER DECK
            </button>
            <button
              onClick={() => setActiveDeck('upper')}
              className={`flex-1 py-2 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                activeDeck === 'upper'
                  ? 'bg-[#D84E55] text-white border-[#D84E55] shadow-sm'
                  : 'bg-slate-50 text-gray-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              UPPER DECK
            </button>
          </div>

          {/* Seat Layout Container with Steering Wheel */}
          <div className="border-2 border-slate-300 rounded-2xl p-4 bg-slate-50 relative">
            {/* Front of Bus & Driver Wheel */}
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-200 text-[11px] font-bold text-gray-500">
              <span className="uppercase tracking-wider">ENTRY DOOR</span>
              <div className="flex items-center gap-1.5 bg-slate-200 px-2 py-1 rounded-md text-gray-700">
                <span className="text-xs">⎈</span>
                <span>DRIVER</span>
              </div>
            </div>

            {/* Sleeper Berths Rows */}
            <div className="space-y-3">
              {(activeDeck === 'lower' ? LOWER_DECK_SEATS : UPPER_DECK_SEATS)
                .slice(0, 5)
                .map((leftSeat, idx) => {
                  const rightSeatA = (activeDeck === 'lower' ? LOWER_DECK_SEATS : UPPER_DECK_SEATS)[5 + idx];
                  const isLeftSelected = selectedSeats.some((s) => s.id === leftSeat.id);
                  const isRightSelected = selectedSeats.some((s) => s.id === rightSeatA?.id);

                  return (
                    <div key={idx} className="flex justify-between items-center gap-4">
                      {/* Left Single Berth */}
                      <button
                        type="button"
                        disabled={leftSeat.isBooked}
                        onClick={() => handleSeatClick(leftSeat)}
                        className={`w-16 h-10 rounded-lg border-2 flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${
                          leftSeat.isBooked
                            ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-60'
                            : isLeftSelected
                            ? 'bg-[#D84E55] text-white border-[#D84E55] shadow-md scale-105'
                            : leftSeat.isLadies
                            ? 'bg-pink-50 text-pink-700 border-pink-400 hover:border-pink-600'
                            : 'bg-white text-gray-800 border-emerald-500 hover:bg-emerald-50'
                        }`}
                        title={`${leftSeat.no}: ₹${leftSeat.price}`}
                      >
                        <div className="w-4 h-1 bg-current opacity-30 rounded-full mb-0.5"></div>
                        <span>{leftSeat.no}</span>
                      </button>

                      {/* Aisle */}
                      <div className="text-[10px] text-gray-300 font-mono">| |</div>

                      {/* Right Double Berths */}
                      <div className="flex gap-2">
                        {rightSeatA && (
                          <button
                            type="button"
                            disabled={rightSeatA.isBooked}
                            onClick={() => handleSeatClick(rightSeatA)}
                            className={`w-16 h-10 rounded-lg border-2 flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${
                              rightSeatA.isBooked
                                ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-60'
                                : isRightSelected
                                ? 'bg-[#D84E55] text-white border-[#D84E55] shadow-md scale-105'
                                : rightSeatA.isLadies
                                ? 'bg-pink-50 text-pink-700 border-pink-400 hover:border-pink-600'
                                : 'bg-white text-gray-800 border-emerald-500 hover:bg-emerald-50'
                            }`}
                            title={`${rightSeatA.no}: ₹${rightSeatA.price}`}
                          >
                            <div className="w-4 h-1 bg-current opacity-30 rounded-full mb-0.5"></div>
                            <span>{rightSeatA.no}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-xs font-semibold text-gray-600">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded border-2 border-emerald-500 bg-white" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded border-2 border-pink-400 bg-pink-50" />
              <span>Female</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-[#D84E55]" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-gray-300" />
              <span>Booked</span>
            </div>
          </div>
        </div>

        {/* Right Side: Boarding / Dropping & Fare Breakdown */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h4 className="font-black text-sm text-[#0F172A] mb-3">Boarding & Dropping Point</h4>

            {/* Boarding Point Selector */}
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-500 block mb-1">BOARDING POINT</label>
              <div className="space-y-1.5">
                {BOARDING_POINTS.map((bp) => (
                  <div
                    key={bp.id}
                    onClick={() => setSelectedBoarding(bp)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedBoarding.id === bp.id
                        ? 'border-[#D84E55] bg-red-50/50 font-bold text-gray-900'
                        : 'border-slate-200 hover:bg-slate-50 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{bp.name}</span>
                      <span className="font-black text-[#D84E55]">{bp.time}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-normal">{bp.landmark}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dropping Point Selector */}
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-500 block mb-1">DROPPING POINT</label>
              <div className="space-y-1.5">
                {DROPPING_POINTS.map((dp) => (
                  <div
                    key={dp.id}
                    onClick={() => setSelectedDropping(dp)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedDropping.id === dp.id
                        ? 'border-[#D84E55] bg-red-50/50 font-bold text-gray-900'
                        : 'border-slate-200 hover:bg-slate-50 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{dp.name}</span>
                      <span className="font-black text-[#D84E55]">{dp.time}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-normal">{dp.landmark}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Total & Proceed Button */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-gray-500">Selected Seats:</span>
              <span className="font-black text-[#D84E55]">
                {selectedSeats.length > 0 ? selectedSeats.map((s) => s.no).join(', ') : 'None'}
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-gray-500 text-xs">Total Amount:</span>
              <span className="font-black text-xl text-[#0F172A]">₹{totalFare}</span>
            </div>

            <button
              onClick={() => onBookSeats && onBookSeats({ selectedSeats, selectedBoarding, selectedDropping, totalFare })}
              disabled={selectedSeats.length === 0}
              className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                selectedSeats.length > 0
                  ? 'bg-[#D84E55] hover:bg-[#b93a40] text-white hover:shadow-lg active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Proceed to Book ({selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

BusSeatMap.displayName = 'BusSeatMap';

export default BusSeatMap;
