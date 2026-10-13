import React, { useState, useCallback } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Plane, Tag, Check, Armchair, 
  ArrowRight, Luggage, Info, ChevronRight 
} from 'lucide-react';
import FlightSeatMap from '@/components/seats/FlightSeatMap';
import { FLIGHT_DETAILS } from '@/data/flights';

const FlightReview = React.memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const flightId = searchParams.get('flightId') || 'f1';
  const initialSeats = searchParams.get('seats') ? searchParams.get('seats').split(',') : [];

  const flight = FLIGHT_DETAILS[flightId] || FLIGHT_DETAILS['f1'];

  // State
  const [selectedSeats, setSelectedSeats] = useState(initialSeats);
  const [seatPrice, setSeatPrice] = useState(initialSeats.length > 0 ? 250 * initialSeats.length : 0);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);

  // Promo code
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponSuccess, setCouponSuccess] = useState(false);

  const baseFare = flight.price - 750;
  const taxes = 750;
  const total = baseFare + taxes + seatPrice - discount;

  const handleApplyCoupon = useCallback((e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'TRIPNESTFLY' || couponCode.toUpperCase() === 'FLY15') {
      const disc = Math.round(baseFare * 0.15);
      setDiscount(disc);
      setCouponSuccess(true);
    } else {
      alert('Invalid coupon! Try TRIPNESTFLY for 15% discount.');
    }
  }, [couponCode, baseFare]);

  const handleProceedToTraveller = useCallback(() => {
    const seatQuery = selectedSeats.length > 0 ? `&seats=${selectedSeats.join(',')}` : '';
    navigate(`/flights/traveller-details?flightId=${flight.id}${seatQuery}`);
  }, [navigate, flight.id, selectedSeats]);

  const handleConfirmSeats = useCallback((seats) => {
    setSelectedSeats(seats.map((s) => s.code));
    setSeatPrice(seats.reduce((sum, s) => sum + s.price, 0));
    setIsSeatModalOpen(false);
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4">
      <div className="max-w-[1140px] mx-auto">
        {/* Breadcrumb Steps */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#0D9488]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/flights/search" className="hover:text-[#0D9488]">Flight Results</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0D9488]">Review Itinerary & Seat</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Itinerary & Seat Card */}
          <div className="lg:col-span-8 space-y-6">
            {/* Flight Summary Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D9488] font-black text-xs flex items-center justify-center border border-teal-100">
                    {flight.airline.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-black text-base text-[#0F172A]">{flight.airline} {flight.flightNo}</h3>
                    <p className="text-xs text-gray-500 font-medium">{flight.aircraft} • Economy</p>
                  </div>
                </div>

                <span className="text-xs font-black text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  Confirmed Schedule
                </span>
              </div>

              {/* Dep / Arr Grid */}
              <div className="grid grid-cols-3 items-center py-2 text-center">
                <div className="text-left">
                  <p className="text-2xl font-black text-[#0F172A]">{flight.depTime}</p>
                  <p className="text-sm font-bold text-gray-700">{flight.depAirport}</p>
                  <p className="text-xs text-gray-400">Terminal 3, Delhi</p>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-400 mb-1">{flight.duration}</span>
                  <div className="w-24 h-0.5 bg-gray-300 relative flex items-center justify-center">
                    <Plane className="w-3.5 h-3.5 text-[#0D9488] absolute -top-1.5" />
                  </div>
                  <span className="text-[10px] font-bold text-teal-600 mt-1">Non-stop</span>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-black text-[#0F172A]">{flight.arrTime}</p>
                  <p className="text-sm font-bold text-gray-700">{flight.arrAirport}</p>
                  <p className="text-xs text-gray-400">Terminal 1, Bengaluru</p>
                </div>
              </div>

              {/* Baggage info */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-6 text-xs text-gray-600 font-semibold">
                <div className="flex items-center gap-1.5">
                  <Luggage className="w-4 h-4 text-gray-400" />
                  <span>Cabin Baggage: 7 Kgs / Adult</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Luggage className="w-4 h-4 text-gray-400" />
                  <span>Check-in Baggage: 15 Kgs / Adult</span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE SEAT SELECTION BOX */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0D9488] flex items-center justify-center">
                    <Armchair className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#0F172A]">Select Your Flight Seat</h4>
                    <p className="text-xs text-gray-500">Pick window, aisle or extra legroom seats in advance</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSeatModalOpen(true)}
                  className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-[#0D9488] text-xs font-black rounded-xl border border-teal-200 transition-colors"
                >
                  {selectedSeats.length > 0 ? 'Change Seat' : 'Choose Seat Now'}
                </button>
              </div>

              {selectedSeats.length > 0 ? (
                <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-black text-sm shadow">
                      {selectedSeats.join(', ')}
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#0F172A]">Seat Confirmed: {selectedSeats.join(', ')}</p>
                      <p className="text-[11px] text-gray-600 font-medium">Standard Aircraft Seat • IndiGo {flight.flightNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
                      Assigned
                    </span>
                    <p className="text-xs font-bold text-gray-700 mt-1">+ ₹{seatPrice}</p>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => setIsSeatModalOpen(true)}
                  className="p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#0D9488] hover:bg-teal-50/30 cursor-pointer transition-all flex items-center justify-between text-xs text-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#0D9488]" />
                    <span>No seat selected yet. Auto-assignment at airport check-in or pick now.</span>
                  </div>
                  <span className="font-bold text-[#0D9488] hover:underline">Open Seat Map →</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Fare Breakdown & Action */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h4 className="font-black text-sm text-[#0F172A] mb-4 pb-3 border-b border-slate-100">
                Fare Summary
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Base Fare (1 Adult)</span>
                  <span className="font-bold text-gray-800">₹{baseFare.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Surcharges</span>
                  <span className="font-bold text-gray-800">₹{taxes.toLocaleString('en-IN')}</span>
                </div>

                {selectedSeats.length > 0 && (
                  <div className="flex justify-between text-teal-700 font-bold">
                    <span>Seat Selection ({selectedSeats.join(', ')})</span>
                    <span>₹{seatPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Promo Discount (TRIPNESTFLY)</span>
                    <span>- ₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm">
                  <span className="font-black text-[#0F172A]">Total Amount</span>
                  <span className="text-xl font-black text-[#0D9488]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Promo Code Box */}
              <form onSubmit={handleApplyCoupon} className="mt-5 pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-gray-700 block mb-1.5 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>Have a Promo Code?</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter TRIPNESTFLY"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 uppercase text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponSuccess && (
                  <p className="text-[11px] text-teal-600 font-bold mt-1.5 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 15% discount applied successfully!
                  </p>
                )}
              </form>

              {/* Proceed Button */}
              <button
                type="button"
                onClick={handleProceedToTraveller}
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Traveller Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Selection Modal */}
      {isSeatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="my-auto w-full max-w-4xl">
            <FlightSeatMap
              flight={flight}
              passengerCount={1}
              onConfirmSeats={handleConfirmSeats}
              onClose={() => setIsSeatModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
});

FlightReview.displayName = 'FlightReview';

export default FlightReview;
