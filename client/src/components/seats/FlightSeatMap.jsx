import React, { useState, useCallback } from 'react';
import { Plane, X } from 'lucide-react';

// Generates realistic A320 seat grid (Rows 1 to 20, Seats A B C | D E F)
const generateA320Seats = () => {
  const rows = [];
  const bookedSeatCodes = new Set([
    '1A', '1C', '2D', '3B', '3E', '4A', '4F', '5C', '5D', '6B', 
    '7A', '8F', '9C', '10D', '11E', '12A', '12B', '14C', '15F', 
    '16D', '17A', '18B', '19E', '20F'
  ]);

  for (let r = 1; r <= 20; r++) {
    let price = 250;
    let type = 'Standard';
    if (r === 1) {
      price = 550;
      type = 'Extra Legroom & Front';
    } else if (r === 12 || r === 13) {
      price = 450;
      type = 'Emergency Exit / Extra Legroom';
    } else if (r >= 15) {
      price = 0; // Free seats at the back
      type = 'Free Standard';
    }

    const rowSeats = ['A', 'B', 'C', 'D', 'E', 'F'].map((col) => {
      const seatCode = `${r}${col}`;
      const isBooked = bookedSeatCodes.has(seatCode);
      const isWindow = col === 'A' || col === 'F';
      const isAisle = col === 'C' || col === 'D';
      const isMiddle = col === 'B' || col === 'E';

      return {
        code: seatCode,
        row: r,
        col,
        price,
        type,
        isBooked,
        isWindow,
        isAisle,
        isMiddle,
      };
    });

    rows.push({ rowNumber: r, seats: rowSeats, isExitRow: r === 12 || r === 13 });
  }
  return rows;
};

const A320_ROWS = generateA320Seats();

