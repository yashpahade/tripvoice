import React, { useState, useCallback } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Phone, ShieldCheck, Armchair, 
  Utensils, ArrowRight, ChevronRight 
} from 'lucide-react';
import FlightSeatMap from '@/components/seats/FlightSeatMap';
import { FLIGHT_DETAILS } from '@/data/flights';

const FlightTravellerDetails = React.memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const flightId = searchParams.get('flightId') || 'f1';
  const initialSeats = searchParams.get('seats') ? searchParams.get('seats').split(',') : [];
  const flight = FLIGHT_DETAILS[flightId] || FLIGHT_DETAILS['f1'];

  const [title, setTitle] = useState('Mr');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Seat state
  const [selectedSeats, setSelectedSeats] = useState(initialSeats);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  
  // Addons
  const [insurance, setInsurance] = useState(true);
  const [meal, setMeal] = useState('Veg Combo');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) {
      alert('Please fill in passenger name, email, and phone number.');
      return;
    }

    const seatQuery = selectedSeats.length > 0 ? `&seats=${selectedSeats.join(',')}` : '';
    navigate(`/payment?flightId=${flightId}${seatQuery}&passenger=${encodeURIComponent(firstName + ' ' + lastName)}`);
  }, [firstName, lastName, email, phone, selectedSeats, flightId, navigate]);

  const handleConfirmSeats = useCallback((seats) => {
    setSelectedSeats(seats.map((s) => s.code));
    setIsSeatModalOpen(false);
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4">
      <div className="max-w-[1040px] mx-auto">
        {/* Breadcrumb Steps */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#0D9488]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/flights/search" className="hover:text-[#0D9488]">Flight Results</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/flights/review?flightId=${flightId}`} className="hover:text-[#0D9488]">Review</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0D9488]">Traveller Details & Seat</span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Passenger Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-black text-base text-[#0F172A] mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                <User className="w-4 h-4 text-[#0D9488]" />
                <span>Passenger 1 (Adult)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-3">
                  <label className="text-xs font-bold text-gray-700 block mb-1">Title</label>
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                  </select>
                </div>

                <div className="sm:col-span-5">
                  <label className="text-xs font-bold text-gray-700 block mb-1">First Name (as on ID)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="text-xs font-bold text-gray-700 block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharma"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>Email Address (for E-Ticket)</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>Mobile Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                </div>
              </div>
            </div>

            {/* SEAT SELECTION ADD-ON CARD */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center font-bold">
                    <Armchair className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-base text-[#0F172A]">Your Seat Selection</h4>
                    <p className="text-xs text-gray-500">Pick preferred seat (Window, Aisle, Extra Legroom)</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSeatModalOpen(true)}
                  className="px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-sm transition-all"
                >
                  {selectedSeats.length > 0 ? 'Change Seat' : 'Select Seat on Map'}
                </button>
              </div>

              {selectedSeats.length > 0 ? (
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-black text-sm shadow">
                      {selectedSeats.join(', ')}
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#0F172A]">Seat {selectedSeats.join(', ')} Selected</p>
                      <p className="text-[11px] text-gray-600">Assigned for {firstName ? `${title} ${firstName} ${lastName}` : 'Passenger 1'}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-teal-700 bg-teal-100 px-3 py-1 rounded-full">
                    Confirmed
                  </span>
                </div>
              ) : (
                <div 
                  onClick={() => setIsSeatModalOpen(true)}
                  className="p-4 rounded-xl border border-dashed border-gray-300 hover:border-[#0D9488] hover:bg-teal-50/20 cursor-pointer transition-all flex items-center justify-between text-xs text-gray-500"
                >
                  <span>No seat selected. Click to open the cabin map and pick your seat.</span>
                  <span className="font-bold text-[#0D9488]">Open Seat Map →</span>
                </div>
              )}
            </div>

            {/* In-Flight Addons (Meals & Insurance) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h4 className="font-black text-sm text-[#0F172A] pb-2 border-b border-slate-100">
                In-flight Add-ons
              </h4>

              {/* Insurance */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={insurance}
                  onChange={(e) => setInsurance(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#0D9488] focus:ring-[#0D9488]"
                />
                <div className="flex-1 text-xs">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-black text-[#0F172A]">Travel Insurance Protection</span>
                    <span className="font-bold text-teal-600">+ ₹199 / traveller</span>
                  </div>
                  <p className="text-gray-500">Covers medical emergencies up to ₹5,00,000 & baggage delay up to ₹10,000.</p>
                </div>
              </label>

              {/* Meal */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs">
                  <Utensils className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-gray-800">Complimentary In-Flight Meal</span>
                </div>
                <select
                  value={meal}
                  onChange={(e) => setMeal(e.target.value)}
                  className="text-xs p-1.5 border border-gray-300 rounded-lg focus:outline-none"
                >
                  <option value="Veg Combo">Veg Hot Combo</option>
                  <option value="Non-Veg Biryani">Chicken Biryani</option>
                  <option value="Fruit Platter">Fresh Fruit Platter</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Action */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h4 className="font-black text-sm text-[#0F172A] mb-4 pb-2 border-b border-slate-100">
                Booking Summary
              </h4>

              <div className="space-y-3 text-xs mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Flight Ticket</span>
                  <span className="font-bold text-gray-800">₹{flight.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Seat ({selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'})</span>
                  <span className="font-bold text-teal-600">
                    {selectedSeats.length > 0 ? '+ ₹250' : '₹0'}
                  </span>
                </div>
                {insurance && (
                  <div className="flex justify-between text-gray-600">
                    <span>Insurance</span>
                    <span className="font-bold text-gray-800">+ ₹199</span>
                  </div>
                )}
                <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm">
                  <span className="font-black text-[#0F172A]">Final Payable</span>
                  <span className="text-xl font-black text-[#0D9488]">
                    ₹{(flight.price + (selectedSeats.length > 0 ? 250 : 0) + (insurance ? 199 : 0)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>100% Safe & Secure Payment</span>
              </div>
            </div>
          </div>
        </form>
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

FlightTravellerDetails.displayName = 'FlightTravellerDetails';

export default FlightTravellerDetails;