const FlightSeatMap = React.memo(({ 
  flight = { 
    airline: 'IndiGo', 
    flightNo: '6E-205', 
    from: 'DEL', 
    to: 'BLR', 
    aircraft: 'Airbus A320neo' 
  },
  passengerCount = 1,
  onConfirmSeats,
  onClose 
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  const handleSeatClick = useCallback((seat) => {
    if (seat.isBooked) return;

    setSelectedSeats((prev) => {
      if (prev.some((s) => s.code === seat.code)) {
        return prev.filter((s) => s.code !== seat.code);
      } else {
        if (prev.length >= passengerCount) {
          if (passengerCount === 1) {
            return [seat];
          } else {
            alert(`You can only select up to ${passengerCount} seats for ${passengerCount} passenger(s).`);
            return prev;
          }
        } else {
          return [...prev, seat];
        }
      }
    });
  }, [passengerCount]);

  const totalSeatPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-4xl w-full mx-auto animate-in fade-in zoom-in-95">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D9488] to-[#0F766E] text-white p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center font-bold">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg">{flight.airline} {flight.flightNo}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">{flight.aircraft}</span>
            </div>
            <p className="text-xs text-teal-100 font-medium">
              Select seats for {passengerCount} passenger(s) • {flight.from} → {flight.to}
            </p>
          </div>
        </div>

        {onClose && (
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Legend & Selected Summary */}
        <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 pb-4 lg:pb-0 lg:pr-6">
          <div>
            <h4 className="font-black text-sm text-[#0F172A] mb-3">Seat Price & Legend</h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-emerald-500 bg-emerald-50" />
                  <span className="font-bold text-gray-700">Free Seat</span>
                </div>
                <span className="font-black text-emerald-600">₹0</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-teal-400 bg-teal-50" />
                  <span className="font-bold text-gray-700">Standard Seat</span>
                </div>
                <span className="font-black text-[#0D9488]">₹250</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-purple-500 bg-purple-50" />
                  <span className="font-bold text-gray-700">Extra Legroom (Exit/Row 1)</span>
                </div>
                <span className="font-black text-purple-600">₹450 - ₹550</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#0D9488] text-white flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </div>
                  <span className="font-bold text-[#0D9488]">Selected Seat</span>
                </div>
                <span className="text-gray-400 font-semibold">Your choice</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 opacity-60">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-gray-300 text-gray-500 flex items-center justify-center font-bold text-[10px]">
                    ✕
                  </div>
                  <span className="font-bold text-gray-600">Occupied / Booked</span>
                </div>
                <span className="text-gray-400">Unavailable</span>
              </div>
            </div>

            {/* Hovered Seat Details */}
            {hoveredSeat && (
              <div className="mt-4 p-3 rounded-xl bg-teal-50/80 border border-teal-200 text-xs animate-in fade-in">
                <p className="font-black text-[#0D9488] text-sm">Seat {hoveredSeat.code}</p>
                <p className="text-gray-700 font-semibold">{hoveredSeat.type}</p>
                <p className="text-gray-500 text-[11px]">
                  {hoveredSeat.isWindow ? 'Window Seat' : hoveredSeat.isAisle ? 'Aisle Seat' : 'Middle Seat'}
                </p>
                <p className="font-black text-gray-900 mt-1">
                  {hoveredSeat.isBooked ? 'Already Booked' : hoveredSeat.price === 0 ? 'FREE' : `+ ₹${hoveredSeat.price}`}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Summary & Confirm */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-bold">Selected Seats:</span>
              <span className="text-sm font-black text-[#0D9488]">
                {selectedSeats.length > 0 ? selectedSeats.map((s) => s.code).join(', ') : 'None'}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-500 font-bold">Seat Add-on Total:</span>
              <span className="text-lg font-black text-[#0F172A]">₹{totalSeatPrice}</span>
            </div>

            <button
              onClick={() => onConfirmSeats && onConfirmSeats(selectedSeats)}
              disabled={selectedSeats.length === 0}
              className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md ${
                selectedSeats.length > 0
                  ? 'bg-gradient-to-r from-[#0D9488] to-[#0F766E] text-white hover:shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Confirm {selectedSeats.length} Seat(s)
            </button>
          </div>
        </div>

        {/* Right Side: Airplane Cabin Interactive Seat Grid */}
        <div className="lg:col-span-8 overflow-x-auto pb-2 flex flex-col items-center">
          {/* Airplane Nose / Cockpit Graphic */}
          <div className="w-56 h-14 rounded-t-full bg-gradient-to-b from-slate-200 to-slate-100 border-t-2 border-x-2 border-slate-300 flex flex-col items-center justify-center text-[11px] font-bold text-gray-500 mb-2 shadow-inner">
            <span className="tracking-widest uppercase">FRONT / COCKPIT</span>
            <div className="w-16 h-1 bg-teal-400 rounded-full mt-1"></div>
          </div>

          {/* Column Headers (A B C | Aisle | D E F) */}
          <div className="w-full max-w-md flex items-center justify-between px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-black text-gray-600 mb-3">
            <div className="flex gap-2 sm:gap-3">
              <span className="w-7 text-center">A</span>
              <span className="w-7 text-center">B</span>
              <span className="w-7 text-center">C</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">AISLE</span>
            <div className="flex gap-2 sm:gap-3">
              <span className="w-7 text-center">D</span>
              <span className="w-7 text-center">E</span>
              <span className="w-7 text-center">F</span>
            </div>
          </div>

          {/* Scrollable Rows Container */}
          <div className="w-full max-w-md max-h-[460px] overflow-y-auto pr-1 space-y-1.5">
            {A320_ROWS.map((row) => (
              <div 
                key={row.rowNumber}
                className={`flex items-center justify-between p-1 rounded-lg transition-colors ${
                  row.isExitRow ? 'bg-amber-50/70 border border-amber-200' : 'hover:bg-slate-50'
                }`}
              >
                {/* Left Trio (A, B, C) */}
                <div className="flex gap-2 sm:gap-3">
                  {row.seats.slice(0, 3).map((seat) => {
                    const isSelected = selectedSeats.some((s) => s.code === seat.code);
                    return (
                      <button
                        key={seat.code}
                        type="button"
                        disabled={seat.isBooked}
                        onClick={() => handleSeatClick(seat)}
                        onMouseEnter={() => setHoveredSeat(seat)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        className={`w-7 h-8 sm:w-8 sm:h-9 rounded-md flex flex-col items-center justify-center text-[10px] font-bold transition-all relative cursor-pointer ${
                          seat.isBooked
                            ? 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#0D9488] text-white ring-2 ring-teal-300 scale-105 shadow-md'
                            : seat.price === 0
                            ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-400 hover:border-emerald-600 hover:scale-105'
                            : seat.price >= 450
                            ? 'bg-purple-50 text-purple-800 border-2 border-purple-400 hover:border-purple-600 hover:scale-105'
                            : 'bg-teal-50 text-teal-800 border-2 border-teal-300 hover:border-teal-500 hover:scale-105'
                        }`}
                        title={`${seat.code}: ${seat.type} (${seat.price === 0 ? 'FREE' : '₹' + seat.price})`}
                      >
                        <span>{seat.code}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Row Number in Aisle */}
                <div className="w-8 text-center text-xs font-black text-gray-400">
                  {row.rowNumber}
                </div>

                {/* Right Trio (D, E, F) */}
                <div className="flex gap-2 sm:gap-3">
                  {row.seats.slice(3, 6).map((seat) => {
                    const isSelected = selectedSeats.some((s) => s.code === seat.code);
                    return (
                      <button
                        key={seat.code}
                        type="button"
                        disabled={seat.isBooked}
                        onClick={() => handleSeatClick(seat)}
                        onMouseEnter={() => setHoveredSeat(seat)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        className={`w-7 h-8 sm:w-8 sm:h-9 rounded-md flex flex-col items-center justify-center text-[10px] font-bold transition-all relative cursor-pointer ${
                          seat.isBooked
                            ? 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#0D9488] text-white ring-2 ring-teal-300 scale-105 shadow-md'
                            : seat.price === 0
                            ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-400 hover:border-emerald-600 hover:scale-105'
                            : seat.price >= 450
                            ? 'bg-purple-50 text-purple-800 border-2 border-purple-400 hover:border-purple-600 hover:scale-105'
                            : 'bg-teal-50 text-teal-800 border-2 border-teal-300 hover:border-teal-500 hover:scale-105'
                        }`}
                        title={`${seat.code}: ${seat.type} (${seat.price === 0 ? 'FREE' : '₹' + seat.price})`}
                      >
                        <span>{seat.code}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Plane Wings Graphic Indicator */}
          <div className="w-full max-w-md flex justify-between text-[10px] text-gray-400 font-bold px-2 mt-2">
            <span>◀ Left Wing</span>
            <span>Right Wing ▶</span>
          </div>
        </div>
      </div>
    </div>
  );
});

FlightSeatMap.displayName = 'FlightSeatMap';

export default FlightSeatMap;
